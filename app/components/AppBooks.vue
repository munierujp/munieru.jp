<template>
  <!-- 書籍一覧。表紙・寄稿内容・販売ページへのリンクはAppBookCardが担当する。 -->
  <UPageSection :title="t('ui.headings.books')">
    <template #body>
      <UPageGrid as="ul" role="list">
        <li v-for="book in books" :key="book.key" class="min-w-0">
          <AppBookCard :book="book" />
        </li>
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 寄稿書籍を読み込み、日付の新しい順に表示する。
 */
import { books as booksData } from '~/data/books'

const { t } = useSiteLocale()
/** 元データを変更せず、公開日の新しい順に並べる。 */
const books = booksData.toSorted((a, b) => b.date.localeCompare(a.date))
</script>
