<template>
  <v-btn
    flat
    class="app-dialog-button"
    @click="click"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
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
.app-dialog-button {
  text-transform: none;
}
</style>
