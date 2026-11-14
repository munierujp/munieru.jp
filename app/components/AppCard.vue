<template>
  <article class="app-card relative h-full">
    <!-- 主リンクのあるカードだけ背景と枠を変え、補助リンクのみのカードと区別する。 -->
    <UCard
class="native-card relative h-full"
      :class="href ? 'hover:bg-elevated hover:ring-primary/50 has-[:focus-visible]:bg-elevated has-[:focus-visible]:ring-primary/50' : undefined"
      ><div class="card-layout grid items-start gap-4" :class="layouts[layout]">
        <slot name="media" />
        <div class="card-content min-w-0" :class="layout === 'work' ? 'max-[560px]:col-span-full max-[560px]:row-start-2' : layout === 'talk' ? 'col-start-1 @min-[44rem]:col-start-2' : undefined">
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
        <slot name="action" /></div
    ></UCard>
  </article>
</template>
<script setup lang="ts">
/** 同じ主リンク・補助リンク構造を、ライブラリのカード内へ配置する。 */
withDefaults(defineProps<{
  title: string
  href?: string
  titleLang?: string
  linkLabel?: string
  /** 内容の種類ごとに、画像・本文・補助リンクの配置を選ぶ。 */
  layout?: 'work' | 'book' | 'talk'
}>(), { layout: 'work', href: '', titleLang: '', linkLabel: '' })
/** サイズに応じた配置。クラスを静的に列挙し、Tailwindの生成対象に含める。 */
const layouts = {
  work: 'grid-cols-[66px_minmax(0,1fr)_44px] max-[560px]:grid-cols-[minmax(0,1fr)_44px]',
  book: 'grid-cols-[128px_minmax(0,1fr)] max-[560px]:grid-cols-[96px_minmax(0,1fr)]',
  talk: 'grid-cols-[minmax(0,1fr)_44px] @min-[44rem]:grid-cols-[192px_minmax(0,1fr)_44px]'
}
</script>
