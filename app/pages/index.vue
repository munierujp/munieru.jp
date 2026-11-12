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
 * @packageDocumentation
 */
import { computed } from 'vue'
import { useHead, useRuntimeConfig } from '#app'
import linksData from '~~/modules/links.json'

// ページは各セクションの配置とメタ情報を担当する。各一覧の読み込み・操作はセクション内で管理する。
const { isEnglish, locale, t } = useSiteLocale()
const config = useRuntimeConfig().public.siteConfig
// 言語別のcanonical・hreflang・OGPロケールはNuxt I18nに任せる。
const localeHead = useLocaleHead()
/** 現在の言語ページの絶対URL。構造化データの識別子にも使う。 */
const pageUrl = computed(() => new URL(`${locale.value}/`, config.BASE_URL).href)
/** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
const displayName = computed(() => isEnglish.value ? 'Munieru' : 'ムニエル')
/** 主名義と異なる文字表記。構造化データのalternateNameへ残す。 */
const alternateName = computed(() => isEnglish.value ? 'ムニエル' : 'Munieru')
/** ヘッダーと揃えた言語別のサイト名。 */
const pageTitle = computed(() => `${displayName.value} OFFICIAL SITE`)
// 共有元のページの言語に合わせ、クローラーが読む静的HTMLにも画像URLを出力する。
/** 共有元ページの言語に対応するOGP画像の絶対URL。 */
const shareImage = computed(() => new URL(isEnglish.value ? config.OG_IMAGE_PATH_EN : config.OG_IMAGE_PATH, config.BASE_URL).href)
useHead(() => ({
  ...localeHead.value,
  title: pageTitle.value,
  htmlAttrs: { ...localeHead.value.htmlAttrs, lang: locale.value },
  link: (localeHead.value.link || []).map(link => 'hreflang' in link && link.hreflang === 'x-default'
    ? { ...link, href: config.BASE_URL } : link),
  meta: [
    ...(localeHead.value.meta || []),
    { name: 'description', content: t('description') },
    { name: 'author', content: displayName.value },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:site_name', content: pageTitle.value },
    { property: 'og:description', content: t('description') },
    { property: 'og:image', content: shareImage.value },
    { property: 'og:image:alt', content: t('ui.ogImageAlt') },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: t('description') },
    { name: 'twitter:image', content: shareImage.value },
    { name: 'twitter:image:alt', content: t('ui.ogImageAlt') }
  ],
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
