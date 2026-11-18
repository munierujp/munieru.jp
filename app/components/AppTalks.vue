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
import { talks as talkData } from '~/data/talks'

const { t } = useI18n()
const talks = talkData.toSorted((a, b) => b.date.localeCompare(a.date))
</script>
