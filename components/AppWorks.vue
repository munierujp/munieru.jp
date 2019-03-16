<template>
  <v-layout
    justify-space-around
    wrap>
    <v-flex
      v-for="work in works"
      :key="work.title"
      xs12
      sm6>
      <app-work-card v-bind="work" />
    </v-flex>
  </v-layout>
</template>

<script>
import works from '~/modules/works.json'
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
