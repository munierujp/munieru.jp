/**
 * JSONの元データと、翻訳後の表示データで共有するコンテンツの型を定義する。
 */
/** サービス名・公開URL・ローカルのアイコンをまとめたリンク情報。 */
export interface ServiceLink {
  /** カードや一覧に表示する名称。 */
  title: string
  /** 項目の公開先ページのURL。 */
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}

/** 表示名・支援URL・サービスアイコンをまとめた支援先。 */
export interface SupportLink extends ServiceLink {
  /** 翻訳に対応付ける安定した識別子。 */
  key: string
}

/** リンクを持たない技術名と、ローカルに保存した装飾アイコン。 */
export interface Skill {
  /** 表示する名前。 */
  name: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}

/** 作品の分類。ライブラリとCLIは独立した種類として扱う。 */
export type WorkCategory = 'web' | 'extension' | 'library' | 'cli'

/** 作品の公開先・ソースコード・分類と、公開／開発の終了状態。 */
export interface Work {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 表示言語に対応する説明文。 */
  description: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  /** 項目の公開先ページのURL。 */
  url: string
  /** ソースコードを公開するGitHubリポジトリのURL。 */
  github: string
  /** 分類表示に使う作品の種類。 */
  category: WorkCategory
  /** public配下のローカル画像パス。未指定時は分類アイコンを使う。 */
  image?: string
  /** 公開終了時は主リンクを出さず、GitHubへの補助リンクを残す。 */
  publicationEnded?: boolean
}

/** 寄稿書籍の販売先・表紙・原題と、英語ページ向けの補足情報。 */
export interface Book {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  /** 項目の公開先ページのURL。 */
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
  /** 書籍・発表の形式を示す表示名。 */
  format: string
  /** 寄稿した章の原題。 */
  chapterTitle?: string
  /** 表示言語に対応する説明文。 */
  description?: string
  /** 英語版で章名に添える寄稿内容の説明。 */
  contributionLabel?: string
  /** 日本語の章名を置き換えず、英語ページで補足する参考訳。 */
  englishChapterTitle?: string
}

/** 登壇イベントと発表資料を別々のリンクとして扱う表示データ。 */
export interface Talk {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  /** 書籍・発表の形式を示す表示名。 */
  format: string
  /** 登壇したイベントの正式名称。 */
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
  /** 原名の下へ補足するイベント名の参考英訳。 */
  englishEventTitle?: string
}

/** 翻訳辞書のグループ名と、上書き対象となる項目の型の対応表。 */
export interface LocalizedContent {
  /** 活動への支援先と、その言語別の表示名。 */
  support: SupportLink
  /** スキル名とアイコンの情報。 */
  skills: Skill
  /** 作品と公開状態の情報。 */
  works: Work
  /** 書籍・寄稿内容の情報。 */
  books: Book
  /** 登壇イベントと発表資料の情報。 */
  talks: Talk
}
