<template>
  <UFooter class="text-muted">
    <small
      class="text-xs"
      :lang="locale"
    >{{ t('site.copyright', { name: t('site.name') }) }}</small>
    <template #right>
      <AppIconLink
        :href="X_URL"
        :label="t('ui.xAccount', { name: t('site.name') })"
        icon="i-simple-icons-x"
      />
      <AppIconLink
        :href="REPOSITORY_URL"
        :label="t('ui.siteSourceCode')"
        icon="i-simple-icons-github"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()
</script>
