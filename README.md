[![Netlify Status](https://api.netlify.com/api/v1/badges/df9f63fe-2cb3-4024-a774-9c4bb1affcfc/deploy-status)](https://app.netlify.com/sites/munieru/deploys)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)

# munieru.jp

[ムニエル OFFICIAL SITE](https://munieru.jp/)のソースコードです。
Nuxt 4 / Vue 3を使い、ビルド時にHTMLを生成して静的サイトとして公開します。
VuetifyなどのUIライブラリは使わず、CSSで見た目を調整しています。

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
