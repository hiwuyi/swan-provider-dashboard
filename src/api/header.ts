import { request } from '@/utils/request'
import { currentNetwork, metaAddress } from '@/utils/storage'

export function apiTokenData() {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}api_token`,
    method: 'post'
  })
}

export function apiTokenDelete(params:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}api_token/delete`,
    method: 'post',
    params
  })
}

export function getApiTokenData() {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}api_token`,
    method: 'get'
  })
}

export function cpCollateralData() {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}cp/collateral/${metaAddress.value}`,
    method: 'get'
  })
}

