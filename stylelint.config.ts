/**
 * CSSの標準ルールを適用する。独自のルール上書きは行わない。
 */
import type { Config } from 'stylelint'

export default {
  // CSSの基本ルールは標準設定に任せ、独自の上書きは設けない。
  extends: ['stylelint-config-standard']
} satisfies Config
