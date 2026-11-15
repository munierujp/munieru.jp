/** 作品JSONを読み込み、分類を検証して表示側へ渡す。 */
import workData from '~~/modules/works.json'
import type { Work } from '~/types/Work'

/** 読み込み時に分類を検証した作品一覧。翻訳・並べ替えは表示側で行う。 */
export const works: Work[] = workData.map((work): Work => {
  const category = work.category
  if (
    category !== 'web' &&
    category !== 'extension' &&
    category !== 'library' &&
    category !== 'cli'
  ) {
    throw new Error(`Unknown work category: ${category}`)
  }
  return { ...work, category }
})
