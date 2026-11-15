<template>
  <AppCard
    :ui="cardUi"
    class="talk-card"
    :title="talk.title"
    :title-lang="titleLanguage(talk.title)"
    :href="talk.slidesUrl"
    :link-label="t('ui.slidesInfo', { title: talk.title })"
  >
    <template #media>
      <NuxtPicture
        class="talk-cover col-span-full block h-auto w-full rounded-[10px] @min-[44rem]:col-span-1"
        :src="talk.image"
        format="avif"
        legacy-format="webp"
        :img-attrs="{ class: 'block h-auto w-full rounded-[10px]' }"
        sizes="mobile:100vw 752px:192px 1068px:560px"
        densities="1x 2x"
        :alt="t('ui.cover', { title: talk.title })"
        :width="talk.imageWidth"
        :height="talk.imageHeight"
        loading="lazy"
        decoding="async"
      />
    </template>
    <template #metadata>
      <span class="work-category text-xs text-muted">
        {{ talk.format }} /
        <time :datetime="talk.date">{{ formatDate(talk.date) }}</time>
      </span>
    </template>
    <!-- 原題を資料と照合できるよう残し、参考英訳は見出しとは別に添える。 -->
    <template v-if="isEnglish && talk.englishTitle" #subtitle>
      <p class="title-translation text-[0.85rem] text-muted" lang="en">{{ talk.englishTitle }}</p>
    </template>
    <!-- イベント名は全体リンクとは別のリンクとして手前に置き、十分な操作高さを確保する。 -->
    <a
      class="talk-event-link relative z-1 inline-flex min-h-11 max-w-full flex-col justify-center rounded-sm underline underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :href="talk.eventUrl"
      target="_blank"
      rel="noopener"
      :aria-label="t('ui.eventInfo', { title: talk.eventTitle })"
    >
      <span :lang="titleLanguage(talk.eventTitle)">{{ talk.eventTitle }}</span>
      <span v-if="isEnglish && talk.englishEventTitle" class="event-translation mt-1 block" lang="en">{{ talk.englishEventTitle }}</span>
    </a>
  </AppCard>
</template>

<script setup lang="ts">
/**
 * 登壇の原題・表紙・資料への主リンクと、独立したイベント名のリンクを表示する。
 */
import type { Talk } from '~/types/Talk'
import type { AppCardUi } from '~/types/AppCardUi'

// 表紙・タイトルを含むカード全体から発表資料を開き、イベント名から開催情報を開く。
defineProps<{
  /** イベント・表紙・発表資料を含む登壇の情報。 */
  talk: Talk
}>()
/** 登壇の横長表紙はカード幅が十分なときだけ本文の横に置く。 */
const cardUi = {
  layout: 'grid-cols-[minmax(0,1fr)] @min-[44rem]:grid-cols-[192px_minmax(0,1fr)]',
  content: 'col-start-1 @min-[44rem]:col-start-2'
} satisfies AppCardUi
const { isEnglish, t, titleLanguage, formatDate } = useSiteLocale()
</script>
