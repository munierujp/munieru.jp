<template>
  <UPageCard
    :as="{ root: 'article', title: 'h3' }"
    class="h-full"
    :title="work.title"
    :description="work.description[locale]"
    :ui="{ header: 'w-full' }"
    :to="work.publicationEnded ? undefined : work.url"
    target="_blank"
  >
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <AppIconImage
          class="size-[clamp(48px,10vw,66px)] rounded-xl object-contain"
          :src="work.image"
          :size="66"
          sizes="48px 480:10vw sm:10vw 660:66px"
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
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -- 分類と日付の区切り記号は日英で共通のため。 -->
        {{ category.label }} / <time :datetime="work.date">{{ d(work.date, 'date') }}</time>
      </p>
    </template>
    <template #title>
      <span :lang="work.titleLang">{{ work.title }}</span> <UBadge v-if="work.publicationEnded">
        {{ t('ui.publicationEnded') }}
      </UBadge>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Work } from '~/types/Work'
import type { IconName } from '~/types/IconName'

const props = defineProps<{
  /** 分類・公開状態・ソースコードを含む作品の情報。 */
  work: Work
}>()
const { locale, t, d } = useI18n()
const icons: Record<Work['category'], IconName> = {
  web: 'i-lucide-globe',
  extension: 'i-lucide-puzzle',
  library: 'i-lucide-code',
  cli: 'i-lucide-terminal'
}
const category = computed(() => ({
  label: t(`ui.categories.${props.work.category}`),
  icon: icons[props.work.category]
}))
</script>
