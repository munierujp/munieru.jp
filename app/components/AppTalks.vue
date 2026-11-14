<template>
  <!-- 登壇一覧。イベントを主リンクとし、発表資料へのリンクは各カードに配置する。 -->
  <UPageSection class="talks-section" :title="t('ui.headings.talks')">
    <template #body>
      <UPageGrid as="ul" class="talk-list" role="list">
        <li v-for="talk in talks" :key="talk.key" class="min-w-0 @container">
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
import type { Talk } from '~/types/content'
import { computed } from 'vue'
import talkData from '~~/modules/talks.json'

// 登壇情報を言語に合わせ、日付の新しい順に並べる。原題と参考英訳の表示はAppTalkCardが担当する。
const { t, localize } = useSiteLocale()
/** 翻訳済みの登壇。原題を保持したままISO日付の降順に並べる。 */
const talks = computed<Talk[]>(() => talkData.map(talk => localize('talks', talk)).sort((a, b) => b.date.localeCompare(a.date)))
</script>
