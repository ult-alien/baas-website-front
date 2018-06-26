<template>
  <div class="footer-warpper">
    <div class="footer-contianer">
      <div class="pull-left right">
        <!--<div class="logo">-->
          <!--<img src="./img/logo-w.png" height="30">-->
        <!--</div>-->
        <div class="copyright">
          共赢链信息科技（深圳）有限公司 版权所有<br>
          ©2017-2025  Win-Win Chain Information Technology CO.Ltd.
        </div>
      </div>
      <div class="pull-right links">
        <a>主页</a>&ensp;|&ensp;
        <a>服务大厅</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/index";
  .footer-warpper {
    font-family: Arial, Helvetica, Sans-Serif;
    background-color: #5b6067;
    padding: 40px 0px;
    .footer-contianer{
      @extend .container;
      height: 60px;
      .right{
        height: 100%;
        /*padding-left: 120px;*/
        position: relative;
        .logo{
          position: absolute;
          top: 15px;
          left: 20px;
          height: 30px;
          padding-right: 30px;
          border-right: 2px solid #909499;
        }
        .copyright{
          color: #909499;
          padding: 10px;
        }
      }
      .links{
        padding: 20px;
        color: #fff;
        a {
          color: #fff;
        }
      }
    }
  }
</style>


