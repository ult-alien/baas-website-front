<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <pl-dictionary-select style="width: 150px;"
                              :empty-key="all"
                              :invalid-dics="invalidDics"
                              @change="query" type="cus_type.cus_type_c"
                              clearable v-model="params.cusType">
        </pl-dictionary-select>
        <el-input style="width: 250px;" v-model="params.searchVuale" placeholder="机构名称">
        </el-input>

        <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
      </div>
      <div class="pull-right" >
        <el-dropdown>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="add(cusType['FOCAL_CO'])">新增核心企业</el-dropdown-item>
            <el-dropdown-item  @click.native="add(cusType['FINNER'])">新增保理公司</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getData" :params="params" ref="pageTable" style="width:100%">
        <el-table-column  prop="socCrCode" label="统一社会信用代码"></el-table-column>
        <el-table-column  prop="cusName" label="机构中文名称" width="150"></el-table-column>
      <!--  <el-table-column  label="法定代表人" width="120" prop="lrName"></el-table-column>-->
        <el-table-column  prop="contactorName" label="管理员" width="120"></el-table-column>
        <el-table-column  prop="contactorPhone" label="管理员手机号" width="150"></el-table-column>
        <el-table-column  label="类型" width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.cusType | constant('CustomerConstants.CusType')}}</span>
          </template>
        </el-table-column>
        <el-table-column   label="操作" width="120" fixed="right" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button-group>
                <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'"
                            @click="handleEdit(scope.row)"></el-button><!-- 修改 -->
                <el-button size="mini" icon="anticon icon-ellipsis" v-tooltip:hover.top="'详情'"
                            @click="handleView(scope.row)"></el-button><!-- 详情 -->
                <!--<el-button size="mini" icon="el-icon-check" v-tooltip:hover.top="'资产户初始化'"
                            @click="showAssetsInitializationDialog(scope.row)"></el-button>-->
            </el-button-group>
          </template>
        </el-table-column>

      </pl-page-table>
    </pl-content-box-block>

    <el-dialog
      title="将在区块链中创建并激活以下账户，请确认："
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="36%">
      <ul>
        <el-checkbox-group v-model="acctType">
          <li class="text-muted"><el-checkbox label="0" disabled>信用额度资产户：用于向核心企业发送授信额度</el-checkbox></li>
          <li class="text-muted"><el-checkbox label="1" disabled>链单资产户：企业融资后，央行持有的链单资产</el-checkbox></li>
          <li class="text-muted"><el-checkbox label="2">超额准备金账户：用于对应业务增长的准备金账户</el-checkbox></li>
        </el-checkbox-group>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assetsInitialization">确 定</el-button>
      </span>
    </el-dialog>
  </pl-content-box>
</template>
<script>
  import constantUtil from '../../../../core/utils/constant-util';
  let cusType = constantUtil.getConstantByKey('CustomerConstants.CusType');
  let all = cusType['FOCAL_CO'] + ',' + cusType['FINNER'];
  export default {
    data () {
      return {
        getData: this.$api.cust.customer.selectCustomerList,
        params: {
          searchVuale: '',
          cusType: all
        },
        dialogVisible: false,
        initializationData: {},
        acctType: ['0', '1'],
        cusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
        all: all,
        invalidDics: cusType['SUPPLIER'] + ',' + cusType['MEMBER']
      };
    },
    created () {
    },
    methods: {
      query () {
        this.$refs.pageTable.reload();
      },
      add (type) {
        this.$router.push({name: 'bsp.biz.cooperation-agency-edit', params: {cusType: type}});
      },
      handleEdit (row) {
        this.$router.push({name: 'bsp.biz.cooperation-agency-edit', params: {cusId: row.cusId, cusType: row.cusType}});
      },
      handleView (row) {
        this.$router.push({name: 'bsp.biz.cooperation-agency-detail', params: {cusId: row.cusId, cusType: row.cusType}});
      },
      showAssetsInitializationDialog (row) {
        this.initializationData = row;
        this.dialogVisible = true;
      },
      assetsInitialization () {
        window.alert(this.acctType);
        this.$message({
          type: 'warning',
          message: 'cusId为：' + this.initializationData.cusId + '尚未调用接口!'
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/index";
  @import "../../../../assets/scss/variables";
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  .assetsConfirm{
    width: 450px;
  }
</style>
