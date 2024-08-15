<template>
  <section>
    <el-row class="search-container font-14">
      <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
        <div class="flex flex-ai-center nowrap child">
          <span class="font-14">Task Contract: </span>
          <el-input class="zk-input" v-model="networkZK.contract_address" placeholder="please enter Task Contract" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
        <div class="flex flex-ai-center nowrap child">
          <el-button type="info" :disabled="!networkZK.contract_address ? true:false" round @click="clearProvider">Clear</el-button>
          <el-button type="primary" :disabled="!networkZK.contract_address ? true:false" round @click="searchZKProvider">
            <el-icon>
              <Search />
            </el-icon>
            Search
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" v-loading="dataLoad">
      <el-table-column prop="addr" label="Task Contract">
        <template #default="scope">
          <a :href="`${explorerLink}address/${scope.row.addr}`" target="_blank" class="name-style font-14">{{scope.row.addr}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="blob_cid" label="Blob CID">
        <template #default="scope">
          <div class="flex flex-ai-center flex-jc-center pointer name-style" @click="openPage(`${scope.row.gateway}/ipfs/${scope.row.blob_cid}`)">
            {{ scope.row.blob_cid }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="payload_cid" label="Payload CID">
        <template #default="scope">
          <div class="flex flex-ai-center flex-jc-center pointer name-style" @click="openPage(`${scope.row.gateway}${scope.row.payload_url}`)">
            {{ scope.row.payload_cid }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-ai-center flex-jc-center pagination-style">
      <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + tableData.length : 0 + tableData.length }} /&nbsp;</span>
      <!-- hide-on-single-page -->
      <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
        :total="pagin.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsSequencesData } from '@/api/cp-profile';
import { openPage } from '@/hooks/router';
import { paginationWidth } from '@/utils/common';
import { explorerLink } from '@/utils/storage';

const route = useRoute()
const dataLoad = ref(false)
const tableData = ref<any>([])
const networkZK = reactive({
  contract_address: ''
})
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})

function clearProvider() {}
function searchZKProvider() { }
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
