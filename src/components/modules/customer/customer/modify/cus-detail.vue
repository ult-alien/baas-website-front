<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>

    <pl-content-box-block>
      <pl-content-box-card class="no-border">
        <el-form label-width="140px" class="static-form" ref="form" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称">
                <pl-content-item-text v-tooltip="record.cusName">{{record.cusName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期">
                <pl-content-item-text>{{record.createTime}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人">
                <pl-content-item-text>{{record.applyer}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <pl-content-item-text>{{ record.cusState | constant('CustomerConstants.CusState')}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="信息变更清单">
                <table class="modItems">
                  <tr>
                    <td>
                      变更项
                    </td>
                    <td>
                      变更前
                    </td>
                    <td>
                      变更后
                    </td>
                  </tr>
                  <tr v-for="(item, index) in modItems" :key="index">
                    <td v-text="getPropName(index)">
                    </td>
                    <td v-if="index =='lrIdType'">
                      {{item[0]  | dictionary('id_type')}}
                    </td>
                    <td v-else-if="index =='idType'">
                      {{item[0] | dictionary('ent_id_type')}}
                    </td>
                    <td v-else>
                      {{item[0]}}
                    </td>
                    <td v-if="index =='lrIdType'">
                      {{item[1] | dictionary('id_type')}}
                    </td>
                    <td v-else-if="index =='idType'">
                      {{item[1] | dictionary('ent_id_type')}}
                    </td>
                    <td v-else>
                      {{item[1]}}
                    </td>
                  </tr>
                </table>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="margin: 10px 0;" v-if="isModifCcfFile">
              <el-form-item prop="companyCertificateFile" :label="record.idType | dictionary('ent_id_type')">
                <pl-upload-file class="fileupload"
                                show-type="vertical"
                                :file-type="companyCertificateFile" 
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

            <el-col :span="24" style="margin: 10px 0;" v-if="isModifLegaCfFile">
              <el-form-item prop="legalCertificateFile" label="法人代表证照">
                <pl-upload-file class="fileupload"
                                show-type="vertical"
                                :file-type="legalCertificateFile" 
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

            <!--<el-col :span="24" style="margin: 10px 0;">
              <el-form-item prop="bankCertificateFile" label="银行账户证明">
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
            </el-col>-->
            <!--
            <el-col :span="24" style="margin: 10px 0;">
              <el-form-item prop="userCertificateFile" label="管理员及操作员证照">
                <pl-upload-file class="fileupload"
                                show-type="vertical"
                                :file-type="userCertificateFile" 
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
            -->
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="24">
              <el-form-item label="审核结果" prop="aprvRs" :rules="[
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
    </pl-content-box-block>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        <el-button type="primary" element-loading-background="rgba(255, 255, 255, 0.4)" :loading="passLoading" @click="confirm">审批通过</el-button>
        <el-button type="info" :loading="rejectLoading" @click="reject">驳回</el-button>
      </pl-content-box-toolbar>
    </pl-affix>

  </pl-content-box>
</template>

<script>
  import {MsgType} from 'core/constants';
  import constantUtil from 'core/utils/constant-util.js';
  import {HttpPrefix} from '../../api/config.js';
  export default {
    data () {
      return {
        record: {},
        passLoading: false,
        rejectLoading: false,
        form: {
          aprvRs: '',
          aprvRemark: '',
          applyer: '',
          approver: '',
          modNum: ''
        },
        modItems: [],
        bankCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
        companyCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['COMPANY_CERTIFICATE'],
        legalCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['LEGAL_CERTIFICATE'],
        userCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        AprvRs: constantUtil.getConstantByKey('BizConstants.AprvRs'),
        fileApi: HttpPrefix.API
      };
    },
    created () {
      let params = this.$route.params;
      this.record = params;
      this.form.aprvRs = '';
      this.form.aprvRemark = '';
      this.form.applyer = params.applyer;
      this.form.approver = params.approver;
      this.form.modNum = params.modNum;
      this.$api.cust.customer.getModItems({cusId: params.cusId}).then(ret => {
        this.modItems = ret;
      });
      if (this.$refs['form']) {
        this.$refs['form'].resetFields();
      }
    },
    computed: {
      isModifCcfFile () {
        if (this.modItems['cusName'] && this.modItems['cusName'][1]) {
          return true;
        } else if (this.modItems['socCrCode'] && this.modItems['socCrCode'][1]) {
          return true;
        } else if (this.modItems['lisNo'] && this.modItems['lisNo'][1]) {
          return true;
        } else if (this.modItems['idType'] && this.modItems['idType'][1]) {
          return true;
        } else if (this.modItems['idNo'] && this.modItems['idNo'][1]) {
          return true;
        } else if (this.modItems['idName'] && this.modItems['idName'][1]) {
          return true;
        }
        return false;
      },
      isModifLegaCfFile () {
        if (this.modItems['lrName'] && this.modItems['lrName'][1]) {
          return true;
        } else if (this.modItems['lrIdType'] && this.modItems['lrIdType'][1]) {
          return true;
        } else if (this.modItems['lrLisNo'] && this.modItems['lrLisNo'][1]) {
          return true;
        }
        return false;
      }
    },
    methods: {
      callback () {
        if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_FIRST_TRIAL']) {
          this.$router.push({name: 'bsp.biz.cus-modify-trial', params: {tab: 'cus'}});
        } else if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_LAST_TRIAL']) {
          this.$router.push({name: 'bsp.biz.cus-modify-final', params: {tab: 'cus'}});
        }
      },
      getPropName (prop) {
        switch (prop) {
          case 'cusName':
            return '客户名称';
          case 'socCrCode':
            return '统一社会信用代码';
          case 'idType':
            return '证件类型';
          case 'lisNo':
            return '营业执照号码';
          case 'orgCode':
            return '组织机构代码';
          case 'idName':
            return '证件名称';
          case 'idNo':
            return '证件号码';
          case 'lrName':
            return '法人/股东姓名';
          case 'lrIdType':
            return '法人/股东证件类型';
          case 'lrLisNo':
            return '法人/股东证件号码';
          case 'province':
            return '省份';
          case 'city':
            return '市';
          case 'address':
            return '详细地址';
          default :
            return '';
        }
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
            this.$confirm('您确定企业信息和证照资料正确无误吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.passLoading = true;
              let form = this.form;
              form.businessId = this.record.cusId;
              let func, tabMsgKey, menuMsgKey;
              if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_FIRST_TRIAL']) {
                // 当前状态时待初审
                func = this.$api.cust.customer.trialPass;
                tabMsgKey = 'cus-trial';
                menuMsgKey = 'cus-modify-trial';
              } else if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_LAST_TRIAL']) {
                // 当前状态时待终审
                func = this.$api.cust.customer.finalPass;
                tabMsgKey = 'cus-final';
                menuMsgKey = 'cus-modify-final';
              }
              func(form).then(ret => {
                this.passLoading = false;
                if (MsgType.SUCCESS === ret.type) {
                  // this.refershMsgTip('withdraw-aprv');
                  this.refershMsgTip(tabMsgKey);
                  this.refershMsgTip(menuMsgKey);
                  this.callback();
                }
              });
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
            form.businessId = this.record.cusId;
            let func, tabMsgKey, menuMsgKey;
            if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_FIRST_TRIAL']) {
              // 当前状态时待初审
              func = this.$api.cust.customer.trialReject;
              tabMsgKey = 'cus-trial';
              menuMsgKey = 'cus-modify-trial';
            } else if (this.record.cusState === constantUtil.getConstantByKey('CustomerConstants.CusState')['WAIT_LAST_TRIAL']) {
              // 当前状态时待终审
              func = this.$api.cust.customer.finalReject;
              tabMsgKey = 'cus-final';
              menuMsgKey = 'cus-modify-final';
            }
            func(form).then(ret => {
              this.rejectLoading = false;
              if (MsgType.SUCCESS === ret.type) {
                // this.refershMsgTip('withdraw-aprv');
                this.refershMsgTip(tabMsgKey);
                this.refershMsgTip(menuMsgKey);
                this.callback();
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .modItems{
    border-collapse: collapse;
    td{
      border: 1px solid #d9d9d9;
      padding: 8px 10px;
      text-align: center;
    }
  }

</style>


