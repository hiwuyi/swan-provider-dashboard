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
              <el-input class="zk-input" v-model="networkZK.name" placeholder="please enter name" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkZK.cp_addr" placeholder="please enter CP Account Address" />
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

        <el-table :data="providerBody.ubiTableData" @filter-change="handleFilterECPChange" @expand-change="expandChange" :row-key="getRowKeys" :expand-row-keys="expands" style="width: 100%" empty-text="No Data" v-loading="providersECPLoad">
          <el-table-column type="expand" width="40">
            <template #default="props">
              <div class="service-body" v-if="props.row.resources">
                <div v-for="n in props.row.resources" :key="n" class="list">
                  <div class="li-title text-left">Machine ID: {{n.machine_id}}</div>
                  <ul>
                    <li>
                      <div class="li-body">
                        <p :class="{'t':true, 't-capitalize': true}">vcpu</p>
                        <p>
                          <strong>{{replaceFormat(n.vcpu.free)}}</strong>free</p>
                        <p>
                          <strong>{{replaceFormat(n.vcpu.total)}}</strong>total</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-body">
                        <p :class="{'t':true}">memory</p>
                        <p>
                          <strong>{{sizeChange(n.memory.free)}}</strong>free</p>
                        <p>
                          <strong>{{sizeChange(n.memory.total)}}</strong>total</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-body">
                        <p :class="{'t':true}">storage</p>
                        <p>
                          <strong>{{sizeChange(n.storage.free)}}</strong>free</p>
                        <p>
                          <strong>{{sizeChange(n.storage.total)}}</strong>total</p>
                      </div>
                    </li>
                  </ul>
                  <div class="li-title text-left">GPU Source</div>
                  <ul>
                    <li class="m-r" style="width:100%;">
                      <div class="flex flex-ai-center">
                        <div v-for="g in n.gpu.gpus" :key="g" :class="{'li-body':true}">
                          <p :class="{'t':true, 't-capitalize': true}">{{g.model}} (gpu)</p>
                          <p>
                            <strong>{{replaceFormat(g.free)}}</strong>free</p>
                          <p>
                            <strong>{{replaceFormat(g.total)}}</strong>total</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="service-body text-center" v-else>No Data</div>
            </template>
          </el-table-column>
          <el-table-column prop="contract_addr" label="CP Account Address" min-width="140">
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <img v-if="scope.$index < 2 && paginZK.pageNo <= 1" :src="badgeIcon01" alt="">
                <img v-else :src="badgeIcon02" alt="">
                <div class="flex flex-ai-center flex-jc-center copy-style">
                  <router-link :to="{ name: 'accountInfo', params: {cp_addr: scope.row.contract_addr} }">{{hiddAddress(scope.row.contract_addr)}}</router-link>
                  <svg @click="copyContent(scope.row.contract_addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                    <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                      p-id="2310" fill="#b5b7c8"></path>
                    <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                    <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                  </svg>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" min-width="120">
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="country" label="Country" /> -->
          <el-table-column prop="node_id" label="nodeID" min-width="140">
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" @click="copyContent(scope.row.node_id, 'Copied')">
                {{hiddAddress(scope.row.node_id)}}
                <svg t="1706499607741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                  <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                    p-id="2310" fill="#b5b7c8"></path>
                  <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                  <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="gpu_tags" label="GPU" min-width="140">
            <template #default="scope">
              <div class="badge">
                <div class="flex flex-ai-center flex-jc-center machines-style">
                  <span v-for="(gpu, g) in scope.row.gpu_tags" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="Region" min-width="100" />
          <el-table-column prop="work_status" label="Status" min-width="105"
            column-key="status" filterable :filters="[
              { text: 'Inactive', value: 'Inactive' },
              { text: 'Offline', value: 'Offline' },
              { text: 'Online', value: 'Online' },
              { text: 'Inconsistent', value: 'Inconsistent' },
              { text: 'NSC', value: 'NSC' },
              { text: 'NSR', value: 'NSR' },
              { text: 'Declined', value: 'Declined' },
              { text: 'Suspended', value: 'Suspended' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
            <template #default="scope">
              <div>
                {{scope.row.work_status || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="task" label="Total Task">
            <template #default="scope">
              <div>
                {{scope.row.task?scope.row.task.total : ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="task" label="Completed(%)" min-width="120">
            <template #default="scope">
              <div>
                {{fixedformat(scope.row.completion_rate,10000)}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="Contribution Score" min-width="130">
            <template #default="scope">
              <div>
                {{replaceFormat(scope.row.score)}}
              </div>
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
import badgeIcon01 from "@/assets/images/icons/badge-1.png"
import badgeIcon02 from "@/assets/images/icons/badge-2.png"
import badgeIcon03 from "@/assets/images/icons/badge-3.png"
import { copyContent, debounce, fixedformat, hiddAddress, paginationWidth, replaceFormat, sizeChange } from "@/utils/common";
import { getOverViewECP, getOverviewECPData } from "@/api/overview";

    const route = useRoute()
    const router = useRouter()
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
    const paramsECPFilter = reactive({
      data: {
        status: ''
      }
    })
    const expands = ref([])

    function handleSizeChange(val) {
      paginZK.pageSize = val
      paginZK.pageNo = 1
      getUBITable()
    }
    async function handleZKCurrentChange (currentPage) {
      paginZK.pageNo = currentPage
      getUBITable()
    }
    async function getUBITable () {
      providersECPLoad.value = true
      try{
        const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
        let params = {
          page_size: paginZK.pageSize,
          page_no: page,
          cp_addr: networkZK.cp_addr,
          name: networkZK.name,
          node_id: networkZK.node_id
        }
        params = Object.assign({}, params, paramsECPFilter.data)
        const providerRes = await getOverViewECP(params)
        paginZK.total = providerRes?.data?.total ?? 0
        providerBody.ubiTableData = await getList(providerRes.data.list)
      } catch { console.error }
      providersECPLoad.value = false
    }
    const handleFilterECPChange = (filters) => {
      for (const key in filters) {
        if (key === 'status') {
          const result = filters.status[0] ?? ''
          paramsECPFilter.data.status = result
        }
      }
      handleZKCurrentChange(1)
    }
    let getRowKeys = (row) => {
      return row.node_id;
    }
    function expandChange (row, expandedRows) {
      // console.log(row, expandedRows)
      if (expandedRows.length) {
        expands.value = [];
        if (row) expands.value.push(row.node_id);
      } else expands.value = [];
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
    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    onMounted(async () => {
      reset('init')
    })
  
</script>

<style lang="less" scoped>
@import url('../../assets/style/table.less');

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
