<template>
  <v-btn
    :color="color"
    :dark="dark"
    :light="light"
    :href="href"
    :to="to"
    :target="target"
    class="app-button"
    @click="click">
    <v-icon
      v-if="icon"
      :style="iconStyle"
      class="app-button-icon">{{ icon }}</v-icon>
    <v-img
      v-if="image"
      :style="iconStyle"
      :src="image"
      :width="imageWidth"
      :height="imageHeight"
      class="app-button-icon" />
    <span
      v-if="label"
      class="app-button-label">{{ label }}</span>
  </v-btn>
</template>

<script>
export default {
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
    imageWidth: {
      type: Number,
      default: 24
    },
    imageHeight: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconStyle () {
      if (this.label) {
        return {
          'margin-right': '8px'
        }
      }
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-button {
  min-width: 0;
  text-transform: none;
}
</style>
