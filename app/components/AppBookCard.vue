<template>
  <UPageCard as="article" class="h-full" :title="book.title" :to="book.url" target="_blank">
    <template #header>
      <NuxtPicture
        class="block w-[clamp(96px,20vw,128px)] max-w-full"
        :src="book.image"
        :img-attrs="{ class: 'block h-auto w-full rounded-lg' }"
        sizes="96px 480:20vw sm:128px"
        :alt="t('ui.cover', { title: book.title })"
        :width="book.imageWidth"
        :height="book.imageHeight"
        loading="lazy"
        decoding="async"
      />
      <p class="mt-3 text-xs text-muted">
        {{ book.format[locale] }} / <time :datetime="book.date">{{ d(book.date, 'date') }}</time>
      </p>
    </template>
    <template #title><h3>{{ book.title }}</h3></template>
    <template #description>
      <template v-if="book.chapterTitle">
        <i18n-t keypath="ui.contributedChapter" scope="global">
          <template #chapter><span lang="ja">「{{ book.chapterTitle }}」</span></template>
        </i18n-t>
        <span v-if="locale === 'en' && book.englishChapterTitle" class="mt-1 block" lang="en">{{ book.englishChapterTitle }}</span>
      </template>
      <template v-else>{{ book.description }}</template>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
/** 標準のカードスロットへ書籍の表紙・寄稿内容・販売ページを渡す。 */
import type { Book } from '~/types/Book'

defineProps<{
  /** 表紙・寄稿内容・販売先を含む書籍の情報。 */
  book: Book
}>()
const { locale, t, d } = useI18n()
</script>
