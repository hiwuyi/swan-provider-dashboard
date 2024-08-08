export default [
  {
    path: '/overview',
    name: 'dashboard',
    component: () => import("../views/home/home-index.vue"),
    meta: {
      keepAlive: true,
      title: 'Swan Provider'
    }
  },
  {
    path: '/rankings/FCP',
    name: 'rankingsFCP',
    component: () => import("../views/rankings/rankings-FCP.vue"),
    meta: {
      keepAlive: true,
      title: 'Rankings'
    }
  },
  {
    path: '/rankings/ECP',
    name: 'rankingsECP',
    component: () => import("../views/rankings/rankings-ECP.vue"),
    meta: {
      keepAlive: true,
      title: 'Rankings'
    }
  },
  {
    path: '/aar/FCP',
    name: 'aarFCP',
    component: () => import("../views/aar/aar-FCP.vue"),
    meta: {
      keepAlive: true,
      title: 'Swan Chain Mainnet Campaign'
    }
  },
  {
    path: '/aar/ECP',
    name: 'aarECP',
    component: () => import("../views/aar/aar-ECP.vue"),
    meta: {
      keepAlive: true,
      title: 'Swan Chain Mainnet Campaign'
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import("../views/resource/resource-index.vue"),
    meta: {
      keepAlive: true,
      title: 'Resource'
    }
  },
  {
    path: '/cp-profile',
    name: 'accountInfo',
    component: () => import("../views/accountInfo/accountInfo-index.vue"),
    meta: {
      keepAlive: true,
      title: 'Account Info'
    }
  }
]
