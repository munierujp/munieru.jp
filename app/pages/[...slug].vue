<template>
  <div />
</template>

<script setup lang="ts">
/**
 * 存在しないURLでは画面を表示せず、現在の言語のトップへ移動する。
 * @remarks 静的ホストの転送に加え、クライアント内のページ移動にも対応する。
 * @packageDocumentation
 */
definePageMeta({ layout: false })
const localePath = useLocalePath()
await navigateTo(localePath({ name: 'index' }), { replace: true, redirectCode: 302 })
</script>
