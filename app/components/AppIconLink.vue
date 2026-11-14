<template>
  <!-- アイコンだけのリンクには、読み上げ名とツールチップを共通で付ける。 -->
  <UTooltip :text="label">
    <UButton
      square
      class="icon-link ui-button is-icon-only"
      :to="href"
      external
      target="_blank"
      rel="noopener"
      :aria-label="label"
    >
      <slot>
        <UIcon v-if="icon" class="app-icon block size-6 shrink-0" aria-hidden="true" :name="icon" />
      </slot>
    </UButton>
  </UTooltip>
</template>

<script setup lang="ts">
/**
 * アイコンだけの外部リンクに、読み上げ名とNuxt UIのツールチップを付ける。
 * @remarks 説明はホバー・キーボードフォーカスで表示し、リンクの読み上げ名はaria-labelで保持する。
 */
import type { IconName } from '~/types/ui'
// アイコン集の名前はiconで指定し、画像などはデフォルトスロットへ渡す。
// スロットに画像を渡す場合、リンクのlabelと重複しないようaltは空にする。
defineProps<{
  /** リンク先の公開URL。 */
  href: string
  /** 操作内容を伝える表示・読み上げ用の名前。 */
  label: string
  /** 表示するSVGアイコン名。省略時はスロットの内容を使う。 */
  icon?: IconName
}>()
</script>
