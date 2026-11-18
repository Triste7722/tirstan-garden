// 极简 Markdown 渲染器（无第三方依赖）。
// 只覆盖博客正文所需的最小语法子集：
// 标题、段落、加粗/斜体、行内代码、链接、引用、无序/有序列表、代码块、分隔线。
// 所有文本先经过 HTML 转义，保证 v-html 输出安全。

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

export interface ParsedMarkdown {
  html: string
  headings: TocHeading[]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .trim()
}

function renderInline(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )
  return out
}

function renderCodeBlock(code: string, lang: string): string {
  const label = lang || 'text'
  return [
    '<div class="codeblock">',
    '  <div class="codeblock__bar">',
    '    <span class="codeblock__dots"><i></i><i></i><i></i></span>',
    `    <span class="codeblock__lang">${escapeHtml(label)}</span>`,
    '  </div>',
    `  <pre><code>${escapeHtml(code)}</code></pre>`,
    '</div>',
  ].join('\n')
}

function isBlockStart(line: string): boolean {
  const trimmed = line.trim()
  return (
    /^```/.test(trimmed) ||
    /^#{1,6}\s+/.test(trimmed) ||
    /^>/.test(trimmed) ||
    /^[-*+]\s+/.test(trimmed) ||
    /^\d+[.)]\s+/.test(trimmed) ||
    /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)
  )
}

export function parseMarkdown(md: string): ParsedMarkdown {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const html: string[] = []
  const headings: TocHeading[] = []
  let headingIndex = 0

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 围栏代码块
    const fence = trimmed.match(/^```([\w+-]*)\s*$/)
    if (fence) {
      const lang = fence[1] || ''
      const code: string[] = []
      i += 1
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        code.push(lines[i])
        i += 1
      }
      i += 1 // 跳过收尾围栏
      html.push(renderCodeBlock(code.join('\n'), lang))
      continue
    }

    // 标题
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      const text = heading[2].trim()
      if (level === 2 || level === 3) {
        const id = `heading-${headingIndex}`
        headingIndex += 1
        headings.push({ id, text: stripInline(text), level: level as 2 | 3 })
        html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`)
      } else {
        html.push(`<h${level}>${renderInline(text)}</h${level}>`)
      }
      i += 1
      continue
    }

    // 引用
    if (trimmed.startsWith('>')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i += 1
      }
      html.push(
        `<blockquote>${quote.map((q) => `<p>${renderInline(q)}</p>`).join('')}</blockquote>`,
      )
      continue
    }

    // 分隔线
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      html.push('<hr />')
      i += 1
      continue
    }

    // 无序列表
    if (/^[-*+]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ''))
        i += 1
      }
      html.push(`<ul>${items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ul>`)
      continue
    }

    // 有序列表
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''))
        i += 1
      }
      html.push(`<ol>${items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ol>`)
      continue
    }

    // 空行
    if (trimmed === '') {
      i += 1
      continue
    }

    // 段落：收集连续的非空、非块级起始行
    const para: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines[i])) {
      para.push(lines[i].trim())
      i += 1
    }
    if (para.length) {
      html.push(`<p>${para.map((p) => renderInline(p)).join(' ')}</p>`)
    }
  }

  return { html: html.join('\n'), headings }
}
