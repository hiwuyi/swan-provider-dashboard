<template>
  <el-row :gutter="12" v-loading="cpLoad" class="width">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="grid-content small-spacing text-center font-20">
        <p class="font-14 text-center mb-12">GPU Amount</p>
        <div class='chart-trends' id='chart-bar-gpu' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="grid-content small-spacing text-center font-20">
        <div class="flex flex-ai-end flex-jc-center mb-12">
          <p class="font-14 text-center">Provider Regions</p>
          <div :class="`font-12 ml-10 mr-10 tab-title pointer ${activeTab === 'memory'?'active': ''}`" @click="tabProvider('memory')">Memory (TB)</div>
          <div :class="`font-12 tab-title pointer ${activeTab === 'storage'?'active': ''}`" @click="activeTab='storage'">Storage (TB)</div>
        </div>
        <div v-if="activeTab === 'memory'">
          <div class='chart-trends' id='chart-bar-memory' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        </div>
        <div v-if="activeTab === 'storage'">
          <div class='chart-trends' id='chart-bar-storage' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { getOverviewData, getOverviewECPData } from '@/api/overview';
import { dataResource, getDateRange, replaceFormat, byteStorage, unifyNumber, sizeChange, dataGPU, byteTBStorage } from '@/utils/common';
import { currentNetwork } from '@/utils/storage';
import * as echarts from "echarts"

const activeTab = ref('memory')
const cpLoad = ref(false)
const chipDataAll = ref<any>({
  all: [],
  memoryArray: [],
  storageArray: [],
  gpu: []
})
const totalAll = reactive({
  gpu: {
    used: 0,
    total: 0
  },
  cpu: {
    used: 0,
    total: 0
  },
  storage: {
    used: 0,
    total: 0
  },
  memory: {
    used: 0,
    total: 0
  }
})

async function initFCP () {
  try{
    cpLoad.value = true
    const params = {
      for_prod: 1
    }
    const echartsRes = await getOverviewData(params)
    const data = echartsRes?.data ?? {}
    if(data.toString() !== '{}') dataHandle(data, 'fcp')
  }catch{ cpLoad.value = false}
}
async function initECP () {
  try{
    cpLoad.value = true
    const echartsRes = await getOverviewECPData()
    const data = echartsRes?.data ?? {}
    if(data.toString() !== '{}') dataHandle(data, 'ecp')
  }catch{ cpLoad.value = false}
} 
async function dataHandle(data: any, type: string) {
  const gpu_data = type === 'ecp' ? data.gpu.data : data.gpu_classification_count
  const memory_data = type === 'ecp' ? data.memory.data : data.amount_of_memory_by_country
  const storage_data = type === 'ecp' ? data.storage.data : data.amount_of_storage_by_country
        
  const gpuListCount = await newArrayList(gpu_data) || []
  const memoryList = await newArrayList(memory_data) || []
  const storageList = await newArrayList(storage_data) || []
  chipDataAll.value.all = [...chipDataAll.value.all, ...gpuListCount]
  chipDataAll.value.memoryArray = [...chipDataAll.value.memoryArray, ...memoryList]
  chipDataAll.value.storageArray = [...chipDataAll.value.storageArray, ...storageList]
  chipDataAll.value = await getChipList(chipDataAll.value)
  if(currentNetwork.value === 'Mainnet') {
    chipDataAll.value.gpu = chipDataAll.value.all.sort((a: any, b: any) => {
      const aId = a.id || (99999999 + (a.value || 0))
      const bId = b.id || (99999999 + (b.value || 0))
      return aId - bId
    })
  } else chipDataAll.value.gpu = chipDataAll.value.all
  // console.log(chipDataAll.value.gpu)
  // console.log(chipDataAll.value.storageArray)
  // console.log(chipDataAll.value.memoryArray)
  changetype(chipDataAll.value)
}
async function newArrayList (list: any) {
  try {
    const newArray = list.map((item: any) => {
      const newItem = Object.keys(item).reduce((acc: any, key: string) => {
        const newKey = key === 'gpu_name' || key === 'region' ? 'name' : key === 'gpu_count' || key === 'memory_amount' || key === 'storage_amount' ? 'value' : key === 'gpu_value' ? 'id' : key
        acc[newKey] = item[key];
        return acc;
      }, {});
      return newItem;
    })
    return newArray
  } catch{ return [] }
}
async function getChipList (list: any) {
  let array = {
    all: [],
    memoryArray: [],
    storageArray: []
  }
  try {
    array.all = await reduceMethod(list.all, 'name', 'value')
    array.all = array.all ? await array.all.sort((a: any, b: any) => b.value - a.value) : []
    array.memoryArray = await reduceMethod(list.memoryArray, 'name', 'value')
    array.memoryArray = array.memoryArray ? await array.memoryArray.sort((a: any, b: any) => b.value - a.value) : []
    array.storageArray = await reduceMethod(list.storageArray, 'name', 'value')
    array.storageArray = array.storageArray ? await array.storageArray.sort((a: any, b: any) => b.value - a.value) : []
    return array
  } catch{ return array }
}
async function reduceMethod (arr: any, field: string, valueAmout: string) {
  try {
    return arr.reduce((accumulator: any, current: any) => {
      let existing = accumulator.find((item: any) => item[field].toLowerCase() === current[field].toLowerCase());
      if (existing) {
        existing[valueAmout] += current[valueAmout];
      } else {
        accumulator.push({ ...current });
      }
      return accumulator;
    }, [])
  } catch{ return [] }
}
function tabProvider(type: string) {
  activeTab.value = type
  changetype(chipDataAll.value)
}
const changetype = async (data: any) => {
  cpLoad.value = true
  try{
    const chart_gpu = echarts.init(document.getElementById("chart-bar-gpu"));
    const chart_memory = echarts.init(document.getElementById("chart-bar-memory"));
    const chart_storage = echarts.init(document.getElementById("chart-bar-storage"));

    const gpuDataName = data.gpu.map((user:any) => user.name);
    const gpuDataValue = data.gpu.map((user: any) => user.value);
    
    const memoryDataName = data.memoryArray.map((user: any) => user.name);
    const memoryValue = data.memoryArray.map((user: any) => byteTBStorage(user.value));
    
    const storageDataName = data.storageArray.map((user:any) => user.name);
    const storageValue = data.storageArray.map((user: any) => byteTBStorage(user.value));

    const option = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: gpuDataName,
        inverse: true
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: gpuDataValue,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: false
      }
    }
    const option2 = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: memoryDataName,
        inverse: true
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: memoryValue,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: false
      }
    }
    const option3 = {
      grid: {
        left: '3%',
        right: '3%',
        top: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: storageDataName,
        inverse: true
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: storageValue,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: false
      }
    }
    chart_gpu.setOption(option);
    chart_memory.setOption(option2);
    chart_storage.setOption(option3);
    if (typeof ResizeObserver !== 'undefined') {
      let observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          chart_gpu.resize();
          chart_memory.resize();
          chart_storage.resize();
        }
      });

      let element = document.getElementById('resource-container');
      observer.observe(element);
    } else {
      console.log('ResizeObserver is not supported in this browser.');
    }
    window.addEventListener("resize", function () {
      chart_gpu.resize();
      chart_memory.resize();
      chart_storage.resize();
    })
  }catch{console.error}
  cpLoad.value = false
}
onMounted(async () => {
  initFCP()
  initECP()
})
</script>

<style lang="less" scoped>
.title {
  margin: 0;
  .icon {
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 0.09rem 0 0;
    @media screen and (max-width: 1024px) {
      width: 16px;
      height: 16px;
    }
    &.icon-use {
      background: url(../../../assets/images/icons/icon-06.png) no-repeat;
      background-size: 100%;
    }
  }
}
.el-row {
  :deep(.el-col) {
    &.flex {
      display: flex;
    }
    .grid-content {
      position: relative;
      width: calc(100% - 0.48rem);
      height: calc(100% - 0.36rem);
      padding: 0.18rem 0.24rem;
      background: var(--color-light);
      border-radius: 0.18rem;
      // box-shadow: 0 0 12px #e6e7eb;
      &.small-spacing {
        width: calc(100% - 0.1rem);
        padding: 0.18rem 0.05rem;
        .tab-title{
          padding: 0.02rem 0.06rem;
          &.active, &:hover {
            background-color: var(--color-primary);
            border-radius: 4px;
            color: var(--color-light);
          }
        }
      }
      &.none {
        width: calc(100% - 0.3rem);
        height: 100%;
        padding: 0 0 0 0.3rem;
        @media screen and (max-width: 768px) {
          width: 100%;
          padding: 0;
        }
      }
      .el-col {
        margin: 0.1rem 0 0;
      }
      .top {
        margin: 0;
        .left {
          .icon {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 0.07rem 0 0;
            &.icon-gpu {
              background: url(../../assets/images/icons/icon-gpu.png)
                no-repeat center;
              background-size: 100%;
            }
          }
        }
        .right {
          .text {
            margin: 0 0 0 0.2rem;
            white-space: nowrap;
            line-height: 1;
            span {
              color: #76b900;
            }
          }
          .small-text {
            margin: 0 0 0 0.14rem;
            color: var(--color-border);
          }
        }
      }
      .content {
        a {
          width: 100%;
          padding: 0.08rem 0;
          background-color: #edf2ff;
          border: 1px solid #a8c2ff;
          border-radius: 0.5rem;
          color: var(--color-primary);
          line-height: 1;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            margin: 0.2rem 0 0.1rem;
          }
          &.is-disabled {
            background-color: #f3f4f8;
            border-color: #c6cedc;
            color: #ababab;
            cursor: no-drop;
            pointer-events: none;
          }
        }
      }
      .desc {
        color: #7c889b;
      }
      .color-gpu {
        color: #93c605;
      }
      .color-cpu {
        color: #699bff;
      }
      .color-memory {
        color: #52ce7c;
      }
      .color-storage {
        color: #0046b7;
      }
    }
    .date {
      top: 0;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 4rem;
      @media screen and (max-width: 768px) {
        height: 420px;
      }
      @media screen and (max-width: 600px) {
        height: 470px;
      }
    }
  }
}
</style>
