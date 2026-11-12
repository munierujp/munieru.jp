export default defineI18nConfig(() => ({
  // 日付だけのデータを端末のタイムゾーンで前日にずらさず、SSRと同じ形式で表示する。
  datetimeFormats: {
    ja: {
      date: { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
    },
    en: {
      date: { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
    }
  }
}))
