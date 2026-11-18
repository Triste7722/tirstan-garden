<script setup lang="ts">
import { usePlayer } from '@/composables/usePlayer'

const { hasStarted, currentLyric } = usePlayer()
</script>

<template>
  <Transition name="player">
    <div
      v-if="hasStarted && currentLyric"
      class="lyric-box glass-panel fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)] rounded-2xl px-5 py-4 sm:max-w-xs"
      role="status"
      aria-live="polite"
    >
      <span class="mono-label text-subtle">Now Playing</span>

      <Transition name="lyric" mode="out-in">
        <p
          :key="currentLyric"
          class="mt-2 text-sm font-medium leading-relaxed text-ink"
        >
          {{ currentLyric }}
        </p>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.player-enter-active,
.player-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.player-enter-from,
.player-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.lyric-enter-active,
.lyric-leave-active {
  transition: opacity 220ms ease;
}

.lyric-enter-from,
.lyric-leave-to {
  opacity: 0;
}
</style>
