<template>
  <!-- 支援先の一覧。サービス名とアイコンから各支援先へ移動できる。 -->
  <UPageSection :title="t('ui.headings.support')">
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
import { computed } from 'vue'
import type { SupportLink } from '~/types/SupportLink'
import { supportLinks as supportData } from '~/data/supportLinks'

const { t, localize } = useSiteLocale()
// 表示名・並び順・画像はTSで管理し、表示名を現在の言語へ翻訳する。
const supportLinks = computed<SupportLink[]>(() =>
  supportData
    .map(link => localize('support', link))
)
</script>
