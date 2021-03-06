import Vue from 'vue'
import VueRouter from 'vue-router'

// import login from '../components/login.vue'
// import home from '../components/home.vue'
// import welcome from '../components/welcome.vue'
// import users from '../components/user/users.vue'
const login = () => import(/* webpackChunkName:"router_a" */ '../components/login.vue')
const home = () => import(/* webpackChunkName:"router_a" */ '../components/home.vue')
const welcome = () => import(/* webpackChunkName:"router_a" */ '../components/welcome.vue')
const users = () => import(/* webpackChunkName:"router_a" */ '../components/user/users.vue')

// import rights from '../components/rights/rights.vue'
// import roles from '../components/rights/roles.vue'
const rights = () => import(/* webpackChunkName:"router_b" */ '../components/rights/rights.vue')
const roles = () => import(/* webpackChunkName:"router_b" */ '../components/rights/roles.vue')

// import cate from '../components/goods/cate.vue'
// import params from '../components/goods/params.vue'
// import list from '../components/goods/list.vue'
// import add from '.././components/goods/add.vue'
const cate = () => import(/* webpackChunkName:"router_c" */ '../components/goods/cate.vue')
const params = () => import(/* webpackChunkName:"router_c" */ '../components/goods/params.vue')
const list = () => import(/* webpackChunkName:"router_c" */ '../components/goods/list.vue')
const add = () => import(/* webpackChunkName:"router_c" */ '.././components/goods/add.vue')

// import order from '../components/order/order.vue'
// import chart from '../components/chart/chart.vue'
const order = () => import(/* webpackChunkName:"router_d" */ '../components/order/order.vue')
const chart = () => import(/* webpackChunkName:"router_d" */ '../components/chart/chart.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 访问首页时重定向到登录页面
  { path: '/login', component: login },
  {
    path: '/home',
    redirect: '/welcome', // 设置home页面的默认显示界面
    component: home,
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: users },
      { path: '/rights', component: rights },
      { path: '/roles', component: roles },
      { path: '/categories', component: cate },
      { path: '/params', component: params },
      { path: '/goods', component: list },
      { path: '/add', component: add },
      { path: '/orders', component: order },
      { path: '/reports', component: chart}
    ]
  } // home页面的路由
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取浏览器存储的token值进行判断是否是登录状态
  const loginToken = window.sessionStorage.getItem('token')
  if (loginToken) { // token值存在的情况
    next()
  } else { // token值不存在的情况
    if (to.path === '/login') {
      next() // token值不存在，是在login界面的情况
    } else { // token值不存在，不是在login界面的情况
      next('/login')
    }
  }
})

export default router
