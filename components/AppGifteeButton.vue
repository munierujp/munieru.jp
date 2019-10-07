<template>
  <app-link-button v-bind="link" />
</template>

<script>
import AppLinkButton from '~/components/elements/AppLinkButton'

const { GIFTEE_URL } = process.env.config

export default {
  components: {
    AppLinkButton
  },
  computed: {
    link () {
      return {
        title: this.$t('GIFTEE'),
        label: this.$t('GIFTEE'),
        url: GIFTEE_URL,
        image: 'https://giftee.co/images/favicon.ico',
        color: '#f9f8f4',
        light: true
      }
    }
  }
}
</script>
