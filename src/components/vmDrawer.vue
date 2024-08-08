<template>
  <div class="flex flex-ai-center flex-jc-center">
    <el-drawer v-model="props.centerDrawerVisible" direction="rtl" size="50%" :lock-scroll="true" :show-close="false" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="drawer-body">
      <div class="drawer-content font-14" v-if="props.list.type === 'FCP'">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">{{props.list.name}}</b>
          <router-link v-if="route.name !== 'accountInfo'" :to="{name:'accountInfo', params: {type: 'FCP'}}" class="font-16" @click="closeHandle()">View CP Profile</router-link>
        </div>
        <el-row class="font-14 note">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Contract Address:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.owner_addr || props.list.name || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Active Deployment:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color" v-if="props.list.computer_provider">{{props.list.computer_provider.active_deployment || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Region:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.region || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Score:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color" v-if="props.list.computer_provider">{{props.list.computer_provider.score || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Uptime:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{unifyNumber(props.list.uptime)}}%</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>GPU:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex flex-ai-center baseline">
            <div class="badge flex flex-ai-center">
              <div class="flex flex-ai-center machines-style">
                <span v-for="(gpu, g) in props.list.gpu_list" :key="g">
                  {{gpu}}
                </span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="flex flex-ai-center flex-jc-between name-title" v-if="props.list.computer_provider">
          <b class="font-16 weight-4">Machine Amount：{{props.list.computer_provider.machines.length}}</b>
        </div>
        <div class="font-14 note b" v-if="props.list.computer_provider" v-for="(machines, m) in props.list.computer_provider.machines" :key="m">
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="color text-right" v-if="machines.specs">{{machines.machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="green">{{replaceFormat(machines.specs.cpu.free)}}</span> free
                <span class="green">{{replaceFormat(machines.specs.cpu.total)}}</span> total
                <span class="green">{{replaceFormat(machines.specs.cpu.used)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="orange">{{machines.specs.memory.free}}</span> free
                <span class="orange">{{machines.specs.memory.total}}</span> total
                <span class="orange">{{machines.specs.memory.used}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="blue">{{machines.specs.storage.free}}</span> free
                <span class="blue">{{machines.specs.storage.total}}</span> total
                <span class="blue">{{machines.specs.storage.used}}</span> used
              </p>
            </el-col>
            <el-col v-show="machines.MachineShow" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <div class="grid-content width">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              </div>
            </el-col>
          </el-row>
          <div v-show="machines.MachineShow" class="flex flex-ai-center flex-jc-between name-title">
            <b class="font-16 weight-4">GPU Source</b>
          </div>
          <el-table v-show="machines.MachineShow && machines.specs && machines.specs.gpu" :data="machines.specs.gpu.details" style="width: 100%" empty-text="No Data">
            <el-table-column type="product_name" min-width="70">
              <template #header>
                <div class="font-14 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.product_name}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="70" column-key="status" filterable :filters="[
              { text: 'Occupied', value: 'Occupied' },
              { text: 'Available', value: 'Available' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
              <template #header>
                <div class="font-14 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div v-if="scope.row.status" :class="{'text-capitalize': true, 'color-available':scope.row.status.toLowerCase() === 'available', 'color-occupied':scope.row.status.toLowerCase() === 'occupied'}">{{scope.row.status}}</div>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.free" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Free</div>
              </template>
              <template #default="scope">
                <div class="color-free">{{scope.row.fb_memory_usage.free}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.total" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Total</div>
              </template>
              <template #default="scope">
                <div class="color-total">{{scope.row.fb_memory_usage.total}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.used" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Used</div>
              </template>
              <template #default="scope">
                <div class="color-used">{{scope.row.fb_memory_usage.used}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex flex-ai-center flex-jc-center">
            <el-button @click="machines.MachineShow = !machines.MachineShow">{{machines.MachineShow?'Fold':'Unfold'}}</el-button>
          </div>
        </div>
      </div>

      <div class="drawer-content font-14" v-if="props.list.type === 'ECP'">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">{{props.list.name}}</b>
          <router-link v-if="route.name !== 'accountInfo'" :to="{name:'accountInfo', params: {type: 'FCP'}}" class="font-17" @click="closeHandle()">View CP Profile</router-link>
        </div>
        <el-row class="font-14 note">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Contract Address:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.owner_addr || props.list.name || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Status:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.status}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Total Task:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.task?props.list.task.total : ''}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Completed(%):</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{fixedformat(props.list.completion_rate,10000)}}%</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>Region:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p class="color">{{props.list.region || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
            <p>GPU:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex flex-ai-center baseline">
            <div class="badge flex flex-ai-center">
              <div class="flex flex-ai-center machines-style">
                <span v-for="(gpu, g) in props.list.gpu_tags" :key="g">
                  {{gpu}}
                </span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="flex flex-ai-center flex-jc-between name-title" v-if="props.list.resources">
          <b class="font-16 weight-4">Machine Amount：{{props.list.resources.length}}</b>
        </div>
        <div class="font-14 note b" v-if="props.list.resources" v-for="(machinesECP, mECP) in props.list.resources" :key="mECP">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p>MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="color text-right">{{machinesECP.machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="color text-right">
                <span class="green">{{replaceFormat(machinesECP.cpu.free)}}</span> free
                <span class="green">{{replaceFormat(machinesECP.cpu.total)}}</span> total
                <span class="green">{{replaceFormat(machinesECP.cpu.total-machinesECP.cpu.free)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="color text-right">
                <span class="orange">{{replaceFormat(byteStorage(machinesECP.memory.free))}}</span> free
                <span class="orange">{{replaceFormat(byteStorage(machinesECP.memory.total))}}</span> total
                <span class="orange">{{replaceFormat(byteStorage(machinesECP.memory.total-props.list.resources[0].memory.free))}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="color text-right">
                <span class="blue">{{replaceFormat(byteStorage(machinesECP.storage.free))}}</span> free
                <span class="blue">{{replaceFormat(byteStorage(machinesECP.storage.total))}}</span> total
                <span class="blue">{{replaceFormat(byteStorage(machinesECP.storage.total-machinesECP.storage.free))}}</span> used
              </p>
            </el-col>
            <el-col v-show="machinesECP.MachineShow" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <div class="grid-content width">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              </div>
            </el-col>
          </el-row>
          <div v-show="machinesECP.MachineShow" class="flex flex-ai-center flex-jc-between name-title">
            <b class="font-16 weight-4">GPU Source</b>
          </div>
          <el-table v-show="machinesECP.MachineShow && machinesECP.gpu" :data="machinesECP.gpu.gpus" style="width: 100%" empty-text="No Data">
            <el-table-column type="model" min-width="70">
              <template #header>
                <div class="font-14 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.model}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="70" column-key="status" filterable :filters="[
              { text: 'Occupied', value: 'Occupied' },
              { text: 'Available', value: 'Available' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
              <template #header>
                <div class="font-14 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div v-if="scope.row.status" :class="{'text-capitalize': true, 'color-available':scope.row.status.toLowerCase() === 'available', 'color-occupied':scope.row.status.toLowerCase() === 'occupied'}">{{scope.row.status}}</div>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column type="free" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Free</div>
              </template>
              <template #default="scope">
                <div class="color-free">{{scope.row.free}}</div>
              </template>
            </el-table-column>
            <el-table-column type="total" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Total</div>
              </template>
              <template #default="scope">
                <div class="color-total">{{scope.row.total}}</div>
              </template>
            </el-table-column>
            <el-table-column type="used" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Used</div>
              </template>
              <template #default="scope">
                <div class="color-used">{{scope.row.total-scope.row.free}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex flex-ai-center flex-jc-center">
            <el-button @click="machinesECP.MachineShow = !machinesECP.MachineShow">{{machinesECP.MachineShow?'Fold':'Unfold'}}</el-button>
          </div>
        </div>
      </div>

      <div class="drawer-content machineID font-14" v-if="props.list.type === 'resourceList'">
        <div class="flex flex-ai-center flex-jc-between header-title">
          <b class="font-16 weight-4">Machine Details</b>
        </div>
        <div class="font-14 note b" v-if="props.list.computer_provider" v-for="(machines, m) in props.list.computer_provider.machines" :key="m">
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-right" v-if="machines.specs">{{machines.machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-right" v-if="machines.specs">
                <span class="green">{{replaceFormat(machines.specs.cpu.free)}}</span> free
                <span class="green">{{replaceFormat(machines.specs.cpu.total)}}</span> total
                <span class="green">{{replaceFormat(machines.specs.cpu.used)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-right" v-if="machines.specs">
                <span class="orange">{{machines.specs.memory.free}}</span> free
                <span class="orange">{{machines.specs.memory.total}}</span> total
                <span class="orange">{{machines.specs.memory.used}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex flex-ai-center baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex flex-ai-center baseline">
              <p class="width color text-right" v-if="machines.specs">
                <span class="blue">{{machines.specs.storage.free}}</span> free
                <span class="blue">{{machines.specs.storage.total}}</span> total
                <span class="blue">{{machines.specs.storage.used}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <div class="grid-content width">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              </div>
            </el-col>
          </el-row>
          <div class="flex flex-ai-center flex-jc-between name-title">
            <b class="font-16 weight-4">GPU Source</b>
          </div>
          <el-table v-show="machines.specs && machines.specs.gpu" :data="machines.specs.gpu.details" style="width: 100%" empty-text="No Data">
            <el-table-column type="product_name" min-width="70">
              <template #header>
                <div class="font-14 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.product_name}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="80" column-key="status" filterable :filters="[
              { text: 'Occupied', value: 'Occupied' },
              { text: 'Available', value: 'Available' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
              <template #header>
                <div class="font-14 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div v-if="scope.row.status" :class="{'text-capitalize': true, 'color-available':scope.row.status.toLowerCase() === 'available', 'color-occupied':scope.row.status.toLowerCase() === 'occupied'}">{{scope.row.status}}</div>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.free" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Free</div>
              </template>
              <template #default="scope">
                <div class="color-free">{{scope.row.fb_memory_usage.free}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.total" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Total</div>
              </template>
              <template #default="scope">
                <div class="color-total">{{scope.row.fb_memory_usage.total}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.used" min-width="70">
              <template #header>
                <div class="font-14 weight-4">Used</div>
              </template>
              <template #default="scope">
                <div class="color-used">{{scope.row.fb_memory_usage.used}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { byteStorage, fixedformat, replaceFormat, timeout, unifyNumber } from '@/utils/common';
import {
  Warning
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

const props = withDefaults(
  defineProps<{
    list?: any
    centerDrawerVisible?: boolean
  }>(),
  {
    list: {
      type: Object,
      default: {
        type: 'FCP'
      }
    },
    centerDrawerVisible: false
  }
)
  
    const cpLoad = ref(false)
    const route = useRoute()

    function closeHandle (type) {
      context.emit('hardClose', false, type)
    }
    const changetype = () => {
      cpLoad.value = true
      const machart_name = echarts.init(document.getElementById("chart-name"));
      const option1 = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          color: '#fff',
          borderWidth: 0,
          borderRadius: 9,
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'HELVETICA-ROMAN'
          },
          icon: 'roundRect',
          formatter: function (params) {
            // params 是一个数组，包含了每个系列的数据信息
            var result = params[0].name + '<br/>'; // X轴的值
            params.forEach(function (item) {
              // 遍历每个系列的数据
              var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
              let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
              result += colorDot + item.seriesName + ' Usage: ' + item.value + '% 11/11 GiB' + '<br/>'; // 系列名和对应的值
            });
            return result;
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: ['8/01', '8/02', '8/03', '8/04', '8/05', '8/06', '8/07']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // 使用 formatter 函数格式化标签
            formatter: '{value}%'
          },
          minInterval: 50
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [10, 13, 11, 34, 90, 30, 20],
            color: '#699bff'
          },
          {
            name: 'Memory',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [20, 12, 19, 24, 29, 33, 31],
            color: '#52ce7c'
          },
          {
            name: 'Storage',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [15, 23, 20, 15, 19, 30, 41],
            color: '#0046b7'
          }
        ]
      }
      machart_name.setOption(option1);
      window.addEventListener("resize", function () {
        machart_name.resize();
      })
      cpLoad.value = false
    }
    onMounted(async () => {
      await timeout(500)
      changetype()
    })
</script>

<style lang="less">
.el-overlay {
  .drawer-body {
    width: 50%;
    max-width: 900px;
    min-width: 330px;
    border-radius: 6px;
    word-break: break-word;
    color: #6c6f72;
    .el-drawer__header {
      display: none;
      padding: 0;
    }
    .el-drawer__body {
      @media screen and (max-width: 768px) {
        padding: 20px 10px;
      }
      .drawer-content {
        padding: 0.12rem 0.2rem;
        line-height: 1.4;
        cursor: text;
        @media screen and (max-width: 768px) {
          padding: 0.12rem 0;
        }
        &.machineID {
          .note {
            padding: 0 0.18rem 0.1rem;
            border: 0;
          }
        }
        .note {
          padding: 0.12rem 0.25rem;
          margin: 0.27rem 0;
          border: 1px solid var(--color-border);
          border-radius: 0.1rem;
          &.b {
            border-radius: 0.2rem;
          }
          .el-col {
            margin: 0.08rem 0;
            p {
              color: #000;
              &.color {
                color: var(--color-border);
                @media screen and (max-width: 767px) {
                  text-align: left !important;
                }
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
            }
            .badge {
              display: flex;
              align-items: center;
              white-space: normal;
              word-break: break-word;
              img {
                width: 30px;
                height: 30px;
                margin-right: 5px;
                @media screen and (max-width: 1260px) {
                  width: 25px;
                  height: 25px;
                }
              }
              .machines-style {
                flex-wrap: wrap;
                span {
                  padding: 3px 10px;
                  margin: 3px 5px 3px 0;
                  background-color: var(--color-primary);
                  border-radius: 45px;
                  word-break: break-word;
                  line-height: 1;
                  color: var(--color-light);
                }
              }
            }
            .chart-trends {
              width: 100%;
              margin: 0 auto 0.24rem;
              height: 2.3rem;
              @media screen and (max-width: 768px) {
                height: 200px;
              }
              @media screen and (max-width: 600px) {
                height: 180px;
              }
            }
          }
          .el-button {
            font-family: inherit;
            font-size: inherit;
          }
        }
      }
    }
    .el-drawer__footer {
      padding: 0;
      .drawer-footer {
      }
    }
  }
}
</style>
