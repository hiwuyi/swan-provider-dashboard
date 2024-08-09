import { request } from '@/utils/request'
import { currentNetwork } from '@/utils/storage'

export function searchCPData(params: any) {
    return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}v2/cp/search_cp`,
      method: 'get',
      params
    })
}

export function getOverviewData(params: any) {
    return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}cp/search_cp`,
      method: 'get',
      params
    })
}

export function getOverviewECPData(params: any) {
    return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_ECP_BASEAPI : import.meta.env.VITE_ECP_BASEAPI_PROXIMA}v2/stats`,
      method: 'get',
      params
    })
}

export function getOverViewECP(params: any) {
  return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_ECP_BASEAPI : import.meta.env.VITE_ECP_BASEAPI_PROXIMA}v2/providers`,
      method: 'get',
      params
  })
}

export function getCPlistData(params: any) {
  return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}v2/cp/cplist`,
      method: 'get',
      params
  })
}

export function statsOverviewData() {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/stats/overview`,
      method: 'get'
  })
}

export function statsEchartsData(params: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/stats/data`,
      method: 'get',
      params
  })
}

export function getCPsECPListData(params: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/ecps`,
      method: 'get',
      params
  })
}

export function getCPsFCPListData(params: any) {
  return request({
      headers: {},
      url: `${import.meta.env.VITE_BASE_URL}v1/fcps`,
      method: 'get',
      params
  })
}
