/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
import type { AppConfigInput } from 'nuxt/schema'

/** Nuxt UIが拡張する公式のアプリ設定型。 */
type UiConfig = NonNullable<AppConfigInput['ui']>

/** 通常ボタンと円形ボタンの外観・操作領域。 */
const button: NonNullable<UiConfig['button']> = {
  // 操作可能なボタンだけポインターにし、無効な操作と区別する。
  slots: { base: 'cursor-pointer disabled:cursor-default aria-disabled:cursor-default min-h-11 gap-2 rounded-xl duration-150 motion-reduce:transition-none' },
  // UButtonを直接使い、通常の文字色・外枠・サイズと円形操作を共通化する。
  defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
  variants: { square: { true: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' } }
}

/** 各セクションの見出し・配置・上下余白。 */
const pageSection: NonNullable<UiConfig['pageSection']> = {
  slots: {
    container: 'flex flex-col lg:flex gap-0 sm:gap-0 py-12 sm:py-12 lg:py-12',
    title: 'border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] sm:text-[clamp(1.5rem,1.2rem+1vw,2rem)] lg:text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]'
  },
  variants: { orientation: { vertical: { title: 'text-start' } } },
  // 標準の大きな本文余白を、このサイトの一覧に合う24pxへ揃える。
  compoundVariants: [{ orientation: 'vertical', title: true, class: { body: 'mt-6' } }]
}

/** カードの最小幅と、コンテナー幅に応じた列数・間隔。 */
const pageGrid: NonNullable<UiConfig['pageGrid']> = {
  base: 'grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] sm:grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] lg:grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] gap-3'
}

/** カードの角丸と、リンクがある場合の操作時の外観。 */
const pageCard: NonNullable<UiConfig['pageCard']> = {
  slots: { root: 'rounded-[20px] transition-colors duration-150 motion-reduce:transition-none' },
  // 通常のボタンと同じ背景変化に揃え、リンクがないカードは反応させない。
  compoundVariants: [{
    variant: 'outline',
    to: true,
    class: { root: 'cursor-pointer hover:bg-elevated active:bg-elevated outline-inverted/25 has-[>a:focus-visible]:ring-inverted' }
  }]
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
    base: 'min-h-11 rounded-xl cursor-pointer disabled:cursor-default aria-disabled:cursor-default',
    content: 'rounded-[20px]',
    item: 'rounded-xl cursor-pointer data-disabled:cursor-default'
  }
}

/** 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。 */
const colors: NonNullable<UiConfig['colors']> = { primary: 'cyan', neutral: 'zinc' }

/** 配色と各部品の設定を組み合わせた、サイト共通のUIテーマ。 */
const ui: UiConfig = {
  colors,
  button,
  pageSection,
  pageGrid,
  pageCard,
  badge,
  selectMenu
}

export default defineAppConfig({ ui })
