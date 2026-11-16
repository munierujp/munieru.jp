/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
import type { AppConfigInput } from 'nuxt/schema'

/** Nuxt UIが拡張する公式のアプリ設定型。 */
type UiConfig = NonNullable<AppConfigInput['ui']>

/** 通常ボタンと円形ボタンの外観・操作領域。 */
const button: NonNullable<UiConfig['button']> = {
  // 操作可能なボタンだけポインターにし、無効な操作と区別する。
  slots: { base: 'cursor-pointer disabled:cursor-default aria-disabled:cursor-default min-h-11 motion-reduce:transition-none' },
  // UButtonを直接使い、通常の文字色・外枠・サイズと円形操作を共通化する。
  defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
  variants: { square: { true: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' } }
}

/** 各セクションの見出し・配置・上下余白。 */
const pageSection: NonNullable<UiConfig['pageSection']> = {
  slots: {
    container: 'flex flex-col lg:flex gap-0 sm:gap-0 py-12 sm:py-12 lg:py-12',
    body: '[&>.flex-wrap]:justify-center',
    title: 'relative w-fit mx-auto after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:h-1 after:rounded-full after:bg-primary after:content-[""] after:w-full'
  },
  // 標準の大きな本文余白を、このサイトの一覧に合う24pxへ揃える。
  compoundVariants: [{ orientation: 'vertical', title: true, class: { body: 'mt-6' } }]
}

/** カードの装飾は標準にし、ポインターと動きを抑える設定を残す。 */
const pageCard: NonNullable<UiConfig['pageCard']> = {
  slots: { root: 'motion-reduce:transition-none' },
  variants: { to: { true: { root: 'cursor-pointer' } } }
}

/** 分類・状態を表示するバッジの色・サイズ・角丸。 */
const badge: NonNullable<UiConfig['badge']> = {
  defaultVariants: { color: 'neutral', variant: 'subtle', size: 'lg' },
  variants: { size: { lg: { base: 'gap-2 rounded-full' } } }
}

/** 言語・テーマの選択メニューに使う外観・操作領域。 */
const selectMenu: NonNullable<UiConfig['selectMenu']> = {
  defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
  slots: {
    base: 'min-h-11 cursor-pointer disabled:cursor-default aria-disabled:cursor-default',
    item: 'cursor-pointer data-disabled:cursor-default'
  }
}

/** 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。 */
const colors: NonNullable<UiConfig['colors']> = { primary: 'cyan', neutral: 'zinc' }

/** 配色と各部品の設定を組み合わせた、サイト共通のUIテーマ。 */
const ui: UiConfig = {
  colors,
  button,
  pageSection,
  pageCard,
  badge,
  selectMenu
}

export default defineAppConfig({ ui })
