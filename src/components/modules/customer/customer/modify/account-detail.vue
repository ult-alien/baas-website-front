<template>
  <el-dialog title="账户信息变更审批" :visible.sync="inviteDialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="110px" class="static-form" ref="form" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <pl-content-item-text v-tooltip="record.cusName">{{record.cusName}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              <pl-content-item-text>{{record.acctNo}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号名">
              <pl-content-item-text v-tooltip="record.acctName">{{record.acctName}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行">
              <pl-content-item-text>{{ record.bankName}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户地区">
              <pl-content-item-text>{{ record.bankProvince}}{{ record.bankCity}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户支行">
              <pl-content-item-text>{{ record.bankDot}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人">
              <pl-content-item-text>{{ record.applyer}}</pl-content-item-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期">
              <pl-content-item-text>{{ record.createTime}}</pl-content-item-text>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item prop="bankCertificateFile" label="账户证明">
              <pl-upload-file class="fileupload"
                              show-type="vertical"
                              :file-type="bankCertificateFile" 
                              save-path="bankAcct" 
                              ref="upload"
                              :size="5"
                              accept-type="bmp,jpg,png,jpeg"
                              :isEdit="false"
                              :relateId="record.cusId"
                              :api="fileApi" 
                              :multiple="true">

              </pl-upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="24">
            <el-form-item label="审核结果" label-width="100px" prop="aprvRs" :rules="[
                  {required: true, message: '请选择审核结果', trigger: 'change' }]">
              <pl-content-item-text>
                <el-radio-group v-model="form.aprvRs">
                  <el-radio :label="AprvRs['PASS']">确认无误</el-radio>
                  <el-radio :label="AprvRs['REJECT']">信息有误</el-radio>
                </el-radio-group>
              </pl-content-item-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;" v-if="form.aprvRs === AprvRs['REJECT']">
          <el-col :span="24">
            <el-form-item  label="驳回原因" prop="aprvRemark" :rules="[
                  {required: true, message: '请填写驳回原因', trigger: 'change' }]">
              <el-input type="textarea" v-model="form.aprvRemark" placeholder="请输入驳回原因..."></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
      <div slot="footer" class="dialog-footer text-center">
      <el-button  @click="inviteDialogVisible = false">取消</el-button>
      <el-button type="primary" element-loading-background="rgba(255, 255, 255, 0.4)" :loading="passLoading" @click="confirm">审批通过</el-button>
      <el-button type="info" :loading="rejectLoading" @click="reject">驳回</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from 'core/constants';
  import constantUtil from 'core/utils/constant-util.js';
  import {HttpPrefix} from '../../api/config.js';
  export default {
    data () {
      return {
        inviteDialogVisible: false,
        record: {},
        passLoading: false,
        rejectLoading: false,
        form: {
          aprvRs: '',
          aprvRemark: '',
          applyer: '',
          approver: ''
        },
        bankCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
        AprvRs: constantUtil.getConstantByKey('BizConstants.AprvRs'),
        fileApi: HttpPrefix.API
      };
    },
    methods: {
      show (obj) {
        this.inviteDialogVisible = true;
        this.record = obj;
        this.form.aprvRs = '';
        this.form.aprvRemark = '';
        this.form.applyer = obj.applyer;
        this.form.approver = obj.approver;
        this.$refs.form.resetFields();
      },
      confirm () {
        this.$refs.form.validate((valid, res) => {
          if (valid) {
            if (this.form.aprvRs === this.AprvRs['REJECT']) {
              this.$message({
                message: '确认无误才能通过审核',
                type: 'warning'
              });
              return;
            }
            this.passLoading = true;
            let form = this.form;
            form.businessId = this.record.acctId;
            let func, tabMsgKey, menuMsgKey;
            if (this.record.acctState === constantUtil.getConstantByKey('AccountConstants.AcctState')['REVIEW']) {
              // 当前状态时待初审
              func = this.$api.cust.account.trialPass;
              tabMsgKey = 'acct-trial';
              menuMsgKey = 'cus-modify-trial';
            } else if (this.record.acctState === constantUtil.getConstantByKey('AccountConstants.AcctState')['REVIEW_FINAL']) {
              // 当前状态时待终审
              func = this.$api.cust.account.finalPass;
              tabMsgKey = 'acct-final';
              menuMsgKey = 'cus-modify-final';
            }
            func(form).then(ret => {
              this.passLoading = false;
              if (MsgType.SUCCESS === ret.type) {
                this.inviteDialogVisible = false;
                // this.refershMsgTip('withdraw-aprv');
                this.$emit('reload');
                this.refershMsgTip(tabMsgKey);
                this.refershMsgTip(menuMsgKey);
              }
            });
          }
        });
      },
      reject () {
        this.$refs.form.validate((valid, res) => {
          if (valid) {
            if (this.form.aprvRs === this.AprvRs['PASS']) {
              this.$message({
                message: '信息有误才能驳回',
                type: 'warning'
              });
              return;
            }
            this.rejectLoading = true;
            let form = this.form;
            form.businessId = this.record.acctId;
            let func, tabMsgKey, menuMsgKey;
            if (this.record.acctState === constantUtil.getConstantByKey('AccountConstants.AcctState')['REVIEW']) {
              // 当前状态时待初审
              func = this.$api.cust.account.trialReject;
              tabMsgKey = 'acct-trial';
              menuMsgKey = 'cus-modify-trial';
            } else if (this.record.acctState === constantUtil.getConstantByKey('AccountConstants.AcctState')['REVIEW_FINAL']) {
              // 当前状态时待终审
              func = this.$api.cust.account.finalReject;
              tabMsgKey = 'acct-final';
              menuMsgKey = 'cus-modify-final';
            }
            func(form).then(ret => {
              this.rejectLoading = false;
              if (MsgType.SUCCESS === ret.type) {
                this.inviteDialogVisible = false;
                // this.refershMsgTip('withdraw-aprv');
                this.$emit('reload');
                this.refershMsgTip(tabMsgKey);
                this.refershMsgTip(menuMsgKey);
              }
            });
          }
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


