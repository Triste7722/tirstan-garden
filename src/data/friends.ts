// ==========================================================================
// 友链数据
// 页面只负责展示；新增/调整友链时只需修改此数组。
// avatar 可选，未提供时以名称首字生成占位头像。
// ==========================================================================

export interface Friend {
  name: string
  description: string
  link: string
  avatar?: string
}

export const friends: Friend[] = [
  {
    name: '致美化',
    description: '高质量的系统美化与主题资源平台',
    link: 'https://zhutix.com',
  },
]
