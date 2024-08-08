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