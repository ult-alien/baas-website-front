<template>
  <pl-content-box>
    <pl-content-box-block>
      <pl-content-box-card class="max-width">
        <div class="siderbar_left">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px">
            <el-row>
              <el-col :span="17">
                <el-form-item label="绑定手机号码" prop="phoneNum">
                      <el-input v-model.number="ruleForm.phoneNum" placeholder="请输入您的手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-button :loading="smsCodeLoading" type="primary" @click="getSmsCode">
                  {{smsBtnText}}
                </el-button>
              </el-col>
            </el-row>
            <el-row>
                 <el-col :span="12">
                     <el-form-item  label="手机验证码" prop="message" >
                            <el-input v-model="ruleForm.message" placeholder="请输入手机验证码"></el-input>
                     </el-form-item>
                   </el-col>
               </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="验证码" prop="vertificationCode">
                    <el-input v-model="ruleForm.vertificationCode" placeholder="请输入验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                  <div class="code-img"><img title="点击刷新验证码"  width="100" :src="verifyCode"  @click="refreshVerifyCode"/></div>
                </el-col>
              </el-row>
              <el-row class="bottom_button">
                <el-col :span="15" :offset="2">
                  <el-form-item>
                      <el-button  type="default"  @click="back()">上一步</el-button>
                      <el-button  type="primary" :loading="nextLoading" @click="find()">下一步</el-button>
                    </el-form-item>
                  </el-col>
              </el-row>
             </el-form>
            </div>
          <siderbar-left></siderbar-left>
        </pl-content-box-card>
      </pl-content-box-block>
<!--       <pl-affix :offset-bottom="0">
       <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="primary"  @click="back()">上一步</el-button>
          <el-button type="primary"  @click="find()">下一步</el-button>
        </pl-content-box-toolbar>
     </pl-affix> -->
  </pl-content-box>
</template>

<script>
  import siderbarLeft from './siderbar-right.vue';
  const validatePhone = (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('请输入正确的手机号码!'));
    } else {
      callback();
    }
  };
  export default {
    data () {
      return {
        ruleForm: {
          phoneNum: '',
          message: '',
          vertificationCode: ''
        },
        rules: {
          phoneNum: [
            { required: true, message: '请输入手机号码' },
            { validator: validatePhone, message: '请输入正确的手机号码' }
          ],
          message: [
            { required: true, message: '请输入短信验证码' }
          ],
          vertificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        verifyCode: this.$api.core.getVerifyCode(),
        smsCodeLoading: false,
        nextLoading: false,
        time: 60
      };
    },
    computed: {
      smsBtnText () {
        return this.smsCodeLoading ? this.time + 's' : '获取验证码';
      }
    },
    methods: {
      find () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let param = {
              phoneNum: this.ruleForm.phoneNum,
              smsCode: this.ruleForm.message,
              verifyCode: this.ruleForm.vertificationCode
            };
            this.nextLoading = true;
            this.$api.bsp.password.smsCheck(param).then(ret => {
              this.nextLoading = false;
              if (ret.type === 'success') {
                let srecurityCode = ret.bean.srecurityCode;
                this.$emit('next', 2, {phoneNo: this.ruleForm.phoneNum, srecurityCode: srecurityCode});
              }
            });
          }
        });
      },
      refreshVerifyCode () {
        this.verifyCode = this.$api.core.getVerifyCode();
      },
      getSmsCode () {
        this.$refs['ruleForm'].validateField('phoneNum', errorMessage => {
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
            this.$api.bsp.password.getSmsCode({phoneNum: this.ruleForm.phoneNum});
          }
        });
      },
      back () {
        this.$emit('back', 0);
      }
    },
    components: {
      siderbarLeft
    }
  };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";
  .max-width {
    min-width: 700px;
    max-width: 970px;
    margin: 20px auto 0 auto;
    padding: 50px 15px;
    height: 400px;
  }
  .siderbar_left{
       width:65%;
       float:left;
       padding-top:45px;
       border-right: 1px solid $border-color;
       img{
          width:80px;
          height: 36px;
          @include border-radius(4px);
       }
       .bottom_button {
         margin-top: 20px;
       }
    }


</style>
