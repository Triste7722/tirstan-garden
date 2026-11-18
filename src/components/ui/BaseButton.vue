<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    href?: string
    to?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    block: false,
  },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-glow hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-glow-strong',
  secondary:
    'border border-line bg-surface/70 text-ink backdrop-blur hover:border-accent/40 hover:bg-raised',
  ghost: 'text-muted hover:bg-ink/[0.06] hover:text-ink',
  danger: 'border border-danger/30 bg-danger/10 text-danger hover:border-danger/50 hover:bg-danger/15',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-[15px]',
}

const classes = computed(() => [
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition duration-200 ease-out active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
  props.disabled
    ? 'pointer-events-none border border-line bg-surface text-subtle opacity-50 shadow-none'
    : variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
])

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <component
    :is="tag"
    :href="to ? undefined : href"
    :to="to"
    :type="to || href ? undefined : type"
    :disabled="!href && !to && disabled ? true : undefined"
    :aria-disabled="(href || to) && disabled ? 'true' : undefined"
    :tabindex="(href || to) && disabled ? -1 : undefined"
    :class="classes"
    @click="handleClick"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </component>
</template>
