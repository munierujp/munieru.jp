/**
 * 静的HTML・設定・配信サーバーを、Node.js標準テストで検証する。
 * @packageDocumentation
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { loadConfig, root } from '../scripts/config.ts'
import { Script } from 'node:vm'
import type { ServiceLink, Skill, Work, Book, Talk } from '../app/types/content.ts'

/** テスト対象のローカルJSONを、既存のコンテンツ型に対応付けて読み込む。 */
async function readJson<T> (path: string): Promise<T> {
  return JSON.parse(await readFile(join(root, path), 'utf8')) as T
}
const data = {
  links: await readJson<ServiceLink[]>('modules/links.json'),
  skills: await readJson<Skill[]>('modules/skills.json'),
  works: await readJson<Work[]>('modules/works.json'),
  books: await readJson<Book[]>('modules/books.json'),
  talks: await readJson<Talk[]>('modules/talks.json')
}
const html = await readFile(join(root, 'dist/ja/index.html'), 'utf8')
const englishHtml = await readFile(join(root, 'dist/en/index.html'), 'utf8')
/** テストで使用する、英語の一覧表示文。URLなどは元のJSONに残す。 */
type Translation = { description?: string; englishTitle?: string; englishChapterTitle?: string }
const english = await readJson<{ description: string } & Record<'works' | 'books' | 'talks', Record<string, Translation>>>('i18n/locales/en.json')
/** 必須のHTMLパターンを確認し、不在時は分かるメッセージでテストを失敗させる。 */
function matchRequired (value: string, pattern: RegExp): RegExpMatchArray {
  const match = value.match(pattern)
  assert.ok(match, `HTMLのパターンが見つかりません: ${pattern}`)
  return match
}
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

test('Nodeと型定義のメジャー・マイナーバージョンを揃える', async () => {
  const version = (await readFile(join(root, '.nvmrc'), 'utf8')).trim()
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert.match(version, /^\d+\.\d+\.\d+$/)
  assert.match(pkg.devDependencies['@types/node'], /^\d+\.\d+\.\d+$/)
  const majorMinor = version.split('.').slice(0, 2).join('.')
  assert.equal(pkg.devDependencies['@types/node'].split('.').slice(0, 2).join('.'), majorMinor)
  assert.equal(pkg.engines.node, `~${majorMinor}.0`)
  assert.equal(process.versions.node.split('.').slice(0, 2).join('.'), majorMinor)
})

function metaTag (attribute: string, value: string, document = html) {
  const tag = [...document.matchAll(/<meta\s[^>]*>/g)].map(match => match[0])
    .find(tag => tag.includes(`${attribute}="${value}"`))
  assert.ok(tag, `meta要素がありません: ${attribute}=${value}`)
  return tag
}

test('Nuxtが本文とOGPを静的HTMLとして出力する', () => {
  assert.match(html, /<!DOCTYPE html>/i)
  assert.match(html, /lang="ja"/)
  assert.match(html, /\/_nuxt\//)
  assert.equal(new URL(matchRequired(metaTag('property', 'og:url'), /content="([^"]+)"/)[1]).href, 'https://munieru.jp/ja/')
  assert.ok(metaTag('property', 'og:image').includes('content="https://munieru.jp/ogp.png"'))
  assert.ok([...html.matchAll(/<link\b[^>]*>/g)].some(([tag]) => tag.includes('rel="canonical"') && new URL(matchRequired(tag, /href="([^"]+)"/)[1]).href === 'https://munieru.jp/ja/'))
  for (const entry of [...data.links, ...data.skills, ...data.works, ...data.books, ...data.talks]) {
    assert.ok(html.includes(escapeHtml('title' in entry ? entry.title : entry.name)))
  }
})

test('初期テーマのスクリプトより先にcolor-schemeメタを出力する', () => {
  const meta = metaTag('name', 'color-scheme')
  assert.ok(meta)
  assert.ok(html.indexOf(meta) < html.indexOf('<script id="theme-bootstrap"'))
  for (const id of ['theme-bootstrap', 'theme-controller']) {
    const script = matchRequired(html, new RegExp(`<script id="${id}"[^>]*>([\\s\\S]*?)<\\/script>`))[1]
    assert.doesNotThrow(() => new Script(script), `${id}は通常のJSとして実行できる`)
  }
  assert.ok(!html.includes('src="/site.js"'))
})

test('日英の静的本文・言語指定・canonical・相互参照を出力する', () => {
  assert.match(html, /<html\b[^>]*lang="ja"/)
  assert.match(englishHtml, /<html\b[^>]*lang="en"/)
  assert.ok(englishHtml.includes('otaku and IT engineer based in Edogawa'))
  assert.ok(englishHtml.includes('<h2>Works</h2>'))
  assert.ok(englishHtml.includes('Support my work'))
  assert.ok(englishHtml.includes('Slides in Japanese'))
  assert.ok(englishHtml.includes('Technical zine (Japanese)'))
  assert.ok(metaTag('property', 'og:url', englishHtml).includes('content="https://munieru.jp/en/"'))
  assert.ok(metaTag('name', 'description', englishHtml).includes(escapeHtml(english.description)))
  for (const [document, url] of [[html, 'https://munieru.jp/ja/'], [englishHtml, 'https://munieru.jp/en/']]) {
    const tags = [...document.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag)
    assert.equal(tags.filter(tag => tag.includes('rel="canonical"')).length, 1)
    assert.ok(tags.some(tag => tag.includes('rel="canonical"') && new URL(matchRequired(tag, /href="([^"]+)"/)[1]).href === url))
    for (const [language, target] of [['ja', 'https://munieru.jp/ja/'], ['en', 'https://munieru.jp/en/'], ['x-default', 'https://munieru.jp/']]) {
      assert.ok(tags.some(tag => tag.includes(`hreflang="${language}"`) && new URL(matchRequired(tag, /href="([^"]+)"/)[1]).href === target))
    }
  }
})

test('言語別のタイトル・著者・共有画像の説明と構造化データを出力する', async () => {
  for (const [document, language] of [[html, 'ja'], [englishHtml, 'en']]) {
    const title = language === 'ja' ? 'ムニエル OFFICIAL SITE' : 'Munieru OFFICIAL SITE'
    const name = language === 'ja' ? 'ムニエル' : 'Munieru'
    const alternateName = language === 'ja' ? 'Munieru' : 'ムニエル'
    const imagePath = language === 'ja' ? 'ogp.png' : 'en/ogp.png'
    const image = `https://munieru.jp/${imagePath}`
    assert.ok((await stat(join(root, 'dist', imagePath))).isFile())
    assert.ok(document.includes(`<title>${title}</title>`))
    assert.ok(metaTag('name', 'twitter:card', document).includes('content="summary_large_image"'))
    assert.ok(metaTag('property', 'og:image:width', document).includes('content="1200"'))
    assert.ok(metaTag('property', 'og:image:height', document).includes('content="630"'))
    for (const [attribute, key, value] of [
      ['name', 'author', name],
      ['property', 'og:title', title],
      ['property', 'og:site_name', title],
      ['property', 'og:image', image],
      ['name', 'twitter:title', title],
      ['name', 'twitter:image', image],
      ['property', 'og:image:alt', `${title} / munieru.jp`],
      ['name', 'twitter:image:alt', `${title} / munieru.jp`]
    ]) {
      const tags = [...document.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => tag).filter(tag => tag.includes(`${attribute}="${key}"`))
      assert.equal(tags.length, 1, key)
      assert.ok(tags[0].includes(`content="${value}"`))
    }
    const schemas = [...document.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json))
    const website = schemas.find(schema => schema['@type'] === 'WebSite')
    const profile = schemas.find(schema => schema['@type'] === 'ProfilePage')
    assert.equal(schemas.filter(schema => schema['@type'] === 'WebSite').length, 1)
    assert.equal(website.url, 'https://munieru.jp/')
    assert.equal(website.name, title)
    assert.equal(website.alternateName, `${alternateName} OFFICIAL SITE`)
    assert.equal(profile.url, `https://munieru.jp/${language}/`)
    assert.equal(profile.inLanguage, language)
    assert.equal(profile.isPartOf['@id'], website['@id'])
    assert.equal(profile.mainEntity['@type'], 'Person')
    assert.equal(profile.mainEntity.name, name)
    assert.equal(profile.mainEntity.alternateName, alternateName)
    assert.equal(profile.mainEntity.image, 'https://munieru.jp/profile.png')
    assert.deepEqual(profile.mainEntity.sameAs, data.links.map(link => link.url))
  }
  assert.ok(html.includes('<h1 lang="ja">ムニエル<span class="hero-secondary" lang="en">Munieru</span></h1>'))
  assert.ok(englishHtml.includes('<h1 lang="en">Munieru<span class="hero-secondary" lang="ja">ムニエル</span></h1>'))
})

test('日英のサイトマップとrobots.txtの公開URLが一致する', async () => {
  const index = await readFile(join(root, 'dist/sitemap_index.xml'), 'utf8')
  const locations = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
  assert.deepEqual(locations.sort(), ['https://munieru.jp/__sitemap__/en-US.xml', 'https://munieru.jp/__sitemap__/ja-JP.xml'])
  for (const [language, tag] of [['ja', 'ja-JP'], ['en', 'en-US']]) {
    const sitemap = await readFile(join(root, `dist/__sitemap__/${tag}.xml`), 'utf8')
    assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url), [`https://munieru.jp/${language}/`])
    for (const [alternate, url] of [['ja-JP', 'https://munieru.jp/ja/'], ['en-US', 'https://munieru.jp/en/'], ['x-default', 'https://munieru.jp/']]) {
      assert.ok([...sitemap.matchAll(/<xhtml:link\b[^>]*>/g)].some(([link]) => link.includes(`hreflang="${alternate}"`) && link.includes(`href="${url}"`)))
    }
    assert.ok(!sitemap.includes('<lastmod>'))
  }
  const robots = await readFile(join(root, 'dist/robots.txt'), 'utf8')
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/m)
  assert.match(robots, /Sitemap: https:\/\/munieru\.jp\/sitemap_index\.xml/)
})

test('英語版でも作品・書籍・登壇の内容とリンクを維持する', () => {
  for (const group of ['works', 'books', 'talks'] as const) {
    assert.deepEqual(Object.keys(english[group]).sort(), data[group].map(entry => entry.key).sort())
    for (const entry of data[group]) {
      const translated = english[group][entry.key]
      const text = translated.description || translated.englishTitle || translated.englishChapterTitle
      assert.ok(text)
      assert.ok(englishHtml.includes(escapeHtml(text)))
      if (group === 'books' && 'chapterTitle' in entry && entry.chapterTitle) {
        assert.ok(englishHtml.includes(escapeHtml(entry.chapterTitle)))
        assert.ok(html.includes(escapeHtml('「' + entry.chapterTitle + '」の章を寄稿')))
      }
      if (group === 'talks' && 'eventTitle' in entry) {
        assert.ok(englishHtml.includes(escapeHtml(entry.title)))
        assert.ok(englishHtml.includes(escapeHtml(entry.eventTitle)))
      }
      assert.ok(entry.image)
      const image = entry.image
      assert.ok([...englishHtml.matchAll(/<img\b[^>]*>/g)].some(([tag]) => tag.includes(image)))
    }
  }
  for (const work of data.works) {
    assert.ok(englishHtml.includes(`href="${work.github}"`))
    if (work.publicationEnded) assert.ok(!englishHtml.includes(`href="${work.url}"`))
  }
  assert.equal((englishHtml.match(/class="work-status">Discontinued/g) || []).length, data.works.filter(work => work.publicationEnded).length)
})

test('言語切り替えのURLと言語別ラベルの変数を静的HTMLに解決する', () => {
  for (const [document, language, target] of [[html, 'ja', '/en/'], [englishHtml, 'en', '/ja/']]) {
    assert.ok(document.includes(`class="language-trigger" href="${target}"`))
    assert.ok(document.includes(`aria-checked="true" aria-current="page" data-language-value="${language}"`))
    assert.ok(!document.includes('{title}'))
    assert.ok(!document.includes('{language}'))
    assert.ok(!document.includes('{count}'))
  }
  assert.ok(html.includes(`${data.works.length}件`))
  assert.ok(englishHtml.includes(`${data.works.length} works`))
})

test('公開終了した作品のリンクを外し、GitHubは全件に残す', () => {
  for (const work of data.works.filter(work => work.publicationEnded)) {
    assert.ok(!html.includes(`href="${work.url}"`))
    assert.ok(html.includes(`href="${work.github}"`))
  }
  assert.equal((html.match(/class="[^"]*\bsource-link\b[^"]*"/g) || []).length, data.works.length)
  assert.equal((html.match(/class="work-status">公開終了/g) || []).length, data.works.filter(work => work.publicationEnded).length)
  assert.ok(html.indexOf('命の砂時計</a>') < html.indexOf('#あの日のツイートを表示するやつ</a>'))
})

test('登壇カードのイベントリンク・資料リンクと表紙を維持する', () => {
  for (const talk of data.talks) {
    assert.ok(html.includes(`class="card-primary-link" href="${talk.eventUrl}"`))
    assert.ok([...html.matchAll(/<a\b[^>]*>/g)].some(([tag]) => tag.includes('talk-slides-link') && tag.includes(`href="${talk.slidesUrl}"`)))
    assert.ok([...html.matchAll(/<img\b[^>]*>/g)].some(([tag]) => tag.includes(talk.image)))
  }
})

test('日付の表示を言語別に整形し、datetime属性には元の日付を保持する', () => {
  const dates = [...data.works, ...data.books, ...data.talks].map(entry => entry.date).sort()
  for (const document of [html, englishHtml]) {
    assert.deepEqual([...document.matchAll(/<time datetime="([^"]+)"/g)].map(([, date]) => date).sort(), dates)
  }
  for (const [date, japanese, english] of [
    ['2026-11-03', '2026年11月3日', 'Nov 3, 2026'],
    ['2019-04-14', '2019年4月14日', 'Apr 14, 2019'],
    ['2023-05-18', '2023年5月18日', 'May 18, 2023']
  ]) {
    assert.ok(html.includes(`<time datetime="${date}">${japanese}</time>`))
    assert.ok(englishHtml.includes(`<time datetime="${date}">${english}</time>`))
  }
})

test('更新用データの日付・分類と、ローカル画像の存在を確認する', async () => {
  for (const entry of [...data.works, ...data.books, ...data.talks]) {
    assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(new Date(entry.date).toISOString().slice(0, 10), entry.date)
  }
  for (const work of data.works) assert.ok(['web', 'extension', 'library', 'cli'].includes(work.category))
  for (const entry of [...data.links, ...data.skills, ...data.books, ...data.talks, ...data.works.filter(work => work.image)]) {
    assert.ok(entry.image)
    assert.ok((await stat(join(root, 'public', entry.image))).isFile())
  }
})

test('最適化した画像の全候補を静的ファイルとして出力する', async () => {
  const optimized = [...html.matchAll(/<img\b[^>]*data-nuxt-img[^>]*>/g)].map(([tag]) => tag)
  assert.equal(optimized.length, 1 + data.books.length + data.talks.length)
  const urls = new Set<string>()
  for (const tag of optimized) {
    assert.ok(tag.includes('/_ipx/f_webp'))
    const srcset = matchRequired(tag, /srcset="([^"]+)"/)[1].replaceAll('&amp;', '&')
    for (const candidate of srcset.split(', ')) {
      const [url, width] = candidate.split(' ')
      assert.ok(parseInt(width) >= 96)
      urls.add(url)
    }
  }
  for (const url of urls) {
    const bytes = await readFile(join(root, 'dist', decodeURIComponent(url)))
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
  }
})

test('サブディレクトリ配信の設定を正規化する', () => {
  const config = loadConfig({ BASE_DIR: '/portfolio', ORIGIN: 'https://example.com/' })
  assert.equal(config.BASE_DIR, '/portfolio/')
  assert.equal(config.BASE_URL, 'https://example.com/portfolio/')
})

test('既定の公開設定を環境変数で上書きし、空の支援URLも保持する', () => {
  const config = loadConfig({ ORIGIN: 'https://env.example/', PAYPAL_URL: '' })
  assert.equal(config.BASE_URL, 'https://env.example/')
  assert.equal(config.PAYPAL_URL, '')
  assert.equal(config.GITHUB_SPONSOERS_URL, 'https://github.com/sponsors/munierujp')
})

test('不正な公開設定を黙って無視せず失敗させる', () => {
  assert.throws(() => loadConfig({ ORIGIN: 'javascript:alert(1)' }), /ORIGIN/)
  assert.throws(() => loadConfig({ BASE_DIR: 'https://example.com/' }), /BASE_DIR/)
})

test('存在しないページの転送ルールとJavaScript無効時の自動移動を出力する', async () => {
  const page = await readFile(join(root, 'dist/404.html'), 'utf8')
  assert.match(page, /<meta name="robots" content="noindex, follow">/)
  assert.match(page, /<noscript><meta http-equiv="refresh" content="0;url=\/"><\/noscript>/)
  assert.ok(!page.includes('class="error-page wrap"'))
  const redirects = await readFile(join(root, 'dist/_redirects'), 'utf8')
  assert.match(redirects, /^\/en\/\* \/en\/ 302$/m)
  assert.match(redirects, /^\/ja\/\* \/ja\/ 302$/m)
  assert.match(redirects, /^\/\* \/ 302$/m)
})

test('静的プレビューでGET/HEAD・存在しないURLの転送・不正パスを扱う', async t => {
  const child = spawn(process.execPath, ['scripts/preview.ts'], {
    cwd: root, env: { ...process.env, PORT: '0', HOST: '127.0.0.1', BASE_DIR: '/' }, stdio: ['ignore', 'pipe', 'pipe']
  })
  t.after(() => { child.kill() })
  const origin = await new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('サーバー起動がタイムアウトしました。')), 10000)
    let output = ''
    child.on('error', error => { clearTimeout(timeout); reject(error) })
    child.on('exit', code => { clearTimeout(timeout); reject(new Error(`サーバー終了: ${code}`)) })
    child.stdout.on('data', chunk => {
      output += chunk
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+/)
      if (match) { clearTimeout(timeout); resolve(match[0]) }
    })
  })
  assert.equal((await fetch(origin + '/')).status, 200)
  const sitemapResponse = await fetch(origin + '/sitemap_index.xml')
  assert.equal(sitemapResponse.status, 200)
  assert.match(sitemapResponse.headers.get('content-type') ?? '', /application\/xml/)
  assert.match(await sitemapResponse.text(), /<sitemapindex/)
  const robotsResponse = await fetch(origin + '/robots.txt')
  assert.equal(robotsResponse.status, 200)
  assert.match(robotsResponse.headers.get('content-type') ?? '', /text\/plain/)

  const englishPage = await fetch(origin + '/en/')
  assert.equal(englishPage.status, 200)
  assert.match(await englishPage.text(), /<html\b[^>]*lang="en"/)
  const image = await fetch(origin + '/profile.png', { method: 'HEAD' })
  assert.equal(image.status, 200)
  assert.match(image.headers.get('content-type') ?? '', /image\/png/)
  assert.equal(await image.text(), '')
  for (const [path, target] of [['/missing-page', '/'], ['/ja/missing-page', '/ja/'], ['/en/missing-page', '/en/']]) {
    const response = await fetch(origin + path, { redirect: 'manual' })
    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), target)
    assert.equal(await response.text(), '')
    const destination = await fetch(origin + path)
    assert.equal(destination.status, 200)
    assert.equal(destination.url, origin + target)
  }
  const missingHead = await fetch(origin + '/ja/missing-page', { method: 'HEAD', redirect: 'manual' })
  assert.equal(missingHead.status, 302)
  assert.equal(missingHead.headers.get('location'), '/ja/')
  assert.equal(await missingHead.text(), '')
  assert.equal((await fetch(origin + '/%2e%2e%2fpackage.json')).status, 404)
  assert.equal((await fetch(origin + '/%ZZ')).status, 400)
  assert.equal((await fetch(origin + '/', { method: 'POST' })).status, 405)
})
