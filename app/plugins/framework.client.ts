/** SSR本文のハイドレーション後にOnsenのカスタム要素を登録する。 */
export default defineNuxtPlugin((nuxt) => {
  nuxt.hook('app:mounted', async () => {
    const ons = await import('onsenui/js/onsenui.js')
    ons.default.disableAutoStyling()
  })
})
