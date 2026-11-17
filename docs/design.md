# UI・設計ガイド

ページとコンポーネントの構成、表示・操作、画像、フォント、メタ情報の設計をまとめます。
記載するソースパスとコマンドの実行場所は、リポジトリのルートを基準とします。

## レイアウト・操作の編集

- 共通ヘッダー: `app/components/AppHeader.vue`
- 共通フッター: `app/components/AppFooter.vue`
- 全ページ共通の配置・main: `app/layouts/default.vue`
- 日英共通のページ構成: `app/pages/index.vue` の `<template>`
- ページのメタ情報・構造化データ: `app/composables/useSiteSeo.ts`（`index.vue`のsetupから呼び出す）
- 名前・プロフィール文・画像: `app/components/AppProfile.vue`
- サービスへのリンク一覧: `app/components/AppLinks.vue`
- サービス名・画像付きの共通リンク: `app/components/AppServiceLink.vue`（`ServiceLink`型の`link`を受け取る）
- 装飾画像の最適化・代替表示: `app/components/AppIconImage.vue`（SVGを維持し、ラスター画像の配信寸法・密度・形式を共通化）
- スキル一覧: `app/components/AppSkills.vue`
- 型付きのコンテンツ一覧: `app/data/*.ts`（型注釈で各型を検査）
- 作品一覧・日付順への整列: `app/components/AppWorks.vue`
- 書籍一覧: `app/components/AppBooks.vue`
- 登壇一覧: `app/components/AppTalks.vue`
- 支援先一覧: `app/components/AppSupport.vue`
- 言語選択メニュー: `app/components/AppLanguageSelect.vue`の`USelectMenu`
- テーマ選択メニュー: `app/components/AppThemeSelect.vue`の`UColorModeSelect`
- 言語・テーマの円形表示: `app/utils/iconSelectUi.ts`
- 作品カード: `app/components/AppWorkCard.vue`
- 書籍カード: `app/components/AppBookCard.vue`
- 登壇カード: `app/components/AppTalkCard.vue`
- 装飾アイコン: Nuxt UIの`UIcon`を直接使い、ローカルのLucide・Simple Iconsを参照します（例: `i-lucide-globe`・`i-simple-icons-github`）。用途の読み上げ名は親のリンク・ボタンへ指定し、アイコン自体は`aria-hidden="true"`にします。
- アイコンだけのリンク: `app/components/AppIconLink.vue`（`href`・`label`・Iconify名の`icon`を必須で指定）
- 動的に選ぶアイコン名の型: `app/types/IconName.ts`。`nuxt.config.ts`でVue・TSの名前を走査して同梱し、実行時のアイコン取得と外部APIフォールバックは無効にします。
- ページとレイアウトの接続: `app/app.vue`
- 共通の部品テーマ: `app/app.config.ts`。Nuxt UIの公式設定で中立色のボタン・操作領域・円形ボタンを指定し、通常のボタン・カード・メニューの角丸や操作時の装飾は標準テーマを使います。
- 配置・余白・文字サイズ・レスポンシブ: 各コンポーネントのTailwindクラス。カードは`UPageCard`の標準スロットとスタイルを使い、画像寸法や補助リンクの重なりだけを各コンポーネントで調整します。
- 配色: `app/app.config.ts`の`ui.colors`でNuxt UI標準のcyan・zincを選びます。背景色・文字色の具体値は独自定義しません。
- ページ幅・左右の余白: Nuxt UI標準の`UContainer`を使います。本文フォントは`nuxt.config.ts`の`app.head.bodyAttrs`で指定し、本文の行間はTailwind標準の1.5を使います。部品ごとの行間は各コンポーネントで調整し、背景・文字色はNuxt UIの標準スタイルへ任せます。
- スタイルの入口: `assets/style/main.css`はTailwind・Nuxt UIのimportだけです。リセットはPreflight、カード全体の主リンクは`UPageCard`を使います。
- ファビコン・サイトの静的生成: `nuxt.config.ts`
- OGP画像の描画: `scripts/generate-ogp.ts`（Takumiの公式Node APIでPNGへ直接出力。通常のサイトビルドから分離）

HTMLをJavaScript文字列として編集する必要はありません。
各カードはデータをpropsで受け取り、`UPageCard`のheader・leading・title・description・footerスロットで用途ごとの表示を組み立てます。見出しはtitleスロット内の`h3`とし、原題の言語属性を維持します。
`app/pages/index.vue`はセクションの配置と`useSiteSeo()`の呼び出しを担当し、各セクションのコンポーネントがデータの読み込み・並び順・操作を管理します。コンテンツの言語別の表示文はTSの各項目へまとめ、表示側で`locale`に対応する値を取得します。見出し・操作ラベル・プロフィールは翻訳辞書と`t()`を使います。`@nuxtjs/i18n`がこの1ページから日本語・英語のルートを生成します。
`AppProfile`の名前・プロフィール本文と`AppFooter`の著作権表記は、`i18n/locales/ja.json`・`i18n/locales/en.json`で管理します。表示構造は各コンポーネントのテンプレートで編集します。
`app/layouts/default.vue`がヘッダー・main・フッターを配置します。新しいページは`app/pages/`へ追加し、mainを重複させず本文だけを書きます。共通レイアウトは既定で適用されます。
作品・書籍・登壇カードは項目ごとに内容が異なるため、propsでデータを受け取ります。

## Nuxt UIの構成

`app/app.config.ts`は配色・ボタン・セクション・グリッド・カード・バッジ・選択メニューの設定をそれぞれ定数へ分け、最後に`ui`へまとめます。型はNuxt UIが拡張する`AppConfigInput['ui']`から参照し、各設定を個別に検査します。

- ボタン・バッジの色・サイズ・形は`app/app.config.ts`へ置きます。サービス名・画像付きの外部リンクは`AppServiceLink`内で`UButton`を使い、画像URL・名前の言語属性・改行抑止・別タブ設定をまとめます。リンク一覧と支援先一覧は、データの取得・翻訳・表示条件・並び順・一覧の配置を担当します。その他のボタン・バッジには`UButton`・`UBadge`を使います。
- 作品・書籍・登壇は`UPageCard as="article"`を直接使います。作品はheader内に作品アイコンと右上のGitHubリンクを配置し、その下に日付・題名・説明を表示します。書籍・登壇は表紙を上部に配置します。登壇の表紙は最大幅576pxに制限します。
- 言語は言語切り替えアイコン、テーマは状態アイコンを表示する44pxの円形セレクトです。トリガーの文字・下向き矢印は隠し、選択肢には文字を表示します。GitHub・Xへのアイコンリンクも円形です。
- 言語・テーマの選択やメニュー項目の操作は、ブラウザで確認します。
- フォントは端末搭載の書体を使うため自動フォントだけを無効にします。テーマ選択はNuxt UIのColor Mode連携を使い、メニュー用のLucideアイコンはローカルにバンドルします。

### ページ遷移の通知

`app/app.vue`の`NuxtRouteAnnouncer`で、言語切り替えなどに伴うページタイトルの変更を支援技術へ通知します。標準の`polite`設定を使い、見た目やキーボードのフォーカスは変更しません。

### フッター

`AppFooter`内の`UFooter`は標準の配置を使います。`lg`以上では著作権表記を中央、XアカウントとサイトのGitHubリポジトリへの円形アイコンリンクを右側へ配置します。狭い画面ではリンクを上段、著作権表記を下段にして、どちらも中央へ配置します。リンクには日英の読み上げ名・ツールチップを付け、別タブで開きます。XのURLは公開設定の`X_URL`を参照します。`shared/utils/site.ts`で、メタ情報にも使う固定の`X_ID`から生成します。

### プロフィールのレイアウト

`AppProfile`は`UPageHero`のtitle・descriptionスロットと画像用の標準スロットを使います。名前は見出しにせず`p`とし、サイト名の`h1`と役割を分けています。画面幅にかかわらず、画像・名前・自己紹介の順で縦に並べます。`UPageHero`の標準の文字サイズ・中央揃えを使い、画像を`order-first`で先頭へ移動します。上下の余白だけは各ブレークポイントで`py-12`に抑えます。画像は背景や枠を付けず円形で表示し、画像形式の選択と生成は`NuxtPicture`の標準設定へ任せます。

### 登壇カードのリンク

スライドの表紙と発表タイトルを主に見せるため、カード全体のリンク先はSpeaker Deckの資料ページです。イベント名（英語の参考訳を含む）はイベントページへの独立したテキストリンクにします。補助リンクを全体リンクより手前に配置し、キーボードでも別々に操作できます。両方とも別タブで開きます。

### 一覧セクション

リンク・スキル・作品・書籍・登壇・支援は`UPageSection`を使い、見出しを`title`、一覧や操作を`body`スロットへ渡します。見出しの文字サイズ・太さ・中央揃えは標準テーマを使います。幅・余白・見出し幅に沿う下線・リンクなどの一覧の中央配置は`app/app.config.ts`の`ui.pageSection`で一括調整します。各コンポーネントはデータと本文を担当します。

### ヘッダー

`AppHeader`は`UHeader`の背景・下線・追従を使用します。1ページ構成のため、サイト名は`left`スロットの`h1`として表示し、リンクにしません。ナビゲーションがないためメニューの開閉ボタンは表示しません。言語のトリガーには現在の言語を含む読み上げ名、テーマのトリガーには用途を示す固定の読み上げ名を付け、スマホでも44pxの操作領域を保ちます。

### カード一覧のグリッド

作品・書籍・登壇は`UPageGrid as="ul"`と`li`で一覧を構成します。列数とカード間隔はNuxt UIの標準設定を使い、独自の上書きはしません。標準では1列・`sm`以上で2列・`lg`以上で3列となり、間隔は`gap-8`です。

## 表示・操作

プロフィール・リンク・全作品・書籍・登壇・OGPは、ビルド時のHTMLに含めます。
JavaScriptが無効でも内容とリンクを閲覧でき、画像はすべて同じサイトから配信します。
作品は公開日の新しい順に全件を常時表示します。分類による絞り込みの再検討は[Issue #447](https://github.com/munierujp/munieru.jp/issues/447)で扱います。
リンク移動そのものにはJavaScriptを使いません。

テーマはシステム・ライト・ダークから選択でき、ブラウザへ保存します。
保存できない環境ではそのページ内で切り替えます。システム選択時はOS設定の変更にも追従します。別タブで選択されたテーマは再読み込み時に反映します。
`UColorModeSelect`と、Nuxt UIが自動登録するNuxt Color Modeが、初期描画前の適用・OS追従・保存を担当します。localStorageの保存キーは標準の`nuxt-color-mode`を使い、独自指定しません。
静的HTMLでは保存値が分からないため、`AppThemeSelect`内の`UColorModeSelect`はクライアント初期化まで無効なシステム選択のフォールバックを表示します。読み上げ名は日本語で「表示モードを選択」、英語で「Select appearance」に固定し、現在値の管理は公式コンポーネントへ任せます。
言語選択は`AppLanguageSelect`、テーマ選択は`AppThemeSelect`へまとめ、`AppHeader`は配置を担当します。円形表示の設定は`app/utils/iconSelectUi.ts`で共有します。
メニューの開閉・キー操作・フォーカス管理はライブラリへ委譲します。
アクセント色と本文色はNuxt UI標準のcyan・zincです。`app/app.config.ts`でパレットを選びます。各セクションの見出しは中央揃えにし、見出し幅に沿う下線を付けています。リンク・スキル・支援の一覧も中央に配置し、カード内の配置は維持します。本文と一緒にスクロールし、画面上部には固定しません。作品・書籍・登壇は日付の新しい順で固定表示します。

## フォント

本文・見出しには端末に搭載されたフォントを使います。`nuxt.config.ts`の`app.head.bodyAttrs`で`Hiragino Sans`・`Yu Gothic`・`system-ui`・`sans-serif`の順に指定しています。ウェブフォントの取得や配信は行いません。

書体・文字幅・改行位置は端末によって異なります。文字サイズと行間、折り返せるレイアウトで読みやすさを保ちます。本文や各部の配置はコンポーネントのTailwindクラス、部品の外観は`app/app.config.ts`のテーマで調整します。

## 画像の最適化

プロフィール画像・書籍の表紙・登壇資料の表紙は`NuxtPicture`で表示します。
元画像は`public/`へ置き、画像のパスを指定してください。事前の変換は不要です。
`@nuxt/image`のIPXプロバイダーが、ビルド時に表示幅・1倍/2倍の画面密度に応じたWebP画像とPNG・JPEGのフォールバック画像を`dist/_ipx/`へ生成します。
画像形式は`NuxtPicture`の標準設定に任せ、WebPを優先します。フォールバックは元画像に応じてPNG・JPEGになります。圧縮による劣化を抑えるため、品質設定は100を維持します。WebP・JPEGの可逆圧縮を保証する設定ではありません。ブラウザは対応する形式と表示幅・画面密度に合う画像候補を選びます。
公開後の画像変換サーバーや外部画像サービスは使用しません。
`NuxtPicture`のクラスは外側の`picture`へ付くため、内側の`img`の表示クラスや`fetchpriority`は`img-attrs`で指定します。
サービス・スキル・作品の装飾アイコンは`AppIconImage`で配信し、内部の`UAvatar`が画像の読み込み失敗を処理します。作品は分類アイコン、サービス・スキルは白背景・角丸の空の領域へ切り替え、画像の表示領域を保ちます。SVGは元の形式を維持し、ラスター画像は画質100のWebPを1倍・2倍で静的生成します。通常のアイコンは24px、作品は画面幅に合わせ48px・66pxで表示します。対応するWebPの生成幅は通常24px・48px、作品48px・96px・66px・132pxで、縦横比を維持します。ICOは最大解像度の画像をPNG化して`public/`へ置きます。ファビコンは元の形式で配信します。
品質・画面幅の設定は`nuxt.config.ts`の`image`、各画像の表示幅はコンポーネントの`sizes`に記述します。
プロフィールは優先して読み込み、書籍・登壇の表紙は遅延読み込みを維持しています。

## 検索・共有用のメタ情報

- `@nuxtjs/sitemap`がページを自動検出し、Nuxt I18nの言語設定に従ってサイトマップを生成します。`app/pages/`へ静的なページを追加する場合は、サイトマップへの手動登録は不要です。
- `/sitemap_index.xml`が入口で、`/__sitemap__/ja-JP.xml`・`en-US.xml`に各言語の正規URLと相互参照を出力します。
- `@nuxtjs/robots`がビルド時に`robots.txt`を生成し、Sitemapモジュールとの連携で公開先のサイトマップURLを記載します。404 HTMLへの`noindex`指定もモジュールへ任せます。
- HTMLの言語属性・canonical・hreflangとサイトマップはモジュールの標準機能で生成します。HTMLの`lang`はNuxt I18nの`language`に従い、日本語版は`ja-JP`、英語版は`en-US`です。`x-default`は既定言語の日本語ページ（`/`）を指し、入口URLへの独自の上書きは行いません。
- 検索・共有用のタイトルとヘッダーのサイト名は、日本語で「ムニエル OFFICIAL SITE」、英語で「Munieru OFFICIAL SITE」です。英語版プロフィールは「Munieru」を主表示、「ムニエル」を補足にします。サイト名・説明文は`i18n/locales/*.json`の`nuxtSiteConfig.name`・`nuxtSiteConfig.description`で定義し、Nuxt Site Configの多言語連携を通じてヘッダー・メタ情報・構造化データで共有します。
- 著者・OGP・Xカードの言語別メタ情報・共有画像の説明・構造化データは`useSiteSeo()`で登録し、共通設定の初期値との二重定義はしません。共有画像は日本語版が`public/ogp.png`、英語版が`public/en/ogp.png`（どちらも1200×630pxのPNG）で、共有元のページの言語に合わせて選びます。Xカードは`summary_large_image`を使います。文字はTakumiでmacOSのヒラギノ角ゴシックW9・W6・W3を描画します。生成方針と再生成手順は`docs/ogp.md`、Node.jsでの再生成は`npm run generate:ogp`で実行します。書き出しスクリプトは`scripts/generate-ogp.ts`にあります。
- 著者名と構造化データの人物名・サイト名は表示言語に合わせます。英語版では`Munieru`を主表記にし、`Person.alternateName`に日本語表記を残します。日本語版では主表記と別名を逆にします。サイト名の翻訳は各言語の`WebSite.name`で表し、`WebSite.alternateName`は指定しません。
- 言語別の`WebSite`のURL・ID・サイト名・説明・言語と翻訳関係は`nuxt-schema-org`の標準生成に任せます。型付きAPIで`ProfilePage`と共通の`Person`を定義し、人物のIDと人物への参照は明示します。公開アカウントとの対応は`app/data/serviceLinks.ts`から取得します。
- 構造化データはモジュールの標準設定を使い、本番では各URLの初期HTMLへ出力します。画面内で言語を切り替えてもJSON-LDは更新せず、対応するURLを直接取得した際にその言語のデータを返します。
- `nuxt.config.ts`が共通設定、`app/composables/useSiteSeo.ts`が言語別メタ情報を担当します。SEO用のページ・画像の絶対URLはNuxt Site Configの`withSiteUrl()`で組み立て、正規サイトのURL設定を共有します。サイトマップはSitemapモジュールとNuxt I18nの連携に任せます。

## 存在しないURL

存在しないURLは専用の404画面を表示せず、トップページへ自動移動します。
Netlifyの転送ルールは`public/_redirects`へ直接記載し、Nuxtがビルド時に`dist/_redirects`へコピーします。見つからない`/en/*`は英語トップ、それ以外は日本語トップへ302転送します。既存ファイルは転送せず通常配信します。
ローカルの`nuxt preview`ではNetlify固有の転送ルールは再現せず、Deploy Previewで確認します。転送専用のVueページは用意せず、公開時はNetlifyの転送機能を使います。
