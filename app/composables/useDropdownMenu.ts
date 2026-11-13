/**
 * テーマ・言語メニューに共通する開閉とキーボード操作を管理する。
 */
import { nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import type { Ref } from 'vue'

/** メニューの要素参照・表示状態と、操作用のイベントハンドラー。 */
export interface DropdownMenu {
  /** メニューが開いているかどうか。 */
  menuOpen: Ref<boolean>
  /** 外側クリックの判定に使うメニュー全体の要素。 */
  switcher: Ref<HTMLElement | null>
  /** 閉じた後にフォーカスを戻すトリガー要素。 */
  trigger: Ref<HTMLElement | null>
  /** 表示順に並ぶ、フォーカス可能なメニュー項目。 */
  items: Ref<HTMLElement[]>
  /** トリガーとメニューの関連付けに使う一意のID。 */
  triggerId: string
  /** メニューの表示要素を識別する一意のID。 */
  menuId: string
  /** メニューを閉じ、指定時はトリガーへフォーカスを戻す。 */
  closeMenu: (restoreFocus?: boolean) => void
  /** トリガーの操作に応じてメニューを開閉する。 */
  toggleMenu: (event: MouseEvent) => void
  /** トリガー上の上下キーとEscapeを処理する。 */
  onTriggerKeydown: (event: KeyboardEvent) => void
  /** メニュー内の巡回・項目選択・閉じるキー操作を処理する。 */
  onMenuKeydown: (event: KeyboardEvent) => void
}

/**
 * ドロップダウンの状態・要素参照・イベントハンドラーを生成する。
 *
 * @returns テンプレートに関連付ける参照と、開閉・キー操作のハンドラー。
 * @remarks
 * マウント中だけ文書全体の操作を監視する。外側へのクリックやフォーカス移動で閉じ、
 * Escapeで閉じるときはトリガーへフォーカスを戻す。
 */
export function useDropdownMenu (): DropdownMenu {
  // SSRとクライアントで一致し、複数のメニュー間で重複しないIDを生成する。
  const id = useId()
  const triggerId = `${id}-trigger`
  const menuId = `${id}-menu`
  /** メニューの表示状態。非表示の項目はテンプレート側でも操作対象から外す。 */
  const menuOpen = ref(false)
  /** 外側への操作を判定するための、トリガーとメニューを含む領域。 */
  const switcher = ref<HTMLElement | null>(null)
  /** 閉じた後のフォーカス復帰先。 */
  const trigger = ref<HTMLElement | null>(null)
  /** テンプレートと同じ表示順の項目。上下キーで巡回する。 */
  const items = ref<HTMLElement[]>([])
  /**
   * メニューを開き、必要なら描画後に指定項目へフォーカスする。
   * @param index - フォーカス先の添字。省略時は現在のフォーカスを維持する。
   */
  function openMenu (index?: number): void {
    menuOpen.value = true
    if (index !== undefined) nextTick(() => items.value[index]?.focus())
  }
  /**
   * メニューを閉じる。
   * @param restoreFocus - 閉じる前にトリガーへフォーカスを戻すかどうか。
   */
  function closeMenu (restoreFocus = false): void {
    if (restoreFocus) trigger.value?.focus()
    menuOpen.value = false
  }
  /**
   * トリガーで開閉し、キーボード由来のクリックでは先頭項目を選ぶ。
   * @param event - トリガーのクリックイベント。
   */
  function toggleMenu (event: MouseEvent): void {
    if (menuOpen.value) closeMenu()
    // キーボードで開いた時だけ、先頭項目へフォーカスを移す。
    else openMenu(event.detail === 0 ? 0 : undefined)
  }
  /**
   * 上下キーで最初・最後の項目を開き、Escapeでは閉じる。
   * @param event - トリガー上で発生したキー操作。
   */
  function onTriggerKeydown (event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Escape') closeMenu(true)
    else openMenu(event.key === 'ArrowUp' ? items.value.length - 1 : 0)
  }
  /**
   * 項目間の巡回、Home・End、Escape・Tab、リンクのSpace選択を処理する。
   * @param event - メニュー内で発生したキー操作。
   */
  function onMenuKeydown (event: KeyboardEvent): void {
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
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? items.value.length - 1
        : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.value.length) % items.value.length
    items.value[next]?.focus()
  }
  /**
   * メニュー領域外へのクリック・フォーカス移動で閉じる。
   * @param event - 文書全体で監視するpointerdownまたはfocusinイベント。
   */
  function dismiss (event: Event): void {
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
