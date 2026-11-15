/** 作品の分類。ライブラリとCLIは独立した種類として扱う。 */
export type WorkCategory = 'web' | 'extension' | 'library' | 'cli'

/** 作品の公開先・ソースコード・分類と、公開終了の状態。 */
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
