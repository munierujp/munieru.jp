<template>
  <!-- 装飾用の共通アイコン。操作の名前は呼び出し側のリンクやボタンで指定する。 -->
  <svg
    class="app-icon"
    :viewBox="icon.viewBox"
    width="24"
    height="24"
    aria-hidden="true"
    :fill="icon.fill"
    :stroke="icon.stroke"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path v-for="(path, index) in icon.paths" :key="index" :d="path" />
  </svg>
</template>

<script setup lang="ts">
/**
 * アイコン辞書からSVGのパスを描画する。読み上げ名は呼び出し側で管理する。
 */
import { computed } from 'vue'
import icons from '~~/assets/icons.json'
import type { IconName } from '~/types/ui'

// 座標系・塗り・線の違いは辞書へ集約し、コンポーネントでは名前ごとに分岐しない。
const props = defineProps<{
  /** assets/icons.jsonに定義したSVGアイコン名。 */
  name: IconName
}>()
const icon = computed(() => icons[props.name])
</script>
