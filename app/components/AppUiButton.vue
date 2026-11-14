<template>
  <UButton
    class="ui-button"
    :class="iconOnly ? 'is-icon-only size-11 min-w-11 shrink-0 justify-center rounded-full p-0' : pill ? 'rounded-full' : undefined"
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
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean; pill?: boolean }>()
</script>
