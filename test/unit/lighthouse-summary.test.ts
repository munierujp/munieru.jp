/** Lighthouseの集計が低スコアを許容し、欠けた計測結果を見逃さないことを検証する。 */
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

/** 個々の実行でカテゴリごとに異なるスコアを持つ、日英3回ずつの測定値。 */
function fixture (): Array<{ url: string, summary: Partial<Record<string, number>> }> {
  return ['/ja/', '/en/'].flatMap(pathname => [0, 1, 2].map(index => ({
    url: `http://localhost:1234${pathname}`,
    summary: {
      performance: [0.1, 0.9, 0.5][index],
      accessibility: [1, 0.8, 0.9][index],
      'best-practices': 0,
      seo: 1
    }
  })))
}

/** 実際のCLIを独立した作業ディレクトリで実行し、Actions相当のサマリーも取得する。 */
async function runSummary (reports: ReturnType<typeof fixture>) {
  const cwd = await mkdtemp(join(tmpdir(), 'lighthouse-summary-'))
  try {
    await mkdir(join(cwd, 'lighthouse-reports'))
    await writeFile(join(cwd, 'lighthouse-reports', 'manifest.json'), JSON.stringify(reports))
    const summaryPath = join(cwd, 'summary.md')
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('../../scripts/lighthouse-summary.ts', import.meta.url))], {
      cwd,
      env: { ...process.env, GITHUB_STEP_SUMMARY: summaryPath },
      encoding: 'utf8'
    })
    return { ...result, summary: result.status === 0 ? await readFile(summaryPath, 'utf8') : '' }
  } finally {
    await rm(cwd, { recursive: true, force: true })
  }
}

test('各カテゴリの中央値を出し、0点でも成功してActionsのサマリーへ保存する', async () => {
  const result = await runSummary(fixture())
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.summary, /\| \/ja\/ \| 50 \| 90 \| 0 \| 100 \|/)
  assert.match(result.summary, /\| \/en\/ \| 50 \| 90 \| 0 \| 100 \|/)
  assert.equal(result.stdout.trim(), result.summary.trim())
})

test('片方の言語の計測が不足した場合は失敗する', async () => {
  const result = await runSummary(fixture().slice(0, 5))
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /3回分の計測結果が必要/)
})

test('カテゴリのスコアがない計測結果を成功として扱わない', async () => {
  const reports = fixture()
  reports[0].summary.performance = undefined
  const result = await runSummary(reports)
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /performanceの有効なスコアがありません/)
})
