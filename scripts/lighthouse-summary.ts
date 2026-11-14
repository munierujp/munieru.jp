/**
 * Lighthouse CIの全実行からカテゴリ別中央値を求め、Actionsのサマリーへ追記する。
 * スコアの合否判定は行わず、結果不足や計測エラーは検査の失敗として扱う。
 */
import { appendFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'

/** filesystemアップロードが生成するmanifestの、集計に必要なフィールド。 */
interface Report {
  url: string
  summary: Record<string, number | null>
}

/** 比較する4カテゴリ。結果は0〜1から100点満点へ換算する。 */
const categories = ['performance', 'accessibility', 'best-practices', 'seo'] as const
const reports = JSON.parse(await readFile(join('lighthouse-reports', 'manifest.json'), 'utf8')) as Report[]
const lines = [
  '## Lighthouse（モバイル）',
  '',
  '日英ページを各3回計測。各カテゴリの中央値（100点満点）です。スコアによる合否判定は行いません。',
  '',
  '| ページ | Performance | Accessibility | Best Practices | SEO |',
  '| --- | ---: | ---: | ---: | ---: |'
]
for (const pathname of ['/ja/', '/en/']) {
  const runs = reports.filter(report => new URL(report.url).pathname === pathname)
  if (runs.length !== 3) throw new Error(`${pathname}: 3回分の計測結果が必要です（実際: ${runs.length}回）`)
  const scores = categories.map(category => {
    const values = runs.map(run => run.summary[category])
    if (values.some(value => typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1)) {
      throw new Error(`${pathname}: ${category}の有効なスコアがありません`)
    }
    const sorted = (values as number[]).sort((a, b) => a - b)
    return Math.round(sorted[1] * 100)
  })
  lines.push(`| ${pathname} | ${scores.join(' | ')} |`)
}
lines.push('', '詳細は成果物 `lighthouse-reports` のHTMLレポートをダウンロードして確認できます。',
  'CI上のシミュレーション値であり、実ユーザーの計測値ではありません。実行環境により変動します。', '')
const summary = lines.join('\n')
console.log(summary)
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary)
