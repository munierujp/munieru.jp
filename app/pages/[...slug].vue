<script setup lang="ts">
// 未知のURLも日英のルートとして解決し、言語切り替え後は同じパスの404画面を表示する。
// 繰り返しパラメータに末尾のスラッシュを含めず、言語切り替え時の二重化を防ぐ。
definePageMeta({ path: '/:slug+' })
throw createError({ status: 404, statusText: 'Page Not Found', fatal: true })
</script>
