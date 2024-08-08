import { request } from '@/utils/request'
import { setToken } from '@/utils/storage'

export async function loginAccount(data: { account: string; password: string }) {
  const res = await Promise.resolve({
    code: 0,
    message: 'Login success',
    data: 'KJG345HJGH324UGHU4GH42JKGU324GH'
  })
  setToken(res.data)
}

export function performSignin(data:any) {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'login',
    method: 'post',
    data
  })
}