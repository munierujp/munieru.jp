<template>
  <v-app id="app">
    <v-content>
      <v-container grid-list-xl>
        <nuxt />
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '~/components/matters/AppFooter'

export default {
  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
#app {
  color: #293030;
  background-color: #f9fafb;
  font-family: Roboto, "Noto Sans JP", sans-serif;
}
</style>
