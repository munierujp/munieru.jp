<template>
  <NuxtLayout v-if="!isNotFound" name="default">
    <!-- エラーの詳細やスタックは公開せず、現在の言語のトップへ戻る通常リンクを表示する。 -->
    <section class="error-page wrap">
      <p class="error-status">{{ status }}</p>
      <h1>{{ title }}</h1>
      <p class="error-description">{{ t('error.unexpectedDescription') }}</p>
      <a class="error-home" :href="homePath">{{ t('error.home') }}</a>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { locale, t } = useSiteLocale()
const localePath = useLocalePath()
const router = useRouter()
const status = computed(() => props.error.statusCode || 500)
const isNotFound = computed(() => status.value === 404)
const title = computed(() => t('error.unexpectedTitle'))
// 通常のリンクで再読み込みし、Nuxtのエラー状態も解除する。公開サブディレクトリにも対応する。
const homePath = computed(() => router.resolve(localePath({ name: 'index' })).href)
// 再読み込みでエラー状態と404用のメタ情報を残さず、履歴を置き換えてトップへ移動する。
onMounted(() => {
  if (isNotFound.value) window.location.replace(homePath.value)
})
useHead(() => ({
  title: isNotFound.value ? 'munieru.jp' : `${title.value} | munieru.jp`,
  htmlAttrs: { lang: locale.value },
  meta: [{ name: 'robots', content: 'noindex, follow' }],
}))
</script>
