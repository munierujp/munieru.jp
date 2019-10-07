<template>
  <v-layout
    justify-space-around
    wrap
    class="app-books"
  >
    <v-flex
      v-for="book in books"
      :key="book.key"
      class="app-book"
    >
      <app-book-card v-bind="book" />
    </v-flex>
    <!-- dummy components for layout (align left) -->
    <v-flex
      v-for="i in books.length"
      :key="i"
      class="app-book app-book-dummy"
    >
      <div />
    </v-flex>
    <!-- /dummy components for layout (align left) -->
  </v-layout>
</template>

<script>
import books from '~/modules/books'
import AppBookCard from '~/components/matters/AppBookCard'

export default {
  components: {
    AppBookCard
  },
  data: () => ({
    books
  })
}
</script>

<style lang="scss" scoped>
$book-card-width: 320px;

.app-book {
  flex-grow: 0;
}

.app-book-dummy {
  height: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: $book-card-width;
  }
}
</style>
