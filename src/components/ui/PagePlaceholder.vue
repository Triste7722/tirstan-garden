<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'

withDefaults(
  defineProps<{
    index: string
    eyebrow: string
    title: string
    description: string
    actionTo?: string
    actionLabel?: string
  }>(),
  {
    actionTo: '',
    actionLabel: '',
  },
)
</script>

<template>
  <main class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6">
    <div class="max-w-2xl">
      <div class="flex items-center gap-3">
        <span class="font-mono text-[11px] font-medium tracking-[0.2em] text-accent">
          {{ index }}
        </span>
        <span class="h-px w-10 bg-line" aria-hidden="true" />
        <span class="mono-label text-subtle">{{ eyebrow }}</span>
      </div>

      <h1 class="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {{ title }}
      </h1>

      <p class="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
        {{ description }}
      </p>

      <div class="mt-6">
        <BaseTag variant="outline" dot>M1 · Placeholder</BaseTag>
      </div>

      <div v-if="actionTo" class="mt-8">
        <BaseButton :to="actionTo" variant="secondary">{{ actionLabel }}</BaseButton>
      </div>

      <div class="mt-12 rounded-card border border-dashed border-line bg-surface/40 p-6">
        <p class="mono-label text-subtle">Coming next</p>
        <p class="mt-2 text-sm leading-7 text-muted">
          页面结构已接入全局布局与路由，内容会在后续里程碑逐步填充。
        </p>
      </div>
    </div>
  </main>
</template>
