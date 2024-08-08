<template>
  <div :class="`header ${isLight ? 'light' : ''} ${abs ? 'abs' : ''}`" :style="{ background: bgColor }">
    <div class="lax-landing flex flex-ai-center flex-jc-between">
        <header-logo :light="isLight"></header-logo>
        <div class="flex flex-ai-center">
          <header-menus :light="isLight"></header-menus>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderLogo from './header-logo.vue'
import HeaderMenus from './header-menus.vue'

const ROUTE_WHITE = ['/company/blog', '/support/FAQs', '/terms', '/privacy']
const isLight = ref(false)
const abs = computed(() => !isLight.value)
const route = useRoute()
if (ROUTE_WHITE.includes(route.path)) {
  isLight.value = true
}
const router = useRouter()
router.beforeEach(to => {
  if (ROUTE_WHITE.includes(to.path)) {
    isLight.value = true
  } else {
    isLight.value = false
  }
})

const bgColor = ref('')
// onMounted(() => {
//   const main = document.getElementsByTagName('main')?.[0]
//   main?.addEventListener('scroll', function () {
//     bgColor.value = `RGBA(35, 42, 146, ${main.scrollTop / 1000})`
//   })
// })
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  z-index: 999;
  top: 0;
  background-color: var(--color-primary);
  .lax-landing{
    padding: 0.2rem 1.28rem;
    @media screen and (max-width: 768px) {
      padding: 0.2rem 0.6rem;
    }
    // @media screen and (max-width: 767px) {
    //   background-color: #fff;
    // }
  }
}
.header.light {
  background-color: var(--color-light);
}
.header.abs {
  position: absolute;
}
</style>
