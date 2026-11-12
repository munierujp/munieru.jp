/**
 * 静的生成とローカルプレビューで共有する公開設定を、環境変数から組み立てる。
 * @packageDocumentation
 */
import { fileURLToPath } from 'node:url'

/** 作業ディレクトリに依存しない、リポジトリルートの絶対パス。 */
export const root = fileURLToPath(new URL('../', import.meta.url))

/** クライアントにも公開する初期値。秘密情報は含めず、同名の環境変数で上書きする。 */
const defaults = {
  "BASE_DIR": "/",
  "GIFTEE_URL": "https://giftee.com/u/munieru_jp",
  "GITHUB_SPONSOERS_URL": "https://github.com/sponsors/munierujp",
  "PAYPAL_URL": "https://www.paypal.me/munieru",
  "TWITTER_ID": "munieru_jp",
  "OG_IMAGE_PATH": "ogp.png",
  "OG_IMAGE_PATH_EN": "en/ogp.png",
  "ORIGIN": "https://munieru.jp/",
  "WISH_LIST_URL": "http://amzn.asia/9qD1BsF"
}

/**
 * 環境変数を公開設定へ重ね、配信元と公開パスを検証・正規化する。
 * @param {Record<string, string | undefined>} [environment] - 上書き値。省略時はprocess.env。
 * @returns 正規化済みのBASE_DIRと、絶対URLのBASE_URLを含む公開設定。
 * @throws ORIGINがhttp(s)以外、またはBASE_DIRが公開パスとして不正な場合。
 */
export function loadConfig(environment = process.env) {
  const config = { ...defaults, BASE_URL: '' }
  for (const key of /** @type {(keyof typeof defaults)[]} */ (Object.keys(defaults))) {
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
