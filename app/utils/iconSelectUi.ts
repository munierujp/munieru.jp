import type { SelectMenuProps } from '@nuxt/ui'

/** テーマ選択を44pxの円形アイコンにし、言語ボタンと寸法を揃える設定。 */
export const iconSelectUi: NonNullable<SelectMenuProps['ui']> = {
  base: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0',
  leading: 'static p-0',
  // トリガーだけをアイコン表示にし、メニュー内の選択肢は文字で読めるようにする。
  value: 'hidden',
  trailing: 'hidden',
  content: 'min-w-40'
}
