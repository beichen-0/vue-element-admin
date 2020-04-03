import Vue from 'vue'
import Router from 'vue-router'
import { topRouterMap } from './topRouter'

// 引入组件
import Login from '@/views/login.vue'
import { Layout, Content } from '../layout'
import Index from '@/views/index/index.vue'
import userList from '@/views/userList/userList.vue'

process.env.NODE_ENV === 'development' ? Vue.use(Router) : null

function filterTopRouterMap(name) {
  let router = topRouterMap.find(item => {
    return item.parentName === name
  })
  return router.data
}

/**
 * 1 roles: 后台返回权限结构；
 * 
*/
// 手动跳转页面
const whiteList = ['/']

/**
 * path：''与path：'*'的区别
 * 1 path：'*', 会匹配所有的路径
 * 2 path：'', 
 * 
*/
// 默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    redirect: '/index/index',
    hidden: true
  },
  {
    path: '/index',
    name: 'index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'icondashboard'
    },
    noDropdown: true,
    children: [
      {
        path: 'index',
        meta: {
          title: '首页',
          icon: 'icondashboard',
          routerType: 'leftmenu'
        },
        component: Index
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 默认为'hash'模式
  base: '/permission/', // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
})

// 异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: "/userManger",
    name: "userManage",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "iconuser"
    },
    noDropdown: true,
    children: [
      {
        path: "userList",
        meta: {
          title: "用户管理",
          icon: "iconuser",
          routerType: "leftmenu"
        },
        component: userList
      }
    ]
  }
]