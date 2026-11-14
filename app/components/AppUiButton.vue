<template>
  <UButton
    class="ui-button"
    :class="iconOnly ? 'is-icon-only size-11 min-w-11 shrink-0 justify-center rounded-full p-0' : pill ? 'rounded-full' : undefined"
    :to="href"
    :external="!!href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :color="selected ? 'primary' : 'neutral'"
    :variant="selected ? 'solid' : 'outline'"
    :square="iconOnly"
    size="lg"
    ><slot
  /></UButton>
</template>
<script setup lang="ts">
/** 通常の文字色はneutral、選択中の操作だけprimaryを使う共通ボタン。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean; pill?: boolean }>()
</script>
