/** Nodeのバージョン条件を、Nuxtの準備・ビルドなしで検証する。 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('Nodeと型定義のメジャー・マイナーバージョンを揃える', async () => {
  const version = (await readFile(new URL('../.nvmrc', import.meta.url), 'utf8')).trim()
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.match(version, /^\d+\.\d+\.\d+$/)
  assert.match(pkg.devDependencies['@types/node'], /^\d+\.\d+\.\d+$/)
  const majorMinor = version.split('.').slice(0, 2).join('.')
  assert.equal(pkg.devDependencies['@types/node'].split('.').slice(0, 2).join('.'), majorMinor)
  assert.equal(pkg.engines.node, version)
  assert.equal(process.versions.node, version)
})
