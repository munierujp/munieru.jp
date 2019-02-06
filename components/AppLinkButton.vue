<template>
  <v-btn
    :color="color"
    :dark="dark"
    :light="light"
    :href="url"
    target="_blank"
    class="app-link-button">
    <v-icon
      v-if="icon"
      class="app-link-button-icon">{{ icon }}</v-icon>
    <v-img
      v-if="image"
      :src="image"
      :width="iconSize"
      :height="iconSize"
      class="app-link-button-image" />
  </v-btn>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    iconSize: 24
  })
}
</script>

<style lang="scss" scoped>
.app-link-button {
  min-width: 0;
}
</style>
