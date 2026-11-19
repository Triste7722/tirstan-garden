<script setup lang="ts">
import { RouterLink } from 'vue-router'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import type { Post } from '@/data/posts'

withDefaults(
  defineProps<{
    post: Post
    /** list：首页横向列表项；grid：文章页卡片网格 */
    variant?: 'list' | 'grid'
  }>(),
  {
    variant: 'grid',
  },
)
</script>

<template>
  <!-- 横向列表项（首页最新文章） -->
  <RouterLink
    v-if="variant === 'list'"
    :to="`/posts/${post.id}`"
    class="group flex flex-col gap-3 py-5 transition-colors duration-200 sm:flex-row sm:items-center sm:gap-6"
  >
    <time
      :datetime="post.date"
      class="w-24 shrink-0 font-mono text-[11px] text-md-on-surface-variant"
    >
      {{ post.date }}
    </time>

    <div class="min-w-0 flex-1">
      <h3
        class="font-display text-base font-semibold tracking-tight text-md-on-surface transition-colors duration-200 group-hover:text-md-primary"
      >
        {{ post.title }}
      </h3>
      <p class="mt-1 line-clamp-1 text-sm leading-6 text-md-on-surface-variant">
        {{ post.summary }}
      </p>
    </div>

    <div class="hidden shrink-0 flex-wrap gap-1.5 md:flex">
      <BaseTag v-for="tag in post.tags" :key="tag" variant="neutral">
        {{ tag }}
      </BaseTag>
    </div>

    <BaseIcon
      name="arrow-right"
      :size="16"
      class="shrink-0 text-md-on-surface-variant transition-transform duration-200 group-hover:translate-x-1 group-hover:text-md-primary"
    />
  </RouterLink>

  <!-- 卡片网格项（文章列表页） -->
  <RouterLink v-else :to="`/posts/${post.id}`" class="block h-full">
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
</template>
