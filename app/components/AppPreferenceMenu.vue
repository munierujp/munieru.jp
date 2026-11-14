<template>
  <UDropdownMenu :items="model"
    ><UButton v-bind="$attrs" variant="outline" color="neutral" size="lg" :square="iconOnly" :class="iconOnly ? 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' : undefined"
      ><slot>{{ label }}<UIcon class="app-icon block size-6 shrink-0" aria-hidden="true" name="i-tabler-chevron-down" /></slot></UButton
  ></UDropdownMenu>
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false })
/**
 * 言語・テーマで共有する、現在の選択にチェックを付けるドロップダウン。
 * @remarks 選択データをNuxt UIの項目へ変換し、開閉・位置決め・キー操作はUDropdownMenuへ任せる。
 * @remarks aria-label等はルートのUDropdownMenuではなく、実際のトリガーボタンへ渡す。
 */
const props = defineProps<{
  /** テーマ切り替えなど、アイコンだけのトリガーを円形にする。 */
  iconOnly?: boolean
  /** スロットを省略したときにトリガーへ表示する名前。 */
  label: string
  /** 値・表示名・現在の選択状態を持つ選択肢。 */
  items: {
    /** 選択時に親へ返す値。 */
    value: string
    /** メニューに表示する名前。 */
    label: string
    /** 現在の選択ならチェックを表示する。 */
    selected: boolean
  }[]
}>()
/** 選択値を親へ通知し、保存や言語遷移は呼び出し側へ任せる。 */
const emit = defineEmits<{ select: [value: string] }>()
/** サイト共通の選択肢を、Nuxt UIのチェック付きメニュー項目へ変換する。 */
const model = computed(() =>
  props.items.map((item) => ({
    label: item.label,
    type: 'checkbox' as const,
    checked: item.selected,
    onUpdateChecked: () => emit('select', item.value),
  }))
)
</script>
