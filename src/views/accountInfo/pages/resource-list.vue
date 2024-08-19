<template>
  <section>
    <div class="font-14 note b" v-if="props.cpsData.resources" v-loading="props.cpsLoad">
      <el-row :gutter="32" v-show="machineShow">
        <template v-for="machines in props.cpsData.resources" :key="machines">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mt-16 mb-16">
            <el-row>
              <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" class="flex flex-ai-center baseline">
                <p class="font-14">MachineID: </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="17" :lg="17" :xl="17" class="flex flex-ai-center baseline" @click="copyContent(machines.machine_id, 'Copied')">
                <div class="flex flex-ai-center copy-style">
                  {{machines.machine_id}}
                  <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                    <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                      fill="#3d3d3d" p-id="6468"></path>
                    <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                      fill="#3d3d3d" p-id="6469"></path>
                  </svg>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" class="flex flex-ai-center baseline">
                <p>CPU usage:</p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5" class="flex flex-ai-center baseline">
                <el-progress :percentage="Number(machines.cpu.free/machines.cpu.total*100)" color="#56cfb2" :stroke-width="8" />
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  free: <span class="green">{{ machines.cpu.free }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  used: <span class="blue">{{ machines.cpu.total - machines.cpu.free }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  total: <span class="black">{{ machines.cpu.total }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" class="flex flex-ai-center baseline">
                <p>Memory usage (GiB):</p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5" class="flex flex-ai-center baseline">
                <el-progress :percentage="Number(machines.memory.free/machines.memory.total*100)" color="#56cfb2" :stroke-width="8" />
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  free: <span class="green">{{ byteStorage(machines.memory.free) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  used: <span class="blue">{{ byteStorage(machines.memory.total - machines.memory.free) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  total: <span class="black">{{ byteStorage(machines.memory.total) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" class="flex flex-ai-center baseline">
                <p>Storage usage (GiB):</p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5" class="flex flex-ai-center baseline">
                <el-progress :percentage="Number(machines.storage.free/machines.storage.total*100)" color="#56cfb2" :stroke-width="8" />
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  free: <span class="green">{{ byteStorage(machines.storage.free) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  used: <span class="blue">{{ byteStorage(machines.storage.total - machines.storage.free) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="flex flex-ai-center baseline">
                <p class="width color text-left">
                  total: <span class="black">{{ byteStorage(machines.storage.total) }}</span> 
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center">
                  GPU
                  <el-popover placement="top" :width="300" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                    <template #reference>
                      <div class="flex flex-ai-center ml-4">
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                          <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                            fill="#333333" p-id="7202"></path>
                        </svg>
                      </div>
                    </template>
                    All resource information follows: Green background means free and blue background means used.
                  </el-popover>:
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="17" :lg="17" :xl="17" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-center machines-style">
                  <span v-for="(gpu, g) in machines.gpu.gpus" :key="g" class="span-blue">
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
  </section>
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
    // border: 1px solid #b4b4b4;
    border-radius: 0.06rem;
    @media screen and (max-width: 768px) {
      transform: translate(-50%, 35%);
    }
    svg, path{
      width: 24px;
      height: 24px;
      fill: #1890ff;
      transition: all 0.2s;
      &.up {
        transform: rotate(180deg);
      }
    }
  }
  .el-row {
    margin: 0.1rem 0;
    :deep(.el-col) {
      margin: 0.08rem 0;
      .el-progress{
        width: 92%;
        .el-progress-bar__outer {
          background-color: #02a7f1;
        }
        .el-progress__text {
          display: none;
        }
      }
      .machines-style { 
        span {
          &.span-blue {
            background-color: #02a7f1;
          }
          &.span-green {
            background-color: #56cfb2;
          }
        }
      }
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
            color: #56cfb2;
          }
          .black {
            color: #272727;
          }
          .blue {
            color: #02a7f1;
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
