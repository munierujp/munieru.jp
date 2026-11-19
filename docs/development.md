# 開発・検証ガイド

環境構築、ビルド、型チェック、リンター、公開設定の手順をまとめます。
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

`http://localhost:3000/` で確認できます。
Vue・CSS・データを保存すると、開発画面に反映されます。
別のポートを使う場合は `npm run dev -- --port 3001` などで指定します。

## ビルド・検証・プレビュー

```sh
npm run lint
npm run typecheck
npm run generate
npm run preview
```

`npm run build`は`nuxt build`、`npm run generate`は`nuxt generate`を実行します。
Netlifyへの静的公開とローカルプレビューには、事前描画する`npm run generate`を使います。
公開するファイルはNuxt標準の `.output/public/` に出力します。Netlifyにも同じコマンド・出力先を `netlify.toml` で指定しています。
Nuxtが互換用に作成する`dist`は、この出力先へのリンクです。生成物としてGit管理・型チェックから除外します。
本番用のNodeサーバーやAPIは不要です。

`npm run preview`はNuxt標準の`nuxt preview`で生成済みのサイトを配信します。
この静的構成では内部で`serve`を使うため、起動時の自動取得を避ける目的で開発用依存に固定しています。
先に`npm run generate`を実行してください。変更後は再生成してプレビューを再起動します。
開発サーバーと同時に使う場合は、`PORT=4175 npm run preview`などで別のポートを指定してください。
起動時に表示されるURLを開きます。
編集しながら確認する場合は、自動反映される`npm run dev`を使います。
Netlify固有の転送ルールは`public/_redirects`で管理し、NetlifyのDeploy Previewで確認します。

## GitHub Actions

PR・既定ブランチ（master）へのpush・手動実行で、以下のチェックをそれぞれ実行します。

- `.github/workflows/eslint.yml`・`secretlint.yml`・`stylelint.yml`・`markuplint.yml`: リンターごとに独立して実行
- `.github/workflows/typecheck.yml`: TypeScriptの型チェック

各ワークフローは`.nvmrc`のNode.jsを使い、`npm ci`と`npm run prepare`を先に実行します。
公式ActionsはリリースのコミットSHAで固定し、権限は`contents: read`のみです。
公開はNetlify、依存更新はRenovateで行います。

生成HTML・画像・配信サーバーの結合テストは[Issue #451](https://github.com/munierujp/munieru.jp/issues/451)で管理します。

## TypeScriptと型チェック

Vueの処理は`<script setup lang="ts">`、共通処理は`app/composables/*.ts`で記述します。
`app/types/`で型を主な責務ごとに分け、ファイル名を型名に合わせています。`ServiceLink.ts`・`SupportLink.ts`・`Skill.ts`・`Work.ts`・`Book.ts`・`Talk.ts`がコンテンツ、`LocalizedText.ts`が対応言語ごとの表示文の型、`IconName.ts`がUIのアイコン名の型です。作品分類の補助型`WorkCategory`は`Work.ts`に置きます。テーマ選択の表示設定はNuxt UIの`SelectMenuProps`で検査し、各カードは`UPageCard`の標準スロットを直接使います。
一覧の元データは`app/data/*.ts`で編集できます。各配列は`Skill[]`・`Work[]`などの型注釈で対応する型を検査し、必須項目の不足や作品分類の誤記を`npm run typecheck`で検出します。

```sh
npm run typecheck
```

Nuxtが生成する設定を使い、Vueのテンプレート・props・共通処理・Nuxt設定をチェックします。
型チェック用の開発依存はTypeScript 6.0.3・vue-tsc 3.3.14・Node.js 26用の型定義です。TypeScript 7は現在のvue-tscでは起動できないため採用していません。
`scripts/*.ts`はNode.js 26の標準TS対応で実行します。`tsconfig.tools.json`では`@tsconfig/node26`・`@tsconfig/node-ts`・`@tsconfig/strictest`を重ね、配列要素の未存在・未使用変数・省略可能プロパティの扱いなども含めてスクリプト・リンター設定を検査し、GitHub Actionsでも同じ`npm run typecheck`を使います。専用ローダーがTSに対応しないSecretlintの設定は、`@ts-check`付きのJSを使います。

`shared/`はNuxtが生成する共有コンテキストの設定で検査します。公開値は`shared/utils/site.ts`、OGP寸法は`shared/utils/ogp.ts`に定義し、Nuxt設定とOGP生成スクリプトでも共有します。

新しいツール用ファイルは隠しファイルも含めて自動探索します。`server/`やレイヤーなど、新しいNuxt用のソース領域を導入するときは、Nuxtとの検査対象の分担を確認し、必要に応じて`tsconfig.tools.json`の除外設定を更新してください。

### 翻訳データの言語型

`LocalizedText`は、Vue I18nが公開する`Locale`を使った`Record<Locale, string>`です。`Locale`はNuxt I18nが`nuxt.config.ts`の対応言語から生成する型に従うため、言語名を別の型へ重複して列挙しません。
言語を追加してNuxtの型を再生成すると、`LocalizedText`を使うデータにも追加言語の表示文が必須となり、翻訳の不足を型検査で検出できます。生成型の準備には`npm run prepare`を使います。

### コンポーネントのprops

そのコンポーネントだけで使う短いprops型は、`defineProps`へ直接記述します。名前を付けるだけの中継定義を減らし、入力と宣言を同じ場所で読めるようにします。

```ts
defineProps<{
  /** 表紙・寄稿内容・販売先を含む書籍の情報。 */
  book: Book
}>()
```

複数箇所で共有する型や、長く複雑で名前が理解を助ける型は名前付きで残します。`Book`・`Work`などのコンテンツ型も共有するため、インライン化しません。

既定値を指定する場合は、Vue 3.5のリアクティブなprops分割代入を使えます。`AppIconImage`の`size = 24`のように記述し、分割代入した変数もpropsの変更に追従します。現行の`vue/require-default-prop`規約では、分割代入するBoolean以外の任意propsに既定値の明示が必要なため、値を補わない場合は`src = undefined`のように記述します。

### 型注釈とsatisfiesの使い分け

変数を共通の型として扱う場合は、`const skills: Skill[] = [...]`のように型注釈を使います。
コンテンツ配列・カードの配置・セレクトの設定・リンター設定はこの方針です。
`satisfies`は適合性を検査しながら、オブジェクト固有のキーなど、より具体的な推論型を後続処理で必要とする場合に使います。
型検査を行うためだけに`satisfies`を選ぶ必要はありません。`as`による型アサーションを、検査の代わりには使いません。

## Node用の型検査設定

Nuxt本体は生成されたTSConfigを使用し、ツール用の`tsconfig.tools.json`で次の3つを継承します。

- `@tsconfig/node26`: Node 26向けのtarget・lib・module・Node型など
- `@tsconfig/node-ts`: NodeでTSを直接実行する際の制約（`erasableSyntaxOnly`・`verbatimModuleSyntax`など）
- `@tsconfig/strictest`: 配列要素の未存在や未使用変数など、`strict`より厳格なチェック

このリポジトリでは型検査だけを行うため`noEmit`を指定します。`node-ts`の`rewriteRelativeImportExtensions`により`.ts`付きimportが許可されるので、`allowImportingTsExtensions`の個別指定は不要です。`allowJs`で型付きJS設定も検査します。プロジェクト全体を再帰的に探索し、新規ディレクトリやドットファイル内のJS・TSも対象にします。VueはNuxtの`vue-tsc`による検査を使います。Nuxtが検査する`app/`・`server/`・`shared/`・`i18n/`などの領域と`nuxt.config.ts`、依存関係・生成物はツール用設定から除外します。他のTSConfigの対象を自動的に差し引く機能はないため、Nuxt側との分担はディレクトリ単位の除外パスで明示しています。新しいツールや設定ファイルごとの登録は不要です。Nodeの直接実行時にtsconfigが読み込まれるわけではなく、これらはTypeScriptによる事前検査の設定です。

## ESLint

Nuxt公式の`@nuxt/eslint`で、Vue・TypeScript・JavaScriptの推奨ルールをチェックします。
設定は`eslint.config.ts`で、Standard系の規約を提供する`neostandard`と、Nuxtが生成するプロジェクト用の設定を組み合わせます。`ts: true`と`filesTs: ['**/*.vue']`でTypeScriptとVueの`script setup`を対象にし、JSX向けのルールは使いません。neostandardを先に適用し、Vueのパーサー・自動インポートなどは後段のNuxt設定に任せます。TS設定の読み込みにはESLintが対応する`jiti`を使います。
インストール直後は`npm run prepare`で生成ファイルを用意してください。

Nuxt設定の`ui.eslint: true`で、Nuxt UI公式の`@nuxt/ui/eslint`も生成設定へ追加します。`npm run prepare`だけでも追加検査を含む設定が生成されるよう、モジュールは`@nuxt/ui`の後に`@nuxt/eslint`を読み込みます。検査エンジンの`eslint-plugin-better-tailwindcss`は開発用依存として指定します。標準設定で有効なのは、生の色指定を制限するルールとクラスの競合検査です。クラスの並び替え・改行や、存在しないクラスの検査は有効にしていません。`--max-warnings=0`を使うため、公式設定の警告も検査失敗として扱います。

公式設定はVueの`class`・`:ui`と、`defineAppConfig`内のテーマのクラスを検査します。Nuxt UIの配色読み取りとクラス検査が設定を追跡できるよう、`app/app.config.ts`の`ui`は変数へ切り出さず直接記述します。配色の定義はここだけに置き、独自の解析処理や色定義の二重管理は追加しません。

```sh
npm run lint:eslint
npm run lint:eslint -- --fix
```

自動修正が必要な場合は`-- --fix`を渡します。専用のfixスクリプトは設けず、`npm run lint`はnpm-run-all2の`run-s`で4種類のリンターを順に実行します。JS・TSの整形はneostandardに従います。Vueテンプレートは`eslint-plugin-vue`の公式`flat/recommended`を使い、属性の順序・1行の属性数・改行・インデントを推奨設定に従って自動修正します。ページ・エラー画面などの命名に関するNuxt固有の例外を維持するため、このプリセットは`nuxt/disables/routes`の前へ追加します。ルールを個別に列挙せず、警告も`--max-warnings=0`で失敗として扱います。
表示ページは`main`をルート要素とし、Nuxtの単一ルートのルールを適用します。`app/app.vue`がヘッダー・ページ・フッターを直接配置し、ページ側で本文の領域を定義します。外枠が1種類のため、レイアウトファイルは設けません。

### ESLint制御コメント

`@eslint-community/eslint-plugin-eslint-comments`のFlat Config用`recommended`を使います。
ルール名のない一括無効化、重複した無効化、無効化・再有効化の対応ミスを検出します。
制御コメントへの理由の記載は、自動検査では要求しません。
不要な無効化の検出は既存のESLint本体の`reportUnusedDisableDirectives`に任せ、プラグインの同等ルールは追加しません。

```ts
// eslint-disable-next-line no-console -- CLIの実行結果を利用者へ表示するため。
console.log(result)
```

このプラグインが検査するのはソース内のESLint制御コメントです。
設定ファイルの`rules`に理由コメントがあるかどうかは検査しないため、レビューで確認します。

### TSDocコメント

`eslint-plugin-tsdoc`の`tsdoc/syntax`をエラーとして適用し、TSファイル（`.ts`・`.mts`・`.cts`）とVueのscript内に書かれたTSDocの構文を検査します。
タグや`@param name - 説明`などの書式を検査しますが、コメントの記載漏れ、説明内容の正しさ、実際の引数との一致までは検査しません。
TSDocの本文でタグではない`@`を書く場合は、インラインコードで囲むかエスケープします。
検査は既存の`npm run lint:eslint`と同じGitHub Actionsで実行します。

### コメントの記載・整合性

`eslint-plugin-jsdoc`は直接の開発用依存として指定し、プロジェクトのコメント検査に使います。
JS（`.js`・`.mjs`・`.cjs`）には`flat/recommended-error`、TS（`.ts`・`.mts`・`.cts`）とVueには`flat/recommended-tsdoc-error`を適用します。
コメントの引数名・説明・戻り値の整合性や、タグ・型の記法などを推奨設定に従って検査します。
関数へのコメントの記載必須化も推奨設定に従い、関数宣言が対象になります。公開APIだけに限定する独自設定は設けません。
TSDoc向けの推奨設定が、TSDocにない型注釈を要求する`require-throws-type`・`require-yields-type`・`require-next-type`を無効にします。個別のルール上書きは設けません。
TSDoc固有の構文は引き続き`tsdoc/syntax`で検査し、JSでは型付きJSDocを利用できます。
検査は`npm run lint:eslint`と既存のESLintワークフローで実行します。

### 翻訳辞書の検査

`@intlify/eslint-plugin-vue-i18n`の公式推奨設定を、`app/`内のVue・TSと`i18n/locales/*.json`へ適用します。Vue・TSのパーサーは既存のNuxt設定を優先し、外部JSON辞書には`jsonc-eslint-parser`を指定して辞書向けの検査を有効にします。辞書のメッセージ構文はVue I18n 11系として検査し、存在しない静的な翻訳キーの参照や翻訳文の直書きも検出します。推奨設定に`no-missing-keys-in-other-locales`を追加し、日英のキー不一致も検出します。日付・分類の区切り記号`/`だけは日英共通のため、直書きを許可します。検査は既存の`npm run lint:eslint`とGitHub Actionsで実行し、警告も失敗として扱います。

未使用キーの削除と動的キーの禁止は有効にしません。作品分類の動的なキーや、Nuxt Site Config・OGP生成が直接参照する辞書項目を維持するためです。動的に組み立てたキーの存在や、TSのコンテンツデータ内にある日英の文章は、この検査では確認できません。コンテンツデータの対応言語の不足は`LocalizedText`の型で検査します。

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

`-- --fix`を渡すと自動修正できる指摘を修正します。パッケージ名によるCSSの読込を維持するため、`import-notation`だけを`string`へ上書きします。その他は標準設定を使います。
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
その他の指摘はテンプレート側で修正します。メニュー内部のIDはNuxt UIへ任せます。

## 設定

公開定数は`shared/utils/site.ts`から名前付きでエクスポートします。アプリではNuxtの自動インポート、Nuxt設定とOGP生成スクリプトでは相対パスのインポートで直接参照し、独自の`runtimeConfig.public`への登録は行いません。ルート配信専用とし、公開URL・リポジトリURL・Xアカウントを環境変数で切り替えません。プレビューでも正規URLとOGP画像内のURLは本番サイトを指します。固定値の変数名はコンスタントケース（`FOO_BAR`）にします。
`nuxt.config.ts`ではテーマ・アイコン・サイトマップ・画像・多言語・メタ情報・静的生成を`defineNuxtConfig`へ直接記述します。設定オブジェクトを項目別の定数へ切り出さず、各項目の前に用途のコメントを置きます。設定の型は`defineNuxtConfig`を通じて検査し、モジュールなどがソースを解析する場合にも設定を読み取れる形を維持します。

- `BASE_URL`: 公開サイトのルートURL。`https://munieru.jp/`のように末尾のスラッシュを含めます。
- `REPOSITORY_URL`: フッターから案内するサイトのソースコードURL
- `X_ID`: 先頭の`@`なしで定義するXアカウント名。メタ情報と、フッター用の`X_URL`で共有します。

日本語は`/`、英語は`/en/`で配信します。OGP画像の出力先は`public/ogp.png`・`public/en/ogp.png`に固定し、サイトの画像URLと生成先で同じ定義を共有します。`BASE_DIR`・`OG_IMAGE_PATH`・`OG_IMAGE_PATH_EN`の環境変数による変更には対応しません。

支援URLは`app/data/supportLinks.ts`だけで管理し、環境変数での上書きは行いません。
公開用設定に秘密情報を追加しないでください。

## npm設定

実行用の直接依存は`package.json`の`dependencies`に記載し、Nuxt・Vue・Vue Router・Nuxt I18n・Nuxt Image・Nuxt Robots・Nuxt Sitemap・Nuxt Schema.org・Nuxt UI・Tailwind CSSのバージョンを固定しています。リンター・型検査・OGP生成・ローカルプレビューに使うツールは`devDependencies`へ置きます。
`.npmrc` ではインストール時のスクリプト実行抑止、バージョン固定、対応npmでの公開後7日間の待機を設定しています。
`min-release-age` が適用されるかは使用するnpmの対応状況によります。

TypeScriptはESLintのTypeScriptパーサーが対応する6系を使います。7系への更新時は、`typescript-eslint`のpeer dependencyの対応範囲を確認してください。
Takumiは2.15.0を維持しています。2.20.0では同じヒラギノのTTCを渡しても名前の字形・文字幅が変わるため、更新時は日英のOGP画像を再生成して比較してください。

## 設定ファイル・コメントの方針

設定項目は設定オブジェクト内へ直接記述し、各項目の前に用途のコメントを置きます。設定を組み立てるためだけに項目別の定数へ切り出すことはしません。設定全体に型を付けてからexportする形は使用でき、Stylelint・Markuplintは`const config: Config = { ... }`を`export default config`で公開します。Nuxt・UIテーマはソース解析との互換性のため、`defineNuxtConfig`・`defineAppConfig`へ直接記述します。複数の処理で共有する公開URLなどの定数は、引き続き共有定義を参照します。

設定ファイルの形式は、利用するツールが対応する範囲で次の順に選びます。TSを読み込むためだけのラッパーは追加しません。

1. `.ts`が使える場合はTypeScript。
2. TS非対応でも型定義がある場合は、`// @ts-check`と型定義を使うJavaScript（`.js`・`.mjs`・`.cjs`）。
3. 型定義がなくてもJavaScriptで書ける場合はJavaScript。
4. JavaScript非対応の場合は、JSONC・JSON5などコメントに対応したJSON形式。
5. JSONC・JSON5の拡張子は非対応でもコメントを読み飛ばせる場合は、`.json`にコメントを記載。
6. いずれも使えない場合は、コメントなしのJSON。

GitHub ActionsのYAML、NetlifyのTOML、`.npmrc`など、JSONも使えず専用の形式が必要な設定はその形式を維持します。翻訳・アイコンのデータJSONと、自動生成するロックファイルは設定ファイルの形式変更方針の対象外です。コンテンツ一覧は型検査のため`app/data/*.ts`で定義します。

ESLint・Stylelint・Markuplint・Nuxt・多言語設定・共有の公開設定はTS、Secretlintは型定義付きのCommonJSを使います。Renovateは`.github/renovate.json`をJSONCとして読み込むため、拡張子を維持してコメントを記載します。`tsconfig.json`は拡張子を維持したままコメントを記載できます。`package.json`はコメントに対応しないため、通常のJSONのままにします。

ルールを追加・上書き・無効化する場合は、設定の直前に理由をコメントで記載します。対象を限定する例外では、その範囲と必要性も記載します。

関数・クラス・型・意味や制約のある変数には、TSDoc形式の`/** ... */`コメントを積極的に記載します。ファイル全体の責務は冒頭の説明コメント、引数は`@param`、戻り値は`@returns`、副作用や設計上の注意は`@remarks`、例外は`@throws`で説明します。独自に定義するオブジェクト型・props・公開設定の各プロパティにもTSDocコメントを記載します。関数宣言と名前付き関数は、`void`・`undefined`を含め戻り値の型を明記します。TypeScriptの型をコメントで繰り返すより、用途・単位・前提条件・変更理由を優先します。JavaScriptでは、必要な型情報をJSDocの型構文で補います。処理途中の判断理由やテンプレート内の説明は、通常のコメントを併用します。
