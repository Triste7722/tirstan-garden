<script setup lang="ts">
import { computed } from 'vue'

import { describeWeather, useWeather } from '@/composables/useWeather'
import { weatherLocation } from '@/config/weather'

const { data, loading, error, refresh } = useWeather()

const temperatureLabel = computed(() =>
  data.value ? `${Math.round(data.value.temperature)}°C` : '',
)
const condition = computed(() => (data.value ? describeWeather(data.value.weatherCode) : ''))
</script>

<template>
  <div class="flex shrink-0 items-center gap-1.5 text-sm">
    <!-- 加载态 -->
    <span
      v-if="loading"
      class="h-4 w-10 animate-pulse rounded bg-ink/[0.08]"
      aria-hidden="true"
    />

    <!-- 失败态：紧凑重试按钮 -->
    <button
      v-else-if="error"
      type="button"
      class="rounded-full px-1.5 py-1 text-[11px] text-subtle transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      title="重新加载天气"
      @click="refresh"
    >
      重试
    </button>

    <!-- 成功态：移动端仅温度；sm+ 显示城市；md+ 显示天气 -->
    <template v-else-if="data">
      <span class="hidden text-xs text-md-on-surface-variant sm:inline">
        {{ weatherLocation.name }}
      </span>
      <span class="font-display text-sm font-semibold tracking-tight text-md-on-surface">
        {{ temperatureLabel }}
      </span>
      <span class="hidden text-xs text-md-on-surface-variant md:inline">{{ condition }}</span>
    </template>
  </div>
</template>
