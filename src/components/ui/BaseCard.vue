<script setup lang="ts">
import { computed } from 'vue'

type CardVariant = 'surface' | 'glass' | 'outline' | 'feature'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: CardVariant
    padding?: CardPadding
    hoverable?: boolean
    as?: string
  }>(),
  {
    variant: 'surface',
    padding: 'md',
    hoverable: false,
    as: 'div',
  },
)

const variantClasses: Record<CardVariant, string> = {
  surface: 'border border-line bg-surface',
  glass: 'glass-panel',
  outline: 'border border-line bg-transparent',
  feature: 'card-feature bg-surface',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const classes = computed(() => [
  'relative rounded-card',
  variantClasses[props.variant],
  paddingClasses[props.padding],
  props.hoverable ? 'card-hover' : '',
])
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
