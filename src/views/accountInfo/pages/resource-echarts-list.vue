<template>
  <el-row class="re-list mb-24 font-14">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Total Number Of Node:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{ props.cpsData.resources ? replaceFormat(props.cpsData.resources.length) : '-'}}</p>
    </el-col>
    <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Completed:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{unifyNumber(0.9)}}%</p>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Uptime:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{unifyNumber(1)}}%</p>
    </el-col> -->
  </el-row>
  
  <el-row :gutter="12" v-loading="cpLoad">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline mb-10">
      <el-row class="width">
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">GPU Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.gpu.used/totalAll.gpu.total))" :width="104" :stroke-width="21" color="#01b4ff" class="color-gpu" />
            <!-- <div class='chart-trends' id='chart-gpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-gpu">{{ replaceFormat(totalAll.gpu.used) }}</span> Used {{ replaceFormat(totalAll.gpu.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">CPU Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.cpu.used/totalAll.cpu.total))" :width="104" :stroke-width="21" color="#01b4ff" class="color-cpu" />
            <!-- <div class='chart-trends' id='chart-cpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-cpu">{{ replaceFormat(totalAll.cpu.used) }}</span> Used {{ replaceFormat(totalAll.cpu.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">Memory Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.memory.used/totalAll.memory.total))" :width="104" :stroke-width="21" color="#01b4ff" class="color-memory" />
            <!-- <div class='chart-trends' id='chart-memory' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-memory">{{ sizeChange(totalAll.memory.used) }}</span> Used {{ sizeChange(totalAll.memory.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">Storage Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.storage.used/totalAll.storage.total))" :width="104" :stroke-width="21" color="#01b4ff" class="color-storage" />
            <!-- <div class='chart-trends' id='chart-storage' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-storage">{{ sizeChange(totalAll.storage.used) }}</span> Used {{ sizeChange(totalAll.storage.total) }} Free</p>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { getCPsEchartsData } from '@/api/cp-profile'
import { dataResource, getDateRange, replaceFormat, sizeChange, unifyNumber } from '@/utils/common';
import * as echarts from "echarts"

const cpLoad = ref(false)
const providersLoad = ref(false)
const weekList = reactive({
  value: 'Week',
  options: [
    {
      value: 'Week',
      label: '1 Week'
    },
    {
      value: 'Month',
      label: '1 Month'
    },
    {
      value: 'Year',
      label: '1 Year'
    }]
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

async function initEcharts () {
  try{
    cpLoad.value = true

    const weekRange = getDateRange(weekList.value);
    const params = {
      from: weekRange.start,
      to: weekRange.end
    }
    const echartsRes = await getCPsEchartsData(params)
    const data = echartsRes?.data ?? {}
    changetype(data)
  }catch{ cpLoad.value = false}
}
const changetype = async (data: any) => {
  try{
    const gpuData = await dataResource(data.gpu, 'active')
    const cpuData = await dataResource(data.cpu, 'active')
    const memoryData = await dataResource(data.memory, 'active')
    const storageData = await dataResource(data.storage, 'active')
    totalAll.gpu.used = gpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.gpu.total = gpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.cpu.used = cpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.cpu.total = cpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.memory.used = memoryData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.memory.total = memoryData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.storage.used = storageData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.storage.total = storageData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
  }catch{console.error}
  cpLoad.value = false
}
onMounted(async () => {
  initEcharts()
})

const props = withDefaults(
  defineProps<{
    cpsData?: any
  }>(),
  {
    cpsData: {}
  }
)
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
        .el-progress {
          margin: 0.1rem auto 0.16rem;
          .el-progress__circle,
          .el-progress-circle__track {
            border-radius: 0 !important;
          }
          .el-progress-circle__track {
            // stroke: #7c889b;
            stroke: #49ad6b;
          }
          .el-progress__text {
            font-family: inherit;
            font-size: inherit !important;
            font-weight: bold;
            color: inherit;
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
        color: #8c8c8c;
      }
      .color-cpu {
        color: #8c8c8c;
      }
      .color-memory {
        color: #8c8c8c;
      }
      .color-storage {
        color: #8c8c8c;
      }
    }
    .date {
      top: 0;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 1.3rem;
      @media screen and (max-width: 768px) {
        height: 150px;
      }
      @media screen and (max-width: 600px) {
        height: 200px;
      }
      &.big {
        height: 2.7rem;
        @media screen and (max-width: 768px) {
          height: 280px;
        }
      }
    }
  }
}


.re-list {
  .el-col {
    margin: 0.22rem 0 0;
    &.flex {
      display: flex;
    }
    &.m {
      margin: 0.22rem 0;
    }
    .module-container {
      position: relative;
      width: calc(100% - 0.64rem);
      height: calc(100% - 0.5rem);
      padding: 0.25rem 0.32rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      &.world {
        background-color: var(--color-primary);
        .title {
          color: var(--color-light);
        }
      }
      .el-col {
        margin: 0;
      }
      .title {
        margin: 0;
        .subtitle {
          margin: 0.06rem 0 0;
          color: #7c889b;
        }
      }
      .grid-content {
        height: calc(100% - 0.53rem);
        margin: 0.23rem 0 0;
        background: #edf2ff;
      }
    }
    .grid-content {
      position: relative;
      width: calc(100% - 0.28rem);
      height: calc(100% - 0.3rem);
      padding: 0.18rem 0.14rem 0.12rem;
      background: var(--color-light);
      border-radius: 0.18rem;
      // box-shadow: 0 0 12px #e6e7eb;
    }
    .chart-trends {
      width: 100%;
      margin: -0.4rem auto 0;
      height: 2.8rem;
      @media screen and (min-width: 3600px) {
        height: 400px;
      }
      @media screen and (max-width: 1600px) {
        margin: -0.43rem auto 0;
      }
      @media screen and (max-width: 1440px) {
        margin: -0.5rem auto 0;
      }
      @media screen and (max-width: 768px) {
        height: 280px;
        margin: -0.3rem auto 0;
      }
      @media screen and (max-width: 600px) {
        height: 250px;
      }
    }
  }
}
</style>
