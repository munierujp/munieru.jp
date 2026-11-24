// @ts-check

/**
 * Secretlintの専用ローダーがCommonJSとして読み込む、型定義付きの検出ルール。
 */

/** @satisfies {import('@secretlint/types').SecretLintConfigDescriptor} */
module.exports = {
  rules: [
    {
      // APIキー・トークン・秘密鍵などの検出を、v14組み込みの公式推奨プリセットに任せる（同名パッケージは不要）。
      id: '@secretlint/secretlint-rule-preset-recommend'
    }
  ]
}
