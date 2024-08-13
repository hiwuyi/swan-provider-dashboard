<template>
  <section id="main-container">
    <div class="flex flex-ai-center flex-jc-between nowrap header-title">
      <h1 class="font-20 font-bold">Swan Provider Overview</h1>
      <div class="flex flex-ai-center nowrap search font-16">
        <a :href="explorerLink" target="_blank" class="flex flex-ai-center nowrap font-16">
          Swan Chain {{ currentNetwork }} explorer
          <i></i>
        </a>
      </div>
    </div>

    <div class="providers-overview">
      <overview-index></overview-index>
      <echarts-index></echarts-index>
      <table-list></table-list>
    </div>
  </section>
</template>

<script setup lang="ts">
import overviewIndex from './pages/overview-index.vue'
import echartsIndex from './pages/echarts-index.vue'
import tableList from './pages/table-list.vue'
import { currentNetwork, explorerLink } from '@/utils/storage'
</script>

<style lang="less" scoped>
#main-container {
  padding: 0 0 0.2rem;
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
      // margin: 0 0 0.1rem;
      a {
        margin: 0 0 0 0.1rem;
        color: var(--color-primary);
        i {
          width: 0.2rem;
          height: 0.2rem;
          margin: 0 0 0 0.07rem;
          background: url(../../assets/images/icons/icon-01.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
