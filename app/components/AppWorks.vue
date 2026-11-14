<template>
  <!-- 全作品を日付の新しい順で表示する。各作品の表示はAppWorkCardが担当する。 -->
  <UPageSection class="works-section" :title="t('ui.headings.works')">
    <template #body>
      <ul class="work-list grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] gap-3" role="list">
        <li v-for="work in works" :key="work.key" class="min-w-0">
          <AppWorkCard :work="work" />
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 作品データの分類を検証し、翻訳・日付順への整列を管理する。
 */
import { computed } from 'vue'
import workData from '~~/modules/works.json'
import type { Work } from '~/types/content'

// 作品の翻訳・日付順への整列をこのセクションで管理する。
const { t, localize } = useSiteLocale()
// JSONの文字列を分類の型へ絞り込む。不正な分類は黙って表示しない。
const works = computed<Work[]>(() =>
  workData
    .map((work) => {
      const category = work.category
      if (
        category !== 'web' &&
        category !== 'extension' &&
        category !== 'library' &&
        category !== 'cli'
      ) {
        throw new Error(`Unknown work category: ${category}`)
      }
      return localize('works', { ...work, category })
    })
    .sort((a, b) => b.date.localeCompare(a.date))
)
</script>
