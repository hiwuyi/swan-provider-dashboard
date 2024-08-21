<template>
  <section id="rankingFCP-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">Fog Computing Provider List</h1>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkInput.contract_address" @input="clearChangeProvider()" placeholder="please enter Contract Address" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Name: </span>
              <el-input class="zk-input" v-model="networkInput.owner_addr" @input="clearChangeProvider()" placeholder="please enter CP name" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="7">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">NodeID: </span>
              <el-input class="zk-input" v-model="networkInput.node_id" @input="clearChangeProvider()" placeholder="please enter NodeID" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="3" :xl="3">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" round @click="searchProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="providersData" empty-text="No Data" v-loading="providersTableLoad" @sort-change="handleSortChange" @filter-change="handleFilterChange">
          <el-table-column type="index" min-width="40">
            <template #header>
              <div class="font-14 weight-4">Rank</div>
            </template>
            <template #default="scope">
              {{ pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + scope.$index + 1 : scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="addr" min-width="140">
            <template #header>
              <div class="font-14 weight-4">Contract Address</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
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
              <div class="font-14 weight-4">NodeID</div>
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
          <el-table-column prop="deployments" sortable="custom" min-width="130">
            <template #header>
              <div class="font-14 weight-4">Active Deployments</div>
            </template>
            <template #default="scope">
              <div>{{ replaceFormat(scope.row.active_deployments) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="score" sortable="custom" min-width="80">
            <template #header>
              <div class="font-14 weight-4">Score</div>
            </template>
            <template #default="scope">
              <div>{{ replaceFormat(scope.row.score) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="gpu_list" min-width="140">
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
          <el-table-column prop="region" min-width="100" column-key="region" filterable :filters="regionFilters" filter-placement="bottom-end" :filter-multiple="false">
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
          <el-table-column prop="uptime" min-width="150">
            <template #header>
              <div class="font-14 weight-4">Uptime</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                <el-progress :percentage="Number(unifyNumber(scope.row.uptime/10000))" color="#1890ff" :stroke-width="8" />
                <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime/10000)}}%</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex-ai-center flex-jc-center pagination-style">
          <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize+1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + providersData.length : 0 + providersData.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsFCPListData, statsOverviewData } from "@/api/overview";
import { copyContent, debounce, hiddAddress, paginationWidth, replaceFormat, unifyNumber } from "@/utils/common";
import { getLocation, setLocation } from "@/utils/storage";
import {
  Search
} from '@element-plus/icons-vue'

const router = useRouter()
const providersTableLoad = ref(false)
const providersData = ref([])
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0,
  total_deployments: 0,
  active_applications: 0
})
const small = ref(false)
const background = ref(false)
const networkInput = reactive({
  contract_address: '',
  owner_addr: '',
  node_id: '',
  order: '',
  desc: false,
  region: '',
  searchFor: false
})
const regionFilters = ref<any>([])

const handleFilterChange = (filters: any) => {
  for (const key in filters) {
    if (key === 'region') {
      const result = filters.region[0] ?? ''
      networkInput.region = result
    }
  }
  handleCurrentChange(1)
}
function handleSortChange({ prop, order }) {
  // const sortOrder = { prop, order };
  networkInput.order = prop
  networkInput.desc = order === 'descending' ? true : false
  init()
}
function handleSizeChange(val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  init()
}
async function handleCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  init()
}
async function init() {
  providersTableLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    const paramsCont = {
      "page_no": page,
      "page_size": pagin.pageSize,
      "addr": networkInput.contract_address,
      "name": networkInput.owner_addr,
      "node_id": networkInput.node_id,
      "order": networkInput.order,
      "desc": networkInput.desc,
      "region": networkInput.region
    }
    const providerFCPRes = await getCPsFCPListData(paramsCont)
    providersData.value = providerFCPRes?.data?.list ?? []
    pagin.total = providerFCPRes?.data?.total ?? 0
  }catch{console.error}
  providersTableLoad.value = false
}
const searchProvider = async function () {
  networkInput.searchFor = !networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id ? false : true
  handleCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkInput.searchFor) return
  if (!networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id) {
    handleCurrentChange(1)
    networkInput.searchFor = false
  }
}, 700)
function clearProvider () {
  networkInput.contract_address = ''
  networkInput.owner_addr = ''
  networkInput.node_id = ''
  if (networkInput.searchFor) handleCurrentChange(1)
  networkInput.searchFor = false
}
async function handleSelect (type: string) {
  router.push({ name: 'accountInfo', params: { cp_addr: type } })
}
async function getLocationList () {
  try{
    providersTableLoad.value = true
    const overviewRes = await statsOverviewData()
    const location = overviewRes?.data?.location ?? []
    setLocation(location)
    regionList(JSON.stringify(location))
  }catch{providersTableLoad.value = false}
}
function regionList(data: any) {
  const location = JSON.parse(data)
  location.map((item: any) => {
    regionFilters.value.push({
      text: item.name ?? '',
      value: item.name ?? ''
    })
  })
  init()
}
async function getData() {
  let l = await getLocation()
  if (l.toString() === '[]' || l.toString() === '') getLocationList()
  else regionList(l)
}
onMounted(() => getData())
</script>

<style lang="less" scoped>
#rankingFCP-container {
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
