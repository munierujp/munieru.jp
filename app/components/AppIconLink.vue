<template>
  <!-- アイコンだけのリンクには、読み上げ名とツールチップを共通で付ける。 -->
  <UTooltip :text="label">
    <UButton
      square
      :to="href"
      external
      target="_blank"
      :aria-label="label"
      :icon="icon"
      :ui="{ leadingIcon: 'size-6' }"
    />
  </UTooltip>
</template>

<script setup lang="ts">
/**
 * アイコンだけの外部リンクに、読み上げ名とNuxt UIのツールチップを付ける。
 * @remarks 説明はホバー・キーボードフォーカスで表示し、リンクの読み上げ名はaria-labelで保持する。
 */
import type { IconName } from '~/types/IconName'
defineProps<{
  /** リンク先の公開URL。 */
  href: string
  /** 操作内容を伝える表示・読み上げ用の名前。 */
  label: string
  /** ローカル同梱のアイコン集から表示するSVGアイコン名。 */
  icon: IconName
}>()
</script>
