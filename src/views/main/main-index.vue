<template>
  <div class="wrapper" id="wrapper" ref="area">
    <el-container class="container font-18">
      <el-header>
        <v-head></v-head>
      </el-header>
      <el-container>
        <el-aside>
          <v-aside></v-aside>
        </el-aside>
        <el-main>
          <div class="content">
            <router-view v-slot="{ Component }">
              <transition name="move" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
            <el-backtop :right="20" :bottom="backtopMargin" />
          </div>
        </el-main>
      </el-container>
      <el-footer v-show="bodyWidth">
        <v-foot></v-foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import vHead from '@/components/header/header-content.vue'
import vAside from '@/components/side-bar/side-index.vue'
import vFoot from '@/components/footer/footer-index.vue'

const bodyWidth = ref(document.body.clientWidth > 768 ? false : true)
const backtopMargin = ref(document.body.clientWidth > 768 ? 30 : 130)
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  .content {
    .el-backtop {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
  .container {
    min-height: 100vh;
    padding: 0;
    overflow: hidden;
    .el-header,
    .el-footer {
      height: auto;
      padding: 0.2rem 0.5rem;
      background-color: var(--color-light);
      &.el-header {
        background-color: var(--color-primary);
      }
      @media screen and (max-width: 1024px) {
        padding: 0.2rem 0.3rem;
      }
      @media screen and (max-width: 600px) {
        padding: 0.2rem;
      }
    }
    .el-container {
      .el-aside {
        position: relative;
        width: auto;
        max-width: 2.4rem;
        background-color: var(--color-light);
        overflow: unset;
        @media screen and (max-width: 1440px) {
          max-width: 2.6rem;
        }
        @media screen and (max-width: 1024px) {
          max-width: 3.4rem;
        }
        @media screen and (max-width: 768px) {
          display: none;
          width: 0;
        }
      }
      .el-main {
        padding: 0.2rem 0.5rem;
        @media screen and (max-width: 1440px) {
          padding: 0.2rem 0.3rem;
        }
      }
    }
  }
}
</style>

<style lang="less">
.el-loading-mask {
  .el-loading-spinner .path {
    stroke: var(--color-primary);
  }
}

.wrongNet {
  .el-loading-mask {
    background-color: rgba(255, 255, 255, 0.9);
  }
}

.mt-border {
  margin: 0.3rem auto;
  border-top: 2px solid #868688;
}

.el-popper {
  .el-table-filter__list {
    .el-table-filter__list-item {
      color: #000;
      &.is-active {
        color: #fff;
      }
    }
  }
}
</style>

