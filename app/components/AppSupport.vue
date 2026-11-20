<template>
  <UPageSection :title="t('ui.headings.support')">
    <template #body>
      <div class="flex flex-wrap items-center gap-3">
        <AppServiceLink
          v-for="link in supportLinks"
          :key="link.key"
          :link="{ ...link, title: typeof link.title === 'string' ? link.title : link.title[locale] }"
        />
      </div>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
import { supportLinks } from '~/data/supportLinks'

const { locale, t } = useI18n()
</script>
