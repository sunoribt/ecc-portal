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
      }
      // }, {
      //   path: 'ip',
      //   name: 'IP授权',
      //   component: () => import('@/views/user/ip/index'),
      //   meta: { title: 'IP授权', icon: 'el-icon-s-check' }
      // }, {
      //   path: 'account',
      //   name: '账号设置',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: '账号设置', icon: 'el-icon-setting' }
      // }
    ]
  },
  {
    path: '/trade',
    name: '交易信息',
    component: Layout,
    redirect: '/trade/dayReport',
    meta: { title: '交易信息', icon: 'reportinfo' },
    children: [
      {
        path: 'dayReport',
        name: '日报表',
        component: () => import('@/views/trade/day/index'),
        meta: { title: '日报表', icon: 'callreport' }
      },
      {
        path: 'monthReport',
        name: '月报表',
        component: () => import('@/views/trade/month/index'),
        meta: { title: '月报表', icon: 'el-icon-s-marketing' }
      },
      {
        path: 'detail',
        name: '交易明细',
        component: () => import('@/views/trade/detail/index'),
        meta: { title: '交易明细', icon: 'calldetail' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/api',
    name: '产品信息',
    meta: { title: '产品信息', icon: 'el-icon-s-help' }
  },
  {
    path: '/supplier',
    component: Layout,
    redirect: '/supplier/test1',
    name: '供应商管理',
    meta: { title: '供应商管理', icon: 'el-icon-s-help' }
  },
  {
    path: '/finance',
    name: '财务',
    component: Layout,
    redirect: '/finance/charge',
    meta: { title: '财务', icon: 'el-icon-s-help' }
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
