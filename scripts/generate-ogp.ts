/**
 * 単色背景・共通プロフィール画像・macOSのヒラギノで日英のOGPを生成する。ビルド時には実行しない。
 */
import { access, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage, registerFont } from 'canvas'
import type { CanvasRenderingContext2D, Image } from 'canvas'
import ja from '../i18n/locales/ja.json' with { type: 'json' }
import en from '../i18n/locales/en.json' with { type: 'json' }
import { loadConfig } from './config.ts'

/** OS間・描画エンジン間のウェイト解釈に依存せず、実際の書体を指定する。 */
const fontFamilies = { 3: 'OGP Hiragino W3', 6: 'OGP Hiragino W6', 9: 'OGP Hiragino W9' } as const

/** サロゲートペアや結合文字の途中で分割せずに字間を加える。 */
const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })
const root = new URL('../', import.meta.url)
const config = loadConfig()
/** サイトと同じ公開URLを、プロトコルと末尾のスラッシュを含めて表示する。 */
const siteUrl = new URL(config.BASE_URL)
const displayUrl = siteUrl.href
/** 表示文は翻訳辞書、出力先はサイトのOGP設定を共通の定義として使う。 */
const images = [
  { site: ja.site, imagePath: config.OG_IMAGE_PATH },
  { site: en.site, imagePath: config.OG_IMAGE_PATH_EN }
]
const width = 1200
const height = 630
/** 背景色と、日英で共通の文字・画像位置を定義する。 */
const design = {
  background: '#9CC9DA',
  foreground: '#242824',
  margin: 64,
  gap: 64,
  portraitSize: 448,
  lineTops: [176, 328, 414]
} as const

/** 計測済みの一行。文字領域の実寸を、配置と描画で共有する。 */
interface TextLine {
  text: string
  font: string
  spacing: number
  height: number
  ascent: number
}

/**
 * macOSと必要な書体を確認し、描画に使用するフォントを登録する。
 * @throws macOS以外、または指定したヒラギノのフォントファイルがない場合。
 */
async function prepareFonts (): Promise<void> {
  // macOSのヒラギノを使い、フォントファイル自体は配布しない。
  // 代替フォントで意図しない画像を作らないよう、描画前に環境を確認する。
  if (process.platform !== 'darwin') {
    throw new Error('OGPの再生成には、ヒラギノ角ゴシックがあるmacOSが必要です')
  }
  for (const weight of [3, 6, 9] as const) {
    const path = `/System/Library/Fonts/ヒラギノ角ゴシック W${weight}.ttc`
    try {
      await access(path)
    } catch {
      throw new Error(`OGPの再生成に必要なフォントがありません: ${path}`)
    }
    registerFont(path, { family: fontFamilies[weight], weight: 'normal', style: 'normal' })
  }
}

/**
 * 指定した太さの実フォントで計測し、画像と余白を除いた幅に収まるまで文字サイズを調整する。
 * @param context - 生成画像の2Dコンテキスト。
 * @param text - 一行で表示する文字列。
 * @param size - 初期フォントサイズ（px）。
 * @param weight - 登録したヒラギノの太さ。
 * @param spacing - 書記素間の字間（px）。
 * @returns 固定位置での描画に使用する文字領域。
 */
function measureLine (context: CanvasRenderingContext2D, text: string, size: number, weight: keyof typeof fontFamilies, spacing = 0): TextLine {
  const segments = [...segmenter.segment(text)]
  const available = width - design.margin * 2 - design.gap - design.portraitSize
  while (size >= 24) {
    const font = `${size}px "${fontFamilies[weight]}"`
    context.font = font
    const metrics = context.measureText(text)
    const lineWidth = metrics.width + Math.max(0, segments.length - 1) * spacing
    if (lineWidth <= available) {
      return {
        text,
        font,
        spacing,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
        ascent: metrics.actualBoundingBoxAscent
      }
    }
    size -= 1
  }
  throw new Error(`文字が画像と並べられる幅に収まりません: ${text}`)
}

/**
 * 計測した文字領域の上端に合わせて一行を描画する。
 * @param context - 描画先。
 * @param line - 使用する書体と計測結果。
 * @param left - 行の左位置（px）。
 * @param top - 文字領域の上位置（px）。
 */
function drawLine (context: CanvasRenderingContext2D, line: TextLine, left: number, top: number): void {
  context.font = line.font
  const baseline = top + line.ascent
  if (line.spacing === 0) {
    context.fillText(line.text, left, baseline)
    return
  }
  for (const [position, { segment, index }] of [...segmenter.segment(line.text)].entries()) {
    // 直前までの文字列も測定し、書記素とカーニングを保って字間を加える。
    const end = context.measureText(line.text.slice(0, index + segment.length)).width
    const x = left + end - context.measureText(segment).width + position * line.spacing
    context.fillText(segment, x, baseline)
  }
}

/**
 * サイト名・URL・プロフィール画像を描画し、OGP画像1枚をPNGで保存する。
 * @param site - 現在の言語の名前とサイト名。
 * @param imagePath - loadConfigで検証済みの、public配下への相対出力パス。
 * @param portrait - 日英で共有する読み込み済みのプロフィール画像。
 * @throws サイト名・文字の配置範囲が不正な場合。
 */
async function generateOgp (site: Pick<typeof ja.site, 'name' | 'title'>, imagePath: string, portrait: Image): Promise<void> {
  // サイト名を主名義と残りの部分に分け、名前とOFFICIAL SITEの2行に分ける。
  // 定義が変わっても、画像用の名前やサイト名を別途編集する必要はない。
  if (!site.title.startsWith(site.name + ' ')) {
    throw new Error(`OGPの2行表示には、主名義に続くサイト名が必要です: ${site.title}`)
  }
  const subtitle = site.title.slice(site.name.length).trim()
  const output = new URL(imagePath, new URL('public/', root))
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = true
  context.quality = 'best'
  context.patternQuality = 'best'
  context.fillStyle = design.background
  context.fillRect(0, 0, width, height)
  context.fillStyle = design.foreground
  context.textBaseline = 'alphabetic'
  const lines = [
    measureLine(context, site.name, 128, 9, -2),
    measureLine(context, subtitle, 64, 6, -1),
    measureLine(context, displayUrl, 44, 3)
  ]
  // 文字の開始位置と画像の位置は日英で固定し、名前の幅や書体の高さで動かさない。
  for (const [index, line] of lines.entries()) {
    const top = design.lineTops[index]
    const nextTop = design.lineTops[index + 1] ?? height - design.margin
    if (top === undefined || top + line.height > nextTop) throw new Error(`文字が行の表示範囲に収まりません: ${line.text}`)
    drawLine(context, line, design.margin, top)
  }
  const portraitX = width - design.margin - design.portraitSize
  const portraitY = (height - design.portraitSize) / 2
  // サイトと同じ円形表示。元画像は加工せず、中央を正方形で切り出して描画する。
  context.save()
  context.beginPath()
  context.arc(portraitX + design.portraitSize / 2, height / 2, design.portraitSize / 2, 0, Math.PI * 2)
  context.clip()
  const sourceSize = Math.min(portrait.width, portrait.height)
  context.drawImage(portrait, (portrait.width - sourceSize) / 2, (portrait.height - sourceSize) / 2, sourceSize, sourceSize,
    portraitX, portraitY, design.portraitSize, design.portraitSize)
  context.restore()
  await mkdir(new URL('./', output), { recursive: true })
  const png = canvas.toBuffer('image/png')
  await writeFile(output, png)
  console.log(`${fileURLToPath(output)}: ${width}×${height}, Hiragino Sans, ${png.length} bytes`)
}

await prepareFonts()
/** サイトと共通のプロフィール画像を一度だけ読み込み、日英の生成で共有する。 */
const portrait = await loadImage(fileURLToPath(new URL('public/profile.png', root)))
for (const { site, imagePath } of images) {
  await generateOgp(site, imagePath, portrait)
}
