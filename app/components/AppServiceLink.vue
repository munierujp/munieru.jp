<template>
  <UButton
    :to="link.url"
    external
    target="_blank"
    class="whitespace-nowrap"
  >
    <AppIconImage
      class="size-6 object-contain rounded-lg bg-white"
      :src="link.image"
    />
    <span :lang="link.titleLang">{{ link.title }}</span>
  </UButton>
</template>

<script setup lang="ts">
/** サービスの装飾画像・原表記の名前・別タブで開くリンクを共通化する。 */
import type { ServiceLink } from '~/types/ServiceLink'

defineProps<{
  /** 表示名・公開URL・ローカル画像を持つサービス情報。 */
  link: ServiceLink
}>()
</script>
