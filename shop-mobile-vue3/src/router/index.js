import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home/index.vue')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/Category/index.vue')
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/Order/index.vue')
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: () => import('@/views/Recommend/index.vue')
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/User/index.vue')
  },
  {
    name: 'product',
    path: '/product/:productId',
    component: () => import('@/views/Product/index.vue'),
    props:true
  },
  {
    name: 'comment',
    path: '/comment/:productId',
    component: () => import('@/views/Comment/index.vue'),
    props:true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
