<template>
  <div class="menu_left cflex" :style="{width: sidebar.width+'px'}">
    <div class="menu_page_top rflex">
      <img :class="['logo', {'closeLogo': !sidebar.opened}]" :src="logo" alt="星辰admin">
      <span class="title" v-show="sidebar.opened">{{$t('commons.xingchen')}}<i>Admin</i></span>
    </div>
    <div class="menu_page_bottom is-scroll-left">
      <el-menu
        theme="dark"
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="menuObj.bgColor"
        :text-color="menuObj.TEXTColor"
        :active-text-color="menuObj.activeTextColor"
        :style="{width: sidebar.width+'px'}"
      >
        <template v-for="(item, index) in permission_routers">
          <!-- 表示 有一级菜单 -->
          <router-link
            v-if="!item.hidden && item.noDropdown"
            :to="item.path+'/'+item.children[0].path"
            :key="index"
          >
            <el-menu-item
              class="dropItem"
              :index="item.path+'/'+item.children[0].path"
            >
              <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" />
              <span v-if="item.meta.title" slot="title">{{$t(`commons.${item.name}`)}}</span>
            </el-menu-item>
          </router-link>

          <!-- 表示有二级或者多级菜单 -->
          <el-submenu
            v-if="item.children && item.children.length >= 1 && !item.hidden && !item.noDropdown"
            :index="item.path"
            :key="index"
          >
            <template slot="title">
              <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" />
              <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`) }}</span>
            </template>
            <!-- 导航定位于子路由 -->
            <router-link 
              v-for="(citem, cindex) in item.children"
              :key="cindex"
              :to="getIndex(citem, item, cindex)"
            >
              <el-menu-item
                v-if="citem.meta.routeType !== 'topmenu' && citem.meta.title"
                :index="getIndex(citem, item, cindex)">
                <span slot="title">{{ $t(`commons.${citem.name}`) }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mutils from '@/utils/mutils'
import logoImg from '@/assets/img/logo.png'
export default {
  name: 'left-menu',
  data() {
    return {
      menuObj: {
        bgColor: '#fff',
        textColor: '#666',
        activeTextColor: '#ff6428'
      },
      logo: logoImg
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'isCollapse',
      'sidebar',
      'menuIndex'
    ])
  },
  methods: {
    getIndex(citem, item, cindex) {
      return (citem.meta.titleList) ? item.path + '/' + citem.path + '/' + citem.meta.titleList[0].path : item.path + '/' + citem.path
    }
  }
}
</script>

<style lang="less" scoped>
@left-bgColor: #fff;
@iconlink: #ff6c60;
.menu_left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.menu_page_top {
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, .5);
  .logo {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    display: inline-block;
  }
  .closeLogo {
    width: 30px;
    height: 30px;
  }
  .title {
    font-size: 22px;
    i {
      color: #ff6c60;
    }
  }
}
.menu_page_bottom {
  width: 100%;
  overflow-y:  scroll;
  overflow-x: hidden;
  flex: 1;
  margin-top: 3px;
  z-index: 10;
  box-shadow: 0 0 10px 0 rgba(230, 224, 224, .5);
  .dropItem {
    span {
      padding-left: 16px;
    }
  }
}
</style>
