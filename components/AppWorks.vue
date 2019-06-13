<template>
  <v-layout
    justify-space-around
    wrap
    class="app-works"
  >
    <v-flex
      v-for="work in works"
      :key="work.title"
      class="app-work"
    >
      <app-work-card v-bind="work" />
    </v-flex>
    <v-flex
      v-for="i in works.length"
      :key="i"
      class="app-work app-work-dummy"
    >
      <div />
    </v-flex>
  </v-layout>
</template>

<script>
import works from '~/modules/works'
import AppWorkCard from '~/components/AppWorkCard'

export default {
  components: {
    AppWorkCard
  },
  data: () => ({
    works
  })
}
</script>

<style lang="scss" scoped>
$work-card-width: 320px;

.app-work {
  flex-grow: 0;
}

.app-work-dummy {
  height: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: $work-card-width;
  }
}
</style>
