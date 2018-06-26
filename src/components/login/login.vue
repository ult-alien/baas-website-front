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
            <!--<el-form-item>
              <el-row>
                <el-col :span="16">
                  <el-input v-model="form.kaptchaReceived" auto-complete="off" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8" class="text-right">
                  <div class="code-img"><img title="点击刷新验证码"  width="80" :src="verifyCode"  @click="refreshVerifyCode"/></div>
                </el-col>
              </el-row>
            </el-form-item>-->
            <el-form-item class="login-btn-wrapper">
              <el-button  type="primary" class="login-btn" @click="send" :loading="loading">登录</el-button>
            </el-form-item>
            <!--<el-form-item>-->
              <el-row>
                <!--<el-col :span="9">
                     <el-checkbox v-model="form.rememberMe" checked>记住密码</el-checkbox>
                </el-col>-->
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
        this.verifyCode = this.$api.core.getVerifyCode();
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
            background: url(./img/loading.gif) no-repeat center 0;
          }
        }
      }
    }
  }
</style>


