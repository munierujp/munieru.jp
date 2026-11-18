/** 発表資料を主リンク、登壇イベントを補助リンクとして扱う表示データ。 */
export interface Talk {
  /** 項目を識別する安定したキー。表示タイトルを変更しても維持する。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 原題の言語タグ。省略時はページの言語を継承する。 */
  titleLang?: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  /** LTなど、登壇の形式を示す表示名。 */
  format: string
  /** 登壇したイベントの正式名称。 */
  eventTitle: string
  /** イベント原名の言語タグ。省略時はページの言語を継承する。 */
  eventTitleLang?: string
  /** イベント名のテキストリンクから開く開催情報ページ。 */
  eventUrl: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
  /** 表紙の元画像の幅。高さとともにレイアウトの変化を抑える。 */
  imageWidth: number
  /** 表紙の元画像の高さ。幅とともに縦横比を維持する。 */
  imageHeight: number
  /** カード全体の主リンクとして開く発表資料。 */
  url: string
  /** 原題を残したうえで添える、発表タイトルの参考英訳。 */
  englishTitle?: string
  /** 原名の下へ補足するイベント名の参考英訳。 */
  englishEventTitle?: string
}
