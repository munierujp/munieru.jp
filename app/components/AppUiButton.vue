<template>
  <ElButton
    class="ui-button"
    :class="{ 'is-icon-only': iconOnly }"
    :tag="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :type="selected ? 'primary' : 'default'"
    :circle="iconOnly"
    size="large"
    ><slot
  /></ElButton>
</template>
<script setup lang="ts">
/** ライブラリの標準ボタンを、リンク・絞り込み・アイコン操作へ共用する。 */
defineProps<{ href?: string; selected?: boolean; iconOnly?: boolean }>()
</script>
