/**
 * Nuxt I18nによる表示文・日付・原題の言語指定を共通化する。
 */
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/** Nuxt I18nが提供する翻訳関数・言語状態の型。 */
type SiteI18n = ReturnType<typeof useI18n>

/** 表示言語の状態と、UI翻訳・日付表示の共通処理。 */
export interface SiteLocale {
  /** 英語ページの補足文や表示を使うかどうか。 */
  isEnglish: ComputedRef<boolean>
  /** Nuxt I18nが管理する現在の表示言語。 */
  locale: SiteI18n['locale']
  /** 現在の言語のメッセージを取得する翻訳関数。 */
  t: SiteI18n['t']
  /** 原題の読み上げに必要なlang属性を判定する。 */
  titleLanguage: (title: string) => 'ja' | undefined
  /** 現在の表示言語と名前付き書式で日付を整形する標準関数。 */
  d: SiteI18n['d']
}

/**
 * 現在の言語に対応する表示用ヘルパーを取得する。
 * @returns 言語状態、翻訳関数、日付整形、原題の言語判定。
 */
export function useSiteLocale (): SiteLocale {
  const { locale, t, d } = useI18n()
  /** 英語の補足文・表示名を使用するかどうか。言語切り替えに追従する。 */
  const isEnglish = computed(() => locale.value === 'en')
  /**
   * 英語ページに日本語の原題を残す場合のlang属性を決める。
   * @param title - 表示する原題。
   * @returns 日本語文字がある英語ページではja、それ以外は親要素の言語を継承するundefined。
   */
  const titleLanguage = (title: string): 'ja' | undefined => isEnglish.value && /[\u3040-\u30ff\u3400-\u9fff]/u.test(title) ? 'ja' : undefined
  return { isEnglish, locale, t, titleLanguage, d }
}
