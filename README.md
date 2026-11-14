[![Netlify Status](https://api.netlify.com/api/v1/badges/df9f63fe-2cb3-4024-a774-9c4bb1affcfc/deploy-status)](https://app.netlify.com/sites/munieru/deploys)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)

# munieru.jp

[ムニエル OFFICIAL SITE](https://munieru.jp/)のソースコードです。
Nuxt 4 / Vue 3を使い、ビルド時にHTMLを生成して静的サイトとして公開します。
Vuetify 4.3.2を使ったUIの比較用ブランチです。元のリニューアルPR（#438）との差分として、ボタン・カード・ラベル・メニューを置き換えています。

## こだわりポイント

- **ダークモード対応**: システム設定・ライト・ダークを選択でき、選択内容を保存します。テーマごとに配色を定義しています。Vuetifyへの初回ダーク設定の同期は検証課題として残しています。
- **レスポンシブデザイン**: スマホから広い画面まで、カードの列数や画像・本文の配置を調整します。小さな画面でもプロフィール画像が見えやすく、サービス名が途中で改行されない配置にしています。
- **日本語・英語対応**: 言語別のURLを用意し、入口ではブラウザの言語や保存した選択に応じて振り分けます。書籍の章名や登壇タイトルは原題を残し、英語版には参考英訳を添えています。
- **タップしやすいリンク**: カード全体を主リンクの操作領域にし、GitHubや発表資料への補助リンクは独立させています。作品は初めから全件表示し、絞り込み時には全件数と表示件数を示します。
- **アクセシビリティへの配慮**: 言語・テーマのメニューはキーボードで操作でき、フォーカス表示や現在の選択状態を伝えます。アイコンだけのリンク・ボタンには用途が分かる名前を付けています。
- **表示速度と外部リソースへの依存低減**: HTMLを静的生成し、画像・アイコンはサイト内から配信します。プロフィール画像や表紙はWebP・画面幅に応じた画像候補・遅延読み込みを使い分け、フォントは端末搭載の書体を優先しています。
- **検索・共有時の表示**: 言語別のタイトル・説明・OGP画像に加え、canonical・hreflang・構造化データ・サイトマップを用意しています。OGP画像はサイトと共通の名前・サイト名を使い、実際のフォントで生成します。

## 開発

`.nvmrc`で指定したNode.jsを使います。nvmを利用する場合は次の手順で起動できます。

```sh
nvm install
nvm use
npm ci
npm run prepare
npm run dev
```

開発サーバーは `http://127.0.0.1:3000/` です。

## ドキュメント

- [開発ガイド](docs/development.md): 環境構築、ビルド、検証、GitHub Actions、構成、設定方針、内容・翻訳の更新
- [OGP画像の生成](design/ogp/README.md): 素材、フォント、再生成手順
