<template>
  <div >
    <p class="info text-center" style="padding: 10px;">
      <i class="el-icon-warning"></i>&ensp;您提供的证照信息平台将严格加密保护，保证证件照信息仅用于认证审核
    </p>
    <pl-content-box-block>
       <el-row>
         <el-col :span="12">
           <div class="upload-block">
             <div class="title">统一社会信用代码证</div>
             <div class="content">
               <pl-upload-file class="fileupload"
                               show-type="vertical"
                               :file-type="companyCertificateFile" 
                               save-path="accreditation" 
                               accept-type="bmp,jpg,png,jpeg" 
                               v-model="accreditationForm.companyCertificate" :multiple="true">

               </pl-upload-file>
             </div>
             <div class="tip">
               <i class="el-icon-warning text-primary"></i>&ensp;请上传统一社会信用代码证
             </div>
           </div>
         </el-col>
         <el-col :span="12">
           <div class="upload-block">
             <div class="title">法人代表证照</div>
             <div class="content">
               <pl-upload-file class="fileupload" 
                               :file-type="legalCertificateFile" 
                               show-type="vertical"
                               save-path="accreditation" 
                               accept-type="bmp,jpg,png,jpeg" 
                               v-model="accreditationForm.legalCertificate" 
                               :multiple="true"></pl-upload-file>
             </div>
             <div class="tip">
               <i class="el-icon-warning text-primary"></i>&ensp;法人证件原件照片，若为身份证则必须提供正反面
             </div>
           </div>
         </el-col>
         <el-col :span="12">
           <div class="upload-block">
             <div class="title">银行账户证明</div>
             <div class="content">
               <pl-upload-file class="fileupload" 
                               :file-type="bankCertificateFile" 
                               save-path="accreditation"
                               accept-type="bmp,jpg,png,jpeg" 
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
             <div class="title">管理员及操作员证照</div>
             <div class="content">
               <pl-upload-file class="fileupload" 
                               :file-type="userCertificateFile"
                                save-path="accreditation" 
                               accept-type="bmp,jpg,png,jpeg" 
                               show-type="vertical"
                               v-model="accreditationForm.userCertificate" 
                               :multiple="true"></pl-upload-file>
             </div>
             <div class="tip">
               <i class="el-icon-warning text-primary"></i>&ensp;法人证件原件照片，若为身份证则必须提供正反面
             </div>
           </div>
         </el-col>
       </el-row>
      </pl-content-box-block>
     <br>
     <div class="text-center">
       <img src="./img/u797.png" alt="示例">
     </div>
    <br>
  </div>
</template>

<script>
  import constantUtil from '../../../../../core/utils/constant-util.js';
  import {MsgType} from '../../../../../core/constants';
  export default {
    data () {
      return {
        'companyCertificateFile': constantUtil.getConstantByKey('PubConstants.FileCls')['COMPANY_CERTIFICATE'],
        'legalCertificateFile': constantUtil.getConstantByKey('PubConstants.FileCls')['LEGAL_CERTIFICATE'],
        'userCertificateFile': constantUtil.getConstantByKey('PubConstants.FileCls')['USER_CERTIFICATE'],
        'bankCertificateFile': constantUtil.getConstantByKey('PubConstants.FileCls')['BANK_CERTIFICATE']
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
          if (!this.accreditationForm.companyCertificate || this.accreditationForm.companyCertificate === '') {
            tip.push('<strong>统一社会信用代码证</strong>');
          }
          if (!this.accreditationForm.legalCertificate || this.accreditationForm.legalCertificate === '') {
            tip.push('<strong>法人代表证照</strong>');
          }

          if (!this.accreditationForm.bankCertificate || this.accreditationForm.bankCertificate === '') {
            tip.push('<strong>银行账户证明</strong>');
          }
          if (!this.accreditationForm.userCertificate || this.accreditationForm.userCertificate === '') {
            tip.push('<strong>管理员及操作员证照</strong>');
          }

          if (tip.length > 0) {
            this.$alert('请上传&nbsp;' + tip.join('，'), '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING,
              dangerouslyUseHTMLString: true
            });
            flag = false;
          }
          resolve(flag);
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../../assets/scss/_variables.scss';
  @import './style.scss';
  .fileupload{
    padding: 10px 20px;
  }
  .info{
    background: $primary-color-light;
  }
</style>


