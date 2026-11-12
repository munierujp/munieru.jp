# OGP画像の制作元

`blue-charcoal.png`は採用したOGP画像の元データです。組み込みのimage_genで生成した水色・チャコール文字のデザインを、新しいサイト名に合わせて更新しました。

表示する文字は「ムニエル OFFICIAL SITE」とURL「munieru.jp」だけです。サイト名は2行に分け、単独のローマ字名や追加のコピーは入れていません。背景とキャラクターは従来のデザインを引き継いでいます。

公開用は1200×630pxのPNG（フルカラー・可逆圧縮）として書き出しています。

- 日本語版: `blue-charcoal.png` → `public/ogp.png`（ムニエル OFFICIAL SITE / munieru.jp）
- 英語版: `blue-charcoal-en.png` → `public/ogp-en.png`（Munieru OFFICIAL SITE / munieru.jp）

英語版は日本語版を元に、名前だけを「Munieru」へ差し替えて生成しています。

日本語版の更新時の生成指示:

Use case: text-localization / precise-object-edit. Edit the existing sky-blue OGP banner with the smallest possible change. Preserve the entire smiling grilled fish character with lemon on the right, including its size, placement, pose, expression, outlines, colors, textures and shadow. Preserve the wide social-card composition. Keep only the website name and URL, arranged as three left-aligned lines: "ムニエル" (largest), "OFFICIAL SITE" (bold sans serif), and "munieru.jp" (smaller). Remove the standalone Romanized name "Munieru". Keep all lettering neutral dark charcoal #242824, generous clear margins and balanced spacing. No extra wording, tagline, decoration or watermark.

英語版の生成指示:

Use case: text-localization. Replace only the largest Japanese text "ムニエル" with "Munieru" (capital M, lowercase unieru). Preserve "OFFICIAL SITE" and "munieru.jp", the sky-blue textured background, and all character details, scale, placement and shadow. Keep the same wide composition, dark charcoal lettering and margins. No additional wording or decoration.
