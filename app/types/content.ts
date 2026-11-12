/**
 * JSONの元データと、翻訳後の表示データで共有するコンテンツの型を定義する。
 * @packageDocumentation
 */
/** 公開アカウントへのリンク。サービス名だけを言語別に変更できる。 */
export interface ServiceLink {
  title: string
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}

/** リンクを持たない技術名と、ローカルに保存した装飾アイコン。 */
export interface Skill {
  name: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}

/** 作品の分類。ライブラリとCLIは独立した種類として扱う。 */
export type WorkCategory = 'web' | 'extension' | 'library' | 'cli'
/** 絞り込みの選択値。allは分類によらない全件表示。 */
export type WorkFilter = 'all' | WorkCategory

/** 作品の公開先・ソースコード・分類と、公開／開発の終了状態。 */
export interface Work {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  title: string
  description: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  url: string
  github: string
  category: WorkCategory
  image?: string
  /** 公開終了時は主リンクを出さず、GitHubへの補助リンクを残す。 */
  publicationEnded?: boolean
  /** 開発終了のラベルを表示する。公開終了とは独立して扱う。 */
  developmentEnded?: boolean
}

/** 寄稿書籍の販売先・表紙・原題と、英語ページ向けの補足情報。 */
export interface Book {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  title: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
  format: string
  chapterTitle?: string
  description?: string
  contributionLabel?: string
  /** 日本語の章名を置き換えず、英語ページで補足する参考訳。 */
  englishChapterTitle?: string
}

/** 登壇イベントと発表資料を別々のリンクとして扱う表示データ。 */
export interface Talk {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  title: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  format: string
  eventTitle: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
  /** 表紙の元画像の幅。高さとともにレイアウトの変化を抑える。 */
  imageWidth: number
  /** 表紙の元画像の高さ。幅とともに縦横比を維持する。 */
  imageHeight: number
  /** カード全体の主リンクとなるイベントページ。 */
  eventUrl: string
  /** 独立したアイコンリンクとして開く発表資料。 */
  slidesUrl: string
  /** 原題を残したうえで添える、発表タイトルの参考英訳。 */
  englishTitle?: string
  englishEventTitle?: string
}

/** 翻訳辞書のグループ名と、上書き対象となる項目の型の対応表。 */
export interface LocalizedContent {
  links: ServiceLink
  skills: Skill
  works: Work
  books: Book
  talks: Talk
}
