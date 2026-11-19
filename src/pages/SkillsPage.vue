<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { skillLevelVariant, skills } from '@/data/skills'
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <PageHeader
      eyebrow="Skills"
      title="技能"
      description="一些正在使用、持续打磨的工具与技术。等级是主观自评，仅代表当前熟练程度。"
    />

    <!-- 响应式卡片网格：移动端 1 列 / 平板 2 列 / 桌面 3–4 列 -->
    <ul
      class="grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="技能列表"
    >
      <li v-for="skill in skills" :key="skill.name" class="h-full">
        <BaseCard
          as="article"
          variant="glass"
          padding="md"
          class="flex h-full flex-col"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="font-display text-base font-semibold tracking-tight text-md-on-surface">
              {{ skill.name }}
            </h2>

            <BaseTag :variant="skillLevelVariant[skill.level]" dot class="shrink-0">
              {{ skill.level }}
            </BaseTag>
          </div>

          <p class="mt-2 font-mono text-[11px] tracking-[0.14em] text-md-on-surface-variant">
            时长 · {{ skill.duration }}
          </p>

          <p
            v-if="skill.description"
            class="mt-4 text-sm leading-7 text-md-on-surface-variant"
          >
            {{ skill.description }}
          </p>
        </BaseCard>
      </li>
    </ul>
  </main>
</template>
