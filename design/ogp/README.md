# OGP画像の生成

単色の背景に、サイトと共通のプロフィール画像と実際のフォントによる文字を配置し、PNGへ書き出します。プロフィール画像を描き込んだベース画像は使いません。

- プロフィール画像: `../../public/profile.png`（サイトと共通。生成時に円形で配置）
- 背景色・配置: `../../scripts/generate-ogp.ts`の`design`
- 日本語版: `../../public/ogp.png`（ムニエル OFFICIAL SITE / https://munieru.jp/）
- 英語版: `../../public/en/ogp.png`（Munieru OFFICIAL SITE / https://munieru.jp/）

## 再生成

macOSのヒラギノ角ゴシックと、このリポジトリで指定したNode.jsが必要です。依存パッケージをインストールした後、リポジトリのルートで実行します。SwiftやXcode Command Line Toolsは不要です。

`.npmrc`でインストールスクリプトを無効にしているため、初回と`npm ci`で依存関係を入れ直した後は、OGPを生成する前に`canvas`のバイナリを明示的に準備してください。バイナリの取得にはネットワーク接続が必要です。

```sh
npm rebuild canvas --ignore-scripts=false
npm run generate:ogp
```

Automatticの[`canvas`](https://www.npmjs.com/package/canvas)（node-canvas）を使います。名前はヒラギノ角ゴシックW9、OFFICIAL SITEはW6、URLはW3のフォントファイルを直接登録します。macOS以外や必要な書体がない環境では、代替フォントを使わず停止します。フォントファイル自体は配布しません。

## 配置と共通定義

- 出力は1200×630pxのPNG。背景色は`#9CC9DA`、文字色は`#242824`です。
- 名前・サイト名は`../../i18n/locales/ja.json`・`en.json`の`site.name`・`site.title`、表示URLと出力先は`../../scripts/config.ts`から読み込みます。URLはプロトコルと末尾のスラッシュを含めて表示します。
- サイト名は名前とその後ろの部分に分けます。`site.title`は`site.name`に半角スペースを続けて始める形式にします。
- 文字の幅・高さを実フォントで測り、各行の文字領域の左端を64px、上端を名前176px・OFFICIAL SITE 328px・URL 414pxに固定します。448pxのプロフィール画像は左688px・上91pxに固定し、日英で位置を揃えます。
- 長い名前は、画像との間隔64pxと外周64pxの余白を確保できる幅に収まるまで縮小します。文字幅や高さによって文字・画像の開始位置は動かしません。行同士が重なったり下端の余白を超えたりする場合は生成を停止します。
- `canvas`には`letterSpacing`がないため、文字列を書記素単位で扱い、送り幅とカーニングを測定して字間を加えます。結合文字やサロゲートペアの途中では分割しません。
- プロフィール画像は元ファイルを加工せず、中央の正方形を円形にクリップして描画します。背景画像やキャラクターの別素材は不要です。

文字・プロフィール画像はサイトと共通の定義を更新して再生成します。色・寸法・余白はスクリプトで変更します。ビルドとCIは生成済みPNGを配信するため、macOSやフォントは不要です。
