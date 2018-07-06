<template>
<div>
  <pl-page-nav  :show-previous="true"></pl-page-nav>
  <div class="title">
    <el-steps :active="active" :align-center="true" :center="true">
      <el-step title="身份验证"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </div>
  <verifycate v-if="active === 0" @setPass="setPass"></verifycate>
  <set-new-pass v-if="active === 1" @previous="previous" @next="next"></set-new-pass>
  <success v-if="active === 2"></success>
</div>
</template>
<script>
  import verifycate from './modify-payment-verifycate.vue';
  import setNewPass from './modify-payment-newpass.vue';
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
      setPass (active) {
        this.active = active;
      },
      next (active) {
        this.active = active;
      },
      previous (active) {
        this.active = active;
      }
    },
    components: {
      verifycate,
      setNewPass,
      success
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/index";
  @import "../../../../assets/scss/variables";
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
