<template>
  <div v-if="windowSize !== EWindowSize.XS" class="flex flex-ai-center">
    <template v-for="item in menus" :key="item.label">
      <el-dropdown v-if="item.children?.length">
        <div class="menu font-20 font-bold" :class="{
            active:
              item.value === activeMenuPath ||
              item.children?.map((it) => it.value).includes(activeMenuPath),
            'color-light': !light,
            'color-dark': light
          }">
          {{ item.label }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="it in item.children" :key="it.label" @click="toPage(it.value)">
              {{ it.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-else class="menu font-20 font-bold" :class="{
          active: item.value === activeMenuPath,
          'color-light': !light,
          'color-dark': light
        }" @click="toPage(item.value)">
        {{ item.label }}
      </div>
    </template>
  </div>

  <el-menu v-else background-color="transparent" color="#fff" popper-class="menu-popper" collapse unique-opened router>
    <el-sub-menu index="menu">
      <template #title>
        <el-icon size="24" class="mr-30">
          <Menu :class="light ? 'color-dark' : 'color-light'"></Menu>
        </el-icon>
      </template>
      <template v-for="item in menus" :key="item.value">
        <el-sub-menu v-if="item?.children?.length" :index="item.value">
          <template #title>{{ item.label }}</template>
          <el-menu-item v-for="it in item.children" :key="it.value" :index="it.value">{{ it.label }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.value" @click="changeMenu(item.value)">
          {{ item.label }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>

  <!-- <el-dropdown v-else>
    <el-icon color="#fff" size="24" class="mr-30"><Menu></Menu></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in menus" :key="item.value">
          <el-dropdown-item :index="item.value" @click="changeMenu(item.value)">
            {{ item.label }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown> -->
</template>

<script setup lang="ts">
import { EWindowSize } from '@/constant/common'
import { windowSize } from '@/hooks/layout'
import { menus, activeMenuPath } from '@/hooks/menus'
import { toPage } from '@/hooks/router'

defineProps<{
  light?: boolean
}>()

const router = useRouter()
function changeMenu(path: string) {
  activeMenuPath.value = path
  toPage(path)
}
</script>

<style scoped lang="less">
.menu {
  margin: 0 0.24rem;
  cursor: pointer;
}
.menu:hover {
  color: var(--color-primary);
}
.menu.active {
  color: var(--color-primary);
}
.menu-popper {
  top: 1rem !important;
}
</style>
