import { nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'

// テーマ・言語で共通のメニュー操作。外側へ移動した時も閉じ、隠れた項目へフォーカスを残さない。
export function useDropdownMenu() {
  // SSRとクライアントで一致し、複数のメニュー間で重複しないIDを生成する。
  const id = useId()
  const triggerId = `${id}-trigger`
  const menuId = `${id}-menu`
  const menuOpen = ref(false)
  const switcher = ref<HTMLElement | null>(null)
  const trigger = ref<HTMLElement | null>(null)
  const items = ref<HTMLElement[]>([])
  function openMenu(index?: number) {
    menuOpen.value = true
    if (index !== undefined) nextTick(() => items.value[index]?.focus())
  }
  function closeMenu(restoreFocus = false) {
    if (restoreFocus) trigger.value?.focus()
    menuOpen.value = false
  }
  function toggleMenu(event: MouseEvent) {
    if (menuOpen.value) closeMenu()
    // キーボードで開いた時だけ、先頭項目へフォーカスを移す。
    else openMenu(event.detail === 0 ? 0 : undefined)
  }
  function onTriggerKeydown(event: KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Escape') closeMenu(true)
    else openMenu(event.key === 'ArrowUp' ? items.value.length - 1 : 0)
  }
  function onMenuKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') return closeMenu(true)
    if (event.key === 'Escape') {
      event.preventDefault()
      return closeMenu(true)
    }
    // リンク項目も、ボタンと同じくSpaceで選択できるようにする。
    if (event.key === ' ' && document.activeElement?.tagName === 'A') {
      event.preventDefault()
      if (document.activeElement instanceof HTMLElement) document.activeElement.click()
      return
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !items.value.length) return
    event.preventDefault()
    const current = items.value.findIndex(item => item === document.activeElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.value.length - 1
      : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.value.length) % items.value.length
    items.value[next]?.focus()
  }
  function dismiss(event: Event) {
    if (!(event.target instanceof Node) || !switcher.value?.contains(event.target)) closeMenu()
  }
  onMounted(() => {
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('focusin', dismiss)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', dismiss)
    document.removeEventListener('focusin', dismiss)
  })
  return { menuOpen, switcher, trigger, items, triggerId, menuId, closeMenu, toggleMenu, onTriggerKeydown, onMenuKeydown }
}
