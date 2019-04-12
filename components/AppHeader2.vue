<template>
  <h2 class="app-header-2"><slot/></h2>
</template>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.09;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-header-2 {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-header-2 {
    font-size: $relative-font-size;
  }
}
</style>
