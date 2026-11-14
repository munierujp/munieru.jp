/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
export default defineAppConfig({
  ui: {
    button: { slots: { base: 'min-h-11 gap-2 rounded-xl' } },
    card: { slots: { root: 'rounded-[20px]' } },
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
