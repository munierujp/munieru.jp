/**
 * サービス名を残したまま、読み込みに失敗した装飾画像を隠す。
 * @param event - img要素のerrorイベント。
 * @remarks
 * AppLinks・AppSkills・AppSupportの装飾画像で使用する。Nuxtの自動インポート対象。
 * 領域を残してレイアウトの変化を抑える。画像以外のイベント対象には何もしない。
 */
export function hideFailedImage (event: Event): void {
  if (event.target instanceof HTMLImageElement) {
    event.target.style.visibility = 'hidden'
  }
}
