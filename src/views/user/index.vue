<template>
  <div class="app-container">
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
          <el-input v-model="form.password" type="password" placeholder="请输入新密码">
            <i
              slot="suffix"
              title="显示密码"
              style="cursor:pointer;"
              class="iconfont icon-xianshizy"
              @click="changePass('show')"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="全称" prop="fullName">
          <el-input v-model="form.fullName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.number="form.email" />
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
        :data="list"
        border
      >
        <el-table-column type="selection" width="55" />
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
import { getList } from '@/api/customer'
import { isvalidPhone } from '@/utils/validate'

export default {
  name: 'User',
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }

    return {
      dialogTitle: '新增用户',
      createOrUpdateDialog: false,
      list: null,
      form: {
        userName: '',
        password: '',
        fullName: '',
        phone: '',
        email: ''
      },
      passwordVisible: true,
      crud: 1,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone },
          { min: 11, max: 11, message: '请输入11位数的手机号', trigger: 'blur' }
        ]
      }
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
      this.dialogTitle = '新增用户'
      this.createOrUpdateDialog = true
      console.info('create user ...')
    },
    updateUser() {
      this.dialogTitle = '修改用户'
      this.createOrUpdateDialog = true
      console.info('update user..')
    },
    deleteUser() {
      console.info('delete user..')
    },
    cancelCU() {
      this.createOrUpdateDialog = false
      console.info('cancel create or update user.')
    },
    submitCU() {
      if (this.crud === 1) {
        this.$store.dispatch('user', this.form).then(() => {
          console.info('create user success.')
        }).catch(() => {
          console.error('create user failed..')
        })
      }
      console.info('submit create or update user')
    },
    changePass(value) {
      this.passwordVisible = !(value === 'show')
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
