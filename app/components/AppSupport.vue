<template>
  <!-- 支援先の一覧。設定されたURLがある場合だけ独立したセクションとして表示する。 -->
  <section v-if="supportLinks.length" class="support-section wrap" :aria-labelledby="headingId">
    <div class="section-top">
      <h2 :id="headingId">{{ t('ui.headings.support') }}</h2>
    </div>
    <div class="support-links">
      <a
        v-for="link in supportLinks"
        :key="link.title"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="support-button"
      >
        <span class="social-icon" aria-hidden="true">
          <img
            :src="asset(link.image)"
            alt=""
            width="20"
            height="20"
            loading="lazy"
            @error="hideFailedImage"
          >
        </span>
        <span>{{ link.title }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 公開設定にURLのある支援先だけを、独立したセクションに表示する。
 * @packageDocumentation
 */
import { computed, useId } from 'vue'

// 同じコンポーネントを複数配置しても見出しIDが重複しないようにする。
const headingId = useId()
const { t } = useSiteLocale()
const config = useRuntimeConfig().public.siteConfig
const asset = usePublicAsset()
// URLが空の支援先は表示しない。SPONSOERSは既存設定との互換性を保つための綴り。
const supportLinks = computed(() => [
  { title: 'GitHub Sponsors', url: config.GITHUB_SPONSOERS_URL, image: '/service-icons/github.svg' },
  { title: 'PayPal', url: config.PAYPAL_URL, image: '/service-icons/paypal.ico' },
  { title: t('ui.wishList'), url: config.WISH_LIST_URL, image: '/service-icons/amazon.ico' },
  { title: 'giftee', url: config.GIFTEE_URL, image: '/service-icons/giftee.png' }
].filter(link => link.url))
</script>
