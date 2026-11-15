<template>
  <!-- 保存・OS検出・初期描画・メニュー操作は公式コンポーネントへ任せる。 -->
  <UColorModeSelect
    class="theme-trigger"
    :ui="iconSelectUi"
    :aria-label="t('ui.theme')"
  />
</template>

<script setup lang="ts">
/** テーマ選択の円形トリガーと、その用途を示す読み上げ名を提供する。 */
import { iconSelectUi } from '~/utils/iconSelectUi'

const { t } = useI18n()
</script>
