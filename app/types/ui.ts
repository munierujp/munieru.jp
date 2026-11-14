/**
 * アイコン名とテーマ選択の型を定義する。
 */
/** ローカルのLucideコレクションから使うアイコン名。呼び出し側の誤記をコンパイル時に検出する。 */
export type IconName =
  | 'i-tabler-device-desktop'
  | 'i-tabler-language'
  | 'i-tabler-chevron-down'
  | 'i-tabler-sun'
  | 'i-tabler-moon'
  | 'i-tabler-brand-github-filled'
  | 'i-tabler-world'
  | 'i-tabler-code'
  | 'i-tabler-puzzle'
  | 'i-tabler-terminal-2'
/** 利用者が選択するテーマ。systemはOSの現在の配色へ追従する。 */
export type ThemePreference = 'system' | 'light' | 'dark'
