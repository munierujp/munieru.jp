<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex text-xs-center>
        <app-age-text />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppAgeText from '~/components/AppAgeText'

export default {
  layout: 'fullscreen',
  components: {
    AppAgeText
  }
}
</script>
