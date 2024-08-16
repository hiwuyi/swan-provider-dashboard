import { request } from '@/utils/request'

export function getStatsResourceData() {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/stats/resources`,
      method: 'get'
  })
}