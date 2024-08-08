<template>
  <div class="header-logo">
    <img :src="swanLogo" @click="openPage('https://www.swanchain.io/')" />
  </div>
</template>

<script setup lang="ts">
import swanLogo from '@/assets/images/logo-white.png'
import { openPage, toHome } from '@/hooks/router'
const router = useRouter()

defineProps<{
  light?: boolean
}>()
</script>

<style lang="less" scoped>
.header-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    height: 0.64rem;
    min-height: 40px;
  }
}
</style>
