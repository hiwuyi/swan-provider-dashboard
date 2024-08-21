<template>
  <el-row :gutter="32">
    <el-col v-loading="gpuBarLoad" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="grid-content small-spacing text-center font-20">
        <div class="flex flex-ai-end flex-jc-center mb-24">
          <p class="font-16 text-center">GPU Amount</p>
        </div>
        
        <div class="chip-data">
          <div class="cont-flex">
            <div class="no-result flex-row center" v-if="chipDataAll.gpu && chipDataAll.gpu.length === 0">No Data</div>
            <template v-for="chip in chipDataAll.gpu" :key="chip">
              <div class="cont flex flex-ai-center flex-jc-between nowrap font-13">
                <div class="items-center text-right">{{chip.name}}</div>
                <div class="flex flex-ai-center flex-jc-left nowrap items-number">
                  <div class="absolute" :style="'width:' + (chip.value / chipDataAll.gpuMaxData * 100) + '%;'"></div>
                  <div class="text-data color-light ml-4 mr-2">{{replaceFormat(chip.value)}}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </el-col>
    <el-col v-loading="cpLoad" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="grid-content small-spacing text-center font-20">
        <div class="flex flex-ai-end flex-jc-center mb-24">
          <p class="font-16 text-center">Provider Regions</p>
          <div :class="`font-12 ml-10 mr-10 tab-title pointer ${activeTab === 'cpu'?'active': ''}`" @click="tabProvider('cpu')">CPU</div>
          <div :class="`font-12 ml-10 mr-10 tab-title pointer ${activeTab === 'memory'?'active': ''}`" @click="tabProvider('memory')">Memory (TB)</div>
          <div :class="`font-12 tab-title pointer ${activeTab === 'storage'?'active': ''}`" @click="tabProvider('storage')">Storage (TB)</div>
        </div>
        <div v-if="activeTab === 'cpu'">
          <div class="chip-data">
            <div class="cont-flex">
              <div class="no-result flex-row center" v-if="chipDataAll.cpu && chipDataAll.cpu.length === 0">No Data</div>
              <template v-for="chip in chipDataAll.cpu" :key="chip">
                <div class="cont flex-row space-between nowrap font-13">
                  <div class="items-center text-right">{{chip.name}}</div>
                  <div class="flex flex-ai-center flex-jc-left nowrap items-number">
                    <div class="absolute" :style="'width:' + (chip.value / chipDataAll.cpuMaxData * 100) + '%;'"></div>
                    <div class="text-data color-light ml-4 mr-2">{{replaceFormat(chip.value)}}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'memory'">
          <div class="chip-data">
            <div class="cont-flex">
              <div class="no-result flex-row center" v-if="chipDataAll.memory && chipDataAll.memory.length === 0">No Data</div>
              <template v-for="chip in chipDataAll.memory" :key="chip">
                <div class="cont flex-row space-between nowrap font-13">
                  <div class="items-center text-right">{{chip.name}}</div>
                  <div class="flex flex-ai-center flex-jc-left nowrap items-number">
                    <div class="absolute" :style="'width:' + (chip.value / chipDataAll.memoryMaxData * 100) + '%;'"></div>
                    <div class="text-data color-light ml-4 mr-2">{{byteTBStorage(chip.value)}}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'storage'">
          <div class="chip-data">
            <div class="cont-flex">
              <div class="no-result flex-row center" v-if="chipDataAll.storage && chipDataAll.storage.length === 0">No Data</div>
              <template v-for="chip in chipDataAll.storage" :key="chip">
                <div class="cont flex-row space-between nowrap font-13">
                  <div class="items-center text-right">{{chip.name}}</div>
                  <div class="flex flex-ai-center flex-jc-left nowrap items-number">
                    <div class="absolute" :style="'width:' + (chip.value / chipDataAll.storageMaxData * 100) + '%;'"></div>
                    <div class="text-data color-light ml-4 mr-2">{{byteTBStorage(chip.value)}}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { byteTBStorage, replaceFormat } from '@/utils/common';

const props = withDefaults(
  defineProps<{
    echartData?: any
  }>(),
  {
    echartData: {}
  }
)

const activeTab = ref('cpu')
const cpLoad = ref(true)
const gpuBarLoad = ref(true)
const chipDataAll = ref<any>({
  all: [],
  cpu: [],
  cpuMaxData: 0,
  memoryArray: [],
  memoryMaxData: 0,
  storageArray: [],
  storageMaxData: 0,
  gpu: [],
  gpuMaxData: 0
})

async function initGPU () {
  try {
    gpuBarLoad.value = true
    chipDataAll.value.gpu = props.echartData?.gpu?.models ?? []
    const gpuList = JSON.parse(JSON.stringify(props.echartData?.gpu?.models))
    const gpuTop = gpuList ? await gpuList.sort((a, b) => b.value - a.value) : []
    chipDataAll.value.gpuMaxData = gpuTop[0].value ?? 0
    gpuBarLoad.value = false
  } catch {
    chipDataAll.value.gpu = []
    chipDataAll.value.gpuMaxData = 0
    gpuBarLoad.value = false
  }
}
async function initProvider () {
  cpLoad.value = true
  try {
    chipDataAll.value.cpu = props.echartData?.cpu ? await props.echartData.cpu.distributions.sort((a, b) => b.value - a.value) : []
    chipDataAll.value.cpuMaxData = chipDataAll.value.cpu[0].value ?? 0
  }catch{ console.error }
  try {
    chipDataAll.value.memory = props.echartData?.memory ? await props.echartData.memory.distributions.sort((a, b) => b.value - a.value) : []
    chipDataAll.value.memoryMaxData = chipDataAll.value.memory[0].value ?? 0
  }catch{ console.error }
  try {
    chipDataAll.value.storage = props.echartData?.storage ? await props.echartData.storage.distributions.sort((a, b) => b.value - a.value) : []
    chipDataAll.value.storageMaxData = chipDataAll.value.storage[0].value ?? 0
  }catch{ console.error }
  cpLoad.value = false
} 
async function tabProvider(type: string) {
  activeTab.value = type
}

watch(() => props.echartData, () => {
  initGPU()
  initProvider()
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
              background: url(../../../assets/images/icons/icon-gpu.png)
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
      .chip-data {
        width: 100%;
        height: calc(100% - 0.35rem);
        margin: 0.35rem auto 0;
        flex-direction: column;
        overflow: hidden;
        .chip-filter {
          height: 40px;
          .el-radio-button__inner {
            background-color: transparent;
            font-size: var(--font-14);
            color: var(--color-primary);
            border-color: var(--color-primary);
            @media screen and (max-width: 600px) {
              padding: 5px;
            }
          }
        }
        .no-result {
          width: 94%;
          height: calc(100% - 40px);
          margin: auto;
        }
        .cont-flex {
          height: 420px;
          overflow: hidden;
          overflow-y: scroll;
          // border: 1px solid #3a67cf;
          // border-radius: 0.14rem;
          scrollbar-width: none;
          scrollbar-color: rgba(60, 70, 110, 0.6) rgba(13, 14, 18, 1);
          @media screen and (max-width: 992px) {
            height: 320px;
          }
          @media screen and (max-width: 600px) {
            height: 220px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(13, 14, 18, 1);
            border-radius: 4px;
          }
          &::-webkit-scrollbar {
            width: 4px;
            background: rgba(60, 70, 110, 0.6);
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(60, 70, 110, 0.6);
          }
          .cont {
            position: relative;
            flex-direction: row;
            width: 100%;
            padding: 0.07rem 0;
            margin: 0.1rem 0 0;
            font-weight: 700;
            letter-spacing: 1px;
            color: var(--color-dark);
            z-index: 9;
            overflow: hidden;
            letter-spacing: 0;
            @media screen and (max-width: 600px) {
              padding: 0.12rem 0;
            }
            .items-number {
              position: relative;
              width: calc(100% - 2.8rem);
              height: 0.2rem;
              @media screen and (max-width: 768px) {
                width: calc(100% - 2.2rem);
              }
              &::after {
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                content: '';
                width: 100%;
                height: 1px;
                background-color: #ecedeb;
                z-index: -1;
              }
              .absolute {
                height: 100%;
                margin: 0;
                background: linear-gradient(
                  45deg,
                  #91a8f4,
                  #567aee
                );
                z-index: 1;
              }
              .text-data {
                padding: 0 2px;
                background-color: #567aee;
                border-radius: 2px;
                z-index: 1;
              }
            }
            .items-center {
              width: 2.7rem;
              @media screen and (max-width: 768px) {
                width: 2.1rem;
              }
              .point {
                width: 12px;
                height: 12px;
                background-color: #52555f;
                border-radius: 100%;
              }
            }
          }
        }
      }
    }
    .date {
      top: 0;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 4.5rem;
      @media screen and (max-width: 768px) {
        height: 470px;
      }
      @media screen and (max-width: 600px) {
        height: 500px;
      }
    }
  }
}
</style>
