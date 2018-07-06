<template>
  <pl-content-box>
    <pl-content-box-block>
      <el-form :model="form" ref="form" label-width="100px">
      <el-row>
        <el-col :span="10" :offset="5">
          <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="form.phoneNum" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button :loading="smsCodeLoading" type="primary" @click="getSmsCode">{{smsBtnText}}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="5">
            <el-form-item label="手机验证码" prop="message" :rules="[
                                  {required: true, message: '请输入手机验证码', trigger: 'blur'},
                                  ]">
              <el-input v-model="form.message" placeholder="请输入手机验证码"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="5">
            <el-form-item label="验证码" prop="vertificationCode">
              <el-input v-model="form.vertificationCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
            <div class="code-img"><img title="点击刷新验证码"  width="100" :src="verifyCode"  @click="refreshVerifyCode"/></div>
        </el-col>
      </el-row>
      </el-form>
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button  @click="back()" type="primary">取&emsp;消</el-button>
          <el-button :disabled="nextFlag" type="primary" :loading="nextLoading" @click="next()">下一步</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </pl-content-box-block>
  </pl-content-box>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          phoneNum: '',
          vertificationCode: '',
          message: ''
        },
        smsCodeLoading: false,
        nextLoading: false,
        code: '',
        verifyCode: this.$api.core.getVerifyCode(),
        time: 60,
        nextFlag: false
      };
    },
    computed: {
      smsBtnText () {
        return this.smsCodeLoading ? this.time + 's' : '获取验证码';
      }
    },
    created () {
      this.$api.bsp.password.getUserPhone().then(ret => {
        this.form.phoneNum = ret;
        if (!this.form.phoneNum) {
          this.nextFlag = true;
        }
      });
    },
    methods: {
      refreshVerifyCode () {
        this.verifyCode = this.$api.core.getVerifyCode();
      },
      getSmsCode () {
        this.$refs['form'].validateField('phoneNum', errorMessage => {
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
            this.$api.bsp.password.getPhoneSmsCode({phoneNum: this.form.phoneNum});
          }
        });
      },
      back () {
        if (this.$store.state.previousRouter.name) {
          this.$router.push({name: this.$store.state.previousRouter.name});
        }
      },
      next () {
        // 当前没有表单验证，如果需要验证请释放下面注释
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let param = {
              phoneNum: this.form.phoneNum,
              smsCode: this.form.message,
              verifyCode: this.form.vertificationCode
            };
            this.$api.bsp.password.smsCheck(param).then(ret => {
              this.nextLoading = false;
              if (ret.type === 'success') {
                this.$emit('setPass', 1);
              }
            });
          }
        });
      }
    }
  };
</script>
<sty>

</style>