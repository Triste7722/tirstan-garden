<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { posts } from '@/data/posts'

const activeTag = ref('全部')

const allTags = computed(() => {
  const set = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) set.add(tag)
  }
  return ['全部', ...set]
})

const filteredPosts = computed(() =>
  activeTag.value === '全部'
    ? posts
    : posts.filter((post) => post.tags.includes(activeTag.value)),
)
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- Header -->
    <header class="pb-10 pt-16 sm:pb-12 sm:pt-20">
      <span class="mono-label text-accent">Articles</span>

      <h1 class="mt-4 text-display font-semibold text-ink">所有文章</h1>

      <p class="mt-4 max-w-xl text-[15px] leading-8 text-muted">
        Notes on code, design, and the life in between — written slowly.
      </p>
    </header>

    <template v-if="posts.length">
      <!-- Tag filter -->
      <div class="border-t border-line/60 pt-8">
        <div class="flex flex-wrap gap-2" role="group" aria-label="按标签筛选文章">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            :class="
              activeTag === tag
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-line bg-surface/40 text-muted hover:border-accent/30 hover:text-ink'
            "
            :aria-pressed="activeTag === tag"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>

        <p class="mt-5 font-mono text-[11px] text-subtle">
          显示 {{ filteredPosts.length }} / {{ posts.length }} 篇
        </p>
      </div>

      <!-- Grid -->
      <section class="py-10 sm:py-12">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="post in filteredPosts"
            :key="post.id"
            :to="`/posts/${post.id}`"
            class="block h-full"
          >
            <BaseCard variant="glass" padding="md" hoverable class="flex h-full flex-col">
              <h3 class="font-display text-base font-semibold tracking-tight text-ink">
                {{ post.title }}
              </h3>

              <div class="mt-3 flex items-center gap-2 font-mono text-[11px] text-subtle">
                <time :datetime="post.date">{{ post.date }}</time>
                <span class="h-px w-4 bg-line" aria-hidden="true" />
                <span>{{ post.readingTime }}</span>
              </div>

              <p class="mt-4 line-clamp-2 text-sm leading-7 text-muted">{{ post.summary }}</p>

              <div class="mt-auto flex flex-wrap gap-1.5 pt-5">
                <BaseTag
                  v-for="(tag, i) in post.tags"
                  :key="tag"
                  :variant="i === 0 ? 'accent' : 'neutral'"
                  :dot="i === 0"
                >
                  {{ tag }}
                </BaseTag>
              </div>
            </BaseCard>
          </RouterLink>
        </div>
      </section>
    </template>

    <!-- Empty -->
    <div v-else class="border-t border-line/60 py-16 sm:py-20">
      <div class="glass-panel mx-auto max-w-xl rounded-2xl px-8 py-16 text-center">
        <span class="mono-label text-accent">Empty</span>
        <h2 class="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">暂无文章</h2>
        <p class="mt-3 text-sm leading-7 text-muted">这里还没有内容，稍后再来看看吧。</p>
      </div>
    </div>
  </main>
</template>
