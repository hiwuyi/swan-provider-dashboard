import { ELINK } from '@/constant/envLink'
import { EStorage } from '@/constant/storage'

export const token = ref(getToken())
export const isLogin = computed(() => !!token.value)
export const currentNetwork = ref('Mainnet')
export const metaAddress = ref('')
export const signature = ref('')
export const explorerLink = ref(currentNetwork.value === 'Proxima' ? ELINK.PROXIMAEXPLORER : ELINK.MAINNETEXPLORER)
export const baseurl = currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA
console.log(explorerLink.value)
export function removeStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  token.value = ''
  localStorage.clear()
}

export function clearLoginInfo() {
  token.value = ''
  removeStorage(EStorage.TOKEN)
}

export function setToken(tok: string) {
  token.value = tok
  localStorage.setItem(EStorage.TOKEN, tok)
}

export function clearMetaAddress() {
  metaAddress.value = ''
  removeStorage(EStorage.METAADDRESS)
}

export function setMetaAddress(tok: string) {
  metaAddress.value = tok
  localStorage.setItem(EStorage.METAADDRESS, tok)
}

export function clearSignature() {
  signature.value = ''
  removeStorage(EStorage.Signature)
}

export function setSignature(tok: string) {
  signature.value = tok
  localStorage.setItem(EStorage.Signature, tok)
}

export function getToken() {
  return localStorage.getItem(EStorage.TOKEN) ?? ''
}

export function setAccountInfo(accountInfo: { account: string; password: string }) {
  localStorage.setItem(EStorage.ACCOUNT_INFO, JSON.stringify(accountInfo))
}

export function getAccountInfo() {
  const accountInfo = localStorage.getItem(EStorage.ACCOUNT_INFO)
  return accountInfo ? JSON.parse(accountInfo) : { account: '', password: '' }
}
