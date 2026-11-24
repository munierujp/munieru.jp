<template>
  <!-- 保存・OS検出・初期描画・メニュー操作は公式コンポーネントへ任せる。 -->
  <UColorModeSelect
    :ui="iconSelectUi"
    :aria-label="t('ui.theme')"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
