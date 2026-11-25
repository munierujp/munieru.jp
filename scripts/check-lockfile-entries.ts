/** lockfile-lintが省略する取得先の欠落と、許可したエイリアスの対応先を検査する。 */
import { readFileSync } from 'node:fs'
import config from '../lockfile-lint.config.js'

/** npm lockfile v3の取得先検査に使うパッケージ情報。 */
interface LockfilePackage {
  /** インストールされるバージョン。 */
  version: string
  /** 配布物のURL。同梱依存では省略される。 */
  resolved?: string
  /** 配布物の整合性情報。同梱依存では親のハッシュが保証する。 */
  integrity?: string
  /** 親の配布物に同梱されているか。 */
  inBundle?: boolean
}

/** lockfile-lintと同じファイルの生エントリーを検査する。 */
const lockfile: {
  /** インストール先をキーとするパッケージ情報。 */
  packages: Record<string, LockfilePackage>
} = JSON.parse(readFileSync(config.path, 'utf8'))

for (const [path, entry] of Object.entries(lockfile.packages)) {
  if (path === '') continue

  // 同梱元の宣言とハッシュは、先に実行するvalidateIntegrityStrictで検査する。
  if (entry.inBundle === true && entry.resolved === undefined && entry.integrity === undefined) continue
  if (typeof entry.resolved !== 'string' || entry.resolved === '') {
    throw new Error(`${path}: 配布物の取得先がありません。`)
  }

  // 上流のallowedPackageNameAliasesは名前検査を省略するため、対応先URLを補完検査する。
  for (const pair of config.allowedPackageNameAliases) {
    const [alias, packageName] = pair.split(':')
    if (!alias || !packageName) throw new Error(`不正なエイリアス設定: ${pair}`)
    if (!`/${path}`.endsWith(`/node_modules/${alias}`)) continue

    const expected = `https://registry.npmjs.org/${packageName}/-/${packageName.split('/').at(-1)}-${entry.version}.tgz`
    if (entry.resolved !== expected) {
      throw new Error(`${path}: エイリアスの取得先が一致しません。期待値: ${expected}`)
    }
  }
}
