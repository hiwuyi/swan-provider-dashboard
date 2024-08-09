<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
      <div class="providers-cp s font-14">
        <div class="flex flex-ai-center name-title">
          <b class="font-16 weight-4">Account Info</b>
          <a @click="handleSelect('claimAccount', {}, 'claimAccount')" :class="{'is-disabled': false}">Claim Account</a>
        </div>
        <div class="note b">
          <el-row v-loading="props.cpsLoad">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
              <p class="text-capitalize">CP Contract Address:</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="flex flex-ai-center baseline">
              <a class="link-to" :href="`${explorerLink}address/${route.params.cp_addr}`" target="_blank">{{route.params.cp_addr}}</a>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
              <p class="text-capitalize">Account Type:</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="flex flex-ai-center baseline">
              <div class="collateral m b-ecp" :class="{'b-fcp': props.cpsData.type === 1}">
                <span v-if="props.cpsData.type === 1">FCP</span>
                <span v-else-if="props.cpsData.type === 2">ECP</span>
                <span v-else>ECP & FCP</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
              <p class="text-capitalize">Owner Address:</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="flex flex-ai-center baseline">
              <div class="flex flex-ai-center copy-style">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.owner_addr}`" target="_blank">{{props.cpsData.owner_addr}}</a>
                <svg @click="copyContent(props.cpsData.owner_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
              <p class="text-capitalize">Worker Address:</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="flex flex-ai-center baseline">
              <div class="flex flex-ai-center copy-style">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.worker_addr}`" target="_blank">{{props.cpsData.worker_addr}}</a>
                <svg @click="copyContent(props.cpsData.worker_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
              <p class="text-capitalize">beneficiary Address:</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="flex flex-ai-center baseline">
              <div class="flex flex-ai-center copy-style">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.beneficiary_addr}`" target="_blank">{{props.cpsData.beneficiary_addr}}</a>
                <svg @click="copyContent(props.cpsData.beneficiary_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
      <div class="providers-cp s font-14">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">Balance Info</b>
        </div>
        <div class="note b">
          <el-row class="m">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <p class="color font-18">Available Balance: {{ balanceData?.eth?.balance }} SWANC</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <p class="color font-16 tab-title">FCP</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" class="flex flex-ai-center baseline s">
              <el-row class="m">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Collateral Balance:</span>
                    <span class="text-right">{{balanceData?.fcp_collateral?.balance}} SWANC</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Locked Balance: </span>
                    <span>{{balanceData?.fcp_collateral?.locked}} SWANC</span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right s">
              <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'FCP')">Add</div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <p class="color font-16 tab-title">ECP</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" class="flex flex-ai-center baseline s">
              <el-row class="m">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Collateral Balance:</span>
                    <span class="text-right">{{balanceData?.ecp_collateral?.balance}} SWANC</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Locked Balance: </span>
                    <span>{{balanceData?.ecp_collateral?.locked}} SWANC</span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right s">
              <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'ECP')">Add</div>
            </el-col>
            
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <p class="color font-16 tab-title">Sequencer</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" class="flex flex-ai-center baseline s">
              <el-row class="m">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Sequencer Balance: </span>
                    <span>{{balanceData?.sequencer?.balance}} SWANC</span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right s">
              <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'Sequencer')">Add</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>

  <vm-dialog v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-dialog>
</template>

<script setup lang="ts">
import vmDialog from "@/components/vmDialog.vue"
import { explorerLink, signature } from "@/utils/storage"
import { getCPsBalancesData } from "@/api/cp-profile"
import { copyContent } from "@/utils/common"

const bodyWidth = ref(document.body.clientWidth > 1440 ? 32 : 22)
const route = useRoute()
const vmOperate = reactive({
  centerDrawerVisible: false,
  row: {},
  type: 'dialog'
})
const balanceLoad = ref(false)
const balanceData = ref<any>({})
  
async function handleSelect (key:string, row:any, type:string) {
  switch (key) {
    case 'claimAccount':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'dialog'
      vmOperate.centerDrawerVisible = true
      break;
    case 'cpProfile':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'dialog'
      vmOperate.centerDrawerVisible = signature.value === '' ? false : true
      break;
  }
}
function hardClose (dialog:boolean) {
  vmOperate.centerDrawerVisible = dialog
}
async function getCPsBalanceData() {
  balanceLoad.value = true
  try{
    const balanceRes = await getCPsBalancesData(route.params.cp_addr)
    balanceData.value = balanceRes?.data ?? {}
  }catch{console.error}
  balanceLoad.value = false
}

onMounted(() => getCPsBalanceData())

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
.providers-cp {
  height: calc(100% - 0.8rem);
  padding: 0.3rem 0.35rem 0.1rem;
  margin: 0.4rem 0 0;
  background-color: var(--color-light);
  border-radius: 0.2rem;
  .note {
    a.link-to {
      color: var(--color-primary);
      text-decoration: underline;
    }
    .el-row {
      margin: 0.1rem 0;
      &.m{
        margin: 0 0 0.1rem;
      }
      .el-col {
        margin: 0.08rem 0;
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
        .collateral {
          padding: 0.05rem 0.12rem 0.03rem;
          margin: 0 0 0.1rem;
          background-color: var(--color-primary);
          border-radius: 0.2rem;
          color: var(--color-light);
          line-height: 1;
          cursor: pointer;
          &.m {
            margin: 0;
          }
          &.is-disabled {
            opacity: 0.8;
            cursor: no-drop;
          }
          &.b-ecp,
          &.b-fcp {
            margin: 0;
            background-color: #52ce7c;
            border-radius: 0.04rem;
            &.b-fcp {
              background-color: #699bff;
            }
          }
        }
      }
    }
  }
}
</style>
