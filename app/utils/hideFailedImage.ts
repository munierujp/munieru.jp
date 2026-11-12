/**
 * サービス名を残したまま、読み込みに失敗した装飾画像を隠す。
 * @param event - img要素のerrorイベント。
 * @remarks 領域を残してレイアウトの変化を抑える。画像以外のイベント対象には何もしない。
 */
export function hideFailedImage(event: Event) {
  if (event.target instanceof HTMLImageElement) {
    event.target.style.visibility = 'hidden'
  }
}
