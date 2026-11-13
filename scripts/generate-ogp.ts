/**
 * macOSのヒラギノで日英のOGP画像を生成する。ビルド時には実行しない。
 */
import { access, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage, registerFont } from 'canvas'
import type { CanvasRenderingContext2D } from 'canvas'
import ja from '../i18n/locales/ja.json' with { type: 'json' }
import en from '../i18n/locales/en.json' with { type: 'json' }
import { loadConfig } from './config.ts'

// macOSのヒラギノを使い、フォントファイル自体は配布しない。
// 代替フォントで意図しない画像を作らないよう、描画前に環境を確認する。
if (process.platform !== 'darwin') {
  throw new Error('OGPの再生成には、ヒラギノ角ゴシックがあるmacOSが必要です')
}
/** OS間・描画エンジン間のウェイト解釈に依存せず、実際の書体を指定する。 */
const fontFamilies = { 3: 'OGP Hiragino W3', 6: 'OGP Hiragino W6', 7: 'OGP Hiragino W7' } as const
for (const weight of [3, 6, 7] as const) {
  const path = `/System/Library/Fonts/ヒラギノ角ゴシック W${weight}.ttc`
  try {
    await access(path)
  } catch {
    throw new Error(`OGPの再生成に必要なフォントがありません: ${path}`)
  }
  registerFont(path, { family: fontFamilies[weight], weight: 'normal', style: 'normal' })
}

/** サロゲートペアや結合文字の途中で分割せずに字間を加える。 */
const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })
const root = new URL('../', import.meta.url)
const config = loadConfig()
/** サイトと同じ公開URLを、画像に表示するホスト名と公開パスへ整形する。 */
const siteUrl = new URL(config.BASE_URL)
const displayUrl = siteUrl.host + siteUrl.pathname.replace(/\/$/, '')
/** 表示文は翻訳辞書、出力先はサイトのOGP設定を共通の定義として使う。 */
const images = [
  { site: ja.site, imagePath: config.OG_IMAGE_PATH },
  { site: en.site, imagePath: config.OG_IMAGE_PATH_EN }
]
const width = 1200
const height = 630
const background = await loadImage(fileURLToPath(new URL('design/ogp/background.png', root)))

/**
 * 指定位置へ一行の文字を描き、左側の領域に収まるまでサイズを調整する。
 * @param context - 背景を描画済みの2Dコンテキスト。
 * @param text - 描画する文字列。
 * @param top - 画像上端からの位置（px）。
 * @param size - 初期フォントサイズ（px）。
 * @param weight - 登録したヒラギノの太さ（W3・W6・W7）。
 * @param spacing - 字間（px）。省略時は0。
 * @throws 24pxまで縮小しても幅570pxに収まらない場合。
 */
function drawText (context: CanvasRenderingContext2D, text: string, top: number, size: number, weight: keyof typeof fontFamilies, spacing = 0): void {
  const segments = [...segmenter.segment(text)]
  /** node-canvasにはletterSpacingがないため、書体の送り幅に字間を加える。 */
  const measureWidth = (): number => context.measureText(text).width + Math.max(0, segments.length - 1) * spacing
  // 長い名前も左側の領域に収まるまで縮める。横方向への変形はしない。
  do {
    context.font = `${size}px "${fontFamilies[weight]}"`
    if (measureWidth() <= 570) break
    size -= 1
  } while (size >= 24)
  if (measureWidth() > 570) {
    throw new Error(`文字が左側の領域に収まりません: ${text}`)
  }
  if (spacing === 0) {
    context.fillText(text, 64, top)
    return
  }
  for (const [position, { segment, index }] of segments.entries()) {
    // 直前までの文字列も測定し、単純な1文字幅の加算で失われるカーニングを反映する。
    const end = context.measureText(text.slice(0, index + segment.length)).width
    const x = 64 + end - context.measureText(segment).width + position * spacing
    context.fillText(segment, x, top)
  }
}

for (const { site, imagePath } of images) {
  // サイト名を主名義と残りの部分に分け、既存の2行の組版を維持する。
  // 定義が変わっても、画像用の名前やサイト名を別途編集する必要はない。
  if (!site.title.startsWith(site.name + ' ')) {
    throw new Error(`OGPの2行表示には、主名義に続くサイト名が必要です: ${site.title}`)
  }
  const subtitle = site.title.slice(site.name.length).trim()
  const output = new URL(imagePath.replace(/^\/+/, ''), new URL('public/', root))
  if (!output.href.startsWith(new URL('public/', root).href)) {
    throw new Error(`OGPの出力先はpublic内の相対パスを指定してください: ${imagePath}`)
  }
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = true
  context.quality = 'best'
  context.patternQuality = 'best'
  context.drawImage(background, 0, 0, width, height)
  context.fillStyle = '#242824'
  context.textBaseline = 'top'
  drawText(context, site.name, 160, 128, 7, -2)
  drawText(context, subtitle, 340, 64, 6, -1)
  drawText(context, displayUrl, 455, 44, 3)
  await mkdir(new URL('./', output), { recursive: true })
  const png = canvas.toBuffer('image/png')
  await writeFile(output, png)
  console.log(`${fileURLToPath(output)}: ${width}×${height}, Hiragino Sans, ${png.length} bytes`)
}
