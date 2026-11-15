<template>
  <!-- 登壇一覧。カード全体から発表資料を開き、イベント名には独立したリンクを付ける。 -->
  <UPageSection :title="t('ui.headings.talks')">
    <template #body>
      <UPageGrid as="ul" role="list">
        <li v-for="talk in talks" :key="talk.key" class="min-w-0">
          <AppTalkCard :talk="talk" />
        </li>
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 登壇情報を読み込み、翻訳して日付の新しい順に表示する。
 */
import type { Talk } from '~/types/Talk'
import { computed } from 'vue'
import { talks as talkData } from '~/data/talks'

const { t, localize } = useSiteLocale()
/** 翻訳済みの登壇。原題を保持したままISO日付の降順に並べる。 */
const talks = computed<Talk[]>(() => talkData.map(talk => localize('talks', talk)).sort((a, b) => b.date.localeCompare(a.date)))
</script>
