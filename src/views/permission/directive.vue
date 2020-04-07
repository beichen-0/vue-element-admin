<template>
  <div class="fillcontain">
    <div class="contain" ref="contain">
      <switch-roles @change="handleRolesChange" />
      <div class="cflex" :key="key">
        <span class="permission-alert" v-permission="['admin']">
          <el-button type="warning">admin</el-button>
          <el-button type="danger">危险按钮</el-button>
        </span>
        <span class="permission-alert" v-permission="['editor']">
          <el-button type="success">编辑</el-button>
          <el-button type="info">信息按钮</el-button>
        </span>

        <span class="permission-alert" v-permission="['admin','editor']">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import permission from "@/directive/permission/index.js"
import SwitchRoles from './components/SwitchRoles'
import * as mutils from '@/utils/mutils'

export default {
  name: 'directivePermission',
  components: {
    SwitchRoles
  },
  directives: {
    permission
  },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  mounted() {
    mutils.setContentHeight(this, this.$refs.contain, 210)
  },
  methods: {
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="less" scoped>
.fillcontain {
  .contain{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .cflex{
    .permission-alert{
       margin-bottom: 20px;
    }
  }
}
</style>
