/**
 * 静的生成とローカルプレビューで共有する公開設定を、環境変数から組み立てる。
 */
import { fileURLToPath } from 'node:url'
import supportData from '../modules/support.json' with { type: 'json' }

/** 作業ディレクトリに依存しない、リポジトリルートの絶対パス。 */
export const root = fileURLToPath(new URL('../', import.meta.url))

/** 支援URLの既定値は、表示する一覧と同じJSONを参照する。 */
const supportUrls = new Map(supportData.map(link => [link.key, link.url]))

/** クライアントにも公開する初期値。秘密情報は含めず、同名の環境変数で上書きする。 */
const defaults = {
  /** 公開先のサブディレクトリ。ルート配信は /。 */
  BASE_DIR: '/',
  /** gifteeの公開支援ページ。空文字の場合は表示しない。 */
  GIFTEE_URL: supportUrls.get('giftee') ?? '',
  /** GitHub Sponsorsの公開支援ページ。空文字の場合は表示しない。 */
  GITHUB_SPONSOERS_URL: supportUrls.get('github-sponsors') ?? '',
  /** PayPalの公開支援ページ。空文字の場合は表示しない。 */
  PAYPAL_URL: supportUrls.get('paypal') ?? '',
  /** 共有カードに設定するXアカウント名。先頭の@は省略可能。 */
  X_ID: 'munieru_jp',
  /** publicを基準とする日本語OGP画像のパス。 */
  OG_IMAGE_PATH: 'ogp.png',
  /** publicを基準とする英語OGP画像のパス。 */
  OG_IMAGE_PATH_EN: 'en/ogp.png',
  /** 公開サイトのhttp(s)オリジン。 */
  ORIGIN: 'https://munieru.jp/',
  /** ほしい物リストの公開URL。空文字の場合は表示しない。 */
  WISH_LIST_URL: supportUrls.get('wish-list') ?? ''
}

/**
 * 環境変数を公開設定へ重ね、配信元と公開パスを検証・正規化する。
 * @param environment - 上書き値。省略時はprocess.env。
 * @returns 正規化済みのBASE_DIRと、絶対URLのBASE_URLを含む公開設定。
 * @throws ORIGINがhttp(s)以外、またはBASE_DIRが公開パスとして不正な場合。
 */
export function loadConfig (environment: Record<string, string | undefined> = process.env): typeof defaults & {
  /** 公開パスを含むサイトの絶対URL。 */
  BASE_URL: string
} {
  const config = { ...defaults, BASE_URL: '' }
  for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
    config[key] = environment[key] ?? defaults[key]
  }
  const origin = new URL(config.ORIGIN)
  if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('ORIGINにはhttp(s)のURLを指定してください。')
  if (!config.BASE_DIR.startsWith('/') || config.BASE_DIR.startsWith('//') || /[?#\\]/.test(config.BASE_DIR)) {
    throw new Error('BASE_DIRには / または /portfolio/ のようなパスを指定してください。')
  }
  config.BASE_DIR = `${config.BASE_DIR.replace(/\/+$/, '')}/`
  config.BASE_URL = new URL(config.BASE_DIR, origin).href
  return config
}
