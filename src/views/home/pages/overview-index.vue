<template>
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
  </el-row>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import worldGeoJSON from '@/assets/js/world.json'
import { statsOverviewData } from "@/api/overview"
import { replaceFormat } from '@/utils/common';

const bodyWidth = ref(document.body.clientWidth > 1440 ? 42 : 28)
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
const activeName = ref(0)
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

function tabsSwitch (index:number) {
  if (index > 0 && activeName.value < 3) activeName.value += 1
  else if (index === 0 && activeName.value > 0) activeName.value -= 1
}
async function init () {
  try{
    providersLoad.value = true
    overviewLoad.value = true
    const overviewRes = await statsOverviewData()
    overviewData.value = overviewRes?.data ?? {}
    overviewLoad.value = false
    const location = overviewRes?.data?.location ?? []
    drawChart(location)
  }catch{overviewLoad.value = false}
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
  providersLoad.value = false
}
onMounted(async () => {
  echarts.registerMap('worldHq', worldGeoJSON)
  init()
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
