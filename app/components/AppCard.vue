<template>
  <!-- 主リンクはタイトルだけに置き、CSSでカード全体へ広げる。補助リンクを入れ子にしない。 -->
  <article class="app-card" :class="{ 'has-primary-link': href }">
    <slot name="media" />
    <div class="card-content">
      <slot name="metadata" />
      <h3>
        <a v-if="href" class="card-primary-link" :href="href" target="_blank" rel="noopener" :aria-label="linkLabel || undefined" :lang="titleLang || undefined">{{ title }}</a>
        <span v-else :lang="titleLang || undefined">{{ title }}</span>
        <slot name="status" />
      </h3>
      <slot name="subtitle" />
      <p v-if="$slots.default"><slot /></p>
    </div>
    <!-- GitHubやスライドなど、主リンクとは独立した操作を配置する。 -->
    <slot name="action" />
  </article>
</template>

<script setup lang="ts">
// 内容や画像の種類は呼び出し側のスロットで指定し、カード共通のリンク構造を管理する。
// hrefを省略すると、公開終了作品のような主リンクのないカードになる。
withDefaults(defineProps<{
  title: string
  href?: string
  titleLang?: string
  linkLabel?: string
}>(), { href: '', titleLang: '', linkLabel: '' })
</script>
