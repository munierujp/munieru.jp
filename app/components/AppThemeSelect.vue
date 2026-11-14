<template>
  <!-- 保存・OS検出・初期描画・メニュー操作は公式コンポーネントへ任せる。 -->
  <UColorModeSelect
    class="theme-trigger"
    :ui="iconSelectUi"
    :aria-label="t('ui.theme', { theme: t(`ui.themes.${preference}`) })"
  />
</template>

<script setup lang="ts">
/** テーマ選択の円形トリガーと、現在の選択に応じた読み上げ名を提供する。 */
import type { ThemePreference } from '~/types/ui'
import { iconSelectUi } from '~/utils/iconSelectUi'

const { t } = useI18n()
const colorMode = useColorMode()
/** 静的HTMLでは保存値を取得できないため、判定完了までsystemの表示を保つ。 */
const preference = computed<ThemePreference>(() =>
  !colorMode.unknown && (colorMode.preference === 'light' || colorMode.preference === 'dark')
    ? colorMode.preference
    : 'system'
)
</script>
