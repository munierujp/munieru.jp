<template>
  <!-- 登壇一覧。イベントを主リンクとし、発表資料へのリンクは各カードに配置する。 -->
  <section class="talks-section wrap">
    <div class="section-top">
      <h2>{{ t('ui.headings.talks') }}</h2>
    </div>
    <ul class="talk-list" role="list">
      <li v-for="talk in talks" :key="talk.key">
        <AppTalkCard :talk="talk" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Talk } from '~/types/content'
import { computed } from 'vue'
import talkData from '~~/modules/talks.json'

// 登壇情報を言語に合わせ、日付の新しい順に並べる。原題と参考英訳の表示はAppTalkCardが担当する。
const { t, localize } = useSiteLocale()
const talks = computed<Talk[]>(() => talkData.map(talk => localize('talks', talk)).sort((a, b) => b.date.localeCompare(a.date)))
</script>
