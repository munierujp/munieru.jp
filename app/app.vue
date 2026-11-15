<template>
  <!-- Nuxt UIのlocale・Tooltip・Overlay等の共通コンテキストをページへ提供する。 -->
  <UApp>
    <!-- 言語切り替えなどで変わるページタイトルを、支援技術へ穏やかに通知する。 -->
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
/** ブラウザUIの配色をテーマに合わせ、本文の書体と行間を指定する。 */
useHead({
  htmlAttrs: { class: 'scheme-light dark:scheme-dark' },
  bodyAttrs: {
    class: "font-['Hiragino_Sans','Yu_Gothic',system-ui,sans-serif] leading-[1.8]"
  }
})
</script>
