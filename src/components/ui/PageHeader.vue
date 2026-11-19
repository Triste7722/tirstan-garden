<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
  }>(),
  {
    description: '',
  },
)
</script>

<template>
  <header class="pb-10 pt-16 sm:pb-12 sm:pt-20">
    <span class="mono-label text-accent">{{ eyebrow }}</span>
    <h1 class="mt-4 text-display font-semibold text-ink">{{ title }}</h1>
    <p v-if="description" class="mt-4 max-w-xl text-[15px] leading-8 text-muted">
      {{ description }}
    </p>
  </header>
</template>
