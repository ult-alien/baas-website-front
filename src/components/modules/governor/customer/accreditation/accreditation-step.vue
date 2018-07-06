
<template>
  <div v-loading="pageLoading">
    <pl-content-box-toolbar>
      <el-steps :active="step":align-center="true" :center="true"  finish-status="success" class="myprogress" v-if="!pageLoading">
        <el-step title="设置企业信息"></el-step>
        <el-step title="设置用户信息"></el-step>
        <el-step title="提交认证资料"></el-step>
        <el-step title="等待审核"></el-step>
      </el-steps>
    </pl-content-box-toolbar>
    <!--<router-view></router-view>-->
    <keep-alive>
    <component :is="currentView" ref="accreditationComponent" v-if="!pageLoading" :needInviteCode="needInviteCode" :accreditationForm.sync="accreditationForm">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
    </keep-alive>
    <!--<div style="text-align: center;" v-if="!pageLoading">-->
    <!--<el-button v-if="step > 0 && step <= 2" style="margin: 12px 0;" @click="back">上一步</el-button>-->
    <!--<el-button type="primary" v-if="step <= 2" :loading="loading" style="margin: 12px 0;" @click="next">{{nextStepText}}</el-button>-->
    <!--</div>-->
    <pl-affix :offset-bottom="0" >
      <pl-content-box-toolbar class="text-center" :border="false"  v-if="!pageLoading">
        <el-button v-if="step > 0 && step <= 2" style="margin: 12px 0;" @click="back">上一步</el-button>
        <el-button type="primary" v-if="step <= 2" :loading="loading" style="margin: 12px 0;" @click="next">{{nextStepText}}</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
    <protocol ref="protocol" @cancel="cancel"></protocol>
  </div>
</template>

<script>
  import step0 from './step0.vue';
  import step1 from './step1.vue';
  import step2 from './step2.vue';
  import step3 from './step3.vue';
  import plFooter from '../../uiComponents/footer/footer-w.vue';
  import dicUtils from '../../../../../core/utils/dictionary-util.js';
  import protocol from './protocol.vue';
  import constantUtil from 'core/utils/constant-util';
  const cusState = constantUtil.getConstantByKey('CustomerConstants.CusState');
  export default {
    data () {
      return {
        step: 0,
        currentView: 'step0',
        accreditationForm: {
          customerC: {}, // 客户
          operators: [], // 操作员
          administrator: {}, // 管理员
          cusAcct: {}, // 银行账号
          companyCertificate: '', // 企业证照
          legalCertificate: '', // 法人代表证照
          userCertificate: '', // 操作员及管理员证照
          bankCertificate: '' // 银行账户证明
        },
        loading: false,
        pageLoading: true,
        needInviteCode: true
      };
    },
    methods: {
      next () {
        // 先校验表单
        this.$refs.accreditationComponent.validate().then((valid) => {
          if (valid) {
            if (this.step === 2) {
              // 提交数据
              this.loading = true;
              // 取出省和市
              let customerC = this.accreditationForm.customerC;
              customerC.province = customerC.addressArr[0];
              if (customerC.addressArr[1]) {
                customerC.city = customerC.addressArr[1];
              }

              let cusAcct = this.accreditationForm.cusAcct;
              // 设置银行名称
              let dicItem = dicUtils.getDic('bank_brand').children.filter(item => {
                return (item.dicCode === cusAcct.bankCode);
              });

              cusAcct.bankName = dicItem[0].dicName;
              // 设置开户网点省市
              cusAcct.bankProvince = cusAcct.addressArr[0];
              cusAcct.bankCity = cusAcct.addressArr[1];

              this.$api.bsp.accreditation.saveAccreditationData(JSON.stringify(this.accreditationForm)).then(ret => {
                setTimeout(() => {
                  this.loading = false;
                  if (ret.type === 'success') {
                    this.step += 1;
                    this.currentView = 'step' + this.step;
                  }
                }, 800);
              });
            } else if (this.step < 2) {
              this.step += 1;
              this.currentView = 'step' + this.step;
            }
          } else {
            return false;
          }
        });
      },
      back () {
        this.step -= 1;
        if (this.step < 0) {
          this.step = 0;
        }
        this.currentView = 'step' + this.step;
      },
      cancel () {
        // 重新加载判断导航
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    },
    beforeMount () {
      // 查询企业基本信息(企业名称/是否需要邀请码等)
      this.$api.bsp.accreditation.getCustomerInfo().then(ret => {
        let customerC = ret.customerC;
        if (customerC.cusState === cusState['WAIT_FIRST_TRIAL'] ||
          customerC.cusState === cusState['WAIT_LAST_TRIAL'] ||
          customerC.cusState === cusState['LAST_TRIAL_BACK']) {
          // 已提交审核
          this.step = 3;
        } else if (customerC.cusState === cusState['AUTHENTICATE_BACK']) {
          // 认证驳回
          this.$router.push({'name': 'bsp.authenticate.back', params: customerC});
          return;
        } else if (customerC.cusState === cusState['ENABLE']) {
          // 认证通过
          this.$router.push({'path': '/bsp'});
          return;
        } else if (customerC.cusState === cusState['WAIT_AUTHENTICATE']) {
          console.log(this.$store.state.previousRouter.name);
          if (this.$store.state.previousRouter.name !== 'bsp.accreditation.wait' && this.$store.state.previousRouter.name !== 'bsp.accreditation.register-success') {
            this.$router.push({'name': 'bsp.accreditation.wait'});
            return;
          }
          this.step = 0;
        }
        this.currentView = 'step' + this.step;
        this.pageLoading = false;
        this.accreditationForm = {...this.accreditationForm, ...ret};
        // 银行账户名称默认是客户名称
        this.accreditationForm.cusAcct.acctName = this.accreditationForm.customerC.cusName;
        // 客户证件类型默认其他
        this.accreditationForm['customerC']['idType'] = dicUtils.getDic('id_type.id_type_7').dicCode;
        // 客户法人/股东证件默认身份证
        this.accreditationForm['customerC']['lrIdType'] = dicUtils.getDic('id_type.id_type_1').dicCode;
        // 回填地址
        this.accreditationForm.customerC.addressArr = [this.accreditationForm['customerC']['province'], this.accreditationForm['customerC']['city']];
        // 操作员信息
        this.accreditationForm['operators'] = [{'userName': '', 'phoneNo': '', 'certType': '', 'certNo': '', 'email': '', 'loginName': '', 'operateType': 'newOperator'}];
        // 待提交认证状态才显示服务协议对话框
        if (this.accreditationForm.customerC.cusState === cusState['WAIT_AUTHENTICATE']) {
          setTimeout(() => {
            this.$refs['protocol'].show();
          }, 1000);
        }
        // 判断是否需要邀请码
        this.needInviteCode = true;
        if (this.accreditationForm.customerC.cusType) {
          this.needInviteCode = false;
        }
      });
    },
    computed: {
      nextStepText () {
        window.scrollTo(0, 0);
        if (this.step === 2) {
          if (this.loading) {
            return '正在提交...';
          } else {
            return '确认提交';
          }
        } else {
          return '下一步';
        }
      }
    },
    components: {
      step0,
      step1,
      step2,
      step3,
      protocol,
      plFooter
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../../assets/scss/_variables.scss';
  @import './style.scss';
  .container{
    width: 100%;
  }
  .content{
    margin: 120px 10% 0;
  }
  .myprogress{
    width: 80%;
    margin: 10px 10%;
  }

</style>
