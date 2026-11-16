/** ローカルでのみ動かすOGP生成用Nuxt。通常のサイトビルドから分離する。 */
import { fileURLToPath } from 'node:url'
import type { NuxtConfig } from 'nuxt/schema'
import { loadConfig } from '../config/site.ts'

/**
 * 一時ファイルはGit管理・公開対象の外へ置く。
 * @param path - OGP専用キャッシュ内の相対パス。
 * @returns 一時ファイルの絶対パス。
 */
const cachePath = (path: string): string => fileURLToPath(new URL('../.cache/ogp/' + path, import.meta.url))

/** 画像生成にだけ使用する、実ウェイトを指定したローカルのヒラギノ。 */
const fonts: NonNullable<NuxtConfig['fonts']> = {
  provider: 'local',
  families: [
    { name: 'OGP Hiragino', src: '/w3.ttc', weight: 300, style: 'normal', global: true },
    { name: 'OGP Hiragino', src: '/w6.ttc', weight: 600, style: 'normal', global: true },
    { name: 'OGP Hiragino', src: '/w9.ttc', weight: 900, style: 'normal', global: true }
  ]
}

/** 生成中の画像URLのオリジン。公開ページのメタ情報には使用しない。 */
const site: NonNullable<NuxtConfig['site']> = { url: new URL(loadConfig().BASE_URL).origin }

/** 日英2枚のPNGを一時出力し、スクリプトがpublic配下へコピーする。 */
const nitro: NonNullable<NuxtConfig['nitro']> = {
  prerender: { routes: ['/', '/en/'] },
  output: { dir: cachePath('nitro'), publicDir: cachePath('output') }
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-12',
  modules: ['@nuxt/fonts', 'nuxt-og-image'],
  buildDir: cachePath('nuxt'),
  dir: { public: cachePath('public') },
  fonts,
  site,
  nitro
})
