# 内容の更新ガイド

プロフィール、リンク、スキル、作品、書籍、登壇と、日本語・英語の更新先をまとめます。
記載するソースパスとコマンドの実行場所は、リポジトリのルートを基準とします。

## 内容の更新

コンテンツ一覧と各項目の日英の表示文は`app/data/*.ts`、見出し・操作ラベル・プロフィールは`i18n/locales/*.json`を編集します。既存の項目をコピーして追加できます。

- 名前・プロフィール本文: `i18n/locales/ja.json`・`i18n/locales/en.json`の`site`・`profile`
- 著作権表記の文面: `i18n/locales/ja.json`・`i18n/locales/en.json`の`site.copyright`。表示する名前は`site.name`、配置は`app/components/AppFooter.vue`
- サイト名（`nuxtSiteConfig.name`）・名前（`site.name`）: `i18n/locales/ja.json`・`i18n/locales/en.json`（ページ・共通設定・OGP画像の生成で共有）
- トップページのOGPの説明: `i18n/locales/ja.json`・`i18n/locales/en.json`の`nuxtSiteConfig.description`
- SNS・各サービス: `app/data/serviceLinks.ts`。サービス名は英語版でも翻訳せず、原表記を共有します
- 活動への支援先: `app/data/supportLinks.ts`（URL・名称・並び順・アイコン）。言語別の表示名は同じ項目の`title: { ja, en }`で管理します。URLは必須とし、掲載をやめる場合は該当項目を削除
- スキル: `app/data/skills.ts`
- 作品: `app/data/works.ts`
- 書籍: `app/data/books.ts`（`imageWidth`・`imageHeight`に表紙の元画像の幅・高さをpx単位で指定）
- 登壇: `app/data/talks.ts`（`url`が発表資料、`eventUrl`がイベントページ）
- 画像など: `public/`。サービスアイコンのICOは最大解像度をPNG化して置きます（[画像の説明](service-icons.md)）
- エラー画面: 案内文は翻訳辞書の`ui.error`、専用の透過イラストは`public/404.png`

作品の `category` は `web`（ウェブアプリ）・`extension`（Chrome拡張機能）・`library`（ライブラリ）・`cli`（CLI）から指定します。
公開終了した作品は `publicationEnded: true` にすると「公開終了」（英語では「Discontinued」）を表示し、作品ページへのリンクを外します。
GitHubリンクはそのまま表示します。作品・書籍・登壇は日付の新しい順に表示します。

作品の`image`に`/work-icons/ファイル名`を指定すると専用アイコンを表示します。
画像が未指定または読み込めない場合は分類アイコンを表示します。既存画像の取得元は[作品アイコンの説明](work-icons.md)に記録しています。

## OGP画像の更新

名前・サイト名（`site.name`・`nuxtSiteConfig.name`）、公開URL（`shared/utils/site.ts`の`BASE_URL`）、プロフィール画像（`public/profile.png`）を変更した場合は、`npm run generate:ogp`で日本語・英語のOGP画像を再生成してください。
ビルドやCIでは自動生成しないため、生成したPNGも変更に含めます。出力先は`public/ogp.png`・`public/en/ogp.png`に固定しています。
実行にはmacOSのヒラギノ角ゴシックが必要です。Takumiの公式Node APIで生成します。[OGP画像の生成手順](ogp.md#再生成)を参照してください。

## 日本語・英語の更新

- 日本語版: `/`、英語版: `/en/`。ブラウザ言語・保存した言語による自動転送は行わず、アクセスしたURLの言語を表示します。ヘッダーの言語切り替えアイコンを押し、`USelectMenu`の選択肢（`日本語`・`English`）から切り替えます。国旗と検索欄は表示しません。
- プロフィール: `i18n/locales/ja.json`・`i18n/locales/en.json`の`profile`が本文、`site.name`・`site.alternateName`が主名義と別表記です。
- 見出し・操作ラベル: 日本語は`i18n/locales/ja.json`、英語は`i18n/locales/en.json`の、それぞれ`ui`を編集します。
- 作品・書籍・登壇など: `app/data/*.ts`の各項目に日英の表示文をまとめます。作品の説明は`description: { ja, en }`、書籍の紹介文は`description: { ja, en }`、形式は`format: { ja, en }`です。スキル名・支援先名は共通なら文字列、言語別なら`{ ja, en }`にします。
- URL・日付・画像・並び順は共有します。リンク先や作品の正式名称を認識しやすくするため、固有名詞は基本的に元の表記を使い、原題と、必要な参考英訳を表示します。
- サービス名・作品名・登壇タイトルの原題に言語指定が必要な場合は、データの`titleLang`へ`ja`などの言語タグを記述します。登壇イベントの原名は`eventTitleLang`です。HTMLの`lang`属性へ直接渡し、文字種からの自動判定はしません。省略した名称はページの言語を継承します。
- 日付は元データと`datetime`属性では`YYYY-MM-DD`を使い、表示はVue I18n標準の`d(date, 'date')`で日本語の「2026年11月3日」、英語の「Nov 3, 2026」に整形します。書式は`i18n/i18n.config.ts`で管理し、日付が端末のタイムゾーンでずれないようUTCに固定しています。
- 登壇の題名・イベント名は英語版でも原名を主に表示します。参考英訳は`app/data/talks.ts`の同じ項目の`englishTitle`・`englishEventTitle`に記述し、補足として添えます。
- 書籍の紹介・寄稿内容は`app/data/books.ts`の`description`に日英それぞれの文章で記述します。寄稿章専用の項目は設けず、章名や参考英訳が必要な場合は紹介文に含めます。原題部分だけの言語指定や、参考英訳を別行にする専用処理は行いません。
- 言語・UI翻訳・ルーティングは`@nuxtjs/i18n`（内部でVue I18nを使用）で管理します。`/`は日本語、`/en/`は英語を常に表示し、利用者が言語を切り替えると対応するURLへ移動します。言語Cookieによる表示言語の上書きは行いません。
- 見出し・操作ラベルはVue I18nの`t()`、一覧の言語別の表示文は`description[locale]`などで取得します。`LocalizedText`型はNuxt I18nの対応言語に従い、言語ごとの表示文の不足を型検査します。一覧の翻訳を結合する独自処理は使いません。言語切り替えは`AppLanguageSelect.vue`で`useI18n().setLocale()`を使用します。選択肢は`locales`、選択中の言語名は`localeProperties.name`から取得し、`nuxt.config.ts`の言語設定に追従させます。
- トップページの言語属性・canonical・hreflangは`useLocaleHead()`で生成します。トップページのOGPの説明は`i18n/locales/*.json`の`nuxtSiteConfig.description`、エラー画面の説明は`ui.error.notFoundDescription`・`ui.error.description`を編集します。
- Nuxt I18nの`prefix_except_default`構成を使い、日本語・英語とも静的HTMLを生成します。入口専用のCSR用HTMLのコピー処理はありません。
- ヘッダーは`UHeader`を使い、言語選択は`USelectMenu`、テーマ選択は`UColorModeSelect`で提供します。トリガーは44pxの円形アイコンとし、選択肢には文字を表示します。言語には国旗を使わず、検索欄も表示しません。寸法・配色は`app/app.config.ts`の共通テーマと`app/utils/iconSelectUi.ts`で調整します。
- 両言語を静的HTMLとして生成し、それぞれに`lang`・canonical・OGP説明と、相互参照の`hreflang`を出力します。
