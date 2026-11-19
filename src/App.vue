<script setup lang="ts">
import DynamicBackground from '@/components/layout/DynamicBackground.vue'
import SiteAnnouncement from '@/components/layout/SiteAnnouncement.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
</script>

<template>
  <div class="relative flex min-h-dvh flex-col overflow-x-clip">
    <div class="page-backdrop" aria-hidden="true" />

    <DynamicBackground />

    <SiteHeader />

    <SiteAnnouncement />

    <div class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <SiteFooter />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
