<template>
  <UPageCard
    :as="{ root: 'article', title: 'h3' }"
    class="h-full"
    :title="talk.title"
    :to="talk.url"
    target="_blank"
    :aria-label="t('ui.slidesInfo', { title: talk.title })"
  >
    <template #header>
      <NuxtPicture
        class="mx-auto block w-full max-w-xl"
        :src="talk.image"
        :img-attrs="{ class: 'block h-auto w-full rounded-lg' }"
        sizes="100vw sm:576px"
        :alt="t('ui.cover', { title: talk.title })"
        :width="talk.imageWidth"
        :height="talk.imageHeight"
        loading="lazy"
        decoding="async"
      />
      <p class="mt-3 text-xs text-muted">
        {{ talk.format }} / <time :datetime="talk.date">{{ d(talk.date, 'date') }}</time>
      </p>
    </template>
    <template #title><span :lang="talk.titleLang">{{ talk.title }}</span></template>
    <template
      v-if="locale === 'en' && talk.englishTitle"
      #description
    >
      <p lang="en">{{ talk.englishTitle }}</p>
    </template>
    <template #footer>
      <ULink
        class="relative z-1 inline-flex min-h-11 flex-col justify-center underline underline-offset-4"
        :to="talk.eventUrl"
        target="_blank"
        :aria-label="t('ui.eventInfo', { title: talk.eventTitle })"
      >
        <span :lang="talk.eventTitleLang">{{ talk.eventTitle }}</span>
        <span
          v-if="locale === 'en' && talk.englishEventTitle"
          class="mt-1 block"
          lang="en"
        >{{ talk.englishEventTitle }}</span>
      </ULink>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Talk } from '~/types/Talk'

defineProps<{
  /** イベント・表紙・発表資料を含む登壇の情報。 */
  talk: Talk
}>()
const { locale, t, d } = useI18n()
</script>
