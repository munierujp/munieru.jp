<template>
  <!-- 装飾用の共通アイコン。操作の名前は呼び出し側のリンクやボタンで指定する。 -->
  <svg class="app-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <use :href="`${asset('icons.svg')}#${name}`" width="24" height="24" />
  </svg>
</template>

<script setup lang="ts">
/**
 * 同一オリジンのSVGスプライトを参照し、文字色を引き継ぐ装飾アイコンを表示する。
 */
import type { IconName } from '~/types/ui'

defineProps<{
  /** public/icons.svgに定義したSVGアイコン名。 */
  name: IconName
}>()
const asset = usePublicAsset()
</script>
