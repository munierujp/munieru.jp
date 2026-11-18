import type { MaybeRefOrGetter } from 'vue'

/**
 * トップとエラー画面で共有する、言語別のOGP・Xカード情報を登録する。
 * @remarks 画像の選択とOG・X間の設定漏れを防ぐため共通化する。各画面のsetupから同期的に呼び出す。
 * @param title - 共有時のタイトル。ref・getterを渡すと変更に追従する。
 * @param description - 共有時の説明。ref・getterを渡すと変更に追従する。
 */
export function useSocialMeta (
  title: MaybeRefOrGetter<string | undefined>,
  description: MaybeRefOrGetter<string | undefined>
): void {
  const { locale } = useI18n()
  const site = useSiteConfig()
  // 共有画像内の名前を表示言語と揃えるため、日英2枚を使い分ける。
  const image = withSiteUrl(computed(() => locale.value === 'en' ? OG_IMAGE_PATH_EN : OG_IMAGE_PATH))
  const imageAlt = computed(() => `${site.name} / ${BASE_URL}`)
  useSeoMeta({
    ogTitle: title,
    ogSiteName: () => site.name,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt
  })
}
