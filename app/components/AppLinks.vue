<template>
  <!-- 各サービスへのリンク。名前とアイコンを含む領域全体をタップできる。 -->
  <UPageSection :title="t('ui.headings.links')">
    <template #body>
      <ul class="flex flex-wrap items-center gap-3" role="list">
        <li v-for="link in links" :key="link.title" class="min-w-0">
          <AppServiceLink :link="link" />
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 公開アカウントへのリンクを、ローカルのサービスアイコンとともに表示する。
 */
import type { ServiceLink } from '~/types/ServiceLink'
import { links as linksData } from '~/data/links'

// サービス名・URL・画像・並び順は日英で共有し、原表記を維持する。
const { t } = useI18n()
/** 表示言語にかかわらず、元データのサービス名を表示する一覧。 */
const links: ServiceLink[] = linksData
</script>
