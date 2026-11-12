// @ts-check

/**
 * TS非対応の設定探索から、Node.jsのTS対応を使ってSecretlint設定を読み込む。
 * @packageDocumentation
 */

// SecretlintはTS設定を直接検出しないため、Node.jsのTS対応で設定本体を読み込む。
module.exports = require('./secretlint.config.ts').default
