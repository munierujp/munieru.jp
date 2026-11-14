<template>
  <!-- 各サービスへのリンク。名前とアイコンを含む領域全体をタップできる。 -->
  <UPageSection class="links-section" :title="t('ui.headings.links')">
    <template #body>
      <ul class="social-links flex flex-wrap items-center gap-3" role="list">
        <li v-for="link in links" :key="link.title" class="min-w-0">
          <UButton class="ui-button" :to="link.url" external target="_blank" rel="noopener">
            <span class="social-name inline-flex items-center gap-2">
              <span class="social-icon inline-flex shrink-0 items-center gap-2" aria-hidden="true">
                <img
                  class="size-6 object-contain rounded-lg bg-white"
                  :src="asset(link.image)"
                  alt=""
                  width="20"
                  height="20"
                  loading="lazy"
                  @error="hideFailedImage"
                >
              </span>
              <span :lang="titleLanguage(link.title)">{{ link.title }}</span>
            </span>
          </UButton>
        </li>
      </ul>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * 公開アカウントへのリンクを、ローカルのサービスアイコンとともに表示する。
 */
import type { ServiceLink } from '~/types/content'
import linksData from '~~/modules/links.json'

// サービス名・URL・画像・並び順は日英で共有し、原表記を維持する。
const { t, titleLanguage } = useSiteLocale()
/** 表示言語にかかわらず、元データのサービス名を表示する一覧。 */
const links: ServiceLink[] = linksData
const asset = usePublicAsset()
</script>
