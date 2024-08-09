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
