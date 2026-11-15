/**
 * ルーティング・多言語・画像・SEOと、静的ホスト向け成果物の生成を設定する。
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { AppHeadMetaObject, NuxtConfig } from 'nuxt/schema'
import { loadConfig } from './config/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from './config/ogp.ts'
import ja from './i18n/locales/ja.json' with { type: 'json' }
import en from './i18n/locales/en.json' with { type: 'json' }

const config = loadConfig()
// ページとOGP画像で共有する日本語のサイト名・著者名を、用途の分かる名前で参照する。
const { title: siteName, name: authorName } = ja.site
/** 言語別ページの初期値となる、日本語OGP画像の代替テキスト。 */
const shareImageAlt = `${siteName} / ${config.BASE_URL}`
const rootPath = (path: string): string => fileURLToPath(new URL(path, import.meta.url))
const asset = (path: string): string => config.BASE_DIR + path.replace(/^\/+/, '')

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
  // 1ページ構成のトップを、Nuxt I18nの設定に従って各言語へ展開する。
  // 入口や生成済みHTMLを別のページとして重複登録しない。
  urls: [{ loc: '/', _i18nTransform: true }],
  excludeAppSources: true,
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

/** 日本語・英語のルートと、言語判定・保存の設定。 */
const i18n: NonNullable<NuxtConfig['i18n']> = {
  defaultLocale: 'ja',
  strategy: 'prefix',
  trailingSlash: true,
  // ルートへの初回アクセスで判定し、以降は利用者が選んだ言語を優先する。
  detectBrowserLanguage: {
    redirectOn: 'root',
    useCookie: true,
    fallbackLocale: 'ja',
    alwaysRedirect: false
  },
  baseUrl: new URL(config.BASE_URL).origin,
  locales: [
    { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
    { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
  ]
}

/** 言語別ページで上書きする前の、全ページ共通のメタ情報・アイコン・構造化データ。 */
const head: AppHeadMetaObject = {
  title: siteName,
  htmlAttrs: { lang: 'ja' },
  // 全ページ共通の端末フォント。動的な値ではないため設定側へまとめる。
  bodyAttrs: {
    class: "font-['Hiragino_Sans','Yu_Gothic',system-ui,sans-serif]"
  },
  meta: [
    { name: 'description', content: ja.description },
    { name: 'author', content: authorName },
    { name: 'color-scheme', content: 'light dark' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: siteName },
    { property: 'og:description', content: ja.description },
    { property: 'og:site_name', content: siteName },
    { property: 'og:image', content: new URL(config.OG_IMAGE_PATH, config.BASE_URL).href },
    { property: 'og:image:width', content: String(OGP_WIDTH) },
    { property: 'og:image:height', content: String(OGP_HEIGHT) },
    { property: 'og:image:alt', content: shareImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@' + config.X_ID.replace(/^@/, '') },
    { name: 'twitter:creator', content: '@' + config.X_ID.replace(/^@/, '') },
    { name: 'twitter:image:alt', content: shareImageAlt }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: asset('favicon.ico') },
    { rel: 'icon', type: 'image/png', href: asset('favicon-256x256.png'), sizes: '256x256' },
    { rel: 'icon', type: 'image/png', href: asset('android-chrome-192x192.png'), sizes: '192x192' },
    { rel: 'apple-touch-icon', href: asset('apple-touch-icon-180x180.png'), sizes: '180x180' }
  ],
  script: [
    {
      key: 'website-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': config.BASE_URL + '#website',
        url: config.BASE_URL,
        name: siteName,
        alternateName: en.site.title,
        inLanguage: ['ja', 'en']
      }).replace(/</g, '\\u003c')
    }
  ]
}

/** 静的成果物の出力先と、入口HTML・転送・robots.txtの生成処理。 */
const nitro: NonNullable<NuxtConfig['nitro']> = {
  preset: 'static',
  prerender: { routes: ['/ja/', '/en/'] },
  hooks: {
    async 'prerender:done' (): Promise<void> {
      // prefix構成ではNuxt I18nがルートの事前描画を除外する。
      // CSR用のHTMLを入口に使い、ブラウザで判定してから言語別ページへ移動する。
      const html = await readFile(rootPath('./dist/200.html'), 'utf8')
      await writeFile(rootPath('./dist/index.html'), html)
      // 検索エンジンが静的ホストのフォールバックを登録しないようにする。
      const errorHtml = await readFile(rootPath('./dist/404.html'), 'utf8')
      await writeFile(rootPath('./dist/404.html'), errorHtml
        .replace('<head>', '<head><meta name="robots" content="noindex, follow">'))
      // Netlifyでは既存ファイルを優先し、見つからないURLだけを言語別トップへ302転送する。
      await writeFile(rootPath('./dist/_redirects'),
        '# Redirect default Netlify subdomain to primary domain\nhttp://munieru.netlify.com/* http://munieru.jp/:splat 301!\n' +
        `\n\n# Redirect missing pages to the homepage (existing files take precedence)\n${asset('en/*')} ${asset('en/')} 302\n${asset('ja/*')} ${asset('ja/')} 302\n${asset('*')} ${config.BASE_DIR} 302\n`)
      // 公開URLから生成し、環境やサブディレクトリを変えても古いURLを残さない。
      await writeFile(rootPath('./dist/robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap_index.xml', config.BASE_URL).href}\n`)
    }
  },
  output: { publicDir: rootPath('./dist') }
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-12',
  ssr: true,
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/sitemap', '@nuxt/eslint', '@nuxt/ui'],
  // 端末フォントを使うためNuxt Fontsの自動登録を止める。
  ui: { fonts: false },
  colorMode,
  icon,
  site: {
    url: new URL(config.BASE_URL).origin,
    name: siteName,
    trailingSlash: true
  },
  sitemap,
  image,
  i18n,
  css: ['~~/assets/style/main.css'],
  runtimeConfig: {
    public: config
  },
  app: {
    baseURL: config.BASE_DIR,
    head
  },
  nitro
})
