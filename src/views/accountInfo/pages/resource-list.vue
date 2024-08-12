<template>
  <div class="font-14 note b" v-if="props.cpsData.resources" v-loading="props.cpsLoad">
    <el-row :gutter="32" v-show="machineShow">
      <template v-for="machines in props.cpsData.resources" :key="machines">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mt-16 mb-16">
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p class="font-14">MachineID: </p>
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
              <p>CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-left">
                <span class="green">{{replaceFormat(machines.cpu.free)}}</span> free
                <span class="green">{{replaceFormat(machines.cpu.total)}}</span> total
                <span class="green">{{replaceFormat(machines.cpu.total - machines.cpu.free)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Memory usage (GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-left">
                <span class="orange">{{ byteStorage(machines.memory.free) }}</span> free
                <span class="orange">{{ byteStorage(machines.memory.total) }}</span> total
                <span class="orange">{{ byteStorage(machines.memory.total - machines.memory.free) }}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Storage usage (GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-left">
                <span class="blue">{{ byteStorage(machines.storage.free) }}</span> free
                <span class="blue">{{ byteStorage(machines.storage.total) }}</span> total
                <span class="blue">{{ byteStorage(machines.storage.total - machines.storage.free) }}</span> used
              </p>
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
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center flex-jc-right">
              <div class="color text-right machines-style" @click="handleSelect('ranking', machines, 'resourceList')">
                <span class="font-16 pointer">View</span>
              </div>
            </el-col> -->
          </el-row>
        </el-col>
      </template>
    </el-row>
    <div class="flex flex-jc-center open pointer" v-if="props.cpsData.resources && props.cpsData.resources.length > 0">
      <svg @click="machineShow=!machineShow" :class="`icon ${machineShow?'up':''}`" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3824" width="32" height="32"><path d="M200.874667 311.125333l341.333333 341.333334L512 682.666667l-30.208-30.208 341.333333-341.333334 60.416 60.416-341.333333 341.333334q-2.986667 2.901333-6.485333 5.290666-3.498667 2.304-7.424 3.925334-3.84 1.621333-7.936 2.389333-4.181333 0.853333-8.362667 0.853333-4.266667 0-8.362667-0.853333t-7.936-2.389333q-3.925333-1.621333-7.424-3.925334-3.413333-2.389333-6.485333-5.290666l-341.333333-341.333334 60.416-60.416zM170.666667 384q-4.266667 0-8.362667-0.853333t-7.936-2.389334q-3.925333-1.621333-7.424-3.925333-3.413333-2.389333-6.485333-5.290667-2.901333-2.986667-5.290667-6.485333-2.304-3.498667-3.925333-7.424-1.621333-3.84-2.389334-7.936Q128 345.514667 128 341.333333q0-4.266667 0.853333-8.362666t2.389334-7.936q1.621333-3.925333 3.925333-7.424 2.389333-3.413333 5.290667-6.485334 2.986667-2.901333 6.485333-5.290666 3.498667-2.304 7.424-3.925334 3.84-1.621333 7.936-2.389333 4.181333-0.853333 8.362667-0.853333 4.266667 0 8.362666 0.853333t7.936 2.389333q3.925333 1.621333 7.424 3.925334 3.413333 2.389333 6.485334 5.290666 2.901333 2.986667 5.290666 6.485334 2.304 3.498667 3.925334 7.424 1.621333 3.84 2.389333 7.936 0.853333 4.181333 0.853333 8.362666 0 4.266667-0.853333 8.362667t-2.389333 7.936q-1.621333 3.925333-3.925334 7.424-2.389333 3.413333-5.290666 6.485333-2.986667 2.901333-6.485334 5.290667-3.498667 2.304-7.424 3.925333-3.84 1.621333-7.936 2.389334-4.181333 0.853333-8.362666 0.853333z m682.666666 0q-4.266667 0-8.362666-0.853333t-7.936-2.389334q-3.925333-1.621333-7.424-3.925333-3.413333-2.389333-6.485334-5.290667-2.901333-2.986667-5.290666-6.485333-2.304-3.498667-3.925334-7.424-1.621333-3.84-2.389333-7.936Q810.666667 345.514667 810.666667 341.333333q0-4.266667 0.853333-8.362666t2.389333-7.936q1.621333-3.925333 3.925334-7.424 2.389333-3.413333 5.290666-6.485334 2.986667-2.901333 6.485334-5.290666 3.498667-2.304 7.424-3.925334 3.84-1.621333 7.936-2.389333 4.181333-0.853333 8.362666-0.853333 4.266667 0 8.362667 0.853333t7.936 2.389333q3.925333 1.621333 7.424 3.925334 3.413333 2.389333 6.485333 5.290666 2.901333 2.986667 5.290667 6.485334 2.304 3.498667 3.925333 7.424 1.621333 3.84 2.389334 7.936 0.853333 4.181333 0.853333 8.362666 0 4.266667-0.853333 8.362667t-2.389334 7.936q-1.621333 3.925333-3.925333 7.424-2.389333 3.413333-5.290667 6.485333-2.986667 2.901333-6.485333 5.290667-3.498667 2.304-7.424 3.925333-3.84 1.621333-7.936 2.389334-4.181333 0.853333-8.362667 0.853333z" fill="#999999" p-id="3825"></path></svg>
    </div>
  </div>

  <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
</template>

<script setup lang="ts">
import vmDrawer from "@/components/vmDrawer.vue"
import { byteStorage, copyContent, replaceFormat } from "@/utils/common"

const vmOperate = reactive({
  centerDrawerVisible: false,
  row: {},
  type: 'dialog'
})
const machineShow = ref(false)

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
  .open {
    position: absolute;
    bottom: 0;
    left: 50%;
    padding: 0 0.1rem;
    background-color: var(--color-light);
    transform: translate(-50%, 50%);
    border: 1px solid #b4b4b4;
    border-radius: 0.06rem;
    svg, path{
      width: 24px;
      height: 24px;
      fill: #b4b4b4;
      transition: all 0.2s;
      &.up {
        transform: rotate(180deg);
      }
    }
  }
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
          color: var(--color-dark);
          .green {
            color: #699bff;
          }
          .orange {
            color: #52cd7b;
          }
          .blue {
            color: #0046b7;
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
</style>
