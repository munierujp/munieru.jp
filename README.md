[![Netlify Status](https://api.netlify.com/api/v1/badges/df9f63fe-2cb3-4024-a774-9c4bb1affcfc/deploy-status)](https://app.netlify.com/sites/munieru/deploys)
[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)

# munieru.jp

[ムニエル OFFICIAL SITE](https://munieru.jp/)のソースコードです。
Nuxt 4 / Vue 3を使い、ビルド時にHTMLを生成して静的サイトとして公開します。
UIにはNuxt UIを使い、ボタン・カード・バッジ・メニューの見た目と操作を共通化しています。
配色と部品の設定はNuxt UIのテーマ設定、配置はTailwind CSSで管理しています。

## 開発

`.nvmrc`で指定したNode.jsを使います。nvmを利用する場合は次の手順で起動できます。

```sh
nvm install
nvm use
npm ci
npm run prepare
npm run dev
```

開発サーバーは [http://127.0.0.1:3000/](http://127.0.0.1:3000/) です。

## ドキュメント

- [こだわりポイント](docs/features.md): 表示・操作・多言語・アクセシビリティ・配信の工夫
- [内容の更新ガイド](docs/content.md): プロフィール、リンク、作品、書籍、登壇、翻訳の更新
- [開発・検証ガイド](docs/development.md): 環境構築、ビルド、テスト、リンター、GitHub Actions、公開設定
- [UI・設計ガイド](docs/design.md): ページ・コンポーネントの構成、表示・操作、フォント、画像、メタ情報
- [OGP画像の生成](docs/ogp.md): 素材、フォント、再生成手順
