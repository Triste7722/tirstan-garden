<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LogoMark from '@/components/layout/LogoMark.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { posts } from '@/data/posts'

const featuredPosts = posts
  .filter((post) => post.featured)
  .sort((a, b) => b.date.localeCompare(a.date))

const latestPosts = posts
  .filter((post) => !post.featured)
  .sort((a, b) => b.date.localeCompare(a.date))

// ---------------------------------------------------------------------------
// Hero 视差（原生 scroll + requestAnimationFrame 节流）
// ---------------------------------------------------------------------------

const heroInner = ref<HTMLElement | null>(null)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let rafId = 0

function paintParallax() {
  rafId = 0

  const el = heroInner.value
  if (!el) return

  const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
  el.style.setProperty('--hero-progress', progress.toFixed(4))
}

function handleScroll() {
  if (rafId) return
  rafId = window.requestAnimationFrame(paintParallax)
}

// ---------------------------------------------------------------------------
// Scroll Reveal（IntersectionObserver + class 切换，一次性弹入）
// ---------------------------------------------------------------------------

let observer: IntersectionObserver | null = null

function revealAll() {
  document
    .querySelectorAll<HTMLElement>('.reveal')
    .forEach((el) => el.classList.add('is-revealed'))
}

onMounted(() => {
  if (!prefersReducedMotion) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // 兼容浏览器刷新时恢复滚动位置的情况
    paintParallax()
  }

  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    revealAll()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.2 },
  )

  document
    .querySelectorAll<HTMLElement>('.reveal')
    .forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
  if (rafId) window.cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- Hero -->
    <section
      class="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div class="hero-optics">
        <div ref="heroInner" class="hero-inner flex flex-col items-center text-center">
          <div class="relative">
            <div class="hero-glow" aria-hidden="true" />
            <LogoMark :size="160" class="relative" />
          </div>

          <h1 class="mt-10 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            <span class="text-muted">Welcome to</span>
            <span class="font-semibold text-ink">&nbsp;Tristan blog</span>
          </h1>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section v-if="featuredPosts.length" class="border-t border-line/60 py-16 sm:py-20">
      <div class="reveal">
        <SectionHeading
          index="01"
          eyebrow="Featured"
          title="精选文章"
          description="一篇厘清 Linux 的边界，一篇写给猫与生活。"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(post, i) in featuredPosts"
          :key="post.title"
          class="reveal h-full"
          :style="{ '--reveal-delay': `${(i + 1) * 80}ms` }"
        >
          <BaseCard variant="feature" padding="none" hoverable class="group h-full">
            <RouterLink :to="`/posts/${post.id}`" class="flex h-full flex-col p-7 sm:p-8">
              <div class="flex items-center justify-between gap-3">
                <BaseTag variant="violet" dot>精选</BaseTag>
                <span class="font-mono text-[11px] text-subtle">
                  {{ post.date }} · {{ post.readingTime }}
                </span>
              </div>

              <h3
                class="mt-6 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
              >
                {{ post.title }}
              </h3>

              <p class="mt-3 text-sm leading-7 text-muted">{{ post.summary }}</p>

              <span class="mono-label mt-8 inline-flex items-center gap-1.5 text-accent">
                阅读全文
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </RouterLink>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Latest -->
    <section v-if="latestPosts.length" class="border-t border-line/60 py-16 sm:py-20">
      <div class="reveal">
        <SectionHeading
          index="02"
          eyebrow="Latest"
          title="最新文章"
          description="按时间倒序排列的最近几篇，覆盖前端、工程与日常。"
        />
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(post, i) in latestPosts"
          :key="post.title"
          class="reveal h-full"
          :style="{ '--reveal-delay': `${(i + 1) * 60}ms` }"
        >
          <BaseCard variant="glass" padding="none" hoverable class="group h-full">
            <RouterLink :to="`/posts/${post.id}`" class="flex h-full flex-col p-6">
              <time class="font-mono text-[11px] text-subtle">{{ post.date }}</time>

              <h3 class="mt-3 font-display text-base font-semibold tracking-tight text-ink">
                {{ post.title }}
              </h3>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <BaseTag
                  v-for="(tag, i) in post.tags"
                  :key="tag"
                  :variant="i === 0 ? 'accent' : 'neutral'"
                  :dot="i === 0"
                >
                  {{ tag }}
                </BaseTag>
              </div>

              <p class="mt-4 line-clamp-2 text-sm leading-7 text-muted">
                {{ post.summary }}
              </p>
            </RouterLink>
          </BaseCard>
        </div>
      </div>

      <div class="reveal mt-10 flex justify-center" :style="{ '--reveal-delay': '420ms' }">
        <BaseButton to="/posts" variant="secondary">
          查看全部文章
          <template #suffix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </template>
        </BaseButton>
      </div>
    </section>

    <!-- Empty -->
    <section v-if="!posts.length" class="border-t border-line/60 py-16 sm:py-20">
      <div class="glass-panel mx-auto max-w-xl rounded-2xl px-8 py-16 text-center">
        <span class="mono-label text-accent">Empty</span>
        <h2 class="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">暂无文章</h2>
        <p class="mt-3 text-sm leading-7 text-muted">文章还在路上，欢迎稍后再来。</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ==========================================================================
   Hero 视差 + 光学居中
   ========================================================================== */

/* 抵消 64px 吸顶头的视觉偏差，让头像/文字在首屏内容区真正居中 */
.hero-optics {
  transform: translateY(-2rem);
}

.hero-inner {
  transform: translateY(calc(var(--hero-progress, 0) * -4rem))
    scale(calc(1 - var(--hero-progress, 0) * 0.08));
  opacity: clamp(0, calc(1 - var(--hero-progress, 0) * 1.4), 1);
  will-change: transform, opacity;
}

/* 头像背后的呼吸光晕 */
.hero-glow {
  position: absolute;
  inset: -3rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--accent) 34%, transparent),
    transparent 68%
  );
  filter: blur(2.25rem);
  opacity: 0.7;
  animation: hero-breathe 4.5s ease-in-out infinite;
}

@keyframes hero-breathe {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(1);
  }

  50% {
    opacity: 0.95;
    transform: scale(1.08);
  }
}

/* ==========================================================================
   Scroll Reveal
   ========================================================================== */

.reveal {
  opacity: 0;
  transform: translateY(3rem);
  transition:
    opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms);
}

.reveal.is-revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow {
    animation: none;
  }
}
</style>
