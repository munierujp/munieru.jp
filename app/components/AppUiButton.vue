<template>
  <PButton
    class="ui-button"
    :class="{ 'is-icon-only': iconOnly }"
    :as="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :outlined="!selected"
    :rounded="iconOnly"
    severity="secondary"
    ><slot
  /></PButton>
</template>
<script setup lang="ts">
/** ライブラリの標準ボタンを、リンク・絞り込み・アイコン操作へ共用する。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean }>()
</script>
