# サービスリンク・支援先のアイコン

画像の配置先は`public/service-icons/`です。以下のファイル名は、このディレクトリ内のものです。

2026-11-12に取得し、配信用に形式と寸法を変換しています。サイトからはローカルファイルを配信します。

| サービス | ファイル | 取得元 |
| --- | --- | --- |
| GitHub Sponsors | `github.svg` | 既存のGitHubリンクで使用しているアイコンを共用 |
| PayPal | `paypal.png` | https://www.paypalobjects.com/webstatic/icon/favicon.ico |
| Amazon（ほしい物リスト） | `amazon.png` | https://www.amazon.co.jp/favicon.ico |
| giftee | `giftee.png` | https://www.google.com/s2/favicons?domain=giftee.com&sz=64 |

gifteeは公式ファビコンURLで取得できなかったため、サービスのファビコンをGoogleのキャッシュから取得しました。

## 配信用画像

ICOの13ファイルは、収録された最大解像度の画像をPNGとして保存し直しました。名称は拡張子だけを`.ico`から`.png`へ変更しています。元の図柄と透明部分を保ち、不要な複数サイズの同梱をなくしています。
表示時は`AppIconImage`とNuxt Imageで24px・48pxのWebPを静的生成します。画質値は100です。SVGは元のベクターをそのまま配信します。
新しくICOを取得する場合も最大サイズの画像をPNG化し、`app/data/serviceLinks.ts`または`supportLinks.ts`から参照してください。
