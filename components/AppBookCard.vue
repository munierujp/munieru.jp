<template>
  <v-card
    :href="url"
    target="_blank"
    width="320px"
    max-width="100%"
  >
    <v-img :src="image" />
    <v-card-title primary-title>
      <div>
        <div class="grey--text">
          <span>{{ date }}</span>
        </div>
        <div class="headline">
          <span>{{ title }}</span>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
