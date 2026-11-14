<template>
  <!-- スキルの一覧。見出しとアイコン付きのスキル名を表示する。 -->
  <section class="about-section py-12">
    <UContainer class="section-stack">
      <div class="section-label mb-6">
        <h2 class="border-s-4 border-primary ps-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-[650] leading-[1.4]">{{ t('ui.headings.skills') }}</h2>
      </div>
      <div class="about-body">
        <ul class="skills flex flex-wrap items-center gap-3" role="list">
          <li v-for="skill in skills" :key="skill.name" class="min-w-0">
            <UBadge class="ui-badge"
              ><img
class="size-6 object-contain"
                :src="asset(skill.image)"
                alt=""
                width="24"
                height="24"
                loading="lazy"
                decoding="async"
                @error="hideFailedImage"
              >
              <span>{{ skill.name }}</span></UBadge
            >
          </li>
        </ul>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * 技術名とローカルのアイコンを、リンクではない一覧として表示する。
 */
import type { Skill } from '~/types/content'
import { computed } from 'vue'
import skillsData from '~~/modules/skills.json'

// スキル名と画像はmodules/skills.jsonで管理する。スキルはリンクではない。
const { t, localize } = useSiteLocale()
/** 現在の言語の技術名と、日英で共有するアイコンの一覧。 */
const skills = computed<Skill[]>(() => skillsData.map((skill) => localize('skills', skill)))
const asset = usePublicAsset()
</script>
