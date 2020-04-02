<template>
  <section class="data_section" ref="data_section">
    <a href="h" target="_blank">
      <el-row :gutter="10" class="row_list">
        <el-col :span="8">
          <div class="row_left row_base">
            <el-col :span="12">
              <div class="pay saleBgcolor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">{{ $t('index.yearLoss') }}</p>
                  <p class="number">68
                    <span class="perTitle">({{ $t('index.tenMillon') }}})</span>
                  </p>
                </div>
                <div class="rightItem">
                  <icon-svg icon-class="iconfukuan" />
                </div>
              </div>
            </el-col>
            <el-col :span="12"></el-col>
          </div>
        </el-col>
        <el-col :span="16"></el-col>
      </el-row>
    </a>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>