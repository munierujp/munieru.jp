/**
 * ルーティング・多言語・画像・SEOと、静的ホスト向け成果物の生成を設定する。
 */
import { readFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { loadConfig } from './scripts/config.ts'
import ja from './i18n/locales/ja.json' with { type: 'json' }
import en from './i18n/locales/en.json' with { type: 'json' }
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript'

const config = loadConfig()
// ページとOGP画像の生成で、同じ翻訳辞書のサイト名を参照する。
const site = ja.site
const rootPath = (path: string): string => fileURLToPath(new URL(path, import.meta.url))
const asset = (path: string): string => config.BASE_DIR + path.replace(/^\/+/, '')
/**
 * テーマ用TSを、型注釈やモジュール読込を必要としないブラウザ用JSへ変換する。
 * @param path - リポジトリルートからのソースパス。
 * @returns headへ埋め込む通常のスクリプト。型の検査はtypecheckで別途行う。
 */
const browserScript = (path: string): string => transpileModule(readFileSync(rootPath(path), 'utf8'), {
  compilerOptions: { target: ScriptTarget.ES2022, module: ModuleKind.None, removeComments: true }
}).outputText

export default defineNuxtConfig({
  compatibilityDate: '2026-11-12',
  ssr: true,
  devtools: { enabled: false },
  telemetry: false,
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/sitemap', '@nuxt/eslint'],
  site: {
    url: new URL(config.BASE_URL).origin,
    name: site.title,
    trailingSlash: true
  },
  sitemap: {
    // 1ページ構成のトップを、Nuxt I18nの設定に従って各言語へ展開する。
    // 入口や生成済みHTMLを別のページとして重複登録しない。
    urls: [{ loc: '/', _i18nTransform: true }],
    excludeAppSources: true,
    autoLastmod: false,
    discoverImages: false,
    xsl: false
  },
  image: {
    // Netlifyの画像サービスへ依存せず、静的生成時にローカルへ書き出す。
    provider: 'ipx',
    quality: 85,
    screens: { mobile: 560, tablet: 561, desktop: 801 }
  },
  i18n: {
    defaultLocale: 'ja',
    strategy: 'prefix',
    trailingSlash: true,
    // ルートへの初回アクセスで判定し、以降は利用者が選んだ言語を優先する。
    detectBrowserLanguage: {
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'ja',
      alwaysRedirect: false
    },
    baseUrl: new URL(config.BASE_URL).origin,
    locales: [
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  },
  css: ['~~/assets/style/main.css'],
  runtimeConfig: {
    public: { siteConfig: config }
  },
  app: {
    baseURL: config.BASE_DIR,
    head: {
      title: site.title,
      htmlAttrs: { lang: 'ja' },
      meta: [
        { name: 'description', content: ja.description },
        { name: 'author', content: site.name },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light dark', tagPriority: -15 },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: site.title },
        { property: 'og:description', content: ja.description },
        { property: 'og:site_name', content: site.title },
        { property: 'og:image', content: new URL(config.OG_IMAGE_PATH, config.BASE_URL).href },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: ja.ui.ogImageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@' + config.TWITTER_ID.replace(/^@/, '') },
        { name: 'twitter:creator', content: '@' + config.TWITTER_ID.replace(/^@/, '') },
        { name: 'twitter:image:alt', content: ja.ui.ogImageAlt }
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
            name: site.title,
            alternateName: en.site.title,
            inLanguage: ['ja', 'en']
          }).replace(/</g, '\\u003c')
        },
        { id: 'theme-bootstrap', tagPriority: -14, innerHTML: browserScript('./assets/theme-bootstrap.ts') },
        { id: 'theme-controller', tagPriority: -13, innerHTML: browserScript('./assets/theme-init.ts') }
      ]
    }
  },
  nitro: {
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
})
