<template>
  <!-- 全ページ共通の著作権表記。名前の表記は現在の言語に合わせる。 -->
  <footer class="site-footer py-8 text-center text-muted wrap">
    <small class="text-xs" :lang="locale">{{ t('site.copyright', { name: t('site.name') }) }}</small>
  </footer>
</template>

<script setup lang="ts">
/**
 * 現在の言語に合わせた名義の著作権表記を表示する。
 */
const { locale, t } = useSiteLocale()
</script>
