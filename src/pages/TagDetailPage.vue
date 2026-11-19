<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PostCard from '@/components/ui/PostCard.vue'
import { posts } from '@/data/posts'

const route = useRoute()

const tag = computed(() => {
  const raw = route.params.tag
  return Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '')
})

const tagPosts = computed(() =>
  posts
    .filter((post) => post.tags.includes(tag.value))
    .sort((a, b) => b.date.localeCompare(a.date)),
)
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <div class="pt-8 sm:pt-10">
      <BaseButton to="/tags" variant="ghost" size="sm">
        <template #prefix>
          <BaseIcon name="arrow-left" :size="15" />
        </template>
        返回标签
      </BaseButton>
    </div>

    <header class="pb-10 pt-10 sm:pb-12 sm:pt-12">
      <span class="mono-label text-accent">Tag</span>

      <h1 class="mt-4 text-display font-semibold text-ink">{{ tag }}</h1>

      <p class="mt-4 max-w-xl text-[15px] leading-8 text-muted">
        共 {{ tagPosts.length }} 篇带有「{{ tag }}」标签的文章。
      </p>
    </header>

    <section v-if="tagPosts.length" class="border-t border-line/60 py-10 sm:py-12">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="post in tagPosts" :key="post.id" :post="post" variant="grid" />
      </div>
    </section>

    <div v-else class="border-t border-line/60 py-16 sm:py-20">
      <EmptyState
        title="暂无文章"
        description="还没有文章使用这个标签，去标签总览看看其它主题吧。"
        action-to="/tags"
        action-label="浏览全部标签"
      />
    </div>
  </main>
</template>
