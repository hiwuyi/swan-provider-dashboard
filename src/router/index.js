import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
const home = () =>
  import("@/components/Home");
const dashboard = () =>
  import("@/views/dashboard/index");
const main = () =>
  import("@/views/dashboard/main/index");
const rankingsFCP = () =>
  import("@/views/dashboard/rankings/FCP");
const rankingsECP = () =>
  import("@/views/dashboard/rankings/ECP");
const aarFCP = () =>
  import("@/views/dashboard/aar/FCP");
const aarECP = () =>
  import("@/views/dashboard/aar/ECP");
const accountInfo = () =>
  import("@/views/dashboard/accountInfo/index");
const resource = () =>
  import("@/views/dashboard/resource/index");

const routes = [{
  path: '/',
  redirect: '/overview'
},
{
  path: '/',
  component: home,
  children: [{
    path: '/overview',
    name: 'dashboard',
    component: main,
    meta: {
      keepAlive: true,
      title: 'Swan Provider'
    }
  },
  {
    path: '/rankings/FCP',
    name: 'rankingsFCP',
    component: rankingsFCP,
    meta: {
      keepAlive: true,
      title: 'Rankings'
    },
    // beforeEnter: (to, from, next) => {
    //     if (!sessionStorage.getItem('access_token_swan')) {
    //         next({
    //             path: '/overview'
    //         })
    //     } else {
    //         next()
    //     }
    // }
  },
  {
    path: '/rankings/ECP',
    name: 'rankingsECP',
    component: rankingsECP,
    meta: {
      keepAlive: true,
      title: 'Rankings'
    },
    // beforeEnter: (to, from, next) => {
    //     if (!sessionStorage.getItem('access_token_swan')) {
    //         next({
    //             path: '/overview'
    //         })
    //     } else {
    //         next()
    //     }
    // }
  },
  {
    path: '/aar/FCP',
    name: 'aarFCP',
    component: aarFCP,
    meta: {
      keepAlive: true,
      title: 'Atom Accelerator Race'
    }
  },
  {
    path: '/aar/ECP',
    name: 'aarECP',
    component: aarECP,
    meta: {
      keepAlive: true,
      title: 'Atom Accelerator Race'
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: resource,
    meta: {
      keepAlive: true,
      title: 'Resource'
    }
  },
  {
    path: '/cp-profile',
    name: 'accountInfo',
    component: accountInfo,
    meta: {
      keepAlive: true,
      title: 'Account Info'
    },
    // beforeEnter: (to, from, next) => {
    //     if (!sessionStorage.getItem('access_token_swan')) {
    //         next({
    //             path: '/overview'
    //         })
    //     } else {
    //         next()
    //     }
    // }
  }
  ]
},
{
  path: '/:pathMatch(.*)*',
  redirect: '/'
}
]

const router = createRouter({
  // history: process.env.NODE_ENV === 'testnet' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router