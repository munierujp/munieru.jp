import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import PButton from 'primevue/button'
import PCard from 'primevue/card'
import PTag from 'primevue/tag'
import PMenu from 'primevue/menu'
/** 無償MIT版のAuraテーマと使用部品を登録する。 */
export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: '.dark' } } })
  for (const [name, component] of Object.entries({ PButton, PCard, PTag, PMenu })) { nuxt.vueApp.component(name, component) }
})
