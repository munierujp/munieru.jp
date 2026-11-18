<template>
  <!-- サービス名を読み上げ名とし、画像を含む領域全体から外部ページを開く。 -->
  <UButton :to="link.url" external target="_blank" rel="noopener" class="whitespace-nowrap">
    <span class="inline-flex shrink-0 items-center gap-2" aria-hidden="true">
      <AppIconImage
        class="size-6 object-contain rounded-lg bg-white"
        :src="link.image"
      />
    </span>
    <span :lang="link.titleLang">{{ link.title }}</span>
  </UButton>
</template>

<script setup lang="ts">
/** サービスの装飾画像・原表記の名前・別タブで開くリンクを共通化する。 */
import type { ServiceLink } from '~/types/ServiceLink'

/** このコンポーネントが受け取る入力。 */
interface Props {
  /** 表示名・公開URL・ローカル画像を持つサービス情報。 */
  link: ServiceLink
}

defineProps<Props>()
</script>
