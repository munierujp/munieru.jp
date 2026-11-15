import type { SelectMenuProps } from '@nuxt/ui'

/** 言語・テーマのトリガーを同じ44pxの円形アイコンにする共有設定。 */
export const iconSelectUi = {
  base: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0',
  leading: 'static p-0',
  value: 'hidden',
  trailing: 'hidden',
  content: 'min-w-40'
} satisfies NonNullable<SelectMenuProps['ui']>
