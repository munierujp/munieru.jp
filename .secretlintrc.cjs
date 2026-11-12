// @ts-check

// Secretlintの設定ローダーに合わせ、CommonJSで公開する。
/** @satisfies {import('@secretlint/types').SecretLintConfigDescriptor} */
module.exports = {
  rules: [
    {
      // APIキー・トークン・秘密鍵などの検出を、公式推奨プリセットにまとめて任せる。
      id: '@secretlint/secretlint-rule-preset-recommend'
    }
  ]
}
