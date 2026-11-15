/**
 * 静的生成とOGP生成で共有する公開設定を、環境変数から組み立てる。
 */
import { fileURLToPath } from 'node:url'

/** 作業ディレクトリに依存しない、リポジトリルートの絶対パス。 */
export const root = fileURLToPath(new URL('../', import.meta.url))

/** クライアントにも公開する初期値。秘密情報は含めず、同名の環境変数で上書きする。 */
const defaults = {
  /** 公開先のサブディレクトリ。ルート配信は /。 */
  BASE_DIR: '/',
  /** フッターから案内する、このサイトのソースコードURL。 */
  REPOSITORY_URL: 'https://github.com/munierujp/munieru.jp',
  /** 共有カードに設定するXアカウント名。先頭の@は省略可能。 */
  X_ID: 'munieru_jp',
  /** public配下の日本語OGP画像の相対パス。先頭の/やURL表記は付けない。 */
  OG_IMAGE_PATH: 'ogp.png',
  /** public配下の英語OGP画像の相対パス。先頭の/やURL表記は付けない。 */
  OG_IMAGE_PATH_EN: 'en/ogp.png',
  /** 公開サイトのhttp(s)オリジン。 */
  ORIGIN: 'https://munieru.jp/'
}

/**
 * 環境変数を公開設定へ重ね、配信元と公開パスを検証・正規化する。
 * @param environment - 上書き値。省略時はprocess.env。
 * @returns 正規化済みのBASE_DIRと、絶対URLのBASE_URL・X_URLを含む公開設定。
 * @throws ORIGIN・BASE_DIR・OGP画像の相対パスが不正な場合。
 */
export function loadConfig (environment: Record<string, string | undefined> = process.env): typeof defaults & {
  /** 公開パスを含むサイトの絶対URL。 */
  BASE_URL: string
  /** X_IDから生成する、Xアカウントの公開URL。 */
  X_URL: string
} {
  const config = { ...defaults, BASE_URL: '', X_URL: '' }
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    config[key] = environment[key] ?? defaults[key]
  }
  const origin = new URL(config.ORIGIN)
  if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('ORIGINにはhttp(s)のURLを指定してください。')
  if (!config.BASE_DIR.startsWith('/') || config.BASE_DIR.startsWith('//') || /[?#\\]/.test(config.BASE_DIR)) {
    throw new Error('BASE_DIRには / または /portfolio/ のようなパスを指定してください。')
  }
  // 同じ値を公開URLとローカルの生成先に使うため、URL固有の表記や階層移動は許可しない。
  for (const key of ['OG_IMAGE_PATH', 'OG_IMAGE_PATH_EN'] as const) {
    const path = config[key]
    if (path !== path.trim() || /[\\%?#:]/.test(path) || path.split('/').some(segment => ['', '.', '..'].includes(segment))) {
      throw new Error(`${key}にはpublic配下の相対パス（例: en/ogp.png）を指定してください。`)
    }
  }
  config.BASE_DIR = `${config.BASE_DIR.replace(/\/+$/, '')}/`
  config.BASE_URL = new URL(config.BASE_DIR, origin).href
  config.X_URL = `https://x.com/${config.X_ID.replace(/^@/, '')}`
  return config
}
