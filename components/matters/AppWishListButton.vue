<template>
  <app-link-button v-bind="link" />
</template>

<script>
import AppLinkButton from '~/components/elements/AppLinkButton'

const { WISH_LIST_URL } = process.env.config

export default {
  components: {
    AppLinkButton
  },
  computed: {
    link () {
      return {
        title: this.$t('WISH_LIST'),
        label: this.$t('WISH_LIST'),
        url: WISH_LIST_URL,
        icon: 'fab fa-amazon',
        color: '#232f3e',
        dark: true
      }
    }
  }
}
</script>
