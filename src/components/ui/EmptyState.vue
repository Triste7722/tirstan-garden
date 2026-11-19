<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    actionTo?: string
    actionLabel?: string
  }>(),
  {
    description: '',
    actionTo: '',
    actionLabel: '',
  },
)
</script>

<template>
  <div class="glass-panel mx-auto max-w-xl rounded-2xl px-8 py-14 text-center">
    <div
      class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/[0.04] text-subtle"
    >
      <BaseIcon name="inbox" :size="20" />
    </div>

    <h2 class="mt-4 font-display text-lg font-semibold text-ink">{{ title }}</h2>

    <p v-if="description" class="mt-2 text-sm leading-7 text-muted">{{ description }}</p>

    <div v-if="actionTo && actionLabel" class="mt-6">
      <BaseButton :to="actionTo" variant="secondary" size="sm">{{ actionLabel }}</BaseButton>
    </div>
  </div>
</template>
