<template>
  <UPageCard
    as="article"
    class="h-full"
    :title="work.title"
    :description="work.description"
    :ui="{ header: 'w-full' }"
    :to="work.publicationEnded ? undefined : work.url"
    target="_blank"
    rel="noopener"
  >
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <AppIconImage
          class="size-[66px] rounded-xl object-contain max-[560px]:size-12"
          :src="work.image"
          :size="66"
          sizes="48px tablet:66px"
          :icon="category.icon"
        />
        <AppIconLink
          class="relative z-1 shrink-0"
          :href="work.github"
          :label="t('ui.sourceCode', { title: work.title })"
          icon="i-simple-icons-github"
        />
      </div>
      <p class="mt-3 text-xs text-muted">
        {{ category.label }} / <time :datetime="work.date">{{ formatDate(work.date) }}</time>
      </p>
    </template>
    <template #title>
      <h3 :lang="titleLanguage(work.title)">
        {{ work.title }} <UBadge v-if="work.publicationEnded">{{ t('ui.publicationEnded') }}</UBadge>
      </h3>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
/** 標準のカードスロットで、作品の説明と独立したソースコードへのリンクを表示する。 */
import type { Work } from '~/types/Work'
import type { IconName } from '~/types/IconName'
import { computed } from 'vue'

/** このコンポーネントが受け取る入力。 */
interface Props {
  /** 分類・公開状態・ソースコードを含む作品の情報。 */
  work: Work
}

const props = defineProps<Props>()
const { t, titleLanguage, formatDate } = useSiteLocale()
const icons: Record<Work['category'], IconName> = {
  web: 'i-lucide-globe',
  extension: 'i-lucide-puzzle',
  library: 'i-lucide-code',
  cli: 'i-lucide-terminal'
}
/** 作品分類に対応する、翻訳済みの表示名と代替アイコン。 */
const category = computed(() => ({
  label: t(`ui.categories.${props.work.category}`),
  icon: icons[props.work.category]
}))
</script>
