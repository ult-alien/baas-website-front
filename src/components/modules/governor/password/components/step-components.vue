<template>
<div>
    <div class="title">
      <el-steps :active="active" :align-center="true" :center="true" finish-status="success">
        <el-step title="找回方式"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="修改密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <method-page v-if= "active === 0" @methodsName="methodsName"></method-page>
    <component :is="currentView" v-if="active === 1" @next="next" @back="back"></component>
    <modify v-if="active === 2" @next="next" :srecurity-code = 'srecurityCode' :login-name = 'loginName' :phone-no="phoneNo"></modify>
    <success v-if="active === 3"></success>
</div>
</template>
<script>
  import methodPage from './components.vue';
  import phone from './phone-verification.vue';
  import info from './reserved-information.vue';
  import secret from './secret-question.vue';
  import modify from './modify-password.vue';
  import success from './success.vue';
  export default {
    data () {
      return {
        active: 0,
        currentView: String,
        loginName: '',
        phoneNo: '',
        srecurityCode: ''
      };
    },
    methods: {
      next (active, param) {
        if (param) {
          this.phoneNo = param['phoneNo'] ? param['phoneNo'] + '' : '';
          this.loginName = param['loginName'] || '';
          this.srecurityCode = param['srecurityCode'];
        }
        this.active = active;
      },
      previous (active) {
        this.active = active;
      },
      back (active) {
        this.active = active;
      },
      methodsName (method, number) {
        this.currentView = method;
        this.active = number;
      }
    },
    components: {
      methodPage,
      phone,
      info,
      secret,
      modify,
      success
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/index";
  @import "../../../../../assets/scss/variables";
.title {
  width: 100%;
  padding-top: 15px;
  border-bottom: 1px solid $border-color;
}
.el-steps {
  width:70%;
  margin: 0 auto;
}
</style>
