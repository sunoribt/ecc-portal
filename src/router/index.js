import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '管理控制台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理控制台', icon: 'dashboard' }
    }]
  },
  {
    path: '/userManager',
    component: Layout,
    redirect: '/userManager/user',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'user',
        name: '客户',
        component: () => import('@/views/user/index'),
        meta: { title: '客户', icon: 'user' }
      }, {
        path: 'auth',
        name: 'IP授权',
        component: () => import('@/views/table/index'),
        meta: { title: 'IP授权', icon: 'el-icon-s-check' }
      }, {
        path: 'account',
        name: '账号设置',
        component: () => import('@/views/table/index'),
        meta: { title: '账号设置', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/api',
    name: '产品信息',
    meta: { title: '产品信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'api',
        name: '接口信息',
        component: () => import('@/views/user/index'),
        meta: { title: '接口信息', icon: 'api' }
      }, {
        path: 'config',
        name: '配置',
        component: () => import('@/views/table/index'),
        meta: { title: '配置', icon: 'table' }
      }
    ]
  },
  {
    path: '/supplier',
    component: Layout,
    redirect: '/supplier/test1',
    name: '供应商管理',
    meta: { title: '供应商管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'test1',
        name: '供应商',
        component: () => import('@/views/user/index'),
        meta: { title: '供应商', icon: 'user' }
      }, {
        path: 'test2',
        name: 'API接口',
        component: () => import('@/views/table/index'),
        meta: { title: 'API接口', icon: 'table' }
      }
    ]
  },
  {
    path: '/finance',
    name: '财务',
    component: Layout,
    redirect: '/finance/charge',
    meta: { title: '财务', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'charge',
        name: '充值',
        component: () => import('@/views/user/index'),
        meta: { title: '充值', icon: 'table' }
      },
      {
        path: 'history',
        name: '充值历史',
        component: () => import('@/views/user/index'),
        meta: { title: '充值', icon: 'table' }
      }
    ]
  }, {
    path: '/history',
    name: '交易记录',
    component: Layout,
    redirect: '/history/detail',
    meta: { title: '请求记录', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'detail',
        name: '请求日志',
        component: () => import('@/views/user/index'),
        meta: { title: '请求日志', icon: 'table' }
      },
      {
        path: 'test',
        name: '请求记录',
        component: () => import('@/views/user/index'),
        meta: { title: '请求记录', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
