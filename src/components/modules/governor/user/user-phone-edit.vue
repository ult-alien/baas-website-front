<template>
  <el-dialog title="修改手机号码" :visible.sync="showVisible" width="500px">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px" :model="form" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="证件号码" prop="certNo" :rules="[
          {required: true, message: '请输入您认证通过的证件号', trigger: 'change' },
          {pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '证件号码格式有误！', trigger: 'change'},
          {validator: checkCertNo}
          ]">
              <el-input v-model="form.certNo" placeholder="请输入您认证通过的证件号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新手机号码" prop="phoneNo"
                          :rules="[{required: true, message: '请输入新手机号码'},{validator: checkPhone, trigger: 'blur'}, {validator: this.checkPhoneNoUnique}]">
              <el-input v-model="form.phoneNo" placeholder="输入新手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="msgVerifyCode" label="短信验证码" :rules="[{ required: true, trigger: 'change', message: '请输入手机验证码'}]">
              <el-row>
                <el-col :span="19" style="padding-right: 5px;">
                  <el-input v-model="form.msgVerifyCode" placeholder="请输入手机验证码">
                  </el-input>
                </el-col>
                <el-col :span="5" class="text-right">
                  <el-button type="primary" :loading="smsCodeLoading" @click="getSMS" style="padding: 10px 14px;">{{smsBtnText}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>     <!-- icon=" anticon icon-save"  -->
    </div>
  </el-dialog>
</template>
<script>
  import {MsgType} from 'core/constants';
  export default {
    data () {
      return {
        loading: false,
        showVisible: false,
        smsCodeLoading: false,
        time: 60,
        srcCertNo: '',
        form: {
          userId: '',
          phoneNo: '',
          certNo: '',
          msgVerifyCode: ''
        }
      };
    },
    computed: {
      smsBtnText () {
        return this.smsCodeLoading ? this.time + 's' : '获取验证码';
      }
    },
    methods: {
      show (userId, srcCertNo) {
        this.showVisible = true;
        this.form.userId = userId;
        this.srcCertNo = srcCertNo;
        this.form.phoneNo = '';
        this.form.certNo = '';
        this.form.msgVerifyCode = '';
        this.smsCodeLoading = false;
      },
      closeDialog () {
        this.showVisible = false;
      },
      getSMS () {
        this.$refs['form'].validateField('phoneNo', errorMessage => {
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
            this.$api.bsp.user.sendSMS({phoneNo: this.form.phoneNo}).then(ret => {
              console.info('获取短信验证码', ret);
            });
          }
        });
      },
      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码!'));
        } else {
          callback();
        }
      },
      checkPhoneNoUnique (rule, value, callback) {
        let vm = this;
        if (!value) {
          callback();
        } else {
          vm.$api.bsp.user.checkPhoneNoUnique(this.form.loginName, this.form.phoneNo).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('手机号码已存在'));
            } else {
              callback();
            }
          });
        }
      },
      checkCertNo (rule, value, callback) {
        if (value !== this.srcCertNo) {
          callback(new Error('您输入的证件号尚未认证'));
        } else {
          callback();
        }
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$api.bsp.user.uploadUserInfo(this.form).then((ret) => {
              if (ret.type === MsgType.SUCCESS) {
                this.showVisible = false;
                this.$emit('reload');
              }
              this.loading = false;
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>
