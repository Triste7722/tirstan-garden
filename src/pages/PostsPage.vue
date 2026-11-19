<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import EmptyState from '@/components/ui/EmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import PostCard from '@/components/ui/PostCard.vue'
import { posts } from '@/data/posts'

interface TagOption {
  value: string | null
  label: string
}

/** null 表示「全部」，避免用中文标签作为哨兵值 */
const activeTag = ref<string | null>(null)

const tagOptions = computed<TagOption[]>(() => {
  const tags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) tags.add(tag)
  }
  return [{ value: null, label: '全部' }, ...[...tags].map((tag) => ({ value: tag, label: tag }))]
})

const filteredPosts = computed(() => {
  const tag = activeTag.value
  return tag === null ? posts : posts.filter((post) => post.tags.includes(tag))
})
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- Header -->
    <PageHeader
      eyebrow="Articles"
      title="所有文章"
      description="Notes on code, design, and the life in between — written slowly."
    />

    <template v-if="posts.length">
      <!-- Tag filter -->
      <div class="border-t border-line/60 pt-8">
        <div class="flex flex-wrap gap-2" role="group" aria-label="按标签筛选文章">
          <button
            v-for="option in tagOptions"
            :key="option.label"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            :class="
              activeTag === option.value
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-line bg-surface/40 text-muted hover:border-accent/30 hover:text-ink'
            "
            :aria-pressed="activeTag === option.value"
            @click="activeTag = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="mt-5 flex items-center justify-between gap-4">
          <p class="font-mono text-[11px] text-subtle">
            显示 {{ filteredPosts.length }} / {{ posts.length }} 篇
          </p>

          <RouterLink
            to="/tags"
            class="inline-flex items-center gap-1 text-xs text-muted transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            查看标签总览
            <BaseIcon name="arrow-right" :size="13" />
          </RouterLink>
        </div>
      </div>

      <!-- Grid -->
      <section class="py-10 sm:py-12">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" variant="grid" />
        </div>
      </section>
    </template>

    <!-- Empty -->
    <div v-else class="border-t border-line/60 py-16 sm:py-20">
      <EmptyState title="暂无文章" description="这里还没有内容，稍后再来看看吧。" />
    </div>
  </main>
</template>
