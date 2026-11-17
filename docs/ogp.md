# OGP画像の生成

[Takumi](https://takumi.kane.tw/docs/reference/)の公式Node APIで、単色背景にプロフィール画像と文字を配置してPNGへ書き出します。

- 描画処理・色・配置・文字サイズ: `../scripts/generate-ogp.ts`
- プロフィール画像: `../public/profile.png`（サイトと共通）
- 日本語版: `../public/ogp.png`
- 英語版: `../public/en/ogp.png`

## 再生成

macOSのヒラギノ角ゴシックと、このリポジトリで指定したNode.jsが必要です。依存パッケージをインストールした後、ルートで実行します。

```sh
npm run generate:ogp
```

生成に必要なフォントがない場合は、フォントを用意してから再実行してください。フォントファイルはリポジトリへ追加しません。

## 更新時の確認

寸法は`../constants/ogp.ts`、名前・サイト名は`../i18n/locales/ja.json`・`../i18n/locales/en.json`、公開URLは`../shared/utils/site.ts`で管理します。描画の詳細は生成スクリプトを参照してください。

再生成後は日英両方の画像を開き、文字の収まり・プロフィール画像との重なりを確認します。SNSでの縮小表示を想定して、名前やURLが読めるかも確認してください。

通常のサイトビルド・CI・Netlifyは生成済みPNGを配信し、OGP画像は再生成しません。PNGを更新した場合は、描画定義や表示文と一緒に変更内容を確認してください。
