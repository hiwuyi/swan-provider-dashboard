<template>
  <section id="resource-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">Resources</h1>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <echarts-use :echartData="echartData"></echarts-use>
      </div>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <echarts-bar :echartData="echartData"></echarts-bar>
      </div>
    </div>

    <div class="providers-overview">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="flex flex-ai-center baseline mt-30">
          <div class="usage-style flex flex-ai-center font-20 font-bold">
            <label>Total Available GPUs: </label>
            <div class="progress flex flex-ai-center flex-jc-between nowrap">
              <el-progress :percentage="60" color="#76b900" :stroke-width="16" />
              <div class="text">
                <span>68</span> /291</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="providers-network font-14">
      <div class="providers-cp">
        <total-available-gpus></total-available-gpus>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import echartsUse from './pages/echarts-use.vue'
import echartsBar from './pages/echarts-bar.vue'
import totalAvailableGpus from './pages/total-available-gpus.vue'
import { getStatsResourceData } from '@/api/resource'

const echartData = ref<any>({})
const providersLoad = ref(false)

async function initResource () {
  try{
    providersLoad.value = true
    const echartsRes = await getStatsResourceData()
    echartData.value = echartsRes?.data ?? {}
  }catch{providersLoad.value = false}
}
onMounted(() => initResource())
</script>

<style lang="less" scoped>
#resource-container {
  padding: 0 0 0.2rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .providers-container {
    position: relative;
    width: calc(100% - 0.64rem);
    padding: 0.25rem 0.32rem;
    margin: 0.16rem 0;
    background-color: var(--color-light);
    border-radius: 0.14rem;
    .el-col {
      margin: 0 !important;
    }
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .el-row {
      .el-col {
        &.flex {
          display: flex;
        }
        .usage-style {
          width: 100%;
          margin: 0 0 0.08rem;
          color: #000000;
          label {
            width: 3.1rem;
            margin: 0 0.1rem 0 0;
            line-height: 1.1;
          }
          .progress {
            width: calc(85% - 3.2rem);
            .el-progress {
              width: 100%;
              .el-progress__text {
                display: none;
              }
              .el-progress-bar__outer {
                background-color: #d7d7d7;
              }
            }
            .text {
              margin: 0 0 0 0.2rem;
              white-space: nowrap;
              line-height: 1;
              span {
                color: #76b900;
              }
            }
          }
        }
      }
    }
  }
}
</style>
