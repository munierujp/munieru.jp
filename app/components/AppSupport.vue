<template>
  <!-- 支援先の一覧。JSONにURLがある場合だけ独立したセクションとして表示する。 -->
  <UPageSection v-if="supportLinks.length" class="support-section" :title="t('ui.headings.support')" :aria-labelledby="headingId">
    <template #title>
      <span :id="headingId">{{ t('ui.headings.support') }}</span>
    </template>
    <template #body>
      <div class="support-links flex flex-wrap items-center gap-3">
        <UButton
          v-for="link in supportLinks"
          :key="link.key"
          :to="link.url"
          external
          target="_blank"
          rel="noopener"
          class="ui-button support-button whitespace-nowrap"
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
        </UButton>
      </div>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * JSONにURLのある支援先だけを、独立したセクションに表示する。
 */
import { computed, useId } from 'vue'
import type { SupportLink } from '~/types/content'
import supportData from '~~/modules/support.json'

// 同じコンポーネントを複数配置しても見出しIDが重複しないようにする。
const headingId = useId()
const { t, localize } = useSiteLocale()
const asset = usePublicAsset()
// URLが空の支援先は表示しない。表示名・並び順・画像はJSONで管理する。
const supportLinks = computed<SupportLink[]>(() =>
  supportData
    .map(link => localize('support', link))
    .filter((link) => link.url)
)
</script>
