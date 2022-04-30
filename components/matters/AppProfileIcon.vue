<template>
  <img
    :src="url"
    class="app-profile-icon"
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
$relative-max-width: 600px;
$absolute-size: 300px;
$relative-size: 100vw * calc($absolute-size / $relative-max-width);

.app-profile-icon {
  width: $absolute-size;
  height: $absolute-size;
  border: {
    style: solid;
    color: #fff;
    width: 4px;
    radius: 50%;
  }
}

@media (max-width: $relative-max-width) {
  .app-profile-icon {
    width: $relative-size;
    height: $relative-size;
  }
}
</style>
