<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-24">
      <el-row class="m w-100">
        <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" class="flex flex-ai-center baseline s">
          <el-row class="m w-100">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <div class="flex flex-ai-center flex-jc-between width">
                <span>Collateral Balance:</span>
                <span class="text-right">{{ replaceDecimalsFormat(balanceData?.fcp_collateral?.balance) }} SWANC</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <div class="flex flex-ai-center flex-jc-between width">
                <span>Locked Balance: </span>
                <span>{{ replaceDecimalsFormat(balanceData?.fcp_collateral?.locked) }} SWANC</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right s">
          <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'FCP')">Add</div>
        </el-col>
      </el-row>

      <div class="module-container">
        <div class="title">
          <p class="font-16 weight-4">Job Status</p>
          <p class="font-12 subtitle">Completion total: {{ replaceFormat(totalJob) }}</p>
        </div>
        <div class='chart-trends' id='chart-job' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-14">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-24">
      <el-row class="m w-100">
        <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" class="flex flex-ai-center baseline s">
          <el-row class="m w-100">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <div class="flex flex-ai-center flex-jc-between width">
                <span>Collateral Balance:</span>
                <span class="text-right">{{ replaceDecimalsFormat(balanceData?.ecp_collateral?.balance) }} SWANC</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <div class="flex flex-ai-center flex-jc-between width">
                <span>Locked Balance: </span>
                <span>{{ replaceDecimalsFormat(balanceData?.ecp_collateral?.locked) }} SWANC</span>
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
          <el-row class="m w-100">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline s">
              <div class="flex flex-ai-center flex-jc-between width">
                <span>Sequencer Balance: </span>
                <span>{{ replaceDecimalsFormat(balanceData?.sequencer?.balance) }} SWANC</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right s">
          <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'Sequencer')">Add</div>
        </el-col>
      </el-row>
      <div class="module-container">
        <div class="title">
          <p class="font-16 weight-4">Reward</p>
          <p class="font-12 subtitle">Reward total: {{ replaceFormat(totalReward) }}</p>
        </div>
        <div class='chart-trends' id='chart-reward' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-14">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { getCPsBalancesData, getCPsEchartsData } from "@/api/cp-profile";
import { signature } from "@/utils/storage"
import { dataCpData, dataGPU, getDateRange, replaceDecimalsFormat, replaceFormat, sumArrays } from "@/utils/common";
import * as echarts from "echarts"

const route = useRoute()
const bodyWidth = ref(document.body.clientWidth > 1440 ? 32 : 22)
const providersLoad = ref(false)
const weekList = reactive({
  value: 'Week',
  options: [
    {
      value: 'Week',
      label: '1 Week'
    },
    {
      value: 'Month',
      label: '1 Month'
    },
    {
      value: 'Year',
      label: '1 Year'
    }]
})
const totalJob = ref(0)
const totalReward = ref(0)
const balanceLoad = ref(false)
const balanceData = ref<any>({})

async function handleSelect (key:string, row:any, type:string) {
  switch (key) {
    case 'cpProfile':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'dialog'
      vmOperate.centerDrawerVisible = signature.value === '' ? false : true
      break;
  }
}
const changetype = async (data: any) => {
  const machart_job = echarts.init(document.getElementById("chart-job"));
  const machart_reward = echarts.init(document.getElementById("chart-reward"));
  
  const ecpSuccessData = await dataCpData(data.ecp_task, 'active')
  const ecpFaildData = await dataCpData(data.ecp_task, 'failed')
  const fcpSuccessData = await dataCpData(data.fcp_job, 'active')
  totalJob.value = sumArrays(ecpSuccessData.datum, fcpSuccessData.datum)

  const rewardData = await dataGPU(data.ecp_reward, 'active')
  const rewardTotalData = await dataGPU(data.ecp_reward, 'total')
  totalReward.value = sumArrays(rewardTotalData.datum, [])

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
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['ECP Job Failed', 'ECP Job Success', 'FCP Job Running'],
      right: document.documentElement.clientWidth >= 1280 ? '100px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '5px' : '25px',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: 11,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        // prettier-ignore
        data: ecpSuccessData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'Job Success'
      },
      {
        type: 'value',
        // name: 'FCP Job Running'
      }
    ],
    series: [
      {
        name: 'ECP Job Failed',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        data: ecpFaildData.datum,
        color: '#0000bf'
      },
      {
        name: 'ECP Job Success',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        data: ecpSuccessData.datum,
        color: '#56cfb2'
      },
      {
        name: 'FCP Job Running',
        type: 'line',
        smooth: false,
        showSymbol: false,
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value;
          }
        },
        data: fcpSuccessData.datum,
        color: '#8ae664'
      }
    ]
  }
  const option2 = {
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
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>'; // 系列名和对应的值
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + item.value  + '<br/>'; // 系列名和对应的值
        });
        return result;
      }
    },
    legend: {
      data: ['Used Reward', 'Total Reward'],
      right: document.documentElement.clientWidth >= 1280 ? '100px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '5px' : '25px',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: 11,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false
      },
      data: rewardData.timeArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Used Reward',
        type: 'line',
        smooth: false,
        showSymbol: false,
        data: rewardData.datum,
        color: '#61a5e8'
      },
      {
        name: 'Total Reward',
        type: 'line',
        smooth: false,
        showSymbol: false,
        data: rewardTotalData.datum,
        color: '#0000ff'
      }
    ]
  }
  machart_job.setOption(option1);
  machart_reward.setOption(option2);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_job.resize();
        machart_reward.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_job.resize();
    machart_reward.resize();
  })
}
async function initEcharts () {
  try{
    providersLoad.value = true

    const weekRange = getDateRange(weekList.value);
    const params = {
      from: weekRange.start,
      to: weekRange.end
    }
    const echartsRes = await getCPsEchartsData(params, route.params.cp_addr)
    const data = echartsRes?.data ?? {}
    changetype(data)
  }catch{ providersLoad.value = false}
}
async function getCPsBalanceData() {
  balanceLoad.value = true
  try{
    const balanceRes = await getCPsBalancesData(route.params.cp_addr)
    balanceData.value = balanceRes?.data ?? {}
  }catch{console.error}
  balanceLoad.value = false
}
onMounted(async () => {
  getCPsBalanceData()
  initEcharts()
})
watch(route, (to:any) => {
  if (to.name === "accountInfo") {
    getCPsBalanceData()
    initEcharts()
  }
})

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
.el-row {
  .el-col {
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
