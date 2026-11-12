<template>
  <!-- 装飾用の共通アイコン。操作の名前は呼び出し側のリンクやボタンで指定する。 -->
  <svg
    class="app-icon"
    :viewBox="name === 'github' ? '0 0 32 32' : '0 0 24 24'"
    width="24"
    height="24"
    aria-hidden="true"
    :fill="name === 'github' ? 'currentColor' : 'none'"
    :stroke="name === 'github' ? 'none' : 'currentColor'"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path v-for="(path, index) in paths" :key="index" :d="path" />
  </svg>
</template>

<script setup lang="ts">
/**
 * アイコン辞書からSVGのパスを描画する。読み上げ名は呼び出し側で管理する。
 * @packageDocumentation
 */
import { computed } from 'vue'
import icons from '~~/assets/icons.json'
import type { IconName } from '~/types/ui'

// name は assets/icons.json のキーに対応する。GitHubだけ塗りつぶし・32px座標系を使う。
const props = defineProps<{ name: IconName }>()
const paths = computed(() => icons[props.name] || [])
</script>
