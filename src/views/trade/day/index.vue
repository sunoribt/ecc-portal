<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="reportDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-input v-model="searchCond.userCode" placeholder="客户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>
    <el-table
      class="trade-table"
      highlight-current-row
      :data="list"
      border
    >
      <el-table-column type="index" width="55" />
      <el-table-column :show-overflow-tooltip="true" prop="date" label="日期" />
      <el-table-column :show-overflow-tooltip="true" prop="userName" label="客户名称" />
      <el-table-column :show-overflow-tooltip="true" prop="openApiName" label="接口名称" />
      <el-table-column :show-overflow-tooltip="true" prop="all" label="总次数" />
      <el-table-column :show-overflow-tooltip="true" prop="success" label="成功次数" />
      <el-table-column :show-overflow-tooltip="true" prop="failed" label="失败次数" />
    </el-table>
  </div>
</template>

<script>

import { dayReport } from '@/api/trade'

export default {
  name: 'Index',
  data() {
    return {
      list: null,
      reportDate: '',
      searchCond: {
        type: '',
        startDate: '',
        endDate: '',
        userCode: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const param = {}
      if (this.reportDate === '') {
        param.start = new Date()
        param.end = new Date()
      } else {
        param.start = this.reportDate[0]
        param.end = this.reportDate[1]
      }
      param.userCode = this.searchCond.userCode
      dayReport(param).then(resp => {
        console.info('resp->' + resp)
        this.list = resp.data
      }).catch(err => {
        console.error('get trade error.' + err)
      })
      console.info('get list')
    },
    handleFilter() {
      console.info('search...')
      this.fetchData()
    }
  }
}
</script>

<style scoped>
  .trade-table {
    margin-top: 10px;
  }
</style>
