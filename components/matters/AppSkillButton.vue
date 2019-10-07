<template>
  <v-chip
    outline
    color="#293030"
  >
    {{ name }}
  </v-chip>
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
