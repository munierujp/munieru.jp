<template>
  <!-- 背景・下線・追従は標準設定。長いサイト名と設定欄は必要な場合だけ折り返す。 -->
  <UHeader
    :toggle="false"
    :ui="{ root: 'h-auto min-h-(--ui-header-height)', container: 'flex-wrap gap-2 py-2.5', left: 'lg:flex-none', right: 'ms-auto gap-2 lg:flex-none' }"
  >
    <template #left>
      <!-- 利用者の文字サイズ設定に比例して拡大する、標準の相対サイズを使う。 -->
      <h1 class="text-base font-bold">
        <NuxtLinkLocale to="index">
          {{ config.name }}
        </NuxtLinkLocale>
      </h1>
    </template>
    <template #right>
      <AppLanguageSelect />
      <AppThemeSelect />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
const config = useSiteConfig()
</script>
