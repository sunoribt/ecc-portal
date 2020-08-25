<template>
  <div class="app-container">

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="deleteDialog"
      :title="dialogTitle"
      width="570px"
    >
      <span>确认删除用户吗?   {{ currentRow.fullName }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancelCU">取消</el-button>
        <el-button type="primary" @click="submitCU">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="createOrUpdateDialog"
      :title="dialogTitle"
      width="570px"
    >
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="全称" prop="fullName">
          <el-input v-model="form.fullName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="1" label="激活" />
            <el-option value="0" label="停用" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancelCU">取消</el-button>
        <el-button type="primary" @click="submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <div>
      <el-row class="el-button-group">
        <el-button type="success" @click="createUser">新增</el-button>
        <el-button type="success" @click="updateUser">修改</el-button>
        <el-button type="danger" @click="deleteUser">删除</el-button>
      </el-row>
      <el-table
        class="user-table"
        highlight-current-row
        :data="list"
        border
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="55" />
        <el-table-column :show-overflow-tooltip="true" prop="fullName" label="客户名称" />
        <el-table-column :show-overflow-tooltip="true" prop="code" label="客户代码" />
        <el-table-column :show-overflow-tooltip="true" prop="money" label="余额" />
        <el-table-column :show-overflow-tooltip="true" prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status">正常</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
      </el-table>
      <el-pagination />
    </div>
  </div>
</template>

<script>
import { getList, addUser, updateUser, deleteUser } from '@/api/user'

export default {
  name: 'User',
  data() {
    return {
      dialogTitle: '新增用户',
      createOrUpdateDialog: false,
      deleteDialog: false,
      list: null,
      form: {
        userName: '',
        password: '',
        fullName: '',
        phone: '',
        email: ''
      },
      passwordVisible: true,
      crud: 1, // 1:create 2:read 3:update 4:delete
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入全称', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      },
      currentRow: {}
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
    },
    createUser() {
      this.resetDialogData()
      this.dialogTitle = '新增用户'
      this.createOrUpdateDialog = true
      this.crud = 1
    },
    updateUser() {
      if (this.currentRow == null || Object.keys(this.currentRow).length === 0) {
        this.$message('请选择用户')
        return
      }
      this.crud = 3
      this.form = this.currentRow
      this.dialogTitle = '修改用户'
      this.createOrUpdateDialog = true
    },
    deleteUser() {
      if (this.currentRow == null || Object.keys(this.currentRow).length === 0) {
        this.$message('请选择用户')
        return
      }
      this.crud = 2
      this.dialogTitle = '删除用户'
      this.deleteDialog = true
    },
    cancelCU() {
      this.createOrUpdateDialog = false
      this.deleteDialog = false
    },
    submitCU() {
      if (this.crud === 1) {
        addUser(this.form).then(resp => {
          this.fetchData()
          this.createOrUpdateDialog = false
        }).catch(error => {
          console.info(error)
        })
      } else if (this.crud === 3) {
        updateUser(this.form).then(resp => {
          this.fetchData()
          this.createOrUpdateDialog = false
        }).catch(error => {
          console.error(error)
        })
      } else if (this.crud === 2) {
        deleteUser(this.currentRow.id).then(resp => {
          this.fetchData()
          this.deleteDialog = false
          this.currentRow = {}
        }).catch(err => {
          this.deleteDialog = false
          this.currentRow = {}
          console.error(err)
        })
      }
      console.info('submit create or update user')
    },
    changePass(value) {
      this.passwordVisible = !(value === 'show')
    },
    resetDialogData() {
      this.form = {}
    },
    handleCurrentChange(val) {
      console.info('current row change...')
      this.currentRow = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control, ::v-deep .vue-treeselect__placeholder, ::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}

.user-table {
  margin-top: 10px;
}
</style>
