<template>
  <!-- 全ページ共通の著作権表記と、公開アカウント・サイトのソースコードへのリンク。 -->
  <UFooter class="text-muted">
    <small class="text-xs" :lang="locale">{{ t('site.copyright', { name: t('site.name') }) }}</small>
    <template #right>
      <AppIconLink
        :href="config.X_URL"
        :label="t('ui.xAccount', { name: t('site.name') })"
        icon="i-simple-icons-x"
      />
      <AppIconLink
        :href="config.REPOSITORY_URL"
        :label="t('ui.siteSourceCode')"
        icon="i-simple-icons-github"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
/**
 * 現在の言語に合わせた著作権表記と、用途を説明するアイコンリンクを表示する。
 */
const { locale, t } = useSiteLocale()
/** Xアカウントとサイトのソースコードを案内する公開設定。 */
const config = useRuntimeConfig().public
</script>
