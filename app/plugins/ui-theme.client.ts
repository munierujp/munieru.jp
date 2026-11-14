/** 初期描画後のテーマ選択・OS変更も、Nuxt UI/Tailwindのdarkクラスへ同期する。 */
export default defineNuxtPlugin((nuxt) => {
  /** 既存のテーマ管理が決めた実際の配色を、クラスベースのUIへ伝える。 */
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
