/**
 * アイコン名とテーマ選択の型を定義する。
 */
/** ローカルのLucideコレクションから使うアイコン名。呼び出し側の誤記をコンパイル時に検出する。 */
export type IconName =
  | 'i-lucide-monitor'
  | 'i-lucide-languages'
  | 'i-lucide-chevron-down'
  | 'i-lucide-sun'
  | 'i-lucide-moon'
  | 'i-lucide-github'
  | 'i-lucide-globe'
  | 'i-lucide-code'
  | 'i-lucide-puzzle'
  | 'i-lucide-terminal'
/** 利用者が選択するテーマ。systemはOSの現在の配色へ追従する。 */
export type ThemePreference = 'system' | 'light' | 'dark'
