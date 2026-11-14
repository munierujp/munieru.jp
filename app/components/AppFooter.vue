<template>
  <!-- 全ページ共通の著作権表記と、公開アカウント・サイトのソースコードへのリンク。 -->
  <UFooter
    class="site-footer text-muted"
    :ui="{ container: 'flex items-center justify-between gap-3', left: 'order-first mt-0', center: 'hidden', right: 'order-last' }"
  >
    <template #left>
      <small class="text-xs" :lang="locale">{{ t('site.copyright', { name: t('site.name') }) }}</small>
    </template>
    <template #right>
      <AppIconLink
        :href="xUrl"
        :label="t('ui.xAccount', { name: t('site.name') })"
        icon="i-simple-icons-x"
      />
      <AppIconLink
        href="https://github.com/munierujp/munieru.jp"
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
/** メタ情報と同じ公開設定から、XアカウントへのURLを作る。 */
const xUrl = `https://x.com/${useRuntimeConfig().public.siteConfig.TWITTER_ID.replace(/^@/, '')}`
</script>
