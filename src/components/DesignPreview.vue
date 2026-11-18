<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { site } from '@/config/site'
import { useTheme } from '@/composables/useTheme'

const { theme } = useTheme()
const searchQuery = ref('')

const palette = [
  { name: 'Void', hex: '#07080B', role: '页面底色' },
  { name: 'Surface', hex: '#0E1015', role: '卡片表面' },
  { name: 'Raised', hex: '#14171E', role: '抬升表面' },
  { name: 'Ink', hex: '#E8EBF2', role: '主文字' },
  { name: 'Muted', hex: '#9AA3B2', role: '次级文字' },
  { name: 'Accent', hex: '#22D3EE', role: '强调 / 交互' },
  { name: 'Violet', hex: '#8B5CF6', role: '渐变副色' },
  { name: 'Success', hex: '#34D399', role: '成功状态' },
  { name: 'Warning', hex: '#FBBF24', role: '警告状态' },
  { name: 'Danger', hex: '#FB7185', role: '危险状态' },
]

const typeScale = [
  { name: 'Display', className: 'text-display', size: 'clamp(42–74) / 1.02', weight: '600' },
  { name: 'Heading 1', className: 'text-4xl', size: '36 / 1.1', weight: '600' },
  { name: 'Heading 2', className: 'text-3xl', size: '30 / 1.2', weight: '600' },
  { name: 'Heading 3', className: 'text-xl', size: '20 / 1.4', weight: '500' },
  { name: 'Body', className: 'text-base', size: '16 / 1.8', weight: '400' },
  { name: 'Small', className: 'text-sm', size: '14 / 1.6', weight: '400' },
  { name: 'Mono', className: 'font-mono text-xs', size: '12 / 1.4', weight: '500' },
]
</script>

<template>
    <main id="top" class="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
      <!-- Hero -->
      <section class="grid gap-12 pb-20 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-24 lg:pt-24">
        <div class="max-w-2xl">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
          >
            <span class="status-dot" aria-hidden="true" />
            M0 · Foundations
          </span>

          <h1 class="mt-6 text-display font-semibold text-ink">
            为文字，<br />
            造一处<span class="text-gradient">深色空间</span>。
          </h1>

          <p class="mt-6 max-w-xl text-[15px] leading-8 text-muted">
            这是 {{ site.name }} 的设计系统预览页。颜色、字体、玻璃质感、光影与基础组件都在这里先跑一遍，
            确认视觉基调之后，我们再进入页面开发。
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <BaseButton href="#tokens">
              查看设计令牌
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
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </template>
            </BaseButton>
            <BaseButton href="#components" variant="secondary">浏览基础组件</BaseButton>
          </div>

          <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            self-hosted fonts · dark first · reduced-motion safe
          </p>

          <div class="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
            <div>
              <p class="font-display text-2xl font-semibold text-ink">10</p>
              <p class="mono-label mt-1 text-subtle">Tokens</p>
            </div>
            <div>
              <p class="font-display text-2xl font-semibold text-ink">06</p>
              <p class="mono-label mt-1 text-subtle">Components</p>
            </div>
            <div>
              <p class="font-display text-2xl font-semibold text-ink">02</p>
              <p class="mono-label mt-1 text-subtle">Fonts</p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl"
            aria-hidden="true"
          />

          <BaseCard variant="glass" padding="none" class="relative overflow-hidden">
            <div class="flex items-center gap-2 border-b border-line/70 px-4 py-3">
              <span class="h-2.5 w-2.5 rounded-full bg-danger/80" aria-hidden="true" />
              <span class="h-2.5 w-2.5 rounded-full bg-warning/80" aria-hidden="true" />
              <span class="h-2.5 w-2.5 rounded-full bg-success/80" aria-hidden="true" />
              <span class="ml-2 font-mono text-[10px] text-subtle">myblog — zsh</span>
              <span class="ml-auto font-mono text-[10px] text-subtle">M0</span>
            </div>

            <div class="space-y-2.5 p-5 font-mono text-[12px] leading-6">
              <p class="flex items-center gap-2">
                <span class="text-accent">➜</span>
                <span class="text-muted">pnpm</span>
                <span class="text-ink">dev</span>
              </p>
              <p class="text-subtle">
                VITE v8.3.8 ready in <span class="text-success">312</span> ms
              </p>
              <p>
                <span class="text-muted">➜</span>
                Local:
                <span class="text-accent">http://localhost:5173/</span>
              </p>
              <p>
                <span class="text-muted">➜</span>
                Theme:
                <span class="text-violet">{{ theme }}</span>
              </p>

              <div class="mt-4 border-t border-line/70 pt-4">
                <p class="text-subtle">// tokens loaded</p>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="chip in ['base', 'surface', 'accent', 'violet']"
                    :key="chip"
                    class="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted"
                  >
                    {{ chip }}
                  </span>
                </div>
              </div>
            </div>
          </BaseCard>

          <div
            class="glass-panel float-slow absolute -bottom-5 left-5 hidden items-center gap-2 rounded-full px-4 py-2 sm:flex"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span class="font-mono text-[10px] tracking-wide text-muted">
              Space Grotesk + JetBrains Mono
            </span>
          </div>
        </div>
      </section>

      <!-- Colors -->
      <section id="tokens" class="scroll-mt-24 border-t border-line/60 py-16 sm:py-20">
        <SectionHeading
          index="01"
          eyebrow="Color"
          title="颜色与令牌"
          description="深色优先的中性色阶，加上克制的青蓝强调色。所有语义色都映射为 CSS 变量，浅色主题只覆盖变量，不重写组件。"
        />

        <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <div
            v-for="color in palette"
            :key="color.name"
            class="overflow-hidden rounded-card border border-line bg-surface"
          >
            <div
              class="h-16 w-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:h-20"
              :style="{ backgroundColor: color.hex }"
              aria-hidden="true"
            />
            <div class="p-3">
              <p class="text-sm font-medium text-ink">{{ color.name }}</p>
              <p class="mt-0.5 font-mono text-[10px] text-muted">{{ color.hex }}</p>
              <p class="mt-1 text-[11px] text-subtle">{{ color.role }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-card border border-line bg-surface/50 px-4 py-3">
          <span class="mono-label text-subtle">Semantic</span>
          <code class="font-mono text-[11px] text-muted">--base</code>
          <code class="font-mono text-[11px] text-muted">--surface</code>
          <code class="font-mono text-[11px] text-muted">--raised</code>
          <code class="font-mono text-[11px] text-muted">--ink</code>
          <code class="font-mono text-[11px] text-muted">--muted</code>
          <code class="font-mono text-[11px] text-accent">--accent</code>
        </div>
      </section>

      <!-- Typography -->
      <section class="border-t border-line/60 py-16 sm:py-20">
        <SectionHeading
          index="02"
          eyebrow="Typography"
          title="字体与排版"
          description="Space Grotesk 负责拉丁字母与数字，JetBrains Mono 负责代码、标签与元信息，中文回退到系统黑体，保证加载速度与阅读舒适度。"
        />

        <div class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <BaseCard variant="glass" padding="lg" class="max-sm:p-6">
            <p class="mono-label text-accent">Type specimen</p>

            <p class="mt-6 font-display text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              深色，也可以很好读。
            </p>

            <p class="mt-5 max-w-xl text-[15px] leading-7 text-muted">
              好的深色界面不是把白色反过来，而是重新设计一套明度关系。背景退后，内容向前，
              强调色只在需要被看见的地方出现。正文行高保持在 1.8 左右，长文阅读不紧绷。
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <BaseTag variant="neutral">Space Grotesk</BaseTag>
              <BaseTag variant="neutral">JetBrains Mono</BaseTag>
              <BaseTag variant="accent" dot>中文系统字体回退</BaseTag>
            </div>

            <div class="mt-8 rounded-card border border-line bg-canvas/60 p-4">
              <p class="font-mono text-[11px] leading-6 text-muted">
                <span class="text-violet">const</span>
                <span class="text-ink"> palette</span>
                <span class="text-subtle"> = </span>
                <span class="text-accent">'dark-first'</span>
              </p>
            </div>
          </BaseCard>

          <div class="space-y-2.5">
            <div
              v-for="item in typeScale"
              :key="item.name"
              class="flex items-end justify-between gap-4 rounded-card border border-line bg-surface/60 px-5 py-4"
            >
              <div class="flex items-baseline gap-4">
                <span :class="['font-display font-semibold leading-none text-ink', item.className]">
                  Aa
                </span>
                <span class="text-xs text-muted">{{ item.name }}</span>
              </div>
              <span class="shrink-0 font-mono text-[10px] text-subtle">
                {{ item.size }} / {{ item.weight }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Components -->
      <section id="components" class="scroll-mt-24 border-t border-line/60 py-16 sm:py-20">
        <SectionHeading
          index="03"
          eyebrow="Controls"
          title="按钮与交互控件"
          description="统一的高度、圆角与聚焦环。主按钮带柔和外发光，次级按钮使用玻璃描边，危险操作只在真正需要时出现。"
        />

        <BaseCard variant="surface" padding="lg">
          <div class="grid gap-8 lg:grid-cols-2">
            <div>
              <p class="mono-label text-subtle">Variants</p>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <BaseButton>
                  开始阅读
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
                <BaseButton variant="secondary">查看令牌</BaseButton>
                <BaseButton variant="ghost">次要操作</BaseButton>
                <BaseButton variant="danger">危险操作</BaseButton>
              </div>
              <p class="mt-4 max-w-md text-xs leading-6 text-subtle">
                Primary 使用青蓝强调色与柔和外发光；Secondary 为玻璃描边；Ghost 仅用于低权重操作。
              </p>
            </div>

            <div>
              <p class="mono-label text-subtle">Sizes & states</p>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <BaseButton size="sm">Small</BaseButton>
                <BaseButton size="md">Medium</BaseButton>
                <BaseButton size="lg">Large</BaseButton>
              </div>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <BaseButton disabled>Disabled</BaseButton>
                <BaseButton variant="secondary" disabled>Disabled</BaseButton>
              </div>
              <p class="mt-4 max-w-md text-xs leading-6 text-subtle">
                按钮支持链接语义（传入 href 渲染为 a 标签），禁用态会同时处理鼠标与键盘焦点。
              </p>
            </div>
          </div>
        </BaseCard>

        <div class="mt-12">
          <SectionHeading
            index="04"
            eyebrow="Tags & input"
            title="标签与输入"
            description="标签用于分类和状态，输入框为后续站内搜索预留。聚焦时只改变描边与柔和光晕，不跳动布局。"
          />

          <BaseCard variant="surface" padding="lg">
            <div class="grid gap-8 lg:grid-cols-2">
              <div>
                <p class="mono-label text-subtle">Tags</p>
                <div class="mt-4 flex flex-wrap items-center gap-2">
                  <BaseTag variant="accent" dot>Vue 3</BaseTag>
                  <BaseTag variant="neutral">TypeScript</BaseTag>
                  <BaseTag variant="outline">Tailwind v4</BaseTag>
                  <BaseTag variant="success" dot>Stable</BaseTag>
                  <BaseTag variant="violet">Design</BaseTag>
                </div>
                <div class="mt-5 flex flex-wrap items-center gap-2">
                  <BaseTag variant="accent" size="md" dot>标签 / md</BaseTag>
                  <BaseTag variant="outline" size="md">Outline / md</BaseTag>
                  <BaseTag variant="neutral" size="md">Neutral / md</BaseTag>
                </div>
              </div>

              <div>
                <p class="mono-label text-subtle">Input</p>
                <div class="mt-4 space-y-3">
                  <BaseInput
                    v-model="searchQuery"
                    aria-label="示例搜索框"
                    placeholder="搜索文章、标签或片段…"
                  >
                    <template #prefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="shrink-0 text-subtle"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    </template>
                    <template #suffix>
                      <kbd
                        class="rounded border border-line bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] text-subtle"
                      >
                        ⌘K
                      </kbd>
                    </template>
                  </BaseInput>

                  <BaseInput aria-label="禁用输入示例" placeholder="禁用状态" disabled />
                </div>
                <p class="mt-3 text-xs text-subtle">
                  当前输入：<span class="text-muted">{{ searchQuery || '—' }}</span>
                </p>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="mt-12">
          <SectionHeading
            index="05"
            eyebrow="Cards"
            title="卡片与表面"
            description="三种表面层级：玻璃、实色与强调卡片。强调卡片只用于真正重要的内容，避免整页都在发光。"
          />

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <BaseCard variant="glass" padding="lg" hoverable>
              <div class="flex items-center justify-between">
                <BaseTag variant="accent" dot>Glass</BaseTag>
                <span class="font-mono text-[10px] text-subtle">01</span>
              </div>
              <h3 class="mt-6 font-display text-xl font-semibold text-ink">玻璃拟态</h3>
              <p class="mt-2 text-sm leading-7 text-muted">
                18px 背景模糊加 140% 饱和度，只用在顶栏、浮层和需要与背景发生关系的卡片上。
              </p>
              <div class="mt-6 flex items-center gap-2 text-[11px] text-subtle">
                <span class="h-px flex-1 bg-line" aria-hidden="true" />
                backdrop-blur
              </div>
            </BaseCard>

            <BaseCard variant="surface" padding="lg" hoverable>
              <div class="flex items-center justify-between">
                <BaseTag variant="neutral">Surface</BaseTag>
                <span class="font-mono text-[10px] text-subtle">02</span>
              </div>
              <h3 class="mt-6 font-display text-xl font-semibold text-ink">分层表面</h3>
              <p class="mt-2 text-sm leading-7 text-muted">
                用明度而不是重阴影区分层级。卡片、页面与背景之间保持一层细描边。
              </p>
              <ul class="mt-6 space-y-2 text-xs text-muted">
                <li class="flex items-center gap-2">
                  <span class="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  base / surface / raised
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  1px 低对比描边
                </li>
              </ul>
            </BaseCard>

            <BaseCard variant="feature" padding="lg" hoverable class="md:col-span-2 xl:col-span-1">
              <div class="flex items-center justify-between">
                <BaseTag variant="violet" dot>Feature</BaseTag>
                <span class="font-mono text-[10px] text-subtle">03</span>
              </div>
              <h3 class="mt-6 font-display text-xl font-semibold text-ink">带光晕的强调卡片</h3>
              <p class="mt-2 text-sm leading-7 text-muted">
                渐变描边加一层低透明度径向光晕，用来承载精选文章或需要突出的入口。
              </p>
              <div class="mt-6 flex items-center justify-between">
                <span class="mono-label text-accent">Highlight</span>
                <span class="h-8 w-8 rounded-full border border-accent/30 bg-accent/10" aria-hidden="true" />
              </div>
            </BaseCard>
          </div>
        </div>
      </section>

      <!-- Effects -->
      <section class="border-t border-line/60 py-16 sm:py-20">
        <SectionHeading
          index="06"
          eyebrow="Surfaces & motion"
          title="表面、光影与动效"
          description="背景网格固定在视口，不抢内容；动效控制在 240–300ms，并且尊重系统的减少动态偏好。"
        />

        <div class="grid gap-4 lg:grid-cols-3">
          <div class="relative h-56 overflow-hidden rounded-panel border border-line bg-surface/50">
            <div class="grid-demo absolute inset-0 opacity-70" aria-hidden="true" />
            <div
              class="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl"
              aria-hidden="true"
            />
            <div class="relative flex h-full flex-col justify-between p-6">
              <p class="mono-label text-subtle">Grid + glow</p>
              <div>
                <p class="font-display text-lg font-semibold text-ink">网格与光晕</p>
                <p class="mt-1 text-xs leading-6 text-muted">固定背景层，滚动时保持稳定。</p>
              </div>
            </div>
          </div>

          <div class="glass-panel flex h-56 flex-col justify-between rounded-panel p-6">
            <p class="mono-label text-subtle">Glass / 18px</p>
            <div>
              <p class="font-display text-lg font-semibold text-ink">玻璃质感</p>
              <p class="mt-1 text-xs leading-6 text-muted">只用于顶栏与浮层，避免大面积使用。</p>
            </div>
          </div>

          <div
            class="card-hover group flex h-56 flex-col justify-between rounded-panel border border-line bg-surface p-6"
          >
            <div class="flex items-center justify-between">
              <p class="mono-label text-subtle">Hover lift</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-accent transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <div>
              <p class="font-display text-lg font-semibold text-ink">悬停微动</p>
              <p class="mt-1 text-xs leading-6 text-muted">4px 抬升 + 强调色描边，240ms 缓动。</p>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-card border border-line bg-surface/40 px-5 py-4">
          <p class="text-xs leading-6 text-subtle">
            提示：点击右上角的主题按钮可以检查浅色主题。浅色主题只覆盖语义变量，组件结构保持不变。
            系统开启「减少动态效果」时，所有动画会自动降级。
          </p>
        </div>
      </section>
    </main>
</template>
