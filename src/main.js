import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/index.css'
import en from 'element-plus/es/locale/lang/en'
import commonFun from '@/utils/common'
import './assets/js/world.js'
import './assets/css/style.css'
import './assets/css/common.less'
import qs from 'qs'

var routed = '';
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path != routed) {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0
  }
  routed = to.path
  next()
})

const app = createApp(App)
app.config.globalProperties.$commonFun = commonFun
app.config.globalProperties.$explorerLink = store.state.networkValue === 'Proxima' ? process.env.VUE_APP_ATOMBLOCKURL : process.env.VUE_APP_SWANMAINNETBLOCKURL
app.config.globalProperties.$proximaLink = process.env.VUE_APP_PROXIMALINK
app.config.globalProperties.$Qs = qs
app.use(ElementPlus, {
  locale: en,
})
  .use(i18n)
  .use(store)
  .use(router)
app.mount('#app')