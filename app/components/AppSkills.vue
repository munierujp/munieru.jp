<template>
  <UPageSection :title="t('ui.headings.skills')">
    <template #body>
      <ul
        class="flex flex-wrap items-center gap-3"
        role="list"
      >
        <li
          v-for="skill in skills"
          :key="skill.image"
          class="min-w-0"
        >
          <UBadge>
            <AppIconImage
              class="size-6 object-contain rounded-lg bg-white"
              :src="skill.image"
            />
            <span>{{ typeof skill.name === 'string' ? skill.name : skill.name[locale] }}</span>
          </UBadge>
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills'

const { locale, t } = useI18n()
</script>
