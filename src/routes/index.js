import Vue from 'vue'
import Router from 'vue-router'
import { topRouterMap } from './topRouter'

// 引入组件
import Login from '@/views/login.vue'
import { Layout, Content } from '../layout'
import Index from '@/views/index/index.vue'
import userList from '@/views/userList/userList.vue'
import fundList from "@/views/fundList/fundList.vue"
import chinaTabsList from "@/views/fundList/chinaTabsList.vue"
import fundPosition from "@/views/fundData/fundPosition.vue"
import typePosition from "@/views/fundData/typePosition.vue"
import incomePayPosition from "@/views/fundData/incomePayPosition.vue"
import share from "@/views/share"

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
  },
  {
    path: "/share",
    name: "share",
    component: Layout,
    meta: {
      title: "分享功能",
      icon: "iconshare"
    },
    noDropdown: true,
    children: [
      {
        path: "share",
        meta: {
          title: "分享功能",
          icon: "iconshare",
          routerType: "leftmenu"
        },
        component: share
      }
    ]
  },
  {
    path: "/infoManage",
    name: "infoManage",
    meta: {
      title: "信息管理",
      icon: "iconinfo"
    },
    component: Layout,
    children: [
      {
        path: "infoShow",
        name: "infoShow",
        meta: {
          title: "个人信息",
          icon: "iconinfo",
          routerType: "leftmenu",
          titleList: [
            {
              "path": "infoShow1",
              "title": "个人信息子菜单1"
            },
            {
              "path": "infoShow2",
              "title": "个人信息子菜单2"
            },
            {
              "path": "infoShow3",
              "title": "个人信息子菜单3"
            },
            {
              "path": "infoShow4",
              "title": "个人信息子菜单4"
            },
            {
              "path": "infoShow5",
              "title": "个人信息子菜单5"
            }
          ]
        },
        component: Content,
        children: filterTopRouterMap("infoShow")
      },
      {
        path: "infoModify",
        name: "infoModify",
        meta: {
          title: "修改信息",
          icon: "iconinfo",
          routerType: "leftmenu",
          titleList: [
            {
              "path": "infoModify1",
              "title": "修改信息子菜单1"
            },
            {
              "path": "infoModify2",
              "title": "修改信息子菜单2"
            },
            {
              "path": "infoModify3",
              "title": "修改信息子菜单3"
            }
          ]
        },
        component: Content,
        children: filterTopRouterMap('infoModify')
      }
    ]
  },
  {
    path: "/fundManage",
    name: "fundManage",
    meta: {
      title: "资金管理",
      icon: "iconpay3"
    },
    component: Layout,
    children: [
      {
        path: "fundList",
        name: "fundList",
        meta: {
          title: "资金流水",
          routerType: "letmenu"
        },
        component: fundList
      },
      {
        path: "chinaTabsList",
        name: "chinaTabsList",
        meta: {
          title: "区域投资",
          routerType: "letmenu"
        },
        component: chinaTabsList
      }
    ]
  },
  {
    path: "/fundData",
    name: "fundData",
    meta: {
      title: "资金数据",
      icon: "iconecharts",
    },
    component: Layout,
    redirect: "/fondData/fundPosition",
    children: [
      {
        path: "fundPosition",
        name: "fundPosition",
        meta: {
          title: "投资分布"
        },
        component: fundPosition
      },
      {
        path: "typePosition",
        name: "typePosition",
        meta: {
          title: "项目分布"
        },
        component: typePosition
      },
      {
        path: "incomePayPosition",
        name: "incomePayPosition",
        meta: {
          title: "收支统计"
        },
        component: incomePayPosition
      }
    ]
  }
]