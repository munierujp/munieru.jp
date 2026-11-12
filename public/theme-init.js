/**
 * テーマ選択の保存・OS変更・別タブの変更を同期し、UI用の操作APIを公開する。
 * @packageDocumentation
 */
;(function () {
  /** 明示的なテーマ選択の保存キー。システム選択では値を削除する。 */
  var storageKey = 'munieru-theme'
  var root = document.documentElement
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  var preference = 'system'

  /**
   * 保存値を対応するテーマ選択へ正規化する。
   * @param {string | null} value - 保存領域またはUIから得た値。
   * @returns light・dark以外はsystem。
   */
  function normalize(value) {
    return value === 'light' || value === 'dark' ? value : 'system'
  }

  /**
   * テーマをDOMへ反映し、必要なら保存してUIへ変更を通知する。
   * @param {string | null} value - 適用するテーマ選択。
   * @param {boolean} persist - 利用者の選択として保存するかどうか。
   * @remarks ストレージが使えなくても、現在のタブでの表示変更は継続する。
   */
  function apply(value, persist) {
    preference = normalize(value)
    root.dataset.themePreference = preference
    root.dataset.theme =
      preference === 'system'
        ? systemTheme.matches
          ? 'dark'
          : 'light'
        : preference
    root.style.colorScheme = root.dataset.theme
    document.querySelector('meta[name="color-scheme"]').content =
      preference === 'system' ? 'light dark' : preference
    if (persist) {
      try {
        preference === 'system'
          ? window.localStorage.removeItem(storageKey)
          : window.localStorage.setItem(storageKey, preference)
      } catch (_) {}
    }
    window.dispatchEvent(new Event('munieru-theme-change'))
  }

  try {
    preference = normalize(window.localStorage.getItem(storageKey))
  } catch (_) {}
  apply(preference, false)

  window.munieruTheme = {
    setPreference: function (value) {
      apply(value, true)
    },
  }
  systemTheme.addEventListener('change', function () {
    if (preference === 'system') apply('system', false)
  })
  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null)
      apply(event.newValue, false)
  })
})()
