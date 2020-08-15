<template>
  <!--表格渲染-->
  <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;"
            @selection-change="crud.selectionChangeHandler">
    <el-table-column :selectable="checkboxT" type="selection" width="55"/>
    <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名"/>
    <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称"/>
    <el-table-column prop="gender" label="性别"/>
    <el-table-column :show-overflow-tooltip="true" prop="phone" width="100" label="电话"/>
    <el-table-column :show-overflow-tooltip="true" width="135" prop="email" label="邮箱"/>
    <el-table-column :show-overflow-tooltip="true" prop="dept" label="部门">
      <template slot-scope="scope">
        <div>{{ scope.row.dept.name }}</div>
      </template>
    </el-table-column>
    <el-table-column label="状态" align="center" prop="enabled">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.enabled"
          :disabled="user.id === scope.row.id"
          active-color="#409EFF"
          inactive-color="#F56C6C"
          @change="changeEnabled(scope.row, scope.row.enabled)"
        />
      </template>
    </el-table-column>
    <el-table-column :show-overflow-tooltip="true" prop="createTime" width="135" label="创建日期">
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.createTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-permission="['admin','user:edit','user:del']"
      label="操作"
      width="115"
      align="center"
      fixed="right"
    >
      <template slot-scope="scope">
        <udOperation
          :data="scope.row"
          :permission="permission"
          :disabled-dle="scope.row.id === user.id"
        />
      </template>
    </el-table-column>
  </el-table>
  <!--分页组件-->
  <!--  <pagination />-->
</template>

<script>
export default {
  name: "index.vue"
}
</script>

<style scoped>

</style>
