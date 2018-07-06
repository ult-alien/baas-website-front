<template>
  <div>
    <div >
      <div class="bolck-title">
        <span>上传认证资料</span>
      </div>
      <!--
      <p class="info text-center" style="padding: 10px;">
        <i class="el-icon-warning"></i>&ensp;您提供的证照信息平台将严格加密保护，保证证件照信息仅用于认证审核
      </p>
      -->
      <pl-content-box-block>
        <pl-content-box-title>
          <i class="el-icon-warning text-primary"></i>&ensp;温馨提示：请使用实拍照片，要求文字清晰易识别，扫描或PS不能通过审核。照片支持jpg/jpeg/bmp/png，大小不超过5M
        </pl-content-box-title>
        <el-row>
          <el-col :span="12">
            <div class="upload-block">
              <div class="title">{{accreditationForm.customerC.idType | dictionary('ent_id_type')}}<span style="margin-left:10px">(图片大小不超过5M)</span></div>
              <div class="content">
                <pl-upload-file class="fileupload"
                                show-type="vertical"
                                :file-type="companyCertificateFile" 
                                save-path="accreditation" 
                                :size="5"
                                accept-type="bmp,jpg,png,jpeg"
                                :api="fileApi" 
                                v-model="accreditationForm.companyCertificate" :multiple="true">

                </pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;营业执照或统一社会信用代码证正本复印件，<span class="text-warning">加盖公章</span>
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
                                save-path="accreditation" 
                                accept-type="bmp,jpg,png,jpeg"
                                :api="fileApi"
                                v-model="accreditationForm.legalCertificate" 
                                :multiple="true"></pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;法人证件原件照片，身份证则必须提供正反面，<span class="text-warning">加盖公章</span>
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
                                :size="5"
                                accept-type="bmp,jpg,png,jpeg"
                                :api="fileApi"
                                show-type="vertical"
                                v-model="accreditationForm.bankCertificate" 
                                :multiple="true">

                </pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;
                以下材料二选一，要求能显示户名、账号及开户支行信息<br>
                &emsp;&emsp;1、一般收款户：银行流水回单原件照片、网银截屏<br>
                &emsp;&emsp;2、基本收款户：开户许可证原件照片
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
                                accept-type="bmp,jpg,png,jpeg"
                                :api="governorApi" 
                                show-type="vertical"
                                v-model="accreditationForm.administrator.authFileIds" 
                                :multiple="true"></pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;请下载<span class="link" @click="genCusAuthFile">企业授权书模板</span>，<span class="text-warning">加盖公章</span>，拍照上传
                <br/><br/><br/>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="upload-block">
              <div class="title">管理员证照<span style="margin-left:10px">(图片大小不超过5M)</span></div>
              <div class="content">
                <pl-upload-file class="fileupload" 
                                :file-type="userCertificateFile"
                                save-path="accreditation" 
                                :size="5"
                                accept-type="bmp,jpg,png,jpeg"
                                :api="governorApi" 
                                show-type="vertical"
                                :init-file-count.sync="accreditationForm.administrator.initFileCount"
                                :isEdit="!accreditationForm.administrator.initFileCount"
                                :relateId="accreditationForm.administrator.userId"
                                v-model="accreditationForm.administrator.certFileIds" 
                                :multiple="true"></pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;管理员证件照片，身份证则必须提供正反面，<span class="text-warning">加盖公章</span><br/>
                &emsp;&emsp;请务必与用户信息中填写的证件信息一致<br><br>
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-for="item in accreditationForm.operators" :key="accreditationFormOperators" v-if="item.userId !== accreditationForm.administrator.userId">
            <div class="upload-block">
              <div class="title">操作员{{item.userName}}的证照<span style="margin-left:10px">(图片大小不超过5M)</span></div>
              <div class="content">
                <pl-upload-file class="fileupload" 
                                :file-type="userCertificateFile"
                                save-path="accreditation" 
                                :size="5"
                                accept-type="bmp,jpg,png,jpeg"
                                :api="governorApi" 
                                show-type="vertical"
                                :init-file-count.sync="item.initFileCount"
                                :isEdit="!item.initFileCount"
                                :relateId="item.userId"
                                v-model="item.certFileIds" 
                                :multiple="true"></pl-upload-file>
              </div>
              <div class="tip">
                <i class="el-icon-warning text-primary"></i>&ensp;操作员证件照片，身份证则必须提供正反面，<span class="text-warning">加盖公章</span><br/>
                &emsp;&emsp;请务必与用户信息中填写的证件信息一致<br><br>
              </div>
            </div>
          </el-col>
        </el-row>
        </pl-content-box-block>
      <br>
      <!--<div class="text-center">
        <img src="./img/u797.png" alt="示例">
      </div>
      <br>-->
      <!--<br>-->
    </div>

    <div v-if="showContract">
      <div class="bolck-title">
        <span>邮寄资料</span>
      </div>
      <pl-content-box-block>
        <pl-content-box-title>
          请按提示准备以下材料，邮寄至 {{postInfo.address}}，{{postInfo.name}}收，联系电话：{{postInfo.phone}}
        </pl-content-box-title>
        <ul class="post-list upload-block">
          <li v-if="accreditationFiles[contractOpen]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务用户开户声明书，1份，加盖公章和法人签章&ensp;<span class="link" v-loading="CONTRACT_OPEN_loading" @click="download(accreditationFiles[contractOpen], 'contractOpen')">模板下载</span></li>
          <li v-if="accreditationFiles[contractAuth]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务账户授权确认书，1份，加盖公章和法人签章&ensp;<span class="link" v-loading="CONTRACT_AUTH_loading" @click="download(accreditationFiles[contractAuth], 'contractAuth')">模板下载</span></li>
        </ul>
      </pl-content-box-block>
    </div>
  </div>
</template>

<script>
  import constantUtil from 'core/utils/constant-util.js';
  import {MsgType} from 'core/constants';
  import {HttpPrefix} from '../../api/config';
  import {HttpPrefix as governorHttpPrefix} from '../../../governor/api/config';
  import sysUtil from 'core/utils/sys-util';
  import httpUtil from 'core/utils/http-util';
  export default {
    data () {
      return {
        'companyCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['COMPANY_CERTIFICATE'],
        'legalCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['LEGAL_CERTIFICATE'],
        'userCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        'bankCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
        'cusAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        'contractOpen': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_OPEN'],
        'contractAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_AUTH'],
        'POST_ADDRESS': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_ADDRESS'],
        'POST_NAME': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_NAME'],
        'POST_PHONE': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_PHONE'],
        'fileApi': HttpPrefix.API,
        'governorApi': governorHttpPrefix.API,
        'postInfo': {
          'address': 'xxxxxxxx',
          'name': 'xxx',
          'phone': '###-########'
        },
        'CONTRACT_AUTH_loading': true,
        'CONTRACT_OPEN_loading': true,
        'accreditationFiles': {},
        'showContract': true
      };
    },
    props: {
      accreditationForm: {
        type: Object
      }
    },
    methods: {
      validate () {
        return new window.Promise((resolve, reject) => {
          let flag = true;
          let tip = [];
          let postTip = [];
          if (!this.accreditationForm.companyCertificate || this.accreditationForm.companyCertificate === '') {
            tip.push('<strong>统一社会信用代码证</strong>');
          }
          if (!this.accreditationForm.legalCertificate || this.accreditationForm.legalCertificate === '') {
            tip.push('<strong>法人代表证照</strong>');
          }

          if (!this.accreditationForm.bankCertificate || this.accreditationForm.bankCertificate === '') {
            tip.push('<strong>银行账户证明</strong>');
          }

          if (!this.accreditationForm.administrator.authFileIds || this.accreditationForm.administrator.authFileIds === '') {
            tip.push('<strong>企业授权书</strong>');
          }

          if (!this.accreditationForm.administrator.certFileIds || this.accreditationForm.administrator.certFileIds === '') {
            tip.push('<strong>管理员' + this.accreditationForm.administrator.userName + '的证照</strong>');
          }

          if (this.accreditationForm.operators && this.accreditationForm.operators.length > 0) {
            this.accreditationForm.operators.forEach(item => {
              if (!item.certFileIds && item.userId !== this.accreditationForm.administrator.userId) {
                tip.push('<strong>操作员' + item.userName + '的证照</strong>');
              }
            });
          }

          if (this.accreditationFiles[this.contractOpen] && (!this.accreditationForm.contractOpen || this.accreditationForm.contractOpen === '')) {
            postTip.push('<strong>共赢链平台契约互联服务用户开户声明书</strong>');
          }
          if (this.accreditationFiles[this.contractAuth] && (!this.accreditationForm.contractAuth || this.accreditationForm.contractAuth === '')) {
            postTip.push('<strong>共赢链平台契约互联服务账户授权确认书</strong>');
          }

          if (tip.length > 0) {
            this.$alert('请上传&nbsp;' + tip.join('，'), '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING,
              dangerouslyUseHTMLString: true
            });
            flag = false;
          }
          if (tip.length === 0 && postTip.length > 0) {
            this.$alert('请下载&nbsp;' + postTip.join('，') + '，加盖公章和法人签章并邮寄到指定处', '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING,
              dangerouslyUseHTMLString: true
            });
            flag = false;
          }
          resolve(flag);
        });
      },
      download (fileId, prop) {
        if (!fileId) {
          return;
        }
        sysUtil.download(httpUtil.genPath(this.fileApi + '/file/download?id=' + fileId));
        this.accreditationForm[prop] = fileId;
      },
      genCusAuthFile () {
        this.$api.cust.accreditation.genCusAuthFile(JSON.stringify(this.accreditationForm)).then(ret => {
          if (ret) {
            sysUtil.download(httpUtil.genPath(this.fileApi + '/file/download?id=' + ret.cusAuthFileId));
          }
        });
      }
    },
    activated () {
      // 获取邮寄信息
      this.$api.cust.accreditation.getPostInfo(JSON.stringify(this.accreditationForm)).then(ret => {
        if (ret) {
          this.postInfo.address = ret[this.POST_ADDRESS];
          this.postInfo.name = ret[this.POST_NAME];
          this.postInfo.phone = ret[this.POST_PHONE];
        }
      });
      // 取出省和市
      let customerC = this.accreditationForm.customerC;
      customerC.province = customerC.addressArr[0];
      if (customerC.addressArr[1]) {
        customerC.city = customerC.addressArr[1];
      }
      // 获取邮寄文件
      this.$api.cust.accreditation.genAccreditationFiles(JSON.stringify(this.accreditationForm)).then(ret => {
        if (ret) {
          this.accreditationFiles = ret;
          if (ret[this.contractOpen]) {
            this.CONTRACT_OPEN_loading = false;
          }
          if (ret[this.contractAuth]) {
            this.CONTRACT_AUTH_loading = false;
          }
        } else {
          this.showContract = false;
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~assets/scss/_variables.scss';
  @import './style.scss';
  .fileupload{
    padding: 10px 20px;
  }
  .info{
    background: $primary-color-light;
  }
  .post-list{
    li{
      line-height: 2.4em;
    }
  }
</style>


