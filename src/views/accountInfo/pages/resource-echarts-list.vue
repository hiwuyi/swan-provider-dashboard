<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-24">
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-gpu"></i>
          <span class="font-16 weight-4">GPU</span>
        </div>
        <div class='chart-trends' id='chart-GPU' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
      <div class="module-container">
        <div class="title flex flex-ai-center">
          <i class="icon icon-resource"></i>
          <span class="font-16 weight-4">Resource</span>
        </div>
        <div class='chart-trends' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
import { getCPsEchartsData } from "@/api/cp-profile";
import { dataGPU, dataResource, getDateRange, replaceFormat, sizeChange } from "@/utils/common";
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
  const machart_resource = echarts.init(document.getElementById("chart-Resource"));
  const machart_gpu = echarts.init(document.getElementById("chart-GPU"))

  const gpuData = await dataGPU(data.gpu, 'active')
  const gpuTotalData = await dataGPU(data.gpu, 'total')

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
        fontSize: 11,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        // params 是一个数组，包含了每个系列的数据信息
        var result = params[0].name + '<br/>'; // X轴的值
        params.forEach(function (item) {
          // 遍历每个系列的数据
          const unit = item.seriesName === "CPU" ? 'CPU' : 'GiB'
          const used = item.seriesName === "CPU" ? replaceFormat(item.data.used) : replaceFormat(sizeChange(item.data.used, 'GB'))
          const total = item.seriesName === "CPU" ? replaceFormat(item.data.total) : replaceFormat(sizeChange(item.data.total, 'GB'))
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ' Usage: ' + item.value + '% ' + used + '/' + total + ' ' + unit + '<br/>'; // 系列名和对应的值
        });
        return result;
      }
    },
    legend: {
      data: ['CPU', 'Memory', 'Storage'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
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
        fontSize: 12,
        // interval: 6,
        color: '#7c889b',
        formatter: function (value) {
          // 使用字符串的 replace 方法将空格替换为换行符
          return value.split(' ').join('\n');
        }
      },
      data: cpuData.timeArr
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: '#7c889b',
        // 使用 formatter 函数格式化标签
        formatter: '{value}%'
      },
      interval: 50
    },
    series: [
      {
        name: 'CPU',
        type: 'line',
        showSymbol: false,
        smooth: false,
        data: cpuData.datum,
        color: '#699bff'
      },
      {
        name: 'Memory',
        type: 'line',
        showSymbol: false,
        smooth: false,
        data: memoryData.datum,
        color: '#52ce7c'
      },
      {
        name: 'Storage',
        type: 'line',
        showSymbol: false,
        smooth: false,
        data: storageData.datum,
        color: '#0046b7'
      }
    ]
  }
  const option2 = {
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
      data: ['Used GPU', 'Total GPU'],
      right: document.documentElement.clientWidth >= 1280 ? '110px' : 'auto',
      top: document.documentElement.clientWidth >= 1280 ? '0' : '25px',
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
        fontSize: 12,
        interval: 6,
        color: '#7c889b',
        formatter: function (value) {
          // 使用字符串的 replace 方法将空格替换为换行符
          return value.split(' ').join('\n');
        }
      },
      data: gpuData.timeArr
    },
    yAxis: {
      type: 'value',
      max: 100,
      min: 0,
      axisLine: {
        onZero: true
      },
      axisLabel: {
        fontSize: 12,
        fontWeight: 400,
        color: '#7c889b',
        formatter: '{value}'
      },
      interval: 50,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EAEAEA',
          width: 2
        }
      }
    },
    series: [
      {
        name: 'Used GPU',
        type: 'line',
        showSymbol: false,
        color: '#a801a1',
        smooth: false,
        data: gpuData.datum
      },
      {
        name: 'Total GPU',
        type: 'line',
        showSymbol: false,
        color: '#93c605',
        smooth: false,
        data: gpuTotalData.datum
      }
    ]
  }
  machart_resource.setOption(option1);
  machart_gpu.setOption(option2);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_resource.resize();
        machart_gpu.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_resource.resize();
    machart_gpu.resize();
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
watch(route, (to:any) => {
  if (to.name === "accountInfo") initEcharts()
})
</script>

<style lang="less" scoped>
.el-row {
  .el-col {
    margin: 0.23rem 0;
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
