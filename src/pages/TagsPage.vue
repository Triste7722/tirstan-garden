<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BaseCard from '@/components/ui/BaseCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { posts } from '@/data/posts'

interface TagSummary {
  name: string
  count: number
}

const tags = computed<TagSummary[]>(() => {
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
})
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <PageHeader
      eyebrow="Tags"
      title="标签"
      :description="`按主题浏览文章。标签从文章数据中自动汇总，共 ${tags.length} 个。`"
    />

    <template v-if="tags.length">
      <ul class="grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="tag in tags" :key="tag.name" class="h-full">
          <RouterLink :to="`/tags/${encodeURIComponent(tag.name)}`" class="group block h-full">
            <BaseCard
              variant="glass"
              padding="md"
              hoverable
              class="flex h-full items-center justify-between gap-4"
            >
              <div class="min-w-0">
                <h2
                  class="font-display text-base font-semibold tracking-tight text-md-on-surface"
                >
                  {{ tag.name }}
                </h2>
                <p class="mt-1 font-mono text-[11px] text-subtle">{{ tag.count }} 篇文章</p>
              </div>

              <BaseIcon
                name="arrow-right"
                :size="16"
                class="shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
              />
            </BaseCard>
          </RouterLink>
        </li>
      </ul>
    </template>

    <div v-else class="border-t border-line/60 py-16 sm:py-20">
      <EmptyState title="暂无标签" description="文章添加标签后，这里会自动汇总。" />
    </div>
  </main>
</template>
