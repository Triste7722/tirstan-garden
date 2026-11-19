// ==========================================================================
// 技能数据
// 页面只负责渲染；新增/调整技能时只需修改此数组。
// ==========================================================================

export type SkillLevel = '入门' | '中级' | '高级'

export interface Skill {
  name: string
  level: SkillLevel
  /** 使用/学习时长文案，如「6 个月」「2 年」 */
  duration: string
  description?: string
}

/** 熟练度 → BaseTag 变体（M3 语义色） */
export type SkillLevelVariant = 'neutral' | 'secondary' | 'primary'

export const skillLevelVariant: Record<SkillLevel, SkillLevelVariant> = {
  入门: 'neutral',
  中级: 'secondary',
  高级: 'primary',
}

export const skills: Skill[] = [
  {
    name: 'AI 辅助开发',
    level: '中级',
    duration: '6 个月',
    description: '和 AI 结对编程：它出活，我拍板',
  },
  {
    name: 'WPS Office',
    level: '中级',
    duration: '2 年',
    description: '文档处理、表格分析和演示汇报',
  },
  {
    name: 'Git / GitHub',
    level: '中级',
    // 原始需求未提供时长，暂以占位符呈现
    duration: '—',
    description: '版本控制与协作开发技能',
  },
  {
    name: '宝塔面板',
    level: '中级',
    duration: '1 年',
    description: '站点部署、HTTPS 证书与 CDN 接入',
  },
  {
    name: 'Halo 主题开发',
    level: '中级',
    duration: '6 个月',
    description: '从模板、样式到后台设置表单的完整主题开发，已上架 Halo 应用商店',
  },
  {
    name: 'CDN 使用与接入',
    level: '中级',
    duration: '9 个月',
    description: 'ESA、EdgeOne 等厂商 CDN：接入、证书与缓存配置',
  },
  {
    name: '界面设计与动效',
    level: '入门',
    duration: '3 个月',
    description: '磨砂玻璃、Banner 多形态、换页过渡动画设计',
  },
  {
    name: 'Android 玩机',
    level: '高级',
    duration: '3 年',
    description: '安卓 Root、刷机、救砖、系统优化与魔改',
  },
  {
    name: 'Windows',
    level: '高级',
    duration: '2 年',
    description: '系统安装与优化、驱动配置、性能调优与疑难排查',
  },
  {
    name: 'MacOS',
    level: '中级',
    duration: '1 年',
    description: '系统日常使用、软件安装与开发环境搭建',
  },
  {
    name: 'Python',
    level: '入门',
    duration: '1 年',
    description: '略懂一二',
  },
  {
    name: 'MySQL',
    level: '入门',
    duration: '5 个月',
    description: '基本数据库建立与维护',
  },
]
