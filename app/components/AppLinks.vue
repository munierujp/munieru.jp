<template>
  <UPageSection :title="t('ui.headings.links')">
    <template #body>
      <ul class="flex flex-wrap items-center gap-3" role="list">
        <li v-for="link in serviceLinks" :key="link.title" class="min-w-0">
          <AppServiceLink :link="link" />
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
import { serviceLinks } from '~/data/serviceLinks'

const { t } = useI18n()
</script>
