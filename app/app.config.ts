/** Nuxt UIの公式テーマ設定に、部品の角丸と操作領域をまとめる。 */
export default defineAppConfig({
  ui: {
    // メニュー内のチェックなど、Nuxt UI標準のアイコンもTablerに統一する。
    icons: {
      arrowDown: 'i-tabler-arrow-down',
      arrowLeft: 'i-tabler-arrow-left',
      arrowRight: 'i-tabler-arrow-right',
      arrowUp: 'i-tabler-arrow-up',
      caution: 'i-tabler-alert-circle',
      check: 'i-tabler-check',
      chevronDoubleLeft: 'i-tabler-chevrons-left',
      chevronDoubleRight: 'i-tabler-chevrons-right',
      chevronDown: 'i-tabler-chevron-down',
      chevronLeft: 'i-tabler-chevron-left',
      chevronRight: 'i-tabler-chevron-right',
      chevronUp: 'i-tabler-chevron-up',
      close: 'i-tabler-x',
      copy: 'i-tabler-copy',
      copyCheck: 'i-tabler-copy-check',
      dark: 'i-tabler-moon',
      drag: 'i-tabler-grip-vertical',
      ellipsis: 'i-tabler-dots',
      error: 'i-tabler-circle-x',
      external: 'i-tabler-arrow-up-right',
      eye: 'i-tabler-eye',
      eyeOff: 'i-tabler-eye-off',
      file: 'i-tabler-file',
      folder: 'i-tabler-folder',
      folderOpen: 'i-tabler-folder-open',
      hash: 'i-tabler-hash',
      info: 'i-tabler-info-circle',
      light: 'i-tabler-sun',
      loading: 'i-tabler-loader-2',
      menu: 'i-tabler-menu',
      minus: 'i-tabler-minus',
      panelClose: 'i-tabler-layout-sidebar-left-collapse',
      panelOpen: 'i-tabler-layout-sidebar-left-expand',
      plus: 'i-tabler-plus',
      reload: 'i-tabler-rotate-2',
      search: 'i-tabler-search',
      stop: 'i-tabler-square',
      star: 'i-tabler-star',
      success: 'i-tabler-circle-check',
      system: 'i-tabler-device-desktop',
      tip: 'i-tabler-bulb',
      upload: 'i-tabler-upload',
      warning: 'i-tabler-alert-triangle'
    },
    // 独自の色値を持たず、Nuxt UI標準パレットの意味別カラーを使う。
    colors: { primary: 'cyan', neutral: 'zinc' },
    button: {
      slots: { base: 'min-h-11 gap-2 rounded-xl' },
      // UButtonを直接使い、通常の文字色・外枠・サイズと円形操作を共通化する。
      defaultVariants: { color: 'neutral', variant: 'outline', size: 'lg' },
      variants: { square: { true: 'size-11 min-w-11 shrink-0 justify-center rounded-full p-0' } }
    },
    card: { slots: { root: 'rounded-[20px] transition-colors duration-150 motion-reduce:transition-none' } },
    // 使用するlgサイズの既定の角丸・間隔も、サイズ別設定で上書きする。
    badge: {
      defaultVariants: { color: 'neutral', variant: 'subtle', size: 'lg' },
      variants: { size: { lg: { base: 'gap-2 rounded-full' } } }
    },
    dropdownMenu: {
      slots: {
        content: 'rounded-[20px]',
        item: 'rounded-xl before:rounded-xl'
      }
    }
  }
})
