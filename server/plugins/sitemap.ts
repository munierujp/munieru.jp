/**
 * サイトマップの言語未指定URLを、言語判定用の入口へ揃えるNitroプラグイン。
 * @remarks server/plugins配下のためNuxtが自動登録し、サイトマップ生成時に実行する。
 */
export default defineNitroPlugin(nitroApp => {
  // x-defaultは特定言語に対応しない利用者向けの入口。HTMLのhreflangと同じBASE_URLへ揃える。
  nitroApp.hooks.hook('sitemap:resolved', context => {
    const baseUrl = useRuntimeConfig().public.siteConfig.BASE_URL
    for (const page of context.urls) {
      for (const alternate of page.alternatives || []) {
        if (alternate.hreflang === 'x-default') alternate.href = baseUrl
      }
    }
  })
})
