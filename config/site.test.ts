/** Nodeのバージョン条件を、Nuxtの準備・ビルドなしで検証する。 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ROOT } from './site.ts'

test('Nodeと型定義のメジャー・マイナーバージョンを揃える', async () => {
  const version = (await readFile(join(ROOT, '.nvmrc'), 'utf8')).trim()
  const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'))
  assert.match(version, /^\d+\.\d+\.\d+$/)
  assert.match(pkg.devDependencies['@types/node'], /^\d+\.\d+\.\d+$/)
  const majorMinor = version.split('.').slice(0, 2).join('.')
  assert.equal(pkg.devDependencies['@types/node'].split('.').slice(0, 2).join('.'), majorMinor)
  assert.equal(pkg.engines.node, version)
  assert.equal(process.versions.node, version)
})
