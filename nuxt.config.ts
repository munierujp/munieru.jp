/**
 * ルーティング・多言語・画像・SEOと、静的ホスト向け成果物の生成を設定する。
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { AppHeadMetaObject, NuxtConfig } from 'nuxt/schema'
import { loadConfig } from './config/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from './config/ogp.ts'
import ja from './i18n/locales/ja.json' with { type: 'json' }

const config = loadConfig()
// サイト共通の設定で使う日本語のサイト名。
const { title: siteName } = ja.site
const rootPath = (path: string): string => fileURLToPath(new URL(path, import.meta.url))

/** テーマの初期選択・判定できない場合の配色・保存先。 */
const colorMode: NonNullable<NuxtConfig['colorMode']> = {
  preference: 'system',
  fallback: 'light',
  // 利用者のテーマ選択を保存するlocalStorageのキー。
  storageKey: 'app-theme'
}

/** 外部APIへ依存せずローカル同梱するアイコンの設定。 */
const icon: NonNullable<NuxtConfig['icon']> = {
  // 静的生成時はローカルのLucideとSimple Iconsを使い、ブラウザでは同梱済みのアイコンだけを使う。
  provider: { server: 'server', client: 'none' },
  fallbackToApi: false,
  serverBundle: { collections: ['lucide', 'simple-icons'] },
  // テーマ・作品分類の動的な名前も取りこぼさないよう、TSのリテラルも走査する。
  clientBundle: { scan: { globInclude: ['app/**/*.{vue,ts}'] } }
}

/** 言語別の正規URLだけを登録するサイトマップの設定。 */
const sitemap: NonNullable<NuxtConfig['sitemap']> = {
  autoLastmod: false,
  discoverImages: false,
  xsl: false
}

/** ビルド時に生成する画像の品質・表示幅・変換方法。 */
const image: NonNullable<NuxtConfig['image']> = {
  // Netlifyの画像サービスへ依存せず、静的生成時にローカルへ書き出す。
  provider: 'ipx',
  // 圧縮による劣化を抑える方針で、AVIF・WebPとも品質値を最大にする。
  quality: 100,
  screens: { mobile: 560, tablet: 561 }
}

/** 日本語はルート、英語は接頭辞付きのURLで表示する。 */
const i18n: NonNullable<NuxtConfig['i18n']> = {
  defaultLocale: 'ja',
  strategy: 'prefix_except_default',
  trailingSlash: true,
  // URLに対応する言語を常に表示し、ブラウザ言語・Cookieで転送しない。
  detectBrowserLanguage: false,
  baseUrl: new URL(config.BASE_URL).origin,
  locales: [
    { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
    { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
  ]
}

/** 全ページ共通の配色・共有カードの形式・アイコン。言語別メタ情報はページ側で登録する。 */
const head: AppHeadMetaObject = {
  htmlAttrs: { lang: 'ja' },
  // 全ページ共通の端末フォント。動的な値ではないため設定側へまとめる。
  bodyAttrs: {
    class: "font-['Hiragino_Sans','Yu_Gothic',system-ui,sans-serif]"
  },
  meta: [
    { name: 'color-scheme', content: 'light dark' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image:width', content: String(OGP_WIDTH) },
    { property: 'og:image:height', content: String(OGP_HEIGHT) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@' + config.X_ID.replace(/^@/, '') },
    { name: 'twitter:creator', content: '@' + config.X_ID.replace(/^@/, '') }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', href: '/favicon-256x256.png', sizes: '256x256' },
    { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' }
  ]
}

/** 静的成果物の出力先と、転送ルールの生成処理。 */
const nitro: NonNullable<NuxtConfig['nitro']> = {
  preset: 'static',
  prerender: { routes: ['/', '/en/'] },
  hooks: {
    async 'prerender:done' (): Promise<void> {
      // Netlifyでは既存ファイルを優先し、見つからないURLだけを言語別トップへ302転送する。
      await writeFile(rootPath('./dist/_redirects'),
        '# Redirect default Netlify subdomain to primary domain\nhttp://munieru.netlify.com/* http://munieru.jp/:splat 301!\n' +
        '\n\n# Redirect the former Japanese homepage to its canonical URL\n/ja / 301\n/ja/ / 301\n\n# Redirect missing pages to the homepage (existing files take precedence)\n/en/* /en/ 302\n/* / 302\n')
    }
  },
  output: { publicDir: rootPath('./dist') }
}

/** 端末フォントを使い、Nuxt Fontsの自動登録を止める。 */
const ui: NonNullable<NuxtConfig['ui']> = { fonts: false }

/** 公開サイトの正規オリジン・サイト名・URL末尾の方針。 */
const site: NonNullable<NuxtConfig['site']> = {
  url: new URL(config.BASE_URL).origin,
  name: siteName,
  trailingSlash: true
}

/** ブラウザでも参照する、検証・正規化済みの公開設定。 */
const runtimeConfig: NonNullable<NuxtConfig['runtimeConfig']> = {
  public: config
}

/** 全ページ共通のメタ情報。 */
const app: NonNullable<NuxtConfig['app']> = {
  head
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-12',
  ssr: true,
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-schema-org', '@nuxt/eslint', '@nuxt/ui'],
  ui,
  colorMode,
  icon,
  site,
  sitemap,
  image,
  i18n,
  css: ['~~/assets/style/main.css'],
  runtimeConfig,
  app,
  nitro
})
