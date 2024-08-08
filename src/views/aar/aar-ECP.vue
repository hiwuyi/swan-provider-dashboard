<template>
  <section id="aarECP-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">
      ECP Rankings</h1>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Name: </span>
              <el-input class="zk-input" v-model="networkZK.name" placeholder="please enter name" @chang="searchZKProvider" @input="searchZKProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkZK.cp_addr" placeholder="please enter CP Account Address" @chang="searchZKProvider" @input="searchZKProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="3" :xl="3">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkZK.cp_addr && !networkZK.name ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" :disabled="!networkZK.cp_addr && !networkZK.name ? true:false" round @click="searchZKProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>

        <el-table :data="providerBody.ubiTableData" style="width: 100%" empty-text="No Data" v-loading="providersECPLoad">
          <el-table-column type="index" width="80">
            <template #header>
              <div class="font-14 weight-4">Ranking</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <img v-if="scope.$index === 0 && paginZK.pageNo <= 1" :src="badgeIcon01" alt="" class="img">
                <img v-else-if="scope.$index === 1 && paginZK.pageNo <= 1" :src="badgeIcon02" alt="" class="img">
                <img v-else-if="scope.$index === 2 && paginZK.pageNo <= 1" :src="badgeIcon03" alt="" class="img">
                <span v-else class="img"></span> {{scope.$index+1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" min-width="120">
            <template #header>
              <div class="font-14 weight-4">Name</div>
            </template>
            <template #default="scope">
              <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.name">
                <template #reference>
                  <div class="name-style" @click="handleSelect('ranking', scope.row, 'FCP')">{{scope.row.name}}</div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="owner_addr" min-width="140">
            <template #header>
              <div class="font-14 weight-4">Contract Address</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" @click="copyContent(scope.row.owner_addr, 'Copied')">
                {{hiddAddress(scope.row.owner_addr)}}
                <svg t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="node_id" min-width="120">
            <template #header>
              <div class="font-14 weight-4">nodeID</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" @click="copyContent(scope.row.node_id, 'Copied')">
                {{hiddAddress(scope.row.node_id)}}
                <svg t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="task">
            <template #header>
              <div class="font-14 weight-4">Total Task</div>
            </template>
            <template #default="scope">
              <div>
                {{scope.row.task?scope.row.task.total : ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="completion_rate" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Completion Rate</div>
            </template>
            <template #default="scope">
              <div class="name-style black">{{replaceFormat(scope.row.completion_rate)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="completion_rate" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Contribution Score</div>
            </template>
            <template #default="scope">
              <div class="name-style black">{{replaceFormat(scope.row.completion_rate)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="region" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Reward Score</div>
            </template>
            <template #default="scope">
              <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.region">
                <template #reference>
                  <div class="name-style black">{{scope.row.region}}</div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex-ai-center flex-jc-center pagination-style">
          <span class="showing">Showing {{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize : 0 }}-{{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + providerBody.ubiTableData.length : 0 + providerBody.ubiTableData.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="paginZK.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="paginZK.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="paginZK.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
        </div>
      </div>
    </div>

    <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
  </section>
</template>

<script setup lang="ts">
import vmDrawer from "@/components/vmDrawer.vue"
import { metaAddress } from "@/utils/storage";
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

    const route = useRoute()
    const router = useRouter()
    import badgeIcon01 from "@/assets/images/icons/badge-1.png"
    import badgeIcon02 from "@/assets/images/icons/badge-2.png"
    import badgeIcon03 from "@/assets/images/icons/badge-3.png"
import { copyContent, debounce, fixedformat, hiddAddress, paginationWidth, replaceFormat } from "@/utils/common";
import { getOverViewECP, getOverviewECPData } from "@/api/overview";
    const providersLoad = ref(false)
    const providersECPLoad = ref(false)
    const providerBody = reactive({
      ubiTableData: []
    })
    const paginZK = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0,
      total_deployments: 0,
      active_applications: 0
    })
    const small = ref(false)
    const background = ref(false)
    const cpLoad = ref(false)
    const networkZK = reactive({
      cp_addr: '',
      name: '',
      node_id: ''
    })
    const vmOperate = reactive({
      centerDrawerVisible: false,
      row: {}
    })

    function handleSizeChange (val) { }
    async function handleZKCurrentChange (currentPage) {
      paginZK.pageNo = currentPage
      getUBITable()
    }
    async function getUBITable () {
      providersECPLoad.value = true
      try{
        const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
        const params = {
          page_size: paginZK.pageSize,
          page_no: page,
          cp_addr: networkZK.cp_addr,
          name: networkZK.name,
          node_id: networkZK.node_id
        }
        const providerRes = await getOverViewECP(params)
        paginZK.total = providerRes?.data?.total ?? 0
        providerBody.ubiTableData = await getList(providerRes.data.list)
      } catch { console.error }
      providersECPLoad.value = false
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
    const searchZKProvider = debounce(async function () {
      paginZK.pageNo = 1
      getUBITable()
    }, 700)
    function clearProvider () {
      networkZK.name = ''
      networkZK.cp_addr = ''
      networkZK.node_id = ''
      paginZK.pageNo = 1
      getUBITable()
    }
    function reset (type) {
      paginZK.total = 0
      paginZK.total_deployments = 0
      paginZK.active_applications = 0
      paginZK.pageSize = 10
      paginZK.pageNo = 1
      providersLoad.value = false
      providersECPLoad.value = false
      networkZK.name = ''
      networkZK.cp_addr = ''
      networkZK.node_id = ''
      getUBITable()
    }
    async function handleSelect (key, row, type) {
      // console.log(key, index, row) 
      // switch (key) {
      //   case 'ranking':
      //     vmOperate.row = row
      //     vmOperate.row.type = type
      //     vmOperate.centerDrawerVisible = true
      //     break;
      // }
      router.push({ name: 'accountInfo', params: { type: 'ECP' } })
    }
    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    onMounted(async () => {
      reset('init')
    })
  
</script>

<style lang="less" scoped>
#aarECP-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0.14rem 0;
    .module-container {
      position: relative;
      width: calc(100% - 0.6rem);
      height: calc(100% - 0.4rem);
      padding: 0.1rem 0.3rem 0.3rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      .title {
        width: 100%;
        margin: 0.22rem 0 0;
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
      .el-row {
        .el-col {
          margin: 0.1rem 0 0;
          &.flex {
            display: flex;
          }
          &.m {
            margin: 0.22rem 0;
          }
          .grid-content {
            width: 100%;
            height: calc(100% - 0.3rem);
            padding: 0.18rem 0.14rem 0.12rem;
            background: var(--color-light);
            border-radius: 0.18rem;
            box-shadow: 0 0 12px #e6e7eb;
            h6 {
              width: 100%;
              line-height: 1.2;
              text-transform: capitalize;
              color: var(--color-border);
              &.t {
                width: auto;
                padding: 0 0.2rem;
              }
              small {
                margin: 0 0 0 5px;
                font-family: "Montserrat-Regular";
                font-weight: normal;
                color: #a0a0a0;
                font-size: 0.13rem;
                @media screen and (min-width: 1800px) {
                  font-size: 0.15rem;
                }
                @media screen and (max-width: 768px) {
                  font-size: 12px;
                }
              }
              .el-select {
                font-size: inherit;
                .el-tooltip__trigger {
                  margin: 0;
                  width: 80px;
                  padding: 2px 4px;
                }
              }
            }
            b {
              position: relative;
              padding: 6px 0 12px;
              margin: 0 0 2px;
              line-height: 1;
              .span {
                position: absolute;
                bottom: 0;
                right: 0.2rem;
                &.up {
                  color: #38a169;
                }
                &.down {
                  color: #e53e3e;
                }
                small {
                  margin: 0;
                  font-family: "Montserrat-Regular";
                  font-weight: normal;
                  color: #a0a0a0;
                  font-size: 0.14rem;
                  @media screen and (min-width: 1800px) {
                    font-size: 0.16rem;
                  }
                  @media screen and (max-width: 768px) {
                    font-size: 13px;
                  }
                }
              }
              small {
                margin: 0 0 0 4px;
                font-size: 0.16rem;
                @media screen and (min-width: 1800px) {
                  font-size: 0.18rem;
                }
                @media screen and (max-width: 768px) {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
