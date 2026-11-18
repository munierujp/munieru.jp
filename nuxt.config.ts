/**
 * ルーティング・多言語・画像・SEOと、静的ホスト向け成果物の生成を設定する。
 */
import { fileURLToPath } from 'node:url'
import type { AppHeadMetaObject, NuxtConfig } from 'nuxt/schema'
import * as SITE_CONSTANTS from './shared/utils/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from './shared/utils/ogp.ts'
import ja from './i18n/locales/ja.json' with { type: 'json' }

// サイト共通の設定で使う日本語のサイト名。
const { name: siteName } = ja.nuxtSiteConfig
const rootPath = (path: string): string => fileURLToPath(new URL(path, import.meta.url))

/** テーマの初期選択と、判定できない場合の配色。 */
const colorMode: NonNullable<NuxtConfig['colorMode']> = {
  preference: 'system',
  fallback: 'light'
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
  // 圧縮による劣化を抑える方針で、生成画像の品質値を最大にする。
  quality: 100
}

/** 日本語はルート、英語は接頭辞付きのURLで表示する。 */
const i18n: NonNullable<NuxtConfig['i18n']> = {
  defaultLocale: 'ja',
  strategy: 'prefix_except_default',
  trailingSlash: true,
  // URLに対応する言語を常に表示し、ブラウザ言語・Cookieで転送しない。
  detectBrowserLanguage: false,
  baseUrl: new URL(SITE_CONSTANTS.BASE_URL).origin,
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
    { name: 'twitter:site', content: '@' + SITE_CONSTANTS.X_ID },
    { name: 'twitter:creator', content: '@' + SITE_CONSTANTS.X_ID }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', href: '/favicon-256x256.png', sizes: '256x256' },
    { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' }
  ]
}

/** 静的成果物の出力先と事前描画するページ。 */
const nitro: NonNullable<NuxtConfig['nitro']> = {
  preset: 'static',
  prerender: { routes: ['/', '/en/'] },
  output: { publicDir: rootPath('./dist') }
}

/** 端末フォントを使い、Nuxt Fontsの自動登録を止める。 */
const ui: NonNullable<NuxtConfig['ui']> = { fonts: false }

/** 公開サイトの正規オリジン・サイト名・URL末尾の方針。 */
const site: NonNullable<NuxtConfig['site']> = {
  url: new URL(SITE_CONSTANTS.BASE_URL).origin,
  name: siteName,
  trailingSlash: true
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
  app,
  nitro
})
