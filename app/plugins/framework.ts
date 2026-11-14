import {
  ElButton,
  ElCard,
  ElTag,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'
/** 使用する標準部品だけを登録する。 */
export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
  nuxt.vueApp.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  for (const component of [ElButton, ElCard, ElTag, ElDropdown, ElDropdownMenu, ElDropdownItem]) { nuxt.vueApp.component(component.name!, component) }
})
