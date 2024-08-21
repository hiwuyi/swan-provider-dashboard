<template>
  <section id="cp-container">
    <div class="flex flex-ai-center header-title font-16">
      <h1 class="font-20 font-bold s">CP Profile</h1>
      <div class="flex flex-ai-center copy-style" v-if="route.params.cp_addr">
        <a class="link-to s font-18" :href="`${explorerLink}address/${route.params.cp_addr}`" target="_blank">{{route.params.cp_addr ?? '-'}}</a>
        <svg @click="copyContent(route.params.cp_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="18" height="18">
          <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
            fill="#3d3d3d" p-id="6468"></path>
          <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
            fill="#3d3d3d" p-id="6469"></path>
        </svg>
      </div>
      <span v-else>-</span>
      <div class="flex name-title">
        <a @click="handleSelect('claimAccount', cpsData, 'claimAccount')" :class="{'is-disabled': cpsLoad, 'pointer': true}">Claim Account</a>
      </div>
    </div>

    <div class="providers-network font-14">
      <div class="providers mb-32">
        <echart-list :cpsData="cpsData" :cpsLoad="cpsLoad"></echart-list>
      </div>

      <div class="providers">
        <account-info :cpsData="cpsData" :cpsLoad="cpsLoad"></account-info>
      </div>

      <div class="providers-cp">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">Resource List</b>
        </div>
        <resource-echarts-list :cpsData="cpsData"></resource-echarts-list>
        <resource-list :cpsData="cpsData" :cpsLoad="cpsLoad"></resource-list>
      </div>

      <div class="providers-cp">
        <tab-list></tab-list>
      </div>
    </div>

    <vm-dialog v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-dialog>
  </section>
</template>

<script setup lang="ts">
import vmDialog from "@/components/vmDialog.vue"
import { explorerLink } from '@/utils/storage'
import accountInfo from './pages/accrount-info.vue'
import echartList from './pages/echart-list.vue'
import resourceEchartsList from './pages/resource-echarts-list.vue'
import resourceList from './pages/resource-list.vue'
import tabList from './pages/tab-list.vue'
import { getCPsData } from "@/api/cp-profile"
import { copyContent } from '@/utils/common'

const route = useRoute()
const cpsLoad = ref(false)
const cpsData = ref<any>({})
const vmOperate = reactive({
  centerDrawerVisible: false,
  row: {},
  type: 'dialog'
})
  
function hardClose (dialog:boolean) {
  vmOperate.centerDrawerVisible = dialog
}

async function handleSelect(key: string, row: any, type: string) {
  if(cpsLoad.value) return
  switch (key) {
    case 'claimAccount':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'dialog'
      vmOperate.centerDrawerVisible = true
      break;
  }
}
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
  padding: 0 0 0.2rem;
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
      position: relative;
      height: calc(100% - 0.62rem);
      padding: 0.3rem 0.35rem 0.1rem;
      margin: 0.22rem 0 0;
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
