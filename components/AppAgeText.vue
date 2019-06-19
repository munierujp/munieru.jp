<template>
  <i18n
    tag="span"
    class="app-age-text"
    path="AGE"
  >
    <span place="age">{{ age }}</span>
  </i18n>
</template>

<script>
import getAge from 'get-age'

export default {
  data: () => ({
    birthday: '1994-02-24'
  }),
  computed: {
    age () {
      return getAge(this.birthday)
    }
  }
}
</script>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.4;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-age-text {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-age-text {
    font-size: $relative-font-size;
  }
}
</style>
