<template>
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
import { books as booksData } from '~/data/books'

const { t } = useI18n()
const books = booksData.toSorted((a, b) => b.date.localeCompare(a.date))
</script>
