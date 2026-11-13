/**
 * アイコン名・テーマ選択と、ブラウザへ公開するテーマAPIの型を定義する。
 * @packageDocumentation
 */
import type icons from '~~/assets/icons.json'

/** assets/icons.jsonに実在するアイコン名。未定義名をコンパイル時に検出する。 */
export type IconName = keyof typeof icons
/** 利用者が選択するテーマ。systemはOSの現在の配色へ追従する。 */
export type ThemePreference = 'system' | 'light' | 'dark'

/** assets/theme-init.tsがブラウザへ公開するテーマ操作APIの宣言。 */
declare global {
  interface Window {
    /** 初期化後に利用できるテーマ操作API。SSRや初期化前は存在しない。 */
    appTheme?: {
      /**
       * 選択を保存して適用し、munieru-theme-changeイベントでUIへ通知する。
       * @param value - システム・ライト・ダークのいずれか。
       */
      setPreference(value: ThemePreference): void
    }
  }
}
