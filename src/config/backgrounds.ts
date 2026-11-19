// ==========================================================================
// 页面背景图映射（图片位于 public/ 下，以 / 开头）
// 新增页面时只需在此补充路径，无需改动 DynamicBackground 组件。
// ==========================================================================

export const pageBackgrounds: Record<string, string> = {
  '/': '/bg.jpg',
  '/posts': '/bg-posts.jpg',
  '/about': '/bg-about.jpg',
}

/** 文章详情页复用列表页壁纸，保持视觉一致 */
export const postDetailBackground = '/bg-posts.jpg'

/** 未匹配路由的兜底背景 */
export const fallbackBackground = '/bg.jpg'

/** 所有背景图（去重后用于预加载） */
export const allBackgrounds = Array.from(
  new Set([...Object.values(pageBackgrounds), postDetailBackground, fallbackBackground]),
)
