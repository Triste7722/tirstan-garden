// ==========================================================================
// 精选项目（Featured projects）
// 目前收录 Hyprland 主题/桌面环境配置。新增项目时在此数组追加对象即可。
// ==========================================================================

export interface Project {
  id: string
  name: string
  description: string
  /** 截图路径（位于 public/ 下，以 / 开头） */
  image: string
  tags: string[]
  /** 可选：项目链接 */
  link?: string
  /** 可选：卡片强调色基调 */
  accent?: 'cyan' | 'violet'
}

export const projects: Project[] = [
  {
    id: 'arch-hyprland',
    name: 'Arch Hyprland',
    description:
      '基于 Arch Linux 的 Hyprland 桌面环境配置，含 Wayland 合成、窗口动画与深色配色方案。',
    image: '/projects/arch-hyprland.jpg',
    tags: ['Hyprland', 'Arch Linux', 'Wayland'],
    accent: 'cyan',
  },
  {
    id: 'debian-hyprland',
    name: 'Debian Hyprland',
    description: '在 Debian 上搭建 Hyprland 的实践配置，兼顾稳定性与轻量，适合作为日常开发环境。',
    image: '/projects/debian-hyprland.jpg',
    tags: ['Hyprland', 'Debian', 'Ricing'],
    accent: 'violet',
  },
]
