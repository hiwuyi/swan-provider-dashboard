<template>
  <section id="cp-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">CP Profile</h1>
    </div>

    <div class="providers-network font-16">
      <div class="providers">
        <account-info :cpsData="cpsData" :cpsLoad="cpsLoad"></account-info>
      </div>

      <div class="providers">
        <echart-list></echart-list>
      </div>

      <div class="providers-cp">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">Resource List</b>
        </div>
        <resource-echarts-list></resource-echarts-list>
        <resource-list :cpsData="cpsData" :cpsLoad="cpsLoad"></resource-list>
      </div>

      <div class="providers-cp">
        <tab-list></tab-list>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import accountInfo from './pages/accrount-info.vue'
import echartList from './pages/echart-list.vue'
import resourceEchartsList from './pages/resource-echarts-list.vue'
import resourceList from './pages/resource-list.vue'
import tabList from './pages/tab-list.vue'
import { getCPsData } from "@/api/cp-profile"

const route = useRoute()
const cpsLoad = ref(false)
const cpsData = ref<any>({})

async function getAllCPsData() {
  cpsLoad.value = true
  try{
    const cpsRes = await getCPsData(route.params.cp_addr)
    cpsData.value = cpsRes?.data ?? {}
  }catch{console.error}
  cpsLoad.value = false
}
onMounted(async () => {
  getAllCPsData()
})

watch(route, (to:any) => {
  if (to.name === "accountInfo") getAllCPsData()
})
</script>

<style lang="less" scoped>
#cp-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .copy-style {
    cursor: pointer;
    flex-wrap: wrap;
    svg {
      margin: 0 0 0 0.05rem;
    }
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .s {
      height: calc(100% - 0.4rem) !important;
      margin: 0 !important;
    }
    .providers {
      margin: 0.08rem 0 0.18rem;
    }
    .providers-cp {
      height: calc(100% - 0.8rem);
      padding: 0.3rem 0.35rem 0.1rem;
      margin: 0.4rem 0 0;
      background-color: var(--color-light);
      border-radius: 0.2rem;
    }
    .title {
      width: 100%;
      // margin: 0.22rem 0 0;
      line-height: 1;
      a {
        padding: 0.07rem 0.1rem;
        margin: 0 0 0 0.1rem;
        background-color: var(--color-light);
        border: 1px solid #c1c9d8;
        border-radius: 0.07rem;
        color: var(--color-primary);
        i {
          width: 0.25rem;
          height: 0.25rem;
          margin: 0 0 0 0.07rem;
          background: url(../../assets/images/icons/icon-01.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
