// ==========================================================================
// LRC 歌词解析（原生手写，无第三方依赖）
// 支持标准 LRC 时间标签：[mm:ss.xx] / [mm:ss] / [mm:ss.xxx]
// 支持同一行多时间标签（同一句歌词对应多个时间点）
// 自动跳过标准元信息标签（[ti:]/[ar:]/[al:]/[by:]/[offset:] 等）
// 以及制作名单行（作词/作曲/编曲等），避免它们被当作正文歌词显示
// ==========================================================================

export interface LyricLine {
  /** 秒（含小数部分），用于与 <audio>.currentTime 比对 */
  time: number
  text: string
}

/** 时间标签：分：秒（.毫秒 可选），毫秒可为 1~3 位 */
const TIME_TAG = /\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g

/** 标准 LRC 元信息标签（非正文） */
const META_TAG = /^\[(ti|ar|al|by|offset|re|ve|au|length)\s*:/

/** 制作名单行（正文歌词里出现这些前缀时视为非歌词） */
const CREDIT_RE = /^(作词|作曲|编曲|歌手|演唱|制作人?|混音|录音|和声|专辑|监制)\s*[:：]/

export function parseLrc(raw: string): LyricLine[] {
  const lines = raw.split(/\r?\n/)
  const result: LyricLine[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // 跳过标准元信息标签行
    if (META_TAG.test(trimmed)) continue

    // 收集该行所有时间标签
    const times: number[] = []
    for (const m of trimmed.matchAll(TIME_TAG)) {
      const minutes = Number(m[1])
      const seconds = Number(m[2])
      const frac = m[3] ? Number(m[3].padEnd(3, '0')) : 0
      times.push(minutes * 60 + seconds + frac / 1000)
    }

    // 去掉所有时间标签后剩余文本即歌词
    const text = trimmed.replace(TIME_TAG, '').trim()
    if (!text || times.length === 0) continue
    if (CREDIT_RE.test(text)) continue

    for (const time of times) {
      result.push({ time, text })
    }
  }

  result.sort((a, b) => a.time - b.time)
  return result
}
