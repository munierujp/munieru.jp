<template>
  <!-- 全ページ共通の著作権表記と、公開アカウント・サイトのソースコードへのリンク。 -->
  <UFooter
    class="text-muted"
    :ui="{ container: 'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 lg:grid', left: 'hidden', center: 'col-start-2 row-start-1 mt-0', right: 'col-start-3 row-start-1 justify-end' }"
  >
    <small class="text-xs" :lang="locale">{{ t('site.copyright', { name: t('site.name') }) }}</small>
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
/** 公開設定で生成したXアカウントのURL。 */
const xUrl = useRuntimeConfig().public.siteConfig.X_URL
</script>
