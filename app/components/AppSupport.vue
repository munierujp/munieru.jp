<template>
  <!-- 支援先の一覧。サービス名とアイコンから各支援先へ移動できる。 -->
  <UPageSection :title="t('ui.headings.support')">
    <template #body>
      <div class="flex flex-wrap items-center gap-3">
        <AppServiceLink v-for="link in supportLinks" :key="link.key" :link="{ ...link, title: typeof link.title === 'string' ? link.title : link.title[locale] }" />
      </div>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * TSに定義した支援先を、独立したセクションに表示する。
 */
import { supportLinks } from '~/data/supportLinks'

const { locale, t } = useSiteLocale()
</script>
