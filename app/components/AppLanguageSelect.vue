<template>
  <!-- 言語名・選択状態・キー操作は標準メニューで提供し、トリガーは円形アイコンにする。 -->
  <USelectMenu
    :ui="iconSelectUi"
    :model-value="locale"
    :items="locales"
    :search-input="false"
    value-key="code"
    label-key="name"
    icon="i-lucide-languages"
    :aria-label="t('ui.language', { language: localeProperties.name ?? locale })"
    @update:model-value="setLocale($event)"
  />
</template>

<script setup lang="ts">
/** 言語選択の表示と、Nuxt I18nによる言語別URLへの切り替えをまとめる。 */
const { locale, locales, localeProperties, t, setLocale } = useI18n()
</script>
