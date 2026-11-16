<template>
  <div />
</template>

<script setup lang="ts">
/** サイトと共通の表示文・URLを、言語別の共有画像へ渡す。 */
import { defineOgImage } from '#og-image/app'
import ja from '../../../i18n/locales/ja.json' with { type: 'json' }
import en from '../../../i18n/locales/en.json' with { type: 'json' }
import { loadConfig } from '../../../config/site.ts'
import { OGP_WIDTH, OGP_HEIGHT } from '../../../config/ogp.ts'

defineOptions({ name: 'OgpImagePage' })

const isEnglish = useRoute().params['locale'] === 'en'
const { name, title } = isEnglish ? en.site : ja.site

defineOgImage('SiteCard.takumi', {
  name,
  subtitle: title.slice(name.length).trim(),
  displayUrl: loadConfig().BASE_URL,
  // 比較で確認した日英の文字サイズ。英語名も画像との余白を確保する。
  nameSize: isEnglish ? 113 : 128
}, { width: OGP_WIDTH, height: OGP_HEIGHT })
</script>
