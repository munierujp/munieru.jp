/**
 * neostandardのJS・TS規約と、NuxtのVue・自動インポート向け設定を組み合わせる。
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import { neostandard } from 'neostandard'

// Nuxtが生成するVue・TypeScript・JavaScriptの推奨設定を使う。
export default withNuxt({
  name: 'app/homepage-fragment',
  files: ['app/pages/index.vue'],
  // トップページはFragmentで構成し、ページ遷移アニメーションは使用しない。
  // Nuxtの単一ルートのチェックは、このページだけ例外にする。
  rules: { 'vue/no-multiple-template-root': 'off' },
}).prepend(
  // script setupにもTS規約を適用する。Vueのパーサー・自動インポートは後段のNuxt設定を優先する。
  // JSXは使わないため、対応するルールは読み込まない。
  ...neostandard({ ts: true, filesTs: ['**/*.vue'], noJsx: true })
)
