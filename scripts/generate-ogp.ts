/** Takumiで日英のOGPを生成し、生成済みPNGだけをサイトのpublic配下へ反映する。 */
import { copyFile, mkdir, readFile, rm } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { loadConfig } from '../config/site.ts'

/** 作業ディレクトリに依存せず、リポジトリ内のURLを解決する。 */
const root = new URL('../', import.meta.url)
const cache = new URL('.cache/ogp/', root)
const config = loadConfig()

// 意図しない代替フォントで既存の画像を上書きしない。
if (process.platform !== 'darwin') throw new Error('OGPの再生成にはヒラギノのあるmacOSが必要です')
await mkdir(new URL('public/', cache), { recursive: true })
try {
  for (const weight of [3, 6, 9]) {
    await copyFile(`/System/Library/Fonts/ヒラギノ角ゴシック W${weight}.ttc`, new URL(`public/w${weight}.ttc`, cache))
  }
  await copyFile(new URL('public/profile.png', root), new URL('public/profile.png', cache))
  // 通常のサイト生成は実行せず、画像生成専用のNuxtをビルドする。
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('node_modules/nuxt/bin/nuxt.mjs', root)), 'generate', fileURLToPath(new URL('ogp/', root))], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error('OGP生成用Nuxtのビルドに失敗しました')
  for (const [page, outputPath] of [['index.html', config.OG_IMAGE_PATH], ['en/index.html', config.OG_IMAGE_PATH_EN]] as const) {
    const html = await readFile(new URL('output/' + page, cache), 'utf8')
    // 自分で生成したHTMLから、Nuxt OG Imageが決定したPNGのURLを取得する。
    const image = html.match(/<meta property="og:image" content="([^"]+)"/u)?.[1]
    if (!image) throw new Error(`OGP画像のURLが出力されていません: ${page}`)
    const output = new URL(outputPath, new URL('public/', root))
    await mkdir(new URL('./', output), { recursive: true })
    await copyFile(new URL('output' + new URL(image).pathname, cache), output)
    console.log(fileURLToPath(output))
  }
} finally {
  // ヒラギノのファイルや、それを含む生成用成果物を公開・コミットしない。
  await rm(cache, { recursive: true, force: true })
}
