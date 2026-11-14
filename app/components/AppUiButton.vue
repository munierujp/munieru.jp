<template>
  <a
    v-if="href"
    class="button button--outline ui-button"
    :class="{ 'is-icon-only': iconOnly }"
    :href="href"
    target="_blank"
    rel="noopener"
    ><slot /></a
  ><ons-button
    v-else
    class="ui-button"
    :class="{ 'is-icon-only': iconOnly }"
    :modifier="selected ? '' : 'outline'"
    role="button"
    tabindex="0"
    @keydown="activateFromKeyboard"
    ><slot
  /></ons-button>
</template>
<script setup lang="ts">
/** ライブラリの標準ボタンを、リンク・絞り込み・アイコン操作へ共用する。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean }>()
/** カスタム要素のボタンを、EnterとSpaceでもクリックできるようにする。 */
function activateFromKeyboard (event: KeyboardEvent): void {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  if (event.currentTarget instanceof HTMLElement) event.currentTarget.click()
}
</script>
