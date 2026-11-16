<script setup lang="ts">
/** 単色背景に、実ウェイトの文字と円形プロフィール画像を配置する。 */
defineProps<{ name: string, subtitle: string, displayUrl: string, nameSize: number }>()
</script>

<template>
  <div style="display: flex; position: relative; width: 1200px; height: 630px; background-color: #9CC9DA; color: #242824; font-family: 'OGP Hiragino';">
    <div :style="{ fontSize: nameSize + 'px' }" style="display: flex; position: absolute; left: 64px; top: 176px; font-weight: 900; line-height: 1; letter-spacing: -2px; white-space: nowrap;">{{ name }}</div>
    <div style="display: flex; position: absolute; left: 64px; top: 328px; font-size: 64px; font-weight: 600; line-height: 1; letter-spacing: -1px; white-space: nowrap;">{{ subtitle }}</div>
    <div style="display: flex; position: absolute; left: 64px; top: 414px; font-size: 44px; font-weight: 300; line-height: 1; white-space: nowrap;">{{ displayUrl }}</div>
    <img src="/profile.png" width="448" height="448" alt="" style="position: absolute; left: 688px; top: 91px; width: 448px; height: 448px; border-radius: 224px; object-fit: cover;">
  </div>
</template>
