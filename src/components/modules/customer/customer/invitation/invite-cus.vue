<template>
  <el-dialog title="邀请注册" :visible.sync="inviteDialogVisible" width="500px">
  <pl-content-box-card class="no-border">
      <h4 style="text-align: center;">将以短信方式邀请以下客户注册平台，请确认</h4>
      <div  class="cus-info bg-light">
        <div class="text">
          <pl-content-item-text><span class="text-muted">客户名称</span>&ensp;{{form.inviteeName}}</pl-content-item-text>
          <pl-content-item-text><span class="text-muted">联&ensp;系&ensp;人</span>&ensp;{{form.contactorName}}</pl-content-item-text>
          <pl-content-item-text><span class="text-muted">联系电话</span>&ensp;{{form.contactorPhone}}</pl-content-item-text>
        </div>
        <div class="icon-bg"><i class="el-icon-message"></i></div>
      </div>
  </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
	  <el-button  @click="inviteDialogVisible = false">取消</el-button>
	  <el-button type="primary" :loading="loading" @click="invite">确定</el-button>
	</div>
  </el-dialog>
</template>

<script>
  import {MsgType} from '../../../../../core/constants';
  export default {
    props: {
      data: Object,
      invitType: {
        type: String,
        default: '0'
      }
    },
    data () {
      return {
        form: {
          invtId: '',
          inviterId: '',
          inviteeName: '',
          contactorName: '',
          contactorPhone: ''
        },
        loading: false,
        inviteDialogVisible: false
      };
    },
    methods: {
      show (obj) {
        this.inviteDialogVisible = true;
        this.form = obj;
      },
      invite () {
        this.loading = true;
        this.$api.cust.invite.invite(this.form.invtId, this.invitType).then(ret => {
          if (MsgType.SUCCESS === ret.type) {
            this.inviteDialogVisible = false;
            this.$emit('refresh');
          }
          this.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .cus-info{
    padding: 20px;
    margin-top: 20px;
    position: relative;
    .icon-bg{
      position: absolute;
      right: 20px;
      top: 30px;
      font-size:100px;
      color: #d7f3f3;
    }
    .text{
      position: relative;
      z-index: 1;
    }
  }
</style>


