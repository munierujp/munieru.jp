<template>
  <article class="app-card relative h-full">
    <!-- カード全体の主リンクとフォーカス表示はNuxt UIへ任せる。 -->
    <UPageCard
      class="native-card h-full"
      :title="title"
      :to="href || undefined"
      target="_blank"
      rel="noopener"
      :aria-label="href ? (linkLabel || title) : undefined"
      :ui="{ wrapper: 'items-stretch', body: 'w-full' }"
      :class="href ? 'hover:bg-elevated hover:ring-primary/50 has-[:focus-visible]:bg-elevated has-[:focus-visible]:ring-primary/50' : undefined"
    >
      <template #body>
        <div class="card-layout grid items-start gap-4" :class="ui.layout">
          <slot name="media" />
          <div class="card-content min-w-0" :class="ui.content">
            <slot name="metadata" />
            <h3 class="mt-1 mb-2 text-[1.05rem] font-[650] leading-normal">
              <span :lang="titleLang || undefined">{{ title }}</span> <slot name="status" />
            </h3>
            <slot name="subtitle" />
            <p v-if="$slots.default" class="text-[0.85rem] text-muted"><slot /></p>
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
withDefaults(defineProps<{
  /** カードや一覧に表示する名称。 */
  title: string
  /** 外部の主リンク。省略時はカード全体をリンクにしない。 */
  href?: string
  /** 見出しがページ本文と異なる言語の場合のlang属性。 */
  titleLang?: string
  /** タイトルだけでは用途が伝わらない場合の読み上げ名。 */
  linkLabel?: string
  /** 用途を決めず、呼び出し側が内容に応じて指定する配置クラス。 */
  ui?: {
    /** 画像・本文・補助リンクを並べるグリッドのクラス。 */
    layout?: string
    /** 本文の配置を補足するクラス。 */
    content?: string
  }
}>(), { href: '', titleLang: '', linkLabel: '', ui: () => ({}) })
</script>
