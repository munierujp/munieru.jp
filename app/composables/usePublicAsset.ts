/**
 * public内のファイルを、公開サブディレクトリに対応するURLパスへ変換する。
 * @returns 先頭のスラッシュを正規化し、BASE_DIRを付ける関数。
 */
export function usePublicAsset (): (path: string) => string {
  const config = useRuntimeConfig().public.siteConfig
  return (path: string): string => config.BASE_DIR + path.replace(/^\/+/, '')
}
