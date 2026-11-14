// @ts-check

/**
 * Lighthouse CIのrequireローダーへ、Node 26のESM対応でciを公開する計測設定。
 * TSはローダーがJSONとして解釈するため使わず、Lighthouseの型で計測条件を検査する。
 */
export const ci = {
  collect: {
    staticDistDir: './dist',
    // 言語判定用の入口・エラーページを除き、公開する日英のトップだけを計測する。
    url: ['http://localhost/ja/', 'http://localhost/en/'],
    numberOfRuns: 3,
    settings: /** @satisfies {import('lighthouse').Flags} */ ({
      formFactor: 'mobile',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
    })
  },
  // 初期導入ではスコアの下限を設けず、全実行のHTML・JSONを成果物として残す。
  upload: { target: 'filesystem', outputDir: './lighthouse-reports' }
}
