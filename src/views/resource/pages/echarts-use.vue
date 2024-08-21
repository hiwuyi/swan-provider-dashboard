<template>
  <el-row :gutter="12">
    <el-col v-loading="providersLoad" :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <el-row class="width">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">GPU Usage</p>
            <div class='chart-trends' id='chart-gpu' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">CPU Usage</p>
            <div class='chart-trends' id='chart-cpu' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">Memory Usage (TB)</p>
            <div class='chart-trends' id='chart-memory' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">Storage Usage (TB)</p>
            <div class='chart-trends' id='chart-storage' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col v-loading="cpLoad" :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
      <div :class="`grid-content ${false? 'none' : ''}`">
        <div class='chart-trends big' id='chart-Resource' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-12">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { statsEchartsData } from '@/api/overview';
import { dataResource, getDateRange, replaceFormat, sizeChange, byteTBStorage } from '@/utils/common';
import * as echarts from "echarts"

const props = withDefaults(
  defineProps<{
    echartData?: any
  }>(),
  {
    echartData: {}
  }
)

const cpLoad = ref(false)
const providersLoad = ref(true)
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
    },
    {
      value: 'all',
      label: 'All'
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
async function initResource () {
  try{
    providersLoad.value = true
    changePietype(props.echartData)
  }catch{providersLoad.value = false}
}
const changetype = async (data: any) => {
  try{
    const machart_resource = echarts.init(document.getElementById("chart-Resource"));

    const gpuData = await dataResource(data.gpu, 'active')
    const cpuData = await dataResource(data.cpu, 'active')
    const memoryData = await dataResource(data.memory, 'active')
    const storageData = await dataResource(data.storage, 'active')

    const option1 = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        color: '#fff',
        borderWidth: 0,
        borderRadius: 9,
        textStyle: {
          color: '#fff',
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          fontFamily: 'HELVETICA-ROMAN'
        },
        icon: 'roundRect',
        formatter: function (params: any) {
          var result = params[0].name + '<br/>';
          params.forEach(function (item: any) {
            const unit = item.seriesName === "CPU" || item.seriesName === "GPU" ? item.seriesName : ''
            const used = item.seriesName === "CPU" || item.seriesName === "GPU" ? replaceFormat(item.data.used) : sizeChange(item.data.used)
            const total = item.seriesName === "CPU" || item.seriesName === "GPU" ? replaceFormat(item.data.total) : sizeChange(item.data.total)
            var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
            let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
            result += colorDot + item.seriesName + ' Usage: ' + item.value + '% &nbsp; ' + used + '/' + total + ' ' + unit + '<br/>';
          });
          return result;
        }
      },
      legend: {
        data: ['CPU', 'Memory', 'Storage', 'GPU'],
        right: 'auto',
        bottom: '0',
        // icon: 'circle',
        // itemWidth: 10,
        // itemHeight: 10,
        itemGap: document.documentElement.clientWidth >= 768 ? 20 : 0,
        textStyle: {
          color: '#95a3bd',
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
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
        top: '13%',
        bottom: '13%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(gpuData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          }
          // rotate: 45,
          // formatter: function (value, index) {
          //     return value;
          // }
        },
        data: gpuData.timeArr
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          formatter: '{value}%'
          //   formatter: '{value}'
        },
        // minInterval: 50
      },
      series: [
        {
          name: 'CPU',
          type: 'line',
          data: cpuData.datum,
          color: '#699bff',
          showSymbol: true,
          smooth: false
        },
        {
          name: 'Memory',
          type: 'line',
          data: memoryData.datum,
          color: '#52ce7c',
          showSymbol: true,
          smooth: false
        },
        {
          name: 'Storage',
          type: 'line',
          data: storageData.datum,
          color: '#0046b7',
          showSymbol: true,
          smooth: false
        },
        {
          name: 'GPU',
          type: 'line',
          data: gpuData.datum,
          color: '#93c605',
          showSymbol: true,
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
    }
    window.addEventListener("resize", function () {
      machart_resource.resize();
    })
  }catch{console.error}
  cpLoad.value = false
}
const changePietype = async (data: any) => {
  try{
    const chart_gpu = echarts.init(document.getElementById("chart-gpu"));
    const chart_cpu = echarts.init(document.getElementById("chart-cpu"));
    const chart_memory = echarts.init(document.getElementById("chart-memory"));
    const chart_storage = echarts.init(document.getElementById("chart-storage"));

    totalAll.gpu.used = Number(data.gpu.total - data.gpu.active)
    totalAll.gpu.total = Number(data.gpu.total)
    totalAll.cpu.used = Number(data.cpu.total - data.cpu.active)
    totalAll.cpu.total = Number(data.cpu.total)
    totalAll.memory.used = Number(data.memory.total - data.memory.active)
    totalAll.memory.total = Number(data.memory.total)
    totalAll.storage.used = Number(data.storage.total - data.storage.active)
    totalAll.storage.total = Number(data.storage.total)

    const option = {
      tooltip: {
        trigger: 'item',
        position: function (point: any) {
          return [point[0] + 10, point[1] - 10]; 
        },
        formatter: function (params: any) {
          return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${replaceFormat(params.data.value)}</div>`;
        },
        backgroundColor: 'rgba(0, 0, 0, 1)',
        color: '#fff',
        borderWidth: 0,
        borderRadius: 9,
        textStyle: {
          color: '#fff',
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          fontFamily: 'HELVETICA-ROMAN'
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        show: false
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: totalAll.gpu.used, name: 'Used' },
            { value: totalAll.gpu.total-totalAll.gpu.used, name: 'Free' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: function (params: any) {
                return `${replaceFormat(params.data.value)} ${params.data.name}`;
              },
              fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
              alignTo: 'edge',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 10,
            }
          },
          labelLine: {
            normal: {
              length: 6,
              length2: 6,
              smooth: 1
            }
          },
        }
      ]
    }
    const option2 = JSON.parse(JSON.stringify(option))
    const option3 = JSON.parse(JSON.stringify(option))
    const option4 = JSON.parse(JSON.stringify(option))
    option2.series[0].data = [
      { value: totalAll.cpu.used, name: 'Used' },
      { value: totalAll.cpu.total-totalAll.cpu.used, name: 'Free' }
    ]
    option2.series[0].tooltip = {
      formatter: function (params: any) {
        return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${replaceFormat(params.data.value)}</div>`;
      }
    }
    option2.series[0].label.normal.formatter = function (params: any) {
      return `${replaceFormat(params.data.value)} ${params.data.name}`
    }
    option3.series[0].data = [
      { value: totalAll.memory.used, name: 'Used' },
      { value: totalAll.memory.total-totalAll.memory.used, name: 'Free' }
    ]
    option3.series[0].label.normal.formatter = function (params: any) {
      return `${ replaceFormat(byteTBStorage(params.data.value))} ${params.data.name}`;
    }
    option3.series[0].tooltip = {
      formatter: function (params: any) {
        return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${sizeChange(params.data.value)}</div>`;
      }
    }
    option4.series[0].data = [
      { value: totalAll.storage.used, name: 'Used' },
      { value: totalAll.storage.total-totalAll.storage.used, name: 'Free' }
    ]
    option4.series[0].label.normal.formatter = function (params: any) {
      return `${ replaceFormat(byteTBStorage(params.data.value))} ${params.data.name}`;
    }
    option4.series[0].tooltip = {
      formatter: function (params: any) {
        return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${sizeChange(params.data.value)}</div>`;
      }
    }
    chart_gpu.setOption(option);
    chart_cpu.setOption(option2);
    chart_memory.setOption(option3);
    chart_storage.setOption(option4);
    if (typeof ResizeObserver !== 'undefined') {
      let observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          chart_gpu.resize();
          chart_cpu.resize();
          chart_memory.resize();
          chart_storage.resize();
        }
      });

      let element = document.getElementById('resource-container');
      observer.observe(element);
    } else {
      console.log('ResizeObserver is not supported in this browser.');
    }
    window.addEventListener("resize", function () {
      chart_gpu.resize();
      chart_cpu.resize();
      chart_memory.resize();
      chart_storage.resize();
    })
  }catch{console.error}
  providersLoad.value = false
}
onMounted(async () => {
  initEcharts()
})
watch(() => props.echartData, () => initResource())
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
      @media screen and (max-width: 767px) {
        width: 100%;
        padding: 0.18rem 0;
      }
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
              background: url(../../../assets/images/icons/icon-gpu.png)
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
      height: 2rem;
      @media screen and (max-width: 768px) {
        height: 220px;
      }
      @media screen and (max-width: 600px) {
        height: 200px;
      }
      &.big {
        height: 5rem;
        @media screen and (max-width: 768px) {
          height: 220px;
        }
      @media screen and (max-width: 767px) {
          width: 100%;
        }
      }
    }
  }
}
</style>
