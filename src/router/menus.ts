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
    path: '/rankings/fcp',
    name: 'rankingsFCP',
    component: () => import("../views/rankings/rankings-FCP.vue"),
    meta: {
      keepAlive: true,
      title: 'Fog Computing Provider List'
    }
  },
  {
    path: '/rankings/ecp',
    name: 'rankingsECP',
    component: () => import("../views/rankings/rankings-ECP.vue"),
    meta: {
      keepAlive: true,
      title: 'Edge Computing Provider List'
    }
  },
  {
    path: '/campaign/fcp',
    name: 'aarFCP',
    component: () => import("../views/aar/aar-FCP.vue"),
    meta: {
      keepAlive: true,
      title: 'Swan Mainnet Campaign'
    }
  },
  {
    path: '/campaign/ecp',
    name: 'aarECP',
    component: () => import("../views/aar/aar-ECP.vue"),
    meta: {
      keepAlive: true,
      title: 'Swan Mainnet Campaign'
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
    path: '/cp-profile/:cp_addr',
    name: 'accountInfo',
    component: () => import("../views/accountInfo/accountInfo-index.vue"),
    meta: {
      keepAlive: true,
      title: 'Account Info'
    }
  }
]
