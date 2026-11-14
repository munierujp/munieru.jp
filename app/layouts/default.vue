<template>
  <div>
    <!-- 共通レイアウトのルート要素。各ページはmain内のslotへ本文を渡す。 -->
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
