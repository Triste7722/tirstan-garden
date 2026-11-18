<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { site } from '@/config/site'
import { getPostById } from '@/data/posts'
import { parseMarkdown } from '@/utils/markdown'

const route = useRoute()

const post = computed(() => getPostById(Number(route.params.id)))
const parsed = computed(() => (post.value ? parseMarkdown(post.value.content) : null))
const html = computed(() => parsed.value?.html ?? '')
const headings = computed(() => parsed.value?.headings ?? [])

// 标题同步到浏览器标签页
watch(
  () => post.value?.title,
  (title) => {
    document.title = title ? `${title} · ${site.name}` : site.title
  },
  { immediate: true },
)

// ---------------------------------------------------------------------------
// 目录（TOC）高亮：基于滚动位置定位当前阅读到的标题
// ---------------------------------------------------------------------------

const activeId = ref('')
const HEADING_OFFSET = 120

function updateActiveHeading() {
  let current = headings.value[0]?.id ?? ''
  for (const heading of headings.value) {
    const el = document.getElementById(heading.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= HEADING_OFFSET) {
      current = heading.id
    } else {
      break
    }
  }
  activeId.value = current
}

function handleScroll() {
  updateActiveHeading()
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  activeId.value = id
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveHeading()
})

// 路由参数变化（组件被复用）时，等待 v-html 渲染后重新计算目录高亮
watch(headings, () => {
  updateActiveHeading()
}, { flush: 'post' })

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-5 sm:px-6">
    <template v-if="post">
      <!-- 返回按钮（顶部） -->
      <div class="pt-8 sm:pt-10">
        <BaseButton to="/posts" variant="ghost" size="sm">
          <template #prefix>
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
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </template>
          返回列表
        </BaseButton>
      </div>

      <!-- 顶部文章信息：居中 + 充足留白 -->
      <header class="mx-auto max-w-3xl pb-10 pt-10 text-center sm:pb-14 sm:pt-14">
        <div class="flex flex-wrap justify-center gap-1.5">
          <BaseTag
            v-for="(tag, i) in post.tags"
            :key="tag"
            :variant="i === 0 ? 'accent' : 'neutral'"
            :dot="i === 0"
          >
            {{ tag }}
          </BaseTag>
        </div>

        <h1
          class="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
        >
          {{ post.title }}
        </h1>

        <div
          class="mt-6 flex items-center justify-center gap-3 font-mono text-xs text-subtle sm:text-[13px]"
        >
          <time :datetime="post.date">{{ post.date }}</time>
          <span class="h-px w-4 bg-line" aria-hidden="true" />
          <span>{{ post.readingTime }}</span>
        </div>
      </header>

      <!-- 正文 + 右侧目录 -->
      <div class="border-t border-line/60 pt-10 sm:pt-12">
        <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <article class="prose mx-auto w-full max-w-3xl" v-html="html" />

          <!-- 目录：仅桌面端显示，悬浮于右侧 -->
          <aside class="hidden lg:block" aria-label="文章目录">
            <nav class="sticky top-24">
              <p class="mono-label text-subtle">目录</p>
              <ul class="mt-4 border-l border-line">
                <li v-for="heading in headings" :key="heading.id">
                  <button
                    type="button"
                    class="-ml-px block w-full border-l py-1.5 text-left text-[13px] leading-snug transition duration-200"
                    :class="[
                      heading.level === 3 ? 'pl-7' : 'pl-4',
                      activeId === heading.id
                        ? 'border-accent font-medium text-accent'
                        : 'border-transparent text-muted hover:text-ink',
                    ]"
                    @click="scrollToHeading(heading.id)"
                  >
                    {{ heading.text }}
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <!-- 返回按钮（底部） -->
      <div class="mt-14 flex justify-center border-t border-line/60 pt-10">
        <BaseButton to="/posts" variant="secondary">
          <template #prefix>
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
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </template>
          返回文章列表
        </BaseButton>
      </div>
    </template>

    <!-- 文章不存在 -->
    <template v-else>
      <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span class="mono-label text-accent">404</span>
        <h1 class="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
          文章不存在
        </h1>
        <p class="mt-3 text-sm text-muted">这篇内容可能已被删除，或者链接有误。</p>
        <div class="mt-8">
          <BaseButton to="/posts" variant="secondary">返回文章列表</BaseButton>
        </div>
      </div>
    </template>
  </main>
</template>

<!--
  Prose 样式必须使用非 scoped 的 <style>：v-html 注入的节点没有 scoped 的
  data-v 属性，scoped 后代选择器无法命中它们。这里用 .prose 命名空间隔离，
  不会影响站内其他页面。
-->
<style>
.prose {
  color: var(--ink);
  font-size: 1.0625rem;
  line-height: 1.85;
}

.prose > *:first-child {
  margin-top: 0;
}

.prose > * + * {
  margin-top: 1.6em;
}

/* 标题 */
.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: var(--ink);
  font-weight: 600;
  line-height: 1.32;
  letter-spacing: -0.02em;
  scroll-margin-top: 6rem;
}

.prose h1 {
  font-size: 1.9rem;
}

.prose h2 {
  margin-top: 2.5em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--line);
  font-size: 1.5rem;
}

.prose h3 {
  margin-top: 1.9em;
  font-size: 1.2rem;
}

.prose h4 {
  margin-top: 1.6em;
  font-size: 1.05rem;
}

/* 段落与强调 */
.prose p {
  color: var(--ink);
}

.prose strong {
  color: var(--ink);
  font-weight: 700;
}

.prose em {
  font-style: italic;
}

.prose a {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent) 40%, transparent);
  text-underline-offset: 3px;
  transition: color 200ms ease;
}

.prose a:hover {
  color: var(--accent-strong);
  text-decoration-color: var(--accent-strong);
}

/* 引用块 */
.prose blockquote {
  margin: 1.9em 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid color-mix(in srgb, var(--accent) 60%, transparent);
  border-radius: 0 0.75rem 0.75rem 0;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  color: var(--muted);
}

.prose blockquote p {
  color: var(--muted);
}

.prose blockquote p + p {
  margin-top: 0.5em;
}

/* 列表 */
.prose ul,
.prose ol {
  padding-left: 1.4em;
}

.prose ul {
  list-style: disc;
}

.prose ol {
  list-style: decimal;
}

.prose li {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose li::marker {
  color: var(--accent);
}

/* 行内代码 */
.prose :not(pre) > code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, var(--raised));
  border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
  border-radius: 0.375rem;
  padding: 0.15em 0.4em;
}

/* 分隔线 */
.prose hr {
  border: 0;
  height: 1px;
  margin: 2.5em 0;
  background: var(--line);
}

/* ==========================================================================
   代码块（深色底 + 圆角 + 等宽字体 + 语言标签栏）
   ========================================================================== */
.codeblock {
  margin: 1.9em 0;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 1rem;
  background: linear-gradient(180deg, #0b0e15, #090b10);
  box-shadow:
    0 10px 40px -20px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.codeblock__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
}

.codeblock__dots {
  display: inline-flex;
  gap: 6px;
}

.codeblock__dots i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.codeblock__dots i:nth-child(1) {
  background: #ff5f57;
}

.codeblock__dots i:nth-child(2) {
  background: #febc2e;
}

.codeblock__dots i:nth-child(3) {
  background: #28c840;
}

.codeblock__lang {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--subtle);
}

.codeblock pre {
  margin: 0;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.75;
  color: var(--ink);
  background: transparent;
}

.codeblock pre code {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: transparent;
  border: none;
  padding: 0;
}
</style>
