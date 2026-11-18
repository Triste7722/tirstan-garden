<script setup lang="ts">
import { computed } from 'vue'

type TagVariant = 'accent' | 'neutral' | 'outline' | 'success' | 'violet'
type TagSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: TagVariant
    size?: TagSize
    dot?: boolean
  }>(),
  {
    variant: 'neutral',
    size: 'sm',
    dot: false,
  },
)

const variantClasses: Record<TagVariant, string> = {
  accent: 'border-accent/30 bg-accent/10 text-accent',
  neutral: 'border-line bg-ink/[0.04] text-muted',
  outline: 'border-line bg-transparent text-muted',
  success: 'border-success/30 bg-success/10 text-success',
  violet: 'border-violet/30 bg-violet/10 text-violet',
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
}

const classes = computed(() => [
  'inline-flex items-center gap-1.5 rounded-full border font-medium tracking-tight',
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
