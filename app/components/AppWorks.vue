<template>
  <!-- 全作品を日付の新しい順で表示する。各作品の表示はAppWorkCardが担当する。 -->
  <UPageSection :title="t('ui.headings.works')">
    <template #body>
      <UPageGrid as="ul" role="list">
        <li v-for="work in works" :key="work.key" class="min-w-0">
          <AppWorkCard :work="work" />
        </li>
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 型検査された作品データを翻訳し、日付順への整列を管理する。
 */
import { computed } from 'vue'
import { works as workData } from '~/data/works'
import type { Work } from '~/types/Work'

// 作品の翻訳・日付順への整列をこのセクションで管理する。
const { t, localize } = useSiteLocale()
/** 型検査された作品を翻訳し、公開日の新しい順に並べる。 */
const works = computed<Work[]>(() =>
  workData
    .map(work => localize('works', work))
    .sort((a, b) => b.date.localeCompare(a.date))
)
</script>
