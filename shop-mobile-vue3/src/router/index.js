import store from '@/store/index'
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
    component: () => import('@/views/Cart/index.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/Category/index.vue')
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/Order/index.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: () => import('@/views/Recommend/index.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/User/index.vue'),
    meta:{
      requireAuth:true
    }
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

// 导航守卫
router.beforeEach(to => {
  // 不需要权限
  if(!to.meta.requireAuth) {
    return true
  }
  // 校验登录状态
  if(!store.state.user || !window.localStorage.getItem('USER_TOKEN')){
    // 跳转登录页
    return {
      name:'login',
      query:{
        redirect:to.fullPath
      }
    }
  }
})
export default router
