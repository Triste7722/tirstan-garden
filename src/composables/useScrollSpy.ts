// ==========================================================================
// 滚动目录高亮（Scroll Spy）
// 统一文章详情页 TOC 与关于页段落索引的逻辑：
//   - 根据元素顶部相对视口的位置，计算当前激活的锚点 id
//   - 可选计算整页阅读进度（0–1）
//   - 提供平滑滚动定位
// ==========================================================================

import { onBeforeUnmount, onMounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

import { HEADER_HEIGHT } from '@/config/layout'

export interface UseScrollSpyOptions {
  /** 元素顶部距视口顶部多少像素以内视为「当前」，默认在悬浮导航下方一点 */
  offset?: number
  /** 是否额外计算页面阅读进度（0–1） */
  progress?: boolean
}

export function useScrollSpy(ids: MaybeRefOrGetter<string[]>, options: UseScrollSpyOptions = {}) {
  const { offset = HEADER_HEIGHT + 32, progress: trackProgress = false } = options

  const activeId = ref('')
  const progress = ref(0)

  function update() {
    if (typeof document === 'undefined') return

    const list = toValue(ids)
    let current = list[0] ?? ''

    for (const id of list) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= offset) {
        current = id
      } else {
        break
      }
    }

    activeId.value = current

    if (trackProgress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      progress.value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
    }
  }

  function scrollTo(id: string) {
    if (typeof document === 'undefined') return

    const el = document.getElementById(id)
    if (!el) return

    activeId.value = id
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  // 目录项变化（如切换文章）后，等待 DOM 渲染完成再重新计算
  watch(
    () => toValue(ids),
    () => update(),
    { flush: 'post' },
  )

  return { activeId, progress, scrollTo, update }
}
