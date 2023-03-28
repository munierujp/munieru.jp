<template>
  <img
    :src="url"
    class="app-profile-icon"
    width="300"
    height="300"
    decoding="async"
  >
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-profile-icon {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
