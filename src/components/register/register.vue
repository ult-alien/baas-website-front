<template>
  <div>
    <pl-header></pl-header>
    <pl-layout class="layout-contianer" :show-left='false'>
      <pl-content-box slot="right">
        <br>
        <div class="bolck-title">
          <span>注册信息</span>
        </div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="register-form">
          <pl-content-box-block :fixed-width="false">
            <pl-content-box-card class="accreditation-content-box no-border">
              <div class="accreditation-content">
                <el-form-item prop="loginName" label="用户姓名">
                  <el-row>
                    <el-col :span="12">
                      <el-input :disabled="!newUser" v-model="registerForm.loginName" placeholder="请输入用户姓名" tips="您的姓名将作为系统的用户名">
                      </el-input>
                    </el-col>
                    <!--<el-col :span="12">-->
                      <!--<pl-content-item-text>-->
                        <!--<el-radio v-model="newUser" :label="true">我是新用户</el-radio>-->
                        <!--<el-radio v-model="newUser" :label="false">我已注册过</el-radio>-->
                      <!--</pl-content-item-text>-->
                    <!--</el-col>-->
                  </el-row>

                </el-form-item>
                <el-form-item prop="email" label="注册邮箱">
                  <el-row>
                    <el-col :span="12">
                      <el-input  v-model="registerForm.email" placeholder="请输入注册邮箱" tips="您的注册邮箱可作为登录账户名称">
                      </el-input>
                    </el-col>
                    <!--<el-col :span="12">-->
                    <!--<pl-content-item-text>-->
                    <!--<el-radio v-model="newUser" :label="true">我是新用户</el-radio>-->
                    <!--<el-radio v-model="newUser" :label="false">我已注册过</el-radio>-->
                    <!--</pl-content-item-text>-->
                    <!--</el-col>-->
                  </el-row>

                </el-form-item>
                <el-form-item prop="phoneNo" label="手机号">
                    <el-input  v-model="registerForm.phoneNo" placeholder="建议使用常用手机" tips="注册成功后，您可以用该手机登录和找回密码">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码" v-if="newUser">
                  <el-input  v-model="registerForm.password" type="password" placeholder="请输入登录密码" tips="建议使用字母、数字和符号两种以上的组合，6-20个字符">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password2" label="确认密码"  v-if="newUser">
                  <el-input  v-model="registerForm.password2" type="password" placeholder="请再次输入密码" tips="请再次输入密码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="verifyCode" label="验证码"  v-if="newUser">
                  <el-row >
                    <el-col :span="20"  style="padding-right: 4px;">
                      <el-input v-model="registerForm.verifyCode" placeholder="请输入验证码">
                      </el-input>
                    </el-col>
                    <el-col :span="4" class="text-right">
                      <div class="code-img">
                        <div title="点击刷新验证码"  width="80" v-html="verifyCode"  @click="refreshVerifyCode"/>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item prop="msgVerifyCode" label="短信验证码">
                  <el-row >
                    <el-col :span="19" style="padding-right: 5px;">
                      <el-input v-model="registerForm.msgVerifyCode" placeholder="请输入手机验证码">
                      </el-input>
                    </el-col>
                    <el-col :span="5" class="text-right" >
                      <el-button type="primary" :loading="smsCodeLoading" @click="getSMS" style="padding: 10px 14px;">{{smsBtnText}}</el-button>
                    </el-col>
                  </el-row>
                <!--  <el-input  v-model="registerForm.msgVerifyCode" placeholder="请输入手机验证码">
                    <template slot="append">获取验证码</template>
                  </el-input>-->
                </el-form-item>
                <el-form-item style="text-align: center;">
                  <el-button type="primary" @click="submitForm('registerForm')" :loading="loading">{{btnText}}</el-button>
                  <el-button @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>
              </div>
            </pl-content-box-card>
        </pl-content-box-block>
        </el-form>
      </pl-content-box>
    </pl-layout>
  </div>
</template>

<script>
  import validators from 'src/core/utils/validators.js';
  import config from 'src/config';
  export default {
    mixins: [validators],
    data () {
      let validatePassword = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次密码不一致'));
        }else {
          callback();
        }
      };
      let validateVerifyCode = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error('请正确输入验证码'));
          return;
        }
        this.$api.core.checkVertifyCode(value).then(ret => {
          if (ret.type === 'error') {
            callback(new Error(ret.msg));
          }else {
            callback();
          }
        });
      };
      let validateLoginName = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error('请输入用户名称'));
          return;
        } else if (value.length < 3 || value.length > 30) {
          callback(new Error('长度在 3 到 30 个字符'));
          return;
        }
        this.$api.core.checkUserExist({'loginName': value,'reqType':'loginName'}).then(ret => {
          if (ret.type === 'error') {
            callback(new Error(ret.msg));
            return;
          }
          callback();
        });
      };
      let validateEmail = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error('请输入注册邮箱'));
          return;
        }
        let apitemp = this.$api.core;
        this.emailValidator(rule,value,function (result) {
          if (!result) {
            apitemp.checkUserExist({'email': value,'reqType':'email'}).then(ret => {
              if (ret.type === 'error') {
                callback(new Error(ret.msg));
                return;
              }
              callback();
            });
          }else {
            callback(result);
          }
        });

      };
      let validatePhoneNo = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error('请输入注册手机号'));
          return;
        }
        this.telephoneValidator(rule,value,callback);
      };
      return {
        registerForm: {
          loginName: '',
          email: '',
          phoneNo: '',
          password: '',
          password2: '',
          verifyCode: this.refreshVerifyCode(),
          msgVerifyCode: ''
        },
        newUser: true,
        loading: false,
        time: 0,
        smsCodeLoading: false,
        btnText: '立即注册',
        verifyCode: '',
        rules: {
          loginName: [
            { required: true, message: '请输入您的账户名称', trigger: 'blur', validator: validateLoginName },
            { min: 2, max: 20, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入您的注册邮箱', trigger: 'blur', validator: validateEmail },
            { min: 2, max: 20, message: '请检查邮箱有效性', trigger: 'blur' }
          ],
          phoneNo: [
            {required: true, message: '手机号码不能为空', trigger: 'change'},
            {callback: this.phoneCallback,required: true, trigger: 'blur', validator: validatePhoneNo, existForTrue: !this.newUser }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password2: [
            { required: true, trigger: 'blur', validator: validatePassword }
          ],
          verifyCode: [
            { required: true, trigger: 'blur', message: '请输入验证码', validator: validateVerifyCode }
          ],
          msgVerifyCode: [
            { required: true, trigger: 'blur', message: '请输入手机验证码' }
          ]
        }
      };
    },
    computed: {
      smsBtnText () {
        return this.smsCodeLoading ? this.time + 's' : '获取验证码';
      }
    },
    methods: {
      phoneCallback (obj) {
        if (obj) {
          this.registerForm.loginName = obj.userName;
        } else {
          this.registerForm.loginName = '';
        }
      },
      go (msg) {
        if (msg.bean && msg.bean.serviceUrl) {
          window.location.href = msg.bean.serviceUrl;
        } else {
          this.$router.push({'name': 'bsp.accreditation.register-success'});
        }
      },
      getSMS () {
        console.debug("getSMS...");
        this.$refs['registerForm'].validateField('phoneNo', errorMessage => {
          console.debug("errorMessage="+errorMessage);
          if (!errorMessage) {
            this.smsCodeLoading = true;
            this.time = 60;
            let timer = setInterval(() => {
              this.time--;
              if (this.time === 0) {
                this.smsCodeLoading = false;
                clearInterval(timer);
              }
            }, 1000);
            this.$api.cust.register.sendSMS({phoneNo: this.registerForm.phoneNo}).then(ret => {
//              this.$notify({
//                message: ret.msg,
//                type: MsgType.INFO,
//                duration: 3000
//              });
            });
          }
        });
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.btnText = '正在注册...';
            this.$api.core.register(this.registerForm).then((ret) => {
              this.loading = false;
              this.btnText = '立即注册';
              if (ret.type === 'success') {
                // 注册成功之后登陆
                let form = {};
                form = {
                  'username': this.registerForm.phoneNo,
                  'password': this.registerForm.password,
                  'kaptchaReceived': this.registerForm.verifyCode,
                  'grant_type': 'password',
                  'client': 'frontend',
                  appCode: config.appCode
                };
                this.loading = true;
                this.btnText = '正在登录...';
                this.$store.dispatch('login', form)
                  .then(({isLogin, msg}) => {
                    this.loading = false;
                    this.btnText = '立即注册';
                    if (isLogin) {
                      this.go(msg);
                    }
                  }
                );
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      refreshVerifyCode () {
        this.loading = true;
        this.$api.core.getCaptcha(Math.random()).then(res =>{
          this.verifyCode=res.body;
          this.loading = false;
        });
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "./scss/style";
  /*.register-form{
    width: 56%;
    margin: 40px 22% 0 22%;
    background-color: #fff;
  }*/
  .code-img{
    height: 36px;
    img{
      cursor: pointer;
    }
    //background: url('../login/img/loading.gif') no-repeat center 0;
  }
</style>


