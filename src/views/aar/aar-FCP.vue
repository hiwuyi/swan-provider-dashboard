<template>
  <section id="aarFCP-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">
        <a :href="proximaLink" class="color link" target="_blank">Atom Accelerator Race</a> FCP Rankings</h1>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body font-14">
          <el-col :xs="24" :sm="12" :md="24" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Name: </span>
              <el-input class="zk-input" v-model="networkInput.name" placeholder="please enter CP name" @chang="searchProvider" @input="searchProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkInput.contract_address" placeholder="please enter Contract Address" @chang="searchProvider" @input="searchProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkInput.contract_address && !networkInput.name  ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" :disabled="!networkInput.contract_address && !networkInput.name ? true:false" round @click="searchProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="providersData" empty-text="No Data" v-loading="providersTableLoad">
          <el-table-column type="index" width="80">
            <template #header>
              <div class="font-14 weight-4">Ranking</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <img v-if="scope.$index === 0 && pagin.pageNo <= 1" :src="badgeIcon01" alt="" class="img">
                <img v-else-if="scope.$index === 1 && pagin.pageNo <= 1" :src="badgeIcon02" alt="" class="img">
                <img v-else-if="scope.$index === 2 && pagin.pageNo <= 1" :src="badgeIcon03" alt="" class="img">
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
          <el-table-column prop="contract_address" min-width="160">
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
              <div class="font-14 weight-4">NodeID</div>
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
          <el-table-column prop="gpu_hours" min-width="80">
            <template #header>
              <div class="font-14 weight-4">GPU hours</div>
            </template>
          </el-table-column>
          <el-table-column prop="cpu_hours" min-width="80">
            <template #header>
              <div class="font-14 weight-4">CPU hours</div>
            </template>
          </el-table-column>
          <el-table-column prop="gpu_list" min-width="130">
            <template #header>
              <div class="font-14 weight-4">GPU</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <div class="flex flex-ai-center flex-jc-center machines-style">
                  <span v-for="(gpu, g) in scope.row.gpu_list" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="uptime" min-width="70">
            <template #header>
              <div class="font-14 weight-4">Uptime</div>
            </template>
            <template #default="scope">
              <div>
                {{unifyNumber(scope.row.uptime)}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="computer_provider.score" min-width="160">
            <template #header>
              <div class="font-14 weight-4">Contribution Score</div>
            </template>
          </el-table-column>
          <el-table-column prop="region" min-width="120">
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
          <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + providersData.length : 0 + providersData.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>

    <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
  </section>
</template>

<script setup lang="ts">
import vmDrawer from "@/components/vmDrawer.vue"
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

    const route = useRoute()
    const router = useRouter()
    import badgeIcon01 from "@/assets/images/icons/badge-1.png"
    import badgeIcon02 from "@/assets/images/icons/badge-2.png"
    import badgeIcon03 from "@/assets/images/icons/badge-3.png"
import { copyContent, debounce, hiddAddress, paginationWidth, unifyNumber } from "@/utils/common";
import { getOverviewData } from "@/api/overview";
import { proximaLink } from "@/utils/storage";
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const providersData = ref([])
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0,
      total_deployments: 0,
      active_applications: 0
    })
    const small = ref(false)
    const background = ref(false)
    const cpLoad = ref(false)
    const networkInput = reactive({
      contract_address: '',
      name: ''
    })
    const vmOperate = reactive({
      centerDrawerVisible: false,
      row: {}
    })

    function handleSizeChange (val) { }
    async function handleCurrentChange (currentPage) {
      pagin.pageNo = currentPage
      init()
    }
    async function init () {
      providersTableLoad.value = true
      try{
        const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
        const params = {
          limit: pagin.pageSize,
          offset: page * pagin.pageSize,
          search_string: networkInput.name
        }
        const providerRes = await getOverviewData(params)
        pagin.total = providerRes.data.list_providers_cnt || 0
        providersData.value = await getList(providerRes.data.providers)
      } catch { console.error}
      providersTableLoad.value = false
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
    const searchProvider = debounce(async function () {
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }, 700)
    function clearProvider () {
      networkInput.contract_address = ''
      networkInput.name = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }
    function reset (type) {
      pagin.total = 0
      pagin.total_deployments = 0
      pagin.active_applications = 0
      pagin.pageSize = 10
      pagin.pageNo = 1
      providersData.value = []
      providersLoad.value = false
      providersTableLoad.value = false
      networkInput.name = ''
      networkInput.contract_address = ''
      init()
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
      router.push({ name: 'accountInfo', params: { type: 'FCP' } })
    }
    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    onMounted(async () => {
      reset('init')
    })
  
</script>

<style lang="less" scoped>
#aarFCP-container {
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
