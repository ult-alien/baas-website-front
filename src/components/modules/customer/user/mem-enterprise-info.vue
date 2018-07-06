<template>
  <pl-content-box >
    <div  v-if="isHave">
      <div class="block-title">
        企业基本信息
        <div class="float-right">
          <div v-if="canModify">
            <el-button v-if="!showView" type="info"  @click="cancel">取消</el-button>
            <el-button  type="primary" v-if="showCertInfo" @click="updateInfo" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.4)">{{showView ? '修改' : '保存'}}</el-button>
            <span v-tooltip="'驳回原因：' + cusRecord.aprvRemark" v-if="cusRecord.aprvRs === AprvRs['REJECT'] && cusRecord.cusState === CusState['AUTHENTICATE_BACK']" class="grey">修改审批驳回</span>
          </div>
          <div v-else>
            <span class="orange" v-if="cusRecord.cusState === CusState['WAIT_FIRST_TRIAL']">修改待初审</span>
            <span class="orange" v-if="cusRecord.cusState === CusState['WAIT_LAST_TRIAL']">修改待终审</span>
          </div>
        </div>
      </div>
    <!--<pl-content-box-title>
        企业基本信息
      </pl-content-box-title>-->
      <p class="tips">
        <i class="el-icon-warning"></i>&nbsp;企业工商信息变更后，请尽快在平台提交变更申请，以免承担法律责任。
      </p>

      <pl-content-box-block>
        <pl-content-box-card>
          <component :is="curComp" ref="component" :cusRecord="cusRecord"></component>
        </pl-content-box-card>
      </pl-content-box-block>
      <div v-if="showCertInfo">
        <pl-content-box-title>
          企业证照资料
        </pl-content-box-title>
        <pl-content-box-block>
          <el-row>
            <el-col :span="12">
              <div class="upload-block">
                <div class="title">{{(cusRecord.idType || 'ent_id_type_1') | dictionary('ent_id_type')}}<span style="margin-left:10px">(图片大小不超过5M)</span></div>
                <div class="content">
                  <pl-upload-file class="fileupload"
                                  show-type="vertical"
                                  :file-type="companyCertificateFile" 
                                  save-path="accreditation" 
                                  :relateId="cusRecord.cusId"
                                  ref="companyCertificateFile"
                                  :size="5"
                                  accept-type="bmp,jpg,png,jpeg"
                                  :isEdit="!showView"
                                  :api="fileApi" 
                                  v-model="companyCertificateIds" :multiple="true">

                  </pl-upload-file>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="upload-block">
                <div class="title">法人代表证照<span style="margin-left:10px">(图片大小不超过5M)</span></div>
                <div class="content">
                  <pl-upload-file class="fileupload" 
                                  :file-type="legalCertificateFile" 
                                  show-type="vertical"
                                  :size="5"
                                  :relateId="cusRecord.cusId"
                                  save-path="accreditation" 
                                  accept-type="bmp,jpg,png,jpeg"
                                  ref="legalCertificateFile"
                                  :api="fileApi"
                                  :isEdit="!showView"
                                  v-model="legalCertificateIds" 
                                  :multiple="true"></pl-upload-file>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="upload-block">
                <div class="title">银行账户证明<span style="margin-left:10px">(图片大小不超过5M)</span></div>
                <div class="content">
                  <pl-upload-file class="fileupload" 
                                  :file-type="bankCertificateFile" 
                                  save-path="accreditation"
                                  :relateId="cusRecord.cusId"
                                  :size="5"
                                  accept-type="bmp,jpg,png,jpeg"
                                  ref="bankCertificateFile"
                                  :api="fileApi"
                                  show-type="vertical"
                                  :isEdit="!showView"
                                  v-model="bankCertificateIds" 
                                  :multiple="true">

                  </pl-upload-file>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
            <div class="upload-block">
              <div class="title">企业授权书<span style="margin-left:10px">(图片大小不超过5M)</span></div>
              <div class="content">
                <pl-upload-file class="fileupload" 
                                :file-type="cusAuth"
                                save-path="accreditation" 
                                :size="5"
                                :relateId="cusRecord.authFileRlatIds"
                                ref="cusAuth"
                                accept-type="bmp,jpg,png,jpeg"
                                :api="governorApi" 
                                show-type="vertical"
                                :isEdit="false"
                                v-model="cusAuthIds" 
                                :multiple="true"></pl-upload-file>
              </div>
            </div>
          </el-col>
          </el-row>
        </pl-content-box-block>
      </div>
    </div>
    <pl-empty-tip v-if="!isHave" text="暂无企业信息"></pl-empty-tip>
  </pl-content-box>
</template>
<script>
  import constantUtil from 'core/utils/constant-util';
  import {HttpPrefix} from '../api/config';
  import {HttpPrefix as governorApi} from '../../governor/api/config';
  import infoView from './enterprise-info-view.vue';
  import infoEdit from './enterprise-info-edit.vue';
  import {MsgType} from 'core/constants';
  export default {
    components: {
      'infoView': infoView,
      'infoEdit': infoEdit
    },
    data () {
      return {
        loading: false,
        cusRecord: {
          cusName: '',
          cusCode: '',
          cusType: '',
          prntName: '',
          lrName: '',
          orgCode: '',
          socCrCode: '',
          postCode: '',
          lisNo: '',
          area: '',
          cusState: '',
          variableRate: '',
          province: '',
          city: '',
          address: '',
          addressArr: [],
          accountInfo: [{
            acctNo: '',
            acctNm: '',
            acctPurpose: [],
            fiNo: '',
            fiNm: ''
          }],
          cusAcct: {},
          aprvRs: '',
          aprvRemark: ''
        },
        bankCertificateIds: '',
        legalCertificateIds: '',
        companyCertificateIds: '',
        cusAuthIds: '',
        isHave: false,
        'fileApi': HttpPrefix.API,
        governorApi: governorApi.API,
        'companyCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['COMPANY_CERTIFICATE'],
        'legalCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['LEGAL_CERTIFICATE'],
        'bankCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
        CusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
        CusState: constantUtil.getConstantByKey('CustomerConstants.CusState'),
        AprvRs: constantUtil.getConstantByKey('BizConstants.AprvRs'),
        'cusAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        showView: true,
        tmp: {}
      };
    },
    created () {
      this.queryData();
    },
    methods: {
      queryData () {
        this.$api.cust.customer.selectEnterpriseInfo(this.$store.state.contextData.user.ent.organId).then(ret => {
          if (ret) {
            this.cusRecord = {...this.cusRecord, ...ret};
            this.isHave = true;
            this.cusRecord.addressArr = [];
            if (this.cusRecord.province) {
              this.cusRecord.addressArr.push(this.cusRecord.province);
            }
            if (this.cusRecord.city) {
              this.cusRecord.addressArr.push(this.cusRecord.city);
            }
          } else {
            this.isHave = false;
          }
          this.showView = true;
        });
      },
      updateInfo () {
        if (this.showView) {
          this.showView = false;
          this.tmp = {...this.cusRecord};
        } else {
          this.$refs.component.checkForm().then(ret => {
            if (ret) {
              if (this.showCertInfo) {
                if (!this.companyCertificateIds || this.companyCertificateIds === '') {
                  this.$alert('请上传' + (this.cusRecord.idType === 'ent_id_type_1' ? '统一社会信用代码' : (this.cusRecord.idType === 'ent_id_type_2' ? '营业执照' : '其他证件')), '提示', {
                    type: 'warning',
                    confirmButtonText: '确定'
                  });
                  return;
                }
                if (!this.legalCertificateIds || this.legalCertificateIds === '') {
                  this.$alert('请上传法人代表证照', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定'
                  });
                  return;
                }
                if (!this.bankCertificateIds || this.bankCertificateIds === '') {
                  this.$alert('请上传银行账户证明', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定'
                  });
                  return;
                }
              }
              // 保存
              this.cusRecord.province = this.cusRecord.addressArr[0];
              if (this.cusRecord.addressArr[1]) {
                this.cusRecord.city = this.cusRecord.addressArr[1];
              } else {
                this.cusRecord.city = '';
              }
              this.loading = true;
              this.$api.cust.customer.saveEnterpriseInfo(JSON.stringify({'customerC': this.cusRecord, 'bankCertificate': this.bankCertificateIds, 'legalCertificate': this.legalCertificateIds, 'companyCertificate': this.companyCertificateIds, 'cusAuth': this.cusAuthIds})).then(ret => {
                this.loading = false;
                if (ret.type === MsgType.SUCCESS) {
                  /* this.$message({
                    message: '已提交审批',
                    type: 'success'
                  }); */
                  this.queryData();
                }
              });
            }
          });
        }
      },
      cancel () {
        this.showView = true;
        this.cusRecord = {...this.tmp};
      }
    },
    computed: {
      curComp () {
        return this.showView ? 'infoView' : 'infoEdit';
      },
      showCertInfo () { // 保理商和核心企业不需要显示企业证照资料
        return this.cusRecord.cusType !== this.CusType['FOCAL_CO'] && this.cusRecord.cusType !== this.CusType['FINNER'];
      },
      canModify () {
        return this.cusRecord.cusState === this.CusState['ENABLE'] || this.cusRecord.cusState === this.CusState['AUTHENTICATE_BACK'];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/index";
  @import "../../../../assets/scss/variables";
  .tips{
    margin: 0 30px;
    margin-bottom: -10px;
    margin-top: 10px;
    padding: 4px 6px;
    i{
      color: #E6A23C;
      font-size: 16px;
    }
  }
  .block-title{
    padding: 12px 20px;
    line-height: 36px;
    font-size: 17px;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    .float-right{
      float: right;
      display: inline-block;
      font-size: 14px;
      .grey{
        color: #fff;
        padding: 10px;
        vertical-align: middle;
        background: grey;
        border-radius: 20px 0 0 20px;
        position: absolute;
        width: fit-content;
        line-height: normal;
        right: 0;
        top: 100px;
      }
      .orange{
        color: #fff;
        padding: 10px;
        vertical-align: middle;
        background: orange;
        border-radius: 20px 0 0 20px;
        position: absolute;
        width: fit-content;
        line-height: normal;
        right: 0;
        top: 100px;
      }
    }
  }
  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
    padding-right: 30px;
    padding-bottom: 20px;
  }

  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
</style>



