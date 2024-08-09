<template>
  <section id="aarFCP-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">
      FCP Rankings</h1>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body font-14">
          <el-col :xs="24" :sm="12" :md="24" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">CP Account Address: </span>
              <el-input class="zk-input" v-model="networkInput.contract_address" placeholder="please enter Contract Address" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkInput.contract_address ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" :disabled="!networkInput.contract_address ? true:false" round @click="searchProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>

        <el-table ref="singleTableRef" :data="providersData" @filter-change="handleFilterChange" @expand-change="expandV2Change" :row-key="getRowKeysV2" :expand-row-keys="expands" style="width: 100%" empty-text="No Data" v-loading="providersTableLoad">
          <el-table-column prop="cp_account_address" label="CP Account Address" min-width="140">
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <img v-if="scope.$index < 2 && pagin.pageNo <= 1" :src="badgeIcon01" alt="">
                <img v-else :src="badgeIcon02" alt="">
                <div class="flex flex-ai-center flex-jc-center copy-style">
                  <router-link :to="{ name: 'accountInfo', params: {cp_addr: scope.row.cp_account_address} }">{{hiddAddress(scope.row.cp_account_address)}}</router-link>
                  <svg @click="copyContent(scope.row.cp_account_address, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                    <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                      p-id="2310" fill="#b5b7c8"></path>
                    <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                    <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                  </svg>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="multiAddress" label="Name" min-width="120">
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <span v-for="address in scope.row.multiAddress" :key="address">{{address}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="country" label="Country" /> -->
          <el-table-column prop="active_deployment" label="Active deployment" min-width="130" />
          <!-- <el-table-column prop="score" label="Score" width="120" /> -->
          <el-table-column prop="gpu_list" label="GPU" min-width="140">
            <template #default="scope">
              <div class="badge">
                <div class="flex flex-ai-center flex-jc-center machines-style">
                  <span v-for="(gpu, g) in scope.row.gpu_list" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" min-width="100" v-if="networkInput.contract_address">
            <template #default="scope">
              <div>
                {{scope.row.online ? 'Active' : 'Inactive'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" min-width="100" v-else
            column-key="status" filterable :filters="[
              { text: 'Active', value: '1' },
              { text: 'Inactive', value: '0' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
            <template #default="scope">
              <div>
                {{scope.row.online ? 'Active' : 'Inactive'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="Region" min-width="110" />
          <el-table-column prop="uptime" label="Uptime" min-width="110" >
            <template #default="scope">
              <div v-if="scope.row.uptime === null">Waiting for calculation</div>
              <div v-else>
                {{unifyNumber(scope.row.uptime)}}%
              </div>
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
  </section>
</template>

<script setup lang="ts">
import {
  Search
} from '@element-plus/icons-vue'
import badgeIcon01 from "@/assets/images/icons/badge-1.png"
import badgeIcon02 from "@/assets/images/icons/badge-2.png"
import badgeIcon03 from "@/assets/images/icons/badge-3.png"
import { copyContent, debounce, hiddAddress, paginationWidth, unifyNumber } from "@/utils/common";
import { getCPlistData, searchCPData } from "@/api/overview";

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
const networkInput = reactive({
  contract_address: '',
  name: ''
})
const paramsFilter = reactive({
  data: {
    online: 0,
    total: 1
  }
})
const expands = ref([])

function handleSizeChange (val) {
  pagin.pageSize = val
  pagin.pageNo = 1
  init()
}
async function handleCurrentChange (currentPage) {
  pagin.pageNo = currentPage
  init()
}
async function init () {
  providersTableLoad.value = true
  providersData.value = []
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let params = networkInput.contract_address ? {
      cp_account_address: networkInput.contract_address
    } : {
        limit: pagin.pageSize,
        offset: page * pagin.pageSize
    }
    if(!networkInput.contract_address) params = Object.assign({}, params, paramsFilter.data)
    const providerRes = networkInput.contract_address ? await searchCPData(params) : await getCPlistData(params)
    console.log(providerRes)
    pagin.total = providerRes?.data?.list_providers_cnt ?? 0
    providersData.value = await getList(networkInput.contract_address ? providerRes?.data?.provider : providerRes?.data?.providers)
    if (networkInput.contract_address) singleTableRef.value?.clearFilter?.()
  } catch { console.error }
  providersTableLoad.value = false
}
const handleFilterChange = (filters) => {
  for (const key in filters) {
    if (key === 'status') {
      const result = filters.status[0] ?? ''
      if (result === '') paramsFilter.data.total = 1
      else {
        paramsFilter.data.online = result
        paramsFilter.data.total = 0
      }
    }
  }
  handleCurrentChange(1, 1)
}
function expandV2Change (row, expandedRows) {
  // console.log(row, expandedRows)
  if (expandedRows.length) {
    expands.value = [];
    if (row) expands.value.push(row.cp_account_address);
  } else expands.value = [];
}
let getRowKeysV2 = (row) => {
  return row.cp_account_address;
}
async function getList (list) {
  let l = Array.isArray(list) ? list : [list]
  l.forEach((element) => {
    element.gpu_list = []
    element.multiAddress = []
    try {
      const n = element.name || element.multi_address
      n.forEach(n => {
        const ip = n.split('/')
        const address = `${ip[2]}:${ip[4]}`
        element.multiAddress.push(address)
      })
    } catch{
      element.multiAddress.push(element.name)
    }
    try {
      element.machines = element.machines || element.computer_provider ?.machines || []
      element.machines.forEach((machines) => {
        if (machines.specs.gpu.details && machines.specs.gpu.details.length > 0) {
          machines.specs.gpu.details.forEach((gpu) => {
            if (element.gpu_list.indexOf(gpu.product_name) < 0) element.gpu_list.push(gpu.product_name)
            // const field = 'name';
            // const containsValue = element.gpu_list.some(item => item[field].includes(gpu.product_name));
            // if (!containsValue) element.gpu_list.push({
            //   name: gpu.product_name,
            //   status: gpu.status
            // })
          })
        }
      })
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
  networkInput.contract_address = ''
  init()
}
onMounted(async () => {
  reset('init')
})
</script>

<style lang="less" scoped>
@import url('../../assets/style/table.less');

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
