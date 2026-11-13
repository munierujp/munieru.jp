<template>
  <!-- プロフィール本文は翻訳辞書、画像は public/profile.png で管理する。 -->
  <section class="hero wrap">
    <div class="hero-copy">
      <p v-if="isEnglish" class="hero-name" lang="en">{{ t('site.name') }}<span class="hero-secondary" lang="ja">{{ t('site.alternateName') }}</span></p>
      <p v-else class="hero-name" lang="ja">{{ t('site.name') }}<span class="hero-secondary" lang="en">{{ t('site.alternateName') }}</span></p>
      <div class="hero-description">
        <p>{{ t('profile.summary') }}</p>
        <p>{{ t('profile.activities') }}</p>
      </div>
    </div>
    <div class="hero-art">
      <figure class="profile-print">
        <div class="photo-frame">
          <!-- 表示幅と画面密度に合わせたWebPをビルド時に生成する。 -->
          <NuxtImg
            src="/profile.png"
            format="webp"
            sizes="186px tablet:196px desktop:236px"
            densities="1x 2x"
            :alt="t('ui.profileImage')"
            width="512"
            height="512"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 翻訳辞書のプロフィール本文と、ローカルの画像を表示する。
 */
// 主名義・別表記と本文は、表示言語の翻訳辞書から取得する。
const { isEnglish, t } = useSiteLocale()
</script>
