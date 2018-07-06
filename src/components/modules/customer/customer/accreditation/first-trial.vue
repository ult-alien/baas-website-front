<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户类型" label-width="80px">
              <pl-constant-select type="CustomerConstants.CusType" invalidKeys="FINNER" v-model="params.cusType" :showEmpty="true" ></pl-constant-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" label-width="80px">
            <el-form-item label="状态">
              <pl-constant-select type="CustomerConstants.CusState"  invalidKeys="E,U,D,0,1" v-model="params.cusState" :showEmpty="true" ></pl-constant-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" label-width="80px">
            <el-form-item label="企业名称">
              <el-input  v-model="params.cusName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" @click="query">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <!--<pl-content-box-toolbar>-->
      <!--<div class="pull-left" >-->
        <!--客户类型：<pl-constant-select type="CustomerConstants.CusType" invalidKeys="FINNER" v-model="params.cusType" :showEmpty="true" ></pl-constant-select>-->
        <!--&emsp;状态：<pl-constant-select type="CustomerConstants.CusState" invalidKeys="E,U,D,0,1" v-model="params.cusState" :showEmpty="true" ></pl-constant-select>-->
        <!--&emsp;<el-input style="width: 180px;" v-model="params.cusName" placeholder="请输入企业名称">-->
        <!--</el-input>-->
      <!--</div>-->
      <!--<div class="pull-right">-->
        <!--<el-button type="primary" @click="query">查询</el-button>-->
      <!--</div>-->
    <!--</pl-content-box-toolbar>-->
    <pl-content-box-block>
      <pl-page-table :data-fun="getCusData" :params="params" ref="pageTable" style="width:100%" default-sort-prop="cus_name" default-sort-order="descending">
        <el-table-column  prop="cusName" label="企业名称" :show-overflow-tooltip="true"  ></el-table-column>

        <el-table-column  label="企业类型" width="100">
          <template slot-scope="scope">
            <span >{{ scope.row.cusType | constant('CustomerConstants.CusType')}}</span>
          </template>
        </el-table-column>

        <el-table-column  label="证件类型" width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.lrIdType | dictionary('id_type')}}</span>
          </template>
        </el-table-column>

        <el-table-column  label="证件号码" prop="lrLisNo" width="180">
        </el-table-column>

        <!--<el-table-column  prop="certNum" label="申请证书数量" :show-overflow-tooltip="true"  width="120"></el-table-column>-->

        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.cusState === CusState['ENABLE']">已认证</span>
            <span v-else>{{ scope.row.cusState | constant('CustomerConstants.CusState')}}</span>
          </template>
        </el-table-column>

        <el-table-column   label="操作" width="80" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button-group>
                <el-button size="mini" icon=" el-icon-edit" v-if="scope.row.cusState === CusState['WAIT_FIRST_TRIAL'] || scope.row.cusState === CusState['LAST_TRIAL_BACK']" v-tooltip:hover.top="'认证审核'"
                            @click="handleEdit(scope.row)"></el-button><!-- 修改 -->
                <el-button size="mini" icon="anticon icon-ellipsis" v-else v-tooltip:hover.top="'详情'"
                            @click="handleView(scope.row)"></el-button><!-- 详情 -->
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
        getCusData: this.$api.cust.accreditation.getAuthenticatingCus,
        params: {
          cusType: '',
          cusState: '',
          cusName: ''
        },
        CusState: constantUtil.getConstantByKey('CustomerConstants.CusState')
      };
    },
    created () {
    },
    methods: {
      query () {
        this.$refs.pageTable.reload();
      },
      handleEdit (row) {
        this.$router.push({'name': 'bsp.biz.accreditation-details', params: row});
      },
      handleView (row) {
        this.$router.push({'name': 'bsp.biz.accreditation-view', params: row});
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
</style>



