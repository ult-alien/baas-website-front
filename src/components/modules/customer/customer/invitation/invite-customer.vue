<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
      	<el-select v-model="params.inviterId" placeholder="请选择" style="width: 180px;">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in organs"
            :key="item.cusId"
            :label="item.cusName"
            :value="item.cusId">
          </el-option>
        </el-select>
        &emsp;
        <el-input style="width: 180px;" v-model="params.inviteeName" placeholder="企业名称"></el-input>
        &emsp;
        <el-select  v-model="params.registered"placeholder="请选择" style="width: 120px;">
          <el-option value="" label="全部"></el-option>
          <el-option label="未注册" value="0"></el-option>
          <el-option label="已注册" value="1"></el-option>
        </el-select>
      </div>
      <div class="pull-right">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" icon=" anticon icon-plus" @click="handleEdit({})">新增</el-button>
        <el-button type="warning" icon="el-icon-share" :loading="invtLoading" @click="batchInvt">邀请</el-button>
        <el-button icon=" anticon icon-download " @click="handleImpt">导入</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table
        :data-fun="getCusData"
        :params="params"
        row-key="invtId"
        :show-checkbox="true"
        :selectable="selectable"
        @selection-change="handleSelectionChange"
        ref="pageTable" style="width:100%"
        default-sort-prop="create_time"
        default-sort-order="descending">
        <el-table-column  prop="inviterName" label="邀请企业"   :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="inviteeName" label="客户名称"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="contactorName" label="联系人" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="contactorPhone" label="联系人手机号" width="120"></el-table-column>
        <el-table-column  prop="inviterTimes" label="邀请次数" width="80"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span >{{ scope.row.registered === '1' ? '已注册' : '未注册'}}</span>
          </template>
        </el-table-column>
        <el-table-column   label="操作" width="130"  align="center" header-align="center">
          <template slot-scope="scope">
            <el-button-group>
                <el-button size="mini" :disabled="scope.row.registered === '1'"
                            @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="primary" :disabled="scope.row.registered === '1'"
                            @click="handleInvite(scope.row)">邀请</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <data-import ref="dataImportDialog"   @refresh="query"></data-import>
    <inviteCus ref="inviteCusDialog"  @refresh="query"></inviteCus>
    <!--<inviteCustomerAdd ref="customerAddDialog" @update-table="handleUpdateTable" @refresh="query"></inviteCustomerAdd>-->
    <inviteCustomerEdit ref="customerEditDialog"  @refresh="query"></inviteCustomerEdit>
  </pl-content-box>
</template>
<script>
  import {MsgType} from '../../../../../core/constants';
  import dataImport from './data-import.vue';
  import inviteCus from './invite-cus.vue';
  import inviteCustomerEdit from './invite-customer-edit.vue';
  export default {
    data () {
      return {
        getCusData: this.$api.cust.invite.findInvitations,
        params: {
          inviterId: '',
          inviteeName: '',
          registered: ''
        },
        loading: false,
        invtLoading: false,
        invtIds: '',
        organs: [],
        cusType: this.$store.state.contextData.user.ent.cusType
      };
    },
    created () {
//      this.$api.cust.invite.getFinAndFocalCusList().then(ret => {
//        this.organs = ret;
//      });
      this.$api.cust.customer.findCusByType('FOCAL_CO').then(ret => {
        this.organs = ret;
      });
    },
    components: {
      dataImport,
      inviteCus,
      inviteCustomerEdit
    },
    methods: {
      query () {
        this.$refs.pageTable.reload(this.params);
      },
      handleEdit (row) {
        this.$refs.customerEditDialog.show(row);
      },
      handleImpt (index, row) {
        this.$refs.dataImportDialog.show();
      },
      handleInvite (row) {
        this.$refs.inviteCusDialog.show(row);
      },
      handleUpdateTable () {
        this.$refs.pageTable.reload(this.params);
      },
      handleSelectionChange (items) {
        this.invtIds = '';
        this.invtIds = items.map((item) => {
          return item.invtId;
        }).join(',');
      },
      selectable (row) {
        if (row.registered === '1') {
          return false;
        }
        return true;
      },
      batchInvt () {
        if (!this.invtIds) {
          this.$alert('请选择要邀请的记录！', '提示', {
            confirmButtonText: '确定',
            type: MsgType.WARING
          });
          return;
        }

        this.invtLoading = true;
        this.$api.cust.invite.invite(this.invtIds).then(ret => {
          if (MsgType.SUCCESS === ret.type) {
            this.query();
          }
          this.invtLoading = false;
        });
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



