<template>
  <VMenu
    ><template #activator="{ props: activator }"
      ><VBtn v-bind="{ ...activator, ...$attrs }" variant="outlined" rounded="lg"
        ><slot>{{ label }}<AppIcon name="chevron-down" /></slot></VBtn></template
    ><VList
      ><VListItem
        v-for="item in items"
        :key="item.value"
        :title="item.label"
        :active="item.selected"
        @click="emit('select', item.value)" /></VList
  ></VMenu>
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
