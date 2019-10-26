<template>
  <app-link-button v-bind="link" />
</template>

<script>
import AppLinkButton from '~/components/elements/AppLinkButton'

const { GITHUB_SPONSOERS_URL } = process.env.config

export default {
  components: {
    AppLinkButton
  },
  computed: {
    link () {
      return {
        title: this.$t('GITHUB_SPONSORS'),
        label: this.$t('GITHUB_SPONSORS'),
        url: GITHUB_SPONSOERS_URL,
        icon: 'fab fa-github',
        color: '#333',
        dark: true
      }
    }
  }
}
</script>
