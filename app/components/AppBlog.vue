<template>
  <UPageSection :title="t('ui.headings.blog')">
    <template #body>
      <AppCard
        :title="blog.title"
        :href="blog.url"
        :title-lang="titleLanguage(blog.title)"
        :ui="{ layout: 'grid-cols-[40px_minmax(0,1fr)] items-center' }"
      >
        <template #media>
          <AppIconImage
            class="size-10 rounded-lg bg-white object-contain"
            :src="blog.image"
            :size="40"
            @error="hideFailedImage"
          />
        </template>
        <template #subtitle>
          <p class="text-sm text-muted">{{ blogHost }}</p>
        </template>
      </AppCard>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/** プロフィールに続けて、ブログ名とURLを持つ独立したセクションを表示する。 */
import { blog } from '~/data/blog'

const { t, titleLanguage } = useSiteLocale()
/** 公開URLから、カードに短く表示するホスト名を取得する。 */
const blogHost = new URL(blog.url).host
</script>
