<template>
  <!-- 支援先の一覧。サービス名とアイコンから各支援先へ移動できる。 -->
  <UPageSection :aria-labelledby="headingId">
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
 * TSに定義した支援先を、独立したセクションに表示する。
 */
import { computed, useId } from 'vue'
import type { SupportLink } from '~/types/SupportLink'
import { supportLinks as supportData } from '~/data/supportLinks'

// 同じコンポーネントを複数配置しても見出しIDが重複しないようにする。
const headingId = useId()
const { t, localize } = useSiteLocale()
// 表示名・並び順・画像はTSで管理し、表示名を現在の言語へ翻訳する。
const supportLinks = computed<SupportLink[]>(() =>
  supportData
    .map(link => localize('support', link))
)
</script>
