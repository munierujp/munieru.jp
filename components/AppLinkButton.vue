<template>
  <app-button
    :label="label"
    :icon="icon"
    :image="image"
    :color="color"
    :dark="dark"
    :light="light"
    :href="url"
    target="_blank"
  />
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },
  props: {
    label: {
      type: String,
      default: ''
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
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>
