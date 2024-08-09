<template>
  <section id="main-container">
    <div class="flex flex-ai-center flex-jc-between nowrap header-title">
      <h1 class="font-24 font-bold">Swan Provider Overview</h1>
      <div class="flex flex-ai-center nowrap search font-18">
        <a :href="explorerLink" target="_blank" class="flex flex-ai-center nowrap font-18">
          Swan Chain {{ currentNetwork }} explorer
          <i></i>
        </a>
      </div>
    </div>

    <div class="providers-overview">
      <el-row :gutter="bodyWidth">
        <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13" class="flex flex-ai-center baseline">
          <div class="module-container">
            <div class="title flex flex-ai-center">
              <i class="icon icon-figures"></i>
              <span class="font-16 weight-4">Provider Figures</span>
            </div>

            <div class="tabs-container">
              <div @click="tabsSwitch(0)" class="tabs-button text-center tabs-prev" :class="{'is-disabled': activeName === 0}">&lt;</div>
              <div @click="tabsSwitch(1)" class="tabs-button text-center tabs-next" :class="{'is-disabled': activeName === 3}">&gt;</div>

              <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane :name="0">
                  <template #label>
                    <span class="font-14">Overview Data</span>
                  </template>
                  <el-row :gutter="18">
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Active FCP Number</h6>
                        <template v-if="overviewData.value.fcp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.fcp[0].active_cps)}}
                          </b>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].active_cps >= overviewData.value.fcp[1].active_cps ? 'up': 'down'}`">{{overviewData.value.fcp[0].active_cps >= overviewData.value.fcp[1].active_cps?'+':''}}{{replaceFormat(overviewData.value.fcp[0].active_cps - overviewData.value.fcp[1].active_cps)}}</h6>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Active ECP numbers</h6>
                        <template v-if="overviewData.value.ecp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].cps)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].cps >= overviewData.value.ecp[1].cps ? 'up': 'down'}`">{{overviewData.value.ecp[0].cps >= overviewData.value.ecp[1].cps?'+':''}}{{replaceFormat(overviewData.value.ecp[0].cps - overviewData.value.ecp[1].cps)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total ZK tasks</h6>
                        <template v-if="overviewData.value.ecp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].tasks)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].tasks >= overviewData.value.ecp[1].tasks ? 'up': 'down'}`">{{overviewData.value.ecp[0].tasks >= overviewData.value.ecp[1].tasks?'+':''}}{{replaceFormat(overviewData.value.ecp[0].tasks - overviewData.value.ecp[1].tasks)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Applications</h6>
                        <template v-if="overviewData.value.fcp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.fcp[0].active_applications)}}
                          </b>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].active_applications >= overviewData.value.fcp[1].active_applications ? 'up': 'down'}`">{{overviewData.value.fcp[0].active_applications >= overviewData.value.fcp[1].active_applications?'+':''}}{{replaceFormat(overviewData.value.fcp[0].active_applications - overviewData.value.fcp[1].active_applications)}}</h6>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total GPU hours</h6>
                        <template v-if="overviewData.value.fcp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.fcp[0].gpu_hours)}}
                          </b>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].gpu_hours >= overviewData.value.fcp[1].gpu_hours ? 'up': 'down'}`">{{overviewData.value.fcp[0].gpu_hours >= overviewData.value.fcp[1].gpu_hours?'+':''}}{{replaceFormat(overviewData.value.fcp[0].gpu_hours - overviewData.value.fcp[1].gpu_hours)}}</h6>
                          <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total ZK rewards (SWAN)</h6>
                        <template v-if="overviewData.value.fcp.length>0">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].rewards)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards >= overviewData.value.ecp[1].rewards ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards >= overviewData.value.ecp[1].rewards?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards - overviewData.value.ecp[1].rewards)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :name="1">
                  <template #label>
                    <span class="font-14">FCP Summary</span>
                  </template>
                  <el-row :gutter="18" v-if="overviewData.value.fcp && overviewData.value.fcp.length>0">
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Active FCP Number</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].active_cps)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].active_cps >= overviewData.value.fcp[1].active_cps ? 'up': 'down'}`">{{overviewData.value.fcp[0].active_cps >= overviewData.value.fcp[1].active_cps?'+':''}}{{replaceFormat(overviewData.value.fcp[0].active_cps - overviewData.value.fcp[1].active_cps)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Active Applications</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].active_applications)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].active_applications >= overviewData.value.fcp[1].active_applications ? 'up': 'down'}`">{{overviewData.value.fcp[0].active_applications >= overviewData.value.fcp[1].active_applications?'+':''}}{{replaceFormat(overviewData.value.fcp[0].active_applications - overviewData.value.fcp[1].active_applications)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Deployments</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].deployments)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].deployments >= overviewData.value.fcp[1].deployments ? 'up': 'down'}`">{{overviewData.value.fcp[0].deployments >= overviewData.value.fcp[1].deployments?'+':''}}{{replaceFormat(overviewData.value.fcp[0].deployments - overviewData.value.fcp[1].deployments)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total jobs</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].jobs)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].jobs >= overviewData.value.fcp[1].jobs ? 'up': 'down'}`">{{overviewData.value.fcp[0].jobs >= overviewData.value.fcp[1].jobs?'+':''}}{{replaceFormat(overviewData.value.fcp[0].jobs - overviewData.value.fcp[1].jobs)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total running jobs</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].running_jobs)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].running_jobs >= overviewData.value.fcp[1].running_jobs ? 'up': 'down'}`">{{overviewData.value.fcp[0].running_jobs >= overviewData.value.fcp[1].running_jobs?'+':''}}{{replaceFormat(overviewData.value.fcp[0].running_jobs - overviewData.value.fcp[1].running_jobs)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total GPU hours</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].gpu_hours)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].gpu_hours >= overviewData.value.fcp[1].gpu_hours ? 'up': 'down'}`">{{overviewData.value.fcp[0].gpu_hours >= overviewData.value.fcp[1].gpu_hours?'+':''}}{{replaceFormat(overviewData.value.fcp[0].gpu_hours - overviewData.value.fcp[1].gpu_hours)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total CPU hours</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.fcp[0].cpu_hours)}}
                        </b>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.fcp[0].cpu_hours >= overviewData.value.fcp[1].cpu_hours ? 'up': 'down'}`">{{overviewData.value.fcp[0].cpu_hours >= overviewData.value.fcp[1].cpu_hours?'+':''}}{{replaceFormat(overviewData.value.fcp[0].cpu_hours - overviewData.value.fcp[1].cpu_hours)}}</h6>
                        <h6 v-if="overviewData.value.fcp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :name="2">
                  <template #label>
                    <span class="font-14">ECP Summary</span>
                  </template>
                  <el-row :gutter="18" v-if="overviewData.value.ecp && overviewData.value.ecp.length>0">
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Active ECP Number</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].cps)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].cps >= overviewData.value.ecp[1].cps ? 'up': 'down'}`">{{overviewData.value.ecp[0].cps >= overviewData.value.ecp[1].cps?'+':''}}{{replaceFormat(overviewData.value.ecp[0].cps - overviewData.value.ecp[1].cps)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total ZK rewards (SWAN)</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].rewards)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards >= overviewData.value.ecp[1].rewards ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards >= overviewData.value.ecp[1].rewards?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards - overviewData.value.ecp[1].rewards)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total ZK tasks</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].tasks)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].tasks >= overviewData.value.ecp[1].tasks ? 'up': 'down'}`">{{overviewData.value.ecp[0].tasks >= overviewData.value.ecp[1].tasks?'+':''}}{{replaceFormat(overviewData.value.ecp[0].tasks - overviewData.value.ecp[1].tasks)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">GPU ZK task</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].tasks_gpu)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].tasks_gpu >= overviewData.value.ecp[1].tasks_gpu ? 'up': 'down'}`">{{overviewData.value.ecp[0].tasks_gpu >= overviewData.value.ecp[1].tasks_gpu?'+':''}}{{replaceFormat(overviewData.value.ecp[0].tasks_gpu - overviewData.value.ecp[1].tasks_gpu)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">CPU ZK task</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].tasks_cpu)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].tasks_cpu >= overviewData.value.ecp[1].tasks_cpu ? 'up': 'down'}`">{{overviewData.value.ecp[0].tasks_cpu >= overviewData.value.ecp[1].tasks_cpu?'+':''}}{{replaceFormat(overviewData.value.ecp[0].tasks_cpu - overviewData.value.ecp[1].tasks_cpu)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Verified ZK task</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.ecp[0].tasks_verified)}}
                        </b>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].tasks_verified >= overviewData.value.ecp[1].tasks_verified ? 'up': 'down'}`">{{overviewData.value.ecp[0].tasks_verified >= overviewData.value.ecp[1].tasks_verified?'+':''}}{{replaceFormat(overviewData.value.ecp[0].tasks_verified - overviewData.value.ecp[1].tasks_verified)}}</h6>
                        <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                      <div class="grid-content g-select">
                        <h6 class="font-12 weight-4 text-center flex flex-ai-center nowrap">
                          <el-select v-model="AvgZKRewards.value" placeholder="Select" size="small">
                            <el-option v-for="item in AvgZKRewards.options" :key="item.value" :label="item.value" :value="item.value">
                              <div class="font-14">{{item.value}}</div>
                            </el-option>
                          </el-select>
                          Avg ZK rewards
                        </h6>
                        <template v-if="AvgZKRewards.value === 'Daily'">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].rewards_avg_day)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards_avg_day >= overviewData.value.ecp[1].rewards_avg_day ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards_avg_day >= overviewData.value.ecp[1].rewards_avg_day?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards_avg_day - overviewData.value.ecp[1].rewards_avg_day)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                        <template v-else-if="AvgZKRewards.value === 'Weekly'">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].rewards_avg_week)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards_avg_week >= overviewData.value.ecp[1].rewards_avg_week ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards_avg_week >= overviewData.value.ecp[1].rewards_avg_week?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards_avg_week - overviewData.value.ecp[1].rewards_avg_week)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                        <template v-else-if="AvgZKRewards.value === 'Monthly'">
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].rewards_avg_month)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards_avg_month >= overviewData.value.ecp[1].rewards_avg_month ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards_avg_month >= overviewData.value.ecp[1].rewards_avg_month?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards_avg_month - overviewData.value.ecp[1].rewards_avg_month)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                        <template v-else>
                          <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                            {{replaceFormat(overviewData.value.ecp[0].rewards_avg_year)}}
                          </b>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.ecp[0].rewards_avg_year >= overviewData.value.ecp[1].rewards_avg_year ? 'up': 'down'}`">{{overviewData.value.ecp[0].rewards_avg_year >= overviewData.value.ecp[1].rewards_avg_year?'+':''}}{{replaceFormat(overviewData.value.ecp[0].rewards_avg_year - overviewData.value.ecp[1].rewards_avg_year)}}</h6>
                          <h6 v-if="overviewData.value.ecp.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :name="3">
                  <template #label>
                    <span class="font-14">Swan Chain</span>
                  </template>
                  <el-row :gutter="18" v-if="overviewData.value.swan && overviewData.value.swan.length>0">
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Addresses</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.swan[0].total_addresses)}}
                        </b>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.swan[0].total_addresses >= overviewData.value.swan[1].total_addresses ? 'up': 'down'}`">{{overviewData.value.swan[0].total_addresses >= overviewData.value.swan[1].total_addresses?'+':''}}{{replaceFormat(overviewData.value.swan[0].total_addresses - overviewData.value.swan[1].total_addresses)}}</h6>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Contracts(24H)</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.swan[0].total_contracts)}}
                        </b>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.swan[0].total_contracts >= overviewData.value.swan[1].total_contracts ? 'up': 'down'}`">{{overviewData.value.swan[0].total_contracts >= overviewData.value.swan[1].total_contracts?'+':''}}{{replaceFormat(overviewData.value.swan[0].total_contracts - overviewData.value.swan[1].total_contracts)}}</h6>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Transactions Today</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{overviewData.value.swan.length>1 ? replaceFormat(overviewData.value.swan[0].total_txns - overviewData.value.swan[1].total_txns) : replaceFormat(overviewData.value.swan[0].total_txns)}}
                        </b>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Transactions</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.swan[0].total_txns)}}
                        </b>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.swan[0].total_txns >= overviewData.value.swan[1].total_txns ? 'up': 'down'}`">{{overviewData.value.swan[0].total_txns >= overviewData.value.swan[1].total_txns?'+':''}}{{replaceFormat(overviewData.value.swan[0].total_txns - overviewData.value.swan[1].total_txns)}}</h6>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
                      <div class="grid-content">
                        <h6 class="font-12 weight-4 text-center">Total Accounts</h6>
                        <b v-loading="overviewLoad" class="flex flex-ai-center flex-jc-center font-26 weight-4 text-center">
                          {{replaceFormat(overviewData.value.swan[0].total_accounts)}}
                        </b>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-22 weight-4 text-right t" :class="`${overviewData.value.swan[0].total_accounts >= overviewData.value.swan[1].total_accounts ? 'up': 'down'}`">{{overviewData.value.swan[0].total_accounts >= overviewData.value.swan[1].total_accounts?'+':''}}{{replaceFormat(overviewData.value.swan[0].total_accounts - overviewData.value.swan[1].total_accounts)}}</h6>
                        <h6 v-if="overviewData.value.swan.length>1" class="font-12 weight-4 text-right t">24h change</h6>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11" class="flex flex-ai-center baseline">
          <div class="module-container world">
            <div class="title flex flex-ai-center">
              <i class="icon icon-world"></i>
              <span class="font-16 weight-4">Location Overview</span>
            </div>
            <div class="world-buttom">
              <svg @click="resetMap" t="1717382052739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8179" width="18" height="18">
                <path d="M713.536 255.232l-58.624 72.192L960 355.712 868.8 64l-72.512 89.344A458.88 458.88 0 0 0 523.52 64C269.76 64 64 269.184 64 522.24c0 253.12 205.76 458.24 459.52 458.24a459.648 459.648 0 0 0 429.44-294.72 65.408 65.408 0 0 0-37.824-84.48 65.728 65.728 0 0 0-84.8 37.76A328.32 328.32 0 0 1 523.584 849.6c-181.312 0-328.32-146.56-328.32-327.36 0-180.736 147.008-327.296 328.32-327.296 69.376 0 135.232 21.504 189.952 60.288"
                  fill="#ffffff" p-id="8180"></path>
              </svg>
              <svg @click="roamMap(0)" t="1717381974237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6091" width="18" height="18">
                <path d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"
                  fill="#ffffff" p-id="6092"></path>
              </svg>
              <svg @click="roamMap(1)" t="1717382018337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7130" width="18" height="18">
                <path d="M587.229378 437.990403 580.722174 437.990403 76.975139 437.990403 76.975139 581.918419 580.722174 581.918419 587.229378 581.918419 940.542216 581.918419 940.542216 437.990403Z" fill="#ffffff" p-id="7131"></path>
              </svg>
            </div>
            <div class='chart-world' id='chart-world' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
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
                  <div class="flex flex-ai-center font-14">{{item.label}}</div>
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
              <el-select v-model="weekList.value" placeholder="Select" size="small">
                <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="flex flex-ai-center font-14">{{item.label}}</div>
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
              <el-select v-model="weekList.value" placeholder="Select" size="small">
                <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="flex flex-ai-center font-14">{{item.label}}</div>
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
              <el-select v-model="weekList.value" placeholder="Select" size="small">
                <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="flex flex-ai-center font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="m">
          <div class="module-container font-14">
            <div class="title flex flex-ai-center flex-jc-between">
              <div class="flex flex-ai-center">
                <i class="icon icon-provider"></i>
                <span class="font-16 weight-4">FCP List</span>
              </div>
              <router-link :to="{name: 'rankingsFCP'}" class="font-12 flex flex-ai-center">more &nbsp;
                <small>&gt;&gt;</small>
              </router-link>
            </div>
            <el-table :data="providersData" empty-text="No Data" v-loading="providersTableLoad">
              <el-table-column type="index" min-width="70">
                <template #header>
                  <div class="font-14 weight-4">Ranking</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" min-width="120">
                <template #header>
                  <div class="font-14 weight-4">Account</div>
                </template>
                <template #default="scope">
                  <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                    <span class="name-style" @click="handleCP(scope.row.cp_account_address)">{{hiddAddress(scope.row.cp_account_address)}}</span>
                    <svg @click="copyContent(scope.row.cp_account_address, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                      <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                        p-id="2310" fill="#b5b7c8"></path>
                      <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                      <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                    </svg>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="computer_provider.active_deployment" sortable min-width="150">
                <template #header>
                  <div class="font-14 weight-4">Active deployment</div>
                </template>
              </el-table-column>
              <el-table-column prop="computer_provider.score" width="70">
                <template #header>
                  <div class="font-14 weight-4">Score</div>
                </template>
              </el-table-column>
              <el-table-column prop="uptime" min-width="130">
                <template #header>
                  <div class="font-14 weight-4">Uptime</div>
                </template>
                <template #default="scope">
                  <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                    <ul class="flex flex-ai-center uptime-ul">
                      <li :class="{'active': scope.row.uptime >= 0.1}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.2}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.3}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.4}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.5}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.6}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.7}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.8}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.9}"></li>
                      <li :class="{'active': scope.row.uptime >= 1}"></li>
                    </ul>
                    <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime)}}%</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="m">
          <div class="module-container font-14">
            <div class="title flex flex-ai-center flex-jc-between">
              <div class="flex flex-ai-center">
                <i class="icon icon-provider"></i>
                <span class="font-16 weight-4">ECP List</span>
              </div>
              <router-link :to="{name: 'rankingsECP'}" class="font-12 flex flex-ai-center">more &nbsp;
                <small>&gt;&gt;</small>
              </router-link>
            </div>
            <!-- providerBody.ubiTableData -->
            <el-table :data="providersECPData" empty-text="No Data" v-loading="providersTableLoad">
              <el-table-column type="index" min-width="70">
                <template #header>
                  <div class="font-14 weight-4">Ranking</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" min-width="120">
                <template #header>
                  <div class="font-14 weight-4">Account</div>
                </template>
                <template #default="scope">
                  <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                    <span class="name-style" @click="handleCP(scope.row.owner_addr)">{{hiddAddress(scope.row.owner_addr)}}</span>
                    <svg @click="copyContent(scope.row.owner_addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                      <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                        p-id="2310" fill="#b5b7c8"></path>
                      <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                      <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                    </svg>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" min-width="90" column-key="status" filterable :filters="[
                      { text: 'Online', value: 'Online' },
                      { text: 'Suspended', value: 'Suspended' },
                      { text: 'Offline', value: 'Offline' }
                    ]" filter-placement="bottom-end" :filter-multiple="false">
                <template #header>
                  <div class="font-14 weight-4">status</div>
                </template>
              </el-table-column>
              <el-table-column prop="uptime" min-width="110">
                <template #header>
                  <div class="font-14 weight-4">Total Task</div>
                </template>
                <template #default="scope">
                    <span class="uptime-text text-right task">{{scope.row.task?scope.row.task.total : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uptime" min-width="150">
                <template #header>
                  <div class="font-14 weight-4">Completed (%)</div>
                </template>
                <template #default="scope">
                  <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                    <ul class="flex flex-ai-center uptime-ul">
                      <li :class="{'active': scope.row.uptime >= 0.1}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.2}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.3}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.4}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.5}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.6}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.7}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.8}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.9}"></li>
                      <li :class="{'active': scope.row.uptime >= 1}"></li>
                    </ul>
                    <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime)}}%</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import worldGeoJSON from '@/assets/js/world.json'
import gpuJSON from '@/assets/js/gpuData.json'
import gpuJSONTotal from '@/assets/js/gpuDataTotal.json'
import { currentNetwork, explorerLink } from '@/utils/storage'
import { getOverviewData, statsEchartsData, statsOverviewData } from "@/api/overview"
import { copyContent, dataDelta, dataGPU, dataResource, getDateRange, hiddAddress, replaceFormat, sizeChange, unifyNumber } from '@/utils/common';
import dataListFCPArray from '@/assets/static/js/cplist.ts'
import dataListECPArray from '@/assets/static/js/ecplist.ts'


    const bodyWidth = ref(document.body.clientWidth > 1440 ? 42 : 28)
    const route = useRoute()
    const router = useRouter()
    const gmtTime = new Date().toGMTString()
    const overviewData = reactive({
      value: {
        fcp: [],
        ecp: [],
        location: [],
        swan: []
      }
    })
    const overviewLoad = ref(false)
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const providersData = ref([])
    const providersECPData = ref([])
    const providerBody = reactive({
      data: {},
      ubiData: {},
      ubiTableData: {},
      totalData: {
        gas_used_today: '',
        total_addresses: '',
        total_blocks: '',
        total_gas_used: '',
        total_transactions: '',
        transactions_today: '',
        smart_contracts: '',
        new_smart_contracts_24h: ''
      },
      storageData: {},
      providerData: {},
      generalData: {},
      collapse: {
        general: true,
        zk: true,
        total: true,
        provider: true
      }
    })
    const dataArr = ref([])
    const activeName = ref(0)
    const cpLoad = ref(false)
    const AvgZKRewards = reactive({
      value: 'Daily',
      options: [
        {
          value: 'Daily'
        },
        {
          value: 'Weekly'
        },
        {
          value: 'Monthly'
        },
        {
          value: 'Yearly'
        }]
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

    function tabsSwitch (index:number) {
      if (index > 0 && activeName.value < 3) activeName.value += 1
      else if (index === 0 && activeName.value > 0) activeName.value -= 1
    }
    async function init () {
      try{
        overviewLoad.value = true
        const overviewRes = await statsOverviewData()
        overviewData.value = overviewRes?.data ?? {}
        overviewLoad.value = false
        const location = overviewRes?.data?.location ?? []
        drawChart(location)
      }catch{overviewLoad.value = false}
    }
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
    async function initList () {
      try{
        providersTableLoad.value = true
        const params = {
          limit: 10,
          offset: 0
        }
        // const providerRes = dataListFCPArray
        const providerRes = []
        // const providerRes = await getOverviewData(params)
        providersData.value = providerRes?.data?.providers ?? []

        // const providerECPRes = dataListECPArray
        const providerECPRes = []
        providersECPData.value = providerECPRes?.data?.list ?? []
        providersTableLoad.value = false
      }catch{console.error}
    }
    async function getCounters () {
      const statsRes = {
        "new_smart_contracts_24h": "13671",
        "new_verified_smart_contracts_24h": "0",
        "smart_contracts": "143652",
        "verified_smart_contracts": "5"
      }
      if (statsRes) {
        providerBody.totalData.new_smart_contracts_24h = statsRes?.new_smart_contracts_24h ?? ''
        providerBody.totalData.smart_contracts = statsRes?.smart_contracts ?? ''
      }
    }
    function reset (type) {
      providersData.value = []
      providersECPData.value = []
      providerBody.ubiTableData = []
      providersLoad.value = false
      providersTableLoad.value = false
      if (type) init()
      initList()
      initEcharts()
      getCounters()
    }
    let chart = null
    function resetMap () {
      chart.setOption({
        geo: {
          center: undefined,
          zoom: 1.1
        }
      })
    }
    function roamMap (flag) {
      const currentZoom = chart.getOption().geo[0].zoom
      let increaseAmplitude = 1.1
      if (flag === 1) {
        increaseAmplitude = 0.8
        if (currentZoom < 1) increaseAmplitude = 1
      } else if (flag == 2) {
        increaseAmplitude = 0 //reset
      }
      chart.setOption({
        geo: {
          zoom: currentZoom * increaseAmplitude < 1 ? 1 : currentZoom * increaseAmplitude
        },
      })
    }
    function drawChart (dataArr) {
      chart = echarts.init(document.getElementById('chart-world'))
      window.addEventListener('resize', function () {
        chart.resize()
      })
      chart.setOption({
        roam: true,
        grid: {
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        toolbox: {
          orient: 'vertical',
          top: '2%',
          right: '2%',
          feature: {
            dataZoom: { show: false },
            restore: {
              show: false,
              textStyle: {
                color: 'transparent' // 文字颜色设置为透明
              },
              iconStyle: {
                borderColor: '#fff', // 边框颜色
                borderWidth: 2, // 边框宽度
                color: 'transparent' // 填充颜色
              },
              emphasis: {
                iconStyle: {
                  borderColor: '#fff', // 边框颜色
                  borderWidth: 2, // 边框宽度
                  color: 'transparent' // 填充颜色
                }
              }
            },

            // 放大缩小按钮
            // zoom: { show: true },
          },
          textStyle: {
            color: '#fff',
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function (val) {
            if (val.data && val.data.city) return val.data.city
            else return val.name
          },
          // show: false,
          padding: 5,
          textStyle: {
            fontSize: 12,
            lineHeight: 10,
            align: "left"
          }
        },
        legend: {
          orient: 'vertical',
          left: '2%',
          bottom: '2%',
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
          icon: 'roundRect',
          // 图例标签的格式器，可以定制文本
          // formatter: function (name) {
          //     return echarts.format.truncateText(name, 50);
          // },
          // 图例文本样式
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'HELVETICA-ROMAN',
            // lineHeight: 14,
            rich: {
              a: {
                verticalAlign: 'middle',
              },
            },
            padding: [0, 0, -2, -1]
          }
        },
        geo: {
          show: true,
          map: 'worldHq',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // aspectScale: 0.75,
          roam: true, // 开启拖拽和缩放
          toolbox: {
            show: true,
            feature: {
              // 启用缩放工具
              dataZoom: {
                yAxisIndex: 'none'
              },
              // 启用还原工具
              restore: {},
              // 启用拖拽平移工具
              move: {}
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#b6ceff',
              borderColor: '#9bbbff'
            },
            // emphasis: {
            //   areaColor: '#a467d1',
            //   label: {
            //     show: false
            //   }
            // }
          },
          emphasis: {
            focus: 'none'
          },
          silent: true,
          zoom: 1,
          scaleLimit: {
            min: 1 // 设置最小缩放倍数为1
          },
          // left: '5%',
          // right: '5%'
        },
        series: [
          {
            name: 'Computing Provider',
            type: 'scatter',
            coordinateSystem: 'geo',
            itemStyle: {
              // borderWidth: 1,
              // borderColor: '#fff',
              // color: 'rgba(89, 152, 14, 1)',
              color: '#9a5aff',
              shadowBlur: 2,
              // shadowColor: '#7ca3fb'
              shadowColor: 'transparent'
            },
            data: dataArr,
            roam: true,
            symbolSize: 8,
            zlevel: 1
          },
        ]
      })
    }
    const changetype = async (data) => {
      const machart_resource = echarts.init(document.getElementById("chart-Resource"));
      const machart_fog = echarts.init(document.getElementById("chart-Fog"));
      const machart_gpu = echarts.init(document.getElementById("chart-GPU"));
      const machart_edge = echarts.init(document.getElementById("chart-Edge"));

      const gpuData = await dataGPU(data.gpu, 'active')
      const gpuTotalData = await dataGPU(data.gpu, 'total')
      // const gpuData = await dataGPU(gpuJSON, 'score')
      // const gpuTotalData = await dataGPU(gpuJSONTotal, 'score')

      const cpuData = await dataResource(data.cpu, 'active')
      const memoryData = await dataResource(data.memory, 'active')
      const storageData = await dataResource(data.storage, 'active')

      const fcpData = await dataDelta(data.fcp, 'total')
      const fcpDeltaData = await dataDelta(data.fcp, 'delta')

      const ecpData = await dataDelta(data.ecp, 'total')
      const ecpDeltaData = await dataDelta(data.ecp, 'delta')

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
              result += colorDot + item.seriesName + ': ' + item.value + '<br/>'; // 系列名和对应的值
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
            data: fcpData.timeArr,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 6,
              fontSize: 12,
              color: '#7c889b',
              formatter: function (value) {
                // 使用字符串的 replace 方法将空格替换为换行符
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
              fontSize: 12,
              color: '#7c889b',
              //   formatter: '{value}'
            },
            minInterval: 150
          },
          {
            type: 'value',
            min: -300,
            max: 300,
            minInterval: 300,
            axisLabel: {
              fontSize: 12,
              color: '#7c889b',
              //   formatter: '{value}'
            },
          }
        ],
        series: [
          {
            name: 'FCP',
            type: 'line',
            stack: 'Total',
            smooth: false,
            showSymbol: false,
            itemStyle: {
              color: 'rgba(105,155,255,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(105,155,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(105,155,255,0.3)'
                }
              ])
            },
            data: fcpData.datum
          },
          {
            name: 'Delta',
            type: 'line',
            stack: 'Total',
            smooth: false,
            showSymbol: false,
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
              result += colorDot + item.seriesName + ': ' + item.value + '<br/>'; // 系列名和对应的值
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
            data: ecpData.timeArr,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 6,
              color: '#7c889b',
              formatter: function (value) {
                // 使用字符串的 replace 方法将空格替换为换行符
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
            minInterval: 150
          },
          {
            type: 'value',
            min: -300,
            max: 300,
            minInterval: 300,
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
            showSymbol: false,
            itemStyle: {
              color: 'rgba(147,198,5,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(147,198,5,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(147,198,5,0.3)'
                }
              ])
            },
            data: ecpData.datum
          },
          {
            name: 'Delta',
            type: 'line',
            smooth: false,
            showSymbol: false,
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
    function handleCP (row:string) {
      router.push({ name: 'accountInfo', params: {cp_addr: row} })
    }
    onMounted(async () => {
      echarts.registerMap('worldHq', worldGeoJSON)
      reset('init')
    })
</script>

<style lang="less" scoped>
#main-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .header-title {
    padding: 0.1rem 0 0.15rem;
    .search{
      white-space: nowrap;
    }
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0 0 0.1rem;
      a {
        margin: 0 0 0 0.1rem;
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
                background: url(../../assets/images/icons/icon-05.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-figures {
                background: url(../../assets/images/icons/icon-04.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-gpu {
                background: url(../../assets/images/icons/icon-08.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-resource {
                background: url(../../assets/images/icons/icon-06.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-provider {
                background: url(../../assets/images/icons/icon-07.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-list {
                background: url(../../assets/images/icons/icon-09.png)
                  no-repeat;
                background-size: 100%;
              }
            }
          }
          .grid-content {
            height: calc(100% - 0.59rem);
            margin: 0.23rem 0 0;
            background: #edf2ff;
            &.g-select {
              height: calc(100% - 0.4rem);
              padding-top: 0.05rem;
            }
          }
        }
        .grid-content {
          position: relative;
          height: calc(100% - 0.36rem);
          padding: 0.18rem 0.14rem;
          background: var(--color-light);
          border-radius: 0.18rem;
          // box-shadow: 0 0 12px #e6e7eb;
          @media screen and (max-width: 1440px) {
            padding: 0.18rem 0.04rem 0.12rem;
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
        .world-buttom {
          position: absolute;
          right: 0.25rem;
          top: 0.32rem;
          z-index: 10;
          svg {
            display: block;
            cursor: pointer;
            &:nth-child(2) {
              margin: 7px 0 3px;
            }
          }
        }
        .chart-world {
          width: 100%;
          height: 3.45rem;
          height: 100%;
          margin: 0;
          @media screen and (max-width: 768px) {
            height: 300px;
          }
        }
        .el-tabs {
          width: 100%;
          .el-tabs__nav-scroll {
            overflow: auto;
          }
          .el-tabs__header {
            padding: 0.22rem 0 0;
            margin: 0;
            .el-tabs__nav-wrap {
              @media screen and (max-width: 600px) {
                padding: 0 20px;
              }
            }
            .el-tabs__active-bar,
            .el-tabs__nav-wrap:after {
              display: none;
            }
            .el-tabs__nav {
              .el-tabs__item {
                height: auto;
                padding: 0.08rem 0.13rem;
                margin: 0 0.15rem 0 0;
                background-color: #f3f4f8;
                border: 1px solid #ced4e1;
                border-radius: 0.5rem;
                color: #313132;
                line-height: 1.1;
                &.is-active {
                  background-color: #edf2ff;
                  border-color: #8eb0ff;
                  color: var(--color-primary);
                }
              }
            }
            .el-tabs__nav-next,
            .el-tabs__nav-prev {
              display: none;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
