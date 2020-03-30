import Vue from 'vue'
import Router from 'vue-router'
// import { Layout, Content } from '../layout'
import { topRouterMap } from './topRouter'
import { Progress } from 'element-ui'
import Login from '@/views/login.vue'

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
  }
]

export default new Router({
  mode: 'history', // 默认为'hash'模式
  // base: '/permission/', // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
})

// 异步路由（需要权限的页面）
export const asyncRouterMap = []