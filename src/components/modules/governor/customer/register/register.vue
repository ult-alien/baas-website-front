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
                <el-form-item prop="cusName" label="企业名称">
                  <el-input  v-model="registerForm.cusName" placeholder="请输入您公司的完整名称" tips="请填写工商局注册的公司全称，支持中文、字母、数字或半角括号的组合，3-30个字符">
                  </el-input>
                </el-form-item>
                <el-form-item prop="contactorName" label="您的姓名">
                  <el-input  v-model="registerForm.contactorName" placeholder="请输入您的姓名" tips="您的姓名将作为系统的用户名">
                  </el-input>
                </el-form-item>
                <el-form-item prop="contactorPhone" label="手机号">
                  <el-input  v-model="registerForm.contactorPhone" placeholder="建议使用常用手机" tips="注册成功后，您可以用该手机登录和找回密码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码">
                  <el-input  v-model="registerForm.password" type="password" placeholder="请输入登录密码" tips="建议使用字母、数字和符号两种以上的组合，6-20个字符">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password2" label="确认密码">
                  <el-input  v-model="registerForm.password2" type="password" placeholder="请再次输入密码" tips="请再次输入密码">
                  </el-input>
                </el-form-item>
                <el-form-item prop="verifyCode" label="验证码">
                  <el-row >
                    <el-col :span="20"  style="padding-right: 4px;">
                      <el-input v-model="registerForm.verifyCode" placeholder="请输入验证码">
                      </el-input>
                    </el-col>
                    <el-col :span="4" class="text-right">
                      <div class="code-img"><img label="点击刷新验证码"  width="80" :src="verifyCode"  @click="refreshVerifyCode"/></div>
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
  import validators from 'core/utils/validators.js';
  import {MsgType} from '../../../../../core/constants';
  export default {
    mixins: [validators],
    data () {
      let validatePassword = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次密码不一致'));
        }
        callback();
      };
      let validateCusName = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error('请输入企业名称'));
        } else if (value.length < 3 || value.length > 30) {
          callback(new Error('长度在 3 到 30 个字符'));
        }
        this.$api.bsp.register.checkCustomerExist({'cusName': value}).then(ret => {
          if (ret) {
            callback(new Error('已存在企业，请直接登录'));
          }
          callback();
        });
      };
      return {
        registerForm: {
          cusName: '',
          contactorName: '',
          contactorPhone: '',
          password: '',
          password2: '',
          verifyCode: '',
          msgVerifyCode: ''
        },
        loading: false,
        time: 0,
        smsCodeLoading: false,
        btnText: '立即注册',
        verifyCode: this.$api.core.getVerifyCode(),
        rules: {
          cusName: [
            { required: true, trigger: 'blur', validator: validateCusName }
          ],
          contactorName: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          contactorPhone: [
            { required: true, trigger: 'blur', validator: this.telephoneValidator }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password2: [
            { required: true, trigger: 'blur', validator: validatePassword }
          ],
          verifyCode: [
            { required: true, trigger: 'blur', message: '请输入验证码' }
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
      go (msg) {
        if (msg.bean && msg.bean.serviceUrl) {
          window.location.href = msg.bean.serviceUrl;
        } else {
          this.$router.push({'name': 'bsp.accreditation.register-success'});
        }
      },
      getSMS () {
        this.$refs['registerForm'].validateField('contactorPhone', errorMessage => {
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
            this.$api.bsp.register.sendSMS({phoneNo: this.registerForm.contactorPhone}).then(ret => {
              this.$notify({
                message: ret.msg,
                type: MsgType.INFO,
                duration: 3000
              });
            });
          }
        });
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.btnText = '正在注册...';
            this.$api.bsp.register.register(this.registerForm).then((ret) => {
              this.loading = false;
              this.btnText = '立即注册';
              if (ret.type === 'success') {
                // 注册成功之后登陆
                let form = {
                  'userName': this.registerForm.contactorPhone,
                  'password': this.registerForm.password,
                  'kaptchaReceived': this.registerForm.verifyCode
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
        this.verifyCode = this.$api.core.getVerifyCode();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../accreditation/style";
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
    background: url('../../../../login/img/loading.gif') no-repeat center 0;
  }
</style>


