/** サービスリンクの元データを、定義時に型検査する。 */
import type { ServiceLink } from '~/types/ServiceLink'

/** 日英で共有するサービスリンク一覧。サービス名は原表記を維持する。 */
export const serviceLinks: ServiceLink[] = [
  {
    title: 'X',
    url: 'https://x.com/munieru_jp',
    image: '/service-icons/x.png'
  },
  {
    title: 'Twilog',
    url: 'https://twilog.togetter.com/munieru_jp',
    image: '/service-icons/twilog.jpg'
  },
  {
    title: 'Mastodon',
    url: 'https://mstdn.jp/@munieru_jp',
    image: '/service-icons/mastodon.png'
  },
  {
    title: 'Bluesky',
    url: 'https://bsky.app/profile/munieru.jp',
    image: '/service-icons/bluesky.png'
  },
  {
    title: 'mixi2',
    url: 'https://mixi.social/@munieru',
    image: '/service-icons/mixi2.png'
  },
  {
    title: 'はてなブックマーク',
    url: 'https://b.hatena.ne.jp/munieru_jp/',
    image: '/service-icons/hatena-bookmark.png'
  },
  {
    title: 'note',
    url: 'https://note.com/munieru_jp/',
    image: '/service-icons/note.png'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/munierujp',
    image: '/service-icons/github.svg'
  },
  {
    title: 'Qiita',
    url: 'https://qiita.com/munieru_jp',
    image: '/service-icons/qiita.png'
  },
  {
    title: 'Zenn',
    url: 'https://zenn.dev/munieru_jp',
    image: '/service-icons/zenn.png'
  },
  {
    title: 'Dev',
    url: 'https://dev.to/munieru_jp',
    image: '/service-icons/dev.png'
  },
  {
    title: 'Speaker Deck',
    url: 'https://speakerdeck.com/munieru_jp',
    image: '/service-icons/speaker-deck.png'
  },
  {
    title: 'ブクログ',
    url: 'https://booklog.jp/users/munierujp',
    image: '/service-icons/booklog.png'
  },
  {
    title: '映画.com',
    url: 'https://eiga.com/user/861618/',
    image: '/service-icons/eiga.png'
  },
  {
    title: 'シネファボ',
    url: 'https://cinefav.com/user_page/86',
    image: '/service-icons/cinefav.png'
  },
  {
    title: '食べログ',
    url: 'https://tabelog.com/rvwr/munieru/',
    image: '/service-icons/tabelog.png'
  },
  {
    title: 'ボドゲーマ',
    url: 'https://bodoge.hoobby.net/friends/111403',
    image: '/service-icons/bodogema.png'
  },
  {
    title: 'pixiv',
    url: 'https://pixiv.me/munieru_jp',
    image: '/service-icons/pixiv.png'
  },
  {
    title: 'Wikipedia',
    url: 'https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Munieru',
    image: '/service-icons/wikipedia.png'
  }
]
