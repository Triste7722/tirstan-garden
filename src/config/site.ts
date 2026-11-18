export interface SocialLink {
  label: string
  href: string
  icon?: 'github' | 'mail' | 'x'
}

export interface NavItem {
  label: string
  to: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
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
  description: '写点代码，也写点生活。记录工程实践、设计思考与日常片段。',
  author: {
    name: 'Arch',
    bio: '写点代码，也写点生活。',
    avatar: '',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '文章', to: '/posts' },
    { label: '关于', to: '/about' },
  ],
  social: [],
  footerNote: '用 Vue 3 与 Tailwind CSS 构建，部署于 Nginx。',
  locale: 'zh-CN',
}
