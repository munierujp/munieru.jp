# UI・設計ガイド

ページとコンポーネントの構成、表示・操作、画像、フォント、メタ情報の設計をまとめます。
記載するソースパスとコマンドの実行場所は、リポジトリのルートを基準とします。

- [開発・検証ガイド](development.md)
- [内容の更新ガイド](content.md)
- [OGP画像の生成](../design/ogp/README.md)

## レイアウト・操作の編集

- 共通ヘッダー: `app/components/AppHeader.vue`
- 共通フッター: `app/components/AppFooter.vue`
- 全ページ共通の配置・main: `app/layouts/default.vue`
- 日英共通のページ構成: `app/pages/index.vue` の `<template>`
- ページのメタ情報・構造化データ: 同じファイルの `<script setup>`
- 名前・プロフィール文・画像: `app/components/AppProfile.vue`
- サービスへのリンク一覧: `app/components/AppLinks.vue`
- サービス名・画像付きの共通リンク: `app/components/AppServiceLink.vue`（`ServiceLink`型の`link`を受け取る）
- スキル一覧: `app/components/AppSkills.vue`
- 作品一覧・日付順への整列: `app/components/AppWorks.vue`
- 書籍一覧: `app/components/AppBooks.vue`
- 登壇一覧: `app/components/AppTalks.vue`
- 支援先一覧・URL未設定時の非表示: `app/components/AppSupport.vue`
- 言語選択メニュー: `app/components/AppLanguageSelect.vue`の`USelectMenu`
- テーマ選択メニュー: `app/components/AppThemeSelect.vue`の`UColorModeSelect`
- 言語・テーマの円形表示: `app/utils/iconSelectUi.ts`
- 作品・書籍・登壇の共通カード: `app/components/AppCard.vue`（画像・分類・状態・補助リンクは名前付きスロット）
- 作品カード: `app/components/AppWorkCard.vue`
- 書籍カード: `app/components/AppBookCard.vue`
- 登壇カード: `app/components/AppTalkCard.vue`
- 装飾アイコン: Nuxt UIの`UIcon`を直接使い、ローカルのLucide・Simple Iconsを参照します（例: `i-lucide-globe`・`i-simple-icons-github`）。用途の読み上げ名は親のリンク・ボタンへ指定し、アイコン自体は`aria-hidden="true"`にします。
- アイコンだけのリンク: `app/components/AppIconLink.vue`（`href`・`label`と、Iconify名の`icon`または画像のスロットを指定）
- 動的に選ぶアイコン名の型: `app/types/IconName.ts`。`nuxt.config.ts`でVue・TSの名前を走査して同梱し、実行時のアイコン取得と外部APIフォールバックは無効にします。
- ページとレイアウトの接続: `app/app.vue`
- 共通の部品テーマ: `app/app.config.ts`。Nuxt UIの公式設定でボタン・カード・バッジ・メニューの角丸と操作領域を指定します。
- 配置・余白・文字サイズ・レスポンシブ: 各コンポーネントのTailwindクラス。カードごとの配置は`AppWorkCard.vue`・`AppBookCard.vue`・`AppTalkCard.vue`の`cardUi`から、汎用`AppCard`の`ui`へ渡します。
- 配色: `app/app.config.ts`の`ui.colors`でNuxt UI標準のcyan・zincを選びます。背景色・文字色の具体値は独自定義しません。
- ページ幅・左右の余白: Nuxt UI標準の`UContainer`を使います。本文フォントと背景・文字色の適用は`app/app.vue`の`bodyAttrs`です。
- スタイルの入口: `assets/style/main.css`はTailwind・Nuxt UIのimportだけです。リセットはPreflight、カード全体の主リンクは`UPageCard`を使います。
- OGP・ファビコン・静的生成: `nuxt.config.ts`

HTMLをJavaScript文字列として編集する必要はありません。
`AppCard`は汎用の構造とリンク動作を担当し、各カードはデータをpropsで受け取って用途ごとの表示を組み立てます。
`app/pages/index.vue`はセクションの配置とページのメタ情報を担当し、各セクションのコンポーネントがデータの読み込み・翻訳・並び順・操作を管理します。`@nuxtjs/i18n`がこの1ページから日本語・英語のルートを生成します。
`AppProfile`の名前・プロフィール本文と`AppFooter`の著作権表記は、`i18n/locales/ja.json`・`en.json`で管理します。表示構造は各コンポーネントのテンプレートで編集します。
`app/layouts/default.vue`がヘッダー・main・フッターを配置します。新しいページは`app/pages/`へ追加し、mainを重複させず本文だけを書きます。共通レイアウトは既定で適用されます。
作品・書籍・登壇カードは項目ごとに内容が異なるため、propsでデータを受け取ります。

## Nuxt UIの構成

- ボタン・バッジの色・サイズ・形は`app/app.config.ts`へ置きます。サービス名・画像付きの外部リンクは`AppServiceLink`内で`UButton`を使い、画像URL・読み込み失敗時の処理・名前の言語属性・改行抑止・別タブ設定をまとめます。リンク一覧と支援先一覧は、データの取得・翻訳・表示条件・並び順・一覧の配置を担当します。その他のボタン・バッジには`UButton`・`UBadge`を使います。
- `AppCard`は画像・本文・補助リンクを配置し、外枠とカード全体の主リンクに`UPageCard`を使います。
- 言語は言語切り替えアイコン、テーマは状態アイコンを表示する44pxの円形セレクトです。トリガーの文字・下向き矢印は隠し、選択肢には文字を表示します。GitHub・Xへのアイコンリンクも円形です。
- 言語・テーマの選択やメニュー項目の操作は、ブラウザで確認します。
- フォントは端末搭載の書体を使うため自動フォントだけを無効にします。テーマ選択はNuxt UIのColor Mode連携を使い、メニュー用のLucideアイコンはローカルにバンドルします。

### ページ遷移の通知

`app/app.vue`の`NuxtRouteAnnouncer`で、言語切り替えなどに伴うページタイトルの変更を支援技術へ通知します。標準の`polite`設定を使い、見た目やキーボードのフォーカスは変更しません。

### フッター

`AppFooter`内の`UFooter`で著作権表記をフッター全体の中央へ、XアカウントとサイトのGitHubリポジトリへの円形アイコンリンクを右側へ配置します。スマホでも同じ行に並べ、左右の領域を同じ幅にして中央位置を保ちます。リンクには日英の読み上げ名・ツールチップを付け、別タブで開きます。XのURLは`X_ID`と共有します。

### プロフィールのレイアウト

`AppProfile`は`UPageHero`のtitle・descriptionスロットと画像用の標準スロットを使います。名前は見出しにせず`p`とし、サイト名の`h1`と役割を分けています。余白を抑え、小さい画面では名前と画像を同じ行、自己紹介をその下に配置します。画像は背景や枠を付けず円形で表示し、AVIF・WebP生成は`NuxtPicture`へ任せます。

### 登壇カードのリンク

スライドの表紙と発表タイトルを主に見せるため、カード全体のリンク先はSpeaker Deckの資料ページです。イベント名（英語の参考訳を含む）はイベントページへの独立したテキストリンクにします。補助リンクを全体リンクより手前に配置し、キーボードでも別々に操作できます。両方とも別タブで開きます。

### 一覧セクション

リンク・スキル・作品・書籍・登壇・支援は`UPageSection`を使い、見出しを`title`、一覧や操作を`body`スロットへ渡します。幅・上下余白・h2の左ライン・文字サイズは`app/app.config.ts`の`ui.pageSection`で一括調整します。各コンポーネントはデータと本文を担当します。

### ヘッダー

`AppHeader`は`UHeader`の背景・下線・追従を使用します。1ページ構成のため、サイト名は`left`スロットの`h1`として表示し、リンクにしません。ナビゲーションがないためメニューの開閉ボタンは表示しません。言語のトリガーには現在の言語を含む読み上げ名、テーマのトリガーには用途を示す固定の読み上げ名を付け、スマホでも44pxの操作領域を保ちます。

### カード一覧のグリッド

作品・書籍・登壇は`UPageGrid as="ul"`と`li`で一覧を構成します。`app/app.config.ts`の`ui.pageGrid.base`で、カード最小幅30rem・狭い画面で1列・十分な幅で2列となる配置と12pxの間隔を共通管理します。標準の画面幅別の列数指定も上書きし、コンテナー幅に応じて列数を決めます。

## 表示・操作

プロフィール・リンク・全作品・書籍・登壇・OGPは、ビルド時のHTMLに含めます。
JavaScriptが無効でも内容とリンクを閲覧でき、画像はすべて同じサイトから配信します。
作品は公開日の新しい順に全件を常時表示します。分類による絞り込みの再検討は[Issue #447](https://github.com/munierujp/munieru.jp/issues/447)で扱います。
リンク移動そのものにはJavaScriptを使いません。

テーマはシステム・ライト・ダークから選択でき、ブラウザへ保存します。
保存できない環境ではそのページ内で切り替えます。システム選択時はOS設定の変更にも追従します。別タブで選択されたテーマは再読み込み時に反映します。
`UColorModeSelect`と、Nuxt UIが自動登録するNuxt Color Modeが、初期描画前の適用・OS追従・保存を担当します。保存キーは`app-theme`です。
静的HTMLでは保存値が分からないため、`AppThemeSelect`内の`UColorModeSelect`はクライアント初期化まで無効なシステム選択のフォールバックを表示します。読み上げ名は日本語で「表示モードを選択」、英語で「Select appearance」に固定し、現在値の管理は公式コンポーネントへ任せます。
言語選択は`AppLanguageSelect`、テーマ選択は`AppThemeSelect`へまとめ、`AppHeader`は配置を担当します。円形表示の設定は`app/utils/iconSelectUi.ts`で共有します。
メニューの開閉・キー操作・フォーカス管理はライブラリへ委譲します。
アクセント色と本文色はNuxt UI標準のcyan・zincです。`app/app.config.ts`でパレットを選びます。各セクションの見出しは、左に細いラインを付けています。本文と一緒にスクロールし、画面上部には固定しません。作品・書籍・登壇は日付の新しい順で固定表示します。

## フォント

本文・見出しには端末に搭載されたフォントを使います。`app/app.vue`で`Hiragino Sans`・`Yu Gothic`・`system-ui`・`sans-serif`の順に指定しています。ウェブフォントの取得や配信は行いません。

書体・文字幅・改行位置は端末によって異なります。文字サイズと行間、折り返せるレイアウトで読みやすさを保ちます。本文や各部の配置はコンポーネントのTailwindクラス、部品の外観は`app/app.config.ts`のテーマで調整します。

## 画像の最適化

プロフィール画像・書籍の表紙・登壇資料の表紙は`NuxtPicture`で表示します。
元画像は`public/`へ置き、画像のパスを指定してください。事前の変換は不要です。
`@nuxt/image`のIPXプロバイダーが、ビルド時に表示幅・1倍/2倍の画面密度に応じたAVIF・WebP画像を`dist/_ipx/`へ生成します。
AVIFを優先し、フォールバックは`legacy-format="webp"`でWebPに限定します。圧縮による劣化を抑えるため、品質は両形式とも100です。可逆圧縮を保証する設定ではありません。不要なPNG・JPEGの追加生成を避け、ブラウザは対応する形式を一つ選びます。
公開後の画像変換サーバーや外部画像サービスは使用しません。
`NuxtPicture`のクラスは外側の`picture`へ付くため、内側の`img`の表示クラスや`fetchpriority`は`img-attrs`で指定します。
ファビコン・サービスやスキルの小さなアイコンは元の形式で配信します。
品質・画面幅の設定は`nuxt.config.ts`の`image`、各画像の表示幅はコンポーネントの`sizes`に記述します。
プロフィールは優先して読み込み、書籍・登壇の表紙は遅延読み込みを維持しています。

## 検索・共有用のメタ情報

- `@nuxtjs/sitemap`がトップページをNuxt I18nの言語設定に従って展開し、サイトマップを生成します。独立したページを増やす場合は、`nuxt.config.ts`の`sitemap.urls`にも追加します。
- `/sitemap_index.xml`が入口で、`/__sitemap__/ja-JP.xml`・`en-US.xml`に各言語の正規URLと相互参照を出力します。
- `robots.txt`もビルド時に生成し、公開先のサイトマップURLを記載します。
- HTMLのcanonical・hreflangとサイトマップの対応関係を揃え、`x-default`は言語振り分け用の`/`を指します。
- 検索・共有用のタイトルとヘッダーのサイト名は、日本語で「ムニエル OFFICIAL SITE」、英語で「Munieru OFFICIAL SITE」です。英語版プロフィールは「Munieru」を主表示、「ムニエル」を補足にします。説明文は`i18n/locales/*.json`の`description`です。
- 著者・OGP・Xカードのメタ情報と、共有画像の説明を出力します。共有画像は日本語版が`public/ogp.png`、英語版が`public/en/ogp.png`（どちらも1200×630pxのPNG）で、共有元のページの言語に合わせて選びます。Xカードは`summary_large_image`を使います。文字はmacOSのヒラギノ角ゴシックで描画しています。生成方針と再生成手順は`design/ogp/`、Node.jsでの再生成は`npm run generate:ogp`で実行します。書き出しスクリプトは`scripts/generate-ogp.ts`にあります。
- 著者名と構造化データの人物名・サイト名は表示言語に合わせます。英語版では`Munieru`を主表記にし、構造化データの`alternateName`に日本語表記を残します。日本語版では主表記と別名を逆にします。
- JSON-LDで`WebSite`と`ProfilePage`・`Person`を出力します。公開アカウントとの対応は`modules/links.json`から取得します。
- `nuxt.config.ts`が共通設定、`app/pages/index.vue`が言語別メタ情報、`server/plugins/sitemap.ts`がサイトマップの`x-default`の調整を担当します。

## 存在しないURL

存在しないURLは専用の404画面を表示せず、トップページへ自動移動します。
Netlifyではビルド時に`dist/_redirects`へ302転送ルールを生成し、`/ja/*`は日本語トップ、`/en/*`は英語トップ、それ以外は言語判定の入口へ転送します。既存ファイルは転送せず通常配信します。
付属のプレビューサーバーも同じ転送を行います。転送専用のVueページは用意せず、公開時はNetlifyの転送機能を使います。
