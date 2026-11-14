<template>
  <UDropdownMenu :items="model"
    ><UButton v-bind="$attrs" variant="outline" color="neutral" size="lg" :square="iconOnly" :class="iconOnly ? 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' : undefined"
      ><slot>{{ label }}<AppIcon name="chevron-down" /></slot></UButton
  ></UDropdownMenu>
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false })
/** ライブラリに開閉・位置決め・キーボード操作を任せる比較用メニュー。 */
const props = defineProps<{
  /** テーマ切り替えなど、アイコンだけのトリガーを円形にする。 */
  iconOnly?: boolean
  label: string
  items: { value: string; label: string; selected: boolean }[]
}>()
const emit = defineEmits<{ select: [value: string] }>()
const model = computed(() =>
  props.items.map((item) => ({
    label: item.label,
    type: 'checkbox' as const,
    checked: item.selected,
    onUpdateChecked: () => emit('select', item.value),
  }))
)
</script>
