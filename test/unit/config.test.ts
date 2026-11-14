/** 公開設定とNodeのバージョン条件を、Nuxtの準備・ビルドなしで検証する。 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { loadConfig, root } from '../../scripts/config.ts'

test('Nodeと型定義のメジャー・マイナーバージョンを揃える', async () => {
  const version = (await readFile(join(root, '.nvmrc'), 'utf8')).trim()
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert.match(version, /^\d+\.\d+\.\d+$/)
  assert.match(pkg.devDependencies['@types/node'], /^\d+\.\d+\.\d+$/)
  const majorMinor = version.split('.').slice(0, 2).join('.')
  assert.equal(pkg.devDependencies['@types/node'].split('.').slice(0, 2).join('.'), majorMinor)
  assert.equal(pkg.engines.node, version)
  assert.equal(process.versions.node, version)
})

test('サブディレクトリ配信の設定を正規化する', () => {
  const config = loadConfig({ BASE_DIR: '/portfolio', ORIGIN: 'https://example.com/' })
  assert.equal(config.BASE_DIR, '/portfolio/')
  assert.equal(config.BASE_URL, 'https://example.com/portfolio/')
})

test('既定の公開設定を環境変数で上書きする', () => {
  const config = loadConfig({ ORIGIN: 'https://env.example/', X_ID: '@example' })
  assert.equal(config.BASE_URL, 'https://env.example/')
  assert.equal(config.X_ID, '@example')
})

test('不正な公開設定を黙って無視せず失敗させる', () => {
  assert.throws(() => loadConfig({ ORIGIN: 'javascript:alert(1)' }), /ORIGIN/)
  assert.throws(() => loadConfig({ BASE_DIR: 'https://example.com/' }), /BASE_DIR/)
})
