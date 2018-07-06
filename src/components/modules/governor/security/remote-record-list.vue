<template>
  <pl-content-box>
    <pl-page-nav>
     <div slot="nav-tip"></div>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
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
        <el-table-column header-align="center" align="center" prop="appName" label="应用名称" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="infName" label="接口名称" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="reqTime" label="请求时间" width="180"></el-table-column>
        <el-table-column header-align="center" align="center" prop="reqData" label="请求参数" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column header-align="center" align="center" prop="rspCode" label="响应代码" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="rspMsg" label="响应描述" width="250"></el-table-column>
        <el-table-column header-align="center" align="center" prop="rspData" label="响应数据" width="350" :show-overflow-tooltip="true"></el-table-column>
      </pl-page-table>
    </pl-content-box-block>
  </pl-content-box>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          sTime: '',
          eTime: ''
        },
        daterange: [],
        getPageData: this.$api.bsp.security.getRemoteRecordPageData
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


