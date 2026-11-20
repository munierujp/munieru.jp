<template>
  <!-- 代替表示はUAvatarへ任せる。空の代替文字は隠し、画像と空枠のベースラインを揃える。 -->
  <UAvatar
    :as="{ img: isSvg ? 'img' : undefined }"
    :src="src"
    :icon="icon"
    :width="size"
    :height="size"
    v-bind="isSvg ? {} : { format: 'webp', sizes, fit: 'inside' }"
    :ui="{ image: 'object-contain', icon: 'size-6', fallback: 'hidden' }"
    class="size-6 rounded-none bg-transparent"
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup lang="ts">
/** SVGを維持し、画像最適化と標準の代替表示を使う装飾アイコン。 */
import type { IconName } from '~/types/IconName'

const { src = undefined, icon = undefined, size = 24, sizes = undefined } = defineProps<{
  /** public配下の画像パス。未指定・読み込み失敗時は標準の代替表示を使う。 */
  src?: string
  /** 画像がない場合に表示する分類アイコン。未指定時は空の領域を保つ。 */
  icon?: IconName
  /** 配信用画像の一辺（CSS px）。 */
  size?: number
  /** 表示幅が変わる場合のNuxt Imageのsizes指定。 */
  sizes?: string
}>()
/** SVGは元画像を直接配信し、ラスター画像はNuxt Imageへ渡す。 */
const isSvg = computed(() => src?.endsWith('.svg') ?? false)
</script>
