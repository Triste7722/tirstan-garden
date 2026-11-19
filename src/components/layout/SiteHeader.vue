<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import DockWeather from '@/components/layout/DockWeather.vue'
import LogoMark from '@/components/layout/LogoMark.vue'
import SiteSearch from '@/components/layout/SiteSearch.vue'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { site } from '@/config/site'
import { usePlayer } from '@/composables/usePlayer'

const route = useRoute()
const mobileOpen = ref(false)

const {
  isPlaying,
  currentLyric,
  currentLyricIndex,
  currentTime,
  duration,
  toggle: toggleMusic,
  seek,
} = usePlayer()

// ---------------------------------------------------------------------------
// 音乐进度浮层（毛玻璃小面板，桌面悬停 / 移动端点击）
// ---------------------------------------------------------------------------

const canHover =
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const musicButtonRef = ref<HTMLElement | null>(null)
const tooltipOpen = ref(false)
const tooltipStyle = ref({ top: 0, right: 0 })
let closeTimer: number | null = null

function measureTooltip() {
  const el = musicButtonRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  tooltipStyle.value = {
    top: rect.bottom + 10,
    right: Math.max(8, window.innerWidth - rect.right),
  }
}

function openTooltip() {
  if (closeTimer) {
    window.clearTimeout(closeTimer)
    closeTimer = null
  }
  measureTooltip()
  tooltipOpen.value = true
}

function scheduleClose() {
  if (closeTimer) window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    tooltipOpen.value = false
    closeTimer = null
  }, 120)
}

function closeTooltipNow() {
  if (closeTimer) {
    window.clearTimeout(closeTimer)
    closeTimer = null
  }
  tooltipOpen.value = false
}

function onMusicHoverEnter() {
  if (canHover) openTooltip()
}

function onMusicHoverLeave() {
  if (canHover) scheduleClose()
}

function onMusicButtonClick() {
  if (canHover) {
    toggleMusic()
  } else if (tooltipOpen.value) {
    closeTooltipNow()
  } else {
    openTooltip()
  }
}

// ---------------------------------------------------------------------------
// 进度条状态
// ---------------------------------------------------------------------------

const seekValue = ref(0)
let dragging = false

watch(
  () => currentTime.value,
  (time) => {
    if (!dragging) seekValue.value = time
  },
)

const seekPercent = computed(() =>
  duration.value > 0 ? (seekValue.value / duration.value) * 100 : 0,
)

function onSeekInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  if (!Number.isFinite(value)) return
  dragging = true
  seekValue.value = value
  seek(value)
}

function onSeekChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  if (!Number.isFinite(value)) return
  seek(value)
  dragging = false
}

// ---------------------------------------------------------------------------
// 导航
// ---------------------------------------------------------------------------

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    mobileOpen.value = false
    closeTooltipNow()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (closeTimer) window.clearTimeout(closeTimer)
})

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    closeTooltipNow()
  },
)
</script>

<template>
  <header class="sticky top-0 z-50 px-3 pt-2 sm:px-4" @keydown.esc="mobileOpen = false">
    <div
      class="relative mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border border-line/70 bg-md-surface-container/60 px-2 shadow-elevation-2 backdrop-blur-md sm:gap-3 sm:px-4"
    >
      <!-- Logo / 站点名 -->
      <RouterLink to="/" class="group flex shrink-0 items-center gap-2" aria-label="返回首页">
        <LogoMark :size="34" />
        <span class="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
          {{ site.name }}
        </span>
      </RouterLink>

      <!-- 桌面导航：始终可见，绝不被歌词覆盖 -->
      <nav class="hidden shrink-0 items-center gap-1 md:flex" aria-label="主导航">
        <RouterLink
          v-for="item in site.nav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3.5 py-1.5 text-xs font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-ink/[0.07] text-ink'
              : 'text-muted hover:bg-ink/[0.04] hover:text-ink'
          "
        >
          <span class="flex items-center gap-1.5">
            <span
              v-if="isActive(item.to)"
              class="h-1 w-1 rounded-full bg-accent"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
        </RouterLink>
      </nav>

      <!-- 歌词：导航右侧剩余空间，播放时显示，绝不挤压导航 -->
      <div class="min-w-0 flex-1">
        <Transition name="lyric-line" mode="out-in">
          <p
            v-if="isPlaying && currentLyric"
            :key="currentLyricIndex"
            class="truncate text-center text-xs text-md-on-surface sm:text-sm"
          >
            {{ currentLyric }}
          </p>
        </Transition>
      </div>

      <!-- 右侧功能组：天气 + 搜索 + 主题 + 音乐 + 汉堡 -->
      <div class="flex shrink-0 items-center gap-1 sm:gap-2">
        <DockWeather />

        <SiteSearch />

        <ThemeToggle />

        <div class="relative" @mouseenter="onMusicHoverEnter" @mouseleave="onMusicHoverLeave">
          <button
            ref="musicButtonRef"
            type="button"
            class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:h-9 md:w-9"
            :aria-label="isPlaying ? '暂停音乐' : '播放音乐'"
            :title="isPlaying ? '暂停音乐' : '播放音乐'"
            :aria-pressed="isPlaying"
            @click="onMusicButtonClick"
          >
            <span
              class="pointer-events-none absolute inset-0 rounded-full bg-accent/0 blur-md transition group-hover:bg-accent/10"
              aria-hidden="true"
            />

            <Transition name="icon-swap" mode="out-in">
              <BaseIcon v-if="isPlaying" key="pause" name="pause" :size="15" />
              <BaseIcon v-else key="play" name="play" :size="15" />
            </Transition>
          </button>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileOpen ? '关闭导航菜单' : '打开导航菜单'"
          @click="mobileOpen = !mobileOpen"
        >
          <BaseIcon v-if="!mobileOpen" name="menu" :size="18" />
          <BaseIcon v-else name="close" :size="18" />
        </button>
      </div>
    </div>

    <!-- 进度浮层（毛玻璃，Teleport 到 body 避免与 Dock 的 backdrop-filter 嵌套） -->
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-if="tooltipOpen && !canHover"
          class="fixed inset-0 z-[59]"
          @click="closeTooltipNow"
        />
      </Transition>

      <Transition name="tooltip">
        <div
          v-if="tooltipOpen"
          class="fixed z-[60] w-60"
          :style="{ top: `${tooltipStyle.top}px`, right: `${tooltipStyle.right}px` }"
          @mouseenter="onMusicHoverEnter"
          @mouseleave="onMusicHoverLeave"
        >
          <div class="glass-panel rounded-2xl px-3 py-3 shadow-elevation-2">
            <div class="flex items-center gap-2.5">
              <button
                type="button"
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                :aria-label="isPlaying ? '暂停' : '播放'"
                @click="toggleMusic"
              >
                <BaseIcon :name="isPlaying ? 'pause' : 'play'" :size="14" />
              </button>

              <input
                type="range"
                class="dock-seek min-w-0 flex-1"
                min="0"
                :max="duration || 1"
                step="0.1"
                :value="seekValue"
                :style="{ '--seek-progress': `${seekPercent}%` }"
                aria-label="播放进度"
                @input="onSeekInput"
                @change="onSeekChange"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 移动端菜单 -->
    <Teleport to="body">
      <Transition name="nav-drop">
        <div
          v-if="mobileOpen"
          id="mobile-nav"
          class="fixed inset-x-3 top-[4.25rem] z-[60] max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-2xl border border-line/70 bg-md-surface-container/80 shadow-elevation-3 backdrop-blur-md sm:inset-x-4 md:hidden"
        >
          <nav
            class="mx-auto flex max-w-6xl flex-col gap-1 px-2 py-2 sm:px-3"
            aria-label="移动端导航"
          >
            <RouterLink
              v-for="(item, index) in site.nav"
              :key="item.to"
              :to="item.to"
              class="flex items-center justify-between rounded-card px-4 py-3 text-sm transition"
              :class="
                isActive(item.to)
                  ? 'bg-ink/[0.06] text-ink'
                  : 'text-muted hover:bg-ink/[0.04] hover:text-ink'
              "
            >
              <span class="flex items-center gap-2">
                <span
                  v-if="isActive(item.to)"
                  class="h-1 w-1 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {{ item.label }}
              </span>
              <span class="font-mono text-[10px] text-subtle">0{{ index + 1 }}</span>
            </RouterLink>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.nav-drop-enter-active,
.nav-drop-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.nav-drop-enter-from,
.nav-drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* 歌词切换淡入淡出 */
.lyric-line-enter-active,
.lyric-line-leave-active {
  transition: opacity 200ms ease;
}

.lyric-line-enter-from,
.lyric-line-leave-to {
  opacity: 0;
}

/* 进度浮层 */
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 180ms ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

/* 进度条：青蓝→紫渐变填充 */
.dock-seek {
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: transparent;
  outline: none;
  cursor: pointer;
  border-radius: 999px;
}

.dock-seek::-webkit-slider-runnable-track {
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--violet) var(--seek-progress, 0%),
    var(--line-strong) var(--seek-progress, 0%),
    var(--line-strong) 100%
  );
}

.dock-seek::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  margin-top: -3.5px;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 2px var(--accent);
  cursor: pointer;
}

.dock-seek::-moz-range-track {
  height: 3px;
  border-radius: 999px;
  background: var(--line-strong);
}

.dock-seek::-moz-range-progress {
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent), var(--violet));
}

.dock-seek::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 2px var(--accent);
  cursor: pointer;
}
</style>
