<template>
  <!-- アイコンだけのリンクには、読み上げ名とツールチップを共通で付ける。 -->
  <a class="icon-link" :href="href" :aria-label="label" :title="label">
    <slot>
      <AppIcon v-if="icon" :name="icon" />
    </slot>
  </a>
</template>

<script setup lang="ts">
import type { IconName } from '~/types/ui'
// SVGはiconで指定し、画像などはデフォルトスロットへ渡す。
// スロットに画像を渡す場合、リンクのlabelと重複しないようaltは空にする。
defineProps<{ href: string; label: string; icon?: IconName }>()
</script>
