import type { ServiceLink } from './ServiceLink'

/** 表示名・支援URL・サービスアイコンをまとめた支援先。 */
export interface SupportLink extends ServiceLink {
  /** 翻訳に対応付ける安定した識別子。 */
  key: string
}
