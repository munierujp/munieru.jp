<template>
  <!-- 言語名・選択状態・キー操作は標準メニューで提供し、トリガーは円形アイコンにする。 -->
  <USelectMenu
    :ui="iconSelectUi"
    :model-value="locale"
    :items="[ja, en]"
    :search-input="false"
    value-key="code"
    label-key="name"
    icon="i-lucide-languages"
    :aria-label="t('ui.language', { language: locale === 'ja' ? '日本語' : 'English' })"
    @update:model-value="setLocale($event as 'ja' | 'en')"
  />
</template>

<script setup lang="ts">
/** 言語選択の表示と、Nuxt I18nによるURL切り替え・Cookie保存をまとめる。 */
import { ja, en } from '@nuxt/ui/locale'

const { locale, t, setLocale } = useI18n()
</script>
