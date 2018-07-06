<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <pl-content-box-block>
      <pl-content-box-card>
        <el-form label-width="130px" class="static-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构中文名称">
                <pl-content-item-text>{{form.customerC.cusName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一社会信用代码">
                <pl-content-item-text>{{form.customerC.socCrCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isFINNER">
              <el-form-item label="所属核心企业" >
                <pl-content-item-text>{{form.focalComName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="机构英文名称" >
                <pl-content-item-text>{{form.customerC.cusEnglishName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记机关">
                <pl-content-item-text>{{form.customerC.registerDept}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构简称">
                <pl-content-item-text>{{form.customerC.cusAlias}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构代码">
                <pl-content-item-text>{{form.customerC.cusCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
           <!-- <el-col :span="12">
              <el-form-item label="联系人">
                <pl-content-item-text>{{form.customerC.contactorName}}</pl-content-item-text>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="法定代表人">
                <pl-content-item-text>{{form.customerC.lrName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
           <!-- <el-col :span="12">
              <el-form-item label="联系电话">
                <pl-content-item-text>{{form.customerC.contactorPhone}}</pl-content-item-text>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="合作起始日期">
                <pl-content-item-text>{{form.customerC.cooperationStartDate}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机构地址">
                <pl-content-item-text>{{form.customerC.province}}{{form.customerC.city}}{{form.customerC.address}}</pl-content-item-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </pl-content-box-card>
    </pl-content-box-block>
    <pl-content-box-title>管理员信息</pl-content-box-title>
    <pl-content-box-block>
      <pl-content-box-card>
        <div class="card-content">
          <el-form label-width="130px" class="static-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="管理员姓名">
                  <pl-content-item-text>{{form.administrator.userName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理员手机号">
                  <pl-content-item-text>{{form.administrator.phoneNo}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型">
                  <pl-content-item-text>{{form.administrator.certType | dictionary('id_type')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码">
                  <pl-content-item-text>{{form.administrator.certNo}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <pl-content-item-text>{{form.administrator.email}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </pl-content-box-card>
    </pl-content-box-block>
    <pl-content-box-title>账户信息</pl-content-box-title>
    <pl-content-box-block>
      <pl-content-box-card>
        <div class="card-content">
          <el-form label-width="130px" class="static-form" :class="{'dashed': (index > 0)}" :key="formAcctUses" v-for="(item, index) in form.acctUses">
            <el-row>
              <el-col :span="12">
                <el-form-item label="账户用途">
                  <pl-content-item-text>{{item.useCode | constant('AccountConstants.AcctUse')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账户名称">
                  <pl-content-item-text>{{item.acctName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账号">
                  <pl-content-item-text>{{item.acctNo}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行">
                  <pl-content-item-text>{{item.bankCode | dictionary('bank_brand')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </pl-content-box-card>
    </pl-content-box-block>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
   <!-- </pl-content-box-block>-->
  </pl-content-box>
</template>
<script>
import constantUtil from '../../../../core/utils/constant-util';
export default {
  data () {
    return {
      form: {
        customerC: {},
        acctUses: [],
        administrator: {},
        focalComId: '',
        focalComName: ''
      },
      cusType: constantUtil.getConstantByKey('CustomerConstants.CusType')
    };
  },
  computed: {
    isFINNER () {
      return this.form.customerC.cusType === this.cusType['FINNER'];
    }
  },
  methods: {
    callback () {
      this.$router.push({ name: 'bsp.biz.cooperation-agency-mgt' });
    }
  },
  created () {
    let params = this.$route.params;
    if (params.cusId) {
      this.$api.cust.operation.getCooperationAgencyVo({cusId: this.$route.params.cusId}).then(ret => {
        this.form = ret;
        this.form.customerC.addressArr = [];
        this.form.customerC.addressArr[0] = this.form.customerC.province;
        if (this.form.customerC.city) {
          this.form.customerC.addressArr[1] = this.form.customerC.city;
        }
        if (this.form.acctUses.length > 0) {
          for (let i in this.form.acctUses) {
            this.form.acctUses[i].addressArr = [];
            this.form.acctUses[i].addressArr[0] = this.form.acctUses[i].bankProvince;
            if (this.form.acctUses[i].bankCity) {
              this.form.acctUses[i].addressArr[1] = this.form.acctUses[i].bankCity;
            }
          }
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
.dashed{
   border-top: 1px dashed #ccc;
}
</style>



