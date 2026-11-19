<script setup lang="ts">
// Material Design 3 Expansion Panel（折叠面板）
// 使用 CSS Grid 的 0fr → 1fr 技巧做高度过渡，无需 JS 测量高度。
const open = defineModel<boolean>('open', { default: false })

withDefaults(
  defineProps<{
    title: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div
    class="accordion overflow-hidden rounded-2xl border border-md-outline-variant bg-md-surface-container-low/70"
  >
    <button
      type="button"
      class="relative flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="accordion__state" aria-hidden="true" />
      <span class="text-sm font-medium text-md-on-surface">{{ title }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 text-md-on-surface-variant transition-transform duration-300 ease-out"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div class="px-5 pb-4 pt-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion__state {
  position: absolute;
  inset: 0;
  background: var(--md-state-hover);
  opacity: 0;
  transition: opacity 160ms ease;
  pointer-events: none;
}

button:hover .accordion__state,
button:focus-visible .accordion__state {
  opacity: 1;
}

button:active .accordion__state {
  background: var(--md-state-pressed);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
