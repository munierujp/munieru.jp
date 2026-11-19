<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: 'min-w-40' }"
  >
    <UButton
      square
      icon="i-lucide-languages"
      :aria-label="t('ui.language', { language: localeProperties.name ?? locale })"
    />
    <template #item-label="{ item }">
      <span :lang="item.lang">{{ item.label }}</span>
    </template>
    <template #item-trailing="{ item }">
      <UIcon
        v-if="item.active"
        name="i-lucide-check"
        class="size-4"
        aria-hidden="true"
      />
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
/** 言語別URLへのリンクを表示し、エラー画面では通常のページ読み込みで復帰する。 */
const { locale, locales, localeProperties, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const error = useError()
const items = computed(() => locales.value.map(language => ({
  label: language.name,
  // 言語名をページの言語ではなく、その言語の発音で読み上げるための指定。
  lang: language.code,
  to: switchLocalePath(language.code),
  // Nuxt UIによる現在の言語への再変換を止める。
  locale: false,
  external: Boolean(error.value),
  active: language.code === locale.value
})))
</script>
