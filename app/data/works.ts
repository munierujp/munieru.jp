/** 作品の元データを、定義時に型検査する。 */
import type { Work } from '~/types/Work'

/** 日英で共有する作品一覧。言語別の表示文も各項目にまとめる。 */
export const works: Work[] = [
  {
    key: 'direct_helper',
    publicationEnded: true,
    title: 'direct helper',
    description: {
      ja: 'ビジネスチャットツールdirectに便利な機能を追加するChrome拡張機能',
      en: 'A Chrome extension that adds useful features to the business chat tool direct.'
    },
    date: '2018-04-07',
    url: 'https://chrome.google.com/webstore/detail/direct-helper/fhbllgfoempopcijliicheinpdbohdic',
    github: 'https://github.com/munierujp/direct_helper',
    category: 'extension',
    image: '/work-icons/direct_helper.png'
  },
  {
    key: 'gasunit',
    title: 'GASUnit',
    description: {
      ja: 'Google Apps Script用のテストライブラリ',
      en: 'A testing library for Google Apps Script.'
    },
    date: '2018-08-23',
    url: 'https://github.com/gasunit/GASUnit',
    github: 'https://github.com/gasunit/GASUnit',
    category: 'library',
    image: '/work-icons/gasunit.png'
  },
  {
    key: 'kaibunmaker',
    title: '回文メーカー',
    description: {
      ja: '回文を作って共有できるサービス',
      en: 'A service for creating and sharing palindromes.'
    },
    date: '2018-12-21',
    url: 'http://kaibunmaker.com',
    github: 'https://github.com/kaibunmaker/kaibunmaker',
    category: 'web',
    image: '/work-icons/kaibunmaker.png'
  },
  {
    key: 'cyber-xeed-plus',
    publicationEnded: true,
    title: 'CYBER XEED PLUS',
    description: {
      ja: '勤怠管理システムCYBER XEEDに便利な機能を追加するChrome拡張機能',
      en: 'A Chrome extension that adds useful features to the CYBER XEED attendance management system.'
    },
    date: '2019-03-11',
    url: 'https://chrome.google.com/webstore/detail/cyber-xeed-plus/fjcippambnmompkjifmbabafjemcccda',
    github: 'https://github.com/munierujp/cyber-xeed-plus',
    category: 'extension',
    image: '/work-icons/cyber-xeed-plus.png'
  },
  {
    key: 'qiita-team-plus',
    publicationEnded: true,
    title: 'Qiita Team Plus',
    description: {
      ja: 'Qiita:Teamに便利な機能を追加するChrome拡張機能',
      en: 'A Chrome extension that adds useful features to Qiita:Team.'
    },
    date: '2019-05-13',
    url: 'https://chrome.google.com/webstore/detail/qiitateam-plus/hcfgcklmbbanbcgkdfohjmakcpmghnbj',
    github: 'https://github.com/munierujp/qiita-team-plus',
    category: 'extension',
    image: '/work-icons/qiita-team-plus.png'
  },
  {
    key: 'imgcalc',
    title: 'imgcalc',
    description: {
      ja: 'アスペクト比から画像サイズを計算するツール',
      en: 'A tool for calculating image dimensions from an aspect ratio.'
    },
    date: '2019-07-16',
    url: 'https://imgcalc.munieru.app/',
    github: 'https://github.com/munierujp/imgcalc',
    category: 'web',
    image: '/work-icons/imgcalc.png'
  },
  {
    key: 'kintai',
    publicationEnded: true,
    title: 'kintai',
    description: {
      ja: '勤怠管理システム',
      en: 'An attendance management system.'
    },
    date: '2019-12-25',
    url: 'https://kintai.munieru.app/',
    github: 'https://github.com/munierujp/kintai',
    category: 'web',
    image: '/work-icons/kintai.png'
  },
  {
    key: 'npm-update-package',
    title: 'npm-update-package',
    description: {
      ja: 'npmパッケージを更新するためのプルリクエストを作成するためのCLIツール',
      en: 'A CLI tool for creating pull requests to update npm packages.'
    },
    date: '2021-11-24',
    url: 'https://github.com/npm-update-package/npm-update-package',
    github: 'https://github.com/npm-update-package/npm-update-package',
    category: 'cli',
    image: '/work-icons/npm-update-package.png'
  },
  {
    key: 'chatgpt-web-app',
    publicationEnded: true,
    title: 'ChatGPT Web App',
    description: {
      ja: 'ChatGPTのためのウェブアプリ',
      en: 'A web application for ChatGPT.'
    },
    date: '2023-03-05',
    url: 'https://chatgpt.munieru.app/',
    github: 'https://github.com/munierujp/chatgpt-web-app',
    category: 'web',
    image: '/work-icons/chatgpt-web-app.png'
  },
  {
    key: 'anohi-no-tweet',
    title: '#あの日のツイートを表示するやつ',
    description: {
      ja: '指定した条件にマッチするツイートの検索結果、Twilog、ツイセーブなどを開くためのウェブアプリ',
      en: 'A web app that opens tweet search results, Twilog, and Twisave for specified search conditions.'
    },
    date: '2023-04-06',
    url: 'http://anohi-no-tweet.munieru.app/',
    github: 'https://github.com/munierujp/anohi-no-tweet',
    category: 'web',
    image: '/work-icons/anohi-no-tweet.png'
  },
  {
    key: 'inochi-no-sunadokei',
    title: '命の砂時計',
    description: {
      ja: '人生の残り時間を砂時計で表示するウェブアプリ',
      en: 'A web app that visualizes the time remaining in your life as an hourglass.'
    },
    date: '2026-11-03',
    url: 'https://inochi-no-sunadokei.munieru.app/',
    github: 'https://github.com/munierujp/inochi-no-sunadokei',
    category: 'web',
    image: '/work-icons/inochi-no-sunadokei.png'
  }
]
