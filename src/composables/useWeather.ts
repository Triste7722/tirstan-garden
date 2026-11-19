// ==========================================================================
// 天气数据（Open-Meteo，无需 API Key）
// - 30 分钟内优先使用 localStorage / 内存缓存
// - 请求失败时回退到旧缓存，并标记为「缓存数据」
// - 无缓存时返回错误状态，由组件展示降级 UI
// ==========================================================================

import { onMounted, ref } from 'vue'

import {
  WEATHER_CACHE_PREFIX,
  WEATHER_CACHE_TTL,
  WEATHER_ENDPOINT,
  weatherLocation,
} from '@/config/weather'

export interface WeatherData {
  temperature: number
  apparentTemperature: number
  windSpeed: number
  weatherCode: number
  updatedAt: number
}

interface CachedWeather {
  fetchedAt: number
  data: WeatherData
}

interface OpenMeteoCurrent {
  temperature_2m?: number
  apparent_temperature?: number
  weather_code?: number
  wind_speed_10m?: number
}

interface OpenMeteoResponse {
  current?: OpenMeteoCurrent
}

/** WMO 天气代码 → 中文描述 */
const WMO_LABELS: Record<number, string> = {
  0: '晴朗',
  1: '大部晴朗',
  2: '多云',
  3: '阴',
  45: '雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '大毛毛雨',
  56: '冻毛毛雨',
  57: '强冻毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '冻雨',
  67: '强冻雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '米雪',
  80: '阵雨',
  81: '强阵雨',
  82: '暴雨',
  85: '阵雪',
  86: '强阵雪',
  95: '雷暴',
  96: '雷暴伴小冰雹',
  99: '雷暴伴大冰雹',
}

export function describeWeather(code: number): string {
  return WMO_LABELS[code] ?? '未知天气'
}

const cacheKey = `${WEATHER_CACHE_PREFIX}${weatherLocation.latitude},${weatherLocation.longitude}`

let memoryCache: CachedWeather | null = null

function readCache(): CachedWeather | null {
  if (memoryCache) return memoryCache
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(cacheKey)
    if (!raw) return null

    const parsed = JSON.parse(raw) as CachedWeather
    if (typeof parsed.fetchedAt !== 'number' || !parsed.data) return null

    memoryCache = parsed
    return parsed
  } catch {
    return null
  }
}

function writeCache(next: CachedWeather) {
  memoryCache = next
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(next))
  } catch {
    // localStorage 不可用时仅保留内存缓存
  }
}

export function useWeather() {
  const data = ref<WeatherData | null>(null)
  const loading = ref(true)
  const error = ref('')
  const stale = ref(false)

  async function load(force = false) {
    loading.value = true
    error.value = ''
    stale.value = false

    const cached = readCache()
    if (!force && cached && Date.now() - cached.fetchedAt < WEATHER_CACHE_TTL) {
      data.value = cached.data
      loading.value = false
      return
    }

    try {
      const url = new URL(WEATHER_ENDPOINT)
      url.searchParams.set('latitude', String(weatherLocation.latitude))
      url.searchParams.set('longitude', String(weatherLocation.longitude))
      url.searchParams.set(
        'current',
        'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
      )
      url.searchParams.set('timezone', 'auto')

      const response = await fetch(url)
      if (!response.ok) throw new Error(`天气接口错误：${response.status}`)

      const json = (await response.json()) as OpenMeteoResponse
      const current = json.current
      if (!current || typeof current.temperature_2m !== 'number') {
        throw new Error('天气数据格式异常')
      }

      const next: WeatherData = {
        temperature: current.temperature_2m,
        apparentTemperature: current.apparent_temperature ?? current.temperature_2m,
        windSpeed: current.wind_speed_10m ?? 0,
        weatherCode: current.weather_code ?? 0,
        updatedAt: Date.now(),
      }

      data.value = next
      writeCache({ fetchedAt: Date.now(), data: next })
    } catch {
      if (cached) {
        data.value = cached.data
        stale.value = true
      } else {
        error.value = '天气暂时不可用'
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    void load()
  })

  return {
    data,
    loading,
    error,
    stale,
    refresh: () => load(true),
  }
}
