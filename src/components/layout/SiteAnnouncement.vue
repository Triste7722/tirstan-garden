<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import BaseIcon from '@/components/ui/BaseIcon.vue'
import { announcement } from '@/config/announcement'

const STORAGE_PREFIX = 'myblog-announcement-dismissed:'
const visible = ref(false)

onMounted(() => {
  if (!announcement.enabled) return

  try {
    visible.value = localStorage.getItem(`${STORAGE_PREFIX}${announcement.id}`) !== '1'
  } catch {
    visible.value = true
  }
})

function dismiss() {
  visible.value = false

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${announcement.id}`, '1')
  } catch {
    // localStorage 不可用时仅本次关闭
  }
}
</script>

<template>
  <Transition name="announcement">
    <div
      v-if="visible"
      class="border-b border-md-primary/20 bg-md-primary-container text-md-on-primary-container"
      role="region"
      aria-label="站点公告"
    >
      <div class="mx-auto flex max-w-6xl items-start gap-3 px-5 py-3 sm:items-center sm:px-6">
        <BaseIcon name="info" :size="18" class="mt-0.5 shrink-0 sm:mt-0" />

        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ announcement.title }}</p>
          <p class="mt-0.5 text-xs leading-5 opacity-80">{{ announcement.message }}</p>
        </div>

        <RouterLink
          v-if="announcement.link"
          :to="announcement.link ?? '/'"
          class="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-md-on-primary-container transition hover:bg-md-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary/60"
        >
          {{ announcement.linkLabel ?? '查看' }}
        </RouterLink>

        <button
          type="button"
          class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full opacity-70 transition hover:bg-md-primary/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary/60"
          aria-label="关闭公告"
          @click="dismiss"
        >
          <BaseIcon name="close" :size="16" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.announcement-enter-active,
.announcement-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.announcement-enter-from,
.announcement-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
