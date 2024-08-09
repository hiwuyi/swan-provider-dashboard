<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-24">
      <div class="module-container">
        <div class="title">
          <p class="font-16 weight-4">Job Status</p>
          <p class="font-12 subtitle">Completion total: 101</p>
        </div>
        <div class='chart-trends' id='chart-job' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-14">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-24">
      <div class="module-container">
        <div class="title">
          <p class="font-16 weight-4">Reward</p>
          <p class="font-12 subtitle">Reward total: 87</p>
        </div>
        <div class='chart-trends' id='chart-reward' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small">
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
import { getCPsEchartsData } from "@/api/cp-profile";
import { getDateRange } from "@/utils/common";
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

const changetype = async (data: any) => {
  const machart_job = echarts.init(document.getElementById("chart-job"));
  const machart_reward = echarts.init(document.getElementById("chart-reward"));
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
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        data: [],
        color: '#0000bf'
      },
      {
        name: 'ECP Job Success',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        data: [],
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
        data: [],
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
    },
    legend: {
      data: ['Daily reward', 'Waiting'],
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
      data: ['8/01', '8/02', '8/03', '8/04', '8/05', '8/06', '8/07']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Daily reward',
        type: 'line',
        smooth: false,
        showSymbol: false,
        data: [],
        color: '#61a5e8'
      },
      {
        name: 'Waiting',
        type: 'line',
        smooth: false,
        showSymbol: false,
        data: [],
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
onMounted(async () => {
  initEcharts()
})
</script>

<style lang="less" scoped>
#cp-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .copy-style {
    cursor: pointer;
    flex-wrap: wrap;
    svg {
      margin: 0 0 0 0.05rem;
    }
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .s {
      height: calc(100% - 0.4rem) !important;
      margin: 0 !important;
    }
    .providers {
      margin: 0.08rem 0 0.18rem;
    }
    .providers-cp {
      height: calc(100% - 0.8rem);
      padding: 0.3rem 0.35rem 0.1rem;
      margin: 0.4rem 0 0;
      background-color: var(--color-light);
      border-radius: 0.2rem;
    }
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
    .search-body {
      margin: 0 0 0.2rem;
      .tabs-container {
        .tabs-button {
          top: 0;
        }
      }
    }
  }
}
</style>
