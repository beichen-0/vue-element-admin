<template>
  <div class="menu_top wflex rflex" ref="menuTop">
    <el-menu
      class="el-menu-demo rflex el-scrollbar2 top-scrollbar2"
      :background-color="menuObj.bgColor"
      :text-color="menuObj.textColor"
      :active-text-color="menuObj.activeTextColor"
      :default-active="$route.path"
      mode="horizontal"
    >
      <template v-for="(item, index) in topRouters">
        <router-link :to="$route.matched[1].path + '/' + item.path" :key="index">
          <el-menu-item :index="$route.matched[1].path + '/' + item.path">
            {{ $t(`commons.${item.path}`) }}
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'top-menu',
  data() {
    return {
      menuObj: {
        bgColor: '',
        textColor: '#303133',
        activeTextColor: '#ff6428'
      }
    }
  },
  computed: {
    ...mapGetters(['topRouters'])
  },
  created() {
    this.setLeftInnerMenu() // 针对刷新页面时，也需要加载顶部菜单
  },
  methods: {
    setLeftInnerMenu() {
      const titleList = this.$route.matched[1].meta.titleList
      const currentTitle = titleList && this.$route.matched[2].meta.title
      if( titleList && this.$route.matched[1].meta.routerType === 'leftmenu' ) { // 点击的为 左侧的2级菜单
        this.$store.dispatch('clickLeftInnerMenu', { 'titleList': titleList })
        this.$store.dispatch('clickTopMenu', { 'title': currentTitle })
      } else {
        this.$store.dispatch('clickLeftInnerMenu', { 'titleList': [] })
        this.$store.dispatch('clickTopMenu', { 'title': '' })
      }
    },
    getPath() {
      this.setLeftInnerMenu()
    }
  },
  watch: {
    '$route': 'getPath'
  }
}
</script>

<style lang="less" scoped>
.menu_top {
  .el-menu-demo {
    overflow-y: hidden;
    flex: 1;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    background-color: #ceeda8;
  }
}
</style>
