// ==========================================================================
// 构建期生成 RSS 2.0 feed → dist/feed.xml
// 运行：node --experimental-strip-types scripts/generate-rss.mjs
// 依赖 Node >= 22.6 的原生 TypeScript 类型剥离，无需额外 npm 依赖。
// ==========================================================================

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { site } from '../src/config/site.ts'
import { posts } from '../src/data/posts.ts'

const distDir = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toPubDate(date) {
  return new Date(`${date}T00:00:00Z`).toUTCString()
}

const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

const items = sortedPosts
  .map((post) => {
    const url = `${site.url}/posts/${post.id}`
    const categories = post.tags
      .map((tag) => `      <category>${escapeXml(tag)}</category>`)
      .join('\n')

    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${toPubDate(post.date)}</pubDate>`,
      `      <description>${escapeXml(post.summary)}</description>`,
      categories,
      '    </item>',
    ]
      .filter(Boolean)
      .join('\n')
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${escapeXml(site.locale)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

await mkdir(distDir, { recursive: true })
await writeFile(resolve(distDir, 'feed.xml'), xml, 'utf8')

console.log(`RSS generated: ${sortedPosts.length} items → dist/feed.xml`)
