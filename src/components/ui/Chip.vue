<script setup lang="ts">
import { computed } from 'vue'

// Material Design 3 Chip
// - assist     填充调性表面 + 阴影（用于技能标签等展示型信息）
// - filter     描边芯片，选中后填充 primary-container（用于「按月切换」单选组）
// - suggestion 描边动作芯片
// - input      输入芯片（有值时填充 primary-container）
// - glass      半透明毛玻璃（用于首页技能标签等轻盈展示）
type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion' | 'glass'

const props = withDefaults(
  defineProps<{
    variant?: ChipVariant
    selected?: boolean
    disabled?: boolean
    tag?: 'button' | 'span'
  }>(),
  {
    variant: 'assist',
    selected: false,
    disabled: false,
    tag: 'button',
  },
)

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const interactive = computed(() => props.tag === 'button' && !props.disabled)
const showCheck = computed(
  () => props.selected && (props.variant === 'filter' || props.variant === 'input'),
)

function handleClick(event: MouseEvent) {
  if (!interactive.value) return
  emit('click', event)
}

const variantClasses: Record<ChipVariant, { base: string; selected: string }> = {
  assist: {
    base: 'border border-md-outline-variant bg-md-surface-container-low text-md-on-surface shadow-elevation-1',
    selected:
      'border border-md-outline-variant bg-md-surface-container-high text-md-on-surface shadow-elevation-2',
  },
  filter: {
    base: 'border border-md-outline-variant bg-transparent text-md-on-surface-variant',
    selected: 'border-transparent bg-md-primary-container text-md-on-primary-container',
  },
  input: {
    base: 'border border-md-outline bg-transparent text-md-on-surface',
    selected: 'border-transparent bg-md-primary-container text-md-on-primary-container',
  },
  suggestion: {
    base: 'border border-md-outline bg-transparent text-md-on-surface',
    selected: 'border-transparent bg-md-primary-container text-md-on-primary-container',
  },
  glass: {
    base: 'border border-line/50 bg-md-surface-container/40 text-md-on-surface-variant backdrop-blur-md',
    selected:
      'border border-line/50 bg-md-surface-container/40 text-md-on-surface-variant backdrop-blur-md',
  },
}

const classes = computed(() => [
  'chip relative inline-flex h-8 select-none items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow] duration-200',
  interactive.value
    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
    : 'cursor-default',
  props.disabled ? 'pointer-events-none opacity-50' : '',
  props.selected ? variantClasses[props.variant].selected : variantClasses[props.variant].base,
])
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? 'button' : undefined"
    :disabled="tag === 'button' && disabled ? true : undefined"
    :aria-pressed="
      tag === 'button' && (variant === 'filter' || variant === 'input') ? selected : undefined
    "
    :class="classes"
    @click="handleClick"
  >
    <span v-if="interactive" class="chip__state" aria-hidden="true" />

    <svg
      v-if="showCheck"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>

    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </component>
</template>

<style scoped>
/* M3 State layer：悬停/按压时在芯片上叠加一层透明覆盖，而不是直接改背景色 */
.chip {
  overflow: hidden;
}

.chip__state {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--md-state-hover);
  opacity: 0;
  transition: opacity 160ms ease;
  pointer-events: none;
}

.chip:hover .chip__state,
.chip:focus-visible .chip__state {
  opacity: 1;
}

.chip:active .chip__state {
  background: var(--md-state-pressed);
}
</style>
