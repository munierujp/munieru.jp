<template>
  <article class="app-card relative h-full">
    <!-- 主リンクのあるカードだけ背景と枠を変え、補助リンクのみのカードと区別する。 -->
    <UCard
class="native-card relative h-full"
      :class="href ? 'hover:bg-elevated hover:ring-primary/50 has-[:focus-visible]:bg-elevated has-[:focus-visible]:ring-primary/50' : undefined"
      ><div class="card-layout grid items-start gap-4" :class="ui.layout">
        <slot name="media" />
        <div class="card-content min-w-0" :class="ui.content">
          <slot name="metadata" />
          <h3 class="mt-1 mb-2 text-[1.05rem] font-[650] leading-normal">
            <a
              v-if="href"
              class="card-primary-link after:absolute after:inset-0 after:rounded-[20px] after:content-[''] focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-primary"
              :href="href"
              target="_blank"
              rel="noopener"
              :aria-label="linkLabel || undefined"
              :lang="titleLang || undefined"
              >{{ title }}</a
            ><span v-else :lang="titleLang || undefined">{{ title }}</span> <slot name="status" />
          </h3>
          <slot name="subtitle" />
          <p v-if="$slots.default" class="text-[0.85rem] text-muted"><slot /></p>
        </div>
        <!-- GitHub・資料などの補助リンクは、主リンクの入れ子にせず独立させる。 -->
        <slot name="action" /></div
    ></UCard>
  </article>
</template>
<script setup lang="ts">
/**
 * カード全体を操作できる主リンクと、独立した補助リンクを持つ共通カード。
 * @remarks 画像・分類・状態は名前付きスロットで受け取り、hrefが空なら主リンクを作らない。
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
