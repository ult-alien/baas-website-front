<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <div class="loading-container" v-loading="loading" v-if="loading" element-loading-text="加载中..."></div>
    <div v-else>
      <pl-content-box-block>
        <pl-content-box-card>
          <el-form label-width="130px" class="static-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称">
                  <pl-content-item-text>{{cusRecord.cusName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户号">
                  <pl-content-item-text>{{cusRecord.cusCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户类型">
                  <pl-content-item-text>{{cusRecord.cusType | dictionary('cus_type.cus_type_c')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            <!-- <el-col :span="12">
                <el-form-item label="上级机构">
                  <pl-content-item-text>{{cusRecord.prntName}}</pl-content-item-text>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="法人/自然人">
                  <pl-content-item-text>{{cusRecord.lrName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">
                <el-form-item label="组织机构代码">
                  <pl-content-item-text>{{cusRecord.orgCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="统一社会信用代码">
                  <pl-content-item-text>{{cusRecord.socCrCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照">
                  <pl-content-item-text>{{cusRecord.lisNo}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户状态">
                  <pl-content-item-text>{{cusRecord.cusState | constant('CustomerConstants.CusState')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业地址">
                  <pl-content-item-text :is-multi-line="true">{{cusRecord.province}}{{cusRecord.city}}{{cusRecord.address}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="金融机构" v-if="cusRecord.cusType === cusType['FOCAL_CO']">
                  <pl-content-item-text :is-multi-line="true">
                    {{cusRecord.finName}}
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card>
      </pl-content-box-block>
      <!--
      <pl-content-box-title>联系方式</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-form label-width="130px" class="static-form">

              <el-row>
                <el-col :span="12">
                  <el-form-item label="邮政编码">
                    <pl-content-item-text>{{cusRecord.postCode}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="固定电话">
                    <pl-content-item-text>{{cusRecord.contactNo}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="区域">
                    <pl-content-item-text>{{cusRecord.area | constant('CustomerConstants.CusArea')}}</pl-content-item-text>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-form>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>
      -->
      <pl-content-box-title>联系人信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-form label-width="130px" class="static-form">

            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <pl-content-item-text>{{cusRecord.contactorName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号">
                  <pl-content-item-text>{{cusRecord.contactorPhone}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型">
                  <pl-content-item-text>{{cusRecord.certType | dictionary('id_type')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码">
                  <pl-content-item-text>{{cusRecord.certNo}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>账号信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-form label-width="130px" class="static-form">

              <el-row>
                <el-col :span="12">
                  <el-form-item label="账号">
                    <pl-content-item-text>{{cusRecord.cusAcct.acctNo}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开户行">
                    <pl-content-item-text>{{cusRecord.cusAcct.bankName}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="开户网点">
                    <pl-content-item-text>{{cusRecord.cusAcct.bankProvince}}{{cusRecord.cusAcct.bankCity}}{{ cusRecord.cusAcct.bankDot}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
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
                <div class="title">{{cusRecord.idType | dictionary('ent_id_type')}}<span style="margin-left:10px">(图片大小不超过5M)</span></div>
                <div class="content">
                  <pl-upload-file class="fileupload"
                                  show-type="vertical"
                                  :file-type="companyCertificateFile" 
                                  save-path="accreditation" 
                                  :relateId="cusRecord.cusId"
                                  :isEdit="false"
                                  :size="5"
                                  accept-type="bmp,jpg,png,jpeg"
                                  :api="fileApi" 
                                  v-model="cusRecord.companyCertificate" :multiple="true">

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
                                  :isEdit="false"
                                  :api="fileApi"
                                  v-model="cusRecord.legalCertificate" 
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
                                  :isEdit="false"
                                  :api="fileApi"
                                  show-type="vertical"
                                  v-model="cusRecord.bankCertificate" 
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
                                  :relateId="cusRecord.cusId" 
                                  :size="5"
                                  accept-type="bmp,jpg,png,jpeg"
                                  :isEdit="false"
                                  :api="fileApi" 
                                  show-type="vertical"
                                  v-model="cusRecord.cusAuth" 
                                  :multiple="true"></pl-upload-file>
                </div>
              </div>
            </el-col>
          </el-row>
        </pl-content-box-block>


        <!--
        <pl-content-box-title>
          企业证照资料
        </pl-content-box-title>
        <pl-content-box-block>
          <el-table
            :data="files"
            :border="false"
            stripe
            :show-header="false"
            style="width: 100%">
            <el-table-column prop="name"  width="160" align="center">
            </el-table-column>

            <el-table-column >
              <template scope="scope">
                <pl-upload-file show-type="vertical"
                :api="fileApi"
                class="fileupload" :file-type="scope.row.fileType" :relateId="cusRecord.cusId" :isEdit="false"></pl-upload-file>
              </template>
            </el-table-column>
          </el-table>
        </pl-content-box-block>
        -->
      </div>


      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="primary" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </div>
  </pl-content-box>
</template>
<script>
import constantUtil from 'core/utils/constant-util';
import {HttpPrefix} from '../api/config';
export default {
  data () {
    return {
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
        certType: '',
        contactNo: '',
        contactorName: '',
        contactorPhone: '',
        certNo: '',
        variableRate: '',
        province: '',
        city: '',
        address: '',
        accountInfo: [{
          acctNo: '',
          acctNm: '',
          acctPurpose: [],
          fiNo: '',
          fiNm: ''
        }]
      },
      purposes: constantUtil.getConstant('PubConstants.Purpose'),
      cusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
      loading: false,
      'fileApi': HttpPrefix.API,
      'companyCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['COMPANY_CERTIFICATE'],
      'legalCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['LEGAL_CERTIFICATE'],
      'userCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
      'bankCertificateFile': constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
      'cusAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH']
    };
  },
  computed: {
    showCertInfo () { // 保理商和核心企业不需要显示企业证照资料
      return this.cusRecord.cusType !== this.cusType['FOCAL_CO'] && this.cusRecord.cusType !== this.cusType['FINNER'];
    }
  },
  methods: {
    callback () {
      let cusType = this.cusRecord.cusType;
      if (this.cusType['FOCAL_CO'] === cusType) {
        this.$router.push({name: 'bsp.biz.focalco', params: {cusType}});
        return;
      } else if (this.cusType['FINNER'] === cusType) {
        this.$router.push({name: 'bsp.biz.finner', params: {cusType}});
        return;
      }
      this.$router.push({name: 'bsp.biz.my-customer', params: {cusType}});
    }
  },
  created () {
    let params = this.$route.params;
    if (params.id) {
      this.loading = true;
      this.$api.cust.customer.getCustomer(params.id).then(ret => {
        this.loading = false;
        this.cusRecord = ret;
//        let arr = this.form.contactNo.split('-');
//        this.form.areaCode = arr[0];
//        this.form.telephone = arr[1];
//        this.form.phoneExt = arr[2];
//        this.form.addressArr = [];
//        this.form.addressArr.push(ret.province);
//        if (this.form.city !== '') {
//          this.form.addressArr.push(ret.city);
//        }
        let accountInfo = this.cusRecord.accountInfo;
        if (accountInfo && accountInfo.length > 0) {
          accountInfo.forEach(item => {
            item.purpose = item.acctPurpose.split(',');
          });
        }
      });
    } else {
      this.goBack();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../assets/scss/index";
@import "../../../../assets/scss/variables";

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



