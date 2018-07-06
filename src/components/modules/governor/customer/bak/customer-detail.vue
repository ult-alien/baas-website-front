<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
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
            <el-col :span="12">
              <el-form-item label="上级机构">
                <pl-content-item-text>{{cusRecord.prntName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人/自然人">
                <pl-content-item-text>{{cusRecord.lrName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织机构代码">
                <pl-content-item-text>{{cusRecord.orgCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
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

   <!-- <pl-content-box-block>-->
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="primary" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
   <!-- </pl-content-box-block>-->
  </pl-content-box>
</template>
<script>
import constantUtil from 'core/utils/constant-util';
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
      purposes: constantUtil.getConstant('PubConstants.Purpose')
    };
  },
  methods: {
    callback () {
      this.$router.back();
    }
  },
  created () {
    let params = this.$route.params;
    if (params.id) {
      this.$api.bsp.customer.getCustomer(params.id).then(ret => {
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
        if (accountInfo.length > 0) {
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



