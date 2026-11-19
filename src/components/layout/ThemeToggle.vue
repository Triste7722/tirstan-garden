<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, themeLabel, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:h-9 md:w-9"
    :aria-label="themeLabel"
    :title="themeLabel"
    @click="toggleTheme"
  >
    <span
      class="pointer-events-none absolute inset-0 rounded-full bg-accent/0 blur-md transition group-hover:bg-accent/10"
      aria-hidden="true"
    />

    <Transition name="icon-swap" mode="out-in">
      <BaseIcon v-if="isDark" key="moon" name="moon" :size="16" />
      <BaseIcon v-else key="sun" name="sun" :size="16" />
    </Transition>
  </button>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-45deg) scale(0.7);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.7);
}
</style>
