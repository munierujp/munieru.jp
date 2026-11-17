/** 静的生成とOGP生成で共有する、ルート配信専用の公開設定。 */
import { fileURLToPath } from 'node:url'

/** 作業ディレクトリに依存しない、リポジトリルートの絶対パス。 */
export const ROOT = fileURLToPath(new URL('../', import.meta.url))

/** メタ情報とフッターで共有する、先頭の`@`を含まないXアカウント名。 */
const X_ID = 'munieru_jp'

/** 公開先・アカウント・画像パスの固定値。環境変数では上書きしない。 */
export const SITE_CONFIG = {
  /** フッターから案内する、このサイトのソースコードURL。 */
  REPOSITORY_URL: 'https://github.com/munierujp/munieru.jp',
  /** 公開サイトのルートURL。末尾のスラッシュを含める。 */
  BASE_URL: 'https://munieru.jp/',
  /** 共有カードに設定するXアカウント名。 */
  X_ID,
  /** フッターから案内するXアカウントのURL。 */
  X_URL: `https://x.com/${X_ID}`,
  /** 日本語OGPの固定出力先。public配下の相対パス。 */
  OG_IMAGE_PATH: 'ogp.png',
  /** 英語OGPの固定出力先。public配下の相対パス。 */
  OG_IMAGE_PATH_EN: 'en/ogp.png'
}
