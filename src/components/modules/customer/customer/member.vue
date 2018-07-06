<template>
   <div>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <el-input style="width: 200px;" v-model="params.searchValue" placeholder="请输入企业名称/企业编码">
        </el-input>
        <el-button  icon="el-icon-search"  type="default"  @click="reload"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" v-if="hasPermission('add-customer')" icon=" anticon icon-plus" @click="handleAdd()">新增</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable"  default-sort-prop="cus_name" default-sort-order="descending">
        <!--<el-table-column header-align="center" align="center" prop="socCrCode" label="统一社会信用代码" width="160"></el-table-column>-->
        <el-table-column  prop="cusName" label="企业名称"></el-table-column>
        <el-table-column  prop="cusCode" label="企业编码" width="100"></el-table-column>
        <el-table-column  prop="contactorName" label="管理员" width="120"></el-table-column>
        <el-table-column  prop="contactorPhone" label="管理员手机号" width="150"></el-table-column>
        <el-table-column  prop="cusState" label="客户状态" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.cusState | constant('CustomerConstants.CusState')}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" @click="handleInfo(scope.row.cusId)">详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.row.cusId)" v-if="hasPermission('edit-customer')">修改</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <parameter-cus ref="parameter"></parameter-cus>
   </div>
</template>

<script>
import parameterCus from './parameter-cus.vue';
import constantUtil from '../../../../core/utils/constant-util';
const cusType = constantUtil.getConstantByKey('CustomerConstants.CusType');
export default {
  data () {
    return {
      params: {
        cusName: '',
        cusCode: '',
        cusType: '',
        loginName: '',
        searchValue: ''
      },
      getPageData: this.$api.cust.customer.findMemberForFin,
      msg: ''
    };
  },
  components: {
    parameterCus
  },
  methods: {
    reload () {
      this.$refs.pageTable.reload(this.params);
    },
    handleInfo (id) {
      this.$router.push({ name: 'bsp.biz.customer-info', params: { id: id } });
    },
    showParameter (id, cusType) {
      // console.log(cusType);
      this.$refs['parameter'].show(id, cusType);
    },
    handleEdit (cusId) {
      this.$router.push({name: 'bsp.biz.customer-edit', params: {cusId, cusType: cusType['MEMBER']}});
    },
    handleAdd () {
      this.$router.push({name: 'bsp.biz.customer-edit', params: {cusType: cusType['MEMBER']}});
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
