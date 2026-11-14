<template>
  <!-- 作品一覧と分類による絞り込み。各作品の表示はAppWorkCardが担当する。 -->
  <UContainer as="section" class="works-section py-12">
    <div class="section-top mb-6">
      <h2 class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.works') }}</h2>
    </div>
    <!-- JSが動かない場合は全作品を表示し、操作できない絞り込みUIは隠す。 -->
    <div class="work-toolbar mb-4 flex [&[hidden]]:hidden flex-wrap items-center gap-3" data-work-toolbar :hidden="!ready">
      <div class="filters flex flex-wrap items-center gap-3" role="group" :aria-label="t('ui.workTypes')">
        <UButton
          v-for="filter in filters"
          :key="filter.value"
          class="ui-button rounded-full"
          :data-work-filter="filter.value"
          type="button"
          :color="activeFilter === filter.value ? 'primary' : 'neutral'"
          :variant="activeFilter === filter.value ? 'solid' : 'outline'"
          :aria-pressed="activeFilter === filter.value ? 'true' : 'false'"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </UButton>
      </div>
      <span class="work-count text-xs text-muted" role="status">{{
        t('ui.workCount', { total: works.length, count: filteredWorks.length })
      }}</span>
    </div>
    <ul class="work-list grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] gap-3" role="list">
      <li v-for="work in filteredWorks" :key="work.key" class="min-w-0">
        <AppWorkCard :work="work" />
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 作品データの分類を検証し、翻訳・日付順への整列・絞り込みを管理する。
 */
import { computed, onMounted, ref } from 'vue'
import workData from '~~/modules/works.json'
import type { Work, WorkFilter } from '~/types/content'

// 作品の翻訳・日付順への整列・分類の絞り込みをこのセクションで管理する。
const { t, localize } = useSiteLocale()
const ready = ref(false)
/** 選択中の作品分類。初期表示とJavaScript無効時は全作品を表示する。 */
const activeFilter = ref<WorkFilter>('all')
/** 絞り込み項目の表示順。作品分類の型と一致させる。 */
const filterValues = [
  'all',
  'web',
  'extension',
  'library',
  'cli',
] as const satisfies readonly WorkFilter[]
const filters = computed(() =>
  filterValues.map((value) => ({ value, label: t(`ui.categories.${value}`) }))
)
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
/** 選択した分類に一致する作品。全件表示では整列済みの一覧をそのまま返す。 */
const filteredWorks = computed(() =>
  activeFilter.value === 'all'
    ? works.value
    : works.value.filter((work) => work.category === activeFilter.value)
)
// JSが使えない場合も全作品を読めるよう、操作できる状態になってから絞り込みを表示する。
onMounted(() => {
  ready.value = true
})
</script>
