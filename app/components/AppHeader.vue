<template>
  <!-- 背景・下線・追従は標準設定。長いサイト名と設定欄は必要な場合だけ折り返す。 -->
  <UHeader
    :toggle="false"
    :ui="{ root: 'h-auto min-h-(--ui-header-height)', container: 'flex-wrap gap-2 py-2.5', left: 'lg:flex-none', right: 'ms-auto gap-2 lg:flex-none' }"
  >
      <template #left>
      <h1 class="font-bold text-[clamp(0.875rem,4vw,1.25rem)]">
        <NuxtLinkLocale to="index">{{ site.name }}</NuxtLinkLocale>
      </h1>
    </template>
    <template #right>
      <AppLanguageSelect />
      <AppThemeSelect />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
const site = useSiteConfig()
</script>
