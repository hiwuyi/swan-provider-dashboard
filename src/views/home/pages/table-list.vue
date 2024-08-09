<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="m">
      <div class="module-container font-14">
        <div class="title flex flex-ai-center flex-jc-between">
          <div class="flex flex-ai-center">
            <i class="icon icon-provider"></i>
            <span class="font-16 weight-4">FCP List</span>
          </div>
          <router-link :to="{name: 'rankingsFCP'}" class="font-12 flex flex-ai-center">more &nbsp;
            <small>&gt;&gt;</small>
          </router-link>
        </div>
        <el-table :data="providersData" empty-text="No Data" v-loading="providersFCPLoad">
          <el-table-column type="index" min-width="70">
            <template #header>
              <div class="font-14 weight-4">Ranking</div>
            </template>
          </el-table-column>
          <el-table-column prop="addr" min-width="120">
            <template #header>
              <div class="font-14 weight-4">Account</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                <span class="name-style" @click="handleCP(scope.row.addr)">{{hiddAddress(scope.row.addr)}}</span>
                <svg @click="copyContent(scope.row.addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                  <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                    p-id="2310" fill="#b5b7c8"></path>
                  <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                  <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="active_deployments" min-width="150">
            <template #header>
              <div class="font-14 weight-4">Active Deployments</div>
            </template>
          </el-table-column>
          <el-table-column prop="score" min-width="70">
            <template #header>
              <div class="font-14 weight-4">Score</div>
            </template>
          </el-table-column>
          <el-table-column prop="uptime" min-width="130">
            <template #header>
              <div class="font-14 weight-4">Uptime</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                <ul class="flex flex-ai-center uptime-ul">
                  <li :class="{'active': scope.row.uptime/10000 >= 0.1}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.2}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.3}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.4}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.5}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.6}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.7}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.8}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 0.9}"></li>
                  <li :class="{'active': scope.row.uptime/10000 >= 1}"></li>
                </ul>
                <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime/10000)}}%</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="m">
      <div class="module-container font-14">
        <div class="title flex flex-ai-center flex-jc-between">
          <div class="flex flex-ai-center">
            <i class="icon icon-provider"></i>
            <span class="font-16 weight-4">ECP List</span>
          </div>
          <router-link :to="{name: 'rankingsECP'}" class="font-12 flex flex-ai-center">more &nbsp;
            <small>&gt;&gt;</small>
          </router-link>
        </div>
        
        <el-table :data="providersECPData" empty-text="No Data" v-loading="providersECPLoad">
          <el-table-column type="index" min-width="70">
            <template #header>
              <div class="font-14 weight-4">Ranking</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" min-width="120">
            <template #header>
              <div class="font-14 weight-4">Account</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                <span class="name-style" @click="handleCP(scope.row.addr)">{{hiddAddress(scope.row.addr)}}</span>
                <svg @click="copyContent(scope.row.addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                  <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                    p-id="2310" fill="#b5b7c8"></path>
                  <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                  <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" min-width="90" column-key="status">
            <template #header>
              <div class="font-14 weight-4">status</div>
            </template>
          </el-table-column>
          <el-table-column prop="tasks" min-width="110">
            <template #header>
              <div class="font-14 weight-4">Total Task</div>
            </template>
            <template #default="scope">
                <span class="uptime-text text-right task">{{ replaceFormat(scope.row.tasks) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="complete_rate" min-width="110">
            <template #header>
              <div class="font-14 weight-4">Complete Rate</div>
            </template>
            <template #default="scope">
                <span class="uptime-text text-right task">{{ replaceFormat(scope.row.complete_rate) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="uptime" min-width="150">
            <template #header>
              <div class="font-14 weight-4">Completed (%)</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                <ul class="flex flex-ai-center uptime-ul">
                  <li :class="{'active': scope.row.uptime >= 0.1}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.2}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.3}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.4}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.5}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.6}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.7}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.8}"></li>
                  <li :class="{'active': scope.row.uptime >= 0.9}"></li>
                  <li :class="{'active': scope.row.uptime >= 1}"></li>
                </ul>
                <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime)}}%</span>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { getCPsECPListData, getCPsFCPListData } from '@/api/overview';
import { copyContent, hiddAddress, replaceFormat, unifyNumber } from '@/utils/common';

const route = useRoute()
const router = useRouter()
const bodyWidth = ref(document.body.clientWidth > 1440 ? 42 : 28)
const providersFCPLoad = ref(false)
const providersECPLoad = ref(false)
const providersData = ref([])
const providersECPData = ref([])
const pagin = reactive({
  pageSize: 10,
  pageNo: 1
})

async function initFCPList () {
  providersFCPLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    const paramsCont = {
      "page_no": page,
      "page_size": pagin.pageSize
    }
    const providerFCPRes = await getCPsFCPListData(paramsCont)
    providersData.value = providerFCPRes?.data?.list ?? []
  }catch{console.error}
  providersFCPLoad.value = false
}

async function initECPList () {
  providersECPLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    const paramsCont = {
      "page_no": page,
      "page_size": pagin.pageSize
    }
    const providerECPRes = await getCPsECPListData(paramsCont)
    providersECPData.value = providerECPRes?.data?.list ?? []
  }catch{console.error}
  providersECPLoad.value = false
}
function handleCP (row:string) {
  router.push({ name: 'accountInfo', params: {cp_addr: row} })
}
onMounted(async () => {
  initFCPList()
  initECPList()
})
</script>

<style lang="less" scoped>
#main-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .header-title {
    padding: 0.1rem 0 0.15rem;
    .search{
      white-space: nowrap;
    }
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0 0 0.1rem;
      a {
        margin: 0 0 0 0.1rem;
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
        margin: 0.23rem 0;
        &.flex {
          display: flex;
        }
        .module-container {
          position: relative;
          width: calc(100% - 0.64rem);
          height: calc(100% - 0.5rem);
          padding: 0.25rem 0.32rem;
          background-color: var(--color-light);
          border-radius: 0.14rem;
          @media screen and (max-width: 768px) {
          }
          &.world {
            width: 100%;
            height: 100%;
            min-height: 4.2rem;
            padding: 0;
            background-color: var(--color-primary);
            .title {
              position: absolute;
              left: 0.25rem;
              right: 0.25rem;
              top: 0.32rem;
              width: auto;
              color: var(--color-light);
              z-index: 9;
            }
          }
          .el-col {
            margin: 0;
          }
          .title {
            margin: 0;
            .icon {
              width: 0.24rem;
              height: 0.24rem;
              margin: 0 0.09rem 0 0;
              @media screen and (max-width: 1024px) {
                width: 16px;
                height: 16px;
              }
              &.icon-world {
                background: url(../../assets/images/icons/icon-05.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-figures {
                background: url(../../assets/images/icons/icon-04.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-gpu {
                background: url(../../assets/images/icons/icon-08.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-resource {
                background: url(../../assets/images/icons/icon-06.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-provider {
                background: url(../../assets/images/icons/icon-07.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-list {
                background: url(../../assets/images/icons/icon-09.png)
                  no-repeat;
                background-size: 100%;
              }
            }
          }
          .grid-content {
            height: calc(100% - 0.59rem);
            margin: 0.23rem 0 0;
            background: #edf2ff;
            &.g-select {
              height: calc(100% - 0.4rem);
              padding-top: 0.05rem;
            }
          }
        }
        .grid-content {
          position: relative;
          height: calc(100% - 0.36rem);
          padding: 0.18rem 0.14rem;
          background: var(--color-light);
          border-radius: 0.18rem;
          // box-shadow: 0 0 12px #e6e7eb;
          @media screen and (max-width: 1440px) {
            padding: 0.18rem 0.04rem 0.12rem;
          }
        }
        h6 {
          width: 100%;
          line-height: 1.2;
          text-transform: capitalize;
          color: #7c889b;
          &.t {
            width: auto;
            padding: 0.03rem 0.16rem 0;
          }
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
            width: auto;
            font-size: inherit;
            .el-tooltip__trigger {
              width: 40px;
              padding: 2px 4px;
              margin: 0 3px 0 0;
              background-color: transparent;
            }
            .el-select__wrapper {
              font-size: inherit;
            }
          }
        }
        b {
          position: relative;
          padding: 0.1rem 0 0;
          margin: 0;
          line-height: 1;
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
        .chart-trends {
          width: 100%;
          margin: -0.25rem auto 0;
          height: 2.3rem;
          @media screen and (min-width: 3600px) {
            height: 350px;
          }
          @media screen and (max-width: 1440px) {
            margin: -0.3rem auto 0;
          }
          @media screen and (max-width: 768px) {
            height: 250px;
          }
          @media screen and (max-width: 600px) {
            height: 200px;
          }
        }
        .world-buttom {
          position: absolute;
          right: 0.25rem;
          top: 0.32rem;
          z-index: 10;
          svg {
            display: block;
            cursor: pointer;
            &:nth-child(2) {
              margin: 7px 0 3px;
            }
          }
        }
        .chart-world {
          width: 100%;
          height: 3.45rem;
          height: 100%;
          margin: 0;
          @media screen and (max-width: 768px) {
            height: 300px;
          }
        }
        .el-tabs {
          width: 100%;
          .el-tabs__nav-scroll {
            overflow: auto;
          }
          .el-tabs__header {
            padding: 0.22rem 0 0;
            margin: 0;
            .el-tabs__nav-wrap {
              @media screen and (max-width: 600px) {
                padding: 0 20px;
              }
            }
            .el-tabs__active-bar,
            .el-tabs__nav-wrap:after {
              display: none;
            }
            .el-tabs__nav {
              .el-tabs__item {
                height: auto;
                padding: 0.08rem 0.13rem;
                margin: 0 0.15rem 0 0;
                background-color: #f3f4f8;
                border: 1px solid #ced4e1;
                border-radius: 0.5rem;
                color: #313132;
                line-height: 1.1;
                &.is-active {
                  background-color: #edf2ff;
                  border-color: #8eb0ff;
                  color: var(--color-primary);
                }
              }
            }
            .el-tabs__nav-next,
            .el-tabs__nav-prev {
              display: none;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
