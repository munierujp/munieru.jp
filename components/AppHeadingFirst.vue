<template>
  <h1 class="app-heading-first">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.18;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-heading-first {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-heading-first {
    font-size: $relative-font-size;
  }
}
</style>
