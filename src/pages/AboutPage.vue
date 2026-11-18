<script setup lang="ts">
import LogoMark from '@/components/layout/LogoMark.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

interface ContactLink {
  label: string
  value: string
  href: string
  icon: 'mail' | 'telegram' | 'x'
  external?: boolean
}

const contacts: ContactLink[] = [
  {
    label: 'QQ 邮箱',
    value: '2359814041@qq.com',
    href: 'mailto:2359814041@qq.com',
    icon: 'mail',
  },
  {
    label: 'Gmail 邮箱',
    value: 'bludmoon1975e@gmail.com',
    href: 'mailto:bludmoon1975e@gmail.com',
    icon: 'mail',
  },
  {
    label: 'Telegram',
    value: '@Tristery',
    href: 'https://t.me/Tristery',
    icon: 'telegram',
    external: true,
  },
  {
    label: 'X (Twitter)',
    value: '@truste289936',
    href: 'https://x.com/truste289936',
    icon: 'x',
    external: true,
  },
]
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- 居中标题 -->
    <header class="rise pb-10 pt-16 text-center sm:pb-12 sm:pt-20">
      <span class="mono-label text-accent">About Me</span>
      <h1
        class="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        关于我
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-muted">
        这里记录工程实践、设计思考与日常片段，也欢迎你从这里开始认识我。
      </p>
    </header>

    <!-- 个人信息卡片 -->
    <section class="rise border-t border-line/60 pt-10 sm:pt-12" style="--rise-delay: 120ms">
      <div class="glass-panel rounded-card px-8 py-12 sm:px-12 sm:py-14">
        <div class="flex flex-col items-center text-center">
          <div class="relative">
            <div class="about-glow" aria-hidden="true" />
            <LogoMark :size="96" alt="Tristan" class="relative" />
          </div>

          <h2 class="mt-7 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Tristan
          </h2>

          <p class="mono-label mt-3 text-subtle">Arch · Personal Blog</p>

          <p class="mt-7 max-w-xl text-[15px] leading-8 text-muted">
            这里是一片留白，用来记录未来的故事，也存放那些还没来得及说出口的想法。目前正在构思中……
          </p>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="rise py-14 sm:py-16" style="--rise-delay: 240ms">
      <SectionHeading
        index="01"
        eyebrow="Connect"
        title="联系方式"
        description="欢迎通过以下方式找到我，交流技术或闲聊都可以。"
      />

      <div class="grid gap-3 sm:grid-cols-2">
        <a
          v-for="(link, i) in contacts"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="rise group glass-panel rounded-card card-hover flex items-center gap-4 p-5"
          :style="{ '--rise-delay': `${320 + i * 60}ms` }"
        >
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink/[0.04] text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent"
            aria-hidden="true"
          >
            <template v-if="link.icon === 'mail'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </template>

            <template v-else-if="link.icon === 'telegram'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22 11 13 2 9z" />
              </svg>
            </template>

            <template v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </template>
          </span>

          <span class="min-w-0 flex-1">
            <span class="block text-xs text-subtle">{{ link.label }}</span>
            <span class="mt-0.5 block truncate font-mono text-[13px] text-ink">
              {{ link.value }}
            </span>
          </span>

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
            class="shrink-0 text-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ==========================================================================
   入场动画：一次性淡入上浮，配合 --rise-delay 实现错峰
   ========================================================================== */

.rise {
  animation: about-rise 600ms cubic-bezier(0.22, 1, 0.36, 1) var(--rise-delay, 0ms) backwards;
}

@keyframes about-rise {
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

/* ==========================================================================
   头像背后的呼吸光晕（与首页 Hero 同源）
   ========================================================================== */

.about-glow {
  position: absolute;
  inset: -2.5rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--accent) 30%, transparent),
    transparent 70%
  );
  filter: blur(2rem);
  opacity: 0.6;
  animation: about-breathe 5s ease-in-out infinite;
}

@keyframes about-breathe {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(1);
  }

  50% {
    opacity: 0.85;
    transform: scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rise {
    animation: none;
  }

  .about-glow {
    animation: none;
  }
}
</style>
