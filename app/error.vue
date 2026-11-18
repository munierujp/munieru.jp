<template>
  <!-- エラー画面はapp.vueを経由しないため、共通コンテキストと外枠をここで提供する。 -->
  <UApp>
    <div class="flex min-h-screen flex-col">
      <AppHeader />
      <UError
        :error="message"
        :as="{ statusMessage: 'h2' }"
        :redirect="localePath('/')"
        :clear="{ color: 'neutral', variant: 'outline' }"
        class="min-h-0 flex-1 px-6 py-16"
      >
        <template v-if="status === 404" #leading>
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
const site = useSiteConfig()
// 静的404を各URLで再利用できるよう、生成時のURLをペイロードへ残さない。
if (import.meta.prerender) {
  useNuxtApp().hook('app:rendered', ({ ssrContext }) => {
    if (!ssrContext) return
    delete ssrContext.payload.path
    if (ssrContext.payload.error) {
      Reflect.deleteProperty(ssrContext.payload.error, 'url')
    }
  })
}
/** NuxtのJSON形式にはstatusCodeも残るため、入力の互換処理を維持する。 */
const status = computed(() => props.error.status ?? props.error.statusCode ?? 500)
/** 内部のエラー詳細を公開せず、状態に合う案内を現在の言語で表示する。 */
const message = computed(() => ({
  // 404は見出しに含めるため、数値だけの重複表示を抑える。
  status: status.value === 404 ? undefined : status.value,
  statusText: t(status.value === 404 ? 'ui.error.notFoundTitle' : 'ui.error.title'),
  message: t(status.value === 404 ? 'ui.error.notFoundDescription' : 'ui.error.description')
}))
/** ページタイトルと共有時のタイトルで、状態コードの表示を揃える。 */
const pageTitle = computed(() => status.value === 404 ? message.value.statusText : `${status.value} - ${message.value.statusText}`)

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  titleTemplate: title => `${title} | ${site.name}`
}))
useSeoMeta({
  title: pageTitle,
  description: () => message.value.message,
  robots: 'noindex, nofollow'
})
useSocialMeta({
  title: () => `${pageTitle.value} | ${site.name}`,
  description: () => message.value.message
})
</script>
