<template>
  <!-- UPageHeroで名前・自己紹介・画像を配置する。小さい画面では名前と画像を同じ行に置く。 -->
  <UPageHero
    :as="{ root: 'section', title: 'p' }"
    orientation="horizontal"
    :ui="{
      container: 'grid grid-cols-[1.2fr_1fr] items-center gap-12 py-12 sm:py-12 lg:py-12 lg:grid-cols-[1.2fr_1fr] max-[560px]:grid-cols-[minmax(0,1fr)_112px] max-[560px]:gap-x-4 max-[560px]:gap-y-6 max-[560px]:pt-6 max-[560px]:pb-8',
      wrapper: 'max-[560px]:contents',
      header: 'max-[560px]:contents',
      title: 'text-4xl sm:text-5xl max-[560px]:text-[clamp(2rem,1rem+5vw,2.8rem)]',
      description: 'space-y-3 text-[0.95rem] sm:text-[0.95rem] sm:leading-[1.8] max-[560px]:col-span-full max-[560px]:mt-0 max-[560px]:text-[0.85rem]'
    }"
  >
    <template #title>
      <span :lang="locale">{{ t('site.name') }}</span>
      <span class="mt-[0.25em] block text-[0.5em] font-medium text-muted" :lang="isEnglish ? 'ja' : 'en'">{{ t('site.alternateName') }}</span>
    </template>
    <template #description>
      <p>{{ t('profile.summary') }}</p>
      <p>{{ t('profile.activities') }}</p>
    </template>
    <div class="hero-art grid place-items-center max-[560px]:col-start-2 max-[560px]:row-start-1">
      <!-- 背景や枠を設けず、表示幅に合わせたAVIF・WebPの画像自体を角丸で表示する。 -->
      <NuxtPicture
        class="profile-image block aspect-square w-[260px] overflow-hidden rounded-[28px] max-[560px]:w-28 max-[560px]:rounded-[20px]"
        src="/profile.png"
        format="avif"
        legacy-format="webp"
        :img-attrs="{ class: 'block size-full object-cover', fetchpriority: 'high' }"
        sizes="112px tablet:260px"
        densities="1x 2x"
        :alt="t('ui.profileImage')"
        width="512"
        height="512"
        loading="eager"
      />
    </div>
  </UPageHero>
</template>

<script setup lang="ts">
/** 名前・自己紹介を標準スロットへ渡し、画像の最適化はNuxtPictureへ任せる。 */
const { isEnglish, locale, t } = useSiteLocale()
</script>
