import { fileURLToPath } from 'node:url'

export const root = fileURLToPath(new URL('../', import.meta.url))

// サイトとローカルプレビューで共有する公開設定。環境変数で上書きできる。
const defaults = {
  "BASE_DIR": "/",
  "GIFTEE_URL": "https://giftee.com/u/munieru_jp",
  "GITHUB_SPONSOERS_URL": "https://github.com/sponsors/munierujp",
  "PAYPAL_URL": "https://www.paypal.me/munieru",
  "TWITTER_ID": "munieru_jp",
  "OG_IMAGE_PATH": "ogp.png",
  "OG_IMAGE_PATH_EN": "ogp-en.png",
  "ORIGIN": "https://munieru.jp/",
  "WISH_LIST_URL": "http://amzn.asia/9qD1BsF"
}

/** @param {Record<string, string | undefined>} [environment] */
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
