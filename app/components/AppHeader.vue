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
      <AppLanguageSelect />
      <AppThemeSelect />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
/** ヘッダーはサイト名と選択部品の配置だけを担当する。 */
const { t } = useI18n()
</script>
