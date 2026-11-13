<template>
  <AppCard
    class="work-row"
    :class="{ 'is-ended': work.publicationEnded }"
    :data-work-category="work.category"
    :title="work.title"
    :title-lang="titleLanguage(work.title)"
    :href="work.publicationEnded ? '' : work.url"
  >
    <template #media>
      <div class="work-symbol" :class="[work.category, { 'has-image': work.image && !imageFailed }]" aria-hidden="true">
        <img
          v-if="work.image && !imageFailed"
          :src="asset(work.image)"
          alt=""
          width="66"
          height="66"
          loading="lazy"
          decoding="async"
          @error="imageFailed = true"
        >
        <AppIcon v-else :name="category.icon" />
      </div>
    </template>
    <template #metadata>
      <span class="work-category">
        {{ category.label }} /
        <time :datetime="work.date">{{ formatDate(work.date) }}</time>
      </span>
    </template>
    <!-- 公開終了でも、補助リンクのGitHubからソースコードを開ける。 -->
    <template #status>
      <span v-if="work.publicationEnded" class="work-status">{{ t('ui.publicationEnded') }}</span>
      <span v-if="work.developmentEnded" class="work-status">{{ t('ui.developmentEnded') }}</span>
    </template>
    {{ work.description }}
    <template #action>
      <AppIconLink
        class="source-link"
        :href="work.github"
        :label="t('ui.sourceCode', { title: work.title })"
        icon="github"
      />
    </template>
  </AppCard>
</template>

<script setup lang="ts">
/**
 * 作品の分類・公開状態・専用アイコン・GitHubリンクを組み合わせる。
 * @packageDocumentation
 */
import type { Work } from '~/types/content'
import type { IconName } from '~/types/ui'
import { computed, ref } from 'vue'

// 作品固有の分類・公開終了表示・GitHubリンクを組み合わせる。
const props = defineProps<{ work: Work }>()
const { t, titleLanguage, formatDate } = useSiteLocale()
// 専用アイコンがない作品と、画像を読み込めない場合は分類アイコンを表示する。
const imageFailed = ref(false)
const asset = usePublicAsset()
const icons = { web: 'globe', extension: 'puzzle', library: 'code', cli: 'terminal' } satisfies Record<Work['category'], IconName>
/** 作品分類に対応する、翻訳済みの表示名と代替アイコン。 */
const category = computed(() => ({ label: t(`ui.categories.${props.work.category}`), icon: icons[props.work.category] }))
</script>
