<template>
  <span :style="style"><slot /></span>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: String,
      default: ''
    },
    fontWeight: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      return {
        'font-size': this.fontSize,
        'font-weight': this.fontWeight
      }
    }
  }
}
</script>
