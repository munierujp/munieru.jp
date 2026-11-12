;(function () {
  var root = document.documentElement
  var preference = 'system'
  try {
    preference = window.localStorage.getItem('munieru-theme')
  } catch {
    // 保存領域が使えない場合はシステム設定で表示する。
  }
  if (preference !== 'light' && preference !== 'dark') preference = 'system'
  root.dataset.themePreference = preference
  root.dataset.theme =
    preference === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : preference
  root.style.colorScheme = root.dataset.theme
  document.querySelector('meta[name="color-scheme"]').content =
    preference === 'system' ? 'light dark' : preference
})()
