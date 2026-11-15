<template>
  <!-- 支援先の一覧。JSONにURLがある場合だけ独立したセクションとして表示する。 -->
  <UPageSection v-if="supportLinks.length" :title="t('ui.headings.support')" :aria-labelledby="headingId">
    <template #title>
      <span :id="headingId">{{ t('ui.headings.support') }}</span>
    </template>
    <template #body>
      <div class="flex flex-wrap items-center gap-3">
        <AppServiceLink v-for="link in supportLinks" :key="link.key" :link="link" />
      </div>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * JSONにURLのある支援先だけを、独立したセクションに表示する。
 */
import { computed, useId } from 'vue'
import type { SupportLink } from '~/types/SupportLink'
import supportData from '~~/modules/support.json'

// 同じコンポーネントを複数配置しても見出しIDが重複しないようにする。
const headingId = useId()
const { t, localize } = useSiteLocale()
// URLが空の支援先は表示しない。表示名・並び順・画像はJSONで管理する。
const supportLinks = computed<SupportLink[]>(() =>
  supportData
    .map(link => localize('support', link))
    .filter((link) => link.url)
)
</script>
