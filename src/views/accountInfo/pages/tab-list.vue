<template>
  <div class="search-body flex flex-ai-center font-14">
    <div class="tabs-container">
      <div @click="tabsSwitch(0)" class="tabs-button text-center tabs-prev flex-ai-center flex-jc-center" :class="{'is-disabled': activeName === 0}">&lt;</div>
      <div @click="tabsSwitch(1)" class="tabs-button text-center tabs-next flex-ai-center flex-jc-center" :class="{'is-disabled': activeName === 3}">&gt;</div>

      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane :name="0">
          <template #label>
            <span class="font-14">FCP Reward List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="1">
          <template #label>
            <span class="font-14">ZK Proof List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <template #label>
            <span class="font-14">Sequencer List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <template #label>
            <span class="font-14">Transaction List</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <payment-history v-if="activeName === 0" :watchRoute="watchRoute"></payment-history>
  <ubi-history v-else-if="activeName === 1" :watchRoute="watchRoute"></ubi-history>
  <sequencer-list v-else-if="activeName === 2" :watchRoute="watchRoute"></sequencer-list>
  <transaction-list v-else-if="activeName === 3" :watchRoute="watchRoute"></transaction-list>
</template>

<script setup lang="ts">
import sequencerList from './sequencer-list.vue'
import transactionList from './transaction-list.vue'
import paymentHistory from "./payment-history.vue"
import ubiHistory from "./UBI-history.vue"

const activeName = ref(0)
const watchRoute = ref(false)

function tabsSwitch (index:number) {
  if (index > 0 && activeName.value < 3) activeName.value += 1
  else if (index === 0 && activeName.value > 0) activeName.value -= 1
}
onMounted(async () => {})

const route = useRoute()
watch(route, (to: any) => {
  if (to.name === "accountInfo") watchRoute.value = !watchRoute.value
})
</script>

<style lang="less" scoped>
.search-body {
  margin: 0 0 0.2rem;
  .tabs-container {
    .tabs-button {
      top: 0;
    }
  }
}
</style>
