<template>
  <UContainer as="header" class="site-header flex flex-wrap items-center justify-between gap-3 py-6">
    <h1 class="wordmark text-2xl font-bold leading-[1.4] max-[560px]:text-[1.2rem]">{{ t('site.title') }}</h1>
    <div class="header-actions ms-auto flex flex-wrap items-center gap-3">
      <ULocaleSelect
        class="language-trigger"
        :ui="preferenceSelectUi"
        :model-value="locale"
        :locales="[ja, en]"
        :aria-label="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        @update:model-value="selectLanguage"
      />
      <UColorModeSelect
        class="theme-trigger"
        :ui="preferenceSelectUi"
        :aria-label="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
      />
    </div>
  </UContainer>
</template>
<script setup lang="ts">
/** 言語とテーマの選択を、Nuxt UIの標準セレクトで提供する。 */
import { ja, en } from '@nuxt/ui/locale'
import type { ThemePreference } from '~/types/ui'
/** 640px未満では表示文字と矢印を隠し、読み上げ名を持つ44pxの円形操作にする。 */
const preferenceSelectUi = {
  base: 'max-sm:size-11 max-sm:min-w-11 max-sm:justify-center max-sm:rounded-full max-sm:p-0',
  leading: 'max-sm:static max-sm:p-0',
  value: 'max-sm:hidden',
  content: 'max-sm:min-w-40',
  trailing: 'max-sm:hidden'
}
const { locale, t, setLocale } = useI18n()
/** 保存・OS検出・初期描画はNuxt UI連携の公式モジュールに任せる。 */
const colorMode = useColorMode()
/** 静的HTMLでは保存値を取得できないため、判定完了までsystemの表示を保つ。 */
const preference = computed<ThemePreference>(() =>
  !colorMode.unknown && (colorMode.preference === 'light' || colorMode.preference === 'dark')
    ? colorMode.preference
    : 'system'
)
/** 選択言語のURLへ移動し、既存の言語Cookieに保存する。 */
async function selectLanguage (value: string): Promise<void> {
  await setLocale(value as 'ja' | 'en')
}
/**
 * 公式モジュールが監視しない別タブでの保存値変更だけを補う。
 * @param event - 同一オリジンのlocalStorage変更。
 * @remarks 色の判定やDOM操作は行わず、公式モジュールのpreferenceを更新する。
 */
function syncStoredPreference (event: StorageEvent): void {
  if (event.storageArea !== window.localStorage || (event.key !== 'app-theme' && event.key !== null)) return
  colorMode.preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system'
}
onMounted(() => window.addEventListener('storage', syncStoredPreference))
onBeforeUnmount(() => window.removeEventListener('storage', syncStoredPreference))
</script>
