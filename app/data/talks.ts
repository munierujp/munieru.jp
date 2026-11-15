/** 登壇の元データを、定義時に型検査する。 */
import type { Talk } from '~/types/Talk'

/** 日英で共有する登壇一覧。表示文の翻訳は表示側で行う。 */
export const talks: Talk[] = [
  {
    key: 'nuxt-3-with-element-plus',
    title: 'Nuxt 3でElement Plusを使ってみた',
    date: '2023-05-18',
    format: 'LT',
    eventTitle: 'Vue.js v-tokyo Meetup #17',
    image: '/talk-covers/nuxt-3-with-element-plus.jpg',
    imageWidth: 1500,
    imageHeight: 844,
    eventUrl: 'https://vuejs-meetup.connpass.com/event/279254/',
    url: 'https://speakerdeck.com/munieru_jp/nuxt-3-with-element-plus'
  },
  {
    key: 'air-conditioner-2018-08-29',
    title: 'エアコン本体とリモコンの温度設定にズレが生じる問題〜プログラムによる再現〜',
    date: '2018-08-29',
    format: 'LT',
    eventTitle: '夏休みの宿題はだいじょうぶ？！Qiita/Qiitadon ファンミーティング #4',
    image: '/talk-covers/air-conditioner-2018-08-29.jpg',
    imageWidth: 1024,
    imageHeight: 576,
    eventUrl: 'https://increments.connpass.com/event/98534/',
    url: 'https://speakerdeck.com/munieru_jp/2018-08-29'
  }
]
