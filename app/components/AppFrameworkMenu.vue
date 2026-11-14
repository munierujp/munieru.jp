<template>
  <span
    ><ons-button
      v-bind="$attrs"
      modifier="outline"
      role="button"
      tabindex="0"
      aria-haspopup="menu"
      @click="popover.show($event.currentTarget)"
      @keydown.enter="popover.show($event.currentTarget)"
      ><slot>{{ label }}<AppIcon name="chevron-down" /></slot></ons-button
    ><ons-popover ref="popover" cancelable direction="down"
      ><ons-list role="menu"
        ><ons-list-item
          v-for="item in items"
          :key="item.value"
          tappable
          role="menuitem"
          tabindex="0"
          @click="choose(item.value)"
          @keydown.enter="choose(item.value)"
          >{{ item.label }}{{ item.selected ? ' ✓' : '' }}</ons-list-item
        ></ons-list
      ></ons-popover
    ></span
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
const popover = ref()
/** 選択後にOnsenのポップオーバーを閉じる。 */
function choose (value: string): void {
  emit('select', value)
  popover.value.hide()
}
</script>
