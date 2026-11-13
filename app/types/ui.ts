/**
 * アイコン名・テーマ選択と、ブラウザへ公開するテーマAPIの型を定義する。
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

/** assets/theme-init.tsがブラウザへ公開するテーマ操作APIの宣言。 */
declare global {
  interface Window {
    /** 初期化後に利用できるテーマ操作API。SSRや初期化前は存在しない。 */
    appTheme?: {
      /**
       * 選択を保存して適用し、app-theme-changeイベントでUIへ通知する。
       * @param value - システム・ライト・ダークのいずれか。
       */
      setPreference(value: ThemePreference): void
    }
  }
}
