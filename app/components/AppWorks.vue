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
 * 型検査された作品データの日付順への整列を管理する。
 */
import { works as workData } from '~/data/works'

const { t } = useSiteLocale()
/** 元データを変更せず、公開日の新しい順に並べる。 */
const works = workData.toSorted((a, b) => b.date.localeCompare(a.date))
</script>
