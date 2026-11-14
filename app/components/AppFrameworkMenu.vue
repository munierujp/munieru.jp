<template>
  <ElDropdown :teleported="false" trigger="click" @command="emit('select', $event)"
    ><ElButton v-bind="$attrs" size="large"
      ><slot>{{ label }}<AppIcon name="chevron-down" /></slot></ElButton
    ><template #dropdown
      ><ElDropdownMenu
        ><ElDropdownItem v-for="item in items" :key="item.value" :command="item.value"
          >{{ item.label }}{{ item.selected ? ' ✓' : '' }}</ElDropdownItem
        ></ElDropdownMenu
      ></template
    ></ElDropdown
  >
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false })
/** ライブラリに開閉・位置決め・キーボード操作を任せる比較用メニュー。 */
defineProps<{
  label: string
  items: { value: string; label: string; selected: boolean }[]
}>()
const emit = defineEmits<{ select: [value: string] }>()
</script>
