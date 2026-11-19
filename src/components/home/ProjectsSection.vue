<script setup lang="ts">
import BaseTag from '@/components/ui/BaseTag.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <section class="border-t border-line/60 py-16 sm:py-20">
    <SectionHeading
      index="02"
      eyebrow="Projects"
      title="精选项目"
      description="一些亲手搭过的 Hyprland 桌面环境主题与配置。"
    />

    <div class="grid gap-5 md:grid-cols-2">
      <component
        :is="project.link ? 'a' : 'article'"
        v-for="project in projects"
        :key="project.id"
        :href="project.link"
        :target="project.link ? '_blank' : undefined"
        :rel="project.link ? 'noopener noreferrer' : undefined"
        class="group card-hover block overflow-hidden rounded-3xl border border-md-outline-variant bg-md-surface-container-low shadow-elevation-1"
      >
        <!-- 截图 -->
        <div class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="project.image"
            :alt="`${project.name} 截图`"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-md-surface-container-low via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <!-- 内容 -->
        <div class="p-6">
          <div class="flex items-center gap-2.5">
            <span
              class="h-2 w-2 rounded-full"
              :class="project.accent === 'violet' ? 'bg-md-secondary' : 'bg-md-primary'"
              aria-hidden="true"
            />
            <h3 class="font-display text-lg font-semibold tracking-tight text-md-on-surface">
              {{ project.name }}
            </h3>
          </div>

          <p class="mt-2.5 text-sm leading-7 text-md-on-surface-variant">
            {{ project.description }}
          </p>

          <div class="mt-5 flex flex-wrap gap-1.5">
            <BaseTag
              v-for="(tag, i) in project.tags"
              :key="tag"
              :variant="i === 0 ? 'accent' : 'neutral'"
            >
              {{ tag }}
            </BaseTag>
          </div>
        </div>
      </component>
    </div>
  </section>
</template>
