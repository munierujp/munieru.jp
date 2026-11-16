/** 静的生成とOGP生成で共有する、ルート配信専用の公開設定。 */
import { fileURLToPath } from 'node:url'

/** 作業ディレクトリに依存しない、リポジトリルートの絶対パス。 */
export const root = fileURLToPath(new URL('../', import.meta.url))

/** 同名の環境変数で上書きできる公開設定。 */
const defaults = {
  /** フッターから案内する、このサイトのソースコードURL。 */
  REPOSITORY_URL: 'https://github.com/munierujp/munieru.jp',
  /** 共有カードに設定するXアカウント名。先頭の`@`は省略可能。 */
  X_ID: 'munieru_jp',
  /** 公開サイトのhttp(s)オリジン。 */
  ORIGIN: 'https://munieru.jp/'
}

/**
 * 公開設定を読み込み、ルートURLと固定のOGP画像パスを返す。
 * @param environment - 上書き値。省略時はprocess.env。
 * @returns 検証済みの公開設定と、共有するURL・画像パス。
 * @throws ORIGINがhttp(s)のURLでない場合。
 */
export function loadConfig (environment: Record<string, string | undefined> = process.env): typeof defaults & {
  /** 公開サイトのルートURL。 */
  BASE_URL: string
  /** X_IDから生成する公開アカウントのURL。 */
  X_URL: string
  /** 日本語OGPの固定出力先。public配下の相対パス。 */
  OG_IMAGE_PATH: string
  /** 英語OGPの固定出力先。public配下の相対パス。 */
  OG_IMAGE_PATH_EN: string
} {
  const config = { ...defaults }
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    config[key] = environment[key] ?? defaults[key]
  }
  const origin = new URL(config.ORIGIN)
  if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('ORIGINにはhttp(s)のURLを指定してください。')
  return {
    ...config,
    BASE_URL: new URL('/', origin).href,
    X_URL: `https://x.com/${config.X_ID.replace(/^@/, '')}`,
    OG_IMAGE_PATH: 'ogp.png',
    OG_IMAGE_PATH_EN: 'en/ogp.png'
  }
}
