<template>
  <AppProfile />
  <AppLinks />
  <AppSkills />
  <AppWorks />
  <AppBooks />
  <AppTalks />
  <AppSupport />
</template>

<script setup lang="ts">
/**
 * トップページのセクション構成と、言語別のSEO・構造化データを定義する。
 */
import { computed } from 'vue'
import { useHead, useRuntimeConfig, useSeoMeta } from '#imports'
import linksData from '~~/modules/links.json'

// ページは各セクションの配置とメタ情報を担当する。各一覧の読み込み・操作はセクション内で管理する。
const { isEnglish, locale, t } = useSiteLocale()
const config = useRuntimeConfig().public.siteConfig
// 言語別のcanonical・hreflang・OGPロケールはNuxt I18nに任せる。
const localeHead = useLocaleHead()
/** 現在の言語ページの絶対URL。構造化データの識別子にも使う。 */
const pageUrl = computed(() => new URL(`${locale.value}/`, config.BASE_URL).href)
/** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
const displayName = computed(() => t('site.name'))
/** 主名義と異なる文字表記。構造化データのalternateNameへ残す。 */
const alternateName = computed(() => t('site.alternateName'))
/** ヘッダーと揃えた言語別のサイト名。 */
const pageTitle = computed(() => t('site.title'))
// 共有元のページの言語に合わせ、クローラーが読む静的HTMLにも画像URLを出力する。
/** 共有元ページの言語に対応するOGP画像の絶対URL。 */
const shareImage = computed(() => new URL(isEnglish.value ? config.OG_IMAGE_PATH_EN : config.OG_IMAGE_PATH, config.BASE_URL).href)
// 言語切り替え後も更新されるよう、翻訳とcomputedの値はgetterで渡す。
useSeoMeta({
  title: () => pageTitle.value,
  description: () => t('description'),
  author: () => displayName.value,
  ogTitle: () => pageTitle.value,
  ogSiteName: () => pageTitle.value,
  ogDescription: () => t('description'),
  ogImage: () => shareImage.value,
  ogImageAlt: () => t('ui.ogImageAlt'),
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => t('description'),
  twitterImage: () => shareImage.value,
  twitterImageAlt: () => t('ui.ogImageAlt')
})
useHead(() => ({
  ...localeHead.value,
  htmlAttrs: { ...localeHead.value.htmlAttrs, lang: locale.value },
  link: (localeHead.value.link || []).map(link => 'hreflang' in link && link.hreflang === 'x-default'
    ? { ...link, href: config.BASE_URL }
    : link),
  // 画面に掲載したプロフィールと公開アカウントを、検索エンジンにも伝える。
  script: [{
    // 共通設定のWebSiteを同じキーで上書きし、表示言語のサイト名を主にする。
    key: 'website-structured-data',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': config.BASE_URL + '#website',
      url: config.BASE_URL,
      name: pageTitle.value,
      alternateName: `${alternateName.value} OFFICIAL SITE`,
      inLanguage: ['ja', 'en']
    }).replace(/</g, '\\u003c')
  }, {
    key: 'profile-structured-data',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': pageUrl.value + '#profile',
      url: pageUrl.value,
      name: pageTitle.value,
      description: t('description'),
      inLanguage: locale.value,
      isPartOf: { '@id': config.BASE_URL + '#website' },
      mainEntity: {
        '@type': 'Person',
        '@id': config.BASE_URL + '#person',
        name: displayName.value,
        alternateName: alternateName.value,
        url: config.BASE_URL,
        image: new URL('profile.png', config.BASE_URL).href,
        sameAs: linksData.map(link => link.url)
      }
    }).replace(/</g, '\\u003c')
  }]
}))
</script>
