<template>
  <pl-content-box>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <pl-constant-select type="PubConstants.UserState"  invalidKeys="E,U,D,I,0,2" v-model="params.userState" :showEmpty="true" style="width: 120px;"></pl-constant-select>
        <el-input  v-model="params.queryValue" placeholder="请输入用户名称/企业名称" style="width: 200px;"></el-input>
        <el-button  icon="el-icon-search" @click="query"></el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getData" :params="params" ref="pageTable" style="width:100%" default-sort-prop="opr_time" default-sort-order="descending">
        <el-table-column  label="用户姓名" width="100" prop="userName" :show-overflow-tooltip="true"  ></el-table-column>
        <el-table-column  label="手机号" width="140" prop="phoneNo"></el-table-column>
        <el-table-column  label="所属企业" width="150" prop="entName"></el-table-column>
        <el-table-column  label="角色" prop="userRoleNames"></el-table-column>
        <el-table-column  label="申请时间"  width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.oprTime | date('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userState | constant('PubConstants.UserState')}}</span>
          </template>
        </el-table-column>

        <el-table-column   label="操作" width="80" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button-group>
                <el-button size="mini" v-if="scope.row.userState === UserState['DZS']" type="primary"  @click="handleApr(scope.row)">
                  审批
                </el-button>
                <el-button size="mini" v-else @click="handleApr(scope.row)">
                  详情
                </el-button>
            </el-button-group>
          </template>
        </el-table-column>

      </pl-page-table>
    </pl-content-box-block>
  </pl-content-box>
</template>
<script>
  import constantUtil from 'core/utils/constant-util';
  export default {
    data () {
      return {
        getData: this.$api.bsp.user.selectUserForLastTrial,
        params: {
          userState: '',
          queryValue: ''
        },
        UserState: constantUtil.getConstantByKey('PubConstants.UserState')
      };
    },
    created () {
    },
    methods: {
      query () {
        this.$refs.pageTable.reload();
      },
      handleApr (row) {
        let params = {
          userId: row.userId,
          entId: row.entId,
          oprTime: row.oprTime,
          oprName: row.oprName
        };
        this.$router.push({'name': 'bsp.biz.user-last-trial-detail', params});
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../../assets/scss/index";
  @import "../../../../../../assets/scss/variables";
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
</style>



