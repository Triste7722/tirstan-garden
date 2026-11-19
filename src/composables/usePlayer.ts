// ==========================================================================
// 全局音乐播放器（模块级单例）
// 核心思路：<audio> 元素与状态都保存在模块作用域，脱离组件生命周期，
// 因此切换路由（页面）时音乐绝不会中断、重载或卡顿。
// 自动播放策略：监听页面加载后的第一次全局 click / touchstart，触发后播放。
// ==========================================================================

import { readonly, ref } from 'vue'

import { parseLrc, type LyricLine } from '@/utils/lrc'

const AUDIO_SRC = `${import.meta.env.BASE_URL}yujian.flac`
const LRC_SRC = `${import.meta.env.BASE_URL}歌词.txt`

const isPlaying = ref(false)
const hasStarted = ref(false) // 是否已触发过首次交互（用于决定是否显示歌词框）
const currentLyric = ref('')
const currentLyricIndex = ref(-1)
const currentTime = ref(0)
const duration = ref(0)

let audio: HTMLAudioElement | null = null
const lyrics = ref<LyricLine[]>([])
let lyricPromise: Promise<void> | null = null
let autoplayBound = false
let initialized = false

function ensureAudio(): HTMLAudioElement {
  if (audio) return audio

  const el = new Audio()
  el.preload = 'auto'
  el.loop = true
  el.src = AUDIO_SRC

  el.addEventListener('play', () => {
    isPlaying.value = true
  })
  el.addEventListener('pause', () => {
    isPlaying.value = false
  })
  el.addEventListener('loadedmetadata', () => {
    duration.value = el.duration || 0
  })
  el.addEventListener('durationchange', () => {
    duration.value = el.duration || 0
  })
  el.addEventListener('timeupdate', handleTimeUpdate)

  audio = el
  return el
}

function loadLyrics(): Promise<void> {
  if (lyricPromise) return lyricPromise

  lyricPromise = fetch(LRC_SRC)
    .then((res) => {
      if (!res.ok) throw new Error(`歌词加载失败：${res.status}`)
      return res.text()
    })
    .then((text) => {
      lyrics.value = parseLrc(text)
    })
    .catch(() => {
      // 歌词加载失败不应阻塞音乐播放，静默降级为无歌词
      lyrics.value = []
    })

  return lyricPromise
}

/** 二分查找：当前时间点应显示的最后一条歌词 */
function findActiveIndex(time: number): number {
  let lo = 0
  let hi = lyrics.value.length - 1
  let ans = -1

  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (lyrics.value[mid].time <= time) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }

  return ans
}

function handleTimeUpdate() {
  if (!audio) return

  currentTime.value = audio.currentTime

  if (lyrics.value.length === 0) return

  const idx = findActiveIndex(audio.currentTime)
  if (idx !== currentLyricIndex.value) {
    currentLyricIndex.value = idx
    currentLyric.value = idx >= 0 ? lyrics.value[idx].text : ''
  }
}

function play() {
  const el = ensureAudio()
  const promise = el.play()
  if (promise && typeof promise.catch === 'function') {
    promise.catch(() => {
      // 自动播放可能被浏览器拦截（例如尚无用户手势），忽略即可
    })
  }
}

function pause() {
  audio?.pause()
}

function toggle() {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

function seek(time: number) {
  if (!Number.isFinite(time)) return
  const el = ensureAudio()
  el.currentTime = Math.min(Math.max(time, 0), el.duration || time)
  currentTime.value = el.currentTime
}

/** 绑定首次全局交互：触发后开始播放，并立即解绑 */
function bindAutoplay() {
  if (autoplayBound || typeof document === 'undefined') return
  autoplayBound = true

  const handler = () => {
    if (hasStarted.value) return
    hasStarted.value = true
    detach()
    play()
  }
  const detach = () => {
    document.removeEventListener('click', handler)
    document.removeEventListener('touchstart', handler)
  }

  document.addEventListener('click', handler, { passive: true })
  document.addEventListener('touchstart', handler, { passive: true })
}

export function initPlayer() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  ensureAudio()
  loadLyrics()
  bindAutoplay()
}

export function usePlayer() {
  // 幂等：任何组件调用时都确保播放器已初始化
  initPlayer()

  return {
    isPlaying: readonly(isPlaying),
    hasStarted: readonly(hasStarted),
    currentLyric: readonly(currentLyric),
    currentLyricIndex: readonly(currentLyricIndex),
    lyrics: readonly(lyrics),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    toggle,
    play,
    pause,
    seek,
  }
}
