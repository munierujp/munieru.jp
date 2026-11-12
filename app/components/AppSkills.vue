<template>
  <!-- スキルの一覧。見出しとアイコン付きのスキル名を表示する。 -->
  <section class="about-section">
    <div class="wrap section-stack">
      <div class="section-label">
        <h2>{{ t('ui.headings.skills') }}</h2>
      </div>
      <div class="about-body">
        <ul class="skills" role="list">
          <li v-for="skill in skills" :key="skill.name">
            <img
              :src="asset(skill.image)"
              alt=""
              width="24"
              height="24"
              loading="lazy"
              decoding="async"
              @error="hideFailedImage"
            >
            <span>{{ skill.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 技術名とローカルのアイコンを、リンクではない一覧として表示する。
 * @packageDocumentation
 */
import type { Skill } from '~/types/content'
import { computed } from 'vue'
import skillsData from '~~/modules/skills.json'

// スキル名と画像はmodules/skills.jsonで管理する。スキルはリンクではない。
const { t, localize } = useSiteLocale()
/** 現在の言語の技術名と、日英で共有するアイコンの一覧。 */
const skills = computed<Skill[]>(() => skillsData.map(skill => localize('skills', skill)))
const config = useRuntimeConfig().public.siteConfig
/**
 * public内の画像パスに公開サブディレクトリを付ける。
 * @param path - publicを基準とした画像パス。先頭のスラッシュは省略可能。
 * @returns 現在の配信先で有効な画像URLのパス。
 */
const asset = (path: string) => config.BASE_DIR + path.replace(/^\/+/, '')
</script>
