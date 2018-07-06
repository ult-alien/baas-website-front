<template>
  <div style="margin: 10px 20px 40px 20px;">
    <div class="success-msg">
      <div class="icon">
        <img src="./img/auditing.png" width="100px">
      </div>
      <div class="msg-content">
        您的认证申请已提交，请耐心等待审核结果！
        <p style="font-size: 120%;display: none;">查看审核进度</p>
      </div>
    </div>
    <div class="content-info">
      我们的审核时限为72小时(3个工作日)，遇法定节假日顺延，审核结果会短信通知您。<br>
      如有疑问，请拔打企业专享热线：0755-86720669。<br>
      <span class="a-link" @click="showAccreditationView">点击查看已提交的认证信息>></span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
    methods: {
      showAccreditationView () {
        this.$router.push({'name': 'bsp.accreditation.cus-view', params: this.accreditationForm.customerC});
      }
    },
    props: {
      accreditationForm: {
        type: Object
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/_variables.scss";
  @import './style.scss';
  .success-msg{
    background-color: $primary-color-light;
    padding: 18px 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .msg-content{
      height: 100px;
      line-height: 100px;
      font-weight: 500;
      font-size: 26px;
      color: cadetblue;
    }
    .icon{
      width: 28%;
      text-align: right;
      display: inline-block;
      height: 100px;
      line-height: 100px;
      .el-icon-time{
        color: $primary-color;
        font-size: 60px;
        line-height: inherit;
        margin-right: 4%;
      }
    }
  }
  .content-info{
    margin: 30px 0 0 28%;
    font-size: 120%;
    line-height: 2;
  }
</style>


