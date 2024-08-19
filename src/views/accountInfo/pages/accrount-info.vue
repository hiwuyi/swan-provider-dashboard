<template>
  <el-row :gutter="bodyWidth" class="mt-24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="providers-cp s font-14">
        <div class="flex flex-ai-center name-title">
          <b class="font-16 weight-4">Account Overview</b>
        </div>
        <div class="note b">
          <el-row :gutter="bodyWidth" v-loading="props.cpsLoad">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Account Type:</p>
              <div class="collateral m b-ecp" :class="{'b-fcp': props.cpsData.type === 1}">
                <span v-if="props.cpsData.type === 1">FCP</span>
                <span v-else-if="props.cpsData.type === 2">ECP</span>
                <span v-else>ECP & FCP</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">NodeID:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.node_id" @click="copyContent(props.cpsData.node_id, 'Copied')">
                {{ hiddLongAddress(props.cpsData.node_id) ?? '-' }}
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Task type:</p>
              <template v-for="t in props.cpsData.task_types" :key="t">
                <div class="mr-10">
                  <div class="collateral m b-fcp">
                    <span v-if="t === 1">fil-c2-512M</span>
                    <span v-else-if="t === 2">ALEO</span>
                    <span v-else-if="t === 3">AI</span>
                    <span v-else>fil-c2-32G</span>
                  </div>
                </div>
              </template>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Owner Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.owner_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.owner_addr}`" target="_blank">{{props.cpsData.owner_addr ?? '-'}}</a>
                <svg @click="copyContent(props.cpsData.owner_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Region:</p>
              <div>{{props.cpsData.region || '-'}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Worker Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.worker_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.worker_addr}`" target="_blank">{{props.cpsData.worker_addr ?? '-'}}</a>
                <svg @click="copyContent(props.cpsData.worker_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Create time:</p>
              <div>{{momentFun(props.cpsData.created_at)}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">beneficiary Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.beneficiary_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.beneficiary_addr}`" target="_blank">{{props.cpsData.beneficiary_addr}}</a>
                <svg @click="copyContent(props.cpsData.beneficiary_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { explorerLink, signature } from "@/utils/storage"
import { copyContent, hiddAddress, hiddLongAddress, momentFun, replaceDecimalsFormat } from "@/utils/common"

const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const route = useRoute()

onMounted(() => {})

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
  height: calc(100% - 0.62rem);
  padding: 0.3rem 0.35rem 0.1rem;
  margin: 0.22rem 0 0;
  background-color: var(--color-light);
  border-radius: 0.2rem;
  .note {
    a.link-to {
      color: var(--color-primary);
      // text-decoration: underline;
    }
    .el-row {
      margin: 0.1rem 0;
      &.m{
        margin: 0 0 0.1rem;
      }
      .el-col {
        margin: 0.08rem 0;
        .label {
          min-width: 1.85rem;
        }
      }
    }
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
  :deep(.el-descriptions) {
    font-size: inherit;
    .el-descriptions__body {
      .el-descriptions__table {
        .el-descriptions__cell {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
