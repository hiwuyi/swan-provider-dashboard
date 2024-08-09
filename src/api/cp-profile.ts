import { request } from '@/utils/request'
import { currentNetwork } from '@/utils/storage'

export function statsCpscoresData(data:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}stats/cpscores`,
    method: 'post',
    data
  })
}

export function getCPsData(params: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/cps/${params}`,
      method: 'get'
  })
}

export function getCPsBalancesData(params: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/cps/${params}/balances`,
      method: 'get'
  })
}

export function getCPsEchartsData(params: any, addr: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/cps/${addr}/data`,
      method: 'get',
      params
  })
}
