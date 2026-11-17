/** トップページの言語別メタ情報と構造化データを設定する。 */
import { serviceLinks } from '~/data/serviceLinks'

/**
 * 現在の言語に対応するSEO情報とプロフィールの構造化データを登録する。
 * @remarks ページのsetupから同期的に呼び出す。メタ情報は言語切り替えに追従し、本番の構造化データは初期HTMLに出力する。
 */
export function useSiteSeo (): void {
  const { isEnglish, t } = useSiteLocale()
  const config = useRuntimeConfig().public
  const site = useSiteConfig()
  // HTMLの言語属性・canonical・hreflang・OGPロケールはNuxt I18nに任せる。
  const localeHead = useLocaleHead()
  /** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
  const displayName = computed(() => t('site.name'))
  /** 主名義と異なる文字表記。PersonのalternateNameへ残す。 */
  const alternateName = computed(() => t('site.alternateName'))
  /** 共有元ページの言語に対応するOGP画像の絶対URL。クローラー向けの静的HTMLにも出力する。 */
  const shareImage = withSiteUrl(computed(() => isEnglish.value ? config.OG_IMAGE_PATH_EN : config.OG_IMAGE_PATH))
  /** OGP画像内のサイト名とURL。翻訳・公開先の変更を代替テキストにも反映する。 */
  const shareImageAlt = computed(() => `${site.name} / ${config.BASE_URL}`)
  // 言語切り替え後も更新されるよう、翻訳とcomputedの値はgetterで渡す。
  useSeoMeta({
    title: () => site.name,
    description: () => site.description,
    author: () => displayName.value,
    ogTitle: () => site.name,
    ogSiteName: () => site.name,
    ogDescription: () => site.description,
    ogImage: () => shareImage.value,
    ogImageAlt: () => shareImageAlt.value,
    twitterTitle: () => site.name,
    twitterDescription: () => site.description,
    twitterImage: () => shareImage.value,
    twitterImageAlt: () => shareImageAlt.value
  })
  useHead(() => localeHead.value)
  // WebSiteと翻訳関係はモジュールに任せ、プロフィールページと人物情報を定義する。
  useSchemaOrg([
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
