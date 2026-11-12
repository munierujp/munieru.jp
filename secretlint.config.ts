/**
 * 秘密情報の混入を検知する公式推奨プリセットを定義する。
 * @packageDocumentation
 */
import type { SecretLintConfigDescriptor } from '@secretlint/types'

export default {
  rules: [
    {
      // APIキー・トークン・秘密鍵などの検出を、公式推奨プリセットにまとめて任せる。
      id: '@secretlint/secretlint-rule-preset-recommend'
    }
  ]
} satisfies SecretLintConfigDescriptor
