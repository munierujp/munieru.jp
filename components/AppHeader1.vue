<template>
  <h1 class="app-header-1"><slot/></h1>
</template>

<style lang="scss" scoped>
$relative-max-width: 600px;
$ratio: 0.2;
$relative-font-size: 100vw * $ratio;
$absolute-font-size: $relative-max-width * $ratio;

.app-header-1 {
  overflow-wrap: break-word;
  font-size: $absolute-font-size;
}

@media (max-width: $relative-max-width) {
  .app-header-1 {
    font-size: $relative-font-size;
  }
}
</style>
