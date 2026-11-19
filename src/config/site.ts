export type SocialIcon = 'github' | 'mail' | 'telegram' | 'x'

export interface SocialLink {
  /** 展示名称，如「QQ 邮箱」「Telegram」 */
  label: string
  /** 展示值，如邮箱地址或 @handle；缺省时回退展示 href */
  value?: string
  href: string
  icon?: SocialIcon
  /** 是否在新标签页打开（外链） */
  external?: boolean
}

export interface NavItem {
  label: string
  to: string
}

export interface SiteConfig {
  name: string
  title: string
  /** 站点正式地址（用于 RSS、分享海报等绝对链接） */
  url: string
  /** 建站日期（YYYY-MM-DD），用于「建站天数」展示 */
  foundedAt: string
  /** ICP 备案号，为空则不展示 */
  icp: string
  description: string
  /** 首页 Slogan，展示在头像下方 */
  slogan: string
  /** 技能标签（首页 Chips） */
  skills: string[]
  author: {
    name: string
    bio: string
    avatar: string
  }
  nav: NavItem[]
  social: SocialLink[]
  footerNote: string
  locale: string
}

export const site: SiteConfig = {
  name: 'Tristan',
  title: 'Tristan — Arch 的个人博客',
  url: 'https://tirster.xin',
  foundedAt: '2026-10-18',
  icp: '',
  description: '写点代码，也写点生活。记录工程实践、设计思考与日常片段。',
  slogan: '浴乎沂，风乎舞雩，咏而归',
  skills: ['Vue 3', 'TypeScript', 'Linux / Arch', 'Hyprland', 'Tailwind CSS', '前端工程'],
  author: {
    name: 'Arch',
    bio: '写点代码，也写点生活。',
    avatar: '/logo.jpg',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '文章', to: '/posts' },
    { label: '技能', to: '/skills' },
    { label: '友链', to: '/friends' },
    { label: '关于', to: '/about' },
  ],
  social: [
    {
      label: 'QQ 邮箱',
      value: '2359814041@qq.com',
      href: 'mailto:2359814041@qq.com',
      icon: 'mail',
    },
    {
      label: 'Gmail 邮箱',
      value: 'bludmoon1975e@gmail.com',
      href: 'mailto:bludmoon1975e@gmail.com',
      icon: 'mail',
    },
    {
      label: 'Telegram',
      value: '@Tristery',
      href: 'https://t.me/Tristery',
      icon: 'telegram',
      external: true,
    },
    {
      label: 'X (Twitter)',
      value: '@truste289936',
      href: 'https://x.com/truste289936',
      icon: 'x',
      external: true,
    },
  ],
  footerNote: '用 Vue 3 与 Tailwind CSS 构建，部署于 Nginx。',
  locale: 'zh-CN',
}
