<template>
  <v-layout align-center>
    <v-flex text-xs-center>
      <app-age-text />
    </v-flex>
  </v-layout>
</template>

<script>
import AppAgeText from '~/components/matters/AppAgeText'

export default {
  layout: 'fullscreen',
  components: {
    AppAgeText
  }
}
</script>
