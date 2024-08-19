<template>
  <div id="payment">
    <div class="payment-history container-landing font-14">
      <el-row class="search-container font-14">
        <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
          <div class="flex flex-ai-center nowrap child mb-16">
            <span class="font-14">Task ID: </span>
            <el-input class="zk-input" v-model="networkZK.owner_addr" @input="clearChangeProvider()" placeholder="please enter Task ID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
          <div class="flex flex-ai-center nowrap child mb-16">
            <el-button type="info" :disabled="!networkZK.owner_addr ? true:false" round @click="clearProvider">Clear</el-button>
            <el-button type="primary" round @click="searchProvider">
              <el-icon>
                <Search />
              </el-icon>
              Search
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-table v-loading="paymentLoad" ref="tableRef" :data="paymentData" stripe style="width: 100%">
        <el-table-column prop="id" width="90">
          <template #header>
            <div class="font-14 weight-4">Task ID</div>
          </template>
        </el-table-column>
        <!-- column-key="resource_type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false" -->
        <el-table-column prop="resource_type" min-width="90">
          <template #header>
            <div class="font-14 weight-4">Resource Type</div>
          </template>
          <template #default="scope">
            <span>{{scope.row.resource_type === 0 ? 'CPU' : 'GPU'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addr" min-width="125">
          <template #header>
            <div class="font-14 weight-4">Task Contract</div>
          </template>
          <template #default="scope">
            <a v-if="scope.row.addr" :href="`${explorerLink}address/${scope.row.addr}`" target="_blank" class="name-style font-14">{{hiddAddress(scope.row.addr)}}</a>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- column-key="type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false" -->
        <el-table-column prop="type" min-width="90">
          <template #header>
            <div class="font-14 weight-4">Task Type</div>
          </template>
          <template #default="scope">
            <span v-if="scope.row.type === 1">fil-c2-512M</span>
            <span v-else-if="scope.row.type === 2">ALEO</span>
            <span v-else-if="scope.row.type === 3">AI</span>
            <span v-else>fil-c2-32G</span>
          </template>
        </el-table-column>
        <!-- sortable -->
        <el-table-column prop="started_at" min-width="135">
          <template #header>
            <div class="font-14 weight-4">Start Time</div>
          </template>
          <template #default="scope">
            <span>{{momentFun(scope.row.started_at)}}</span>
          </template>
        </el-table-column>
        <!-- sortable -->
        <el-table-column prop="ended_at" min-width="135">
          <template #header>
            <div class="font-14 weight-4">End Time</div>
          </template>
          <template #default="scope">
            <span>{{momentFun(scope.row.ended_at)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reward">
          <template #header>
            <div class="font-14 weight-4">reward</div>
          </template>
          <template #default="scope">
            <span>
              {{ replaceFormat(scope.row.reward) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex-ai-center flex-jc-center pagination-style">
        <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + 1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + paymentData.length : 0 + paymentData.length }} /&nbsp;</span>
        <!-- hide-on-single-page -->
        <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
          :total="pagin.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getCPsZKProofData } from '@/api/cp-profile';
import { debounce, hiddAddress, momentFun, paginationWidth, replaceFormat } from '@/utils/common';
import { explorerLink } from '@/utils/storage';
import {
  Search
} from '@element-plus/icons-vue'

const route = useRoute()
const paymentData = ref([])
const paymentLoad = ref(false)
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})
const networkZK = reactive({
  contract_address: '',
  owner_addr: '',
  node_id: '',
  searchFor: false
})
const small = ref(false)
const background = ref(false)
const tableRef = ref(null)

function handleSizeChange(val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  getAllData()
}
async function handleZKCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  getAllData()
}
async function getAllData() {
  paymentLoad.value = true
  try {
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let params = {
      page_size: pagin.pageSize,
      page_no: page,
      id: networkZK.owner_addr
    }
    const dataRes = await getCPsZKProofData(params, route.params.cp_addr)
    paymentData.value = dataRes?.data?.list ?? []
    pagin.total = dataRes?.data?.total ?? 0
  } catch{console.error}
  paymentLoad.value = false
}
const searchProvider = async function () {
  networkZK.searchFor = !networkZK.owner_addr ? false : true
  handleZKCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkZK.searchFor) return
  if (!networkZK.owner_addr) {
    handleZKCurrentChange(1)
    networkZK.searchFor = false
  }
}, 700)
function clearProvider() {
  networkZK.owner_addr = ''
  if(networkZK.searchFor) handleZKCurrentChange(1)
  networkZK.searchFor = false
}
onMounted(() => {
  getAllData()
})

const props = withDefaults(
  defineProps<{
    watchRoute?: boolean
  }>(),
  {
    watchRoute: false
  }
)
watch(() => props.watchRoute, () => getAllData())
</script>
<style  lang="less" scoped>
#payment {
  width: 100%;
  :deep(.payment-history) {
    height: calc(100% - 1.2rem);
    margin: 0 auto;
    box-sizing: border-box;
    word-break: break-word;
    text-align: left;
    .title {
      margin: 0 0 0.2rem;
      font-weight: bold;
      font-size: 0.24rem;
      color: var(--color-light);
      text-transform: capitalize;
    }
    .search-container {
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 30px;
      margin: 0;
      .el-select {
        width: auto;
        margin: 0 0.3rem 0 0;
        font-size: inherit;
        .el-tooltip__trigger {
          margin: 0;
          width: auto;
          height: auto;
          padding: 0.06rem 0.22rem;
          font-size: inherit;
          font-family: inherit;
          border: 1px solid #b6c0d1;
          border-radius: 0.07rem;
          box-shadow: none;
          .el-select__selected-item {
            position: relative;
            top: auto;
            margin: 0 0.16rem 0 0;
            transform: translateY(0px);
            line-height: 1.2;
            color: var(--color-primary);
            &.is-hidden {
              display: none;
            }
          }
          .el-select__suffix {
            .el-select__icon {
              background: url(../../../assets/images/icons/icon-03.png) no-repeat
                center;
              background-size: 100%;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .child {
        height: 100%;
        span {
          white-space: nowrap;
        }
      }
      .el-input {
        width: 100%;
        // max-width: 250px;
        // min-width: 150px;
        margin: 0 0.16rem 0 0.1rem;
        font-size: inherit;
        .el-input__wrapper {
          background-color: var(--color-light);
          border: 1px solid var(--color-border);
          border-radius: 0.08rem;
          box-shadow: none;
          .el-input__inner {
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            color: #333;
            @media screen and (max-width: 768px) {
              width: 100%;
            }
            &:hover,
            &:active,
            &:focus {
              border-color: var(--color-primary);
            }
          }
        }
      }
      .el-button {
        height: 0.3rem;
        padding: 0 0.1rem;
        font-family: inherit;
        font-size: inherit;
        border: 0;
        line-height: 0.3rem;
        .el-icon {
          width: 0.2rem;
          height: 0.2rem;
          margin: 0 0.08rem 0 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
        &.el-button--info {
          background-color: #d0dcf9;
          border-color: #d0dcf9;
          color: var(--color-primary);
        }
        &:hover,
        &.is-disabled {
          opacity: 0.9;
        }
      }
    }
    .el-table {
      tr {
        td {
          .cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding: 0 6px;
            a {
              width: 100%;
              display: block;
              font-size: inherit;
              // color: inherit;
              &:hover {
                // text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>