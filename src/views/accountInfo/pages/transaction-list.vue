<template>
  <section>
    <el-row class="search-container font-14" justify="space-between">
      <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
        <div class="flex flex-ai-center nowrap child mb-16">
          <span class="font-14">Total: {{pagin.total}} Transactions</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
        <div class="flex flex-ai-center flex-jc-right nowrap child mb-16">
          <el-select v-model="searchList.value" placeholder="Select" size="small" @change="handleZKCurrentChange(1)">
            <el-option v-for="item in searchList.options" :key="item" :label="item" :value="item">
              <div class="flex flex-ai-center font-12">{{item}}</div>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" v-loading="dataLoad">
      <el-table-column prop="hash" label="Transaction Hash">
        <template #default="scope">
          <a :href="`${explorerLink}tx/${scope.row.hash}`" target="_blank" class="name-style font-14">{{hiddAddress(scope.row.hash)}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Height">
        <template #default="scope">
          <span>{{scope.row.height ?? '-'}}</span>
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
            <a :href="`${explorerLink}address/${scope.row.from}`" target="_blank" class="name-style w font-14">{{hiddAddress(scope.row.from)}}</a>
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
            <a :href="`${explorerLink}address/${scope.row.to}`" target="_blank" class="name-style w font-14">{{hiddAddress(scope.row.to)}}</a>
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
      <el-table-column prop="method" label="Method">
        <template #default="scope">
          <span :class="`${scope.row.method?'method-style':''}`">
            {{ scope.row.method }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="Value">
        <template #default="scope">
          <span>
            {{ scope.row.value }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Status">
        <template #default="scope">
          <span v-if="scope.row.status === 1">OK</span>
          <span v-else>Failed</span>
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
import { getCPsTxnsData } from '@/api/cp-profile';
import { openPage } from '@/hooks/router';
import { copyContent, hiddAddress, momentFun, paginationWidth } from '@/utils/common';
import { explorerLink } from '@/utils/storage';

const route = useRoute()
const dataLoad = ref(false)
const tableData = ref<any>([])
const searchList = reactive({
  value: 'All',
  options: ['All']
})
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})

function compact(array: any) {
  if (!array) return []
  return array.filter(function(item: any, index: number) {
    return item !== null && item !== undefined && item !== ''
  });
}
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
  dataLoad.value = true
  try {
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let params = {
      page_size: pagin.pageSize,
      page_no: page,
      method: searchList.value === 'All' ? '' : searchList.value
    }
    const dataRes = await getCPsTxnsData(params, route.params.cp_addr)
    tableData.value = dataRes?.data?.list ?? []
    pagin.total = dataRes?.data?.total ?? 0
    const method = compact(dataRes?.data?.methods)
    searchList.options = ['All'].concat(method)
    searchList.options = searchList.options.filter((item, index) => searchList.options.indexOf(item) === index);
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
watch(() => props.watchRoute, () => {
  searchList.value = 'All'
  getAllData()
})
</script>

<style scoped lang="less">
.child {
  height: 100%;
  span {
    white-space: nowrap;
  }
  :deep(.el-select) {
    max-width: 240px;
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
