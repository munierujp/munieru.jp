<template>
  <UButton
    class="ui-button"
    :class="{ 'is-icon-only': iconOnly, 'rounded-full': iconOnly }"
    :to="href"
    :external="!!href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :variant="selected ? 'solid' : 'outline'"
    :square="iconOnly"
    size="lg"
    ><slot
  /></UButton>
</template>
<script setup lang="ts">
/** ライブラリの標準ボタンを、リンク・絞り込み・アイコン操作へ共用する。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean }>()
</script>
