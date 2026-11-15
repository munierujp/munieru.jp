/**
 * neostandard・Nuxtの規約と、ESLint制御コメント・TSDoc/JSDocのチェックを組み合わせる。
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import { neostandard } from 'neostandard'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import tsdoc from 'eslint-plugin-tsdoc'
import jsdoc from 'eslint-plugin-jsdoc'

// Nuxtが生成するVue・TypeScript・JavaScriptの推奨設定を使う。
export default withNuxt(
  // 無制限の無効化や無効化・再有効化の対応ミスは、公式の推奨設定で検出する。
  eslintComments.recommended,
  {
    name: 'app/eslint-directive-comments',
    rules: {
      // 例外の理由を制御コメント内に残し、後から妥当性を判断できるようにする。
      '@eslint-community/eslint-comments/require-description': 'error'
    }
  },
  {
    name: 'app/tsdoc',
    files: ['**/*.{ts,mts,cts,vue}'],
    plugins: { tsdoc },
    rules: {
      // 積極的に記載するTSDocのタグや記法を、TSとVueのscript内で検査する。
      'tsdoc/syntax': 'error'
    }
  },
  {
    name: 'app/jsdoc',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { jsdoc },
    // JSの型付きコメントにも対応する。TSDoc固有の構文・タグ検査はtsdoc/syntaxに任せる。
    settings: { jsdoc: { mode: 'typescript' } },
    rules: {
      // 公開する関数・クラスの説明漏れを検出し、空のコメントは自動生成しない。
      'jsdoc/require-jsdoc': ['error', {
        publicOnly: true,
        enableFixer: false,
        require: {
          FunctionDeclaration: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
          MethodDefinition: true
        }
      }],
      // 引数名を変更した際に、説明側の更新漏れを検出する。
      'jsdoc/check-param-names': 'error',
      // コメントを書く関数では、各引数の説明項目を省略しない。
      'jsdoc/require-param': 'error',
      // 引数名だけを書いた、説明のない@paramを防ぐ。
      'jsdoc/require-param-description': 'error',
      // 値を返す関数では、戻り値の役割も説明する。voidの説明は要求しない。
      'jsdoc/require-returns': 'error',
      // 戻り値のタグだけを書いた、説明のない@returnsを防ぐ。
      'jsdoc/require-returns-description': 'error',
      // 関数コメントはタグの羅列だけでなく、処理の目的を説明する。
      'jsdoc/require-description': ['error', {
        contexts: ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'MethodDefinition']
      }]
    }
  },
  {
    name: 'app/homepage-fragment',
    files: ['app/pages/index.vue'],
    // トップページはFragmentで構成し、ページ遷移アニメーションは使用しない。
    // Nuxtの単一ルートのチェックは、このページだけ例外にする。
    rules: { 'vue/no-multiple-template-root': 'off' },
  }
).prepend(
  // script setupにもTS規約を適用する。Vueのパーサー・自動インポートは後段のNuxt設定を優先する。
  // JSXは使わないため、対応するルールは読み込まない。
  ...neostandard({ ts: true, filesTs: ['**/*.vue'], noJsx: true })
)
