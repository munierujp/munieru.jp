import withNuxt from './.nuxt/eslint.config.mjs'

// Nuxtが生成するVue・TypeScript・JavaScriptの推奨設定を使う。
export default withNuxt({
  name: 'app/homepage-fragment',
  files: ['app/pages/index.vue'],
  // トップページはFragmentで構成し、ページ遷移アニメーションは使用しない。
  // Nuxtの単一ルートのチェックは、このページだけ例外にする。
  rules: { 'vue/no-multiple-template-root': 'off' },
})
