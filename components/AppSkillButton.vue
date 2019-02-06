<template>
  <v-chip
    outline
    color="white">{{ name }}</v-chip>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
