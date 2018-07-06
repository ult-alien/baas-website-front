<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <div class="bg-gradient-green text-center" style="padding: 30px;color: #fff;">
      <div style="margin-bottom: 10px;">
        <span style="margin-left: -80px;">我的邀请码&emsp;</span>
        <span style="font-size: 30px;font-weight: bold;">{{inviteCode}}</span></div>
      <div>
        <i class="el-icon-question"></i>&nbsp;邀请合作伙伴入驻平台，每个入驻的伙伴完成第一笔融资后，将获得
        <span style="font-size: 18px;padding: 0px 5px;color: #FFEB3B;font-weight: bold;">千元现金</span>大奖！
      </div>
    </div>
    <pl-content-box-toolbar>
      <div class="pull-left" >
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
        <el-button type="primary" icon=" anticon icon-plus" @click="handleEdit({inviteeCusType: inviteeCusType})">新增</el-button>
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
        ref="pageTable"
        style="width:100%"
        default-sort-prop="create_time"
        default-sort-order="descending">
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
    <data-import ref="dataImportDialog" type="1" @refresh="query" :inviteeCusType="inviteeCusType"></data-import>
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
  import constantUtil from 'core/utils/constant-util';
  export default {
    data () {
      return {
        getCusData: this.$api.cust.invite.findSuppliers,
        params: {
          inviteeName: '',
          registered: ''
        },
        loading: false,
        invtLoading: false,
        invtIds: '',
        inviteCode: '',
        inviteeCusType: constantUtil.getConstantByKey('CustomerConstants.CusType')['SUPPLIER']
      };
    },
    created () {
      this.$api.cust.invite.getInviteCode().then(ret => {
        this.inviteCode = ret.inviteCode;
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
        this.$refs.customerEditDialog.show(row, false);
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
