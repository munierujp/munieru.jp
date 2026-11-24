<template>
  <UPageSection :title="t('ui.headings.support')">
    <template #body>
      <ul
        class="flex flex-wrap items-center gap-3"
        role="list"
      >
        <li
          v-for="link in supportLinks"
          :key="link.key"
          class="min-w-0"
        >
          <AppServiceLink :link="{ ...link, title: typeof link.title === 'string' ? link.title : link.title[locale] }" />
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
import { supportLinks } from '~/data/supportLinks'

const { locale, t } = useI18n()
</script>
