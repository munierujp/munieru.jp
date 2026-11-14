<template>
  <AppCard
    :ui="cardUi"
    class="work-row"
    :class="{ 'is-ended': work.publicationEnded }"
    :data-work-category="work.category"
    :title="work.title"
    :title-lang="titleLanguage(work.title)"
    :href="work.publicationEnded ? '' : work.url"
  >
    <template #media>
      <div
        class="work-symbol grid aspect-square w-[66px] place-items-center rounded-xl max-[560px]:w-12"
        :class="[work.category, { 'has-image': work.image && !imageFailed }]"
        aria-hidden="true"
      >
        <img
v-if="work.image && !imageFailed"
          class="size-full rounded-[inherit] object-contain"
          :src="asset(work.image)"
          alt=""
          width="66"
          height="66"
          loading="lazy"
          decoding="async"
          @error="imageFailed = true"
        >
        <UIcon v-else class="app-icon block size-6 shrink-0" aria-hidden="true" :name="category.icon" />
      </div>
    </template>
    <template #metadata>
      <span class="work-category text-xs text-muted">
        {{ category.label }} /
        <time :datetime="work.date">{{ formatDate(work.date) }}</time>
      </span>
    </template>
    <!-- 公開終了でも、補助リンクのGitHubからソースコードを開ける。 -->
    <template #status>
      <UBadge v-if="work.publicationEnded" class="work-status ui-badge">{{
        t('ui.publicationEnded')
      }}</UBadge>
    </template>
    {{ work.description }}
    <template #action>
      <AppIconLink
        class="source-link relative z-1 justify-self-end max-[560px]:col-start-2 max-[560px]:row-start-1"
        :href="work.github"
        :label="t('ui.sourceCode', { title: work.title })"
        icon="i-lucide-github"
      />
    </template>
  </AppCard>
</template>

<script setup lang="ts">
/**
 * 作品の分類・公開状態・専用アイコン・GitHubリンクを組み合わせる。
 */
import type { Work } from '~/types/content'
import type { IconName } from '~/types/ui'
import { computed, ref } from 'vue'

// 作品固有の分類・公開終了表示・GitHubリンクを組み合わせる。
const props = defineProps<{
  /** 分類・公開状態・ソースコードを含む作品の情報。 */
  work: Work
}>()
/** 作品のアイコン・本文・GitHubリンクを、画面幅に応じて配置する。 */
const cardUi = {
  layout: 'grid-cols-[66px_minmax(0,1fr)_44px] max-[560px]:grid-cols-[minmax(0,1fr)_44px]',
  content: 'max-[560px]:col-span-full max-[560px]:row-start-2'
}
const { t, titleLanguage, formatDate } = useSiteLocale()
// 専用アイコンがない作品と、画像を読み込めない場合は分類アイコンを表示する。
const imageFailed = ref(false)
const asset = usePublicAsset()
const icons = {
  web: 'i-lucide-globe',
  extension: 'i-lucide-puzzle',
  library: 'i-lucide-code',
  cli: 'i-lucide-terminal',
} satisfies Record<Work['category'], IconName>
/** 作品分類に対応する、翻訳済みの表示名と代替アイコン。 */
const category = computed(() => ({
  label: t(`ui.categories.${props.work.category}`),
  icon: icons[props.work.category],
}))
</script>
