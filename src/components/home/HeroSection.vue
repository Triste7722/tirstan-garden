<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

import Chip from '@/components/ui/Chip.vue'
import { site } from '@/config/site'

// 尊重系统「减少动态」偏好：跳过封面与钉住滚动，直接渲染静态名片
const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// 分段节奏参数（易调常量）
// 期望节奏：退场（封面淡出）→ 移动（头像上移缩小）→ 就位（名片淡入落位）
// ---------------------------------------------------------------------------
/** a —— 封面（Welcome）淡出结束、名片内容开始淡入的进度点 */
const PHASE_A = 0.45
/** b —— 名片内容淡入结束（完全就位）的进度点 */
const PHASE_B = 0.9

/** 缓动：ease-out cubic，让名片就位时减速，避免生硬 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t))
}

const { y } = useWindowScroll()
const { height } = useWindowSize()

/** 原始滚动进度 p ∈ [0, 1]（头像位移/缩放仍与 p 全程关联） */
const p = computed(() => {
  const h = height.value || 1
  return clamp01(y.value / h)
})

/** 封面淡出进度 pw ∈ [0, 1]，在前置区间 [0, PHASE_A] 内完成淡出 */
const pw = computed(() => clamp01(p.value / PHASE_A))

/** 名片就位进度 p1 ∈ [0, 1]，在滞后区间 [PHASE_A, PHASE_B] 内完成，带缓动 */
const p1 = computed(() => easeOutCubic(clamp01((p.value - PHASE_A) / (PHASE_B - PHASE_A))))

const sceneStyle = computed(() => ({
  '--p': p.value.toFixed(4),
  '--pw': pw.value.toFixed(4),
  '--p1': p1.value.toFixed(4),
}))
</script>

<template>
  <!-- 动画版：钉住滚动场景（封面 → 名片） -->
  <section v-if="!reduced" class="hero-pin">
    <div class="hero-scene" :style="sceneStyle">
      <!-- 头像（随滚动上移 + 缩小，与 p 关联） -->
      <div class="hero-avatar">
        <div class="hero-glow" aria-hidden="true" />
        <img :src="site.author.avatar" :alt="site.name" class="hero-avatar-img" />
      </div>

      <!-- 封面文案（前置区间淡出，pw） -->
      <p class="hero-welcome">Welcome to Tristan Blog</p>

      <!-- 名片内容（滞后区间淡入 + 上浮，p1） -->
      <div class="hero-card flex flex-col items-center text-center">
        <h1
          class="font-display text-4xl font-bold tracking-tight text-md-on-surface sm:text-5xl"
        >
          {{ site.name }}
        </h1>

        <p
          class="mt-6 max-w-2xl font-display text-2xl font-medium leading-relaxed tracking-tight text-md-on-surface sm:text-3xl"
        >
          {{ site.slogan }}
        </p>

        <p class="mt-4 font-mono text-[11px] tracking-[0.14em] text-md-on-surface-variant">
          ——《论语 · 先进》
        </p>

        <div class="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          <Chip v-for="skill in site.skills" :key="skill" variant="glass" tag="span">
            {{ skill }}
          </Chip>
        </div>
      </div>
    </div>
  </section>

  <!-- 降级版：静态名片（prefers-reduced-motion） -->
  <section v-else class="pb-16 pt-16 sm:pb-20 sm:pt-24">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <img
        :src="site.author.avatar"
        :alt="site.name"
        width="128"
        height="128"
        class="h-28 w-28 rounded-full object-cover shadow-elevation-2 ring-1 ring-line-strong sm:h-32 sm:w-32"
      />

      <h1
        class="mt-8 font-display text-4xl font-bold tracking-tight text-md-on-surface sm:text-5xl"
      >
        {{ site.name }}
      </h1>

      <p
        class="mt-6 max-w-2xl font-display text-2xl font-medium leading-relaxed tracking-tight text-md-on-surface sm:text-3xl"
      >
        {{ site.slogan }}
      </p>

      <p class="mt-4 font-mono text-[11px] tracking-[0.14em] text-md-on-surface-variant">
        ——《论语 · 先进》
      </p>

      <div class="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2">
        <Chip v-for="skill in site.skills" :key="skill" variant="glass" tag="span">
          {{ skill }}
        </Chip>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================================================
   钉住滚动场景：封面 → 名片的滚动过渡
   分段节奏：
     - 头像位移/缩放：与 --p（0→1）全程关联
     - 封面 Welcome 淡出：与 --pw（0→1，在 [0, PHASE_A] 内完成）
     - 名片内容淡入/上浮：与 --p1（0→1，在 [PHASE_A, PHASE_B] 内完成，带缓动）
   只操作 transform / opacity（合成层属性），移动端触屏同样流畅。
   ========================================================================== */

/* 外层提供一屏滚动距离；内层 sticky 钉在视口 */
.hero-pin {
  height: 200dvh;
}

.hero-scene {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;

  /* 几何参数（易调） */
  --rise: -28vh; /* 头像与名片整体上移量（负值 = 上移） */
  --avatar-shrink: 0.2; /* p=1 时头像缩小比例（160px → 128px） */
  --card-gap: 6rem; /* 名片顶部相对头像中心的下偏移（保证名片落在头像最终位下方） */

  /* 进度变量（由 JS 注入，此处为回退默认值） */
  --p: 0;
  --pw: 0;
  --p1: 0;
}

/* 头像：从居中（160px）上移并缩小到名片位置（128px） */
.hero-avatar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateY(calc(var(--p) * var(--rise)))
    scale(calc(1 - var(--p) * var(--avatar-shrink)));
  will-change: transform;
}

.hero-avatar-img {
  width: 10rem; /* 160px */
  height: 10rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 12px 40px -12px color-mix(in srgb, var(--accent) 40%, transparent);
}

/* 封面文案：前置区间淡出（pw），在名片开始前基本退场 */
.hero-welcome {
  position: absolute;
  left: 50%;
  top: calc(50% + 7rem);
  transform: translateX(-50%);
  opacity: calc(1 - var(--pw));
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 4.5vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: center;
  max-width: 92vw;
  will-change: opacity, transform;
}

/* 名片内容：滞后区间淡入 + 上浮（p1），落在头像最终位置正下方 */
.hero-card {
  position: absolute;
  left: 50%;
  top: calc(50% + var(--rise) + var(--card-gap));
  transform: translate(-50%, calc((1 - var(--p1)) * 1.5rem));
  opacity: var(--p1);
  width: 100%;
  max-width: 42rem;
  padding: 0 1.5rem;
  will-change: opacity, transform;
}

/* 头像背后的呼吸光晕（静态，无滚动视差） */
.hero-glow {
  position: absolute;
  inset: -2.5rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--accent) 30%, transparent),
    transparent 70%
  );
  filter: blur(1.75rem);
  opacity: 0.6;
  animation: hero-breathe 5s ease-in-out infinite;
}

@keyframes hero-breathe {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(1);
  }

  50% {
    opacity: 0.85;
    transform: scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow {
    animation: none;
  }
}
</style>
