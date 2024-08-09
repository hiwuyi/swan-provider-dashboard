<template>
  <el-row class="re-list">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Total Number Of Node:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{ props.cpsData.resources ? replaceFormat(props.cpsData.resources.length) : '-'}}</p>
    </el-col>
    <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Completed:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{unifyNumber(0.9)}}%</p>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Uptime:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{unifyNumber(1)}}%</p>
    </el-col> -->
  </el-row>
  
  <div class="font-14 note b" v-if="props.cpsData.resources" v-loading="props.cpsLoad">
    <el-row :gutter="32">
      <template v-for="machines in props.cpsData.resources" :key="machines">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mt-16 mb-16">
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p class="font-18 font-bold">MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <div class="flex flex-ai-center copy-style">
                {{machines.machine_id}}
                <svg @click="copyContent(machines.machine_id, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>GPU: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <div class="flex flex-ai-center flex-jc-center machines-style">
                <span v-for="(gpu, g) in machines.gpu.gpus" :key="g">
                  {{gpu.model}}
                </span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center flex-jc-right">
              <div class="color text-right machines-style" @click="handleSelect('ranking', machines, 'resourceList')">
                <span class="font-16 pointer">View</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </template>
    </el-row>
  </div>

  <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
</template>

<script setup lang="ts">
import vmDrawer from "@/components/vmDrawer.vue"
import { copyContent, fixedformat, replaceFormat, unifyNumber } from "@/utils/common"

const vmOperate = reactive({
  centerDrawerVisible: false,
  row: {},
  type: 'dialog'
})

async function handleSelect (key:string, row:any, type:string) {
  switch (key) {
    case 'ranking':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'drawer'
      vmOperate.centerDrawerVisible = true
      break;
  }
}
function hardClose (dialog:boolean) {
  vmOperate.centerDrawerVisible = dialog
}

const props = withDefaults(
  defineProps<{
    cpsData?: any
    cpsLoad?: boolean
  }>(),
  {
    cpsData: {},
    cpsLoad: false
  }
)
</script>

<style lang="less" scoped>
.note {
  .el-row {
    margin: 0.1rem 0;
    .el-col {
      margin: 0.08rem 0;
      .el-row {
        padding: 0.16rem;
        border: 1px solid #e3e7ee;
        border-radius: 0.16rem;
      }
      p {
        color: #000;
        &.color {
          color: var(--color-primary);
          .green {
            color: #8dd565;
          }
          .orange {
            color: #ff9413;
          }
          .blue {
            color: #6067f5;
          }
        }
        &.tab-title{
          width: 100%;
          margin: 0 0 0.1rem;
          border-bottom: 1px solid var(--color-border);
        }
      }
    }
  }
}
.re-list {
  .el-col {
    margin: 0.22rem 0 0;
    &.flex {
      display: flex;
    }
    &.m {
      margin: 0.22rem 0;
    }
    .module-container {
      position: relative;
      width: calc(100% - 0.64rem);
      height: calc(100% - 0.5rem);
      padding: 0.25rem 0.32rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      &.world {
        background-color: var(--color-primary);
        .title {
          color: var(--color-light);
        }
      }
      .el-col {
        margin: 0;
      }
      .title {
        margin: 0;
        .subtitle {
          margin: 0.06rem 0 0;
          color: #7c889b;
        }
      }
      .grid-content {
        height: calc(100% - 0.53rem);
        margin: 0.23rem 0 0;
        background: #edf2ff;
      }
    }
    .grid-content {
      position: relative;
      width: calc(100% - 0.28rem);
      height: calc(100% - 0.3rem);
      padding: 0.18rem 0.14rem 0.12rem;
      background: var(--color-light);
      border-radius: 0.18rem;
      // box-shadow: 0 0 12px #e6e7eb;
    }
    .chart-trends {
      width: 100%;
      margin: -0.4rem auto 0;
      height: 2.8rem;
      @media screen and (min-width: 3600px) {
        height: 400px;
      }
      @media screen and (max-width: 1600px) {
        margin: -0.43rem auto 0;
      }
      @media screen and (max-width: 1440px) {
        margin: -0.5rem auto 0;
      }
      @media screen and (max-width: 768px) {
        height: 280px;
        margin: -0.3rem auto 0;
      }
      @media screen and (max-width: 600px) {
        height: 250px;
      }
    }
  }
}
</style>
