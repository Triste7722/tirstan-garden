<script setup lang="ts">
import LogoMark from '@/components/layout/LogoMark.vue'
import { site } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-auto">
    <div class="border-t border-line/60">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div class="flex items-center gap-3">
          <LogoMark :size="30" />
          <div>
            <p class="text-sm font-medium text-ink">{{ site.name }}</p>
            <p class="mt-0.5 text-xs text-subtle">
              © {{ year }} {{ site.author.name }}. All rights reserved.
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-1 text-left sm:items-end sm:text-right">
          <p class="text-xs text-muted">{{ site.footerNote }}</p>
          <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            Built with Vue 3 · Tailwind CSS
          </p>
        </div>
      </div>
    </div>

    <div
      class="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      aria-hidden="true"
    />
  </footer>
</template>
