<script setup lang="ts">
import { computed } from 'vue'

import HeroSection from '@/components/home/HeroSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import TimelineSection from '@/components/home/TimelineSection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PostCard from '@/components/ui/PostCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { posts } from '@/data/posts'

/** 精选文章：消费 featured 字段 */
const featuredPosts = computed(() =>
  [...posts].filter((post) => post.featured).sort((a, b) => b.date.localeCompare(a.date)),
)

const hasFeatured = computed(() => featuredPosts.value.length > 0)

/** 最新文章（按时间倒序，最多 4 篇；有精选时排除已精选文章，避免重复） */
const latestPosts = computed(() => {
  const source = hasFeatured.value ? posts.filter((post) => !post.featured) : posts
  return [...source].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
})

/** 精选区：没有精选时回退到最新文章 */
const featuredList = computed(() =>
  hasFeatured.value ? featuredPosts.value : latestPosts.value,
)
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <HeroSection />
    <TimelineSection />
    <ProjectsSection />

    <!-- 精选文章（无 featured 时回退到最新文章） -->
    <section class="border-t border-line/60 py-16 sm:py-20">
      <SectionHeading
        index="03"
        eyebrow="Featured"
        title="精选文章"
        description="挑出来的几篇，关于代码、设计与生活。"
      />

      <div v-if="featuredList.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="post in featuredList" :key="post.id" :post="post" variant="grid" />
      </div>

      <div v-else>
        <EmptyState title="还没有文章" description="先去写一篇吧。" />
      </div>
    </section>

    <!-- 最新文章：仅在存在精选文章时展示，避免与回退内容重复 -->
    <section
      v-if="hasFeatured && latestPosts.length"
      class="border-t border-line/60 py-16 sm:py-20"
    >
      <SectionHeading
        index="04"
        eyebrow="Writing"
        title="最新文章"
        description="关于代码、设计与生活的最近几篇记录。"
      />

      <ul class="mt-8 divide-y divide-md-outline-variant border-y border-md-outline-variant">
        <li v-for="post in latestPosts" :key="post.id">
          <PostCard :post="post" variant="list" />
        </li>
      </ul>

      <div class="mt-10 flex justify-center">
        <BaseButton to="/posts" variant="secondary">
          查看全部文章
          <template #suffix>
            <BaseIcon name="arrow-right" :size="15" />
          </template>
        </BaseButton>
      </div>
    </section>
  </main>
</template>
