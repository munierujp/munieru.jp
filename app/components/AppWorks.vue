<template>
  <UPageSection :title="t('ui.headings.works')">
    <template #body>
      <UPageGrid
        as="ul"
        role="list"
      >
        <li
          v-for="work in works"
          :key="work.key"
          class="min-w-0"
        >
          <AppWorkCard :work="work" />
        </li>
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
import { works as workData } from '~/data/works'

const { t } = useI18n()
const works = workData.toSorted((a, b) => b.date.localeCompare(a.date))
</script>
