<template>
  <el-row :gutter="12" v-loading="cpLoad">
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="title flex flex-ai-center">
        <i class="icon icon-use"></i>
        <span class="font-16 weight-4">Current Resource Use</span>
      </div>
      <el-row class="width">
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">GPU Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.gpu.used/totalAll.gpu.total))" :width="104" :stroke-width="21" color="#93c605" class="color-gpu" />
            <!-- <div class='chart-trends' id='chart-gpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-gpu">{{ replaceFormat(totalAll.gpu.used) }}</span> Used {{ replaceFormat(totalAll.gpu.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">CPU Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.cpu.used/totalAll.cpu.total))" :width="104" :stroke-width="21" color="#699bff" class="color-cpu" />
            <!-- <div class='chart-trends' id='chart-cpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-cpu">{{ replaceFormat(totalAll.cpu.used) }}</span> Used {{ replaceFormat(totalAll.cpu.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">Memory Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.memory.used/totalAll.memory.total))" :width="104" :stroke-width="21" color="#52ce7c" class="color-memory" />
            <!-- <div class='chart-trends' id='chart-memory' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-memory">{{ sizeChange(totalAll.memory.used) }}</span> Used {{ sizeChange(totalAll.memory.total) }} Free</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-12 text-center">Storage Usage</p>
            <el-progress type="circle" stroke-linecap="butt" :percentage="Number(unifyNumber(totalAll.storage.used/totalAll.storage.total))" :width="104" :stroke-width="21" color="#0046b7" class="color-storage" />
            <!-- <div class='chart-trends' id='chart-storage' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
            <p class="font-12 text-center desc">
              <span class="color-storage">{{ sizeChange(totalAll.storage.used) }}</span> Used {{ sizeChange(totalAll.storage.total) }} Free</p>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div class="grid-content none">
        <div class='chart-trends big' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
import { statsEchartsData } from '@/api/overview';
import { dataResource, getDateRange, replaceFormat, byteStorage, unifyNumber, sizeChange } from '@/utils/common';
import * as echarts from "echarts"

const cpLoad = ref(false)
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
const totalAll = reactive({
  gpu: {
    used: 0,
    total: 0
  },
  cpu: {
    used: 0,
    total: 0
  },
  storage: {
    used: 0,
    total: 0
  },
  memory: {
    used: 0,
    total: 0
  }
})

async function initEcharts () {
  try{
    cpLoad.value = true

    const weekRange = getDateRange(weekList.value);
    const params = {
      from: weekRange.start,
      to: weekRange.end
    }
    const echartsRes = await statsEchartsData(params)
    const data = echartsRes?.data ?? {}
    changetype(data)
  }catch{ cpLoad.value = false}
}
const changetype = async (data: any) => {
  try{
    const machart_resource = echarts.init(document.getElementById("chart-Resource"));

    const gpuData = await dataResource(data.gpu, 'active')
    const cpuData = await dataResource(data.cpu, 'active')
    const memoryData = await dataResource(data.memory, 'active')
    const storageData = await dataResource(data.storage, 'active')
    totalAll.gpu.used = gpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.gpu.total = gpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.cpu.used = cpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.cpu.total = cpuData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.memory.used = memoryData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.memory.total = memoryData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    totalAll.storage.used = storageData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.used, 0);
    totalAll.storage.total = storageData.datum.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

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
        formatter: function (params: any) {
          // params 是一个数组，包含了每个系列的数据信息
          var result = params[0].name + '<br/>'; // X轴的值
          params.forEach(function (item: any) {
            // 遍历每个系列的数据
            const unit = item.seriesName === "CPU" || item.seriesName === "GPU" ? item.seriesName : ''
            const used = item.seriesName === "CPU" || item.seriesName === "GPU" ? replaceFormat(item.data.used) : sizeChange(item.data.used)
            const total = item.seriesName === "CPU" || item.seriesName === "GPU" ? replaceFormat(item.data.total) : sizeChange(item.data.total)
            var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
            let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
            result += colorDot + item.seriesName + ' Usage: ' + item.value + '% &nbsp; ' + used + '/' + total + ' ' + unit + '<br/>'; // 系列名和对应的值
          });
          return result;
        }
      },
      legend: {
        data: ['CPU', 'Memory', 'Storage', 'GPU'],
        right: document.documentElement.clientWidth >= 1280 ? '130px' : 'auto',
        top: document.documentElement.clientWidth >= 1280 ? '3px' : '25px',
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
        data: gpuData.timeArr
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
          data: cpuData.datum,
          color: '#699bff',
          showSymbol: false,
          smooth: false
        },
        {
          name: 'Memory',
          type: 'line',
          data: memoryData.datum,
          color: '#52ce7c',
          showSymbol: false,
          smooth: false
        },
        {
          name: 'Storage',
          type: 'line',
          data: storageData.datum,
          color: '#0046b7',
          showSymbol: false,
          smooth: false
        },
        {
          name: 'GPU',
          type: 'line',
          data: gpuData.datum,
          color: '#93c605',
          showSymbol: false,
          smooth: false
        }
      ]
    }
    machart_resource.setOption(option1);
    if (typeof ResizeObserver !== 'undefined') {
      let observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          machart_resource.resize();
        }
      });

      let element = document.getElementById('resource-container');
      observer.observe(element);
    } else {
      console.log('ResizeObserver is not supported in this browser.');
    }
    window.addEventListener("resize", function () {
      machart_resource.resize();
    })
  }catch{console.error}
  cpLoad.value = false
}
onMounted(async () => {
  initEcharts()
})
</script>

<style lang="less" scoped>
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
    &.icon-use {
      background: url(../../../assets/images/icons/icon-06.png) no-repeat;
      background-size: 100%;
    }
  }
}
.el-row {
  :deep(.el-col) {
    &.flex {
      display: flex;
    }
    .grid-content {
      position: relative;
      width: calc(100% - 0.48rem);
      height: calc(100% - 0.36rem);
      padding: 0.18rem 0.24rem;
      background: var(--color-light);
      border-radius: 0.18rem;
      // box-shadow: 0 0 12px #e6e7eb;
      &.small-spacing {
        width: calc(100% - 0.1rem);
        padding: 0.18rem 0.05rem;
        .el-progress {
          margin: 0.1rem auto 0.16rem;
          .el-progress__circle,
          .el-progress-circle__track {
            border-radius: 0 !important;
          }
          .el-progress-circle__track {
            // stroke: #7c889b;
            stroke: #d7d7d7;
          }
          .el-progress__text {
            font-family: inherit;
            font-size: inherit !important;
            font-weight: bold;
            color: inherit;
          }
        }
      }
      &.none {
        width: calc(100% - 0.3rem);
        height: 100%;
        padding: 0 0 0 0.3rem;
        @media screen and (max-width: 768px) {
          width: 100%;
          padding: 0;
        }
      }
      .el-col {
        margin: 0.1rem 0 0;
      }
      .top {
        margin: 0;
        .left {
          .icon {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 0.07rem 0 0;
            &.icon-gpu {
              background: url(../../assets/images/icons/icon-gpu.png)
                no-repeat center;
              background-size: 100%;
            }
          }
        }
        .right {
          .text {
            margin: 0 0 0 0.2rem;
            white-space: nowrap;
            line-height: 1;
            span {
              color: #76b900;
            }
          }
          .small-text {
            margin: 0 0 0 0.14rem;
            color: var(--color-border);
          }
        }
      }
      .content {
        a {
          width: 100%;
          padding: 0.08rem 0;
          background-color: #edf2ff;
          border: 1px solid #a8c2ff;
          border-radius: 0.5rem;
          color: var(--color-primary);
          line-height: 1;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            margin: 0.2rem 0 0.1rem;
          }
          &.is-disabled {
            background-color: #f3f4f8;
            border-color: #c6cedc;
            color: #ababab;
            cursor: no-drop;
            pointer-events: none;
          }
        }
      }
      .desc {
        color: #7c889b;
      }
      .color-gpu {
        color: #93c605;
      }
      .color-cpu {
        color: #699bff;
      }
      .color-memory {
        color: #52ce7c;
      }
      .color-storage {
        color: #0046b7;
      }
    }
    .date {
      top: 0;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 1.3rem;
      @media screen and (max-width: 768px) {
        height: 150px;
      }
      @media screen and (max-width: 600px) {
        height: 200px;
      }
      &.big {
        height: 2.7rem;
        @media screen and (max-width: 768px) {
          height: 280px;
        }
      }
    }
  }
}
</style>
