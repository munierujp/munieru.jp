<template>
  <v-card
    :href="url"
    target="_blank"
    width="320px"
    max-width="100%"
  >
    <v-img
      :src="image"
      :aspect-ratio="16 / 9"
    />
    <v-card-title primary-title>
      <div>
        <div class="grey--text">
          <span>{{ date }}</span>
        </div>
        <div class="headline">
          <span>{{ title }}</span>
        </div>
        <div>
          <span>{{ description }}</span>
        </div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="github"
        :href="github"
        target="_blank"
        icon
      >
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
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
    github: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
