<template>
  <!-- UPageHeroの縦配置を使い、画像を先頭、名前と自己紹介を中央に表示する。 -->
  <UPageHero
    :as="{ root: 'section', title: 'p' }"
    orientation="vertical"
    :ui="{ container: 'py-12 sm:py-12 lg:py-12' }"
  >
    <template #title>
      <span :lang="locale">{{ t('site.name') }}</span>
      <span
        class="mt-[0.25em] block text-[0.5em] font-medium text-muted"
        :lang="locale === 'en' ? 'ja' : 'en'"
      >{{ t('site.alternateName') }}</span>
    </template>
    <template #description>
      <p>{{ t('profile.summary') }}</p>
      <p class="mt-3">{{ t('profile.activities') }}</p>
    </template>
    <div class="grid place-items-center order-first">
      <!-- 背景や枠を設けず、表示幅に合わせて生成した画像自体を円形で表示する。 -->
      <NuxtPicture
        class="block aspect-square w-[clamp(112px,25vw,260px)] overflow-hidden rounded-full"
        src="/profile.png"
        :img-attrs="{ class: 'block size-full object-cover', fetchpriority: 'high' }"
        sizes="112px 448:25vw sm:25vw md:25vw 1040:260px"
        :alt="t('ui.profileImage')"
        width="512"
        height="512"
        loading="eager"
      />
    </div>
  </UPageHero>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()
</script>
