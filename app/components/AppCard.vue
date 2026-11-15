<template>
  <article class="relative h-full">
    <!-- カード全体の主リンクとフォーカス表示はNuxt UIへ任せる。 -->
    <UPageCard
      class="h-full"
      :title="title"
      :to="href || undefined"
      target="_blank"
      rel="noopener"
      :aria-label="href ? (linkLabel || title) : undefined"
      :ui="{ wrapper: 'items-stretch', body: 'w-full' }"
    >
      <template #body>
        <div class="grid items-start gap-4" :class="ui.layout">
          <slot name="media" />
          <div class="min-w-0" :class="ui.content">
            <slot name="metadata" />
            <h3 class="mt-1 mb-2 text-[1.05rem] font-[650] leading-normal">
              <span :lang="titleLang || undefined">{{ title }}</span> <slot name="status" />
            </h3>
            <slot name="subtitle" />
            <p v-if="$slots.default" class="text-[0.85rem] text-muted">
              <slot />
            </p>
          </div>
          <!-- 補助リンクは主リンクの兄弟として配置し、重なったリンクより手前で操作できるようにする。 -->
          <slot name="action" />
        </div>
      </template>
    </UPageCard>
  </article>
</template>
<script setup lang="ts">
/**
 * カード全体を操作できる主リンクと、独立した補助リンクを持つ共通カード。
 * @remarks 全体リンクはUPageCardに任せ、画像・分類・状態・補助リンクは名前付きスロットで受け取る。
 * @remarks hrefが空の公開終了作品は主リンクを作らず、見出しのh3と言語属性は維持する。
 */
import type { AppCardUi } from '~/types/AppCardUi'

/** 共通カードの主リンク・見出し・配置に必要な入力。 */
interface Props {
  /** カードや一覧に表示する名称。 */
  title: string
  /** 外部の主リンク。省略時はカード全体をリンクにしない。 */
  href?: string
  /** 見出しがページ本文と異なる言語の場合のlang属性。 */
  titleLang?: string
  /** タイトルだけでは用途が伝わらない場合の読み上げ名。 */
  linkLabel?: string
  /** 用途を決めず、呼び出し側が内容に応じて指定する配置クラス。 */
  ui?: AppCardUi
}

withDefaults(defineProps<Props>(), { href: '', titleLang: '', linkLabel: '', ui: () => ({}) })
</script>
