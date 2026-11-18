<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, themeLabel, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    :aria-label="themeLabel"
    :title="themeLabel"
    @click="toggleTheme"
  >
    <span
      class="pointer-events-none absolute inset-0 rounded-full bg-accent/0 blur-md transition group-hover:bg-accent/10"
      aria-hidden="true"
    />

    <Transition name="icon-swap" mode="out-in">
      <svg
        v-if="isDark"
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>

      <svg
        v-else
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
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
