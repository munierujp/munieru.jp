<template>
  <!-- 各サービスへのリンク。名前とアイコンを含む領域全体をタップできる。 -->
  <UContainer as="section" class="links-section py-12">
    <div class="section-top mb-6">
      <div>
        <h2 class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.links') }}</h2>
      </div>
    </div>
    <ul class="social-links flex flex-wrap items-center gap-3" role="list">
      <li v-for="link in links" :key="link.title" class="min-w-0">
        <AppUiButton :href="link.url" target="_blank" rel="noopener">
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
            <span>{{ link.title }}</span>
          </span>
        </AppUiButton>
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 公開アカウントへのリンクを、ローカルのサービスアイコンとともに表示する。
 */
import type { ServiceLink } from '~/types/content'
import { computed } from 'vue'
import linksData from '~~/modules/links.json'

// リンク一覧の表示文を現在の言語に合わせる。URLと画像は日英で共有する。
const { t, localize } = useSiteLocale()
/** 元データの順序を保ち、現在の言語のサービス名を表示する一覧。 */
const links = computed<ServiceLink[]>(() => linksData.map((link) => localize('links', link)))
const asset = usePublicAsset()
</script>
