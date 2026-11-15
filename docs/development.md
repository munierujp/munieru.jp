# 開発・検証ガイド

環境構築、ビルド、テスト、リンター、公開設定の手順をまとめます。
記載するソースパスとコマンドの実行場所は、リポジトリのルートを基準とします。

- [内容の更新ガイド](content.md)
- [UI・設計ガイド](design.md)
- [OGP画像の生成](../design/ogp/README.md)

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
npm run generate
npm start
```

`npm run build`は`nuxt build`、`npm run generate`は`nuxt generate`を実行します。
Netlifyへの静的公開とローカルプレビューには、事前描画する`npm run generate`を使います。
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
- `.github/workflows/test.yml`: ビルド不要の単体テスト

各ワークフローは`.nvmrc`のNode.jsを使い、`npm ci`を先に実行します。Nuxtの生成物を利用するチェックでは`npm run prepare`も実行します。lockfile-lintはNuxtを使わないためprepareを実行しません。
公式ActionsはリリースのコミットSHAで固定し、権限は`contents: read`のみです。
公開はNetlify、依存更新はRenovateで行います。

## テストの実行単位

`npm test`は`test/unit/`の4件を実行し、Nuxtの準備や`dist`を必要としません。公開設定の正規化・不正値・Nodeと型定義の整合を検証します。生成HTML・画像・配信サーバーの結合テストは[Issue #451](https://github.com/munierujp/munieru.jp/issues/451)で管理します。

## TypeScriptと型チェック

Vueの処理は`<script setup lang="ts">`、共通処理は`app/composables/*.ts`で記述します。
`app/types/`で型を主な責務ごとに分け、ファイル名を型名に合わせています。`ServiceLink.ts`・`SupportLink.ts`・`Skill.ts`・`Work.ts`・`Book.ts`・`Talk.ts`がコンテンツ、`LocalizedContent.ts`が翻訳対象の対応表、`IconName.ts`・`AppCardUi.ts`がUIの型です。作品分類の補助型`WorkCategory`は`Work.ts`に置きます。セレクトの共有設定はNuxt UIの`SelectMenuProps`、各カードの配置設定は`AppCardUi`に対して`satisfies`で検査します。
一覧の元データは`app/data/*.ts`で編集できます。各配列は`satisfies`で対応する型を検査し、必須項目の不足や作品分類の誤記を`npm run typecheck`で検出します。

```sh
npm run typecheck
```

Nuxtが生成する設定を使い、Vueのテンプレート・props・共通処理・Nuxt設定・サーバープラグインをチェックします。
型チェック用の開発依存はTypeScript 6.0.3・vue-tsc 3.3.14・Node.js 26用の型定義です。TypeScript 7は現在のvue-tscでは起動できないため採用していません。
`scripts/*.ts`と`test/**/*.test.ts`はNode.js 26の標準TS対応で実行します。`tsconfig.tools.json`では`@tsconfig/node26`・`@tsconfig/node-ts`・`@tsconfig/strictest`を重ね、配列要素の未存在・未使用変数・省略可能プロパティの扱いなども含めてスクリプト・テスト・リンター設定を検査し、GitHub Actionsでも同じ`npm run typecheck`を使います。専用ローダーがTSに対応しないSecretlintの設定は、`@ts-check`付きのJSを使います。

## Node用の型検査設定

Nuxt本体は生成されたTSConfigを使用し、ツール用の`tsconfig.tools.json`で次の3つを継承します。

- `@tsconfig/node26`: Node 26向けのtarget・lib・module・Node型など
- `@tsconfig/node-ts`: NodeでTSを直接実行する際の制約（`erasableSyntaxOnly`・`verbatimModuleSyntax`など）
- `@tsconfig/strictest`: 配列要素の未存在や未使用変数など、`strict`より厳格なチェック

このリポジトリでは型検査だけを行うため`noEmit`を指定します。`node-ts`の`rewriteRelativeImportExtensions`により`.ts`付きimportが許可されるので、`allowImportingTsExtensions`の個別指定は不要です。JS設定の検査・JSON読込・パス対応など、このリポジトリ固有の設定を定義します。Nodeの直接実行時にtsconfigが読み込まれるわけではなく、これらはTypeScriptによる事前検査の設定です。

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

警告も失敗として扱い、GitHub Actionsの`markuplint.yml`でも実行します。JavaScript・TypeScriptやVueコードのチェックはESLintが担当します。
カスタムコンポーネントを展開した最終HTMLの検証は行いません。

`list-style: none`を指定したリストがSafariでもリストとして読み上げられるよう、`ul`の`role="list"`は維持しています。この要素に限り、暗黙のroleと重複するという指摘を除外します（[MDNの説明](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style#accessibility)）。
その他の指摘はテンプレート側で修正します。支援セクションの見出しIDはVueの`useId()`で生成し、メニュー内部のIDはNuxt UIへ任せます。

## lockfile-lint

`lockfile-lint.config.js`で`package-lock.json`を検査します。取得先をnpm公式レジストリのHTTPSに限定し、パッケージ名と取得先URLの一致、SHA-512ハッシュの欠落・形式不正をチェックします。ホスト名のない取得先も許可せず、例外指定は設けていません。

```sh
npm run lint:lockfile-lint
```

`npm run lint`にも含め、GitHub Actionsの`lockfile-lint.yml`で独立して実行します。チェック対象はURLやlockfileの整合性情報です。配布物の内容とハッシュの照合はnpmが行い、既知の脆弱性の確認には別途`npm audit`を使います。

## 設定

公開設定の既定値は`scripts/config.ts`に定義し、同名の環境変数で上書きできます。公開先の設定は生成時に反映します。

- `ORIGIN`: 公開サイトのオリジン。既定は `https://munieru.jp/`
- `BASE_DIR`: 公開パス。既定は `/`。サブディレクトリなら `/portfolio/` など
- `OG_IMAGE_PATH`: 日本語版・ルート入口のOGP画像のパス。公開パスからの相対指定か絶対URL
- `OG_IMAGE_PATH_EN`: 英語版のOGP画像のパス。公開パスからの相対指定か絶対URL
- `REPOSITORY_URL`: フッターから案内するサイトのソースコードURL
- `X_ID`: Xアカウント名。`loadConfig()`でフッター用の`X_URL`も生成します（先頭の`@`は除去）。`X_URL`自体は環境変数で上書きしません。

支援URLは`app/data/support.ts`だけで管理し、環境変数での上書きは行いません。
公開用設定に秘密情報を追加しないでください。

## npm設定

直接の依存はNuxt・Vue・Vue Router・Nuxt I18n・Nuxt Image・Nuxt Sitemap・Nuxt UI・Tailwind CSSで、バージョンを固定しています。
`.npmrc` ではインストール時のスクリプト実行抑止、バージョン固定、対応npmでの公開後7日間の待機を設定しています。
`min-release-age` が適用されるかは使用するnpmの対応状況によります。

## 設定ファイル・コメントの方針

設定ファイルの形式は、利用するツールが対応する範囲で次の順に選びます。TSを読み込むためだけのラッパーは追加しません。

1. `.ts`が使える場合はTypeScript。
2. TS非対応でも型定義がある場合は、`// @ts-check`と型定義を使うJavaScript（`.js`・`.mjs`・`.cjs`）。
3. 型定義がなくてもJavaScriptで書ける場合はJavaScript。
4. JavaScript非対応の場合は、JSONC・JSON5などコメントに対応したJSON形式。
5. JSONC・JSON5の拡張子は非対応でもコメントを読み飛ばせる場合は、`.json`にコメントを記載。
6. いずれも使えない場合は、コメントなしのJSON。

GitHub ActionsのYAML、NetlifyのTOML、`.npmrc`など、JSONも使えず専用の形式が必要な設定はその形式を維持します。翻訳・アイコンのデータJSONと、自動生成するロックファイルは設定ファイルの形式変更方針の対象外です。コンテンツ一覧は型検査のため`app/data/*.ts`で定義します。

ESLint・Stylelint・Markuplint・Nuxt・多言語設定・共有の公開設定はTS、Secretlintは型定義付きのCommonJSを使います。lockfile-lintはTS設定と公式の型定義に対応しないため、ES Modules形式の`lockfile-lint.config.js`を使います。Renovateは`.github/renovate.json`をJSONCとして読み込むため、拡張子を維持してコメントを記載します。`tsconfig.json`は拡張子を維持したままコメントを記載できます。`package.json`はコメントに対応しないため、通常のJSONのままにします。

ルールを追加・上書き・無効化する場合は、設定の直前に理由をコメントで記載します。対象を限定する例外では、その範囲と必要性も記載します。

関数・クラス・型・意味や制約のある変数には、TSDoc形式の`/** ... */`コメントを積極的に記載します。ファイル全体の責務は冒頭の説明コメント、引数は`@param`、戻り値は`@returns`、副作用や設計上の注意は`@remarks`、例外は`@throws`で説明します。独自に定義するオブジェクト型・props・公開設定の各プロパティにもTSDocコメントを記載します。関数宣言と名前付き関数は、`void`・`undefined`を含め戻り値の型を明記します。TypeScriptの型をコメントで繰り返すより、用途・単位・前提条件・変更理由を優先します。JavaScriptでは、必要な型情報をJSDocの型構文で補います。処理途中の判断理由やテンプレート内の説明は、通常のコメントを併用します。
