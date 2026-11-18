<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import LogoMark from '@/components/layout/LogoMark.vue'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import { site } from '@/config/site'
import { SONG_TITLE, usePlayer } from '@/composables/usePlayer'

const route = useRoute()
const mobileOpen = ref(false)
const { isPlaying, currentTime, duration, toggle: toggleMusic, seek } = usePlayer()

// ---------------------------------------------------------------------------
// 音乐控制面板（PC：Hover 弹出；移动端：点击切换）
// ---------------------------------------------------------------------------

const panelOpen = ref(false)
const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// 拖拽中的进度预览值，避免 timeupdate 反向覆盖造成抖动
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

function openPanel() {
  if (canHover) panelOpen.value = true
}

function closePanel() {
  if (canHover) panelOpen.value = false
}

function togglePanel() {
  panelOpen.value = !panelOpen.value
}

function onMusicButtonClick() {
  if (canHover) {
    toggleMusic()
  } else {
    togglePanel()
  }
}

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

function formatTime(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0
  const minutes = Math.floor(safe / 60)
  const secs = Math.floor(safe % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    mobileOpen.value = false
    panelOpen.value = false
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    panelOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-line/60 bg-canvas/55 backdrop-blur-md"
    @keydown.esc="mobileOpen = false"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
      <RouterLink to="/" class="group flex shrink-0 items-center gap-3" aria-label="返回首页">
        <LogoMark :size="34" />
        <span class="leading-tight">
          <span class="block font-display text-sm font-semibold tracking-tight text-ink">
            {{ site.name }}
          </span>
          <span class="mono-label block text-subtle">{{ site.author.name }} / Blog</span>
        </span>
      </RouterLink>

      <nav
        class="hidden items-center gap-1 rounded-full border border-line/70 bg-surface/40 p-1 md:flex"
        aria-label="主导航"
      >
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

      <div class="flex items-center gap-2">
        <div
          class="relative"
          @mouseenter="openPanel"
          @mouseleave="closePanel"
        >
          <button
            type="button"
            class="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
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
              <svg
                v-if="isPlaying"
                key="pause"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="5" width="4" height="14" rx="1.2" />
                <rect x="14" y="5" width="4" height="14" rx="1.2" />
              </svg>

              <svg
                v-else
                key="play"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.5-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z"
                />
              </svg>
            </Transition>
          </button>

          <Teleport to="body" :disabled="canHover">
            <Transition name="panel">
              <div
                v-if="panelOpen"
                class="panel-pop fixed inset-x-4 top-20 z-50 sm:absolute sm:top-full sm:right-0 sm:left-auto sm:pt-2"
              >
                <div
                  class="player-panel glass-panel mx-auto w-full max-w-xs rounded-2xl px-4 py-3 sm:mx-0 sm:w-72"
                >
                  <div class="flex items-baseline justify-between gap-3">
                    <p class="truncate text-sm font-medium text-ink">{{ SONG_TITLE }}</p>
                    <span class="mono-label shrink-0 text-subtle">FLAC · 无损</span>
                  </div>

                  <div class="mt-2.5 flex items-center gap-2.5">
                    <span class="w-8 shrink-0 font-mono text-[10px] tabular-nums text-subtle">
                      {{ formatTime(seekValue) }}
                    </span>
                    <input
                      type="range"
                      class="seek-range min-w-0 flex-1"
                      min="0"
                      :max="duration || 1"
                      step="0.1"
                      :value="seekValue"
                      :disabled="duration <= 0"
                      :style="{ '--seek-progress': `${seekPercent}%` }"
                      aria-label="播放进度"
                      @input="onSeekInput"
                      @change="onSeekChange"
                    />
                    <span
                      class="w-8 shrink-0 text-right font-mono text-[10px] tabular-nums text-subtle"
                    >
                      {{ formatTime(duration) }}
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>
        </div>

        <ThemeToggle />

        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileOpen ? '关闭导航菜单' : '打开导航菜单'"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            v-if="!mobileOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="nav-drop">
        <div
          v-if="mobileOpen"
          id="mobile-nav"
          class="fixed inset-x-0 top-16 z-[60] border-b border-line/60 bg-raised shadow-card md:hidden"
        >
          <nav
            class="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6"
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

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* 进度条：青蓝→紫渐变填充 */
.seek-range {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: transparent;
  outline: none;
  cursor: pointer;
}

.seek-range:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.seek-range::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--violet) var(--seek-progress, 0%),
    var(--line-strong) var(--seek-progress, 0%),
    var(--line-strong) 100%
  );
}

.seek-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -4.5px;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow:
    0 0 0 2px var(--accent),
    0 0 10px 0 var(--accent);
  cursor: pointer;
}

.seek-range::-moz-range-track {
  height: 5px;
  border-radius: 999px;
  background: var(--line-strong);
}

.seek-range::-moz-range-progress {
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent), var(--violet));
}

.seek-range::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow:
    0 0 0 2px var(--accent),
    0 0 10px 0 var(--accent);
  cursor: pointer;
}
</style>
