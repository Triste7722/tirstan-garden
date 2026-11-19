<script setup lang="ts">
withDefaults(
  defineProps<{
    index: string
    title: string
    eyebrow?: string
    description?: string
    /** 紧凑模式：用于卡片内分节，缩小标题与下边距 */
    compact?: boolean
  }>(),
  {
    eyebrow: '',
    description: '',
    compact: false,
  },
)
</script>

<template>
  <div :class="compact ? 'mb-4 flex flex-col gap-2' : 'mb-8 flex flex-col gap-3'">
    <div class="flex items-center gap-3">
      <span class="font-mono text-[11px] font-medium tracking-[0.2em] text-accent">{{
        index
      }}</span>
      <span class="h-px w-10 bg-line" aria-hidden="true" />
      <span v-if="eyebrow" class="mono-label text-subtle">{{ eyebrow }}</span>
    </div>

    <h2
      :class="
        compact
          ? 'font-display text-lg font-semibold tracking-tight text-ink'
          : 'font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl'
      "
    >
      {{ title }}
    </h2>

    <p v-if="description" class="max-w-2xl text-sm leading-7 text-muted">
      {{ description }}
    </p>
  </div>
</template>
