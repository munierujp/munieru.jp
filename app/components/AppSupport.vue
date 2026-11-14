<template>
  <!-- 支援先の一覧。設定されたURLがある場合だけ独立したセクションとして表示する。 -->
  <UContainer v-if="supportLinks.length" as="section" class="support-section py-12" :aria-labelledby="headingId">
    <div class="section-top mb-6">
      <h2 :id="headingId" class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.support') }}</h2>
    </div>
    <div class="support-links flex flex-wrap items-center gap-3">
      <AppUiButton
        v-for="link in supportLinks"
        :key="link.key"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="support-button whitespace-nowrap"
      >
        <span class="social-icon inline-flex shrink-0 items-center gap-2" aria-hidden="true">
          <img
class="size-6 object-contain rounded-lg bg-white"
            :src="asset(link.image)"
            alt=""
            width="20"
            height="20"
            loading="lazy"
            @error="hideFailedImage"
          >
        </span>
        <span>{{ link.title }}</span>
      </AppUiButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 公開設定にURLのある支援先だけを、独立したセクションに表示する。
 */
import { computed, useId } from 'vue'
import type { SupportLink } from '~/types/content'
import supportData from '~~/modules/support.json'

// 同じコンポーネントを複数配置しても見出しIDが重複しないようにする。
const headingId = useId()
const { t, localize } = useSiteLocale()
const config = useRuntimeConfig().public.siteConfig
const asset = usePublicAsset()
/** 公開設定の上書き値。追加の支援先はJSONのURLをそのまま使う。 */
const urlOverrides: Partial<Record<string, string>> = {
  /** GitHub Sponsorsの公開URL。空文字なら非表示。 */
  'github-sponsors': config.GITHUB_SPONSOERS_URL,
  /** PayPalの公開URL。空文字なら非表示。 */
  paypal: config.PAYPAL_URL,
  /** ほしい物リストの公開URL。空文字なら非表示。 */
  'wish-list': config.WISH_LIST_URL,
  /** gifteeの公開URL。空文字なら非表示。 */
  giftee: config.GIFTEE_URL,
}
// URLが空の支援先は表示しない。表示名・並び順・画像はJSONで管理する。
const supportLinks = computed<SupportLink[]>(() =>
  supportData
    .map((link) => ({
      ...localize('support', link),
      url: urlOverrides[link.key] ?? link.url,
    }))
    .filter((link) => link.url)
)
</script>
