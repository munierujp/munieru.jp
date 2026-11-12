<template>
  <!-- 作品一覧と分類による絞り込み。各作品の表示はAppWorkCardが担当する。 -->
  <section class="works-section wrap">
    <div class="section-top">
      <h2>{{ t('ui.headings.works') }}</h2>
    </div>
    <!-- JSが動かない場合は全作品を表示し、操作できない絞り込みUIは隠す。 -->
    <div class="work-toolbar" data-work-toolbar :hidden="!ready">
      <div class="filters" role="group" :aria-label="t('ui.workTypes')">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :data-work-filter="filter.value"
          type="button"
          :aria-pressed="activeFilter === filter.value ? 'true' : 'false'"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
      <span class="work-count" role="status"
        >{{ t(filteredWorks.length === 1 ? 'ui.workCountOne' : 'ui.workCount', { count: filteredWorks.length }) }}</span
      >
    </div>
    <ul class="work-list" role="list">
      <li v-for="work in filteredWorks" :key="work.key">
        <AppWorkCard :work="work" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import workData from '~~/modules/works.json'
import type { Work, WorkFilter } from '~/types/content'

// 作品の翻訳・日付順への整列・分類の絞り込みをこのセクションで管理する。
const { t, localize } = useSiteLocale()
const ready = ref(false)
const activeFilter = ref<WorkFilter>('all')
const filterValues = ['all', 'web', 'extension', 'library', 'cli'] as const satisfies readonly WorkFilter[]
const filters = computed(() => filterValues.map(value => ({ value, label: t(`ui.categories.${value}`) })))
// JSONの文字列を分類の型へ絞り込む。不正な分類は黙って表示しない。
const works = computed<Work[]>(() => workData.map(work => {
  const category = work.category
  if (category !== 'web' && category !== 'extension' && category !== 'library' && category !== 'cli') {
    throw new Error(`Unknown work category: ${category}`)
  }
  return localize('works', { ...work, category })
}).sort((a, b) => b.date.localeCompare(a.date)))
const filteredWorks = computed(() => activeFilter.value === 'all'
  ? works.value : works.value.filter(work => work.category === activeFilter.value))
// JSが使えない場合も全作品を読めるよう、操作できる状態になってから絞り込みを表示する。
onMounted(() => { ready.value = true })
</script>
