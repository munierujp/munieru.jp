/**
 * パッケージの取得先と整合性情報に対する、lockfileの検査方針を定義する。
 * @remarks 標準の設定探索はTS非対応で、公式の型定義もないためJavaScriptを使う。
 * @packageDocumentation
 */
export default {
  path: 'package-lock.json',
  type: 'npm',
  // 意図しない配布元への差し替えを検知するため、npm公式レジストリだけを許可する。
  'allowed-hosts': ['npm'],
  // ホスト名のないローカルパス等を、許可ホストの検査から素通りさせない。
  'empty-hostname': false,
  // 通信経路をHTTPSに限定し、HTTPの取得先を拒否する。
  'validate-https': true,
  // 同じレジストリ内でも、別名のパッケージへの差し替えを検知する。
  'validate-package-names': true,
  // ハッシュの種類だけでなく、欠落や不完全なSHA-512も検知する。
  'validate-integrity-strict': true
}
