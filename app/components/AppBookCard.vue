<template>
  <AppCard
    :ui="cardUi"
    :title="book.title"
    :href="book.url"
  >
    <template #media>
      <NuxtPicture
        class="block h-auto w-full rounded-[10px]"
        :src="book.image"
        format="avif"
        legacy-format="webp"
        :img-attrs="{ class: 'block h-auto w-full rounded-[10px]' }"
        sizes="96px tablet:144px"
        densities="1x 2x"
        :alt="t('ui.cover', { title: book.title })"
        :width="book.imageWidth"
        :height="book.imageHeight"
        loading="lazy"
        decoding="async"
      />
    </template>
    <template #metadata>
      <span class="text-xs text-muted">
        {{ book.format }} /
        <time :datetime="book.date">{{ formatDate(book.date) }}</time>
      </span>
    </template>
    <!-- 目次と照合できるよう章名は原題を残し、英語版には参考英訳を添える。 -->
    <template v-if="book.chapterTitle">
      <template v-if="isEnglish">
        {{ book.contributionLabel }} <span lang="ja">「{{ book.chapterTitle }}」</span>.
        <span v-if="book.englishChapterTitle" class="mt-1 block" lang="en">{{ book.englishChapterTitle }}</span>
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
import type { Book } from '~/types/Book'
import type { AppCardUi } from '~/types/AppCardUi'
/** このコンポーネントが受け取る入力。 */
interface Props {
  /** 表紙・寄稿内容・販売先を含む書籍の情報。 */
  book: Book
}

defineProps<Props>()
/** 書籍の縦長の表紙と本文を横に並べる。 */
const cardUi: AppCardUi = {
  layout: 'grid-cols-[128px_minmax(0,1fr)] max-[560px]:grid-cols-[96px_minmax(0,1fr)]'
}
const { isEnglish, t, formatDate } = useSiteLocale()
</script>
