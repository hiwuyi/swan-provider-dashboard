<template>
  <section>
    <el-row class="search-container font-14">
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="9">
        <div class="flex flex-ai-center nowrap child mb-16">
          <span class="font-14">Task Contract: </span>
          <el-input class="zk-input" v-model="networkZK.contract_address" @input="clearChangeProvider()" placeholder="please enter Task Contract" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="4">
        <div class="flex flex-ai-center nowrap child mb-16">
          <el-button type="info" :disabled="!networkZK.contract_address ? true:false" round @click="clearProvider">Clear</el-button>
          <el-button type="primary" round @click="searchProvider">
            <el-icon>
              <Search />
            </el-icon>
            Search
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" v-loading="dataLoad">
      <el-table-column prop="tx_hash" label="Transaction Hash">
        <template #default="scope">
          <div v-if="scope.row.tx_hash" class="font-14 pointer" @click="openPage(`${explorerLink}tx/${scope.row.tx_hash}`)">{{hiddAddress(scope.row.tx_hash)}}</div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="addr" label="Task Contract">
        <template #default="scope">
          <a v-if="scope.row.addr" :href="`${explorerLink}address/${scope.row.addr}`" target="_blank" class="name-style font-14">{{hiddAddress(scope.row.addr)}}</a>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" label="Time">
        <template #default="scope">
          <span>
            {{ momentFun(scope.row.timestamp) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="from" label="From">
        <template #default="scope">
          <div class="flex flex-ai-center flex-jc-center nowrap copy-style" v-if="scope.row.from">
            <div @click="openPage(`${explorerLink}address/${scope.row.from}`)" class="w font-14">{{hiddAddress(scope.row.from)}}</div>
            <svg @click="copyContent(scope.row.from, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
              <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                fill="#3d3d3d" p-id="6468"></path>
              <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                fill="#3d3d3d" p-id="6469"></path>
            </svg>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="to" label="To">
        <template #default="scope">
          <span>
          <div class="flex flex-ai-center flex-jc-center nowrap copy-style" v-if="scope.row.to">
            <div @click="openPage(`${explorerLink}address/${scope.row.to}`)" class="w font-14">{{hiddAddress(scope.row.to)}}</div>
            <svg @click="copyContent(scope.row.to, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
              <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                fill="#3d3d3d" p-id="6468"></path>
              <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                fill="#3d3d3d" p-id="6469"></path>
            </svg>
          </div>
          <span v-else>-</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="blob_cid" label="Blob CID">
        <template #default="scope">
          <div class="font-14 pointer" @click="openPage(`${scope.row.gateway}/ipfs/${scope.row.blob_cid}`)">{{hiddAddress(scope.row.blob_cid)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payload_cid" label="Payload CID">
        <template #default="scope">
          <div class="font-14 pointer" @click="openPage(`${scope.row.gateway}${scope.row.payload_url}`)">{{hiddAddress(scope.row.payload_cid)}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-ai-center flex-jc-center pagination-style">
      <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + 1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + tableData.length : 0 + tableData.length }} /&nbsp;</span>
      <!-- hide-on-single-page -->
      <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
        :total="pagin.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsSequencesData } from '@/api/cp-profile';
import { openPage } from '@/hooks/router';
import { copyContent, debounce, hiddAddress, momentFun, paginationWidth } from '@/utils/common';
import { explorerLink } from '@/utils/storage';

const route = useRoute()
const dataLoad = ref(false)
const tableData = ref<any>([])
const networkZK = reactive({
  contract_address: '',
  searchFor: false
})
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})

const searchProvider = async function () {
  networkZK.searchFor = !networkZK.contract_address ? false : true
  handleZKCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkZK.searchFor) return
  if (!networkZK.contract_address) {
    handleZKCurrentChange(1)
    networkZK.searchFor = false
  }
}, 700)
function clearProvider() {
  networkZK.contract_address = ''
  if(networkZK.searchFor) handleZKCurrentChange(1)
  networkZK.searchFor = false
}
function handleSizeChange (val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  getAllData()
}
function handleZKCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  getAllData()
}
async function getAllData() {
  dataLoad.value = true
  try {
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let params = {
      page_size: pagin.pageSize,
      page_no: page,
      addr: networkZK.contract_address
    }
    const dataRes = await getCPsSequencesData(params, route.params.cp_addr)
    tableData.value = dataRes?.data?.list ?? []
    pagin.total = dataRes?.data?.total ?? 0
  } catch{console.error}
  dataLoad.value = false
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

<style scoped lang="less">
.child {
  height: 100%;
  span {
    white-space: nowrap;
  }
}
:deep(.el-input) {
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
</style>
