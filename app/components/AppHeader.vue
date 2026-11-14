<template>
  <header class="site-header flex flex-wrap items-center justify-between gap-3 py-6 wrap">
    <h1 class="wordmark text-2xl font-bold leading-[1.4] max-[560px]:text-[1.2rem]">{{ t('site.title') }}</h1>
    <div class="header-actions ms-auto flex flex-wrap items-center gap-3">
      <AppFrameworkMenu
        class="language-trigger"
        :label="locale === 'ja' ? '日本語' : 'English'"
        :aria-label="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        :title="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        :items="languages"
        @select="selectLanguage"
      >
        <AppIcon name="languages" />
        <span :lang="locale">{{ locale === 'ja' ? '日本語' : 'English' }}</span>
        <AppIcon name="chevron-down" />
      </AppFrameworkMenu>
      <AppFrameworkMenu
        icon-only class="theme-trigger"
        :label="t(`ui.themes.${preference}`)"
        :aria-label="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
        :title="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
        :items="themes"
        @select="selectTheme"
      >
        <AppIcon :name="themeIcon" />
      </AppFrameworkMenu>
    </div>
  </header>
</template>
<script setup lang="ts">
/** 同じ言語・テーマ選択を、各ライブラリのメニューで操作する。 */
import type { IconName, ThemePreference } from '~/types/ui'
const { locale, t, setLocale } = useI18n()
const preference = ref<ThemePreference>('system')
/** システム設定・ライト・ダークの選択状態を、現行版と同じアイコンで示す。 */
const themeIcon = computed<IconName>(
  () => (({ system: 'monitor', light: 'sun', dark: 'moon' }) as const)[preference.value]
)
const languages = computed(() =>
  ['ja', 'en'].map((value) => ({
    value,
    label: value === 'ja' ? '日本語' : 'English',
    selected: locale.value === value,
  }))
)
const themes = computed(() =>
  ['system', 'light', 'dark'].map((value) => ({
    value,
    label: t(`ui.themes.${value}`),
    selected: preference.value === value,
  }))
)
/** 選択言語のURLへ移動し、既存の言語Cookieに保存する。 */
async function selectLanguage (value: string): Promise<void> {
  await setLocale(value as 'ja' | 'en')
}
/** 現行サイトと同じテーマの保存・システム追従を使用する。 */
function selectTheme (value: string): void {
  window.appTheme?.setPreference(value as 'system' | 'light' | 'dark')
  preference.value = value as ThemePreference
}
/** 別タブやシステムからの変更も選択状態へ反映する。 */
function syncPreference (): void {
  preference.value = (document.documentElement.dataset.themePreference ||
    'system') as ThemePreference
}
onMounted(() => {
  syncPreference()
  window.addEventListener('app-theme-change', syncPreference)
})
onBeforeUnmount(() => window.removeEventListener('app-theme-change', syncPreference))
</script>
