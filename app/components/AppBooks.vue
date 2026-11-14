<template>
  <!-- 書籍一覧。表紙・寄稿内容・販売ページへのリンクはAppBookCardが担当する。 -->
  <UPageSection class="books-section" :title="t('ui.headings.books')">
    <template #body>
      <UPageGrid as="ul" class="book-list" role="list">
        <li v-for="book in books" :key="book.key" class="min-w-0">
          <AppBookCard :book="book" />
        </li>
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 寄稿書籍を読み込み、翻訳して日付の新しい順に表示する。
 */
import type { Book } from '~/types/content'
import { computed } from 'vue'
import booksData from '~~/modules/books.json'

// 寄稿した書籍を読み込み、言語別の表示文と日付順への整列を担当する。
const { t, localize } = useSiteLocale()
/** 翻訳済みの書籍。ISO日付の降順で新しい寄稿を先に表示する。 */
const books = computed<Book[]>(() => booksData.map(book => localize('books', book)).sort((a, b) => b.date.localeCompare(a.date)))
</script>
