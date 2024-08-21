<template>
  <section id="rankingECP-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">Edge Computing Provider List</h1>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkZK.contract_address" @input="clearChangeProvider()" placeholder="please enter Contract Address" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Name: </span>
              <el-input class="zk-input" v-model="networkZK.owner_addr" @input="clearChangeProvider()" placeholder="please enter CP name" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="7">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">NodeID: </span>
              <el-input class="zk-input" v-model="networkZK.node_id" @input="clearChangeProvider()" placeholder="please enter NodeID" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="3" :xl="3">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" round @click="searchZKProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="providerBody" style="width: 100%" empty-text="No Data" v-loading="providersECPLoad" @filter-change="handleFilterChange">
          <el-table-column type="index" min-width="40">
            <template #header>
              <div class="font-14 weight-4">Rank</div>
            </template>
            <template #default="scope">
              {{ paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + scope.$index + 1 : scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="addr" min-width="140">
            <template #header>
              <div class="font-14 weight-4">Contract Address</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style">
                <span class="name-style w" @click="handleSelect(scope.row.addr)">{{hiddAddress(scope.row.addr)}}</span>
                <svg class="icon" @click="copyContent(scope.row.addr, 'Copied')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" min-width="120">
            <template #header>
              <div class="font-14 weight-4">Name</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" v-if="scope.row.name" @click="copyContent(scope.row.name, 'Copied')">
                <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.name">
                  <template #reference>
                    <div>{{hiddAddress(scope.row.name)}}</div>
                  </template>
                </el-popover>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="node_id" min-width="130">
            <template #header>
              <div class="font-14 weight-4">nodeID</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" v-if="scope.row.node_id" @click="copyContent(scope.row.node_id, 'Copied')">
                {{hiddAddress(scope.row.node_id)}}
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="gpus" min-width="140">
            <template #header>
              <div class="font-14 weight-4">GPU</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <div class="flex flex-ai-center flex-jc-center machines-style font-13">
                  <span v-for="(gpu, g) in scope.row.gpus" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" column-key="status" filterable :filters="[
              { text: 'Inactive', value: 'Inactive' },
              { text: 'Offline', value: 'Offline' },
              { text: 'Online', value: 'Online' },
              { text: 'Inconsistent', value: 'Inconsistent' },
              { text: 'NSC', value: 'NSC' },
              { text: 'NSR', value: 'NSR' },
              { text: 'Declined', value: 'Declined' },
              { text: 'Suspended', value: 'Suspended' }]" filter-placement="bottom-end" :filter-multiple="false" min-width="90">
            <template #header>
              <div class="font-14 weight-4">status</div>
            </template>
          </el-table-column>
          <el-table-column prop="region" column-key="region" filterable :filters="regionFilters" filter-placement="bottom-end" :filter-multiple="false" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Region</div>
            </template>
            <template #default="scope">
              <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.region">
                <template #reference>
                  <div class="name-style black">{{scope.row.region ?? '-'}}</div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="uptime" min-width="140">
            <template #header>
              <div class="font-14 weight-4">Task Completion Rate</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                <el-progress :percentage="Number(unifyNumber(scope.row.complete_rate/10000))" color="#1890ff" :stroke-width="8" />
                <span class="uptime-text text-right task">{{ unifyNumber(scope.row.complete_rate/10000) }}%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="uptime" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Total Task</div>
            </template>
            <template #default="scope">
                <span class="uptime-text text-right task">{{replaceFormat(scope.row.tasks)}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="flex flex-ai-center flex-jc-center pagination-style">
          <span class="showing">Showing {{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + 1 : 0 }}-{{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + providerBody.length : 0 + providerBody.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="paginZK.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="paginZK.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="paginZK.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsECPListData, statsOverviewData } from "@/api/overview";
import { EStorage } from "@/constant/storage";
import { copyContent, debounce, hiddAddress, paginationWidth, replaceFormat, unifyNumber } from "@/utils/common";
import { getLocation, setLocation } from "@/utils/storage";
import {
  Search
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const providersECPLoad = ref(false)
const providerBody = ref([])
const paginZK = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})
const small = ref(false)
const background = ref(false)
const networkZK = reactive({
  contract_address: '',
  owner_addr: '',
  node_id: '',
  searchFor: false
})
const paramsFilter = reactive({
  data: {
    status: '',
    region: ''
  }
})
const regionFilters = ref<any>([])

const handleFilterChange = (filters: any) => {
  for (const key in filters) {
    if (key === 'status') {
      const result = filters.status[0] ?? ''
      paramsFilter.data.status = result
    } else if (key === 'region') {
      const result = filters.region[0] ?? ''
      paramsFilter.data.region = result
    }
  }
  handleZKCurrentChange(1)
}
function handleSizeChange (val: number) {
  paginZK.pageSize = val
  paginZK.pageNo = 1
  getUBITable()
}
async function handleZKCurrentChange (currentPage: number) {
  paginZK.pageNo = currentPage
  getUBITable()
}
async function getUBITable () {
  providersECPLoad.value = true
  try{
    const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
    const paramsCont = {
      "page_no": page,
      "page_size": paginZK.pageSize,
      "addr": networkZK.contract_address,
      "name": networkZK.owner_addr,
      "node_id": networkZK.node_id,
      "region": paramsFilter.data.region,
      "status": paramsFilter.data.status
    }
    const providerECPRes = await getCPsECPListData(paramsCont)
    providerBody.value = providerECPRes?.data?.list ?? []
    paginZK.total = providerECPRes?.data?.total ?? 0
  } catch { console.error }
  providersECPLoad.value = false
}
const searchZKProvider = async function () {
  networkZK.searchFor = !networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id ? false : true
  handleZKCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkZK.searchFor) return
  if (!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id) {
    handleZKCurrentChange(1)
    networkZK.searchFor = false
  }
}, 700)
function clearProvider () {
  networkZK.owner_addr = ''
  networkZK.contract_address = ''
  networkZK.node_id = ''
  if(networkZK.searchFor) handleZKCurrentChange(1)
  networkZK.searchFor = false
}
async function handleSelect (type:string) {
  router.push({ name: 'accountInfo', params: { cp_addr: type } })
}
async function getLocationList () {
  try{
    providersECPLoad.value = true
    const overviewRes = await statsOverviewData()
    const location = overviewRes?.data?.location ?? []
    setLocation(location)
    regionList(JSON.stringify(location))
  }catch{providersECPLoad.value = false}
}
function regionList(data: any) {
  const location = JSON.parse(data)
  location.map((item: any) => {
    regionFilters.value.push({
      text: item.name ?? '',
      value: item.name ?? ''
    })
  })
  getUBITable()
}
async function init() {
  let l = await getLocation()
  if (l.toString() === '[]' || l.toString() === '') getLocationList()
  else regionList(l)
}
onMounted(() => init())
</script>

<style lang="less" scoped>
#rankingECP-container {
  padding: 0 0 0.2rem;
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
        margin: 0 0 0.17rem;
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
