<template>
  <div>
    <pl-content-box-block>
      <div class="main">
        <div class="icon"><img src="./img/authentication.png" width="100px"></div>
        <div>
          <h2 style="color: red;">
            您的认证申请审核失败！
          </h2>
          <p style="font-size: 100%;">
            为不耽误您办理链单业务，请尽快按照审批回执单修改您的认证申请，并重新提交。
            <br> 如有疑问，请拔打企业专享热线：0755-86720669。
          </p>
        </div>
      </div>
      </pl-content-box-block>
      <accreditation-edit :contactorId="$route.params.contactorId" :cusId="$route.params.cusId"></accreditation-edit>
  </div>
</template>

<script>
  import accreditationEdit from './accreditation-edit.vue';
  export default {
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
    },
    components: {
      accreditationEdit
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../../assets/scss/_variables.scss';
  @import './style.scss';
  .main{
    background-color: $primary-color-light;
    padding: 18px 0;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .icon{
      width: 28%;
      text-align: right;
      display: inline-block;
      height: 100px;
      line-height: 100px;
      .el-icon-warning{
        color: gold;
        font-size: 60px;
        line-height: inherit;
        margin-right: 4%;
      }
    }
  }
  .link{
    color: $primary-color;
  }
</style>


