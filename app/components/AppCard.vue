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
/**
 * 主リンクをカード全体へ広げ、補助リンクを独立した操作として扱う共通コンポーネント。
 */
// 内容や画像の種類は呼び出し側のスロットで指定し、カード共通のリンク構造を管理する。
// hrefを省略すると、公開終了作品のような主リンクのないカードになる。
withDefaults(defineProps<{
  title: string
  /** 外部の主リンク。省略時はカード全体をリンクにしない。 */
  href?: string
  /** 見出しがページ本文と異なる言語の場合に指定するlang属性。 */
  titleLang?: string
  /** タイトルだけでは用途が伝わらない場合の読み上げ名。 */
  linkLabel?: string
}>(), { href: '', titleLang: '', linkLabel: '' })
</script>
