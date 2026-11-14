<template>
  <UContainer as="header" class="site-header flex flex-wrap items-center justify-between gap-3 py-6">
    <h1 class="wordmark text-2xl font-bold leading-[1.4] max-[560px]:text-[1.2rem]">{{ t('site.title') }}</h1>
    <div class="header-actions ms-auto flex flex-wrap items-center gap-3">
      <AppPreferenceMenu
        class="language-trigger"
        :label="locale === 'ja' ? '日本語' : 'English'"
        :aria-label="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        :title="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        :items="languages"
        @select="selectLanguage"
      >
        <UIcon class="app-icon block size-6 shrink-0" aria-hidden="true" name="i-tabler-language" />
        <span :lang="locale">{{ locale === 'ja' ? '日本語' : 'English' }}</span>
        <UIcon class="app-icon block size-6 shrink-0" aria-hidden="true" name="i-tabler-chevron-down" />
      </AppPreferenceMenu>
      <AppPreferenceMenu
        icon-only class="theme-trigger"
        :label="t(`ui.themes.${preference}`)"
        :aria-label="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
        :title="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
        :items="themes"
        @select="selectTheme"
      >
        <UIcon class="app-icon block size-6 shrink-0" aria-hidden="true" :name="themeIcon" />
      </AppPreferenceMenu>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
/** 同じ言語・テーマ選択を、各ライブラリのメニューで操作する。 */
import type { IconName, ThemePreference } from '~/types/ui'
const { locale, t, setLocale } = useI18n()
/** 保存・OS検出・初期描画はNuxt UI連携の公式モジュールに任せる。 */
const colorMode = useColorMode()
/** 静的HTMLでは保存値を取得できないため、判定完了までsystemの表示を保つ。 */
const preference = computed<ThemePreference>(() =>
  !colorMode.unknown && (colorMode.preference === 'light' || colorMode.preference === 'dark')
    ? colorMode.preference
    : 'system'
)
/** システム設定・ライト・ダークの選択状態を、現行版と同じアイコンで示す。 */
const themeIcon = computed<IconName>(
  () => (({ system: 'i-tabler-device-desktop', light: 'i-tabler-sun', dark: 'i-tabler-moon' }) as const)[preference.value]
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
/** 選択値を公式モジュールへ渡し、配色の適用と保存を任せる。 */
function selectTheme (value: string): void {
  if (value === 'system' || value === 'light' || value === 'dark') colorMode.preference = value
}
/**
 * 公式モジュールが監視しない別タブでの保存値変更だけを補う。
 * @param event - 同一オリジンのlocalStorage変更。
 * @remarks 色の判定やDOM操作は行わず、公式モジュールのpreferenceを更新する。
 */
function syncStoredPreference (event: StorageEvent): void {
  if (event.storageArea !== window.localStorage || (event.key !== 'app-theme' && event.key !== null)) return
  selectTheme(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system')
}
onMounted(() => window.addEventListener('storage', syncStoredPreference))
onBeforeUnmount(() => window.removeEventListener('storage', syncStoredPreference))
</script>
