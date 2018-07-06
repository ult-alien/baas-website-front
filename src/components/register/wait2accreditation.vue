<template>
  <div>
    <pl-content-box-block>
      <div class="success-msg ">
        <div class="icon">
          <img src="./img/authentication.png" width="100px">
          <!-- <i class="el-icon-time"></i>-->
        </div>
        <div>
          <h2 style="height: 100px; line-height: 100px; margin: 0;font-size: 26px;">
            您已成功注册，请继续完成企业认证！
          </h2>
        </div>
      </div>
      <div class="content-info">
        您已经成功注册为共赢链科技链单平台的用户，请继续进行企业认证，尊享链单服务，助力企业发展。<br>
        立即进行&nbsp;<router-link to="/accreditation/step" class="link">企业认证>>&nbsp;<i class="anticon icon-link"></i></router-link>
      </div>
    </pl-content-box-block>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/_variables.scss";
  .success-msg{
    color: cadetblue;
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
      .el-icon-time{
        color: gold;
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
  .link{
    color: $primary-color;
  }
</style>


