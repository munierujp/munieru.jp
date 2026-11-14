<template>
  <!-- Nuxt UIのlocale・Tooltip・Overlay等の共通コンテキストをページへ提供する。 -->
  <UApp>
    <!-- 言語切り替えなどで変わるページタイトルを、支援技術へ穏やかに通知する。 -->
    <NuxtRouteAnnouncer />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
/** ページ全体もNuxt UIの標準配色を使い、フォントは端末内の書体を優先する。 */
useHead({
  htmlAttrs: { class: 'scheme-light dark:scheme-dark' },
  bodyAttrs: {
    class: "bg-default text-default font-['Hiragino_Sans','Yu_Gothic',system-ui,sans-serif] leading-[1.8]"
  }
})
</script>
