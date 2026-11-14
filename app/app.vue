<template>
  <UApp
    ><NuxtLayout><NuxtPage /></NuxtLayout
  ></UApp>
</template>

<script setup lang="ts">
/** ページ全体もNuxt UIの標準配色を使い、フォントは端末内の書体を優先する。 */
useHead({
  bodyAttrs: {
    class: "bg-default text-default font-['Hiragino_Sans','Yu_Gothic',system-ui,sans-serif] leading-[1.8]"
  }
})
</script>
