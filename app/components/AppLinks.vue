<template>
  <!-- 各サービスへのリンク。名前とアイコンを含む領域全体をタップできる。 -->
  <UPageSection :title="t('ui.headings.links')">
    <template #body>
      <ul class="flex flex-wrap items-center gap-3" role="list">
        <li v-for="link in serviceLinks" :key="link.title" class="min-w-0">
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
import { serviceLinks } from '~/data/serviceLinks'

const { t } = useI18n()
</script>
