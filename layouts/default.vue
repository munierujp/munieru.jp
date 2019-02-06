<template>
  <v-app id="app">
    <v-content>
      <nuxt />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
#app {
  color: #fafafa;
  background-color: #0d47a1;
  font-family: Roboto, "Noto Sans JP", sans-serif;
}
</style>
