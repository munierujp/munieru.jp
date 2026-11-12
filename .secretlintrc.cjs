// @ts-check

// SecretlintはTS設定を直接検出しないため、Node.jsのTS対応で設定本体を読み込む。
module.exports = require('./secretlint.config.ts').default
