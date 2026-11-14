/**
 * アイコン名とテーマ選択の型を定義する。
 */
/** public/icons.svgに定義したアイコン名。呼び出し側の誤記をコンパイル時に検出する。 */
export type IconName =
  | 'monitor'
  | 'languages'
  | 'chevron-down'
  | 'sun'
  | 'moon'
  | 'github'
  | 'globe'
  | 'code'
  | 'puzzle'
  | 'terminal'
/** 利用者が選択するテーマ。systemはOSの現在の配色へ追従する。 */
export type ThemePreference = 'system' | 'light' | 'dark'
