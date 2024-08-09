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
  <payment-history v-if="activeName === 'FCP'"></payment-history>
  <ubi-history v-else-if="activeName === 'ECP'"></ubi-history>
  <sequencer-list v-else-if="activeName === 'Sequencer'"></sequencer-list>
  <transaction-list v-else-if="activeName === 'Transaction'"></transaction-list>
</template>

<script setup lang="ts">
import sequencerList from './sequencer-list.vue'
import transactionList from './transaction-list.vue'
import paymentHistory from "@/components/paymentHistory.vue"
import ubiHistory from "@/components/UBIHistory.vue"

const activeName = ref('ECP')

onMounted(async () => {})
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
