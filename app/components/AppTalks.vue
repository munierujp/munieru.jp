<template>
  <!-- 登壇一覧。イベントを主リンクとし、発表資料へのリンクは各カードに配置する。 -->
  <section class="talks-section py-12 wrap">
    <div class="section-top mb-6">
      <h2 class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.talks') }}</h2>
    </div>
    <ul class="talk-list grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] gap-3" role="list">
      <li v-for="talk in talks" :key="talk.key" class="min-w-0 @container">
        <AppTalkCard :talk="talk" />
      </li>
    </ul>
  </section>
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
