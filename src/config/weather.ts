// ==========================================================================
// 天气组件配置（Open-Meteo，无需 API Key）
// 需要更换城市时，只改这里的经纬度与展示名称即可。
// ==========================================================================

export interface WeatherLocation {
  name: string
  latitude: number
  longitude: number
}

export const weatherLocation: WeatherLocation = {
  name: '北京',
  latitude: 39.9042,
  longitude: 116.4074,
}

/** Open-Meteo 当前天气接口 */
export const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast'

/** 缓存有效期：30 分钟 */
export const WEATHER_CACHE_TTL = 30 * 60 * 1000

export const WEATHER_CACHE_PREFIX = 'myblog-weather:'
