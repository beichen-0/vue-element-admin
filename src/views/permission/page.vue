<template>
  <div class="fillcontain">
    <div class="contaion" ref="contain">
      <switch-roles @change="handleRolesChange"></switch-roles>
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import *  as mutils from "@/utils/mutils.js"

export default {
  name: "pagePermission",
  components: {
    SwitchRoles
  },
  mounted() {
    mutils.setContentHeight(this, this.$refs.contain, 210)
  },
  methods: {
    handleRolesChange() {
      this.$router.push({
        path: "/permission/index?time=",
        query: +new Date()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.contain {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>
