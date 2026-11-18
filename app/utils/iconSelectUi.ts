import type { SelectMenuProps } from '@nuxt/ui'

/** ヘッダーをコンパクトに保ち、言語・テーマのトリガーに同じ44pxの操作領域を確保する共有設定。 */
export const iconSelectUi: NonNullable<SelectMenuProps['ui']> = {
  base: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0',
  leading: 'static p-0',
  // トリガーだけをアイコン表示にし、メニュー内の選択肢は文字で読めるようにする。
  value: 'hidden',
  trailing: 'hidden',
  content: 'min-w-40'
}
