import { request } from '@/utils/request'
import { currentNetwork } from '@/utils/storage'

export function getOverviewData(params: any) {
    return request({
      headers: {},
      url: `../assets/static/js/cplist.json`,
      // url: import.meta.env.VITE_BASEAPI_PROXIMA + 'crm_project/list',
      method: 'get',
      params
    })
}

export function getOverviewECPData(params: any) {
    return request({
      headers: {},
      url: `../assets/static/js/ecplist.json`,
      // url: import.meta.env.VITE_BASEAPI_PROXIMA + 'crm_project/list',
      method: 'get',
      params
    })
}

export function getOverViewECP() {
  return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_ECP_BASEAPI : import.meta.env.VITE_ECP_BASEAPI_PROXIMA}v2/stats`,
      method: 'get'
  })
}

export function getCPlistData(params: any) {
  return request({
      headers: {},
      url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}cp/cplist`,
      method: 'get',
      params
  })
}
