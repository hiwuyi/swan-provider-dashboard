<template>
  <el-row class="re-list mb-24 font-14">
    <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
      <p>Total Number Of Node:</p>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p>{{ props.cpsData.resources ? replaceFormat(props.cpsData.resources.length) : '-'}}</p>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="flex flex-ai-center baseline">
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
  
  <el-row :gutter="12" v-loading="cpLoad">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline mb-10">
      <el-row class="width">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">GPU Usage</p>
            <div class='chart-trends' id='chart-gpu' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">CPU Usage</p>
            <div class='chart-trends' id='chart-cpu' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">Memory Usage (GiB)</p>
            <div class='chart-trends' id='chart-memory' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
          <div class="grid-content small-spacing text-center font-20">
            <p class="font-14 text-center mb-12">Storage Usage (GiB)</p>
            <div class='chart-trends' id='chart-storage' element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { byteStorage, replaceFormat, sizeChange } from '@/utils/common';
import * as echarts from "echarts"

const route = useRoute()
const cpLoad = ref(false)
const totalAll = reactive({
  gpu: {
    used: 0,
    free: 0,
    total: 0
  },
  cpu: {
    used: 0,
    free: 0,
    total: 0
  },
  storage: {
    used: 0,
    free: 0,
    total: 0
  },
  memory: {
    used: 0,
    free: 0,
    total: 0
  }
})

async function initEcharts () {
  try{
    cpLoad.value = true
    props.cpsData.resources.forEach((item: any) => {
      try{
        item.gpu.gpus.forEach((gpu: any) => { 
          totalAll.gpu.used += Number(gpu.total - gpu.free)
          totalAll.gpu.free += Number(gpu.free)
          totalAll.gpu.total += Number(gpu.total)
        })
      } catch { console.error }
      totalAll.cpu.used += Number(item.cpu.total - item.cpu.free)
      totalAll.cpu.free += Number(item.cpu.free)
      totalAll.cpu.total += Number(item.cpu.total)
      totalAll.memory.used += Number(item.memory.total - item.memory.free)
      totalAll.memory.free += Number(item.memory.free)
      totalAll.memory.total += Number(item.memory.total)
      totalAll.storage.used += Number(item.storage.total - item.storage.free)
      totalAll.storage.free += Number(item.storage.free)
      totalAll.storage.total += Number(item.storage.total)
    })

    changetype()
  }catch{ cpLoad.value = false}
}
const changetype = async () => {
  try{
    const chart_gpu = echarts.init(document.getElementById("chart-gpu"));
    const chart_cpu = echarts.init(document.getElementById("chart-cpu"));
    const chart_memory = echarts.init(document.getElementById("chart-memory"));
    const chart_storage = echarts.init(document.getElementById("chart-storage"));

    const option1 = {
      tooltip: {
        trigger: 'item',
        position: function (point: any) {
          return [point[0] + 10, point[1] - 10]; 
        },
        formatter: function (params: any) {
          // ${params.seriesName}<br/>
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
      color: [totalAll.gpu.used.toString() === '0'?'#727272':'#02a7f1', totalAll.gpu.free.toString() === '0'?'#989898':'#56cfb2'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: totalAll.gpu.used, name: 'Used' },
            { value: totalAll.gpu.free, name: 'Free' }
          ],
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
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const option2 = JSON.parse(JSON.stringify(option1))
    const option3 = JSON.parse(JSON.stringify(option1))
    const option4 = JSON.parse(JSON.stringify(option1))
    option2.series[0].data = [
      { value: totalAll.cpu.used, name: 'Used' },
      { value: totalAll.cpu.free, name: 'Free' }
    ]
    option2.color = [totalAll.cpu.used.toString() === '0'?'#727272':'#02a7f1', totalAll.cpu.free.toString() === '0'?'#989898':'#56cfb2'],
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
      { value: totalAll.memory.free, name: 'Free' }
    ]
    option3.color = [totalAll.memory.used.toString() === '0'?'#727272':'#02a7f1', totalAll.memory.free.toString() === '0'?'#989898':'#56cfb2'],
    option3.series[0].label.normal.formatter = function (params: any) {
      return `${ replaceFormat(byteStorage(params.data.value))} ${params.data.name}`;
    }
    option3.series[0].tooltip = {
      formatter: function (params: any) {
        return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${sizeChange(params.data.value)}</div>`;
      }
    }
    option4.series[0].data = [
      { value: totalAll.storage.used, name: 'Used' },
      { value: totalAll.storage.free, name: 'Free' }
    ]
    option4.color = [totalAll.storage.used.toString() === '0'?'#727272':'#02a7f1', totalAll.storage.free.toString() === '0'?'#989898':'#56cfb2'],
    option4.series[0].label.normal.formatter = function (params: any) {
      return `${ replaceFormat(byteStorage(params.data.value))} ${params.data.name}`;
    }
    option4.series[0].tooltip = {
      formatter: function (params: any) {
        return `<div class="flex flex-ai-center">${params.marker}${params.data.name}: ${sizeChange(params.data.value)}</div>`;
      }
    }
    chart_gpu.setOption(option1);
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

      let element = document.getElementById('cp-container');
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
  cpLoad.value = false
}
const reset = () => {
  totalAll.gpu.used = 0
  totalAll.gpu.free = 0
  totalAll.gpu.total = 0
  totalAll.cpu.used = 0
  totalAll.cpu.free = 0
  totalAll.cpu.total = 0
  totalAll.memory.used = 0
  totalAll.memory.free = 0
  totalAll.memory.total = 0
  totalAll.storage.used = 0
  totalAll.storage.free = 0
  totalAll.storage.total = 0
  initEcharts()
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
watch(() => props.cpsData, () => {
  reset()
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
            stroke: #49ad6b;
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
        color: #8c8c8c;
      }
      .color-cpu {
        color: #8c8c8c;
      }
      .color-memory {
        color: #8c8c8c;
      }
      .color-storage {
        color: #8c8c8c;
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
        height: 2.7rem;
        @media screen and (max-width: 768px) {
          height: 280px;
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
