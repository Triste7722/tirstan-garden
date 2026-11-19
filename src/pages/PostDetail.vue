<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { HEADER_HEIGHT } from '@/config/layout'
import { site } from '@/config/site'
import { getPostById } from '@/data/posts'
import { parseMarkdown } from '@/utils/markdown'
import { generateSharePoster } from '@/utils/sharePoster'

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

const headingIds = computed(() => headings.value.map((heading) => heading.id))
const { activeId, progress, scrollTo: scrollToHeading } = useScrollSpy(headingIds, {
  offset: HEADER_HEIGHT + 56,
  progress: true,
})

// ---------------------------------------------------------------------------
// 分享海报
// ---------------------------------------------------------------------------

const posterBusy = ref(false)
const posterError = ref('')

async function handleSharePoster() {
  const currentPost = post.value
  if (!currentPost || posterBusy.value) return

  posterBusy.value = true
  posterError.value = ''

  try {
    await generateSharePoster(currentPost)
  } catch {
    posterError.value = '海报生成失败，请稍后重试'
  } finally {
    posterBusy.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- 阅读进度条 -->
    <div
      v-if="post"
      class="reading-progress fixed left-0 top-0 z-[70] h-0.5"
      :style="{ width: `${(progress * 100).toFixed(2)}%` }"
      aria-hidden="true"
    />

    <template v-if="post">
      <!-- 返回按钮（顶部） -->
      <div class="pt-8 sm:pt-10">
        <BaseButton to="/posts" variant="ghost" size="sm">
          <template #prefix>
            <BaseIcon name="arrow-left" :size="15" />
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

        <div class="mt-6 flex flex-col items-center gap-2">
          <BaseButton
            variant="secondary"
            size="sm"
            :disabled="posterBusy"
            @click="handleSharePoster"
          >
            <template #prefix>
              <BaseIcon name="download" :size="15" />
            </template>
            {{ posterBusy ? '生成中…' : '生成分享海报' }}
          </BaseButton>

          <p v-if="posterError" class="text-xs text-danger">{{ posterError }}</p>
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
            <BaseIcon name="arrow-left" :size="15" />
          </template>
          返回文章列表
        </BaseButton>
      </div>
    </template>

    <!-- 文章不存在 -->
    <template v-else>
      <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span class="mono-label text-accent">404</span>
        <h1 class="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">文章不存在</h1>
        <p class="mt-3 text-sm text-muted">这篇内容可能已被删除，或者链接有误。</p>
        <div class="mt-8">
          <BaseButton to="/posts" variant="secondary">返回文章列表</BaseButton>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.reading-progress {
  background: linear-gradient(to right, var(--accent), var(--violet));
}
</style>
