<template>
  <!-- 現在の選択を1つのアイコンで表示し、独自メニューで3種類から選択する。 -->
  <div ref="switcher" class="theme-switcher">
    <button
      :id="triggerId"
      ref="trigger"
      class="theme-trigger"
      type="button"
      :aria-label="t('ui.theme', { theme: currentTheme.label })"
      :title="t('ui.theme', { theme: currentTheme.label })"
      aria-haspopup="menu"
      :aria-controls="menuId"
      :aria-expanded="menuOpen ? 'true' : 'false'"
      :disabled="!ready"
      @click="toggleMenu"
      @keydown="onTriggerKeydown"
    >
      <AppIcon :name="currentTheme.icon" />
    </button>
    <div
      :id="menuId"
      class="dropdown-menu theme-menu"
      role="menu"
      :aria-labelledby="triggerId"
      :hidden="!menuOpen"
      @keydown="onMenuKeydown"
    >
      <div role="group" :aria-label="t('ui.themeGroup')">
        <button
          v-for="theme in themes"
          :key="theme.value"
          ref="items"
          class="dropdown-option theme-option"
          type="button"
          role="menuitemradio"
          :aria-checked="preference === theme.value ? 'true' : 'false'"
          :data-theme-value="theme.value"
          tabindex="-1"
          @click="changeTheme(theme.value)"
        >
          <AppIcon :name="theme.icon" />
          <span>{{ theme.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { IconName, ThemePreference } from '~/types/ui'

const { t } = useSiteLocale()
const { menuOpen, switcher, trigger, items, triggerId, menuId, closeMenu, toggleMenu, onTriggerKeydown, onMenuKeydown } = useDropdownMenu()
const themes = computed(() => [
  { value: 'system', label: t('ui.themes.system'), icon: 'monitor' },
  { value: 'light', label: t('ui.themes.light'), icon: 'sun' },
  { value: 'dark', label: t('ui.themes.dark'), icon: 'moon' }
] as const satisfies readonly { value: ThemePreference; label: string; icon: IconName }[])
// SSRと初回描画は同じ状態にし、マウント後にブラウザの設定へ同期する。
const preference = ref<ThemePreference>('system')
const ready = ref(false)
const currentTheme = computed(() => themes.value.find(theme => theme.value === preference.value) ?? themes.value[0])

// 保存・OS設定の追従は public/theme-init.js が担当し、このコンポーネントはUIを同期する。
function syncTheme() {
  const value = document.documentElement.dataset.themePreference
  preference.value = value === 'light' || value === 'dark' ? value : 'system'
}
function changeTheme(value: ThemePreference) {
  window.munieruTheme?.setPreference(value)
  closeMenu(true)
}
// 保存設定とUIを同期し、解除時にリスナーを取り除く。
onMounted(() => {
  syncTheme()
  ready.value = Boolean(window.munieruTheme)
  window.addEventListener('munieru-theme-change', syncTheme)
})
onBeforeUnmount(() => {
  window.removeEventListener('munieru-theme-change', syncTheme)
})
</script>
