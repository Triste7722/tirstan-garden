<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { friends } from '@/data/friends'
</script>

<template>
  <main id="top" class="mx-auto max-w-6xl px-5 sm:px-6">
    <PageHeader
      eyebrow="Friends"
      title="友链"
      description="一些值得一逛的站点。仅作展示，暂不开放自助提交。"
    />

    <template v-if="friends.length">
      <ul class="grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="friend in friends" :key="friend.name" class="h-full">
          <a
            :href="friend.link"
            target="_blank"
            rel="noopener noreferrer"
            class="group block h-full rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <BaseCard
              as="article"
              variant="glass"
              padding="md"
              hoverable
              class="flex h-full items-start gap-4"
            >
              <img
                v-if="friend.avatar"
                :src="friend.avatar"
                :alt="friend.name"
                loading="lazy"
                class="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
              <div
                v-else
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-md-primary-container font-display text-lg font-semibold text-md-on-primary-container"
                aria-hidden="true"
              >
                {{ friend.name.slice(0, 1) }}
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <h2
                    class="font-display text-base font-semibold tracking-tight text-md-on-surface"
                  >
                    {{ friend.name }}
                  </h2>
                  <BaseIcon
                    name="arrow-up-right"
                    :size="16"
                    class="mt-0.5 shrink-0 text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>

                <p class="mt-2 text-sm leading-7 text-md-on-surface-variant">
                  {{ friend.description }}
                </p>
              </div>
            </BaseCard>
          </a>
        </li>
      </ul>
    </template>

    <div v-else class="border-t border-line/60 py-16 sm:py-20">
      <EmptyState
        title="暂无友链"
        description="在 src/data/friends.ts 中添加友链后，这里会自动展示。"
      />
    </div>
  </main>
</template>
