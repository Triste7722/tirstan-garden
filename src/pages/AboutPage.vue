<script setup lang="ts">
import { computed } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { site } from '@/config/site'
import { aboutProfile, articleParagraphs, experiences, techStack } from '@/data/about'
import { projects } from '@/data/projects'
import { posts } from '@/data/posts'
import { skillLevelVariant, skills } from '@/data/skills'
import { daysSince } from '@/utils/format'

type HighlightTone = 'primary' | 'secondary' | 'tertiary'

const toneClass: Record<HighlightTone, string> = {
  primary: 'rounded bg-md-primary-container px-1 text-md-on-primary-container',
  secondary: 'rounded bg-md-secondary-container px-1 text-md-on-secondary-container',
  tertiary: 'rounded bg-md-tertiary-container px-1 text-md-on-tertiary-container',
}

function toneClasses(tone?: HighlightTone): string {
  return tone ? toneClass[tone] : ''
}

const topSkills = computed(() => skills.slice(0, 8))

const days = daysSince(site.foundedAt)
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <!-- 页头 -->
    <PageHeader eyebrow="About" title="关于" description="关于我，以及这个博客。" />

    <!-- 个人简介卡片 -->
    <section class="pb-10">
      <BaseCard variant="glass" padding="lg">
        <div
          class="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left"
        >
          <img
            :src="site.author.avatar"
            :alt="aboutProfile.nickname"
            class="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-elevation-2"
          />

          <div class="min-w-0 flex-1">
            <h2 class="font-display text-2xl font-semibold tracking-tight text-md-on-surface">
              {{ aboutProfile.nickname }}
            </h2>
            <p class="mt-1.5 text-sm text-md-on-surface-variant">{{ aboutProfile.tagline }}</p>

            <div class="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <BaseTag variant="neutral">{{ aboutProfile.location }}</BaseTag>
              <BaseTag variant="outline" dot>{{ aboutProfile.status }}</BaseTag>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- 正文 + 侧栏（技能 / 项目） -->
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <!-- 正文文章卡片 -->
      <BaseCard variant="glass" padding="lg">
        <SectionHeading index="01" eyebrow="Story" title="小糊涂仙传" compact />

        <article class="prose mt-2 max-w-none">
          <template v-for="(paragraph, index) in articleParagraphs" :key="index">
            <blockquote v-if="paragraph.quote">
              <p>
                <template v-for="(segment, si) in paragraph.segments" :key="si">
                  <mark v-if="segment.tone" :class="toneClasses(segment.tone)">
                    {{ segment.text }}
                  </mark>
                  <template v-else>{{ segment.text }}</template>
                </template>
              </p>
            </blockquote>

            <p v-else>
              <template v-for="(segment, si) in paragraph.segments" :key="si">
                <mark v-if="segment.tone" :class="toneClasses(segment.tone)">
                  {{ segment.text }}
                </mark>
                <template v-else>{{ segment.text }}</template>
              </template>
            </p>
          </template>
        </article>
      </BaseCard>

      <!-- 侧栏 -->
      <div class="space-y-6">
        <!-- 技能概览 -->
        <BaseCard variant="glass" padding="md">
          <SectionHeading index="02" eyebrow="Skills" title="技能概览" compact />

          <ul class="space-y-2.5">
            <li
              v-for="skill in topSkills"
              :key="skill.name"
              class="flex items-center justify-between gap-3"
            >
              <span class="truncate text-sm text-md-on-surface">{{ skill.name }}</span>
              <BaseTag :variant="skillLevelVariant[skill.level]" class="shrink-0">
                {{ skill.level }}
              </BaseTag>
            </li>
          </ul>

          <div class="mt-5">
            <BaseButton to="/skills" variant="secondary" size="sm">
              查看全部技能
              <template #suffix>
                <BaseIcon name="arrow-right" :size="14" />
              </template>
            </BaseButton>
          </div>
        </BaseCard>

        <!-- 项目作品 -->
        <BaseCard variant="glass" padding="md">
          <SectionHeading index="03" eyebrow="Projects" title="项目作品" compact />

          <ul class="space-y-5">
            <li v-for="project in projects" :key="project.id">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3
                    class="flex items-center gap-2 font-display text-sm font-semibold text-md-on-surface"
                  >
                    <span
                      class="h-2 w-2 shrink-0 rounded-full"
                      :class="project.accent === 'violet' ? 'bg-md-secondary' : 'bg-md-primary'"
                      aria-hidden="true"
                    />
                    {{ project.name }}
                  </h3>

                  <p class="mt-1 text-sm leading-6 text-md-on-surface-variant">
                    {{ project.description }}
                  </p>

                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <BaseTag v-for="tag in project.tags" :key="tag" variant="neutral">
                      {{ tag }}
                    </BaseTag>
                  </div>
                </div>

                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 text-subtle transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  :aria-label="`查看 ${project.name}`"
                >
                  <BaseIcon name="arrow-up-right" :size="16" />
                </a>
              </div>
            </li>
          </ul>
        </BaseCard>
      </div>
    </div>

    <!-- 时间线 / 经历 + 站点信息 -->
    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <BaseCard variant="glass" padding="md">
        <SectionHeading index="04" eyebrow="Timeline" title="经历" compact />

        <ul class="space-y-5">
          <li v-for="item in experiences" :key="item.title" class="relative pl-6">
            <span
              class="absolute left-0 top-1 h-2 w-2 rounded-full bg-md-primary"
              aria-hidden="true"
            />
            <p class="font-mono text-[11px] text-md-on-surface-variant">{{ item.date }}</p>
            <h3 class="mt-0.5 font-display text-sm font-semibold text-md-on-surface">
              {{ item.title }}
            </h3>
            <p v-if="item.description" class="mt-1 text-sm leading-6 text-md-on-surface-variant">
              {{ item.description }}
            </p>
          </li>
        </ul>
      </BaseCard>

      <BaseCard variant="glass" padding="md">
        <SectionHeading index="05" eyebrow="Site" title="站点信息" compact />

        <dl class="space-y-3 text-sm">
          <div class="flex items-center justify-between gap-4">
            <dt class="text-md-on-surface-variant">建站时间</dt>
            <dd class="font-mono text-md-on-surface">{{ site.foundedAt }}</dd>
          </div>

          <div class="flex items-center justify-between gap-4">
            <dt class="text-md-on-surface-variant">建站天数</dt>
            <dd class="font-mono text-md-on-surface">{{ days }} 天</dd>
          </div>

          <div class="flex items-center justify-between gap-4">
            <dt class="text-md-on-surface-variant">文章数</dt>
            <dd class="font-mono text-md-on-surface">{{ posts.length }} 篇</dd>
          </div>

          <div class="flex items-start justify-between gap-4">
            <dt class="shrink-0 text-md-on-surface-variant">技术栈</dt>
            <dd class="flex flex-wrap justify-end gap-1.5">
              <BaseTag v-for="tech in techStack" :key="tech" variant="neutral">
                {{ tech }}
              </BaseTag>
            </dd>
          </div>

          <div class="flex items-center justify-between gap-4">
            <dt class="text-md-on-surface-variant">订阅</dt>
            <dd>
              <a
                href="/feed.xml"
                class="inline-flex items-center gap-1 text-accent transition hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <BaseIcon name="rss" :size="13" />
                RSS
              </a>
            </dd>
          </div>
        </dl>
      </BaseCard>
    </div>

    <!-- 联系方式 -->
    <div class="mt-6 pb-10">
      <BaseCard variant="glass" padding="md">
        <SectionHeading index="06" eyebrow="Contact" title="联系方式" compact />

        <div class="flex flex-wrap gap-3">
          <a
            v-for="link in site.social"
            :key="link.label"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            :title="link.label"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-md-on-surface-variant transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <BaseIcon :name="link.icon ?? 'mail'" :size="16" />
            <span class="hidden sm:inline">{{ link.label }}</span>
          </a>
        </div>
      </BaseCard>
    </div>
  </main>
</template>
