<template>
  <!-- 背景・下線・追従は標準設定。長いサイト名と設定欄は必要な場合だけ折り返す。 -->
  <UHeader
    class="site-header"
    :toggle="false"
    :ui="{ root: 'h-auto min-h-(--ui-header-height)', container: 'flex-wrap gap-2 py-2.5', left: 'lg:flex-none', right: 'ms-auto gap-2 lg:flex-none' }"
  >
    <!-- 1ページ構成のため、サイト名はリンクにせず見出しとして表示する。 -->
    <template #left>
      <h1 class="wordmark font-bold text-[clamp(0.875rem,4vw,1.25rem)]">{{ t('site.title') }}</h1>
    </template>
    <template #right>
      <USelectMenu
        class="language-trigger"
        :ui="iconSelectUi"
        :model-value="locale"
        :items="[ja, en]"
        :search-input="false"
        value-key="code"
        label-key="name"
        icon="i-lucide-languages"
        :aria-label="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
        @update:model-value="selectLanguage"
      />
      <UColorModeSelect
        class="theme-trigger"
        :ui="iconSelectUi"
        :aria-label="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
      />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
/** 言語とテーマの選択を、Nuxt UIの標準セレクトで提供する。 */
import { ja, en } from '@nuxt/ui/locale'
import type { ThemePreference } from '~/types/ui'
/** トリガーだけ円形アイコンにし、メニューの文字と読み上げ名は維持する。 */
const iconSelectUi = {
  base: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0',
  leading: 'static p-0',
  value: 'hidden',
  trailing: 'hidden',
  content: 'min-w-40'
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
</script>
