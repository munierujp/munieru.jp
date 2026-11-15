/** 書籍の元データを、定義時に型検査する。 */
import type { Book } from '~/types/Book'

/** 日英で共有する書籍一覧。表示文の翻訳は表示側で行う。 */
export const books = [
  {
    key: 'tech_do_book_vol_1',
    title: 'Tech Do Book Vol.1',
    date: '2019-04-14',
    url: 'https://booth.pm/ja/items/1318348',
    image: '/book-covers/tech-do-book-vol-1.jpg',
    imageWidth: 742,
    imageHeight: 1024,
    format: '技術同人誌',
    chapterTitle: 'Go + Echoでウェブページをフェッチするツールを作る'
  }
] satisfies Book[]
