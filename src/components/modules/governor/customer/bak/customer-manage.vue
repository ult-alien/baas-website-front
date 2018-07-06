<template>
  <pl-content-box>
    <pl-page-nav>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <pl-dictionary-select style="width: 120px;" @change="reload" type="cus_type.cus_type_c" clearable v-model="params.cusType"></pl-dictionary-select>
        <el-input style="width: 200px;" v-model="params.searchVuale" placeholder="请输入客户名/客户号">
        </el-input>
        <el-button  icon="el-icon-search" type="default"  @click="reload"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" icon=" anticon icon-plus" @click="handleAdd()">新增</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable">
        <!--<el-table-column header-align="center" align="center" prop="socCrCode" label="统一社会信用代码" width="160"></el-table-column>-->
        <el-table-column  prop="cusName" label="客户名称"></el-table-column>
        <el-table-column  prop="cusCode" label="客户号" width="100"></el-table-column>
        <el-table-column  prop="cusType" label="客户类型" width="120">
          <template scope="scope">
            <span>{{ scope.row.cusType | dictionary('cus_type.cus_type_c')}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="cusState" label="客户状态" width="120">
          <template scope="scope">
            <span>{{ scope.row.cusState | constant('CustomerConstants.CusState')}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="250" fixed="right">
          <template scope="scope">
            <el-button-group>
              <el-button size="mini" @click="handleInfo(scope.row.cusId)">详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.row.cusId)" :disabled="scope.row.cusState === 'U'">修改</el-button>
              <el-button size="mini" @click="handleDelete(scope.row.cusId, false)" v-if="scope.row.cusState === 'E'">冻结</el-button>
              <el-button size="mini" @click="handleDelete(scope.row.cusId, true)" v-else>解冻</el-button>
              <el-button size="mini" @click="deletes(scope.row.cusId)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <parameter-cus ref="parameter"></parameter-cus>
  </pl-content-box>
</template>

<script>
import { MsgType } from 'core/constants';
import parameterCus from './parameter-cus.vue';
export default {
  data () {
    return {
      params: {
        cusName: '',
        cusCode: '',
        cusType: '',
        loginName: '',
        searchVuale: ''
      },
      getPageData: this.$api.bsp.customer.selectCustomerList,
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
    handleEdit (id) {
      this.$router.push({ name: 'bsp.biz.customer-edit', params: { id: id } });
    },
    handleAdd () {
      this.$router.push({ name: 'bsp.biz.customer-add' });
    },
    handleDelete (id, state) {
      this.$api.bsp.customer.updateState(id, state).then(ret => {
        if (MsgType.SUCCESS === ret.type) {
          this.$refs.pageTable.reload(this.params);
        }
      });
    },
    showParameter (id, cusType) {
      // console.log(cusType);
      this.$refs['parameter'].show(id, cusType);
    },
    deletes (id) {
      this.$confirm('删除后不可恢复，您确认要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {};
        obj.cusState = 'D';
        obj.cusId = id;
        this.$api.bsp.customer.updateCustomer(obj).then(ret => {
          if (MsgType.SUCCESS === ret.type) {
            this.$refs.pageTable.reload(this.params);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
