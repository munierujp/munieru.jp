/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
export default defineAppConfig({
  ui: {
    // 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。
    colors: { primary: 'cyan', neutral: 'zinc' },
    button: {
      // 操作可能なボタンだけポインターにし、無効な操作と区別する。
      slots: { base: 'cursor-pointer disabled:cursor-default aria-disabled:cursor-default min-h-11 gap-2 rounded-xl duration-150 motion-reduce:transition-none' },
      // UButtonを直接使い、通常の文字色・外枠・サイズと円形操作を共通化する。
      defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
      variants: { square: { true: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' } }
    },
    pageCard: {
      slots: { root: 'rounded-[20px] transition-colors duration-150 motion-reduce:transition-none' },
      // 通常のボタンと同じ背景変化に揃え、リンクがないカードは反応させない。
      compoundVariants: [{
        variant: 'outline',
        to: true,
        class: { root: 'cursor-pointer hover:bg-elevated active:bg-elevated outline-inverted/25 has-[>a:focus-visible]:ring-inverted' }
      }]
    },
    // 使用するlgサイズの既定の角丸・間隔も、サイズ別設定で上書きする。
    badge: {
      defaultVariants: { color: 'neutral', variant: 'subtle', size: 'lg' },
      variants: { size: { lg: { base: 'gap-2 rounded-full' } } }
    },
    // 言語とテーマのセレクトは同じ寸法・配色・操作時のカーソルで表示する。
    selectMenu: {
      defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
      slots: {
        base: 'min-h-11 rounded-xl cursor-pointer disabled:cursor-default aria-disabled:cursor-default',
        content: 'rounded-[20px]',
        item: 'rounded-xl cursor-pointer data-disabled:cursor-default'
      }
    }
  }
})
