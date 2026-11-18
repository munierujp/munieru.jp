<template>
  <!-- エラー画面はapp.vueを経由しないため、共通コンテキストと外枠をここで提供する。 -->
  <UApp>
    <div class="flex min-h-screen flex-col">
      <AppHeader />
      <UError
        :error="message"
        :as="{ statusMessage: 'h2' }"
        :redirect="localePath('/')"
        :clear="{ label: t('ui.error.backHome'), color: 'neutral', variant: 'outline' }"
        class="min-h-0 flex-1 px-6 py-16"
      >
        <template #leading>
          <NuxtImg
            src="/error.png"
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
/** 共通部品とNuxt UI標準のエラー表示・復帰操作で、存在しないページを案内する。 */
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
/** Nuxtの状態コードを使い、従来の形式で渡されたエラーにも対応する。 */
const status = computed(() => props.error.status ?? props.error.statusCode ?? 500)
/** 内部のエラー詳細を公開せず、状態に合う案内を現在の言語で表示する。 */
const message = computed(() => ({
  statusCode: status.value === 404 ? undefined : status.value,
  statusMessage: t(status.value === 404 ? 'ui.error.notFoundTitle' : 'ui.error.title'),
  message: t(status.value === 404 ? 'ui.error.notFoundDescription' : 'ui.error.description')
}))

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  titleTemplate: title => `${title} | ${site.name}`
}))
useSeoMeta({
  title: () => status.value === 404 ? message.value.statusMessage : `${status.value} - ${message.value.statusMessage}`,
  robots: 'noindex, nofollow'
})
</script>
