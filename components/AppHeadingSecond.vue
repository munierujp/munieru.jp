<template>
  <h2 class="app-heading-second">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.09;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-heading-second {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-heading-second {
    font-size: $relative-font-size;
  }
}
</style>
