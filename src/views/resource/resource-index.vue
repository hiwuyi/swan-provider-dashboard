<template>
  <section id="resource-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">Resources</h1>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <echarts-use></echarts-use>
      </div>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <echarts-bar></echarts-bar>
      </div>
    </div>

    <div class="providers-overview">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="flex flex-ai-center baseline mt-30">
          <div class="usage-style flex flex-ai-center font-24 font-bold">
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
import { getCPlistData } from '@/api/overview'

const networkInput = ref('')
const providersLoad = ref(false)

async function init () {
  providersLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    const params = {
      limit: pagin.pageSize,
      offset: page * pagin.pageSize,
      search_string: networkInput.value
    }
    const providerRes = await getCPlistData(params)
    pagin.total = providerRes?.data?.list_providers_cnt ?? 0
    providersData.value = await getList(providerRes?.data?.providers)
    providersLoad.value = false
  }catch{providersLoad.value = false}
}
async function getList (list) {
  let l = list || []
  l.forEach((element) => {
    element.gpu_list = []
    try {
      if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
        element.computer_provider.machines.forEach((machines) => {
          if (machines.specs.gpu.details && machines.specs.gpu.details.length > 0) {
            machines.specs.gpu.details.forEach((gpu) => {
              if (element.gpu_list.indexOf(gpu.product_name) < 0) element.gpu_list.push(gpu.product_name)
            })
          }
        })
      }
    } catch{ }
  })
  return l
}
onMounted(async () => {})
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
