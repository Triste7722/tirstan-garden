// ==========================================================================
// 文章分享海报（Canvas 手写绘制，无第三方依赖）
// 生成 1200 × 630 的 PNG，包含标题、摘要、标签、日期与站点信息。
// ==========================================================================

import { site } from '@/config/site'
import type { Post } from '@/data/posts'

const POSTER_WIDTH = 1200
const POSTER_HEIGHT = 630
const PADDING = 72

/** 按字符换行，超出最大行数时在末尾补省略号 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const lines: string[] = []
  let current = ''

  for (const char of text) {
    const next = current + char
    if (ctx.measureText(next).width > maxWidth) {
      if (current) lines.push(current)
      current = char
      if (lines.length === maxLines) break
    } else {
      current = next
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current)
  }

  if (lines.length > maxLines) {
    lines.length = maxLines
  }

  const consumed = lines.join('').length
  if (consumed < text.length && lines.length > 0) {
    const lastIndex = lines.length - 1
    let last = lines[lastIndex]
    while (last.length > 0 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1)
    }
    lines[lastIndex] = `${last}…`
  }

  return lines
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const background = ctx.createLinearGradient(0, 0, POSTER_WIDTH, POSTER_HEIGHT)
  background.addColorStop(0, '#07080b')
  background.addColorStop(0.55, '#0e1015')
  background.addColorStop(1, '#14171e')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

  const accentGlow = ctx.createRadialGradient(920, 80, 0, 920, 80, 420)
  accentGlow.addColorStop(0, 'rgba(34, 211, 238, 0.28)')
  accentGlow.addColorStop(1, 'rgba(34, 211, 238, 0)')
  ctx.fillStyle = accentGlow
  ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

  const violetGlow = ctx.createRadialGradient(180, 560, 0, 180, 560, 380)
  violetGlow.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
  violetGlow.addColorStop(1, 'rgba(139, 92, 246, 0)')
  ctx.fillStyle = violetGlow
  ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)
}

function drawContent(ctx: CanvasRenderingContext2D, post: Post) {
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  // 站点信息
  ctx.fillStyle = '#22d3ee'
  ctx.font = '600 22px "Space Grotesk Variable", "Noto Sans SC", sans-serif'
  ctx.fillText(site.name, PADDING, 88)

  ctx.fillStyle = 'rgba(232, 235, 242, 0.55)'
  ctx.font = '400 14px "JetBrains Mono Variable", monospace'
  ctx.fillText('ARCH / BLOG', PADDING, 116)

  // 标题
  ctx.fillStyle = '#e8ebf2'
  ctx.font = '600 52px "Space Grotesk Variable", "Noto Sans SC", sans-serif'
  const titleLines = wrapText(ctx, post.title, POSTER_WIDTH - PADDING * 2, 3)
  titleLines.forEach((line, index) => {
    ctx.fillText(line, PADDING, 200 + index * 64)
  })

  // 摘要
  ctx.fillStyle = 'rgba(232, 235, 242, 0.72)'
  ctx.font = '400 24px "Noto Sans SC", "Space Grotesk Variable", sans-serif'
  const summaryLines = wrapText(ctx, post.summary, POSTER_WIDTH - PADDING * 2, 3)
  summaryLines.forEach((line, index) => {
    ctx.fillText(line, PADDING, 372 + index * 38)
  })

  // 标签
  ctx.fillStyle = '#67e8f9'
  ctx.font = '500 16px "JetBrains Mono Variable", monospace'
  ctx.fillText(post.tags.map((tag) => `#${tag}`).join('   '), PADDING, 500)

  // 分割线
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(PADDING, 532)
  ctx.lineTo(POSTER_WIDTH - PADDING, 532)
  ctx.stroke()

  // 底部元信息
  ctx.fillStyle = 'rgba(232, 235, 242, 0.5)'
  ctx.font = '400 15px "JetBrains Mono Variable", monospace'
  ctx.fillText(`${post.date} · ${post.readingTime}`, PADDING, 572)

  ctx.textAlign = 'right'
  ctx.fillText(site.url.replace(/^https?:\/\//, ''), POSTER_WIDTH - PADDING, 572)
  ctx.textAlign = 'left'
}

/** 生成并下载文章分享海报 */
export async function generateSharePoster(post: Post): Promise<void> {
  if (typeof document === 'undefined') return

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  const canvas = document.createElement('canvas')
  canvas.width = POSTER_WIDTH
  canvas.height = POSTER_HEIGHT

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('当前浏览器不支持 Canvas')

  drawBackground(ctx)
  drawContent(ctx, post)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result)
      } else {
        reject(new Error('海报生成失败'))
      }
    }, 'image/png')
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `post-${post.id}.png`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
