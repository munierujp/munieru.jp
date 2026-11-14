<template>
  <VBtn
    class="ui-button"
    :class="{ 'is-icon-only': iconOnly }"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :variant="selected ? 'flat' : 'outlined'"
    :color="selected ? 'primary' : undefined"
    :icon="iconOnly"
    :rounded="iconOnly ? 'circle' : 'lg'"
    :aria-pressed="href ? undefined : selected"
    ><slot
  /></VBtn>
</template>
<script setup lang="ts">
/** ライブラリの標準ボタンを、リンク・絞り込み・アイコン操作へ共用する。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean }>()
</script>
