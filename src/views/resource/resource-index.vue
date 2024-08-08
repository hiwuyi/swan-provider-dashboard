<template>
  <section id="resource-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">Resources</h1>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="title flex flex-ai-center">
              <i class="icon icon-use"></i>
              <span class="font-16 weight-4">Current Resource Use</span>
            </div>
            <el-row class="width">
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
                <div class="grid-content small-spacing text-center font-20">
                  <p class="font-12 text-center">GPU Usage</p>
                  <el-progress type="circle" stroke-linecap="butt" :percentage="24" :width="104" :stroke-width="21" color="#93c605" class="color-gpu" />
                  <!-- <div class='chart-trends' id='chart-gpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
                  <p class="font-12 text-center desc">
                    <span class="color-gpu">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
                <div class="grid-content small-spacing text-center font-20">
                  <p class="font-12 text-center">CPU Usage</p>
                  <el-progress type="circle" stroke-linecap="butt" :percentage="24" :width="104" :stroke-width="21" color="#699bff" class="color-cpu" />
                  <!-- <div class='chart-trends' id='chart-cpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
                  <p class="font-12 text-center desc">
                    <span class="color-cpu">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
                <div class="grid-content small-spacing text-center font-20">
                  <p class="font-12 text-center">Memory Usage (GB)</p>
                  <el-progress type="circle" stroke-linecap="butt" :percentage="24" :width="104" :stroke-width="21" color="#52ce7c" class="color-memory" />
                  <!-- <div class='chart-trends' id='chart-memory' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
                  <p class="font-12 text-center desc">
                    <span class="color-memory">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="flex flex-ai-center baseline">
                <div class="grid-content small-spacing text-center font-20">
                  <p class="font-12 text-center">Storage Usage (TB)</p>
                  <el-progress type="circle" stroke-linecap="butt" :percentage="24" :width="104" :stroke-width="21" color="#0046b7" class="color-storage" />
                  <!-- <div class='chart-trends' id='chart-storage' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div> -->
                  <p class="font-12 text-center desc">
                    <span class="color-storage">41</span> Used 240 Free</p>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="grid-content none">
              <div class='chart-trends big' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              <div class="date">
                <el-select v-model="weekList.value" placeholder="Select" size="small">
                  <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                    <div class="font-14">{{item.label}}</div>
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="providers-overview">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="flex flex-ai-center baseline">
          <div class="usage-style flex flex-ai-center font-24 font-bold">
            <label>Total Available GPUs: </label>
            <div class="progress flex flex-ai-center flex-jc-between nowrap">
              <el-progress :percentage="60" color="#76b900" :stroke-width="16" />
              <div class="text">
                <span>68</span> /291</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="providers-network font-14">
      <div class="providers-cp">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Chipset: </span>
              <el-select v-model="chipsetList.value" @change="handleClick" placeholder="Select" size="small">
                <el-option v-for="item in chipsetList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">vRAM: </span>
              <el-select v-model="vRAMList.value" @change="handleClick" placeholder="Select" size="small">
                <el-option v-for="item in vRAMList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Interface: </span>
              <el-select v-model="interfaceList.value" @change="handleClick" placeholder="Select" size="small">
                <el-option v-for="item in interfaceList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Price from </span>
              <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" @chang="searchProvider" @input="searchProvider" />
              <span class="font-14">to </span>
              <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" @chang="searchProvider" @input="searchProvider" />
              <span class="font-14">$ &nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkInput ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" :disabled="!networkInput ? true:false" round @click="searchProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="bodyWidth" class="small-row">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="gpu in gpuList" :key="gpu">
            <div class="grid-content">
              <div class="top flex flex-ai-center flex-jc-between">
                <div class="left flex flex-ai-center font-20">
                  <i class="icon icon-gpu"></i>
                  {{gpu.name}}
                </div>
                <div class="right flex flex-ai-center baseline font-20">
                  <div class="text">
                    <span>{{gpu.used}}</span>/{{gpu.total}}</div>
                  <span class="small-text font-14">{{gpu.available ?'Available':'Occupied'}}</span>
                </div>
              </div>
              <el-row :gutter="childWidth" class="content">
                <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                  <el-row class="font-14 note">
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p>vRAM:</p>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p class="color">{{gpu.vRAM}}</p>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p>Interface:</p>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p class="color">{{gpu.Interface}}</p>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p>Price:</p>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
                      <p class="color">{{gpu.Price}}</p>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="flex flex-ai-center flex-end align-end">
                  <a :href="gpu.rentnow ? 'javascript:void(0);' : 'https://lagrangedao.org/'" target="_blank" class="font-14 text-center" :class="{'is-disabled': gpu.rentnow}">RENT NOW</a>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPlistData } from '@/api/overview';
import { debounce } from '@/utils/common';
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

    const bodyWidth = ref(document.body.clientWidth > 1440 ? 34 : 24)
    const childWidth = ref(document.body.clientWidth > 1440 ? 24 : 12)
    const route = useRoute()
    const router = useRouter()
    const chipsetList = reactive({
      value: 'A100',
      options: [
        {
          value: 'All',
          label: 'All'
        },
        {
          value: 'A100',
          label: 'A100'
        },
        {
          value: 'H100',
          label: 'H100'
        }]
    })
    const vRAMList = reactive({
      value: '80Gi',
      options: [
        {
          value: 'All',
          label: 'All'
        },
        {
          value: '40Gi',
          label: '40Gi'
        },
        {
          value: '80Gi',
          label: '80Gi'
        }]
    })
    const interfaceList = reactive({
      value: 'PCle',
      options: [
        {
          value: 'All',
          label: 'All'
        },
        {
          value: 'SXM5',
          label: 'SXM5'
        },
        {
          value: 'PCle',
          label: 'PCle'
        }]
    })
    const networkInput = ref('')
    const gpuList = ref([
      {
        name: '100',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'RTX 3090Ti',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'T4',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: true
      },
      {
        name: '100',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'RTX 3090Ti',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'T4',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: true
      }
    ])
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
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

    async function init () {
      providersLoad.value = true
      try{
        const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
        const params = {
          limit: pagin.pageSize,
          offset: page * pagin.pageSize,
          search_string: networkInput.value
        }
        const providerRes = await getCPlistData(params)
        pagin.total = providerRes?.data?.list_providers_cnt ?? 0
        providersData.value = await getList(providerRes?.data?.providers)
        providersLoad.value = false
      }catch{providersLoad.value = false}
    }
    async function getList (list) {
      let l = list || []
      l.forEach((element) => {
        element.gpu_list = []
        try {
          if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
            element.computer_provider.machines.forEach((machines) => {
              if (machines.specs.gpu.details && machines.specs.gpu.details.length > 0) {
                machines.specs.gpu.details.forEach((gpu) => {
                  if (element.gpu_list.indexOf(gpu.product_name) < 0) element.gpu_list.push(gpu.product_name)
                })
              }
            })
          }
        } catch{ }
      })
      return l
    }
    const searchProvider = debounce(async function () {
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }, 700)
    function clearProvider () {
      networkInput.value = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }
    const changetype = () => {
      const machart_resource = echarts.init(document.getElementById("chart-Resource"));
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
            data: [10, 13, 11, 34, 50, 90, 20],
            color: '#699bff',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'Memory',
            type: 'line',
            data: [35, 12, 59, 24, 29, 83, 31],
            color: '#52ce7c',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'Storage',
            type: 'line',
            data: [6, 23, 20, 75, 59, 30, 41],
            color: '#0046b7',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'GPU',
            type: 'line',
            data: [26, 63, 30, 85, 50, 10, 21],
            color: '#93c605',
            showSymbol: false,
            smooth: true
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
    }
    const handleClick = () => { }
    onMounted(async () => {
      changetype()
    })
</script>

<style lang="less" scoped>
#resource-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .color {
    color: #3c85ff;
  }
  .providers-container {
    position: relative;
    width: calc(100% - 0.64rem);
    padding: 0.25rem 0.32rem;
    margin: 0.3rem 0;
    background-color: var(--color-light);
    border-radius: 0.14rem;
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
          background: url(../../assets/images/icons/icon-06.png) no-repeat;
          background-size: 100%;
        }
      }
    }
    .el-col {
      margin: 0 !important;
    }
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0 0 0.17rem;
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
        margin: 0.3rem 0 0.06rem;
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
        .usage-style {
          width: 100%;
          margin: 0 0 0.08rem;
          color: #000000;
          label {
            width: 3.1rem;
            margin: 0 0.1rem 0 0;
            line-height: 1.1;
          }
          .progress {
            width: calc(85% - 3.2rem);
            .el-progress {
              width: 100%;
              .el-progress__text {
                display: none;
              }
              .el-progress-bar__outer {
                background-color: #d7d7d7;
              }
            }
            .text {
              margin: 0 0 0 0.2rem;
              white-space: nowrap;
              line-height: 1;
              span {
                color: #76b900;
              }
            }
          }
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
        .chart-world {
          width: 100%;
          margin: 0 auto;
          height: 3.15rem;
          background-color: var(--color-primary);
          border-radius: 0.2rem;
          @media screen and (max-width: 540px) {
            height: 400px;
          }
        }
      }
    }
  }
}
</style>
