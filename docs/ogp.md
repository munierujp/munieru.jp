# OGP画像の生成

[Nuxt OG Image](https://nuxtseo.com/docs/og-image/getting-started/introduction)のTakumiレンダラーで、単色背景にプロフィール画像と文字を配置してPNGへ書き出します。

- テンプレート・色・配置: `../ogp/app/components/OgImage/SiteCard.takumi.vue`
- 表示文・文字サイズ: `../ogp/app/pages/[[locale]].vue`
- プロフィール画像: `../public/profile.png`（サイトと共通。円形で配置）
- 日本語版: `../public/ogp.png`（ムニエル OFFICIAL SITE / https://munieru.jp/）
- 英語版: `../public/en/ogp.png`（Munieru OFFICIAL SITE / https://munieru.jp/）

## 再生成

macOSのヒラギノ角ゴシックと、このリポジトリで指定したNode.jsが必要です。依存パッケージをインストールした後、ルートで実行します。

```sh
npm run generate:ogp
```

名前はW9、OFFICIAL SITEはW6、URLはW3を使います。TakumiがTTC内の書体と実ウェイトを直接読み込むため、OTFへの変換は不要です。macOS以外や必要なフォントがない場合は、代替フォントを使わず停止します。

`scripts/generate-ogp.ts`がフォントとプロフィール画像を`.cache/ogp/`へ一時配置し、`ogp/`の生成専用Nuxtを実行します。生成HTMLに出力された画像URLからPNGを取得し、日英の公開パスへコピーします。成功・失敗にかかわらず一時ファイルを削除し、フォントファイル自体は配布しません。

## 配置と共通定義

- 出力寸法は`../config/ogp.ts`の`OGP_WIDTH`・`OGP_HEIGHT`で共有します。1200×630pxのPNG、背景色は`#9CC9DA`、文字色は`#242824`です。
- 名前・サイト名は`../i18n/locales/ja.json`・`en.json`の`site.name`・`site.title`、表示URLと出力先は`../config/site.ts`から取得します。URLはプロトコルと末尾のスラッシュを含めます。
- 出力先は`public/ogp.png`・`public/en/ogp.png`に固定します。環境変数での保存先変更や、サブディレクトリ配信には対応しません。
- 文字の行ボックスの左端は64px、上端は名前176px・OFFICIAL SITE 328px・URL 414pxです。名前は日本語128px・英語113px、OFFICIAL SITEは64px、URLは44pxです。448pxのプロフィール画像は左688px・上91pxに配置します。
- 文字の字間・円形クリップ・画像の描画はCSSとTakumiへ任せます。現在の表示文に合わせた固定サイズのため、名前やURLを長い文字列へ変える場合は収まりを確認し、必要なら文字サイズを調整します。

通常のサイトビルド・CI・Netlifyは生成済みPNGを配信し、OGP生成用Nuxtは実行しません。PNGを更新した場合は、テンプレートや表示文と一緒に変更内容を確認してください。
