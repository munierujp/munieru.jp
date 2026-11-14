<template>
  <!-- 書籍一覧。表紙・寄稿内容・販売ページへのリンクはAppBookCardが担当する。 -->
  <section class="books-section py-12">
    <div class="wrap section-stack">
      <div class="section-label mb-6">
        <h2 class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.books') }}</h2>
      </div>
      <ul class="book-list grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] gap-3" role="list">
        <li v-for="book in books" :key="book.key" class="min-w-0">
          <AppBookCard :book="book" />
        </li>
      </ul>
    </div>
  </section>
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
