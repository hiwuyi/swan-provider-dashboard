<template>
  <div id="payment">
    <div class="payment-history container-landing font-14">
      <el-row class="search-container font-14">
        <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
          <div class="flex flex-ai-center nowrap child">
            <span class="font-14">Task UUID: </span>
            <el-input class="zk-input" v-model="networkZK.owner_addr" placeholder="please enter Task UUID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
          <div class="flex flex-ai-center nowrap child">
            <span class="font-14">NodeID: </span>
            <el-input class="zk-input" v-model="networkZK.node_id" placeholder="please enter NodeID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
          <div class="flex flex-ai-center nowrap child">
            <el-button type="info" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
            <el-button type="primary" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id ? true:false" round @click="searchZKProvider">
              <el-icon>
                <Search />
              </el-icon>
              Search
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-table v-loading="paymentLoad" element-loading-text="Please do not refresh the page" :data="paymentData" stripe style="width: 100%" @filter-change="handleFilterChange">
        <!-- <el-table-column prop="chain_id" label="chain id" min-width="110" /> -->
        <el-table-column prop="job" min-width="120">
          <template #header>
            <div class="font-14 weight-4">task UUID</div>
          </template>
          <template #default="scope">
            <div class="flex flex-ai-center copy-style" @click="copyContent(scope.row.task_uuid, 'Copied')">
              {{ hiddAddress(scope.row.task_uuid) || '-' }}
              <svg t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                  fill="#3d3d3d" p-id="6468"></path>
                <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                  fill="#3d3d3d" p-id="6469"></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hardware_type" column-key="hardware_type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false" min-width="90">
          <template #header>
            <div class="font-14 weight-4">Task Type</div>
          </template>
          <template #default="scope">
            <span>{{ scope.row.hardware_type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="node_id" min-width="120">
          <template #header>
            <div class="font-14 weight-4">NODE ID</div>
          </template>
          <template #default="scope">
            <div class="flex flex-ai-center copy-style" @click="copyContent(scope.row.node_id, 'Copied')">
              {{ hiddAddress(scope.row.node_id) }}
              <svg t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                  fill="#3d3d3d" p-id="6468"></path>
                <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                  fill="#3d3d3d" p-id="6469"></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" min-width="120" sortable>
          <!-- column-key="created_at" filterable :filters="[
            { text: '60', value: '60' },
            { text: '50', value: '50' },
            { text: '40', value: '40' },
            { text: '30', value: '30' },
            { text: '20', value: '20' },
            { text: '10', value: '10' },
            { text: '5', value: '5' },
            { text: '1', value: '1' },
          ]" filter-placement="bottom-end" :filter-multiple="false" -->
          <template #header>
            <div class="font-14 weight-4">Creation Time</div>
          </template>
          <template #default="scope">
            <span>
              {{ momentFun(scope.row.created_at) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" min-width="120" sortable>
          <template #header>
            <div class="font-14 weight-4">End Time</div>
          </template>
          <template #default="scope">
            <span>
              {{ momentFun(scope.row.updated_at) }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="task_end_at" min-width="120">
          <template #header>
            <div class="font-14 weight-4">Estimated End At</div>
          </template>
          <template #default="scope">
            <span>
              {{ momentFun(scope.row.task_end_at) }}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="task_status" min-width="120" column-key="task_status" filterable :filters="[
                { text: 'Reward Claimed', value: 'Reward Claimed' },
                { text: 'Pending', value: 'Pending' },
                { text: 'Claim Reward', value: 'Claim Reward' }]" filter-placement="bottom-end" :filter-multiple="false">
          <template #header>
            <div class="font-14 weight-4 flex flex-ai-center">
              Task Status
              <el-popover placement="top" :width="300" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                <template #reference>
                  <div class="flex flex-ai-center">
                    <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                      <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                        fill="#ffffff" p-id="7202"></path>
                    </svg>
                  </div>
                </template>
                Reward Claimed: <br />Rewards have been claimed or have been automatically distributed to the CP's wallet.
                <br /><br /> Pending: <br />This task is still running, you can get your reward after task finished.
                <br /><br /> Task Failed: <br />The Task cannot be deployed or the contract cannot be retrieved after the user has initiated an Early Termination.
                <br /><br /> Task Cancelled: <br />Auction waited for more than thirty minutes and could not be assigned.
                <br /><br /> Task Terminating: <br />The user initiated an early termination request and is waiting in the early termination queue for the task to be terminated.
              </el-popover>
            </div>
          </template>
          <template #default="scope">
            <div>
              <span v-if="scope.row.task_status && scope.row.task_status.toLowerCase() === 'task failed'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.task_status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="The Task cannot be deployed or the contract cannot be retrieved after the user has initiated an Early Termination.">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.task_status && scope.row.task_status.toLowerCase() === 'task cancelled'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.task_status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="Auction waited for more than thirty minutes and could not be assigned.">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.task_status && scope.row.task_status.toLowerCase() === 'task terminating'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.task_status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="The user initiated an early termination request and is waiting in the early termination queue for the task to be terminated">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.task_status && scope.row.task_status.toLowerCase() === 'reward claimed'" class="flex flex-ai-center flex-jc-center color-green">{{ scope.row.task_status }}</span>
              <span v-else-if="scope.row.task_status && scope.row.task_status.toLowerCase() === 'pending'" class="flex flex-ai-center flex-jc-center color-orange">{{ scope.row.task_status }}</span>
              <span v-else>{{ scope.row.task_status }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- column-key="status" filterable :filters="[
            { text: 'Claim Failed', value: 'Claim Failed' },
            { text: 'Rewardable', value: 'Rewardable' },
            { text: 'Pending', value: 'Pending' },
            { text: 'Cooling Down', value: 'Cooling Down' },
            { text: 'Reward Claimed', value: 'Reward Claimed' },
            { text: 'Terminate Failed', value: 'Terminate Failed' },
          ]" filter-placement="bottom-end" :filter-multiple="false" -->
        <!-- <el-table-column prop="status" min-width="135">
          <template #header>
            <div class="font-14 weight-4">payment status</div>
          </template>
          <template #default="scope">
            <div>
              <span v-if="scope.row.status && scope.row.status.toLowerCase() === 'reward claimed'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="Rewards have been claimed or have been automatically distributed to the CP's wallet">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.status && scope.row.status.toLowerCase() === 'cooling down'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="Waiting for 3 day cooling down, you will be able to claim the reward if you pass the claim review">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.status && scope.row.status.toLowerCase() === 'pending'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="This task is still running, you can get your reward after task finished ">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <span v-else-if="scope.row.status && scope.row.status.toLowerCase() === 'claim failed'" class="flex flex-ai-center flex-jc-center">
                {{ scope.row.status }}
                <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="Cannot claim this reward because of some reason">
                  <template #reference>
                    <div class="flex flex-ai-center">
                      <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                </el-popover>
              </span>
              <el-button v-else-if="scope.row.status && scope.row.status.toLowerCase() === 'rewardable'" plain @click="rewardFun(scope.row, 1)">Claim Reward
              </el-button>
              <el-button v-else-if="scope.row.status && scope.row.status.toLowerCase() === 'terminate failed'" plain @click="retryFun(scope.row)">Retry Terminate
              </el-button>
              <span v-else>{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="token" min-width="100">
          <template #header>
            <div class="font-14 weight-4">token</div>
          </template>
          <template #default="scope">
            <span>
              {{ scope.row.token || '-' }}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="transaction_hash" min-width="120">
          <template #header>
            <div class="font-14 weight-4">transaction hash</div>
          </template>
          <template #default="scope">
            <span v-if="scope.row.amount && scope.row.amount.indexOf('-') > -1">-</span>
            <span v-else-if="scope.row.transaction_hash === '1'" class="flex flex-ai-center flex-jc-center">
              {{ scope.row.transaction_hash }}
              <el-popover placement="top" :width="200" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="We are getting error to log your payment info, so you see this strange tx_hash, however, your reward are successfully send to your wallet.">
                <template #reference>
                  <div class="flex flex-ai-center">
                    <svg t="1708417763428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                      <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                        fill="#ffffff" p-id="7202"></path>
                    </svg>
                  </div>
                </template>
              </el-popover>
            </span>
            <!-- <a v-else :href="`${scope.row.url_tx}${scope.row.transaction_hash}`" target="_blank" class="name-style">{{scope.row.transaction_hash}}</a> -->
            <a v-else target="_blank" class="name-style"></a>
          </template>
        </el-table-column>
        <el-table-column prop="Reward">
          <template #header>
            <div class="font-14 weight-4">Reward</div>
          </template>
          <template #default="scope">
            <span>
              {{ scope.row.Reward }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex-ai-center flex-jc-center pagination-style">
        <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + paymentData.length : 0 + paymentData.length }} /&nbsp;</span>
        <!-- hide-on-single-page -->
        <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
          :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>

    <el-dialog v-model="txhashVisible" title="Payment Detail" :width="bodyWidth" :append-to-body="false" custom-class="wrongNet" class="wrongNet" :before-close="handleClose">
      <div class="cont">
        <div class="area flex flex-ai-center">
          <div class="fast width">
            <label>Transaction Hash</label>
            <div class="address">
              <div class="flex flex-ai-center hash">
                {{ hiddAddress(txHash) }}
                <svg @click="copyContent(txHash, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="area flex flex-ai-center">
          <div class="fast width">
            <label>Amount</label>
            <div class="address">{{ NumFormat(rowAll.amount) }} {{ rowAll.token || '-' }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { claimReviewData, getPaymentListData, terminateRetryData, userProviderPaymentsData, userRefundData } from '@/api/payment-history';
import BiddingABI from '@/utils/abi/Bidding.json'
import TaskABI from '@/utils/abi/Task.json'
import { NumFormat, chainIdSWAN, copyContent, debounce, hiddAddress, messageTip, momentFun, paginationWidth } from '@/utils/common';
import web3Init, { checkNetwork, walletChain } from '@/utils/login';
import { metaAddress } from '@/utils/storage';
import {
  Search
} from '@element-plus/icons-vue'

    const route = useRoute()
    const router = useRouter()
    const bodyWidth = ref(document.body.clientWidth > 600 ? '450px' : '95%')
    const paymentData = ref([])
    const paymentLoad = ref(false)
    const prevType = ref(true)
    const txhashVisible = ref(false)
    const txHash = ref('')
    const rowAll = ref({})
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0
    })
    const paramsFilter = reactive({
      data: {
        days_ago: '',
        status_filter: ''
      }
    })
    const networkZK = reactive({
      contract_address: '',
      owner_addr: '',
      node_id: ''
    })
    const small = ref(false)
    const background = ref(false)
    let biddingContractAddress = import.meta.env.VITE_OPSWAN_BIDDING_ADDRESS
    let biddingContract

    function handleSizeChange (val) {
    }

    async function handleCurrentChange (currentPage) {
      pagin.pageNo = currentPage
      init()
    }

    async function reviewFun (row) {
      const net = await checkNetwork()
      if (net) return
      paymentLoad.value = true
      let formData = new FormData()
      formData.append('tx_hash', row.transaction_hash)
      formData.append('chain_id', row.chain_id)
      const reviewRes = await claimReviewData(formData)
      if (reviewRes) {
        ElMessageBox.alert(
          `Status: ${reviewRes.status}<br />Message: ${reviewRes.message}`,
          'Review Detail',
          {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
            callback: (action) => {
              init()
            }
          }
        )
      }
    }

    function handleClose () {
      txHash.value = ''
      rowAll.value = {}
      txhashVisible.value = false
    }

    function checkFun (row) {
      rowAll.value = row
      txHash.value = row.transaction_hash
      txhashVisible.value = true
    }

    async function retryFun (row) {
      if (chainIdSWAN.value.toString() !== '20241133') {
        await walletChain(20241133)
        return
      }
      paymentLoad.value = true
      let formData = new FormData()
      formData.append('task_uuid', row.task_uuid)
      const retryRes = await terminateRetryData(formData)
      if (!retryRes || retryRes.status !== 'success') if (retryRes.message) messageTip('error', retryRes.message)
      init()
    }

    async function rewardFun (row, type) {
      if (chainIdSWAN.value.toString() !== '20241133') {
        await walletChain(20241133)
        return
      }
      paymentLoad.value = true
      try {
        // get task contract address
        let taskContractAddress = await biddingContract.methods.tasks(String(row.task_uuid)).call()
        console.log(row.task_uuid)
        if (taskContractAddress.indexOf('0x0') > -1) {
          messageTip('error', 'Cannot get task contract, Please try again later!')
          paymentLoad.value = false
          return
        }
        let taskContract = new web3Init.eth.Contract(TaskABI, taskContractAddress)

        if (type) {
          console.log('task_uuid:', row.task_uuid)
          let gasLimit = await taskContract.methods
            .claimReward()
            .estimateGas({ from: metaAddress.value })

          const tx = await taskContract.methods
            .claimReward()
            .send({ from: metaAddress.value, gasLimit: Math.floor(gasLimit * 1.5) })
            .on('transactionHash', async (transactionHash) => {
              console.log('claim transactionHash:', transactionHash)
            })
            .on('receipt', async (receipt) => {
              // receipt example
              console.log('claim receipt:', receipt)
              claimStatus(row, receipt)
            })
            .on('error', () => paymentLoad.value = false)
        } else {
          console.log('refund id:', row.transaction_hash)
          let gasLimit = await taskContract.methods
            .claimRefund()
            .estimateGas({ from: metaAddress.value })

          const tx = await taskContract.methods
            .claimRefund()
            .send({ from: metaAddress.value, gasLimit: Math.floor(gasLimit * 1.5) })
            .on('transactionHash', async (transactionHash) => {
              console.log('refund transactionHash:', transactionHash)
              refundStatus(row, transactionHash)
            })
            .on('error', () => paymentLoad.value = false)
        }
      } catch (err) {
        console.log('err', err)
        paymentLoad.value = false
        if (err && err.message) messageTip('error', err.message)
      }
    }

    async function refundStatus (row, transactionHash) {
      paymentLoad.value = true
      let formData = new FormData()
      formData.append('tx_hash', row.transaction_hash)
      formData.append('chain_id', row.chain_id)
      const refundRes = await userRefundData(formData)
      if (!refundRes || refundRes.status !== 'success') if (refundRes.message) messageTip('error', refundRes.message)
      init()
    }

    async function claimStatus (row, receipt) {
      paymentLoad.value = true
      let formData = new FormData()
      formData.append('tx_hash', receipt.transactionHash)
      formData.append('chain_id', chainIdSWAN.value)
      formData.append('uuid', row.uuid)
      formData.append('token', 'SwanToken')
      try {
        formData.append('amount', web3Init.utils.fromWei(String(receipt.events.RewardClaimed.returnValues.reward), 'ether'))
      } catch {
      }
      const claimRes = await userProviderPaymentsData(formData)
      if (!claimRes || claimRes.status !== 'success') if (claimRes.message) messageTip('error', claimRes.message)
      init()
    }

    async function init (pFilter) {
      paymentLoad.value = true
      try{
        const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
        // let paramsOption = {
        //   limit: pagin.pageSize,
        //   offset: page * pagin.pageSize
        // }
        // paramsOption = Object.assign({}, paramsOption, paramsFilter.data)
        // const requestURL = `${import.meta.env.VITE_BASEAPI}provider/payments`
        // const paymentsRes = await getPaymentListData(paramsOption)
        // paymentData.value = paymentsRes?.data?.payments ?? []
        // pagin.total = paymentsRes?.data?.total ?? 0
        paymentData.value =  []
        pagin.total = 0
        paymentLoad.value = false
      }catch{paymentLoad.value = false}
    }
    const handleFilterChange = (filters) => {
      for (const key in filters) {
        if (key === 'created_at') paramsFilter.data.days_ago = filters.created_at[0] || ''
        else if (key === 'status') paramsFilter.data.status_filter = filters.status[0] || ''
      }
      pagin.pageNo = 1
      init()
    }
    const radioFilterChange = (filters) => {
      paramsFilter.data.status_filter = filters || ''
      pagin.pageNo = 1
      init()
    }
    const searchZKProvider = debounce(async function () {
      pagin.pageNo = 1
      getUBITable()
    }, 700)
    function clearProvider () {
      networkZK.contract_address = ''
      networkZK.owner_addr = ''
      networkZK.node_id = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      // init()
    }

    onMounted(async () => {
      init()
    })
    watch(route, (to, from) => {
      // if (to.name === "paymentHistory") init()
    })
</script>
<style lang="less" scoped>
#payment {
  width: 100%;

  :deep(.payment-history) {
    margin: 0 auto;
    box-sizing: border-box;
    word-break: break-word;
    text-align: left;

    .search-container {
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 30px;
      margin: 0;
      .el-select {
        width: auto;
        margin: 0 0.3rem 0 0;
        font-size: inherit;
        .el-tooltip__trigger {
          margin: 0;
          width: auto;
          height: auto;
          padding: 0.06rem 0.22rem;
          font-size: inherit;
          font-family: inherit;
          border: 1px solid #b6c0d1;
          border-radius: 0.07rem;
          box-shadow: none;
          .el-select__selected-item {
            position: relative;
            top: auto;
            margin: 0 0.16rem 0 0;
            transform: translateY(0px);
            line-height: 1.2;
            color: var(--color-primary);
            &.is-hidden {
              display: none;
            }
          }
          .el-select__suffix {
            .el-select__icon {
              background: url(../assets/images/icons/icon-03.png) no-repeat
                center;
              background-size: 100%;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .child {
        height: 100%;
        span {
          white-space: nowrap;
        }
      }
      .el-input {
        width: 100%;
        // max-width: 250px;
        // min-width: 150px;
        margin: 0 0.16rem 0 0.1rem;
        font-size: inherit;
        .el-input__wrapper {
          background-color: var(--color-light);
          border: 1px solid var(--color-border);
          border-radius: 0.08rem;
          box-shadow: none;
          .el-input__inner {
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            color: #333;
            @media screen and (max-width: 768px) {
              width: 100%;
            }
            &:hover,
            &:active,
            &:focus {
              border-color: var(--color-primary);
            }
          }
        }
      }
      .el-button {
        height: 0.3rem;
        padding: 0 0.1rem;
        font-family: inherit;
        font-size: inherit;
        border: 0;
        line-height: 0.3rem;
        .el-icon {
          width: 0.2rem;
          height: 0.2rem;
          margin: 0 0.08rem 0 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
        &.el-button--info {
          background-color: #d0dcf9;
          border-color: #d0dcf9;
          color: var(--color-primary);
        }
        &:hover,
        &.is-disabled {
          opacity: 0.9;
        }
      }
    }
    .title {
      margin: 0;
      font-weight: bold;
      font-size: 0.24rem;
      color: var(--color-light);
      text-transform: capitalize;
    }

    .el-table {
      tr {
        th {
          .cell {
            .el-tooltip__trigger {
              margin: 0 0 0 4px;
            }
          }
        }
        td {
          .cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            a {
              width: 100%;
              display: block;
              font-size: inherit;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}

:deep(.el-overlay-dialog) {
  display: flex;
  justify-content: center;
  align-items: center;

  .wrongNet {
    padding: 0;
    margin: auto !important;
    box-shadow: 0 0 13px rgba(128, 128, 128, 0.8);
    border-radius: 0.2rem;
    text-align: left;

    .el-dialog__header {
      padding: 0.1rem 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dfdfdf;
      color: #000;
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 1;
      text-transform: capitalize;
      @media screen and (max-width: 479px) {
        padding: 0.3rem 0.2rem;
      }

      .el-dialog__headerbtn {
        position: relative;
        top: auto;
        right: auto;
        font-size: inherit;

        i {
          font-size: inherit;

          * {
            cursor: pointer;
          }

          &:hover {
            color: #7405ff;
          }
        }
      }

      .el-dialog__title {
        font-size: inherit;
      }
    }

    .el-dialog__body {
      position: relative;
      padding: 0.2rem 0.4rem 0.3rem;
      font-size: 0.16rem;
      @media screen and (max-width: 540px) {
        padding: 0.2rem;
      }

      label {
        word-break: break-word;
        line-height: 1;
        color: #666;
        font-size: inherit;
      }

      .address {
        background: rgba(233, 233, 233, 1);
        padding: 8px;
        margin: 10px 0 12px;
        border-radius: 8px;
        font-size: inherit;

        .hash {
          svg {
            margin: 0 0 0 0.05rem;
            cursor: pointer;
          }
        }
      }

      .area {
        justify-content: space-between;

        .fast {
          width: 48%;

          &.width {
            width: 100%;
          }

          .address {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .error {
            font-size: 12px;
            color: firebrick;
          }

          .el-input-number {
            width: 100%;

            .el-input-number__decrease,
            .el-input-number__increase {
              display: none;
            }

            .el-input__inner {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>