<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { posts, type Post } from '@/data/posts'
import { highlightSegments, searchPosts, type HighlightSegment } from '@/utils/search'

interface SearchResultView {
  post: Post
  titleSegments: HighlightSegment[]
  previewSegments: HighlightSegment[]
  tagSegments: Array<{ tag: string; segments: HighlightSegment[] }>
}

const route = useRoute()
const router = useRouter()
const open = ref(false)
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const results = computed<SearchResultView[]>(() => {
  const q = query.value
  return searchPosts(posts, q).map(({ post, preview }) => ({
    post,
    titleSegments: highlightSegments(post.title, q),
    previewSegments: highlightSegments(preview, q),
    tagSegments: post.tags.slice(0, 3).map((tag) => ({
      tag,
      segments: highlightSegments(tag, q),
    })),
  }))
})

const hasQuery = computed(() => query.value.trim().length > 0)
const resultCountLabel = computed(() =>
  hasQuery.value ? `找到 ${results.value.length} 篇相关文章` : '',
)

async function openSearch() {
  open.value = true
  await nextTick()
  inputRef.value?.focus()
}

function closeSearch() {
  open.value = false
  query.value = ''
}

function goFirst() {
  const first = results.value[0]
  if (!first) return

  router.push(`/posts/${first.post.id}`)
  closeSearch()
}

function handleGlobalKey(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    void openSearch()
  }

  if (event.key === 'Escape' && open.value) {
    closeSearch()
  }
}

watch(open, (value) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = value ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    if (open.value) closeSearch()
  },
)

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKey)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <button
    type="button"
    class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:h-9 md:w-9"
    aria-label="搜索文章"
    title="搜索文章（Ctrl / ⌘ + K）"
    @click="openSearch"
  >
    <BaseIcon name="search" :size="16" />
  </button>

  <Teleport to="body">
    <Transition name="search">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:pt-28"
        role="dialog"
        aria-modal="true"
        aria-label="搜索文章"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeSearch" />

        <div class="relative w-full max-w-2xl">
          <BaseCard
            variant="surface"
            padding="none"
            class="overflow-hidden shadow-elevation-3"
          >
            <div class="flex items-center gap-3 border-b border-line px-4 py-3">
              <BaseIcon name="search" :size="18" class="shrink-0 text-subtle" />

              <input
                ref="inputRef"
                v-model="query"
                type="search"
                class="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-subtle sm:text-sm"
                placeholder="搜索标题、摘要、标签或正文…"
                aria-label="搜索文章"
                autocomplete="off"
                @keydown.enter.prevent="goFirst"
              />

              <button
                type="button"
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-subtle transition hover:bg-ink/[0.06] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="关闭搜索"
                @click="closeSearch"
              >
                <BaseIcon name="close" :size="16" />
              </button>
            </div>

            <div class="max-h-[60vh] overflow-y-auto p-2">
              <p v-if="!hasQuery" class="px-3 py-10 text-center text-sm text-muted">
                输入关键词开始搜索，支持标题、摘要、标签与正文。
              </p>

              <div v-else-if="results.length === 0" class="px-3 py-12 text-center">
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/[0.04] text-subtle"
                >
                  <BaseIcon name="search" :size="20" />
                </div>
                <p class="mt-4 text-sm font-medium text-ink">没有找到相关内容</p>
                <p class="mt-1 text-xs text-muted">换个关键词试试，或浏览全部文章。</p>
              </div>

              <template v-else>
                <p class="px-3 pb-2 pt-1 font-mono text-[10px] tracking-[0.14em] text-subtle">
                  {{ resultCountLabel }}
                </p>

                <ul class="space-y-1">
                  <li v-for="result in results" :key="result.post.id">
                    <RouterLink
                      :to="`/posts/${result.post.id}`"
                      class="block rounded-xl px-3 py-3 transition hover:bg-ink/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      @click="closeSearch"
                    >
                      <h3 class="font-display text-sm font-semibold tracking-tight text-ink">
                        <template
                          v-for="(segment, index) in result.titleSegments"
                          :key="index"
                        >
                          <mark
                            v-if="segment.match"
                            class="rounded bg-accent/20 px-0.5 text-accent"
                          >
                            {{ segment.text }}
                          </mark>
                          <template v-else>{{ segment.text }}</template>
                        </template>
                      </h3>

                      <p class="mt-1 line-clamp-2 text-xs leading-6 text-muted">
                        <template
                          v-for="(segment, index) in result.previewSegments"
                          :key="index"
                        >
                          <mark
                            v-if="segment.match"
                            class="rounded bg-accent/20 px-0.5 text-accent"
                          >
                            {{ segment.text }}
                          </mark>
                          <template v-else>{{ segment.text }}</template>
                        </template>
                      </p>

                      <div class="mt-2 flex flex-wrap gap-1.5">
                        <BaseTag
                          v-for="tag in result.tagSegments"
                          :key="tag.tag"
                          variant="neutral"
                        >
                          <template v-for="(segment, index) in tag.segments" :key="index">
                            <mark
                              v-if="segment.match"
                              class="bg-transparent text-accent"
                            >
                              {{ segment.text }}
                            </mark>
                            <template v-else>{{ segment.text }}</template>
                          </template>
                        </BaseTag>
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </template>
            </div>

            <div
              class="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle"
            >
              <span>Enter 打开第一篇 · Esc 关闭</span>
              <span>Ctrl / ⌘ + K</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-enter-active,
.search-leave-active {
  transition: opacity 180ms ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}
</style>
