<template>
  <!-- エラー画面はapp.vueを経由しないため、共通コンテキストと外枠をここで提供する。 -->
  <UApp>
    <div class="flex min-h-screen flex-col">
      <AppHeader />
      <UError
        :error="message"
        :ui="{ statusCode: status === 404 ? 'hidden' : undefined }"
        :as="{ statusMessage: 'h2' }"
        :redirect="localePath('/')"
        :clear="{ color: 'neutral', variant: 'outline' }"
        class="min-h-0 flex-1 px-6 py-16"
      >
        <template
          v-if="status === 404"
          #leading
        >
          <NuxtImg
            src="/404.png"
            alt=""
            width="144"
            height="144"
            format="webp"
            class="size-36 object-contain"
          />
        </template>
      </UError>
      <AppFooter />
    </div>
  </UApp>
</template>

<script setup lang="ts">
/** 共通部品とNuxt UI標準の表示・復帰操作で、404を含むエラーを案内する。 */
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const config = useSiteConfig()
// /en/404.htmlなどの生成済みHTMLを、実際の未知URLでもそのまま配信する。
// payload.pathが残るとNuxtが生成元URLへ遷移するため、生成時だけ削除する。
if (import.meta.prerender) {
  useNuxtApp().hook('app:rendered', ({ ssrContext }) => {
    if (!ssrContext) return
    delete ssrContext.payload.path
  })
}
/** JSON経由のエラーはstatusCodeを持つため、NuxtErrorのstatusと両方を受け付ける。 */
const status = computed(() => props.error.status ?? props.error.statusCode ?? 500)
/** 内部のエラー詳細を公開せず、状態に合う案内を現在の言語で表示する。 */
const message = computed(() => ({
  status: status.value,
  statusText: t(status.value === 404 ? 'ui.error.notFoundTitle' : 'ui.error.title'),
  message: t(status.value === 404 ? 'ui.error.notFoundDescription' : 'ui.error.description')
}))
/** ページタイトルと共有時のタイトルで、状態コードの表示を揃える。 */
const pageTitle = computed(() => status.value === 404 ? message.value.statusText : `${status.value} - ${message.value.statusText}`)

// 共有画像内の名前を表示言語と揃えるため、日英2枚を使い分ける。
const image = withSiteUrl(computed(() => locale.value === 'en' ? OG_IMAGE_PATH_EN : OG_IMAGE_PATH))
const imageAlt = computed(() => `${config.name} / ${BASE_URL}`)

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  titleTemplate: title => `${title} | ${config.name}`
}))
// 通常のメタ情報・検索除外・OGP・Xカードを、標準APIへまとめて登録する。
useSeoMeta({
  title: pageTitle,
  description: () => message.value.message,
  robots: 'noindex, nofollow',
  ogTitle: () => `${pageTitle.value} | ${config.name}`,
  ogSiteName: () => config.name,
  ogDescription: () => message.value.message,
  ogImage: image,
  ogImageAlt: imageAlt,
  twitterTitle: () => `${pageTitle.value} | ${config.name}`,
  twitterDescription: () => message.value.message,
  twitterImage: image,
  twitterImageAlt: imageAlt
})
</script>
