<template>
  <article class="app-card">
    <UCard class="native-card"
      ><div class="card-layout">
        <slot name="media" />
        <div class="card-content">
          <slot name="metadata" />
          <h3>
            <a
              v-if="href"
              class="card-primary-link"
              :href="href"
              target="_blank"
              rel="noopener"
              :aria-label="linkLabel || undefined"
              :lang="titleLang || undefined"
              >{{ title }}</a
            ><span v-else :lang="titleLang || undefined">{{ title }}</span> <slot name="status" />
          </h3>
          <slot name="subtitle" />
          <p v-if="$slots.default"><slot /></p>
        </div>
        <slot name="action" /></div
    ></UCard>
  </article>
</template>
<script setup lang="ts">
/** 同じ主リンク・補助リンク構造を、ライブラリのカード内へ配置する。 */
defineProps<{ title: string; href?: string; titleLang?: string; linkLabel?: string }>()
</script>
