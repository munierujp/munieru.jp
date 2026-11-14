# 開発ガイド

記載するソースパスとコマンドの実行場所は、リポジトリのルートを基準とします。

## 必要な環境

Node.jsと`@types/node`はメジャー・マイナーバージョンを揃えます。現在はNode.js 26.6.0（`.nvmrc`）と`@types/node` 26.6.6です。`engines.node`も26.6.0に完全固定しています。
更新時は、対応する型定義が公開されているNode.jsを選び、`.nvmrc`・`engines.node`・`@types/node`を一緒に更新してください。パッチバージョンは一致不要です。
nvmを使う場合は、以下でプロジェクト用のバージョンに切り替えます。

```sh
nvm install
nvm use
```

```sh
npm ci
npm run prepare
```

`.npmrc` でインストール時のスクリプト実行を無効にしているため、Nuxtの準備は明示的に実行します。
`npm run dev` やビルドでもNuxtの生成ファイルは準備されます。


## ローカル開発

```sh
npm run dev
```

`http://127.0.0.1:3000/` で確認できます。
Vue・CSS・データを保存すると、開発画面に反映されます。
別のポートを使う場合は `npm run dev -- --port 3001` などで指定します。

## ビルド・検証・プレビュー

```sh
npm run lint
npm run typecheck
npm test
npm run build
# ビルド成果物の検証
npm run test:integration
npm start
```

`npm run build` と `npm run generate` は、どちらも `nuxt generate` で静的サイトを生成します。
公開するファイルは `dist/` に出力します。Netlifyにも同じコマンド・出力先を `netlify.toml` で指定しています。
本番用のNodeサーバーやAPIは不要です。

`npm start` は生成済みの `dist/` を、Node.js標準の小さなプレビューサーバーで配信します。
URLは `http://127.0.0.1:4173/` です。ポートは `PORT=4174 npm start` などで変更できます。
既定では外部へ公開しません。

## GitHub Actions

PR・既定ブランチ（master）へのpush・手動実行で、以下のチェックをそれぞれ実行します。

- `.github/workflows/eslint.yml`・`secretlint.yml`・`stylelint.yml`・`markuplint.yml`: リンターごとに独立して実行
- `.github/workflows/lockfile-lint.yml`: lockfileの取得先・ハッシュ形式を検査
- `.github/workflows/typecheck.yml`: TypeScriptの型チェック
- `.github/workflows/lighthouse.yml`: 静的ビルドの日英トップをモバイル条件で各3回計測し、スコアと詳細レポートを保存
- `.github/workflows/test.yml`: ビルド不要の単体テスト→Nuxtの準備・静的ビルド→成果物の結合テスト

各ワークフローは`.nvmrc`のNode.jsを使い、`npm ci`を先に実行します。Nuxtの生成物を利用するチェックでは`npm run prepare`も実行します。lockfile-lintはNuxtを使わないためprepareを実行しません。
公式ActionsはリリースのコミットSHAで固定し、権限は`contents: read`のみです。
Netlifyによる公開とRenovateの依存更新は引き続き既存の仕組みで行います。


### Lighthouseの計測

`lighthouse.yml`はスコアの下限を設けず、Performance・Accessibility・Best Practices・SEOを記録します。Actionsのサマリーには各3回のカテゴリ別中央値を表示し、全6回のHTML・JSONレポートは`lighthouse-reports`という成果物に14日間保存します。外部公開ストレージへのアップロードやPRコメントの投稿は行いません。低スコアでは失敗しませんが、ビルド・計測・集計のエラーは失敗します。

```sh
npm run build
npm run lighthouse
npm run lighthouse:summary
```

ローカルではGoogle Chromeが必要です。自動検出できない場合は`CHROME_PATH`に実行ファイルのパスを指定してください。`lighthouserc.js`で計測URL・回数・条件を定義します。専用ローダーはTSに対応しないため、Node 26の`require(ESM)`で読み込めるJSの名前付きエクスポートを使い、`@ts-check`とLighthouseの型で計測条件を検査します。`scripts/lighthouse-summary.ts`が集計を担当します。

結果はCI環境でのシミュレーション値であり、実ユーザーの表示速度やNetlifyのネットワーク性能を測るものではありません。環境・実行ごとに変動するため、同じ条件で傾向を比較します。

## 内容の更新

日常的な更新はJSONを編集します。既存の項目をコピーして追加できます。

- 名前・プロフィール本文: `i18n/locales/ja.json`・`en.json`の`site`・`profile`
- フッターの著作権表記: `app/components/AppFooter.vue` の `<template>`
- サイト名（`site.title`）・名前（`site.name`）: `i18n/locales/ja.json`・`en.json`（ページ・共通設定・OGP画像の生成で共有）
- OGPの説明: `i18n/locales/ja.json`・`en.json`の`description`
- SNS・各サービス: `modules/links.json`。サービス名は英語版でも翻訳せず、原表記を共有します
- 活動への支援先: `modules/support.json`（URLの初期値・名称・並び順・アイコン）。英語の表示名は`i18n/locales/en.json`の`support`。既存4サービスのURLは環境変数でも上書き可能
- スキル: `modules/skills.json`
- 作品: `modules/works.json`
- 書籍: `modules/books.json`
- 登壇: `modules/talks.json`
- 画像など: `public/`

作品の `category` は `web`（ウェブアプリ）・`extension`（Chrome拡張機能）・`library`（ライブラリ）・`cli`（CLI）から指定します。
公開終了した作品は `publicationEnded: true` にすると「公開終了」を表示し、作品ページへのリンクを外します。
開発を終了した作品は `developmentEnded: true` にすると「開発終了」（英語では「No longer maintained」）を表示します。この状態だけでは作品ページへのリンクは外しません。
GitHubリンクはそのまま表示します。作品・書籍・登壇は日付の新しい順に表示します。

作品の`image`に`/work-icons/ファイル名`を指定すると専用アイコンを表示します。
画像が未指定または読み込めない場合は分類アイコンを表示します。既存画像の取得元は`public/work-icons/README.md`に記録しています。

## レイアウト・操作の編集

- 共通ヘッダー: `app/components/AppHeader.vue`
- 共通フッター: `app/components/AppFooter.vue`
- 全ページ共通の配置・main: `app/layouts/default.vue`
- 日英共通のページ構成: `app/pages/index.vue` の `<template>`
- ページのメタ情報・構造化データ: 同じファイルの `<script setup>`
- 名前・プロフィール文・画像: `app/components/AppProfile.vue`
- サービスへのリンク一覧: `app/components/AppLinks.vue`
- スキル一覧: `app/components/AppSkills.vue`
- 作品一覧・日付順への整列: `app/components/AppWorks.vue`
- 書籍一覧: `app/components/AppBooks.vue`
- 登壇一覧: `app/components/AppTalks.vue`
- 支援先一覧・URL未設定時の非表示: `app/components/AppSupport.vue`
- テーマ選択メニュー: `app/components/AppHeader.vue`の`UColorModeSelect`
- 作品・書籍・登壇の共通カード: `app/components/AppCard.vue`（画像・分類・状態・補助リンクは名前付きスロット）
- 作品カード: `app/components/AppWorkCard.vue`
- 書籍カード: `app/components/AppBookCard.vue`
- 登壇カード: `app/components/AppTalkCard.vue`
- 装飾アイコン: Nuxt UIの`UIcon`を直接使い、ローカルのLucide・Simple Iconsを参照します（例: `i-lucide-globe`・`i-simple-icons-github`）。用途の読み上げ名は親のリンク・ボタンへ指定し、アイコン自体は`aria-hidden="true"`にします。
- アイコンだけのリンク: `app/components/AppIconLink.vue`（`href`・`label`と、Iconify名の`icon`または画像のスロットを指定）
- 動的に選ぶアイコン名の型: `app/types/ui.ts`。`nuxt.config.ts`でVue・TSの名前を走査して同梱し、実行時のアイコン取得と外部APIフォールバックは無効にします。自作のSVGスプライトは使いません。
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
作品・書籍・登壇カードは項目ごとに内容が異なるため、引き続きpropsでデータを受け取ります。

## 設定ファイル・コメントの方針

設定ファイルの形式は、利用するツールが対応する範囲で次の順に選びます。TSを読み込むためだけのラッパーは追加しません。

1. `.ts`が使える場合はTypeScript。
2. TS非対応でも型定義がある場合は、`// @ts-check`と型定義を使うJavaScript（`.js`・`.mjs`・`.cjs`）。
3. 型定義がなくてもJavaScriptで書ける場合はJavaScript。
4. JavaScript非対応の場合は、JSONC・JSON5などコメントに対応したJSON形式。
5. JSONC・JSON5の拡張子は非対応でもコメントを読み飛ばせる場合は、`.json`にコメントを記載。
6. いずれも使えない場合は、コメントなしのJSON。

GitHub ActionsのYAML、NetlifyのTOML、`.npmrc`など、JSONも使えず専用の形式が必要な設定はその形式を維持します。コンテンツ・翻訳・アイコンのデータJSONと、自動生成するロックファイルは形式変更の対象外です。

ESLint・Stylelint・Markuplint・Nuxt・多言語設定・共有の公開設定はTS、Secretlintは型定義付きのCommonJSを使います。lockfile-lintはTS設定と公式の型定義に対応しないため、ES Modules形式の`lockfile-lint.config.js`を使います。Renovateは`.github/renovate.json`をJSONCとして読み込むため、拡張子を維持してコメントを記載します。`tsconfig.json`は拡張子を維持したままコメントを記載できます。`package.json`はコメントに対応しないため、通常のJSONのままにします。

ルールを追加・上書き・無効化する場合は、設定の直前に理由をコメントで記載します。対象を限定する例外では、その範囲と必要性も記載します。

関数・クラス・型・意味や制約のある変数には、TSDoc形式の`/** ... */`コメントを積極的に記載します。ファイル全体の責務は冒頭の説明コメント、引数は`@param`、戻り値は`@returns`、副作用や設計上の注意は`@remarks`、例外は`@throws`で説明します。独自に定義するオブジェクト型・props・公開設定の各プロパティにもTSDocコメントを記載します。関数宣言と名前付き関数は、`void`・`undefined`を含め戻り値の型を明記します。TypeScriptの型をコメントで繰り返すより、用途・単位・前提条件・変更理由を優先します。JavaScriptでは、必要な型情報をJSDocの型構文で補います。処理途中の判断理由やテンプレート内の説明は、通常のコメントを併用します。

## ESLint

Nuxt公式の`@nuxt/eslint`で、Vue・TypeScript・JavaScriptの推奨ルールをチェックします。
設定は`eslint.config.ts`で、Standard系の規約を提供する`neostandard`と、Nuxtが生成するプロジェクト用の設定を組み合わせます。`ts: true`と`filesTs: ['**/*.vue']`でTypeScriptとVueの`script setup`を対象にし、JSX向けのルールは使いません。neostandardを先に適用し、Vueのパーサー・自動インポートなどは後段のNuxt設定に任せます。TS設定の読み込みにはESLintが対応する`jiti`を使います。
インストール直後は`npm run prepare`で生成ファイルを用意してください。

```sh
npm run lint:eslint
npm run lint:eslint -- --fix
```

自動修正が必要な場合は`-- --fix`を渡します。専用のfixスクリプトは設けず、`npm run lint`はnpm-run-all2の`run-s`で5種類のリンターを順に実行します。整形はneostandardに従い、個別のスタイルルールは追加していません。
トップページはページ遷移アニメーションを使わずFragmentで構成するため、`app/pages/index.vue`だけ単一ルートのルールを例外にしています。

## Secretlint

公式の`@secretlint/secretlint-rule-preset-recommend`で、APIキー・トークン・秘密鍵などの混入をチェックします。設定は`.secretlintrc.js`へ直接記述し、`// @ts-check`と`@secretlint/types`の型定義で設定の構造を検査します。このファイルはSecretlintの専用ローダーがCommonJSとして読み込むため、プロジェクトが`"type": "module"`でも`module.exports`を使います。

```sh
npm run lint:secretlint
```

作業ツリー内のファイルを対象とし、隠しファイルもチェックします。`.gitignore`の対象（依存関係・生成物・`.env`など）とGitの管理データは対象外です。Gitの過去の履歴はスキャンしません。
GitHub Actionsの`secretlint.yml`でも独立して実行します。指摘内容は既定のマスク表示を使い、誤検出があれば該当箇所だけを調整します。

## Stylelint

公式の`stylelint-config-standard`で、`assets/**/*.css`をチェックします。設定は`stylelint.config.ts`です。

```sh
npm run lint:stylelint
npm run lint:stylelint -- --fix
```

`-- --fix`を渡すと自動修正できる指摘を修正します。標準設定のルールを無効にする例外は設けていません。
Vueコンポーネント内には現在`<style>`がないため、CSSファイルだけが対象です。今後Vue内にCSSを書く場合は、Vue用の構文解析設定と対象ファイルを追加してください。
GitHub Actionsの`stylelint.yml`でも実行します。

## markuplint

Vue用の公式推奨設定`markuplint:recommended-vue`と`@markuplint/vue-parser`・`@markuplint/vue-spec`を使い、`app/**/*.vue`のHTML構造・属性・アクセシビリティをチェックします。設定は`markuplint.config.ts`です。`@markuplint/ml-config`の型定義で設定の構造を検査します。

```sh
npm run lint:markuplint
```

警告も失敗として扱い、GitHub Actionsの`markuplint.yml`でも実行します。JavaScript・TypeScriptやVueコードのチェックは引き続きESLintが担当します。
カスタムコンポーネントを展開した最終HTMLの検証は行いません。

`list-style: none`を指定したリストがSafariでもリストとして読み上げられるよう、`ul`の`role="list"`は維持しています。この要素に限り、暗黙のroleと重複するという指摘を除外します（[MDNの説明](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style#accessibility)）。
その他の指摘はテンプレート側で修正し、見出しとメニューのIDはVueの`useId()`で生成します。

## lockfile-lint

`lockfile-lint.config.js`で`package-lock.json`を検査します。取得先をnpm公式レジストリのHTTPSに限定し、パッケージ名と取得先URLの一致、SHA-512ハッシュの欠落・形式不正をチェックします。ホスト名のない取得先も許可せず、例外指定は設けていません。

```sh
npm run lint:lockfile
```

`npm run lint`にも含め、GitHub Actionsの`lockfile-lint.yml`で独立して実行します。チェック対象はURLやlockfileの整合性情報です。配布物の内容とハッシュの照合はnpmが行い、既知の脆弱性の確認には別途`npm audit`を使います。

## TypeScriptと型チェック

Vueの処理は`<script setup lang="ts">`、共通処理は`app/composables/*.ts`で記述します。
`app/types/content.ts`が一覧データとカードのprops、`app/types/ui.ts`がアイコン名・テーマ設定の型を定義します。
元データは引き続き`modules/*.json`で編集できます。作品の分類はJSON読み込み時にも検証します。

```sh
npm run typecheck
```

Nuxtが生成する設定を使い、Vueのテンプレート・props・共通処理・Nuxt設定・サーバープラグインをチェックします。
型チェック用の開発依存はTypeScript 6.0.3・vue-tsc 3.3.14・Node.js 26用の型定義です。TypeScript 7は現在のvue-tscでは起動できないため採用していません。
`scripts/*.ts`と`test/**/*.test.ts`はNode.js 26の標準TS対応で実行します。`tsconfig.tools.json`でスクリプト・テスト・リンター設定も検査し、GitHub Actionsでも同じ`npm run typecheck`を使います。Secretlint設定だけはTSに直接対応しないため、`@ts-check`付きの`.secretlintrc.js`を維持します。

## 日本語・英語の更新

- 日本語版: `/ja/`、英語版: `/en/`。入口の`/`から保存した言語・ブラウザ言語に応じて移動します。ヘッダーの`ULocaleSelect`に国旗・現在の言語名（`日本語`・`English`）・下向き矢印を表示し、選択肢から切り替えます。
- プロフィール: `i18n/locales/ja.json`・`en.json`の`profile`が本文、`site.name`・`site.alternateName`が主名義と別表記です。
- 見出し・操作ラベル: 日本語は`i18n/locales/ja.json`、英語は`i18n/locales/en.json`の、それぞれ`ui`を編集します。
- 作品・書籍・登壇など: 日本語は従来の`modules/*.json`、英語は`i18n/locales/en.json`の同じ`key`にある表示文を更新します。
- URL・日付・画像・並び順は共有します。固有名詞は基本的に元の表記を使い、原題と、必要な参考英訳を表示します。
- 日付はJSONと`datetime`属性では`YYYY-MM-DD`を使い、表示は日本語で「2026年11月3日」、英語で「Nov 3, 2026」にします。Vue I18nの書式は`i18n/i18n.config.ts`で管理し、日付が端末のタイムゾーンでずれないようUTCに固定しています。
- 登壇の題名・イベント名は英語版でも原名を主に表示します。参考英訳は`englishTitle`・`englishEventTitle`に記述し、補足として添えます。
- 寄稿した章名も原題を残します。`modules/books.json`の`chapterTitle`が原題、英語データの`englishChapterTitle`が参考英訳、`contributionLabel`が寄稿を示す説明です。
- 言語・翻訳・ルーティングは`@nuxtjs/i18n`（内部でVue I18nを使用）で管理します。既定は日本語です。初回の`/`アクセス時にブラウザ言語を判定し、英語なら`/en/`へ移動します。対応しない言語は`/ja/`へ移動します。選択言語は`i18n_redirected` Cookieへ保存し、ブラウザ言語より優先します。`/ja/`・`/en/`を直接開いた場合は、保存済みの設定やブラウザ言語にかかわらず指定した言語で表示します。静的サイトのため、自動転送はJavaScript実行後に行われます。
- 操作ラベルはVue I18nの`t()`、一覧の表示文は`app/composables/useSiteLocale.ts`の`localize()`を使います。言語切り替えは`AppHeader.vue`で`useI18n().setLocale()`を使用し、メニューの選択を受け取ります。
- 言語別のSEO情報は`useLocaleHead()`で生成します。OGPの説明は`i18n/locales/*.json`の`description`を編集します。
- Nuxt I18nの`prefix`構成を使います。言語別ページは静的HTML、入口はCSR用HTML（`200.html`）から生成します。言語判定・転送はモジュールに任せ、JavaScriptが無効な場合の専用処理は用意しません。
- ヘッダーは`UHeader`を使い、言語選択は`USelectMenu`、テーマ選択は`UColorModeSelect`で提供します。トリガーは44pxの円形アイコンとし、選択肢には文字を表示します。言語には国旗を使わず、検索欄も表示しません。寸法・配色は共通テーマと`AppHeader`の`iconSelectUi`で調整します。
- 両言語を静的HTMLとして生成し、それぞれに`lang`・canonical・OGP説明と、相互参照の`hreflang`を出力します。

## フォント

本文・見出しには端末に搭載されたフォントを使います。Macではヒラギノ、Windowsでは游ゴシック・メイリオを優先し、それらがない場合は`system-ui`・`sans-serif`へフォールバックします。ウェブフォントの取得や配信は行いません。

書体・文字幅・改行位置は端末によって異なります。文字サイズと行間、折り返せるレイアウトで読みやすさを保ちます。本文や各部の配置はコンポーネントのTailwindクラス、部品の外観は`app/app.config.ts`のテーマで調整します。

## 画像の最適化

プロフィール画像・書籍の表紙・登壇資料の表紙は`NuxtPicture`で表示します。
元画像は`public/`へ置き、従来どおり画像のパスを指定してください。事前の変換は不要です。
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
- 著者・OGP・Xカードのメタ情報と、共有画像の説明を出力します。共有画像は日本語版が`public/ogp.png`、英語版が`public/en/ogp.png`（どちらも1200×630pxのPNG）で、共有元のページの言語に合わせて選びます。Xカードは`summary_large_image`を使います。文字はmacOSのヒラギノ角ゴシックで描画しています。背景素材と再生成手順は`design/ogp/`、Node.jsでの再生成は`npm run generate:ogp`で実行します。書き出しスクリプトは`scripts/generate-ogp.ts`にあります。
- 著者名と構造化データの人物名・サイト名は表示言語に合わせます。英語版では`Munieru`を主表記にし、構造化データの`alternateName`に日本語表記を残します。日本語版では主表記と別名を逆にします。
- JSON-LDで`WebSite`と`ProfilePage`・`Person`を出力します。公開アカウントとの対応は`modules/links.json`から取得します。
- `nuxt.config.ts`が共通設定、`app/pages/index.vue`が言語別メタ情報、`server/plugins/sitemap.ts`がサイトマップの`x-default`の調整を担当します。

## 設定

公開設定の既定値は`scripts/config.ts`に定義し、同名の環境変数で上書きできます。公開先の設定は生成時に反映します。

- `ORIGIN`: 公開サイトのオリジン。既定は `https://munieru.jp/`
- `BASE_DIR`: 公開パス。既定は `/`。サブディレクトリなら `/portfolio/` など
- `OG_IMAGE_PATH`: 日本語版・ルート入口のOGP画像のパス。公開パスからの相対指定か絶対URL
- `OG_IMAGE_PATH_EN`: 英語版のOGP画像のパス。公開パスからの相対指定か絶対URL
- `X_ID`: Xアカウント名
- 各支援URL: 空文字を指定するとそのボタンを表示しません

従来との互換性のため、GitHub Sponsorsの設定キーは既存の `GITHUB_SPONSOERS_URL` を引き続き使います。
公開用設定に秘密情報を追加しないでください。

## 表示・操作

プロフィール・リンク・全作品・書籍・登壇・OGPは、ビルド時のHTMLに含めます。
JavaScriptが無効でも内容とリンクを閲覧でき、画像はすべて同じサイトから配信します。
作品は公開日の新しい順に全件を常時表示します。分類による絞り込みの再検討は[Issue #447](https://github.com/munierujp/munieru.jp/issues/447)で扱います。
リンク移動そのものにはJavaScriptを使いません。

テーマはシステム・ライト・ダークから選択でき、ブラウザへ保存します。
保存できない環境ではそのページ内で切り替えます。OS設定の変更と別タブからの変更にも追従します。
Nuxt UIが自動登録するNuxt Color Modeと`useColorMode()`で、初期描画前の適用・OS追従・保存を行います。保存キーは従来と同じ`app-theme`です。自作のテーマスクリプト・DOM同期プラグイン・`window.appTheme`は使いません。
静的HTMLでは保存値が分からないため、`UColorModeSelect`はクライアント初期化まで無効なシステム選択のフォールバックを表示します。読み上げ名もモジュールの`unknown`がfalseになるまでsystemに揃えます。別タブの変更だけは`AppHeader`のstorageイベントでpreferenceへ反映します。
メニューの開閉・キー操作・フォーカス管理はライブラリへ委譲します。
アクセント色と本文色はNuxt UI標準のcyan・zincです。`app/app.config.ts`でパレットを選びます。各セクションの見出しは、左に細いラインを付けています。本文と一緒にスクロールし、画面上部には固定しません。作品・書籍・登壇は日付の新しい順で固定表示します。

## 存在しないURL

存在しないURLは専用の404画面を表示せず、トップページへ自動移動します。
Netlifyではビルド時に`dist/_redirects`へ302転送ルールを生成し、`/ja/*`は日本語トップ、`/en/*`は英語トップ、それ以外は言語判定の入口へ転送します。既存ファイルは転送せず通常配信します。
付属のプレビューサーバーも同じ転送を行います。転送専用のVueページは用意せず、公開時はNetlifyの転送機能を使います。

## npm設定

直接の依存はNuxt・Vue・Vue Router・Nuxt I18n・Nuxt Image・Nuxt Sitemap・Nuxt UI・Tailwind CSSで、バージョンを固定しています。
`.npmrc` ではインストール時のスクリプト実行抑止、バージョン固定、対応npmでの公開後7日間の待機を設定しています。
`min-release-age` が適用されるかは使用するnpmの対応状況によります。

## Nuxt UIの構成

- ボタン・バッジは`UButton`・`UBadge`を直接使い、色・サイズ・形の共通設定は`app/app.config.ts`へ置きます。外部リンクの`to`・`external`・`target`・`rel`は使う場所で指定します。
- `AppCard`はカードのレイアウトと主リンク・補助リンクの構造を保ち、外枠をライブラリに置き換えています。
- 言語は国旗＋現在の言語、テーマは状態アイコン＋設定名を表示する高さ44pxのセレクトです。GitHub・資料へのアイコンリンクは円形です。
- 既存の静的HTMLテストは、ライブラリの追加クラスやHTMLタグの大文字小文字に依存せず、表示ラベルと初期トリガーを確認します。メニュー項目の実操作はブラウザでも検証します。
- フォントは端末搭載の書体を使うため自動フォントだけを無効にします。テーマ選択はNuxt UIのColor Mode連携を使い、メニュー用のLucideアイコンはローカルにバンドルします。

### ページ遷移の通知

`app/app.vue`の`NuxtRouteAnnouncer`で、言語切り替えなどに伴うページタイトルの変更を支援技術へ通知します。標準の`polite`設定を使い、見た目やキーボードのフォーカスは変更しません。

### フッター

`AppFooter`内の`UFooter`で著作権表記をフッター全体の中央へ、XアカウントとサイトのGitHubリポジトリへの円形アイコンリンクを右側へ配置します。スマホでも同じ行に並べ、左右の領域を同じ幅にして中央位置を保ちます。リンクには日英の読み上げ名・ツールチップを付け、別タブで開きます。XのURLは`X_ID`と共有します。

### プロフィールのレイアウト

`AppProfile`は`UPageHero`のtitle・descriptionスロットと画像用の標準スロットを使います。名前は見出しにせず`p`とし、サイト名の`h1`と役割を分けています。余白を抑え、小さい画面では名前と画像を同じ行、自己紹介をその下に配置します。画像のAVIF・WebP生成は`NuxtPicture`で継続します。

### 一覧セクション

リンク・スキル・作品・書籍・登壇・支援は`UPageSection`を使い、見出しを`title`、一覧や操作を`body`スロットへ渡します。幅・上下余白・h2の左ライン・文字サイズは`app/app.config.ts`の`ui.pageSection`で一括調整します。各コンポーネントはデータと本文を担当します。

### ヘッダー

`AppHeader`は`UHeader`の背景・下線・追従を使用します。1ページ構成のため、サイト名は`left`スロットの`h1`として表示し、リンクにしません。ナビゲーションがないためメニューの開閉ボタンは表示しません。言語・テーマのトリガーには現在の状態を含む読み上げ名を付け、スマホでも44pxの操作領域を保ちます。

### カード一覧のグリッド

作品・書籍・登壇は`UPageGrid as="ul"`と`li`で一覧を構成します。`app/app.config.ts`の`ui.pageGrid.base`で、カード最小幅30rem・狭い画面で1列・十分な幅で2列となる配置と12pxの間隔を共通管理します。標準の画面幅別の列数指定も上書きし、従来のコンテナー幅に応じた列数を維持します。

### テストの実行単位

`npm test`（`npm run test:unit`）は`test/unit/`の7件を実行し、Nuxtの準備や`dist`を必要としません。公開設定の正規化・不正値・Nodeと型定義の整合と、Lighthouseの集計を検証します。生成HTML・画像・配信サーバーの14件は`test/integration/`へ分け、`npm run build`後に`npm run test:integration`で実行します。CIはこの順序で各検証を一度ずつ実行します。

### Node用の型検査設定

Nuxt本体は生成されたTSConfigを使用し、ツール用の`tsconfig.tools.json`だけ`@tsconfig/node26/tsconfig.json`を継承します。Node 26向けのtarget・lib・module・Node型・skipLibCheck等は共有設定へ任せ、厳格な検査と、Node標準のTS実行・JSON読込に必要な設定はこのリポジトリで指定します。バージョンは`.npmrc`の公開後7日以上の方針に従い、26.0.1を固定しています。
