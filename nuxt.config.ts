import * as SITE_CONSTANTS from './shared/utils/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from './shared/utils/ogp.ts'
import ja from './i18n/locales/ja.json' with { type: 'json' }

export default defineNuxtConfig({
  /** モジュールや配信基盤の互換動作を固定する基準日。 */
  compatibilityDate: '2026-11-12',
  /** 初期HTMLへ本文とメタ情報を出力する。 */
  ssr: true,
  /** 多言語・画像・SEO・検査・UIを担当するモジュール。 */
  // Nuxt UIの追加検査を初回の設定生成から含めるため、ESLintはUIの後に読み込む。
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-schema-org', '@nuxt/ui', '@nuxt/eslint'],
  /** 端末フォントを使い、Nuxt UI向けのクラス検査を公式ESLint設定へ委ねる。 */
  ui: { fonts: false, eslint: true },
  /** テーマの初期選択と、判定できない場合の配色。 */
  colorMode: {
    preference: 'system',
    fallback: 'light'
  },
  /** 外部APIへ依存せずローカル同梱するアイコンの設定。 */
  icon: {
    // 静的生成時はローカルのLucideとSimple Iconsを使い、ブラウザでは同梱済みのアイコンだけを使う。
    provider: { server: 'server', client: 'none' },
    fallbackToApi: false,
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    // テーマ・作品分類の動的な名前も取りこぼさないよう、TSのリテラルも走査する。
    clientBundle: { scan: { globInclude: ['app/**/*.{vue,ts}'] } }
  },
  /** サイト名とURL末尾の方針。公開URLはi18n.baseUrlからの標準連携に任せる。 */
  site: {
    name: ja.nuxtSiteConfig.name,
    trailingSlash: true
  },
  /** 言語別の正規URLだけを登録するサイトマップの設定。 */
  sitemap: {
    autoLastmod: false,
    discoverImages: false,
    xsl: false
  },
  /** ビルド時に生成する画像の品質・表示幅・変換方法。 */
  image: {
    // Netlifyの画像サービスへ依存せず、静的生成時にローカルへ書き出す。
    provider: 'ipx',
    // 圧縮による劣化を抑える方針で、生成画像の品質値を最大にする。
    quality: 100
  },
  /** 日本語はルート、英語は接頭辞付きのURLで表示する。 */
  i18n: {
    defaultLocale: 'ja',
    strategy: 'prefix_except_default',
    trailingSlash: true,
    // Googleの多言語サイト向け推奨に合わせ、言語を推測して転送せずURLを尊重する。
    detectBrowserLanguage: false,
    baseUrl: new URL(SITE_CONSTANTS.BASE_URL).origin,
    locales: [
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  },
  /** Tailwind CSSとNuxt UIを読み込む共通スタイル。 */
  css: ['~~/assets/style/main.css'],
  /** 全ページ共通のHTML属性・メタ情報・アイコン。 */
  app: {
    /** 全ページ共通の配色・共有カードの形式・アイコン。言語別メタ情報はページ側で登録する。 */
    head: {
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
  },
  /** 静的配信と事前描画するページ。出力先は標準の.output/publicを使う。 */
  nitro: {
    preset: 'static',
    prerender: {
      // 404画面はクライアントで描画するため、そこで使う画像だけは明示して静的生成する。
      // app/error.vueの144px表示・1倍/2倍密度と、image.qualityの指定に合わせる。
      routes: ['/', '/en/', '/_ipx/f_webp&q_100&s_144x144/404.png', '/_ipx/f_webp&q_100&s_288x288/404.png']
    }
  }
})
