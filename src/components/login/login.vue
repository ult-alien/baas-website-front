<template>
  <section class="login-wrapper">
    <pl-header></pl-header>
    <div class="login-context" ref="loginContext">
      <div class="login-container">
        <div class="login-panel" @keyup.enter="send">
          <div class="login-title">
            登录
          </div>
          <el-form ref="form" :model="form" class="login-form">
            <el-form-item>
              <el-input v-model="form.userName" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="16">
                  <el-input v-model="form.kaptchaReceived" auto-complete="off" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8" class="text-right">
                  <div  class="code-img">
                    <div title="点击刷新验证码"  width="80" v-html="verifyCode"  @click="refreshVerifyCode"></div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="login-btn-wrapper">
              <el-button  type="primary" class="login-btn" @click="send" :loading="loading">登录</el-button>
            </el-form-item>
            <!--<el-form-item>-->
              <el-row>
                <el-col :span="9">
                     <el-checkbox v-model="form.rememberMe" checked>记住密码</el-checkbox>
                </el-col>
                <!--<el-col :span="12"  class="text-left">
                  <el-button type="text" class="forgetPass" @click="registerBuyer">免费注册</el-button>
                </el-col>-->
                <el-col :span="12">
                  <el-button type="text" class="forgetPass" @click="forgetPassword">忘记密码&nbsp;?</el-button>
                </el-col>
              </el-row>
            <!--</el-form-item>-->
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // let prodEnv = require('../../../config/prod.env');
  // let devEnv = require('../../../config/dev.env');
  import config from '../../config';
  import { MsgType } from 'core/constants';
  export default {
    data () {
      return {
        form: {
          userName: '',
          password: '',
          rememberMe: true,
          kaptchaReceived: ''
        },
        msg: '<em>hello world</em>',
        loading: false,
        verifyCode: this.$api.core.getVerifyCode()
      };
    },
    methods: {
      setLoginHeight () {
        let h = document.documentElement.clientHeight;
        let loginContext = this.$refs.loginContext;
        if (loginContext) {
          loginContext.style.height = (h - loginContext.offsetTop) + 'px';
        }
      },
      send () {
        this.loading = true;
        // this.$router.push({name: 'bsp.biz.notice-list'});// 暂时性
        this.$store.dispatch('login', this.form)
          .then(({isLogin, msg}) => {
            this.loading = false;
            if (isLogin) {
              this.go(msg);
            }
          }
        );
      },
      go (msg) {
        if (msg.bean && msg.bean.sso) {
          this.goBizApp(); // 个性化需求,跳转业务系统
          return;
        }
        if (msg.bean && msg.bean.serviceUrl) {
          window.location.href = msg.bean.serviceUrl;
        } else {
          this.$router.push(config.defaultRoute());
        }
      },
      goBizApp () {
        let authApps = this.$store.state.contextData.user.extension.authApps;
        let bizApp = null;
        if (authApps) {
          for (let i = 0, len = authApps.length; i < len; i++) {
            if (authApps[i].appCode === 'CHAINBILL') {
              bizApp = authApps[i];
              break;
            }
          }
        }

        if (bizApp) {
          window.location.href = bizApp.appUrl;
        } else {
          this.$router.push(config.defaultRoute());
        }
      },
      refreshVerifyCode () {
        this.$api.core.getCaptcha(Math.random()).then(res =>{
          this.verifyCode=res.body;
          this.loading = false;
          console.debug("refreshVerifyCode...this.verifyCode="+this.verifyCode);
        });

       // this.verifyCode = this.$api.core.getCaptcha(Math.random());
        //this.verifyCode = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"50\"><path fill=\"#111\" d=\"M83.70 14.87L83.59 14.77L83.61 14.79Q84.79 17.11 86.74 17.11L86.74 17.11L86.69 17.07Q87.29 17.17 87.71 17.02L87.63 16.94L87.68 16.99Q87.41 22.05 87.37 28.45L87.39 28.46L87.36 28.44Q87.37 34.72 87.56 39.98L87.45 39.87L87.52 39.93Q87.13 39.78 86.75 39.78L86.80 39.83L86.86 39.89Q85.50 39.90 84.10 41.77L84.09 41.76L84.04 41.71Q84.64 34.93 84.61 28.23L84.67 28.29L84.71 28.34Q84.60 21.56 83.68 14.86ZM83.50 42.77L83.51 42.78L83.57 42.84Q84.35 41.19 85.53 40.46L85.58 40.51L85.60 40.53Q85.54 41.46 85.47 42.53L85.62 42.68L85.60 42.66Q86.33 42.14 87.09 42.25L87.16 42.31L86.99 42.15Q89.17 42.50 90.54 45.28L90.44 45.18L90.58 45.32Q89.29 37.86 89.29 30.59L89.27 30.57L89.33 30.63Q89.32 23.08 90.12 15.96L90.03 15.88L90.19 16.03Q89.04 17.74 87.98 18.39L88.06 18.47L88.02 18.43Q87.97 17.66 88.09 16.29L88.12 16.33L88.20 16.41Q87.34 16.76 86.58 16.65L86.61 16.68L86.52 16.59Q84.25 16.42 83.22 13.52L83.14 13.44L83.07 13.37Q84.34 21.03 84.45 28.19L84.45 28.18L84.38 28.12Q84.53 35.31 83.54 42.81Z\"/><path fill=\"#111\" d=\"M55.20 39.90L55.32 40.02L55.22 39.92Q51.01 39.33 49.19 37.89L49.23 37.92L49.28 37.98Q47.39 36.47 46.97 33.47L47.02 33.51L46.96 33.45Q46.87 33.02 46.53 28.26L46.52 28.25L46.66 28.39Q46.66 27.17 46.58 25.92L46.61 25.95L46.55 25.88Q46.37 20.84 48.58 19.08L48.61 19.11L48.62 19.12Q51.20 16.94 58.96 16.26L58.94 16.23L58.97 16.26Q60.37 16.18 62.01 16.22L62.07 16.28L62.09 16.30Q62.02 16.22 64.99 16.22L64.92 16.16L64.95 16.19Q65.79 16.19 67.50 16.34L67.51 16.35L67.50 16.34Q67.07 17.36 66.04 20.44L66.00 20.40L66.05 20.45Q63.94 19.21 60.93 19.21L60.95 19.23L60.94 19.23Q60.17 19.21 59.37 19.29L59.37 19.29L59.43 19.35Q54.17 19.65 51.66 21.62L51.73 21.70L51.68 21.65Q49.74 23.33 49.59 26.68L49.55 26.64L49.55 26.64Q49.44 27.17 49.48 28.43L49.60 28.56L49.52 28.47Q49.66 33.33 52.06 35.43L52.01 35.38L51.98 35.35Q54.31 37.45 59.30 37.76L59.30 37.76L59.30 37.76Q62.39 37.88 65.40 36.09L65.31 36.00L65.27 35.96Q65.97 38.79 66.58 40.16L66.59 40.18L66.63 40.21Q64.51 40.46 62.88 40.42L62.76 40.31L62.87 40.41Q58.39 40.35 55.27 39.97ZM70.36 43.68L70.36 43.67L70.38 43.70Q68.47 40.57 67.79 37.98L67.96 38.16L67.83 38.02Q67.39 38.28 66.40 38.66L66.48 38.73L66.46 38.72Q66.14 37.93 65.95 37.10L66.00 37.15L65.49 35.31L65.45 35.26Q62.32 37.47 59.20 37.35L59.15 37.31L59.05 37.21Q54.78 37.01 52.46 35.26L52.54 35.34L52.57 35.36Q51.50 33.61 51.57 30.68L51.47 30.57L51.48 30.59Q51.67 26.13 54.14 24.00L54.07 23.93L54.19 24.04Q56.26 22.08 60.94 21.47L61.01 21.54L60.95 21.48Q61.76 21.38 62.49 21.38L62.39 21.28L62.51 21.40Q65.16 21.27 67.25 22.79L67.34 22.88L67.29 22.83Q67.92 20.83 69.14 17.60L69.04 17.50L69.03 17.49Q68.70 17.43 68.15 17.37L68.17 17.39L68.17 17.39Q67.72 17.43 67.45 17.43L67.31 17.29L67.43 17.41Q67.50 16.76 67.95 15.77L68.06 15.87L68.02 15.83Q67.87 15.91 65.38 15.84L65.34 15.79L65.34 15.79Q62.89 15.76 62.24 15.80L62.28 15.84L62.19 15.75Q51.60 16.01 48.14 18.60L48.20 18.66L48.21 18.68Q46.13 20.44 46.13 24.36L46.26 24.49L46.23 24.46Q46.18 25.51 46.29 28.21L46.21 28.14L46.21 28.14Q46.46 31.81 46.68 33.52L46.65 33.48L46.69 33.52Q47.11 36.68 48.71 38.21L48.67 38.17L48.61 38.11Q49.14 38.82 50.39 39.97L50.35 39.93L50.33 39.90Q53.64 41.73 58.89 42.49L58.89 42.49L58.97 42.57Q65.27 43.39 70.26 43.58Z\"/><path d=\"M14 6 C76 3,86 19,135 2\" stroke=\"#333\" fill=\"none\"/><path fill=\"#444\" d=\"M31.16 41.25L31.25 41.34L28.11 41.06L28.12 41.07Q25.72 40.95 24.92 40.84L24.94 40.86L24.97 40.89Q23.10 40.51 21.92 39.63L21.86 39.57L22.02 39.73Q20.60 38.19 20.37 34.84L20.51 34.98L20.39 34.87Q20.36 34.38 20.29 33.16L20.38 33.25L20.35 33.22Q20.24 32.70 20.17 31.59L20.27 31.69L20.29 31.72Q20.28 30.91 20.32 30.19L20.21 30.08L20.21 30.08Q20.48 28.22 21.51 27.46L21.36 27.31L21.46 27.41Q23.49 26.36 28.33 26.13L28.24 26.04L28.13 25.93Q30.17 25.84 30.97 25.84L31.13 26.00L31.01 25.87Q32.56 25.94 33.93 26.25L33.97 26.29L33.98 26.30Q33.33 27.47 32.80 29.30L32.73 29.23L32.74 29.25Q32.38 29.45 31.88 29.41L31.89 29.42L31.73 29.26Q31.73 29.33 31.19 29.22L31.19 29.22L30.13 28.88L30.16 28.91Q29.09 28.64 28.48 28.67L28.45 28.64L28.47 28.66Q23.86 28.85 23.25 31.67L23.27 31.69L23.26 31.68Q22.98 32.80 23.05 33.76L22.95 33.66L23.01 33.71Q23.23 36.37 24.46 37.45L24.33 37.32L24.45 37.44Q25.65 38.48 28.24 38.52L28.31 38.59L28.17 38.45Q29.66 38.50 30.38 38.19L30.44 38.25L31.49 37.78L31.51 37.80Q31.93 37.46 32.50 37.38L32.60 37.48L32.60 37.47Q32.74 39.18 33.12 40.47L33.08 40.44L33.12 40.48Q32.91 40.88 31.12 41.22ZM34.38 44.18L34.47 44.26L34.49 44.28Q34.75 44.20 35.59 44.28L35.56 44.24L35.54 44.23Q36.30 44.38 36.64 43.81L36.57 43.74L36.67 43.83Q35.35 41.64 34.85 39.54L34.98 39.67L34.98 39.67Q34.60 39.59 34.14 39.59L34.08 39.53L34.09 39.54Q33.60 39.47 33.22 39.66L33.34 39.78L33.32 39.76Q32.96 38.48 32.81 37.08L32.88 37.15L32.71 36.98Q32.20 37.00 30.98 37.58L31.05 37.64L31.00 37.59Q29.81 38.19 29.31 38.19L29.19 38.07L29.28 38.16Q28.76 38.13 28.15 38.09L28.16 38.10L28.18 38.13Q27.22 38.04 25.24 37.47L25.36 37.58L25.31 37.53Q24.94 36.79 24.98 35.65L24.91 35.57L25.09 35.75Q25.25 31.50 30.20 30.96L30.19 30.96L30.06 30.83Q30.85 30.93 32.22 31.28L32.26 31.31L32.11 31.17Q33.55 31.58 34.27 31.54L34.21 31.47L34.23 31.50Q34.69 29.29 35.37 27.46L35.45 27.54L35.33 27.42Q35.03 27.38 34.65 27.31L34.63 27.29L33.93 27.27L33.87 27.22Q34.07 26.72 34.45 25.85L34.51 25.92L34.36 25.76Q32.82 25.41 31.26 25.41L31.36 25.51L31.27 25.42Q28.87 25.42 24.50 25.80L24.48 25.78L24.58 25.88Q22.53 25.93 20.97 26.92L21.10 27.04L21.01 26.95Q19.86 27.98 19.86 29.88L19.87 29.89L19.76 29.78Q19.92 30.35 20.03 31.57L19.91 31.45L19.94 31.49Q20.12 32.61 20.08 33.22L19.92 33.06L19.94 33.08Q20.08 35.09 20.81 38.82L20.72 38.73L20.75 38.76Q21.22 39.69 21.71 40.18L21.59 40.06L21.89 40.36L21.99 40.42L21.88 40.31Q22.86 42.40 26.78 43.01L26.81 43.03L26.91 43.14Q29.99 43.55 32.65 43.81L32.75 43.91L32.76 43.92Q33.47 43.90 34.38 44.17Z\"/><path fill=\"#111\" d=\"M119.85 30.96L119.72 30.83L119.73 30.85Q119.86 29.45 119.04 28.54L118.98 28.47L118.96 28.45Q118.22 27.62 116.78 27.66L116.77 27.65L116.71 27.59Q114.51 27.79 113.67 29.92L113.71 29.96L113.71 29.96Q113.40 30.71 113.36 31.40L113.42 31.46L113.41 31.45Q113.09 36.20 112.18 40.54L112.18 40.53L112.09 40.45Q110.42 40.98 108.55 41.97L108.64 42.06L108.67 42.09Q110.90 35.07 110.63 27.76L110.71 27.83L110.55 27.68Q110.30 20.34 107.75 13.53L107.72 13.50L107.74 13.52Q109.64 14.96 111.65 15.65L111.60 15.60L111.69 15.68Q113.05 21.38 113.24 27.24L113.24 27.24L113.20 27.20Q114.60 25.14 117.30 25.21L117.35 25.26L117.37 25.28Q122.35 25.28 122.46 30.64L122.51 30.69L122.61 30.79Q122.76 36.50 124.13 41.14L124.05 41.06L124.10 41.11Q122.23 40.27 120.48 40.08L120.40 40.00L120.48 40.08Q119.93 36.79 119.82 30.93ZM120.01 40.26L120.01 40.26L120.07 40.32Q121.20 40.53 122.30 40.80L122.18 40.68L122.35 40.85Q122.28 40.89 122.81 42.87L122.82 42.87L122.82 42.88Q125.82 43.86 127.84 45.31L127.90 45.37L127.89 45.36Q125.05 39.43 124.51 33.11L124.67 33.27L124.61 33.21Q124.32 29.53 122.91 27.96L122.94 28.00L122.90 27.96Q122.77 27.75 122.13 27.30L122.17 27.34L122.23 27.40Q121.99 26.90 121.34 26.13L121.41 26.20L121.28 26.00L121.42 26.14Q120.57 25.29 117.45 25.02L117.26 24.83L117.39 24.96Q116.64 24.93 115.23 25.27L115.14 25.19L115.31 25.36Q115.03 20.43 114.68 17.92L114.61 17.84L114.61 17.84Q113.87 17.75 112.38 17.44L112.50 17.56L112.33 17.39Q112.21 16.69 111.94 15.21L111.91 15.18L112.06 15.33Q109.09 14.34 107.23 12.78L107.05 12.61L107.15 12.70Q110.09 19.83 110.36 27.64L110.34 27.62L110.32 27.60Q110.71 35.49 108.16 42.84L108.08 42.75L108.20 42.88Q108.97 42.12 110.11 41.62L110.22 41.74L109.40 43.92L109.45 43.98Q112.63 42.70 114.61 42.51L114.61 42.51L114.49 42.39Q115.03 36.95 115.22 32.99L115.21 32.98L115.21 32.98Q115.49 31.32 117.43 30.21L117.37 30.15L117.44 30.23Q117.87 29.89 118.40 29.93L118.44 29.97L118.41 29.94Q118.48 29.86 118.83 29.90L118.95 30.02L119.28 30.01L119.31 30.04Q119.30 30.41 119.41 30.87L119.49 30.94L119.42 30.88Q119.66 36.97 120.15 40.40Z\"/></svg>";        console.debug("refreshVerifyCode..."+this.verifyCode);
        //console.debug("refreshVerifyCode...this.verifyCode="+this.verifyCode);

      },
      forgetPassword () {
        this.$router.push({name: 'forgetPass'});
      },
      registerBuyer () {
        // let registerPath = process.env.NODE_ENV === 'production' ? prodEnv.registerPath : devEnv.registerPath;
        /* if (process.env.NODE_ENV === 'production') {
          this.$api.core.getBuyerRegAddress().then(ret => {
            window.location.href = ret.address;
          });
        } else {
          this.$router.push({name: ''});
        } */
        this.$router.push({'name': 'bsp.register'});
      }
    },
    created () {
      this.refreshVerifyCode();
      if (this.$store.state.isLogin) {
        this.$router.push(config.defaultRoute());
      }
    },
    mounted () {
      this.setLoginHeight();
      let _this = this;
      window.onresize = function () {
        _this.setLoginHeight();
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/scss/index";
  .login-wrapper {
    background: #fff;
    overflow: hidden;
    .login-context {
      min-height: 500px;
      /*margin-top: 60px;*/
      background: url("img/login-bg.png") no-repeat center 0;
      .login-container {
        @extend .container;
        position: relative;
        height: 100%;
        .login-panel {
          position: absolute;
          top: calc(45% - 180px);
          right: 100px;
          box-shadow: 2px 2px 5px rgb(204, 204, 204);
          height: 360px;
          width: 330px;
          background: rgba(255, 255, 255, 0.8);
          .login-title {
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            font-size: 20px;
            border-bottom: 1px solid $border-color;
          }
          .login-form {
            padding: 30px 30px;
            .login-btn-wrapper{
              text-align: right;
            }
            .forgetPass {
              padding: 2px 0px;
            }
          }
          .login-btn {
            width: 100%;
          }
          .code-img{
            height: 36px;
            img{
              cursor: pointer;
            }
           // background: url(./img/loading.gif) no-repeat center 0;
          }
        }
      }
    }
  }
</style>


