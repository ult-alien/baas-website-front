<template>
  <pl-content-box>
    <pl-content-box-toolbar class="top">
      <el-form label-width="100px" >
        <el-row>
          <el-col :span="10">
            <el-form-item label="企业名称：">
              <el-input v-model="params.cusName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button  icon="el-icon-search"  type="primary"  @click="reload">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block v-loading="loading">
      <pl-page-table
        :data-fun="getData"
        ref="pageTable"
        empty-text="暂无数据"
        row-key="acctId"
        :params="params">
        <el-table-column width="280" header-align="center" align="center" label="企业名称" class-name="right-boder">
          <template slot-scope="scope">
            {{ scope.row.cusName }}
          </template>
        </el-table-column>
        <el-table-column width="100" header-align="center" align="center" label="变更项数量" class-name="right-boder">
          <template slot-scope="scope">
            {{ scope.row.modNum }}
          </template>
        </el-table-column>
        <el-table-column  label="申请日期" width="180">
          <template slot-scope="scope">
            {{ scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column  label="申请人" width="180">
          <template slot-scope="scope">
            {{ scope.row.applyer}}
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="200" fixed="right"  header-align="center" align="center" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" round @click="aprv(scope.row)" >立即审批</el-button>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
  </pl-content-box>
</template>
<script>
  export default {
    props: ['state'],
    data () {
      let self = this;
      return {
        getData: this.$api.cust.customer.getAprvCus,
        loading: false,
        params: {
          cusName: '',
          cusState: self.state
        }
      };
    },
    methods: {
      reload () {
        this.$refs.pageTable.reload();
      },
      aprv (row) {
        this.$router.push({name: 'bsp.biz.cus-modify-detail', params: row});
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
