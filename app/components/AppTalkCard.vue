<template>
  <AppCard
layout="talk"
    class="talk-card"
    :title="talk.title"
    :title-lang="titleLanguage(talk.title)"
    :href="talk.eventUrl"
    :link-label="t('ui.eventInfo', { title: talk.title })"
  >
    <template #media>
      <NuxtImg
        class="talk-cover col-span-full block h-auto w-full rounded-[10px] @min-[44rem]:col-span-1"
        :src="talk.image"
        format="webp"
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
    <span :lang="titleLanguage(talk.eventTitle)">{{ talk.eventTitle }}</span>
    <span v-if="isEnglish && talk.englishEventTitle" class="event-translation mt-1 block" lang="en">{{ talk.englishEventTitle }}</span>
    <template #action>
      <AppIconLink
        class="talk-slides-link relative z-1 justify-self-end"
        :href="talk.slidesUrl"
        :label="t('ui.slidesInfo', { title: talk.title })"
      >
        <img class="size-6" :src="asset('service-icons/speaker-deck.ico')" alt="" width="24" height="24" >
      </AppIconLink>
    </template>
  </AppCard>
</template>

<script setup lang="ts">
/**
 * 登壇の原題・表紙・イベントへの主リンクと、独立した資料リンクを表示する。
 */
import type { Talk } from '~/types/content'

// 登壇の表紙・イベント情報を表示し、発表資料は独立したリンクにする。
defineProps<{
  /** イベント・表紙・発表資料を含む登壇の情報。 */
  talk: Talk
}>()
const { isEnglish, t, titleLanguage, formatDate } = useSiteLocale()
// サブディレクトリ配信でもpublic内の画像を正しいパスで参照する。
const asset = usePublicAsset()
</script>
