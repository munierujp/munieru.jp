<template>
  <AppCard
layout="book"
    class="book-link"
    :title="book.title"
    :href="book.url"
  >
    <template #media>
      <NuxtImg
        class="book-cover block h-auto w-full rounded-[10px]"
        :src="book.image"
        format="webp"
        sizes="96px tablet:144px"
        densities="1x 2x"
        :alt="t('ui.cover', { title: book.title })"
        width="742"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </template>
    <template #metadata>
      <span class="work-category text-xs text-muted">
        {{ book.format }} /
        <time :datetime="book.date">{{ formatDate(book.date) }}</time>
      </span>
    </template>
    <!-- 目次と照合できるよう章名は原題を残し、英語版には参考英訳を添える。 -->
    <template v-if="book.chapterTitle">
      <template v-if="isEnglish">
        {{ book.contributionLabel }} <span lang="ja">「{{ book.chapterTitle }}」</span>.
        <span v-if="book.englishChapterTitle" class="chapter-translation mt-1 block" lang="en">{{ book.englishChapterTitle }}</span>
      </template>
      <template v-else>「{{ book.chapterTitle }}」の章を寄稿</template>
    </template>
    <template v-else>{{ book.description }}</template>
  </AppCard>
</template>

<script setup lang="ts">
/**
 * 書籍の表紙・寄稿内容・販売ページを一枚のカードにまとめる。
 */
import type { Book } from '~/types/content'
// 書籍の表紙・寄稿内容と販売ページへのリンクを組み合わせる。
defineProps<{
  /** 表紙・寄稿内容・販売先を含む書籍の情報。 */
  book: Book
}>()
const { isEnglish, t, formatDate } = useSiteLocale()
</script>
