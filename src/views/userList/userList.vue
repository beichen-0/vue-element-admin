<template>
  <div class="fillcontain">
    <div class="contain">
      <div class="table_vontainer">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          highlight-current-row
          header-cell-name="table-header-class"
          style="width: 100%"
        >
          <el-table-column label="序号" widht="60" algin="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + (paginations.pageIndex - 1) * paginations.pageSize + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" align="center" prop="username" label="用户姓名"></el-table-column>
          <el-table-column width="180" align="center" prop="email" label="邮箱地址"></el-table-column>
          <el-table-column align="center" prop="address" label="注册地址"></el-table-column>
          <el-table-column width="80" align="center" prop="region" label="地区"></el-table-column>
          <el-table-column width="180" align="center" prop="ip" label="IP地址"></el-table-column>
          <el-table-column width="180" align="center" prop="createTime" label="注册时间"></el-table-column>
          <el-table-column width="180" align="center" prop="updateTime" label="登录时间"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                v-if="paginations.total > 0"
                :page-sizes="paginations.pageSizes"
                :page-size="paginations.pageSize"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page="paginations.pageIndex"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于那一页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      }
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      let para = {
        limit: this.paginations.pageSize,
        page: this.paginations.pageIndex
      };
      getUserList(para)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.paginations.total = res.data.total;
          this.tableData = res.data.userList;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 每页切换多少条
    handleCurrentChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getUserList();
    },
    // 上下分页
    handleSizeChange(page) {
      console.log(page);
      this.paginations.pageIndex = page;
      this.getUserList();
    }
  }
};
</script>

<style lang="less" scoped>
.fillcontain {
  padding-bottom: 0;
}
.contain {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
}
</style>
