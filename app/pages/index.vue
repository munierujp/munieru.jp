<template>
  <main>
    <AppProfile />
    <AppLinks />
    <AppSkills />
    <AppWorks />
    <AppBooks />
    <AppTalks />
    <AppSupport />
  </main>
</template>

<script setup lang="ts">
import { serviceLinks } from '~/data/serviceLinks'

// トップページのSEO情報とプロフィールの構造化データを、言語に追従する値で登録する。
const { locale, t } = useI18n()
const config = useSiteConfig()
// HTMLの言語属性・canonical・hreflang・OGPロケールはNuxt I18nに任せる。
const localeHead = useLocaleHead()
/** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
const displayName = computed(() => t('site.name'))
/** 主名義と異なる文字表記。PersonのalternateNameへ残す。 */
const alternateName = computed(() => t('site.alternateName'))
// 共有画像内の名前を表示言語と揃えるため、日英2枚を使い分ける。
const image = withSiteUrl(computed(() => locale.value === 'en' ? OG_IMAGE_PATH_EN : OG_IMAGE_PATH))
const imageAlt = computed(() => `${config.name} / ${BASE_URL}`)
// 通常のメタ情報とOGP・Xカードを、標準APIへまとめて登録する。
useSeoMeta({
  title: () => config.name,
  description: () => config.description,
  author: displayName,
  ogTitle: () => config.name,
  ogSiteName: () => config.name,
  ogDescription: () => config.description,
  ogImage: image,
  ogImageAlt: imageAlt,
  twitterTitle: () => config.name,
  twitterDescription: () => config.description,
  twitterImage: image,
  twitterImageAlt: imageAlt
})
useHead(localeHead)
// WebSiteと翻訳関係はモジュールに任せ、プロフィールページと人物情報を定義する。
useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    mainEntity: { '@id': BASE_URL + '#person' }
  }),
  definePerson({
    '@id': BASE_URL + '#person',
    name: () => displayName.value,
    alternateName: () => alternateName.value,
    // 画面に表示する自己紹介文を再利用し、人物説明を二重管理しない。
    description: () => t('profile.summary'),
    url: BASE_URL,
    image: withSiteUrl('/profile.png'),
    sameAs: serviceLinks.map(link => link.url)
  })
])
</script>
