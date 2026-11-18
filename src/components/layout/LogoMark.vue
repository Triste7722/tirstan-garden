<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number
    alt?: string
  }>(),
  {
    size: 36,
    alt: 'Tristan',
  },
)

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: `${Math.round(props.size * 0.32)}px`,
}))
</script>

<template>
  <img
    src="/logo.jpg"
    :alt="alt"
    :width="size"
    :height="size"
    :style="style"
    class="logo-img shrink-0"
  />
</template>
