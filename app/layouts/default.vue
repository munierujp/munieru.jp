<template>
  <div>
    <!-- ヘッダー・フッターを共有し、本文のmainは各ページのルートに置く。 -->
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
