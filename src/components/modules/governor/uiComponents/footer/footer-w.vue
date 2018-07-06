<template>
  <div class="footer-warpper">
    <div class="footer-contianer text-center">
      <div class="copyright">
        共赢链信息科技（深圳）有限公司 版权所有<br>
        ©2017-2025  Win-Win Chain Information Technology CO.,Ltd.
      </div>
     <!-- <div class="pull-left right">
        <div class="logo">
          <img src="./img/logo-g.png" height="30">
        </div>
        <div class="copyright">
          共赢链信息科技（深圳）有限公司 版权所有<br>
          ©2017-2025  Win-Win Chain Information Technology CO.Ltd.
        </div>
      </div>
      <div class="pull-right links">
        <a>新手入们</a>&ensp;|&ensp;
        <a>关于共赢链</a>&ensp;|&ensp;
        <a>联系我们</a>
      </div>-->
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
    /*background-color: #fff;*/
    padding: 0px 0px 40px 0px;
    .footer-contianer{
      @extend .container;
      margin-top: -10px;
      height: 60px;
      .right{
        height: 100%;
       /* padding-left: 120px;*/
        position: relative;
        .logo{
          position: absolute;
          top: 15px;
          left: 20px;
          height: 30px;
          padding-right: 30px;
          border-right: 1px solid #99a1a6;
        }

      }
      .copyright{
        color:#99a1a6;
        padding: 10px;
      }
      .links{
        padding: 20px;
        color: #99a1a6;
        a {
          color: #99a1a6;
          cursor: pointer;
          &:hover {
            color: #222 !important;
          }
        }
      }
    }
  }
</style>


