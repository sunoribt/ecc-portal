<template>
  <!--表格渲染-->
  <div class="app-container">
    <el-row class="el-button-group">
      <el-button type="success">新增</el-button>
      <el-button type="success">修改</el-button>
      <el-button type="danger">删除</el-button>
    </el-row>
    <el-table
      class="customer-table"
      :data="list"
      border
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" prop="userName" label="客户名称" />
      <el-table-column :show-overflow-tooltip="true" prop="userCode" label="客户代码" />
      <el-table-column :show-overflow-tooltip="true" prop="money" label="余额" />
      <el-table-column :show-overflow-tooltip="true" prop="status" label="状态" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
    </el-table>
    <el-pagination />
  </div>
</template>

<script>
import { getList } from '@/api/customer'
export default {
  name: 'Customer',
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.info('fetchData...')
      getList().then(response => {
        this.list = response.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
.customer-table {
  margin-top: 10px;
}
</style>
