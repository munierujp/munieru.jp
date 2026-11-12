<template>
  <!-- プロフィール本文はここで編集する。画像は public/profile.png で管理する。 -->
  <section class="hero wrap">
    <div class="hero-copy">
      <h1 v-if="isEnglish" lang="en">Munieru<span class="hero-secondary" lang="ja">ムニエル</span></h1>
      <h1 v-else lang="ja">ムニエル<span class="hero-secondary" lang="en">Munieru</span></h1>
      <div class="hero-description">
        <template v-if="isEnglish">
          <p>I'm an otaku and IT engineer based in Edogawa, Tokyo, Japan. Originally from Kawaguchi, Saitama.</p>
          <p>On my days off, you'll usually find me at the cinema or at live shows, concerts, festivals, plays, and musicals.</p>
        </template>
        <template v-else>
          <p>東京都江戸川区在住のオタク兼ITエンジニア。埼玉県川口市出身。</p>
          <p>休日はだいたい映画館で映画を見るか、ライブ、コンサート、フェス、舞台、ミュージカルなどのイベントに行っています。</p>
        </template>
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
 * プロフィール本文と画像を表示する。日英の本文はテンプレートで直接管理する。
 * @packageDocumentation
 */
// プロフィール本文は各言語のtemplateで直接編集する。
const { isEnglish, t } = useSiteLocale()
</script>
