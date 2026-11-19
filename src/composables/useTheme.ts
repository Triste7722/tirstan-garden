import { computed, readonly, ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'myblog-theme'

const theme = ref<Theme>('dark')
let initialized = false

function applyTheme(next: Theme) {
  theme.value = next

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = next
    document.documentElement.style.colorScheme = next
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage may be unavailable (private mode / restricted context)
    }
  }
}

export function initTheme() {
  if (initialized || typeof window === 'undefined') return

  initialized = true

  let stored: string | null = null

  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // ignore storage access errors
  }

  applyTheme(stored === 'light' ? 'light' : 'dark')
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')
  const themeLabel = computed(() => (isDark.value ? '切换到浅色模式' : '切换到深色模式'))

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: readonly(theme),
    isDark,
    themeLabel,
    toggleTheme,
    setTheme: applyTheme,
    initTheme,
  }
}
