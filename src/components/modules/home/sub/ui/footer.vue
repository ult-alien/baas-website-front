<template>
  <div class="footer-warpper">
    <div class="footer-contianer">
      <div class="pull-left footer-content">
        <!--<div class="logo pull-left">-->
          <!--<img src="./img/logo-g.png" height="30">-->
        <!--</div>-->
        <div class="link">
          <ul>
            <li class="title">快速链接</li>
            <li @click="toChainbill" class="footer-link">共赢链&nbsp;|&nbsp;链单</li>
          </ul>
          <ul>
            <li class="title">加入我们</li>
            <li class="footer-link" @click="wait">社会招聘</li>
            <li class="footer-link" @click="wait">校园招聘</li>
          </ul>
          <ul>
            <li class="title">联系我们</li>
            <li><!--<i class="el-icon-phone"></i>&nbsp;-->0755-86720669</li>
            <li>
              <!--<el-tooltip placement="top" effect="light">
                <div slot="content">
                  <img src="static/images/index/weixin.png" style="max-width: 100px;" alt="微信扫一扫">
                </div>
                <span><i class="portal portal-wechat" style="font-size: 14px;"></i>&nbsp;微信扫一扫</span>
              </el-tooltip>-->
              gylsz@gylsz.cn
            </li>
          </ul>
        </div>
        <!--<div class="copyright mobile">
          <img src="static/images/index/logo-green.png" alt="logo"> 共赢链信息科技（深圳）有限公司 版权所有©2017-2025
        </div>-->
        <div class="logo">
          <img src="static/images/index/weixin.png" alt="微信扫一扫">
          <!--<logo>
            <span style="color: #fff;" slot="companyName">共赢链</span>
          </logo>-->
        </div>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2017-2025&emsp;共赢链信息科技（深圳）有限公司&emsp;粤ICP备18032780号-1
    </div>
    <div class="copyright mobile">
      共赢链信息科技（深圳）有限公司<br/>Copyright © 2017-2025&emsp;粤ICP备18032780号-1
    </div>
  </div>
</template>

<script>
  import logo from './logo.vue';
  export default {
    components: {
      logo
    },
    methods: {
      toChainbill () {
        window.open('http://www.chainbill.cn');
      },
      wait () {
        this.$message('尚未开放，敬请期待!');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/index";
  .footer-warpper {
    font-family: Arial, Helvetica, Sans-Serif;
    background-color: #2a2f34;
    z-index: 9;
    position: relative;
    overflow: hidden;
    .footer-contianer{
      .footer-link{
        cursor: pointer;
      }
      @extend .container;
      .footer-content{
        height: 100%;
        position: relative;
        width: 100%;
        .link{
          color: #fff;
          overflow: hidden;
          margin: 20px 0;
          ul{
            float: left;
            li{
              height: 30px;
              line-height: 30px;
              color: #fff;
              &.title{
                font-size: 1.2em;
                height: 44px;
                line-height: 44px;
                color: #fff;
              }
            }
            margin-right: 60px;
            @media only screen and (max-device-width: 1024px) {
              margin-right: 12px;
            }
          }
        }
        .logo{
          height: 90px;
          line-height: 90px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: max-content;
          img{
            max-width: 90px;
          }
          @media only screen and (max-device-width: 1024px) {
            height: auto;
            line-height: normal;
            img{
              max-width: 60px !important;
            }
          }
        }
      }
    }

    .copyright{
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: #23282d;
      color: #fff;
      &.mobile{
        display: none;
        line-height: normal;
        height: auto;
        padding: 4px 0;
      }
    }


    /**
    *  mobile
    */
    @media only screen
    and (max-device-width: 1024px) {
      .copyright{
        display: none;
        &.mobile{
          display: block;
        }
      }
      .footer-contianer{
        .footer-content {
          .link{
            margin: 14px 0;;
          }
        }
      }
    }
  }
</style>


