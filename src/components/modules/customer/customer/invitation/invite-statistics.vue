<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        用户所属企业类型：<pl-constant-select type="CustomerConstants.CusType" v-model="params.cusType" :showEmpty="true" ></pl-constant-select>
        &emsp;
        关键字搜索：<el-input style="width: 240px;" v-model="params.searchStr" placeholder="按用户姓名/所属企业关键字查询"></el-input>
      </div>
      <div class="pull-right">
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <div class="summary">
        共<span class="num">{{total.registerNum}}</span>位客户受邀注册，其中<span class="num">{{total.accreditationNum}}</span>位客户受邀认证，<span class="num">{{total.dctNum}}</span>位客户发生融资业务
      </div>
      <pl-page-table :data-fun="getCusData" :params="params" ref="pageTable" style="width:100%" @after-load="queryTotal">
        <el-table-column  prop="userName" label="用户姓名" width="150"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="phoneNo" label="手机号" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="customerC.cusName" label="所属企业" width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="企业类型" width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.customerC.cusType | constant('CustomerConstants.CusType')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="受邀注册企业数" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.registerNum === 0">{{ scope.row.registerNum}}</span>
            <a href="javascript: void(0);" class="link" @click="toDetail(scope.row.userId, 'register');" v-if="scope.row.registerNum > 0">{{ scope.row.registerNum}}</a>
          </template>
        </el-table-column>
        <el-table-column label="受邀认证企业数" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.accreditationNum === 0">{{ scope.row.accreditationNum}}</span>
            <a href="javascript: void(0);" class="link" @click="toDetail(scope.row.userId, 'accreditation');" v-if="scope.row.accreditationNum > 0">{{ scope.row.accreditationNum}}</a>
          </template>
        </el-table-column>
        <el-table-column  label="受邀融资企业数" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.dctNum === 0">{{ scope.row.dctNum}}</span>
            <a href="javascript: void(0);" class="link" @click="toDetail(scope.row.userId, 'dct');" v-if="scope.row.dctNum > 0">{{ scope.row.dctNum}}</a>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
  </pl-content-box>
</template>
<script>
  export default {
    data () {
      return {
        getCusData: this.$api.cust.inviteStatistics.getInviteStatisticsList,
        params: {
          cusType: '',
          searchStr: ''
        },
        total: {}
      };
    },
    methods: {
      query () {
        this.$refs.pageTable.reload(this.params);
      },
      queryTotal () {
        // 查询概况
        this.$api.cust.inviteStatistics.getInviteStatisticsTotal(this.params).then(ret => {
          this.total = ret;
        });
      },
      toDetail (userId, statisticsType) {
        this.$router.push({ name: 'bsp.biz.invite-statistics-details', params: {userId, statisticsType} });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/index";
  @import "../../../../../assets/scss/variables";
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
  .summary{
    padding: 10px 0;
    .num{
      color: $primary-color;
      font-size: 1.2em;
    }
  }
</style>



