import axios, { type AxiosRequestConfig } from 'axios'
import { token } from './storage'
import globalConfig from '@/config'
import { messageTip } from './common'

const instance = axios.create({
  baseURL: '',
  timeout: globalConfig.api_timeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use(
  (config) => {
    // if (token.value) {
    //   config.headers.Authorization = `Bear ${token.value}`
    // }
    // config.url = (config.base || import.meta.env.VITE_BASEAPI) + config.url
    return config
  },
  (error) => {
    console.error('request error', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    const { code, message, data, status, detail } = res.data
    if (status === 'success' || code == 0) return res.data
    else if (res?.data?.code === undefined && res?.data?.status === undefined) return res.data
    else messageTip('error', message || detail)
    throw res.data
  },
  (error) => {
    console.error('response error', error)
    if (error?.response?.data) {
      const { message, status, detail } = error.response.data
      messageTip('error', message || detail)
      if (status === 401) {
        // await timeout(2000)
        // urlClear()
      }
    }
    return Promise.reject(error.response.data)
  }
)

type Req = <R = { status: string; data: any; message: string; code: number; list_projects_cnt: number }>(config: AxiosRequestConfig<any>) => Promise<R>

export const request: Req = instance
