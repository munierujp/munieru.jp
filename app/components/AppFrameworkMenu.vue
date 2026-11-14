<template>
  <span
    ><PButton
      v-bind="$attrs"
      outlined
      severity="secondary"
      aria-haspopup="menu"
      :aria-controls="menuId"
      @click="menu?.toggle($event)"
      ><slot>{{ label }}<AppIcon name="chevron-down" /></slot></PButton
    ><PMenu :id="menuId" ref="menu" :model="model" popup
  /></span>
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false })
/** ライブラリに開閉・位置決め・キーボード操作を任せる比較用メニュー。 */
const props = defineProps<{
  label: string
  items: { value: string; label: string; selected: boolean }[]
}>()
const emit = defineEmits<{ select: [value: string] }>()
const menu = ref()
const menuId = useId()
const model = computed(() =>
  props.items.map((item) => ({
    label: item.label + (item.selected ? ' ✓' : ''),
    command: () => emit('select', item.value),
  }))
)
</script>
