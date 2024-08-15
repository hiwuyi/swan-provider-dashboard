<template>
  <div class="search-body flex flex-ai-center font-14">
    <div class="tabs-container">
      <div @click="activeName = 'FCP'" class="tabs-button text-center tabs-prev" :class="{'is-disabled': activeName === 'FCP'}">&lt;</div>
      <div @click="activeName = 'ECP'" class="tabs-button text-center tabs-next" :class="{'is-disabled': activeName === 'ECP'}">&gt;</div>

      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane name="FCP">
          <template #label>
            <span class="font-14">FCP Reward List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="ECP">
          <template #label>
            <span class="font-14">ZK Proof List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="Sequencer">
          <template #label>
            <span class="font-14">Sequencer List</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="Transaction">
          <template #label>
            <span class="font-14">Transaction List</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <payment-history v-if="activeName === 'FCP'" :watchRoute="watchRoute"></payment-history>
  <ubi-history v-else-if="activeName === 'ECP'" :watchRoute="watchRoute"></ubi-history>
  <sequencer-list v-else-if="activeName === 'Sequencer'" :watchRoute="watchRoute"></sequencer-list>
  <transaction-list v-else-if="activeName === 'Transaction'" :watchRoute="watchRoute"></transaction-list>
</template>

<script setup lang="ts">
import sequencerList from './sequencer-list.vue'
import transactionList from './transaction-list.vue'
import paymentHistory from "./payment-history.vue"
import ubiHistory from "./UBI-history.vue"

const activeName = ref('FCP')
const watchRoute = ref(false)

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
