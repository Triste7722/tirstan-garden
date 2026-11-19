// ==========================================================================
// 站点公告配置
// 关闭状态按 id 记录在 localStorage，修改 id 即可让公告重新展示。
// ==========================================================================

export interface AnnouncementConfig {
  /** 唯一标识，用于本地记住「已关闭」状态 */
  id: string
  enabled: boolean
  title: string
  message: string
  /** 可选站内链接，如 /skills */
  link?: string
  linkLabel?: string
}

export const announcement: AnnouncementConfig = {
  id: '2026-11-skills',
  enabled: true,
  title: '技能页已上线',
  message: '新增了技能页，记录正在使用和持续打磨的工具与技术。',
  link: '/skills',
  linkLabel: '去看看',
}
