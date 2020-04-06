<template>
  <div class="fillcontain">
    <div class="tabContainer" ref="tabContainer">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('eastChina')">
            <icon-svg icon-class="icondashboard" />华东区域
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('southChina')">
            <icon-svg icon-class="iconecharts" />华南区域
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('centralChina')">
            <icon-svg icon-class="iconinfo" />华中区域
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('northChina')">
            <icon-svg icon-class="iconpermission" />华北区域
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('northwestChina')">
            <icon-svg icon-class="iconuser" />西北区域
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('southwestChina')">
            <icon-svg icon-class="iconError" />西南地区
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('northeastChina')">
            <icon-svg icon-class="iconfufei0" />东北地区
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="toggleTabs('specialareaChina')">
            <icon-svg icon-class="iconpay1" />台港澳地区
          </span>
          <china-tabs-table :toggleDate="toggleDate"></china-tabs-table>
        </el-tab-pane>
      </el-tabs>
      <pagination :pageTotal="pageTotal"></pagination>
    </div>
  </div>
</template>

<script>
import chinaTabsTable from "./components/chinaTabsTable"
import Pagination from "@/components/pagination"
import data from "./data/chinaTabs.json"

export default {
  components: {
    chinaTabsTable,
    Pagination
  },
  data() {
    return {
      toggleDate: "",
      pageTotal: 60
    }
  },
  mounted() {
    this.toggleTabs("eastChina")
  },
  methods: {
    toggleTabs(item) {
      this.toggleDate = item
    }
  }
}
</script>

<style>
</style>
