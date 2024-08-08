import { request } from '@/utils/request'
import { currentNetwork } from '@/utils/storage'

export function claimReviewData(data:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}claim_review`,
    method: 'post',
    data
  })
} 

export function terminateRetryData(data:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}terminate_retry`,
    method: 'post',
    data
  })
}

export function userRefundData(data:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}user/refund`,
    method: 'post',
    data
  })
}

export function userProviderPaymentsData(data:any) {
  return request({
    headers: {},
    url: `${currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA}user/provider/payments`,
    method: 'post',
    data
  })
}

export function getPaymentListData(params: any) {
  return request({
    headers: {},
    url: `../assets/static/js/paymentList.ts`,
    // url: import.meta.env.VITE_BASEAPI_PROXIMA + 'crm_project/list',
    method: 'get',
    params
  })
}
