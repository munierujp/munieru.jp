export default defineNitroPlugin(nitroApp => {
  // HTMLのhreflangと同じく、言語を指定しない入口をx-defaultにする。
  nitroApp.hooks.hook('sitemap:resolved', context => {
    const baseUrl = useRuntimeConfig().public.siteConfig.BASE_URL
    for (const page of context.urls) {
      for (const alternate of page.alternatives || []) {
        if (alternate.hreflang === 'x-default') alternate.href = baseUrl
      }
    }
  })
})
