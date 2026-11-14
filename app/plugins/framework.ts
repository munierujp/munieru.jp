import { createVuetify } from 'vuetify'
import { VApp, VBtn, VCard, VChip, VMenu, VList, VListItem } from 'vuetify/components'
/** 比較で使う部品だけを登録し、既存のテーマ選択に同期する。 */
export default defineNuxtPlugin((nuxt) => {
  const ui = createVuetify({
    ssr: true,
    components: { VApp, VBtn, VCard, VChip, VMenu, VList, VListItem },
  })
  nuxt.vueApp.use(ui)
  if (import.meta.client) {
    const sync = (): void => {
      ui.theme.change(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
    }
    nuxt.hook('app:mounted', () => {
      sync()
      window.addEventListener('app-theme-change', sync)
    })
  }
})
