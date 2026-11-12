# OGP画像の生成

背景・キャラクターと文字を分離し、実際のフォントで組版してPNGへ書き出します。

- 文字なし背景: `background.png`（image_genで従来のOGPから文字を除去した素材）
- 書き出しスクリプト: `../../scripts/generate-ogp.swift`
- 日本語版: `../../public/ogp.png`（ムニエル OFFICIAL SITE / munieru.jp）
- 英語版: `../../public/en/ogp.png`（Munieru OFFICIAL SITE / munieru.jp）

## 再生成

macOSのヒラギノ角ゴシックとSwift（Xcode Command Line Tools）が必要です。リポジトリのルートで実行します。

```sh
swift scripts/generate-ogp.swift
```

名前はHiragino Sans W7、OFFICIAL SITEはW6、URLはW3で描画します。文字色は`#242824`、出力は1200×630pxのPNGです。書体が見つからない場合は代替フォントを使わず停止します。フォントファイル自体はリポジトリへ含めません。

文字・配置・太さを変える場合はスクリプトを編集して再生成してください。文字の変更に画像生成は不要です。背景を変更する場合だけ素材を更新します。ビルドやCIは生成済みPNGを配信するため、macOSやフォントのインストールは不要です。

従来の文字入り生成画像`blue-charcoal.png`・`blue-charcoal-en.png`は、文字なし背景とスクリプトに置き換えました。

## 背景作成時の指示

Edit this existing OGP banner to produce a reusable TEXT-FREE BACKGROUND PLATE. Remove ALL lettering on the left: the Japanese name ムニエル, OFFICIAL SITE, and munieru.jp. Fill only the removed letter areas seamlessly with the same sky-blue softly textured background. Keep the entire fish character with lemon on the right, including every outline, color, texture, size, placement, wave, expression, feet, lemon, and ground shadow exactly as in the supplied image. Keep the same wide landscape composition and full-bleed background. Do not move or redesign the character. Do not add ANY text, glyphs, logo, decoration or watermark. The left half must be clean empty blue background suitable for later deterministic typesetting. Preserve the image's 1200:630 aspect ratio.
