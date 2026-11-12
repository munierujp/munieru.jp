;(function () {
  var storageKey = 'munieru-theme'
  var root = document.documentElement
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  var preference = 'system'

  function normalize(value) {
    return value === 'light' || value === 'dark' ? value : 'system'
  }

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
