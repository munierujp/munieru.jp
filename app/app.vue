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
