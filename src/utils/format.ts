// ==========================================================================
// 通用格式化工具
// ==========================================================================

/** 把 'YYYY-MM-DD' 格式化为「M 月 D 日」，解析失败时原样返回 */
export function formatDay(date: string): string {
  const parts = date.split('-')
  const month = Number(parts[1])
  const day = Number(parts[2])

  if (!Number.isFinite(month) || !Number.isFinite(day)) return date

  return `${month} 月 ${day} 日`
}

/** 计算距某日期（YYYY-MM-DD）经过的天数，解析失败返回 0 */
export function daysSince(date: string): number {
  const timestamp = new Date(`${date}T00:00:00Z`).getTime()
  if (!Number.isFinite(timestamp)) return 0
  return Math.max(0, Math.floor((Date.now() - timestamp) / 86400000))
}
