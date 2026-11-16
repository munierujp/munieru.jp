/** Takumiの公式Node APIで日英のOGP画像を描画し、公開用PNGへ直接書き出す。 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { Renderer } from '@takumi-rs/core'
import type { Node } from '@takumi-rs/core'
import { loadConfig } from '../config/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from '../config/ogp.ts'
import ja from '../i18n/locales/ja.json' with { type: 'json' }
import en from '../i18n/locales/en.json' with { type: 'json' }

// 必要な書体がない環境では、代替フォントで公開画像を上書きしない。
if (process.platform !== 'darwin') throw new Error('OGPの再生成にはヒラギノのあるmacOSが必要です')
/** 実行ディレクトリに依存せず、サイト内の画像と出力先を解決する。 */
const root = new URL('../', import.meta.url)
/** メタ情報と共有する公開URL・日英の固定出力先。 */
const config = loadConfig()
/** フォントを一度だけ登録し、日英2枚で共有する描画エンジン。 */
const renderer = new Renderer()
// TTCの実書体を使い、名前W9・副題W6・URL W3をCSSのウェイトへ対応させる。
for (const weight of [3, 6, 9]) {
  await renderer.registerFont({ name: 'OGP Hiragino', weight: weight * 100, style: 'normal', data: await readFile(`/System/Library/Fonts/ヒラギノ角ゴシック W${weight}.ttc`) })
}
/** ネットワーク取得や一時コピーをせず、サイトと同じプロフィール画像を渡す。 */
const images = [{ src: '/profile.png', data: await readFile(new URL('public/profile.png', root)) }]
// 英語名も画像との余白を確保する、比較済みの文字サイズを使う。
for (const [messages, nameSize, outputPath] of [[ja, 128, config.OG_IMAGE_PATH], [en, 113, config.OG_IMAGE_PATH_EN]] as const) {
  const { name, title } = messages.site
  /** 位置・字間・円形クリップはCSSで宣言し、計測と描画はTakumiへ任せる。 */
  const node: Node = {
    type: 'container',
    style: { display: 'flex', position: 'relative', width: OGP_WIDTH, height: OGP_HEIGHT, backgroundColor: '#9CC9DA', color: '#242824', fontFamily: 'OGP Hiragino' },
    children: [
      { type: 'text', text: name, style: { display: 'flex', position: 'absolute', left: 64, top: 176, fontSize: nameSize, fontWeight: 900, lineHeight: 1, letterSpacing: -2, whiteSpace: 'nowrap' } },
      { type: 'text', text: title.slice(name.length).trim(), style: { display: 'flex', position: 'absolute', left: 64, top: 328, fontSize: 64, fontWeight: 600, lineHeight: 1, letterSpacing: -1, whiteSpace: 'nowrap' } },
      { type: 'text', text: config.BASE_URL, style: { display: 'flex', position: 'absolute', left: 64, top: 414, fontSize: 44, fontWeight: 300, lineHeight: 1, whiteSpace: 'nowrap' } },
      { type: 'image', src: '/profile.png', width: 448, height: 448, style: { position: 'absolute', left: 688, top: 91, width: 448, height: 448, borderRadius: 224, objectFit: 'cover' } }
    ]
  }
  const output = new URL('public/' + outputPath, root)
  await mkdir(new URL('./', output), { recursive: true })
  await writeFile(output, await renderer.render(node, { width: OGP_WIDTH, height: OGP_HEIGHT, format: 'png', images }))
  console.log(fileURLToPath(output))
}
