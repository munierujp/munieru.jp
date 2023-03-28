<template>
  <app-link-button v-bind="link" />
</template>

<script>
import AppLinkButton from '~/components/AppLinkButton'

const { PAYPAL_URL } = process.env.config

export default {
  components: {
    AppLinkButton
  },
  computed: {
    link () {
      return {
        title: this.$t('PAYPAL'),
        label: this.$t('PAYPAL'),
        url: PAYPAL_URL,
        icon: 'fab fa-paypal',
        color: '#003087',
        dark: true
      }
    }
  }
}
</script>
