/**
 * Nuxt I18nによる表示文・日付・原題の言語指定を共通化する。
 * @packageDocumentation
 */
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { LocalizedContent } from '~/types/content'

/** Nuxt I18nが提供する翻訳関数・言語状態の型。 */
type SiteI18n = ReturnType<typeof useI18n>

/** 表示言語の状態と、コンテンツ翻訳・日付表示の共通処理。 */
export interface SiteLocale {
  isEnglish: ComputedRef<boolean>
  locale: SiteI18n['locale']
  t: SiteI18n['t']
  localize: <K extends keyof LocalizedContent>(group: K, entry: LocalizedContent[K]) => LocalizedContent[K]
  titleLanguage: (title: string) => 'ja' | undefined
  formatDate: (date: string) => string
}

/**
 * 現在の言語に対応する表示用ヘルパーを取得する。
 * @returns 言語状態、翻訳関数、一覧の翻訳、日付整形、原題の言語判定。
 * @remarks URL・日付・画像を共通データに残し、翻訳辞書にある表示文だけを上書きする。
 */
export function useSiteLocale (): SiteLocale {
  const { locale, t, tm, rt, d } = useI18n()
  /** 英語の補足文・表示名を使用するかどうか。言語切り替えに追従する。 */
  const isEnglish = computed(() => locale.value === 'en')
  /**
   * 一覧の項目を、安定したキーに対応する英語の表示文で補う。
   * @param group - 翻訳対象の一覧名。
   * @param entry - JSONから読み込んだ元の項目。
   * @returns 日本語表示または翻訳がない場合は元の項目。それ以外は翻訳を重ねた項目。
   */
  const localize = <K extends keyof LocalizedContent>(group: K, entry: LocalizedContent[K]): LocalizedContent[K] => {
    if (!isEnglish.value) return entry
    const key = 'key' in entry ? entry.key : 'title' in entry ? entry.title : entry.name
    // tmはコンパイル済みメッセージを返す。各グループは項目キー→表示文の辞書として管理する。
    type Message = Parameters<typeof rt>[0]
    const translated = (tm(group) as Record<string, Record<string, Message>>)[key]
    return translated
      ? { ...entry, ...Object.fromEntries(Object.entries(translated).map(([key, message]) => [key, rt(message)])) }
      : entry
  }
  /**
   * 英語ページに日本語の原題を残す場合のlang属性を決める。
   * @param title - 表示する原題。
   * @returns 日本語文字がある英語ページではja、それ以外は親要素の言語を継承するundefined。
   */
  const titleLanguage = (title: string): 'ja' | undefined => isEnglish.value && /[\u3040-\u30ff\u3400-\u9fff]/u.test(title) ? 'ja' : undefined
  /**
   * ISO日付を現在の言語の表示形式へ整形する。
   * @param date - 元データに保存されたYYYY-MM-DD形式の日付。
   * @returns Nuxt I18nのdate書式に従う日付文字列。datetime属性の元データは変更しない。
   */
  const formatDate = (date: string): string => d(date, 'date')
  return { isEnglish, locale, t, localize, titleLanguage, formatDate }
}
