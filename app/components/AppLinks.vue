<template>
  <!-- 各サービスへのリンク。名前とアイコンを含む領域全体をタップできる。 -->
  <section class="links-section wrap">
    <div class="section-top">
      <div>
        <h2>{{ t('ui.headings.links') }}</h2>
      </div>
    </div>
    <ul class="social-links" role="list">
      <li v-for="link in links" :key="link.title">
        <a :href="link.url" target="_blank" rel="noopener">
          <span class="social-name">
            <span class="social-icon" aria-hidden="true">
              <img
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
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/**
 * 公開アカウントへのリンクを、ローカルのサービスアイコンとともに表示する。
 * @packageDocumentation
 */
import type { ServiceLink } from '~/types/content'
import { computed } from 'vue'
import linksData from '~~/modules/links.json'

// リンク一覧の表示文を現在の言語に合わせる。URLと画像は日英で共有する。
const { t, localize } = useSiteLocale()
/** 元データの順序を保ち、現在の言語のサービス名を表示する一覧。 */
const links = computed<ServiceLink[]>(() => linksData.map(link => localize('links', link)))
const config = useRuntimeConfig().public.siteConfig
/**
 * public内の画像パスに公開サブディレクトリを付ける。
 * @param path - publicを基準とした画像パス。先頭のスラッシュは省略可能。
 * @returns 現在の配信先で有効な画像URLのパス。
 */
const asset = (path: string) => config.BASE_DIR + path.replace(/^\/+/, '')
</script>
