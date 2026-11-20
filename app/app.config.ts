export default defineAppConfig({
  /** 配色と、各コンポーネントに共通する表示・操作のテーマ。 */
  ui: {
    /** 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。 */
    colors: { primary: 'cyan', neutral: 'zinc' },
    /** 通常ボタンと円形ボタンの外観・操作領域。 */
    button: {
      // 操作可能なボタンだけポインターにし、無効な操作と区別する。
      slots: { base: 'cursor-pointer disabled:cursor-default aria-disabled:cursor-default min-h-11 motion-reduce:transition-none' },
      defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
      variants: { square: { true: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' } }
    },
    /** 各セクションの見出し・配置・上下余白。 */
    pageSection: {
      slots: {
        container: 'flex flex-col lg:flex gap-0 sm:gap-0 py-12 sm:py-12 lg:py-12',
        body: '[&>.flex-wrap]:justify-center',
        title: 'relative w-fit mx-auto after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:h-1 after:rounded-full after:bg-primary after:content-[""] after:w-full'
      },
      // 標準の大きな本文余白を、このサイトの一覧に合う24pxへ揃える。
      compoundVariants: [{ orientation: 'vertical', title: true, class: { body: 'mt-6' } }]
    },
    /** カードの装飾は標準にし、ポインターと動きを抑える設定を残す。 */
    pageCard: {
      slots: { root: 'motion-reduce:transition-none' },
      variants: { to: { true: { root: 'cursor-pointer' } } }
    },
    /** 分類・状態を表示するバッジの色・サイズ・角丸。 */
    badge: {
      defaultVariants: { color: 'neutral', variant: 'subtle', size: 'lg' },
      variants: { size: { lg: { base: 'gap-2 rounded-full' } } }
    },
    /** テーマなどの選択メニューに使う外観・操作領域。 */
    selectMenu: {
      defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
      slots: {
        base: 'min-h-11 cursor-pointer disabled:cursor-default aria-disabled:cursor-default',
        item: 'cursor-pointer data-disabled:cursor-default'
      }
    }
  }
})
