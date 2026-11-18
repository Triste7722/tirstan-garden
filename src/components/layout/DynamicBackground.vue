<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { isDark } = useTheme()

const backgrounds: Record<string, string> = {
  '/': '/bg.jpg',
  '/posts': '/bg-posts.jpg',
  '/about': '/bg-about.jpg',
}

const activeBackground = computed(() => {
  const { path } = route
  if (backgrounds[path]) return backgrounds[path]
  // 文章详情页复用列表页壁纸，保持视觉一致
  if (path.startsWith('/posts/')) return '/bg-posts.jpg'
  return '/bg.jpg'
})

// 预加载所有背景图，避免首次切换时图片未就绪导致的生硬闪现
onMounted(() => {
  for (const src of Object.values(backgrounds)) {
    const img = new Image()
    img.src = src
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="bg-root" aria-hidden="true">
      <Transition name="bg-fade">
        <div
          :key="activeBackground"
          class="bg-layer"
          :style="{ backgroundImage: `url('${activeBackground}')` }"
        />
      </Transition>

      <div
        class="bg-overlay"
        :class="isDark ? 'bg-overlay--dark' : 'bg-overlay--light'"
      />
    </div>
  </Teleport>
</template>

<style scoped>
/* 固定背景层：position: fixed 保证全站背景不随滚动移动 */
.bg-root {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.bg-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* 主题化遮罩：深色压暗、浅色提亮，保证文字/卡片清晰可读 */
.bg-overlay {
  position: absolute;
  inset: 0;
  transition: opacity 240ms ease;
}

.bg-overlay--dark {
  background: linear-gradient(
    to bottom,
    rgba(5, 6, 10, 0.88),
    rgba(5, 6, 10, 0.68) 40%,
    rgba(5, 6, 10, 0.68) 60%,
    rgba(5, 6, 10, 0.88)
  );
}

.bg-overlay--light {
  background: linear-gradient(
    to bottom,
    rgba(248, 249, 251, 0.82),
    rgba(248, 249, 251, 0.6) 40%,
    rgba(248, 249, 251, 0.6) 60%,
    rgba(248, 249, 251, 0.82)
  );
}

/* 交叉淡入淡出（600ms） */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

/* 移动端：fixed 定位已锁定背景，切回 scroll 规避 iOS 对
   background-attachment: fixed 的渲染错位 */
@media (hover: none), (pointer: coarse) {
  .bg-layer {
    background-attachment: scroll;
  }
}
</style>
