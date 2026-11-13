# OGP画像の生成

背景・キャラクターと文字を分離し、実際のフォントで組版してPNGへ書き出します。

- 文字なし背景: `background.png`（image_genで従来のOGPから文字を除去した素材）
- 書き出しスクリプト: `../../scripts/generate-ogp.ts`
- 日本語版: `../../public/ogp.png`（ムニエル OFFICIAL SITE / munieru.jp）
- 英語版: `../../public/en/ogp.png`（Munieru OFFICIAL SITE / munieru.jp）

## 再生成

macOSのヒラギノ角ゴシックと、このリポジトリで指定したNode.jsが必要です。依存パッケージをインストールした後、リポジトリのルートで実行します。配布済みのネイティブバイナリを利用する場合、SwiftやXcode Command Line Toolsは不要です。

`.npmrc`でインストールスクリプトを無効にしているため、初回と`npm ci`で依存関係を入れ直した後は、OGPを生成する前に`canvas`のバイナリを明示的に準備してください。バイナリの取得にはネットワーク接続が必要です。

```sh
npm rebuild canvas --ignore-scripts=false
npm run generate:ogp
```

Automatticの`canvas`（node-canvas）を使います。名前はヒラギノ角ゴシックW7、OFFICIAL SITEはW6、URLはW3のフォントファイルを直接登録し、描画エンジンによるCSSウェイトの解釈の違いを避けます。文字色は`#242824`、出力は1200×630pxのPNGです。macOS以外や必要な書体が見つからない環境では、代替フォントを使わず停止します。フォントファイル自体はリポジトリへ含めません。

`canvas`には`letterSpacing`がないため、文字列を書記素単位に分け、送り幅とカーニングを測定して字間を加えます。結合文字やサロゲートペアの途中では分割しません。

名前・サイト名は`../../i18n/locales/ja.json`・`en.json`の`site.name`・`site.title`を、表示URLと出力先は`../../scripts/config.ts`の公開設定を参照します。サイト名を主名義とその後ろの文字列へ分け、既存の2行の組版を維持します。`site.title`は`site.name`に半角スペースを続けて始める形式にします。URLはホスト名と公開パスを表示し、プロトコルと末尾のスラッシュは省略します。

文字を変更する場合は共通の定義を編集してから再生成してください。配置・太さはスクリプトで編集します。文字の変更にAIでの画像生成は不要です。背景を変更する場合だけ素材を更新します。ビルドやCIは生成済みPNGを配信するため、macOSやフォントのインストールは不要です。

従来の文字入り生成画像`blue-charcoal.png`・`blue-charcoal-en.png`は、文字なし背景とスクリプトに置き換えました。

## node-canvasへの移行時の比較

2026年11月14日、`@napi-rs/canvas` 1.1.0から`canvas` 3.2.3へ移行しました。同じmacOS・Node.js 26.6.0で、移行直前の生成済みPNGと比較した結果です。

| 比較項目 | 日本語版 | 英語版 |
| --- | --- | --- |
| 画像サイズ（移行前後共通） | 1200×630px | 1200×630px |
| 移行前の容量 | 840,635 bytes | 835,880 bytes |
| 移行後の容量 | 875,207 bytes | 872,990 bytes |
| RGB各成分の平均絶対差（0〜255） | 3.6172 | 5.9935 |
| RGB各成分の二乗平均平方根誤差（0〜255） | 21.6164 | 29.4009 |

背景素材・文字・文字色・指定座標は共通ですが、文字の太さ・幅・アンチエイリアスと背景の縮小処理に差があります。文字領域の幅は、名前が日本語496→493px、英語554→533px、OFFICIAL SITEが474→459px、URLが223→216pxでした。ピクセル単位の完全一致ではありません。PNGはいずれも可逆圧縮で、容量の違いは画質の優劣を示すものではありません。

文字領域は左側640px以内の各行でRGBが`R < 65, G < 70, B < 65`のピクセルを囲む矩形として比較しています。画像全体の誤差は、両PNGをRGBAへデコードしてRGB各成分を比較した値です。

## 旧生成方式とSwift版との比較

以下はSwiftから旧Node.js生成方式（`@napi-rs/canvas`）への移行時の記録で、現在のnode-canvas出力との比較ではありません。変更前（コミット`820d9de`）のPNGと同じmacOS環境で比較しました。両言語とも画像サイズと各行の文字領域・配置は一致し、目視でも従来の構成を維持しています。ただし、画像の拡縮や文字のアンチエイリアスなどの描画処理が異なるため、ピクセル単位の完全一致ではありません。

| 比較項目 | 日本語版 | 英語版 |
| --- | --- | --- |
| 画像サイズ | 1200×630px | 1200×630px |
| RGB各成分の平均絶対差（0〜255） | 0.7503 | 0.8746 |
| RGB各成分の二乗平均平方根誤差（0〜255） | 3.8510 | 5.1311 |

文字領域は左半分の各行でRGBが`R < 65, G < 70, B < 65`のピクセルを囲む矩形として比較しています。画像全体の誤差は、PNGをRGBへデコードして比較した値です。ファイルの圧縮方式の違いは、この値に影響しません。

## 背景作成時の指示

```text
Edit this existing OGP banner to produce a reusable TEXT-FREE BACKGROUND PLATE. Remove ALL lettering on the left: the Japanese name ムニエル, OFFICIAL SITE, and munieru.jp. Fill only the removed letter areas seamlessly with the same sky-blue softly textured background. Keep the entire fish character with lemon on the right, including every outline, color, texture, size, placement, wave, expression, feet, lemon, and ground shadow exactly as in the supplied image. Keep the same wide landscape composition and full-bleed background. Do not move or redesign the character. Do not add ANY text, glyphs, logo, decoration or watermark. The left half must be clean empty blue background suitable for later deterministic typesetting. Preserve the image's 1200:630 aspect ratio.
```
