// ==========================================================================
// 月度动态时间线（Monthly timeline）
// 按月份分组维护。新增月份时，只需在 `timelineMonths` 数组里追加一个对象，
// 首页的时间线会自动生成「按月切换」的筛选入口，无需改动组件。
// ==========================================================================

export interface TimelineDetail {
  /** 分组标签，例如「晨课 / 午前 / 午后 / 晚课」 */
  label: string
  /** 该分组下的内容 */
  content: string
}

export interface TimelineItem {
  id: string
  /** 日期，格式 YYYY-MM-DD，用于排序与展示 */
  date: string
  /** 标题，显示在时间线节点上 */
  title: string
  /** 一句话摘要，显示在标题下方 */
  summary?: string
  /** 折叠面板内容（内容较长时使用，如「为学」） */
  details?: TimelineDetail[]
}

export interface TimelineMonth {
  /** 月份标识，格式 YYYY-MM，用于筛选匹配 */
  month: string
  /** 展示标签，例如「2026 年 11 月」 */
  label: string
  items: TimelineItem[]
}

export const timelineMonths: TimelineMonth[] = [
  {
    month: '2026-11',
    label: '2026 年 11 月',
    items: [
      {
        id: '2026-11-20',
        date: '2026-11-20',
        title: '为学',
        summary: '晨课温旧授新，午前熟读四书，午后楷书抄写，晚课默写复盘。',
        details: [
          {
            label: '晨课',
            content: '《古文观止》温旧授新，《说文解字》识字训诂。',
          },
          {
            label: '午前',
            content: '《四书》熟读，泛读《诗经》《左传》。',
          },
          {
            label: '午后',
            content: '繁体楷书抄写，仿写练习（AI 批改），泛读《史记》。',
          },
          {
            label: '晚课',
            content: '默写复盘，《传习录》涵泳。',
          },
        ],
      },
      {
        id: '2026-11-17',
        date: '2026-11-17',
        title: '安装 Arch Linux',
        summary: '重新安装了 Arch Linux，并配置了 Hyprland 桌面环境。',
      },
    ],
  },
  {
    month: '2026-10',
    label: '2026 年 10 月',
    items: [
      {
        id: '2026-10-19',
        date: '2026-10-19',
        title: '主页重构',
        summary: '开始维护并重构这个个人主页，视觉风格向 Material Design 3 转型。',
      },
      {
        id: '2026-10-18',
        date: '2026-10-18',
        title: '发布网站雏形',
        summary: '网站雏形发布上线，开始记录折腾与日常。',
      },
    ],
  },
]

/** 按月份倒序返回所有月份（最新月份在前），供时间线切换使用 */
export function getTimelineMonths(): TimelineMonth[] {
  return [...timelineMonths].sort((a, b) => b.month.localeCompare(a.month))
}

/** 按日期倒序返回某个月份的动态 */
export function getMonthItems(month: string): TimelineItem[] {
  return (
    timelineMonths
      .find((m) => m.month === month)
      ?.items.slice()
      .sort((a, b) => b.date.localeCompare(a.date)) ?? []
  )
}
