<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="reportDate"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-input
        v-model="searchCond.userCode"
        placeholder="客户代码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
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
      <el-table-column :show-overflow-tooltip="true" prop="creator" label="客户名称" />
      <el-table-column :show-overflow-tooltip="true" prop="openApi" label="接口名称" />
      <el-table-column :show-overflow-tooltip="true" prop="price" label="价格" />
      <el-table-column :show-overflow-tooltip="true" prop="free" :formatter="formatCharge" label="是否收费" />
      <el-table-column :show-overflow-tooltip="true" prop="globalNo" label="流水号" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
    </el-table>
  </div>
</template>

<script>

import { detailTrade } from '@/api/trade'

export default {
  name: 'Index',
  data() {
    return {
      list: null,
      reportDate: '',
      searchCond: {
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
      detailTrade(param).then(resp => {
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
    },
    formatCharge: function(row, column, cellValue, index) {
      return row.status === '1' ? '收费' : '不收费'
    }
  }
}
</script>

<style scoped>
  .trade-table {
    margin-top: 10px;
  }
</style>
