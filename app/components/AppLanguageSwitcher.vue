<template>
  <div ref="switcher" class="language-switcher">
    <button
      v-if="ready"
      :id="triggerId"
      ref="trigger"
      class="language-trigger"
      type="button"
      :aria-label="label"
      :title="label"
      aria-haspopup="menu"
      :aria-controls="menuId"
      :aria-expanded="menuOpen ? 'true' : 'false'"
      @click="toggleMenu"
      @keydown="onTriggerKeydown"
    >
      <AppIcon name="languages" />
      <span class="language-label" :lang="locale">{{ currentLanguage.label }}</span>
      <AppIcon name="chevron-down" class="language-chevron" />
    </button>
    <!-- JSが動かない場合も、同じ見た目の通常リンクから別言語版を開ける。 -->
    <a
      v-else
      class="language-trigger"
      :href="languagePath(isEnglish ? 'ja' : 'en')"
      :hreflang="isEnglish ? 'ja' : 'en'"
      :aria-label="isEnglish ? 'Switch to Japanese' : '英語版を表示'"
      :title="label"
    >
      <AppIcon name="languages" />
      <span class="language-label" :lang="locale">{{ currentLanguage.label }}</span>
    </a>
    <div
      :id="menuId"
      class="dropdown-menu language-menu"
      role="menu"
      :aria-label="t('ui.languageGroup')"
      :hidden="!menuOpen"
      @keydown="onMenuKeydown"
    >
      <div role="group" :aria-label="t('ui.languageGroup')">
        <a
          v-for="language in languages"
          :key="language.value"
          ref="items"
          class="dropdown-option language-option"
          :href="languagePath(language.value)"
          :hreflang="language.value"
          :lang="language.value"
          role="menuitemradio"
          :aria-checked="locale === language.value ? 'true' : 'false'"
          :aria-current="locale === language.value ? 'page' : undefined"
          :data-language-value="language.value"
          tabindex="-1"
          @click="selectLanguage($event, language.value)"
        >{{ language.label }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 言語選択をCookieへ保存し、選択した言語の公開URLへ移動する。
 * @packageDocumentation
 */
import { computed, onMounted, ref } from 'vue'

const { isEnglish, locale, t } = useSiteLocale()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const router = useRouter()
// 通常のa要素でも、Routerの公開パス（サブディレクトリを含む）をhrefに使う。
/** Nuxt I18nの設定から導出する対応言語コード。 */
type Locale = ReturnType<typeof useI18n>['locale']['value']
// 対応するルートがない404ページでは、選んだ言語のトップへ移動する。
/**
 * 選択言語の公開URLを求める。対応するページがなければその言語のトップを使う。
 * @param language - 移動先の言語コード。
 * @returns サブディレクトリも含むRouter解決済みのhref。
 */
const languagePath = (language: Locale) => router.resolve(switchLocalePath(language) || localePath({ name: 'index' }, language)).href
const { menuOpen, switcher, trigger, items, triggerId, menuId, closeMenu, toggleMenu, onTriggerKeydown, onMenuKeydown } = useDropdownMenu()
// 言語名・対応言語はnuxt.config.tsのlocalesを共通の定義として使う。
const { locales, setLocaleCookie } = useI18n()
/** Nuxt I18nの対応言語をメニュー表示用の値とラベルへ変換した一覧。 */
const languages = computed(() => locales.value.map(language => ({ value: language.code, label: language.name || language.code })))
/** 現在の言語に対応するメニュー項目。不明な言語名はコードで表示する。 */
const currentLanguage = computed(() => languages.value.find(language => language.value === locale.value) ??
  { value: locale.value, label: locale.value })
const label = computed(() => t('ui.language', { language: currentLanguage.value.label }))
/** クライアントでメニュー操作が可能になったかどうか。 */
const ready = ref(false)
/**
 * 移動前に言語の選択を保存し、選択中の言語なら再読込せずメニューを閉じる。
 * @param event - 言語リンクのクリックイベント。
 * @param value - 保存する言語コード。
 */
function selectLanguage (event: MouseEvent, value: Locale) {
  // 通常のリンク移動より先に保存し、英語ブラウザから日本語を選んでも自動転送で戻されないようにする。
  setLocaleCookie(value)
  // 選択中の言語は再読込せずに閉じる。別言語へは通常のリンクとして移動する。
  if (value === locale.value) {
    event.preventDefault()
    closeMenu(true)
  } else closeMenu()
}
onMounted(() => { ready.value = true })
</script>
