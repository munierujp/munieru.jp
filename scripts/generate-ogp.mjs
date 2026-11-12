/**
 * macOSのヒラギノで日英のOGP画像を生成する。ビルド時には実行しない。
 * @packageDocumentation
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts, loadImage, setTextRenderer } from '@napi-rs/canvas'

// macOSのヒラギノを使い、フォントファイル自体は配布しない。
// 代替フォントで意図しない画像を作らないよう、描画前に環境を確認する。
if (process.platform !== 'darwin') {
  throw new Error('OGPの再生成には、ヒラギノ角ゴシックがあるmacOSが必要です')
}
/** 必要な太さが利用できるか確認する、システムのヒラギノの登録情報。 */
const family = GlobalFonts.families.find(font => font.family === 'Hiragino Sans')
if (![400, 700, 800].every(weight => family?.styles.some(style => style.weight === weight))) {
  throw new Error('Hiragino Sans W3・W6・W7が必要です')
}

// Swift版と同じCoreTextのフォント選択・メトリクスを使う。
setTextRenderer('system')
const root = new URL('../', import.meta.url)
const width = 1200
const height = 630
const background = await loadImage(fileURLToPath(new URL('design/ogp/background.png', root)))

/**
 * 指定位置へ一行の文字を描き、左側の領域に収まるまでサイズを調整する。
 * @param {import("@napi-rs/canvas").SKRSContext2D} context - 背景を描画済みの2Dコンテキスト。
 * @param {string} text - 描画する文字列。
 * @param {number} top - 画像上端からの位置（px）。
 * @param {number} size - 初期フォントサイズ（px）。
 * @param {number} weight - CoreTextに渡すCSSフォントウェイト。
 * @param {number} [spacing] - 字間（px）。省略時は0。
 * @throws 24pxまで縮小しても幅570pxに収まらない場合。
 */
function drawText(context, text, top, size, weight, spacing = 0) {
  context.letterSpacing = `${spacing}px`
  // 長い名前も左側の領域に収まるまで縮める。横方向への変形はしない。
  do {
    context.font = `${weight} ${size}px "Hiragino Sans"`
    if (context.measureText(text).width <= 570) break
    size -= 1
  } while (size >= 24)
  if (context.measureText(text).width > 570) {
    throw new Error(`文字が左側の領域に収まりません: ${text}`)
  }
  context.fillText(text, 64, top)
}

for (const [name, path] of [['ムニエル', 'public/ogp.png'], ['Munieru', 'public/en/ogp.png']]) {
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(background, 0, 0, width, height)
  context.fillStyle = '#242824'
  context.textBaseline = 'top'
  // CoreTextのCSSウェイトでは、W7=800・W6=700・W3=400に対応する。
  drawText(context, name, 160, 128, 800, -2)
  drawText(context, 'OFFICIAL SITE', 340, 64, 700, -1)
  drawText(context, 'munieru.jp', 455, 44, 400)
  const output = new URL(path, root)
  await mkdir(new URL('./', output), { recursive: true })
  const png = await canvas.encode('png')
  await writeFile(output, png)
  console.log(`${path}: ${width}×${height}, Hiragino Sans, ${png.length} bytes`)
}
