/** 各UIライブラリのdarkセレクターを既存のテーマ選択へ同期する。 */
export default defineNuxtPlugin((nuxt) => {
  const sync = (): void => {
    document.documentElement.classList.toggle(
      'dark',
      document.documentElement.dataset.theme === 'dark'
    )
  }
  sync()
  nuxt.hook('app:mounted', () => {
    sync()
    window.addEventListener('app-theme-change', sync)
  })
})
