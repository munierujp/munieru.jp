import type { MaybeRefOrGetter } from 'vue'

/* eslint-disable jsdoc/require-param, jsdoc/check-param-names -- TSDocにないプロパティ別@paramを要求させず、各プロパティの用途は型内に記載する。 */
/**
 * トップとエラー画面で共有する、言語別のOGP・Xカード情報を登録する。
 * @remarks 画像の選択とOG・X間の設定漏れを防ぐため共通化する。各画面のsetupから同期的に呼び出す。
 * @param options - 共有時のタイトルと説明。各値はref・getterにも対応し、変更に追従する。
 */
export function useSocialMeta (options: {
  /** 現在の言語の共有タイトル。 */
  title: MaybeRefOrGetter<string | undefined>
  /** 現在の言語の共有説明文。 */
  description: MaybeRefOrGetter<string | undefined>
}): void {
  /* eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  const { locale } = useI18n()
  const site = useSiteConfig()
  // 共有画像内の名前を表示言語と揃えるため、日英2枚を使い分ける。
  const image = withSiteUrl(computed(() => locale.value === 'en' ? OG_IMAGE_PATH_EN : OG_IMAGE_PATH))
  const imageAlt = computed(() => `${site.name} / ${BASE_URL}`)
  useSeoMeta({
    ogTitle: options.title,
    ogSiteName: () => site.name,
    ogDescription: options.description,
    ogImage: image,
    ogImageAlt: imageAlt,
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    twitterImageAlt: imageAlt
  })
}
