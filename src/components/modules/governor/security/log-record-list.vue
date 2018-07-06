<template>
  <pl-content-box>
    <pl-page-nav>
      <div slot="nav-tip"></div>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="操作用户">
              <el-input v-model="params.userName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="日期范围" prop="daterange" :rules="[
                  {type:'array', message: '选择日期范围', trigger: 'change' }
                ]">
              <pl-date-picker v-model="daterange" type="daterange"   placeholder="选择日期范围"></pl-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary" icon=" anticon icon-search" @click="reload">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable">
        <el-table-column header-align="center" align="center" prop="userName" label="操作用户" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="logLevel" label="日志级别" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="logType" label="日志类别" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="logTime" label="日志时间" width="180"></el-table-column>
        <el-table-column header-align="center" align="center" prop="logNote" label="描述" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="logContent" label="内容" width="350" :show-overflow-tooltip="true"></el-table-column>
      </pl-page-table>
    </pl-content-box-block>
  </pl-content-box>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          userName: '', // 用户名称
          logType: '', // 日志类别
          sTime: '',
          eTime: ''
        },
        daterange: [],
        getPageData: this.$api.bsp.security.getLogPageData
      };
    },
    methods: {
      reload () {
        if (this.daterange !== undefined && this.daterange.length > 0) {
          this.params.sTime = this.daterange[0];
          this.params.eTime = this.daterange[1];
        }
        this.$refs.pageTable.reload(this.params);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>


