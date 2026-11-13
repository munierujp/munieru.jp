/**
 * 静的生成したdistを配信し、未定義URLの転送をNetlifyと同じ方針で再現する。
 */
import { createServer } from 'node:http'
import type { ServerResponse } from 'node:http'
import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { loadConfig, root } from './config.ts'

const config = loadConfig()
const output = join(root, 'dist')
if (!existsSync(join(output, 'index.html'))) throw new Error('先に npm run build を実行してください。')
/** 静的ファイルの拡張子に対応するContent-Type。不明な種類はバイナリとして扱う。 */
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
}

/**
 * 見つからないURLを、パス内の言語に対応するトップへ302転送する。
 * @param response - 転送レスポンスの書き込み先。
 * @param pathname - デコード済みのリクエストパス。
 * @remarks 未対応言語や公開パス外のURLは、言語判定用の入口へ転送する。
 */
function redirectToHome (response: ServerResponse, pathname: string): void {
  const language = pathname.startsWith(config.BASE_DIR) ? pathname.slice(config.BASE_DIR.length).split('/')[0] : ''
  const target = language === 'ja' || language === 'en' ? `${config.BASE_DIR}${language}/` : config.BASE_DIR
  response.writeHead(302, { Location: target, 'Cache-Control': 'no-store' }).end()
}

/** GET・HEADだけを受け付け、配信ディレクトリ外へのアクセスを拒否するプレビューサーバー。 */
const server = createServer(async (request, response): Promise<void> => {
  let pathname = config.BASE_DIR
  try {
    if (!['GET', 'HEAD'].includes(request.method ?? '')) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end()
      return
    }
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
    if (!pathname.startsWith(config.BASE_DIR)) {
      redirectToHome(response, pathname)
      return
    }
    const relative = pathname.slice(config.BASE_DIR.length) || 'index.html'
    let filename = resolve(output, relative)
    if (!filename.startsWith(output + sep)) {
      response.writeHead(404).end('Not found')
      return
    }
    let info = await stat(filename)
    // /en/のような静的生成したサブページは、そのディレクトリのindex.htmlを返す。
    if (info.isDirectory()) {
      filename = join(filename, 'index.html')
      info = await stat(filename)
    }
    if (!info.isFile()) throw Object.assign(new Error('Not found'), { code: 'ENOENT' })
    response.writeHead(200, {
      'Content-Type': types[extname(filename)] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    })
    if (request.method === 'HEAD') response.end()
    else createReadStream(filename).on('error', () => response.destroy()).pipe(response)
  } catch (error) {
    if (error instanceof URIError) {
      response.writeHead(400).end('Bad request')
      return
    }
    if (error instanceof Error && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
      redirectToHome(response, pathname)
    } else {
      console.error(error)
      response.writeHead(500).end('Internal server error')
    }
  }
})

const port = Number(process.env.PORT ?? 4173)
const host = process.env.HOST || '127.0.0.1'
server.on('error', error => { console.error(error.message); process.exitCode = 1 })
server.listen(port, host, () => {
  const address = server.address()
  if (address && typeof address !== 'string') console.log(`http://${host}:${address.port}${config.BASE_DIR}`)
})
