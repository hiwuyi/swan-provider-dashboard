<template>
  <el-row class="search-body flex flex-ai-center font-14">
    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
      <div class="flex flex-ai-center nowrap child">
        <span class="font-14">Chipset: </span>
        <el-select v-model="chipsetList.value" @change="handleClick" placeholder="Select" size="small">
          <el-option v-for="item in chipsetList.options" :key="item.value" :label="item.label" :value="item.value">
            <div class="font-12">{{item.label}}</div>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
      <div class="flex flex-ai-center nowrap child">
        <span class="font-14">vRAM: </span>
        <el-select v-model="vRAMList.value" @change="handleClick" placeholder="Select" size="small">
          <el-option v-for="item in vRAMList.options" :key="item.value" :label="item.label" :value="item.value">
            <div class="font-12">{{item.label}}</div>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
      <div class="flex flex-ai-center nowrap child">
        <span class="font-14">Interface: </span>
        <el-select v-model="interfaceList.value" @change="handleClick" placeholder="Select" size="small">
          <el-option v-for="item in interfaceList.options" :key="item.value" :label="item.label" :value="item.value">
            <div class="font-12">{{item.label}}</div>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <div class="flex flex-ai-center nowrap child">
        <span class="font-14">Price from </span>
        <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" />
        <span class="font-14">to </span>
        <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" />
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

  <el-row :gutter="bodyWidth" class="small-row" v-if="gpuList && gpuList.length > 0">
    <template v-for="gpu in gpuList" :key="gpu">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="top flex flex-ai-center flex-jc-between">
            <div class="left flex flex-ai-center font-18">
              <i class="icon icon-gpu"></i>
              {{gpu.name}}
            </div>
            <div class="right flex flex-ai-center baseline font-18">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="flex flex-ai-end">
              <a :href="gpu.rentnow ? 'javascript:void(0);' : 'https://lagrangedao.org/'" target="_blank" class="font-12 text-center" :class="{'is-disabled': gpu.rentnow}">RENT NOW</a>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </template>
  </el-row>
  <div class="font-18 text-center mt-64 mb-64" v-else>No Data</div>
</template>

<script setup lang="ts">
import { getCPlistData } from '@/api/overview';
import { debounce } from '@/utils/common';
import {
  Search
} from '@element-plus/icons-vue'

const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const childWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
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
const gpuList = ref<any>([
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
const providersData = ref([])
const pagin = reactive({
  pageSize: 10,
  pageNo: 1,
  total: 0
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
    providersData.value = providerRes?.data?.providers
    providersLoad.value = false
  }catch{providersLoad.value = false}
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
const handleClick = () => { }
onMounted(async () => {})
</script>

<style lang="less" scoped>
.color {
  color: #3c85ff;
}
.el-row {
  :deep(.el-col) {
    margin: 0.2rem 0 0.06rem;
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
          text-decoration: none;
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
  }
}
</style>
