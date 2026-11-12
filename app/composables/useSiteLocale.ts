import { computed } from 'vue'
import type { LocalizedContent } from '~/types/content'

// 言語判定と翻訳はNuxt I18nを使用する。一覧はURL・日付・画像を共有し、表示文だけを上書きする。
export function useSiteLocale() {
  const { locale, t, tm, rt, d } = useI18n()
  const isEnglish = computed(() => locale.value === 'en')
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
  const titleLanguage = (title: string) => isEnglish.value && /[\u3040-\u30ff\u3400-\u9fff]/u.test(title) ? 'ja' : undefined
  // 元データとdatetime属性はYYYY-MM-DDのままにし、表示だけ現在の言語へ整形する。
  const formatDate = (date: string) => d(date, 'date')
  return { isEnglish, locale, t, localize, titleLanguage, formatDate }
}
