/**
 * テーマ選択の保存・OS変更・別タブの変更を同期し、UI用の操作APIを公開する。
 * @remarks nuxt.config.tsがJSへ変換してheadへ埋め込み、window.appThemeを公開する。
 * @packageDocumentation
 */
;(function (): void {
  /** Vueのメニューと共有する、保存可能なテーマの選択値。 */
  type ThemePreference = import('../app/types/ui.ts').ThemePreference
  /** 明示的なテーマ選択の保存キー。システム選択では値を削除する。 */
  const storageKey = 'app-theme'
  const root = document.documentElement
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  let preference: ThemePreference = 'system'

  /**
   * 保存値を対応するテーマ選択へ正規化する。
   * @param value - 保存領域またはUIから得た値。
   * @returns light・dark以外はsystem。
   */
  function normalize (value: string | null): ThemePreference {
    return value === 'light' || value === 'dark' ? value : 'system'
  }

  /**
   * テーマをDOMへ反映し、必要なら保存してUIへ変更を通知する。
   * @param value - 適用するテーマ選択。
   * @param persist - 利用者の選択として保存するかどうか。
   * @remarks ストレージが使えなくても、現在のタブでの表示変更は継続する。
   */
  function apply (value: string | null, persist: boolean): void {
    preference = normalize(value)
    root.dataset.themePreference = preference
    root.dataset.theme =
      preference === 'system'
        ? systemTheme.matches
          ? 'dark'
          : 'light'
        : preference
    root.style.colorScheme = root.dataset.theme
    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
    if (meta) meta.content = preference === 'system' ? 'light dark' : preference
    if (persist) {
      try {
        preference === 'system'
          ? window.localStorage.removeItem(storageKey)
          : window.localStorage.setItem(storageKey, preference)
      } catch {}
    }
    window.dispatchEvent(new Event('app-theme-change'))
  }

  try {
    preference = normalize(window.localStorage.getItem(storageKey))
  } catch {}
  apply(preference, false)

  window.appTheme = {
    setPreference: function (value: ThemePreference): void {
      apply(value, true)
    },
  }
  systemTheme.addEventListener('change', function (): void {
    if (preference === 'system') apply('system', false)
  })
  window.addEventListener('storage', function (event): void {
    if (event.key === storageKey || event.key === null) {
      apply(event.newValue, false)
    }
  })
})()
