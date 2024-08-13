<template>
  <el-row :gutter="bodyWidth">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-10">
      <div class="module-container">
        <div class="m w-100 flex flex-ai-start flex-jc-between">
          <div class='chart-pie' id='chart-pie-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          <div class="chart-pie-balance flex flex-ai-start baseline">
            <el-row class="m w-100">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width border">
                  <span class="font-18">FCP</span>
                  <div :class="{'collateral m blue':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'FCP')">Add Collateral</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Collateral:</span>
                  <span class="text-right">{{ replaceDecimalsFormat(balanceData?.fcp_collateral?.balance) }} SWANC</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Escrow: </span>
                  <span>{{ replaceDecimalsFormat(balanceData?.fcp_collateral?.locked) }} SWANC</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Total Reward: </span>
                  <span>{{ replaceDecimalsFormat(Number(balanceData?.fcp_collateral?.locked) + Number(balanceData?.fcp_collateral?.balance)) }} SWANC</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="module-echarts mt-32 mb-32">
          <div class="title">
            <p class="font-16 weight-4">Job Stats</p>
            <p class="font-12 subtitle">Total Jobs: {{ replaceFormat(totalJob) }}</p>
          </div>
          <div class='chart-trends' id='chart-job-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        </div>
        <div class="module-echarts">
          <div class="title">
            <p class="font-16 weight-4">Collateral</p>
          </div>
          <div class='chart-trends' id='chart-collateral-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        </div>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-10">
      <div class="module-container">
        <div class="m w-100 flex flex-ai-start flex-jc-between">
          <div class='chart-pie' id='chart-pie-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          <div class="chart-pie-balance flex flex-ai-start baseline">
            <el-row class="m w-100">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width border">
                  <span class="font-18">ECP</span>
                  <div :class="{'collateral m blue':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'ECP')">Add Collateral</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Collateral:</span>
                  <span class="text-right">{{ replaceDecimalsFormat(balanceData?.ecp_collateral?.balance) }} SWANC</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Escrow: </span>
                  <span>{{ replaceDecimalsFormat(balanceData?.ecp_collateral?.locked) }} SWANC</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <span>Total Reward: </span>
                  <span>{{ replaceDecimalsFormat(Number(balanceData?.ecp_collateral?.locked)+Number(balanceData?.ecp_collateral?.balance)) }} SWANC</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                <div class="flex flex-ai-center flex-jc-between width">
                  <div class="flex flex-ai-center">
                    Sequencer
                    <el-popover placement="top" :width="300" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                      <template #reference>
                        <div class="flex flex-ai-center ml-4">
                          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                            <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                              fill="#333333" p-id="7202"></path>
                          </svg>
                        </div>
                      </template>
                      Every ZK task consumes 0.00001 sETH and you shall get 48 task per day. 1 week consumption( 0.00336 sETH) is recommended.
                    </el-popover>:
                  </div>
                  <span>{{ replaceDecimalsFormat(balanceData?.sequencer?.balance) }} sETH</span>
                </div>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right">
                <div :class="{'collateral m':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'Sequencer')">Add</div>
              </el-col> -->
            </el-row>
          </div>
        </div>

        <div class="module-echarts mt-32 mb-32">
          <div class="title">
            <p class="font-16 weight-4">Job Stats</p>
            <p class="font-12 subtitle">Total Jobs: {{ replaceFormat(totalJob) }}</p>
          </div>
          <div class='chart-trends' id='chart-job-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
        </div>
        <div class="module-echarts">
          <div class="title">
            <p class="font-16 weight-4">Collateral</p>
          </div>
          <div class='chart-trends' id='chart-collateral-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
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
  const machart_job_fcp = echarts.init(document.getElementById("chart-job-fcp"));
  const machart_job_ecp = echarts.init(document.getElementById("chart-job-ecp"));
  const machart_collateral_fcp = echarts.init(document.getElementById("chart-collateral-fcp"));
  const machart_collateral_ecp = echarts.init(document.getElementById("chart-collateral-ecp"));
  
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
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Job Counts', 'Job Running'],
      right: 'auto',
      bottom: '0',
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
        // name: 'Job Success'
      }
    ],
    series: [
      {
        name: 'Job Counts',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: fcpSuccessData.datum,
        color: '#597cee'
      },
      {
        name: 'Job Running',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        data: ecpFaildData.datum,
        color: '#0000bf'
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
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + item.value  + '<br/>'; 
        });
        return result;
      }
    },
    legend: {
      data: ['Collateral (SWANC)', 'Escrow (sETH)'],
      right: 'auto',
      bottom: '0',
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
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
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
        name: 'Collateral (SWANC)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: rewardData.datum,
        color: '#7092b4'
      },
      {
        name: 'Escrow (sETH)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: rewardTotalData.datum,
        color: '#0000ff'
      }
    ]
  }
  const option3 = {
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
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Job Counts', 'Job Growth'],
      right: 'auto',
      bottom: '0',
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
        // name: 'Job Success'
      }
    ],
    series: [
      {
        name: 'Job Counts',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: fcpSuccessData.datum,
        color: '#03a7f0'
      },
      {
        name: 'Job Growth',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        data: ecpFaildData.datum,
        color: '#56cfb2'
      }
    ]
  }
  const option4 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
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
      left: '3%',
      right: '4%',
      top: '15%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Collateral', 'Escrow', 'Sequencer'],
      right: 'auto',
      bottom: '0',
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
        axisTick: {
          show: false
        },
        // prettier-ignore
        data: rewardData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'SWANC',
        axisLabel: {
          //   formatter: '{value} SWANC'
        },
        nameTextStyle: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 16 : 11,
          color: '#7c889b',
        }
      },
      {
        type: 'value',
        name: 'sETH',
        axisLabel: {
        //   formatter: function (value:any) {
        //     const v = `${value} sETH`
        //     return v.split(' ').join('\n');
        //   }
        },
        nameTextStyle: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 16 : 11,
          color: '#7c889b',
        }
      }
    ],
    series: [
      {
        name: 'Collateral',
        type: 'line',
        smooth: false,
        yAxisIndex: 1,
        showSymbol: true,
        data: rewardTotalData.datum,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        color: '#02a7f0'
      },
      {
        name: 'Escrow',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: rewardTotalData.datum,
        color: '#56cfb2'
      },
      {
        name: 'Sequencer',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: rewardTotalData.datum,
        color: '#333333'
      }
    ]
  }
  machart_job_fcp.setOption(option1);
  machart_collateral_fcp.setOption(option2);
  machart_job_ecp.setOption(option3);
  machart_collateral_ecp.setOption(option4);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_job_fcp.resize();
        machart_job_ecp.resize();
        machart_collateral_fcp.resize();
        machart_collateral_ecp.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_job_fcp.resize();
    machart_job_ecp.resize();
    machart_collateral_fcp.resize();
    machart_collateral_ecp.resize();
  })
}
const changePietype = async (data: any) => {
  const machart_pie_fcp = echarts.init(document.getElementById("chart-pie-fcp"));
  const machart_pie_ecp = echarts.init(document.getElementById("chart-pie-ecp"));

  const option1 = {
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [point[0] + 10, point[1] - 10]; 
      },
      formatter: function (params: any) {
          return `${params.seriesName}<br/><div class="flex flex-ai-center">${params.marker}${params.data.name}: ${params.data.value}</div>`;
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
      top: '0%',
      left: 'center',
      show: false
    },
    color: ['#0000bf', '#5579ee'],
    series: [
      {
        name: 'FCP',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: document.documentElement.clientWidth >= 1920 ? 29 : 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: replaceDecimalsFormat(balanceData.value?.fcp_collateral?.balance), name: 'Collateral' },
          { value: replaceDecimalsFormat(balanceData.value?.fcp_collateral?.locked), name: 'Escrow' }
        ]
      }
    ]
  }
  const option2 = {
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [point[0] + 10, point[1] - 10]; 
      },
      formatter: function (params: any) {
          return `${params.seriesName}<br/><div class="flex flex-ai-center">${params.marker}${params.data.name}: ${params.data.value}</div>`;
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
      top: '0%',
      left: 'center',
      show: false
    },
    color: ['#02a7f0', '#56cfb2'],
    series: [
      {
        name: 'ECP',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: document.documentElement.clientWidth >= 1920 ? 29 : 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: replaceDecimalsFormat(balanceData.value?.ecp_collateral?.balance), name: 'Collateral' },
          { value: replaceDecimalsFormat(balanceData.value?.ecp_collateral?.locked), name: 'Escrow' }
        ]
      }
    ]
  }
  machart_pie_fcp.setOption(option1);
  machart_pie_ecp.setOption(option2);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_pie_fcp.resize();
        machart_pie_ecp.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_pie_fcp.resize();
    machart_pie_ecp.resize();
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
    changePietype(data)
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
      .module-echarts {
        position: relative;
      }
      .el-col {
        margin: 0.03rem 0;
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
        margin: 0.1rem 0 0;
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
    .chart-pie-balance {
      width: calc(100% - 2.2rem);
    }
    .chart-pie {
      width: 2rem;
      height: 2rem;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 2.8rem;
      @media screen and (min-width: 3600px) {
        height: 400px;
      }
      @media screen and (max-width: 768px) {
        height: 280px;
      }
      @media screen and (max-width: 600px) {
        height: 250px;
      }
    }
    .border {
      padding: 0 0 0.03rem;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>
