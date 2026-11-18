/** 書籍の元データを、定義時に型検査する。 */
import type { Book } from '~/types/Book'

/** 日英で共有する書籍一覧。言語別の表示文も各項目にまとめる。 */
export const books: Book[] = [
  {
    key: 'tech_do_book_vol_1',
    title: 'Tech Do Book Vol.1',
    date: '2019-04-14',
    url: 'https://booth.pm/ja/items/1318348',
    image: '/book-covers/tech-do-book-vol-1.jpg',
    imageWidth: 742,
    imageHeight: 1024,
    format: {
      ja: '技術同人誌',
      en: 'Technical zine (Japanese)'
    },
    description: {
      ja: '「Go + Echoでウェブページをフェッチするツールを作る」の章を寄稿',
      en: 'Contributed the chapter “Go + Echoでウェブページをフェッチするツールを作る” (Building a web page fetching tool with Go + Echo).'
    }
  }
]
