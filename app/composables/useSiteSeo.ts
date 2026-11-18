/** トップページの言語別メタ情報と構造化データを設定する。 */
import { serviceLinks } from '~/data/serviceLinks'

/**
 * 現在の言語に対応するSEO情報とプロフィールの構造化データを登録する。
 * @remarks ページのsetupから同期的に呼び出す。メタ情報は言語切り替えに追従し、本番の構造化データは初期HTMLに出力する。
 */
export function useSiteSeo (): void {
  const { t } = useI18n()
  const site = useSiteConfig()
  // HTMLの言語属性・canonical・hreflang・OGPロケールはNuxt I18nに任せる。
  const localeHead = useLocaleHead()
  /** ページの言語に合わせた主名義。メタ情報と構造化データで共有する。 */
  const displayName = computed(() => t('site.name'))
  /** 主名義と異なる文字表記。PersonのalternateNameへ残す。 */
  const alternateName = computed(() => t('site.alternateName'))
  // プロパティはgetter、computedはrefのまま渡し、言語切り替えに追従させる。
  useSeoMeta({
    title: () => site.name,
    description: () => site.description,
    author: displayName
  })
  useSocialMeta(() => site.name, () => site.description)
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
      url: BASE_URL,
      image: withSiteUrl('/profile.png'),
      sameAs: serviceLinks.map(link => link.url)
    })
  ])
}
