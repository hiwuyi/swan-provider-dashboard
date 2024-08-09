<template>
  <div id="payment">
    <div class="payment-history container-landing font-14">
      <el-row class="search-container font-14">
        <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
          <div class="flex flex-ai-center nowrap child">
            <span class="font-14">Task ID: </span>
            <el-input class="zk-input" v-model="networkZK.owner_addr" placeholder="please enter Task ID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
          <div class="flex flex-ai-center nowrap child">
            <span class="font-14">NodeID: </span>
            <el-input class="zk-input" v-model="networkZK.node_id" placeholder="please enter NodeID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
          <div class="flex flex-ai-center nowrap child">
            <el-button type="info" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
            <el-button type="primary" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id ? true:false" round @click="searchZKProvider">
              <el-icon>
                <Search />
              </el-icon>
              Search
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-table v-loading="paymentLoad" ref="tableRef" :data="paymentData" stripe style="width: 100%">
        <el-table-column prop="task_id" width="90">
          <template #header>
            <div class="font-14 weight-4">Task ID</div>
          </template>
        </el-table-column>
        <el-table-column prop="task_contract" min-width="125">
          <template #header>
            <div class="font-14 weight-4">Task Contract</div>
          </template>
          <template #default="scope">
            <div class="flex flex-ai-center flex-jc-center copy-style">
              {{hiddAddress(scope.row.task_contract)}}
              <svg @click="copyContent(scope.row.task_contract, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                  fill="#3d3d3d" p-id="6468"></path>
                <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                  fill="#3d3d3d" p-id="6469"></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" column-key="type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false" min-width="90">
          <template #header>
            <div class="font-14 weight-4">Task Type</div>
          </template>
          <template #default="scope">
            <span>{{scope.row.type === 0 ? 'CPU': 'GPU'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="node_id" min-width="120">
          <template #header>
            <div class="font-14 weight-4">NODE ID</div>
          </template>
          <template #default="scope">
            <div class="flex flex-ai-center flex-jc-center copy-style">
              {{hiddAddress(scope.row.node_id)}}
              <svg @click="copyContent(scope.row.node_id, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                  fill="#3d3d3d" p-id="6468"></path>
                <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                  fill="#3d3d3d" p-id="6469"></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zk_type" min-width="110" column-key="zk_type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false">
          <template #header>
            <div class="font-14 weight-4">ZK Type</div>
          </template>
        </el-table-column>
        <el-table-column prop="started_at" min-width="135" sortable>
          <template #header>
            <div class="font-14 weight-4">Start Time</div>
          </template>
          <template #default="scope">
            <span>{{momentFun(scope.row.started_at)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ended_at" min-width="135" sortable>
          <template #header>
            <div class="font-14 weight-4">End Time</div>
          </template>
          <template #default="scope">
            <span>{{momentFun(scope.row.ended_at)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tx_hash" min-width="120">
          <template #header>
            <div class="font-14 weight-4">Reward TX Hash</div>
          </template>
          <template #default="scope">
            <!-- <a :href="`${scope.row.url_tx}${scope.row.tx_hash}`" target="_blank" class="name-style font-14">{{scope.row.tx_hash}}</a> -->
            <a target="_blank" class="name-style font-14"></a>
          </template>
        </el-table-column>
        <el-table-column prop="amount">
          <template #header>
            <div class="font-14 weight-4">reward</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex-ai-center flex-jc-center pagination-style">
        <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + paymentData.length : 0 + paymentData.length }} /&nbsp;</span>
        <!-- hide-on-single-page -->
        <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
          :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { copyContent, debounce, getUnit, hiddAddress, momentFun, paginationWidth } from '@/utils/common';
import { metaAddress } from '@/utils/storage';
import {
  Search
} from '@element-plus/icons-vue'

    const route = useRoute()
    const router = useRouter()
    const paymentData = ref([])
    const paymentLoad = ref(false)
    const prevType = ref(true)
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0
    })
    const networkZK = reactive({
      contract_address: '',
      owner_addr: '',
      node_id: ''
    })
    const small = ref(false)
    const background = ref(false)
    const tableRef = ref(null)

    async function handleSizeChange (val) {
      // console.log('handleSizeChange:', val)
    }
    async function handleCurrentChange (currentPage) {
      // console.log('handleCurrentChange:', currentPage)
      pagin.pageNo = currentPage
      init()
    }
    async function init (params) {
      paymentLoad.value = true
      const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
      const paramsCont = {
        "owner_addr": metaAddress.value,
        // "owner_addr": '0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373',
        "page_no": page,
        "page_size": pagin.pageSize
      }
      const paymentsRes = {
        "code": 0,
        "msg": "success",
        "data": {
          "total": 0,
          "list": []
        }
      }


      if (paymentsRes && paymentsRes.code === 0) {
        for (let p = 0; p < paymentsRes.data.list.length; p++) {
          let { url_tx } = await getUnit(parseInt(paymentsRes.data.list[p].chain_id), 16)
          paymentsRes.data.list[p].url_tx = url_tx
          const amount = Number(paymentsRes.data.list[p].amount).toFixed(2)
          paymentsRes.data.list[p].amount = amount
        }
        pagin.total = paymentsRes.data.total
        paymentData.value = paymentsRes.data.list || []

        nextTick(() => {
          tableRef.value.doLayout();
        });
      } else {
        pagin.total = 0
        paymentData.value = []
      }
      paymentLoad.value = false
    }
    const searchZKProvider = debounce(async function () {
      pagin.pageNo = 1
      getUBITable()
    }, 700)
    function clearProvider () {
      networkZK.contract_address = ''
      networkZK.owner_addr = ''
      networkZK.node_id = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      // init()
    }
    onMounted(async () => init())
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
      margin: 0 0 0.4rem;
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
              background: url(../assets/images/icons/icon-03.png) no-repeat
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
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>