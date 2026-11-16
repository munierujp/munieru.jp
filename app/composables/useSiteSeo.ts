/** トップページの言語別メタ情報と構造化データを設定する。 */
import { computed } from 'vue'
import { useSchemaOrg, defineWebSite, defineWebPage, definePerson } from '#schema-org/app'
import { useHead, useRuntimeConfig, useSeoMeta, withSiteUrl } from '#imports'
import { serviceLinks } from '~/data/serviceLinks'

/**
 * 現在の言語に対応するSEO情報とプロフィールの構造化データを登録する。
 * @remarks ページのsetupから同期的に呼び出す。メタ情報は言語切り替えに追従し、本番の構造化データは初期HTMLに出力する。
 */
export function useSiteSeo (): void {
  const { isEnglish, t } = useSiteLocale()
  const config = useRuntimeConfig().public
  // HTMLの言語属性・canonical・hreflang・OGPロケールはNuxt I18nに任せる。
  const localeHead = useLocaleHead()
  const localePath = useLocalePath()
  /** 正規サイトのURL設定から言語別の絶対URLを生成し、WebSiteのIDにも使う。 */
  const pageUrl = withSiteUrl(computed(() => localePath('/')))
  /** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
  const displayName = computed(() => t('site.name'))
  /** 主名義と異なる文字表記。構造化データのalternateNameへ残す。 */
  const alternateName = computed(() => t('site.alternateName'))
  /** ヘッダーと揃えた言語別のサイト名。 */
  const pageTitle = computed(() => t('site.title'))
  /** 共有元ページの言語に対応するOGP画像の絶対URL。クローラー向けの静的HTMLにも出力する。 */
  const shareImage = withSiteUrl(computed(() => isEnglish.value ? config.OG_IMAGE_PATH_EN : config.OG_IMAGE_PATH))
  /** OGP画像内のサイト名とURL。翻訳・公開先の変更を代替テキストにも反映する。 */
  const shareImageAlt = computed(() => `${pageTitle.value} / ${config.BASE_URL}`)
  // 言語切り替え後も更新されるよう、翻訳とcomputedの値はgetterで渡す。
  useSeoMeta({
    title: () => pageTitle.value,
    description: () => t('description'),
    author: () => displayName.value,
    ogTitle: () => pageTitle.value,
    ogSiteName: () => pageTitle.value,
    ogDescription: () => t('description'),
    ogImage: () => shareImage.value,
    ogImageAlt: () => shareImageAlt.value,
    twitterTitle: () => pageTitle.value,
    twitterDescription: () => t('description'),
    twitterImage: () => shareImage.value,
    twitterImageAlt: () => shareImageAlt.value
  })
  useHead(() => localeHead.value)
  // 言語別サイトのURL・IDと人物情報を指定し、JSON-LDの生成・翻訳関係はモジュールに任せる。
  useSchemaOrg([
    defineWebSite({
      '@id': () => pageUrl.value + '#website',
      url: () => pageUrl.value,
      name: () => pageTitle.value,
      alternateName: () => `${alternateName.value} OFFICIAL SITE`
    }),
    defineWebPage({
      '@type': 'ProfilePage',
      mainEntity: { '@id': config.BASE_URL + '#person' }
    }),
    definePerson({
      '@id': config.BASE_URL + '#person',
      name: () => displayName.value,
      alternateName: () => alternateName.value,
      url: config.BASE_URL,
      image: withSiteUrl('/profile.png'),
      sameAs: serviceLinks.map(link => link.url)
    })
  ])
}
