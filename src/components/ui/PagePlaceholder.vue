<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

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

      <div v-if="actionTo" class="mt-8">
        <BaseButton :to="actionTo" variant="secondary">{{ actionLabel }}</BaseButton>
      </div>
    </div>
  </main>
</template>
