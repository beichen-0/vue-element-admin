<template>
  <div class="home rflex">
    <left-menu />
    <div class="menu_right wflex el-scrollbar" ref="menu_right" :style="{left:sidebar.width + 'px'}">
      <header-nav />
      <div class="menu_content" ref="menu_content">
        <bread />
        <!-- 页面渲染入口 -->
        <router-view></router-view>
      </div>
      <footer-nav />
      <back-top :ele="$refs.menu_right" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import HeaderNav from './headerNav.vue'
import LeftMenu from './leftMenu.vue'
import Bread from './bread.vue'
import FooterNav from './footerNav.vue'
import backTop from 'cps/backTop/index.vue'

export default {
  name: 'home',
  computed: {
    ...mapGetters(['sidebar'])
  },
  components: {
    HeaderNav,
    LeftMenu,
    Bread,
    FooterNav,
    backTop
  }
}
</script>

<style lang="less" scoped>
.home {
  .menu_right {
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f6f7fc;
    .menu_content {
      position: relative;
      margin-top: 60px;
      width: 100%;
      background-color: #f0f2f5;
    }
  }
}
</style>
