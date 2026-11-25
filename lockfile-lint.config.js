// @ts-check
/** npmの配布元・パッケージ名・SHA-512を検査する。 */
export default {
  // npmの標準lockfileだけを対象にする。
  path: 'package-lock.json',
  type: 'npm',
  // npm公式レジストリのHTTPSに限定し、ホスト名のないURLも拒否する。
  allowedHosts: ['npm'],
  validateHttps: true,
  emptyHostname: false,
  // URLと名前の一致、完全なSHA-512の存在・形式を検査する。
  validatePackageNames: true,
  validateIntegrityStrict: true,
  // @isaacs/cliuiの互換用エイリアス。対応先は補助スクリプトでも照合する。
  allowedPackageNameAliases: [
    'string-width-cjs:string-width',
    'strip-ansi-cjs:strip-ansi',
    'wrap-ansi-cjs:wrap-ansi'
  ]
}
