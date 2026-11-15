<template>
  <!-- SVGは元のベクターを配信し、ラスター画像だけ表示寸法と画面密度に合わせて生成する。 -->
  <img
    v-if="isSvg"
    :src="asset(src)"
    :width="size"
    :height="size"
    alt=""
    loading="lazy"
    decoding="async"
  >
  <NuxtImg
    v-else
    :src="src"
    format="webp"
    :width="size"
    :height="size"
    :sizes="sizes"
    densities="1x 2x"
    fit="inside"
    alt=""
    loading="lazy"
    decoding="async"
  />
</template>

<script setup lang="ts">
/** サービス・スキル・作品の装飾アイコンを、静的生成する配信用画像へ揃える。 */
import { computed } from 'vue'

/** このコンポーネントが受け取る入力。 */
interface Props {
  /** public配下のSVG・PNG・JPEGなどの画像パス。ICOは事前にPNGへ変換する。 */
  src: string
  /** 通常表示する正方形の一辺（CSS px）。 */
  size?: number
  /** 表示寸法が画面幅で変わる場合のNuxt Imageのsizes指定。 */
  sizes?: string
}

const props = withDefaults(defineProps<Props>(), { size: 24, sizes: undefined })

/** ベクター画像をラスター化せず、公開サブディレクトリにも対応する。 */
const isSvg = computed(() => props.src.endsWith('.svg'))
const asset = usePublicAsset()
</script>
