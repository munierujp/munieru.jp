# OGP画像の生成

[Takumi](https://takumi.kane.tw/docs/reference/)の公式Node APIで、単色背景にプロフィール画像と文字を配置してPNGへ書き出します。

- 描画処理・色・配置・文字サイズ: `../scripts/generate-ogp.ts`
- プロフィール画像: `../public/profile.png`（サイトと共通。円形で配置）
- 日本語版: `../public/ogp.png`（ムニエル OFFICIAL SITE / https://munieru.jp/）
- 英語版: `../public/en/ogp.png`（Munieru OFFICIAL SITE / https://munieru.jp/）

## 再生成

macOSのヒラギノ角ゴシックと、このリポジトリで指定したNode.jsが必要です。依存パッケージをインストールした後、ルートで実行します。

```sh
npm run generate:ogp
```

名前はW9、OFFICIAL SITEはW6、URLはW3を使います。TakumiがTTC内の書体と実ウェイトを直接読み込むため、OTFへの変換は不要です。macOS以外や必要なフォントがない場合は、代替フォントを使わず停止します。

`scripts/generate-ogp.ts`がフォントを一度だけ登録し、サイトと共通のプロフィール画像をメモリー上で読み込みます。型付きのノードツリーに文字・画像とCSSの配置を定義し、`Renderer.render()`の結果を日英の公開パスへ直接書き出します。Nuxtのビルドや一時ファイルの作成は行わず、フォントファイル自体は配布しません。

## 配置と共通定義

- 出力寸法は`../config/ogp.ts`の`OGP_WIDTH`・`OGP_HEIGHT`で共有します。1200×630pxのPNG、背景色は`#9CC9DA`、文字色は`#242824`です。
- 名前・サイト名は`../i18n/locales/ja.json`・`en.json`の`site.name`・`site.title`、表示URLと出力先は`../config/site.ts`から取得します。URLはプロトコルと末尾のスラッシュを含めます。
- 出力先は`public/ogp.png`・`public/en/ogp.png`に固定します。環境変数での保存先変更や、サブディレクトリ配信には対応しません。
- 文字の行ボックスの左端は64px、上端は名前176px・OFFICIAL SITE 328px・URL 414pxです。名前は日本語128px・英語113px、OFFICIAL SITEは64px、URLは44pxです。448pxのプロフィール画像は左688px・上91pxに配置します。
- 文字の字間・円形クリップ・画像の描画はCSSとTakumiへ任せます。現在の表示文に合わせた固定サイズのため、名前やURLを長い文字列へ変える場合は収まりを確認し、必要なら文字サイズを調整します。

通常のサイトビルド・CI・Netlifyは生成済みPNGを配信し、OGP画像は再生成しません。PNGを更新した場合は、描画定義や表示文と一緒に変更内容を確認してください。
