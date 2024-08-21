<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-gpu"></i>
          <span class="font-16 weight-4">GPU</span>
        </div>
        <div class='chart-trends' id='chart-GPU' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-12">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-provider"></i>
          <span class="font-16 weight-4">Fog Computing Provider</span>
        </div>
        <div class='chart-trends' id='chart-Fog' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-12">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-resource"></i>
          <span class="font-16 weight-4">Resource</span>
        </div>
        <div class='chart-trends' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        <div class="date">
          <el-select v-model="weekList.value" placeholder="Select" size="small" @change="initEcharts">
            <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-12">{{item.label}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-provider"></i>
          <span class="font-16 weight-4">Edge Computing Provider</span>
        </div>
        <div class='chart-trends' id='chart-Edge' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
import * as echarts from "echarts"
import { statsEchartsData } from "@/api/overview"
import { dataDelta, dataGPU, dataResource, getDateRange, replaceFormat, sizeChange } from '@/utils/common';

const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const providersLoad = ref(false)
const cpLoad = ref(false)
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
  const machart_resource = echarts.init(document.getElementById("chart-Resource"));
  const machart_fog = echarts.init(document.getElementById("chart-Fog"));
  const machart_gpu = echarts.init(document.getElementById("chart-GPU"));
  const machart_edge = echarts.init(document.getElementById("chart-Edge"));

  const gpuData = await dataGPU(data.gpu, 'active')
  const gpuTotalData = await dataGPU(data.gpu, 'total')
  const gpuDataMax = Math.ceil(Math.max(...gpuData.datum)*1.1)
  const gpuNumber = Math.min(...gpuData.datum) >= 0 ? 0.9 : 1.1
  const gpuDataMin = Math.floor(Math.min(...gpuData.datum)*gpuNumber)
  const gpuDataInterval = Math.ceil((gpuDataMax-gpuDataMin)/(gpuDataMin===0?4:5))
  const gpuTotalMax = Math.ceil(Math.max(...gpuTotalData.datum)*1.1)
  const gpuTotalNumber = Math.min(...gpuTotalData.datum) >= 0 ? 0.9 : 1.1
  const gpuTotalMin = Math.floor(Math.min(...gpuTotalData.datum)*gpuTotalNumber)
  const gpuTotalInterval = Math.ceil((gpuTotalMax - gpuTotalMin) / 5)
  
  const cpuData = await dataResource(data.cpu, 'active')
  const memoryData = await dataResource(data.memory, 'active')
  const storageData = await dataResource(data.storage, 'active')

  const fcpData = await dataDelta(data.fcp, 'total')
  const fcpDeltaData = await dataDelta(data.fcp, 'delta')
  const fcpMax = Math.ceil(Math.max(...fcpData.datum) * 1.1)
  const fcpNumber = Math.min(...fcpData.datum) >= 0 ? 0.9 : 1.1
  const fcpMin = Math.floor(Math.min(...fcpData.datum)*fcpNumber)
  const fcpInterval = Math.ceil((fcpMax-fcpMin)/(fcpMin===0?4:5))
  const fcpDeltaMax = Math.ceil(Math.max(...fcpDeltaData.datum)*1.1);
  const fcpDeltaNumber = Math.min(...fcpDeltaData.datum) >= 0 ? 0.9 : 1.1
  const fcpDeltaMin = Math.floor(Math.min(...fcpDeltaData.datum)*fcpDeltaNumber)

  const ecpData = await dataDelta(data.ecp, 'total')
  const ecpDeltaData = await dataDelta(data.ecp, 'delta')
  const ecpMax = Math.ceil(Math.max(...ecpData.datum) * 1.1)
  const ecpNumber = Math.min(...ecpData.datum) >= 0 ? 0.9 : 1.1
  const ecpMin = Math.floor(Math.min(...ecpData.datum)*ecpNumber)
  const ecpInterval = Math.ceil((ecpMax-ecpMin)/(ecpMin===0?4:5))
  const ecpDeltaMax = Math.ceil(Math.max(...ecpDeltaData.datum)*1.1)
  const ecpDeltaNumber = Math.min(...ecpDeltaData.datum) >= 0 ? 0.9 : 1.1
  const ecpDeltaMin = Math.floor(Math.min(...ecpDeltaData.datum) * ecpDeltaNumber)

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
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          const unit = item.seriesName === "CPU" ? 'CPU' : ''
          const used = item.seriesName === "CPU" ? replaceFormat(item.data.used) : sizeChange(item.data.used)
          const total = item.seriesName === "CPU" ? replaceFormat(item.data.total) : sizeChange(item.data.total)
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ' Usage: ' + item.value + '% &nbsp; ' + used + '/' + total + ' ' + unit + '<br/>'; 
        });
        return result;
      }
    },
    legend: {
      data: ['CPU', 'Memory', 'Storage'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
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
      left: '0',
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
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        // interval: 6,
        color: '#7c889b',
        interval: function (index, value) {
          var count = 7;
          var step = Math.ceil(cpuData.timeArr.length / count); 
          return index % step === 0 ? value : false;
        },
        formatter: function (value) {
          return value.split(' ').join('\n');
        }
      },
      data: cpuData.timeArr
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        color: '#7c889b',
        formatter: '{value}%'
      },
      splitNumber: 4
      // interval: 10
    },
    series: [
      {
        name: 'CPU',
        type: 'line',
        showSymbol: true,
        smooth: false,
        data: cpuData.datum,
        color: '#699bff'
      },
      {
        name: 'Memory',
        type: 'line',
        showSymbol: true,
        smooth: false,
        data: memoryData.datum,
        color: '#52ce7c'
      },
      {
        name: 'Storage',
        type: 'line',
        showSymbol: true,
        smooth: false,
        data: storageData.datum,
        color: '#0046b7'
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
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color;
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + item.value + '<br/>';
        });
        return result;
      }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['FCP', 'Delta'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
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
    xAxis: [
      {
        type: 'category',
        data: fcpData.timeArr,
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          // interval: 6,
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(fcpData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          formatter: function (value) {
            return value.split(' ').join('\n');
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'FCP',
        // min: 0,
        // max: 240,
        // interval: 80,
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        min: fcpMin,
        max: fcpMax,
        interval: fcpInterval,
        // minInterval: 150,
      },
      {
        type: 'value',
        min: fcpDeltaMin,
        max: fcpDeltaMax,
        // minInterval: 20,
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        splitLine: {
            show: false 
        }
      }
    ],
    series: [
      {
        name: 'FCP',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        color: 'rgba(105,155,255,1)',
        data: fcpData.datum
      },
      {
        name: 'Delta',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 1,
        // tooltip: {
        //   valueFormatter: function (value) {
        //     return value + ' °C';
        //   }
        // },
        color: '#52ce7c',
        data: fcpDeltaData.datum
      }
    ]
  }
  const option3 = {
    // title: {
    //   left: '2%',
    //   text: 'GPU',
    //   textStyle: {
    //     color: '#000',
    //     fontStyle: 'normal',
    //     fontWeight: '400',
    //     fontFamily: 'HELVETICA-ROMAN',
    //     fontSize: 15
    //   }
    // },
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
        params.forEach(function (item: any, i: number) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color;
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>'; 
          if(i < 2) {
            var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
            let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
            result += colorDot + item.seriesName + ': ' + item.value  + '<br/>'; 
          }
        });
        return result;
      }
    },
    legend: {
      data: ['Used GPU', 'Total GPU'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
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
      left: '0',
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
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        // interval: 6,
        color: '#7c889b',
        interval: function (index, value) {
          var count = 7;
          var step = Math.ceil(gpuData.timeArr.length / count); 
          return index % step === 0 ? value : false;
        },
        formatter: function (value) {
          return value.split(' ').join('\n');
        }
      },
      data: gpuData.timeArr
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        color: '#7c889b',
        formatter: '{value}'
      },
      interval: gpuTotalInterval,
      min: gpuTotalMin,
      max: gpuTotalMax
    },{
      type: 'value',
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        color: '#7c889b',
        formatter: '{value}'
      },
      min: gpuDataMin,
      max: gpuDataMax,
      interval: gpuDataInterval,
      position: 'right',
      splitLine: {
          show: false 
      }
    }],
    series: [
      {
        name: 'Used GPU',
        type: 'line',
        showSymbol: true,
        yAxisIndex: 1,
        color: '#ed5da0',
        smooth: false,
        data: gpuData.datum
      },
      {
        name: 'Total GPU',
        type: 'line',
        showSymbol: true,
        yAxisIndex: 0,
        color: '#5871fa',
        smooth: false,
        data: gpuTotalData.datum
      }
    ]
  }
  const option4 = {
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
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + item.value + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['ECP', 'Delta'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
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
    xAxis: [
      {
        type: 'category',
        data: ecpData.timeArr,
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          // interval: 6,
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(ecpData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          formatter: function (value) {
            return value.split(' ').join('\n');
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'ECP',
        // min: 0,
        // max: 1500,
        // interval: 750,
        // axisLabel: {
        //   formatter: '{value}'
        // }
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        min: ecpMin,
        max: ecpMax,
        interval: ecpInterval
        // minInterval: 150
      },
      {
        type: 'value',
        min: ecpDeltaMin,
        max: ecpDeltaMax,
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        splitNumber: 4,
        splitLine: {
            show: false 
        },
        // minInterval: 20,
        // axisLabel: {
        //   formatter: '{value} °C'
        // }
      }
    ],
    series: [
      {
        name: 'ECP',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        color: 'rgba(147,198,5,1)',
        data: ecpData.datum
      },
      {
        name: 'Delta',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 1,
        // tooltip: {
        //   valueFormatter: function (value) {
        //     return value + ' °C';
        //   }
        // },
        color: '#0046b7',
        data: ecpDeltaData.datum
      }
    ]
  }
  machart_resource.setOption(option1);
  machart_fog.setOption(option2);
  machart_gpu.setOption(option3);
  machart_edge.setOption(option4);

  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        // console.log(`Element resized to width: ${width}, height: ${height}`);
        machart_resource.resize();
        machart_fog.resize();
        machart_gpu.resize();
        machart_edge.resize();
      }
    });

    let element = document.getElementById('main-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_resource.resize();
    machart_fog.resize();
    machart_gpu.resize();
    machart_edge.resize();
  })
  cpLoad.value = false
}
onMounted(async () => {
  providersLoad.value = false
  initEcharts()
})
</script>

<style lang="less" scoped>
.el-row {
  .el-col {
    margin: 0.1rem 0;
    &.flex {
      display: flex;
    }
    .module-container {
      position: relative;
      width: calc(100% - 0.64rem);
      height: calc(100% - 0.5rem);
      padding: 0.25rem 0.32rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      @media screen and (max-width: 768px) {
      }
      &.world {
        width: 100%;
        height: 100%;
        min-height: 4.2rem;
        padding: 0;
        background-color: var(--color-primary);
        .title {
          position: absolute;
          left: 0.25rem;
          right: 0.25rem;
          top: 0.32rem;
          width: auto;
          color: var(--color-light);
          z-index: 9;
        }
      }
      .el-col {
        margin: 0;
      }
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
          &.icon-world {
            background: url(../../../assets/images/icons/icon-05.png)
              no-repeat;
            background-size: 100%;
          }
          &.icon-figures {
            background: url(../../../assets/images/icons/icon-04.png)
              no-repeat;
            background-size: 100%;
          }
          &.icon-gpu {
            background: url(../../../assets/images/icons/icon-08.png)
              no-repeat;
            background-size: 100%;
          }
          &.icon-resource {
            background: url(../../../assets/images/icons/icon-06.png)
              no-repeat;
            background-size: 100%;
          }
          &.icon-provider {
            background: url(../../../assets/images/icons/icon-07.png)
              no-repeat;
            background-size: 100%;
          }
          &.icon-list {
            background: url(../../../assets/images/icons/icon-09.png)
              no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    h6 {
      width: 100%;
      line-height: 1.2;
      text-transform: capitalize;
      color: #7c889b;
      &.t {
        width: auto;
        padding: 0.03rem 0.16rem 0;
      }
      &.up {
        color: #38a169;
      }
      &.down {
        color: #e53e3e;
      }
      small {
        margin: 0;
        font-family: "Montserrat-Regular";
        font-weight: normal;
        color: #a0a0a0;
        font-size: 0.14rem;
        @media screen and (min-width: 1800px) {
          font-size: 0.16rem;
        }
        @media screen and (max-width: 768px) {
          font-size: 13px;
        }
      }
      small {
        margin: 0 0 0 5px;
        font-family: "Montserrat-Regular";
        font-weight: normal;
        color: #a0a0a0;
        font-size: 0.13rem;
        @media screen and (min-width: 1800px) {
          font-size: 0.15rem;
        }
        @media screen and (max-width: 768px) {
          font-size: 12px;
        }
      }
      .el-select {
        width: auto;
        font-size: inherit;
        .el-tooltip__trigger {
          width: 40px;
          padding: 2px 4px;
          margin: 0 3px 0 0;
          background-color: transparent;
        }
        .el-select__wrapper {
          font-size: inherit;
        }
      }
    }
    b {
      position: relative;
      padding: 0.1rem 0 0;
      margin: 0;
      line-height: 1;
      small {
        margin: 0 0 0 4px;
        font-size: 0.16rem;
        @media screen and (min-width: 1800px) {
          font-size: 0.18rem;
        }
        @media screen and (max-width: 768px) {
          font-size: 15px;
        }
      }
    }
    .chart-trends {
      width: 100%;
      margin: -0.25rem auto 0;
      height: 2.3rem;
      @media screen and (min-width: 3600px) {
        height: 350px;
      }
      @media screen and (max-width: 1440px) {
        margin: -0.3rem auto 0;
      }
      @media screen and (max-width: 768px) {
        height: 250px;
      }
      @media screen and (max-width: 600px) {
        height: 200px;
      }
    }
  }
}
</style>
