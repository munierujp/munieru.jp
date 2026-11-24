import type { SupportLink } from '~/types/SupportLink'

/** 日英で共有する支援先一覧。言語別の表示文も各項目にまとめる。 */
export const supportLinks: SupportLink[] = [
  {
    key: 'github-sponsors',
    title: 'GitHub Sponsors',
    url: 'https://github.com/sponsors/munierujp',
    image: '/service-icons/github.svg'
  },
  {
    key: 'wish-list',
    title: {
      ja: 'ほしい物リスト',
      en: 'Wish list'
    },
    url: 'https://amzn.asia/9qD1BsF',
    image: '/service-icons/amazon.png'
  },
  {
    key: 'giftee',
    title: 'giftee',
    url: 'https://giftee.com/u/munieru_jp',
    image: '/service-icons/giftee.png'
  }
]
