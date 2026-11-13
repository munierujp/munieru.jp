// @ts-check

/**
 * Secretlintの専用ローダーがCommonJSとして読み込む、型定義付きの検出ルール。
 * @packageDocumentation
 */

/** @satisfies {import('@secretlint/types').SecretLintConfigDescriptor} */
module.exports = {
  rules: [
    {
      // APIキー・トークン・秘密鍵などの検出を、公式推奨プリセットにまとめて任せる。
      id: '@secretlint/secretlint-rule-preset-recommend'
    }
  ]
}
