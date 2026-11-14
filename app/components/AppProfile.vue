<template>
  <!-- プロフィール本文は翻訳辞書、画像は public/profile.png で管理する。 -->
  <UContainer as="section" class="hero grid grid-cols-[1.2fr_1fr] items-center gap-12 py-12 max-[560px]:grid-cols-[minmax(0,1fr)_112px] max-[560px]:gap-x-4 max-[560px]:gap-y-6 max-[560px]:pt-6 max-[560px]:pb-8">
    <div class="hero-copy max-[560px]:contents">
      <p v-if="isEnglish" class="hero-name text-[clamp(2.5rem,2rem+3vw,4.5rem)] font-[750] leading-[1.25] max-[560px]:text-[clamp(2rem,1rem+5vw,2.8rem)]" lang="en">{{ t('site.name') }}<span class="hero-secondary mt-[0.25em] block text-[0.5em] font-medium text-muted" lang="ja">{{ t('site.alternateName') }}</span></p>
      <p v-else class="hero-name text-[clamp(2.5rem,2rem+3vw,4.5rem)] font-[750] leading-[1.25] max-[560px]:text-[clamp(2rem,1rem+5vw,2.8rem)]" lang="ja">{{ t('site.name') }}<span class="hero-secondary mt-[0.25em] block text-[0.5em] font-medium text-muted" lang="en">{{ t('site.alternateName') }}</span></p>
      <div class="hero-description mt-6 space-y-3 text-[0.95rem] text-muted max-[560px]:col-span-full max-[560px]:m-0 max-[560px]:text-[0.85rem]">
        <p>{{ t('profile.summary') }}</p>
        <p>{{ t('profile.activities') }}</p>
      </div>
    </div>
    <div class="hero-art grid place-items-center max-[560px]:col-start-2 max-[560px]:row-start-1">
      <figure class="profile-print w-[260px] rounded-[28px] bg-white p-3 max-[560px]:w-28 max-[560px]:p-1.5">
        <div class="photo-frame aspect-square overflow-hidden rounded-2xl">
          <!-- 表示幅と画面密度に合わせたWebPをビルド時に生成する。 -->
          <NuxtImg
class="block size-full object-cover"
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
  </UContainer>
</template>

<script setup lang="ts">
/**
 * 翻訳辞書のプロフィール本文と、ローカルの画像を表示する。
 */
// 主名義・別表記と本文は、表示言語の翻訳辞書から取得する。
const { isEnglish, t } = useSiteLocale()
</script>
