<template>
  <UPageCard
    as="article"
    class="h-full"
    :title="talk.title"
    :to="talk.url"
    target="_blank"
    rel="noopener"
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
    <template #title><h3 :lang="titleLanguage(talk.title)">{{ talk.title }}</h3></template>
    <template v-if="isEnglish && talk.englishTitle" #description>
      <p lang="en">{{ talk.englishTitle }}</p>
    </template>
    <template #footer>
      <ULink
        class="relative z-1 inline-flex min-h-11 flex-col justify-center underline underline-offset-4"
        :to="talk.eventUrl"
        target="_blank"
        rel="noopener"
        :aria-label="t('ui.eventInfo', { title: talk.eventTitle })"
      >
        <span :lang="titleLanguage(talk.eventTitle)">{{ talk.eventTitle }}</span>
        <span v-if="isEnglish && talk.englishEventTitle" class="mt-1 block" lang="en">{{ talk.englishEventTitle }}</span>
      </ULink>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
/** 標準カードの表紙・原題・補足・フッターを使い、資料とイベントのリンクを分ける。 */
import type { Talk } from '~/types/Talk'

/** このコンポーネントが受け取る入力。 */
interface Props {
  /** イベント・表紙・発表資料を含む登壇の情報。 */
  talk: Talk
}

defineProps<Props>()
const { isEnglish, t, titleLanguage, d } = useSiteLocale()
</script>
