<script setup lang="ts">
import { computed } from 'vue'

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'search'
  | 'info'
  | 'inbox'
  | 'close'
  | 'download'
  | 'rss'
  | 'menu'
  | 'music'
  | 'play'
  | 'pause'
  | 'moon'
  | 'sun'
  | 'mail'
  | 'telegram'
  | 'x'
  | 'github'

interface IconShape {
  tag: 'path' | 'circle' | 'rect'
  attrs: Record<string, string | number>
}

interface IconDef {
  shapes: IconShape[]
  /** 实心图标（如品牌 logo），使用 currentColor 填充且不描边 */
  filled?: boolean
  /** 覆盖默认描边宽度 */
  strokeWidth?: number
}

const ICONS: Record<IconName, IconDef> = {
  'arrow-right': {
    shapes: [{ tag: 'path', attrs: { d: 'M5 12h14M13 6l6 6-6 6' } }],
  },
  'arrow-left': {
    shapes: [{ tag: 'path', attrs: { d: 'M19 12H5M11 6l-6 6 6 6' } }],
  },
  'arrow-up-right': {
    shapes: [{ tag: 'path', attrs: { d: 'M7 17 17 7M7 7h10v10' } }],
  },
  'chevron-down': {
    shapes: [{ tag: 'path', attrs: { d: 'm6 9 6 6 6-6' } }],
  },
  search: {
    shapes: [
      { tag: 'circle', attrs: { cx: 11, cy: 11, r: 7 } },
      { tag: 'path', attrs: { d: 'm20 20-3.5-3.5' } },
    ],
  },
  info: {
    shapes: [
      { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
      { tag: 'path', attrs: { d: 'M12 11v5' } },
      { tag: 'path', attrs: { d: 'M12 8h.01' } },
    ],
  },
  inbox: {
    shapes: [
      { tag: 'path', attrs: { d: 'M22 12h-6l-2 3h-4l-2-3H2' } },
      {
        tag: 'path',
        attrs: {
          d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
        },
      },
    ],
  },
  close: {
    shapes: [{ tag: 'path', attrs: { d: 'M18 6 6 18M6 6l12 12' } }],
  },
  menu: {
    strokeWidth: 1.9,
    shapes: [{ tag: 'path', attrs: { d: 'M4 7h16M4 12h16M4 17h16' } }],
  },
  music: {
    shapes: [
      { tag: 'path', attrs: { d: 'M9 18V5l12-2v13' } },
      { tag: 'circle', attrs: { cx: 6, cy: 18, r: 3 } },
      { tag: 'circle', attrs: { cx: 18, cy: 16, r: 3 } },
    ],
  },
  play: {
    filled: true,
    shapes: [
      {
        tag: 'path',
        attrs: {
          d: 'M8 5.14v13.72a1 1 0 0 0 1.52.86l10.5-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z',
        },
      },
    ],
  },
  pause: {
    filled: true,
    shapes: [
      { tag: 'rect', attrs: { x: 6, y: 5, width: 4, height: 14, rx: 1.2 } },
      { tag: 'rect', attrs: { x: 14, y: 5, width: 4, height: 14, rx: 1.2 } },
    ],
  },
  moon: {
    strokeWidth: 1.8,
    shapes: [{ tag: 'path', attrs: { d: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z' } }],
  },
  sun: {
    strokeWidth: 1.8,
    shapes: [
      { tag: 'circle', attrs: { cx: 12, cy: 12, r: 4 } },
      {
        tag: 'path',
        attrs: {
          d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
        },
      },
    ],
  },
  download: {
    shapes: [
      { tag: 'path', attrs: { d: 'M12 3v12' } },
      { tag: 'path', attrs: { d: 'm7 10 5 5 5-5' } },
      { tag: 'path', attrs: { d: 'M5 21h14' } },
    ],
  },
  rss: {
    shapes: [
      { tag: 'path', attrs: { d: 'M4 11a9 9 0 0 1 9 9' } },
      { tag: 'path', attrs: { d: 'M4 4a16 16 0 0 1 16 16' } },
      { tag: 'path', attrs: { d: 'M4 20h.01' } },
    ],
  },
  mail: {
    strokeWidth: 1.8,
    shapes: [
      { tag: 'rect', attrs: { x: 3, y: 5, width: 18, height: 14, rx: 2 } },
      { tag: 'path', attrs: { d: 'm3 7 9 6 9-6' } },
    ],
  },
  telegram: {
    strokeWidth: 1.8,
    shapes: [
      { tag: 'path', attrs: { d: 'M22 2 11 13' } },
      { tag: 'path', attrs: { d: 'M22 2 15 22 11 13 2 9z' } },
    ],
  },
  x: {
    filled: true,
    shapes: [
      {
        tag: 'path',
        attrs: {
          d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z',
        },
      },
    ],
  },
  github: {
    filled: true,
    shapes: [
      {
        tag: 'path',
        attrs: {
          d: 'M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z',
        },
      },
    ],
  },
}

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 16,
  },
)

const def = computed(() => ICONS[props.name])
const resolvedStrokeWidth = computed(() => props.strokeWidth ?? def.value.strokeWidth ?? 2)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="def.filled ? 'currentColor' : 'none'"
    :stroke="def.filled ? 'none' : 'currentColor'"
    :stroke-width="def.filled ? undefined : resolvedStrokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-for="(shape, index) in def.shapes" :key="index">
      <path v-if="shape.tag === 'path'" v-bind="shape.attrs" />
      <circle v-else-if="shape.tag === 'circle'" v-bind="shape.attrs" />
      <rect v-else-if="shape.tag === 'rect'" v-bind="shape.attrs" />
    </template>
  </svg>
</template>
