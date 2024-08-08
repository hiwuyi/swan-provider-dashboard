import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import moment from 'moment'

export const throttle = (fn: any, delay = 500) => {
  let timer: any = null
  const that: any = this
  return (args: any) => {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(that, args)
      timer = null
    }, delay)
  }
}

export async function timeout(delay: any) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export function sizeChange (bytes: any, unit: any) {
  if (bytes === 0) return unit ? `0 ${unit}` : '0 B'
  if (!bytes) return '-'
  const k = 1024 // or 1000
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  const b = Math.floor(Math.log(bytes) / Math.log(k))
  if (unit && sizes.indexOf(unit) > -1) i += sizes.indexOf(unit)

  // if (Math.round((bytes / Math.pow(k, b))).toString().length > 3) i += 1
  return parseFloat((bytes / Math.pow(k, b)).toFixed(2)) + ' ' + sizes[i]
}

export function replaceFormat (value: any) {
  try {
    if (String(value) === '0') return '0'
    else if (!value) return '-'
    const intPartArr = String(value).split('.')
    const intPartFormat = intPartArr[0]
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return intPartArr[1] ? `${intPartFormat}.${intPartArr[1].slice(0, 2)}` : intPartFormat
  } catch {
    return '-'
  }
}

export function timeFormat (data: any) {
  if (!data) return 0
  const d = data / 60 / 60
  return d < 0.001 ? 0 : d
}

export function millisecondsToHMS(ms: any) {
  let text : any = ''
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if(hours > 0) text += `${hours}h`
  if(minutes > 0) text += `${minutes}m`
  if(remainingSeconds > 0) text += `${remainingSeconds}s`
 
  return text;
}

export async function messageTip(type: any, message: any) {
  ElMessage({
    showClose: true,
    message,
    type,
  })
}

export function debounce(fn:any, delay = 700) {
  if (typeof fn !== 'function') {
    throw new TypeError('Fn is not a function')
  }
  let timer:any = null
  return (args: any) => {
    const _this:any = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

export function base64ToFile(base64Data:string, filename:string) {
  const parts = base64Data.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
  }
  
  const blob = new Blob([uInt8Array], {type: contentType});
  
  const file = new File([blob], filename, {type: contentType});
  
  return file;
}

import config from './config.js'
import { disconnect, getChainId } from '@wagmi/core'
export const chainIdSWAN = ref(getChainId(config.config))
import { clearLoginInfo, clearMetaAddress, clearSignature, setMetaAddress, token } from './storage.js'

export const paginationWidth:boolean = document.documentElement.clientWidth >= 768
window.addEventListener("resize", function () {
  const newParams = document.documentElement.clientWidth >= 768
  if (newParams !== paginationWidth) window.location.reload()
})

export function dataGPU (data: any) {
  // console.log(data)
  let datum: any[], timeArr: any[]
  // 排序
  data.sort((itema:any, itemb:any) => {
    return itema.timestamp - itemb.timestamp
  })
  // 循环处理数组
  data.forEach((item:any) => {
    // let time_end = momentFun(item.timestamp)
    // let time = new Date(parseInt(item.timestamp) * 1000)
    // let time_end = addZero(time.getFullYear()) + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
    const time_end = getDateTime(parseInt(item.timestamp) * 1000)
    if (timeArr.indexOf(time_end) === -1) {
      timeArr.push(time_end)
      datum.push(item.score)
    } else {
      datum[timeArr.indexOf(time_end)] = datum[timeArr.indexOf(time_end)] + item.score
    }
  })
  return {
    datum: datum,
    timeArr: timeArr
  }
}

export function getDateTime (time: any) {
  const now = time ? new Date(time) : new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始的，所以需要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 格式化月份和日期，保持两位数
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return time ? `${formattedMonth}/${formattedDay}` : `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function AddFormat (num1:string, num2:string) {
  try {
    return parseFloat(num1) + parseFloat(num2)
  } catch {
    return 0
  }
}

export function unifyNumber (num: any) {
  if (!num) return 0
  const handleNum = parseFloat(num * 100)
  const isToFixed = handleNum.toString().includes('.') && handleNum.toString().split('.')[1].length > 2
  if (isToFixed) {
    const handleArray = handleNum.toString().split('.')
    const decimal = handleArray[1].substr(0, 2)
    if (decimal === "00") return handleNum.toFixed(0)
    else return `${handleArray[0]}.${decimal}`
  } else return handleNum
}

export function floorFormat (num: any) {
  try {
    if (num) return Math.floor(parseFloat(num))
    else return '-'
  } catch {
    return '-'
  }
}

export function NumFormat (num: any) {
  try {
    if (num) return parseFloat(num).toFixed(2)
    else return '-'
  } catch {
    return '-'
  }
}

export async function getUnit (id:number) {
  let unit = 'ETH'
  let name = ''
  let url = ''
  let url_tx = ''
  switch (id) {
    case 1:
      unit = 'ETH'
      name = 'Ethereum Mainnet '
      break
    case 2024:
      unit = 'sETH'
      name = 'Saturn Testnet '
      url = `${import.meta.env.VITE_SATURNBLOCKURL}/address/`
      url_tx = `${import.meta.env.VITE_SATURNBLOCKURL}/tx/`
      break
    case 20241133:
      unit = 'sETH'
      name = 'Swan Proxima Chain '
      url = `${import.meta.env.VITE_ATOMBLOCKURL}/address/`
      url_tx = `${import.meta.env.VITE_ATOMBLOCKURL}/tx/`
      break
    default:
      unit = '-'
      name = `Chain ${id}`
      break
  }
  return ({
    unit,
    name,
    url,
    url_tx
  })
}

export function storageNumformat (data: any) {
  if (!data) return
  const dataList:any = data.split(' ')
  dataList[0] = parseFloat(dataList[0]).toFixed(2)
  return dataList[1] ? `${dataList[0]} ${dataList[1]}` : dataList[0]
}

export function fixedformat (num1: any, num2: any) {
  if (!num1 || !num2) return 0
  const dataList:string = (num1 / num2 * 100).toString()
  return parseFloat(dataList).toFixed(2)
}

export function filNumformat (data: string) {
  if (!data) return
  const price_regular:any = data ? data.split(" ") : []
  return `${replaceFormat(price_regular[0] * 365)} FIL/GiB/year` || '0 FIL/GiB/year'
}

export function byteStorage (limit: any) {
  if (limit <= 0) {
    return '0'
  } else {
    return (limit / (1024 * 1024 * 1024)).toFixed(2) //or 1000
  }
}

export function expiredTime (validDays: any) {
  if (String(validDays) === '0') return 'Forever'
  else if (validDays === undefined) return '-'
  else return momentFun(validDays)
}

export function momentFun(dateItem: any) {
  if(!dateItem) return '-'
  const dateNew = dateItem * 1000
  let dataUnit = ''
  const dataTime = new Date(dateNew) + ''
  const dataUnitIndex = dataTime.indexOf('GMT')
  const dataUnitArray = dataTime.substring(dataUnitIndex, dataUnitIndex + 8)
  switch (dataUnitArray) {
    case 'GMT+1000':
      dataUnit = 'UTC+10'
      break
    case 'GMT-1000':
      dataUnit = 'UTC-10'
      break
    case 'GMT+0000':
      dataUnit = 'UTC+0'
      break
    default:
      dataUnit = dataUnitArray ? dataUnitArray.replace(/0/g, '').replace('GMT', 'UTC') : '-'
      break
  }
  const dateResult = moment(new Date(dateNew)).format('YYYY/MM/DD HH:mm:ss') + ` ${dataUnit}`
  return dateResult ?? '-'
}

export async function signOutFun (status: string) {
  if (token.value || status) {
    await disconnect(config.config)
    clearMetaAddress()
  }
  clearLoginInfo()
  clearSignature()
}

export function hiddAddress (val: string) {
  try {
    if (val) return `${val.substring(0, 5)}...${val.substring(val.length - 5)}`
    else return '-'
  } catch{
    return val
  }
}

export function copyContent(text: string, tipCont?: string) {
  try {
    navigator.clipboard.writeText(text).then(
      () => {
        messageTip('success', tipCont || 'Copied')
      },
      (error) => {
        console.error('复制失败', error);
        messageTip('error', 'Oops, unable to copy')
        // 这里可以添加复制失败的提示
      }
    )
      return true
  } catch (err) {
    console.log('Oops, unable to copy')
  }
  return false
}