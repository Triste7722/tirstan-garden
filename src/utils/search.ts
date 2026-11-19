// ==========================================================================
// 本地文章搜索
// 覆盖标题 / 摘要 / 标签 / 正文关键词；无第三方依赖。
// 高亮采用「文本分段」而非 v-html，避免注入风险。
// ==========================================================================

import type { Post } from '@/data/posts'

export interface HighlightSegment {
  text: string
  match: boolean
}

export interface PostSearchResult {
  post: Post
  /** 用于结果列表展示的摘要（正文命中时截取片段） */
  preview: string
}

/** 去掉 Markdown 标记，得到用于搜索与摘要的纯文本 */
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\w+-]*/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** 截取命中位置附近的一段文本作为预览 */
function snippet(text: string, query: string, radius = 40): string {
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text.slice(0, 90)

  const start = Math.max(0, index - radius)
  const end = Math.min(text.length, index + query.length + radius)

  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`
}

/** 把文本按查询词切分为高亮 / 非高亮片段 */
export function highlightSegments(text: string, query: string): HighlightSegment[] {
  const q = query.trim()
  if (!q) return [{ text, match: false }]

  const lowerText = text.toLowerCase()
  const lowerQuery = q.toLowerCase()
  const segments: HighlightSegment[] = []

  let cursor = 0
  let index = lowerText.indexOf(lowerQuery)

  while (index !== -1) {
    if (index > cursor) {
      segments.push({ text: text.slice(cursor, index), match: false })
    }
    segments.push({ text: text.slice(index, index + q.length), match: true })
    cursor = index + q.length
    index = lowerText.indexOf(lowerQuery, cursor)
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), match: false })
  }

  return segments
}

/** 搜索文章，返回按数据顺序排列的结果（最多 limit 条） */
export function searchPosts(posts: Post[], query: string, limit = 8): PostSearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const results: PostSearchResult[] = []

  for (const post of posts) {
    const inTitle = post.title.toLowerCase().includes(q)
    const inSummary = post.summary.toLowerCase().includes(q)
    const inTags = post.tags.some((tag) => tag.toLowerCase().includes(q))
    const content = stripMarkdown(post.content)
    const inContent = content.toLowerCase().includes(q)

    if (!inTitle && !inSummary && !inTags && !inContent) continue

    let preview = post.summary
    if (!inSummary && inContent) {
      preview = snippet(content, q)
    }

    results.push({ post, preview })
  }

  return results.slice(0, limit)
}
