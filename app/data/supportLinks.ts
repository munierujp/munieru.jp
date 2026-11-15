/** 支援先の元データを、定義時に型検査する。 */
import type { SupportLink } from '~/types/SupportLink'

/** 日英で共有する支援先一覧。表示文の翻訳は表示側で行う。 */
export const supportLinks: SupportLink[] = [
  {
    key: 'github-sponsors',
    title: 'GitHub Sponsors',
    url: 'https://github.com/sponsors/munierujp',
    image: '/service-icons/github.svg'
  },
  {
    key: 'paypal',
    title: 'PayPal',
    url: 'https://www.paypal.me/munieru',
    image: '/service-icons/paypal.png'
  },
  {
    key: 'wish-list',
    title: 'ほしい物リスト',
    url: 'http://amzn.asia/9qD1BsF',
    image: '/service-icons/amazon.png'
  },
  {
    key: 'giftee',
    title: 'giftee',
    url: 'https://giftee.com/u/munieru_jp',
    image: '/service-icons/giftee.png'
  }
]
