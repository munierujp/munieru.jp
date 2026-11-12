<template>
  <!-- 全ページ共通のサイト名と、言語・テーマの選択を表示する。 -->
  <header class="site-header wrap">
    <span class="wordmark">{{ isEnglish ? 'Munieru OFFICIAL SITE' : 'ムニエル OFFICIAL SITE' }}</span>
    <div class="header-actions">
      <AppLanguageSwitcher />
      <AppThemeSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * 言語別のサイト名と、言語・テーマの選択操作を配置する共通ヘッダー。
 * @packageDocumentation
 */
// ヘッダーのサイト名は、ページタイトルと同じく表示言語に合わせる。
const { isEnglish } = useSiteLocale()
</script>
