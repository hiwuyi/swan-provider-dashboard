<template>
  <section id="cp-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-24 font-bold">CP Profile</h1>
    </div>

    <div class="providers-network font-16">
      <div class="providers">
        <account-info :cpsData="cpsData" :cpsLoad="cpsLoad"></account-info>
      </div>

      <div class="providers">
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
      </div>

      <div class="providers-cp">
        <div class="flex flex-ai-center flex-jc-between name-title">
          <b class="font-16 weight-4">Resource List</b>
        </div>
        <resource-list :cpsData="cpsData" :cpsLoad="cpsLoad"></resource-list>
      </div>

      <div class="providers-cp">
        <tab-list></tab-list>
      </div>
    </div>

    <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
  </section>
</template>

<script setup lang="ts">
import accountInfo from './pages/accrount-info.vue'
import resourceList from './pages/resource-list.vue'
import tabList from './pages/tab-list.vue'
import vmDrawer from "@/components/vmDrawer.vue"
import * as echarts from "echarts"
import { metaAddress } from "@/utils/storage"
import { getCPsData, statsCpscoresData } from "@/api/cp-profile"
import { messageTip } from "@/utils/common"

    const bodyWidth = ref(document.body.clientWidth > 1440 ? 32 : 22)
    const route = useRoute()
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const providersData = ref([])
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0,
      total_deployments: 0,
      active_applications: 0
    })
    const cpLoad = ref(false)
    const networkInput = ref('')
    const vmOperate = reactive({
      centerDrawerVisible: false,
      row: {},
      type: 'dialog'
    })
    const ringGraphData = reactive({
      data: {},
      cpScore: {},
      transactionDriveProgram: {},
      providersTotal: {}
    })
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

    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    function reset (type) {
      pagin.total = 0
      pagin.total_deployments = 0
      pagin.active_applications = 0
      pagin.pageSize = 10
      pagin.pageNo = 1
      providersData.value = []
      providersTableLoad.value = false
      providersLoad.value = false
      networkInput.value = ''
      init()
    }
    function providersNodeTree (nodeData) {
      const res = {
        contribution_score: 0,
        task_job_count: 0
      }
      let data = nodeData || []
      let memoryUnit = ''
      let storageUnit = ''
      data.forEach((item) => {
        res.contribution_score += Number(item.contribution_score || 0)
        res.task_job_count += Number(item.task_job_count || 0)
      })
      return res
    }
    async function init () {
      cpLoad.value = true
      providersTableLoad.value = true
      try{
        const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
        const params = {
          limit: pagin.pageSize,
          offset: page * pagin.pageSize,
          search_string: networkInput.value,
          // start_time: 1713470000,
          // end_time: 1714077711
        }
        const providerRes = {
          "data": {
            "list_providers_cnt": 4,
            "providers": [
              {
                "city": "Montreal",
                "computer_provider": {
                  "allowed_nodes": null,
                  "autobid": 1,
                  "city": "Montreal",
                  "country": null,
                  "created_at": "1709866614",
                  "deleted_at": null,
                  "job_stats": {
                    "end_time": 1714092141,
                    "failed": 0,
                    "start_time": 1713487341,
                    "submit_failed": 0,
                    "total_submit": 0
                  },
                  "last_active_at": null,
                  "lat": 45.5075,
                  "lon": -73.5887,
                  "machines": [
                    {
                      "created_at": "1709866624",
                      "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                      "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
                      "specs": {
                        "cpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        },
                        "gpu": {
                          "attached_gpus": 2,
                          "cuda_version": "12020",
                          "details": [
                            {
                              "bar1_memory_usage": {
                                "free": "249 MiB",
                                "total": "256 MiB",
                                "used": "6 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "8745 MiB",
                                "total": "10240 MiB",
                                "used": "1494 MiB"
                              },
                              "product_name": "NVIDIA 3080",
                              "status": "available"
                            },
                            {
                              "bar1_memory_usage": {
                                "free": "254 MiB",
                                "total": "256 MiB",
                                "used": "1 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "24257 MiB",
                                "total": "24576 MiB",
                                "used": "318 MiB"
                              },
                              "product_name": "NVIDIA 3090",
                              "status": "occupied"
                            }
                          ],
                          "driver_version": "535.113.01"
                        },
                        "memory": {
                          "free": "233.00 GiB",
                          "total": "251.00 GiB",
                          "used": "18.00 GiB"
                        },
                        "model": "amd64",
                        "storage": {
                          "free": "375.00 GiB",
                          "total": "410.00 GiB",
                          "used": "35.00 GiB"
                        },
                        "vcpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        }
                      },
                      "updated_at": "1712735774"
                    }
                  ],
                  "multi_address": "/ip4/38.140.46.60/tcp/8086",
                  "name": "cp-2.44-2",
                  "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
                  "online": false,
                  "payment_stats": {
                    "claimed_amount": null,
                    "claimed_count": 0,
                    "end_time": 1714092141,
                    "start_time": 1713487341,
                    "waiting_claim_count": 0
                  },
                  "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                  "region": "Quebec-CA",
                  "score": 100,
                  "status": "Active",
                  "updated_at": "1714061249"
                },
                "country": null,
                "name": "cp-2.44-2",
                "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
                "region": "Quebec-CA",
                "uptime": 0.9725905402731051,
                "type": "FCP"
              },
              {
                "city": "Montreal",
                "computer_provider": {
                  "allowed_nodes": null,
                  "autobid": 1,
                  "city": "Montreal",
                  "country": null,
                  "created_at": "1712053635",
                  "deleted_at": null,
                  "job_stats": {
                    "end_time": 1714092141,
                    "failed": 0,
                    "start_time": 1713487341,
                    "submit_failed": 0,
                    "total_submit": 0
                  },
                  "last_active_at": null,
                  "lat": 45.5075,
                  "lon": -73.5887,
                  "machines": [
                    {
                      "created_at": "1712053645",
                      "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                      "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
                      "specs": {
                        "cpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        },
                        "cpu_name": "",
                        "gpu": {
                          "attached_gpus": 2,
                          "cuda_version": "12020",
                          "details": [
                            {
                              "bar1_memory_usage": {
                                "free": "249 MiB",
                                "total": "256 MiB",
                                "used": "6 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "8745 MiB",
                                "total": "10240 MiB",
                                "used": "1494 MiB"
                              },
                              "product_name": "NVIDIA 3080",
                              "status": "available"
                            },
                            {
                              "bar1_memory_usage": {
                                "free": "254 MiB",
                                "total": "256 MiB",
                                "used": "1 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "24257 MiB",
                                "total": "24576 MiB",
                                "used": "318 MiB"
                              },
                              "product_name": "NVIDIA 3090",
                              "status": "occupied"
                            }
                          ],
                          "driver_version": "535.113.01"
                        },
                        "memory": {
                          "free": "233.00 GiB",
                          "total": "251.00 GiB",
                          "used": "18.00 GiB"
                        },
                        "model": "amd64",
                        "storage": {
                          "free": "375.00 GiB",
                          "total": "410.00 GiB",
                          "used": "35.00 GiB"
                        },
                        "vcpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        }
                      },
                      "updated_at": "1712132889"
                    }
                  ],
                  "multi_address": "/ip4/38.140.46.60/tcp/8086",
                  "name": "cp-2.44-2",
                  "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
                  "online": false,
                  "payment_stats": {
                    "claimed_amount": null,
                    "claimed_count": 0,
                    "end_time": 1714092141,
                    "start_time": 1713487341,
                    "waiting_claim_count": 0
                  },
                  "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                  "region": "Quebec-CA",
                  "score": 97,
                  "status": "Active",
                  "updated_at": "1714061249"
                },
                "country": null,
                "name": "cp-2.44-2",
                "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
                "region": "Quebec-CA",
                "uptime": 0.9727884425094003,
                "type": "ECP",
                "completion_rate": 2266
              },
              {
                "city": "Montreal",
                "computer_provider": {
                  "allowed_nodes": null,
                  "autobid": 1,
                  "city": "Montreal",
                  "country": null,
                  "created_at": "1712137980",
                  "deleted_at": null,
                  "job_stats": {
                    "end_time": 1714092141,
                    "failed": 0,
                    "start_time": 1713487341,
                    "submit_failed": 0,
                    "total_submit": 0
                  },
                  "last_active_at": null,
                  "lat": 45.5075,
                  "lon": -73.5887,
                  "machines": [
                    {
                      "created_at": "1712143229",
                      "machine_id": "70518000-5ab2-11eb-8000-18c04db4a530",
                      "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
                      "specs": {
                        "cpu": {
                          "free": "53",
                          "total": "96",
                          "used": "43"
                        },
                        "cpu_name": "AMD",
                        "gpu": {
                          "attached_gpus": 2,
                          "cuda_version": "12020",
                          "details": [
                            {
                              "bar1_memory_usage": {
                                "free": "249 MiB",
                                "total": "256 MiB",
                                "used": "6 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "8745 MiB",
                                "total": "10240 MiB",
                                "used": "1494 MiB"
                              },
                              "product_name": "NVIDIA 3080",
                              "status": ""
                            },
                            {
                              "bar1_memory_usage": {
                                "free": "254 MiB",
                                "total": "256 MiB",
                                "used": "1 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "24257 MiB",
                                "total": "24576 MiB",
                                "used": "318 MiB"
                              },
                              "product_name": "NVIDIA 3090",
                              "status": ""
                            }
                          ],
                          "driver_version": "535.113.01"
                        },
                        "memory": {
                          "free": "147 GiB",
                          "total": "251 GiB",
                          "used": "9 GiB"
                        },
                        "model": "",
                        "storage": {
                          "free": "128 GiB",
                          "total": "455 GiB",
                          "used": "304 GiB"
                        },
                        "vcpu": {
                          "free": "53",
                          "total": "96",
                          "used": "43"
                        }
                      },
                      "updated_at": "1712735051"
                    }
                  ],
                  "multi_address": "/ip4/38.140.46.60/tcp/8086",
                  "name": "ubi-cp-24",
                  "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
                  "online": false,
                  "payment_stats": {
                    "claimed_amount": null,
                    "claimed_count": 0,
                    "end_time": 1714092141,
                    "start_time": 1713487341,
                    "waiting_claim_count": 0
                  },
                  "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                  "region": "Quebec-CA",
                  "score": 98,
                  "status": "Active",
                  "updated_at": "1714061249"
                },
                "country": null,
                "name": "ubi-cp-24",
                "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
                "region": "Quebec-CA",
                "uptime": 0.9726894913912527
              },
              {
                "city": "Montreal",
                "computer_provider": {
                  "allowed_nodes": null,
                  "autobid": 1,
                  "city": "Montreal",
                  "country": null,
                  "created_at": "1712735800",
                  "deleted_at": null,
                  "job_stats": {
                    "end_time": 1714092141,
                    "failed": 12,
                    "start_time": 1713487341,
                    "submit_failed": 7,
                    "total_submit": 40
                  },
                  "last_active_at": "1713938072",
                  "lat": 45.5075,
                  "lon": -73.5887,
                  "machines": [
                    {
                      "created_at": "1712735811",
                      "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                      "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
                      "specs": {
                        "cpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        },
                        "cpu_name": "",
                        "gpu": {
                          "attached_gpus": 2,
                          "cuda_version": "12020",
                          "details": [
                            {
                              "bar1_memory_usage": {
                                "free": "254 MiB",
                                "total": "256 MiB",
                                "used": "1 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "10007 MiB",
                                "total": "10240 MiB",
                                "used": "232 MiB"
                              },
                              "product_name": "NVIDIA 3080",
                              "status": "occupied"
                            },
                            {
                              "bar1_memory_usage": {
                                "free": "254 MiB",
                                "total": "256 MiB",
                                "used": "1 MiB"
                              },
                              "fb_memory_usage": {
                                "free": "24257 MiB",
                                "total": "24576 MiB",
                                "used": "318 MiB"
                              },
                              "product_name": "NVIDIA 3090",
                              "status": "available"
                            }
                          ],
                          "driver_version": "535.113.01"
                        },
                        "memory": {
                          "free": "237.00 GiB",
                          "total": "251.00 GiB",
                          "used": "14.00 GiB"
                        },
                        "storage": {
                          "free": "365.00 GiB",
                          "total": "410.00 GiB",
                          "used": "45.00 GiB"
                        },
                        "vcpu": {
                          "free": "79",
                          "total": "96",
                          "used": "17"
                        }
                      },
                      "updated_at": "1714092133"
                    }
                  ],
                  "multi_address": "/ip4/38.140.46.60/tcp/8086",
                  "name": "cp-2.44-2",
                  "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
                  "online": true,
                  "payment_stats": {
                    "claimed_amount": "246.89306",
                    "claimed_count": 19,
                    "end_time": 1714092141,
                    "start_time": 1713487341,
                    "waiting_claim_count": 7
                  },
                  "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                  "region": "Quebec-CA",
                  "score": 100,
                  "status": "Active",
                  "updated_at": "1714080093"
                },
                "country": null,
                "name": "cp-2.44-2",
                "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
                "region": "Quebec-CA",
                "uptime": 0.9728793427694744
              }
            ]
          },
          "message": "cp data api returns successfully",
          "status": "success"
        }
        pagin.total = providerRes?.data?.list_providers_cnt ?? 0
        providersData.value = await getList(providerRes?.data?.providers)
        ringGraphData.data = await resolveNodeTree(providerRes)
      }catch{cpLoad.value = false}
      providersTableLoad.value = false
    }
    const changetype = () => {
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
    function resolveNodeTree (nodeData) {
      const res = {
        cpu_total: 0,
        gpu_total: 0,
        memory_total: 0,
        storage_total: 0,
        average_score_total: 0, //（所有score 加起来/node总数）
        failed_total: 0, //(job_stats.failed)
        submit_failed_total: 0, //(job_stats.submit_failed)
        total_failed: 0, //(job_stats.total_submit + job_stats.failed)
        total_success: 0, //(job_stats.total_submit - job_stats.failed)
        total_submit: 0, //(job_stats.total_submit + job_stats.submit_failed)
        claimed_count_total: 0, //(payment_stats.claimed_count )
        claimed_amount_total: 0, //(payment_stats.claimed_amount)
        waitng_total: 0, //(payment_stats.waiting_claim_count)
        claim_total: 0 //(payment_stats.claimed_count + payment_stats.waiting_claim_count)
      }
      let data = []
      let list_providers_cnt = 0
      if (nodeData && nodeData.data && nodeData.data.list_providers_cnt > 0) {
        list_providers_cnt = Number(nodeData.data.list_providers_cnt)
        data = nodeData.data.providers || []
      } else {
        return res
      }
      let memoryUnit = ''
      let storageUnit = ''
      data.forEach((item) => {
        if (!item.computer_provider) {
          return
        }
        res.average_score_total += Number(item.computer_provider.score || 0)
        // job_stats
        const job_stats = item.computer_provider.job_stats || {}
        res.failed_total += Number(job_stats.failed || 0)
        res.submit_failed_total += Number(job_stats.submit_failed || 0)
        res.total_failed += Number(job_stats.submit_failed || 0) + Number(job_stats.failed || 0)
        res.total_success += Number(job_stats.total_submit || 0) - Number(job_stats.failed || 0)
        res.total_submit += Number(job_stats.total_submit || 0) + Number(job_stats.submit_failed || 0)
        // payment_stats
        const payment_stats = item.computer_provider.payment_stats || {}
        res.claimed_count_total += Number(payment_stats.claimed_count || 0)
        res.claimed_amount_total += Number(payment_stats.claimed_amount || 0)
        res.waitng_total += Number(payment_stats.waiting_claim_count || 0)
        res.claim_total +=
          Number(payment_stats.claimed_count || 0) + Number(payment_stats.waiting_claim_count || 0)
        // machines
        const machines = item.computer_provider.machines || []
        machines.forEach((machine) => {
          if (!machine.specs) {
            return
          }
          // cpu
          res.cpu_total += machine.specs.cpu ? Number(machine.specs.cpu.total || 0) : 0
          // gpu
          res.gpu_total += machine.specs.gpu ? Number(machine.specs.gpu.attached_gpus || 0) : 0
          // memory
          const memoryList =
            machine.specs.memory && machine.specs.memory.total
              ? machine.specs.memory.total.split(' ')
              : []
          memoryUnit = memoryList[1] ? ` ${memoryList[1]}` : memoryUnit
          res.memory_total += Number(memoryList[0] || 0)
          // storage
          const storageList =
            machine.specs.storage && machine.specs.storage.total
              ? machine.specs.storage.total.split(' ')
              : []
          storageUnit = storageList[1] ? ` ${storageList[1]}` : storageUnit
          res.storage_total += Number(storageList[0] || 0)
        })
      })
      // add memory unit
      //res.memory_total += memoryUnit ? memoryUnit : 0
      // add storage unit
      //res.storage_total += storageUnit ? storageUnit : 0
      res.average_score_total = Number((res.average_score_total / list_providers_cnt).toFixed(2))
      return res
    }
    async function getList (list) {
      let l = list || []
      l.forEach((element) => {
        element.gpu_list = []
        try {
          if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
            element.computer_provider.machines.forEach((machines) => {
              machines.MachineShow = true
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

    const cpsLoad = ref(false)
    const cpsData = ref<any>({})
    async function getAllCPsData() {
      cpsLoad.value = true
      try{
        const cpsRes = await getCPsData(route.params.cp_addr)
        cpsData.value = cpsRes?.data ?? {}
      }catch{console.error}
      cpsLoad.value = false
    }
    onMounted(async () => {
      reset('init')
      getAllCPsData()
      changetype()
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
