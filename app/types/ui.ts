import type icons from '~~/assets/icons.json'

export type IconName = keyof typeof icons
export type ThemePreference = 'system' | 'light' | 'dark'

// public/theme-init.jsが公開する、ブラウザ側のテーマ操作API。
declare global {
  interface Window {
    munieruTheme?: {
      setPreference(value: ThemePreference): void
    }
  }
}
