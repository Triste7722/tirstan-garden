<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import Accordion from '@/components/ui/Accordion.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import Chip from '@/components/ui/Chip.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { getMonthItems, getTimelineMonths } from '@/data/timeline'
import { formatDay } from '@/utils/format'

/** 默认展示的条目数（超出部分折叠） */
const COLLAPSED_COUNT = 3

const months = getTimelineMonths()
const activeMonth = ref(months[0]?.month ?? '')
const expandedId = ref<string | null>(null)
const collapsed = ref(true)

const items = computed(() => getMonthItems(activeMonth.value))
const hasMore = computed(() => items.value.length > COLLAPSED_COUNT)
const visibleItems = computed(() =>
  collapsed.value ? items.value.slice(0, COLLAPSED_COUNT) : items.value,
)

// 切换月份时重置折叠与展开状态
watch(activeMonth, () => {
  collapsed.value = true
  expandedId.value = null
})

function toggleCollapse() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <section class="border-t border-line/60 py-16 sm:py-20">
    <SectionHeading
      index="01"
      eyebrow="Timeline"
      title="月度动态"
      description="按月记录近期的折腾与日常，切换月份可回看过去。"
    />

    <!-- 按月切换：M3 filter chips（单选组） -->
    <div class="flex flex-wrap gap-2" role="tablist" aria-label="按月切换动态">
      <Chip
        v-for="month in months"
        :key="month.month"
        variant="filter"
        :selected="month.month === activeMonth"
        @click="activeMonth = month.month"
      >
        {{ month.label }}
      </Chip>
    </div>

    <!-- 时间线 -->
    <div
      v-if="items.length"
      class="relative mt-10 space-y-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-md-outline-variant"
    >
      <article v-for="item in visibleItems" :key="item.id" class="relative pl-8">
        <!-- 节点圆点 -->
        <span
          class="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-md-primary bg-md-surface shadow-elevation-1"
          aria-hidden="true"
        />

        <time
          :datetime="item.date"
          class="font-mono text-[11px] font-medium tracking-[0.14em] text-md-primary"
        >
          {{ formatDay(item.date) }}
        </time>

        <h3 class="mt-1.5 font-display text-lg font-semibold tracking-tight text-md-on-surface">
          {{ item.title }}
        </h3>

        <p v-if="item.summary" class="mt-1.5 text-sm leading-7 text-md-on-surface-variant">
          {{ item.summary }}
        </p>

        <!-- 内容较长时使用折叠面板 -->
        <Accordion
          v-if="item.details?.length"
          class="mt-4 max-w-md"
          title="查看日程详情"
          :open="expandedId === item.id"
          @update:open="(v: boolean) => (expandedId = v ? item.id : null)"
        >
          <dl class="space-y-3">
            <div
              v-for="detail in item.details"
              :key="detail.label"
              class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <dt
                class="inline-flex w-fit shrink-0 items-center rounded-full bg-md-secondary-container px-2.5 py-0.5 font-mono text-[11px] font-medium text-md-on-secondary-container sm:w-16 sm:justify-center"
              >
                {{ detail.label }}
              </dt>
              <dd class="text-sm leading-7 text-md-on-surface-variant">{{ detail.content }}</dd>
            </div>
          </dl>
        </Accordion>
      </article>
    </div>

    <!-- 空状态 -->
    <div v-else class="mt-10">
      <div class="glass-panel rounded-2xl px-6 py-14 text-center">
        <span class="mono-label text-md-primary">Empty</span>
        <p class="mt-3 text-sm text-md-on-surface-variant">该月暂无动态，回看其它月份试试。</p>
      </div>
    </div>

    <!-- 展开 / 收起 -->
    <div v-if="hasMore" class="mt-8 flex justify-center">
      <BaseButton variant="secondary" @click="toggleCollapse">
        {{ collapsed ? '展开更多动态' : '收起' }}
        <template #suffix>
          <BaseIcon
            name="chevron-down"
            :size="15"
            class="transition-transform duration-200"
            :class="collapsed ? '' : 'rotate-180'"
          />
        </template>
      </BaseButton>
    </div>
  </section>
</template>
