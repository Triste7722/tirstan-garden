<script setup lang="ts">
import { RouterLink } from 'vue-router'

import LogoMark from '@/components/layout/LogoMark.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { site } from '@/config/site'
import { posts } from '@/data/posts'
import { daysSince } from '@/utils/format'

const year = new Date().getFullYear()

const days = daysSince(site.foundedAt)
</script>

<template>
  <footer class="relative mt-auto">
    <div class="border-t border-line/60">
      <div class="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <!-- 品牌 + 社交 -->
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-3">
            <LogoMark :size="34" />
            <p class="font-display text-base font-semibold text-ink">{{ site.name }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <a
              v-for="link in site.social"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :title="link.label"
              :aria-label="link.label"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <BaseIcon :name="link.icon ?? 'mail'" :size="16" />
            </a>
          </div>
        </div>

        <!-- 导航 + RSS -->
        <div
          class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/60 pt-6"
        >
          <nav class="flex flex-wrap gap-x-5 gap-y-2" aria-label="页脚导航">
            <RouterLink
              v-for="item in site.nav"
              :key="item.to"
              :to="item.to"
              class="text-xs text-muted transition hover:text-accent"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <a
            href="/feed.xml"
            class="inline-flex items-center gap-1 text-xs text-muted transition hover:text-accent"
          >
            <BaseIcon name="rss" :size="13" />
            RSS
          </a>
        </div>

        <!-- 统计 + 版权 + 备案 -->
        <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p class="font-mono text-[10px] tracking-[0.12em] text-subtle">
            建站 {{ days }} 天 · {{ posts.length }} 篇文章
          </p>

          <p class="text-xs text-subtle">
            © {{ year }} {{ site.author.name }}
            <span v-if="site.icp" class="ml-2">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                class="transition hover:text-accent"
              >
                {{ site.icp }}
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div
      class="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      aria-hidden="true"
    />
  </footer>
</template>
