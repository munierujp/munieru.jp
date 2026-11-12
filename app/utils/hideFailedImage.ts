// 表示名は残し、取得できなかった装飾画像だけを非表示にする。
export function hideFailedImage(event: Event) {
  if (event.target instanceof HTMLImageElement) {
    event.target.style.visibility = 'hidden'
  }
}
