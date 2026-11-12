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
import type { Skill } from '~/types/content'
import { computed } from 'vue'
import skillsData from '~~/modules/skills.json'

// スキル名と画像はmodules/skills.jsonで管理する。スキルはリンクではない。
const { t, localize } = useSiteLocale()
const skills = computed<Skill[]>(() => skillsData.map(skill => localize('skills', skill)))
const config = useRuntimeConfig().public.siteConfig
const asset = (path: string) => config.BASE_DIR + path.replace(/^\/+/, '')
</script>
