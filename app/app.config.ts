/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
export default defineAppConfig({
  ui: {
    // 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。
    colors: { primary: 'cyan', neutral: 'zinc' },
    button: { slots: { base: 'min-h-11 gap-2 rounded-xl' } },
    card: { slots: { root: 'rounded-[20px] transition-colors duration-150 motion-reduce:transition-none' } },
    // 使用するlgサイズの既定の角丸・間隔も、サイズ別設定で上書きする。
    badge: { variants: { size: { lg: { base: 'gap-2 rounded-full' } } } },
    dropdownMenu: {
      slots: {
        content: 'rounded-[20px]',
        item: 'rounded-xl before:rounded-xl'
      }
    }
  }
})
