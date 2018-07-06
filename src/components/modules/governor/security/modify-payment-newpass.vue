<template>
  <pl-content-box>
    <pl-content-box-block>
      <pl-content-box-card>
        <el-form :model="form" ref="form" label-width="100px">
          <el-row>
            <el-col :span="14" :offset="4">
              <el-form-item label="新密码" prop="newPassword" :rules="[
                  {required: true, message: '请输入新密码', trigger: 'change'},
                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'},
                  {validator:checkPasswordSecurity,trigger: 'change'}
                  ]">
                  <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
                <pl-pass-strength :pass-value="form.newPassword" :rules="rules" @after-checked="afterChecked"></pl-pass-strength>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="4">
              <el-form-item label="确认密码" prop="comfirmPass" :rules="[
                  {required: true, validator: validatePass, trigger: 'change'},
                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'}
                  ]">
                <el-input type="password" v-model="form.comfirmPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="4">
              <el-form-item label="验证码" prop="vertificationCode" :rules="[
                                  {required: true, message: '请输入验证码', trigger: 'blur'},
                                  ]">
                <el-input v-model="form.vertificationCode" placeholder="请输入验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-right">
              <div class="code-img"><img title="点击刷新验证码"  width="80" :src="verifyCode"  @click="refreshVerifyCode"/></div>
            </el-col>
          </el-row>
       </el-form>
      </pl-content-box-card>
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="primary" @click="back">返回</el-button>
          <el-button type="primary" @click="sure" :loading ='loading'>完成</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </pl-content-box-block>
  </pl-content-box>
</template>

<script>
    import {MsgType} from 'core/constants';
    import sysUtil from '../../../../core/utils/sys-util';
    export default {
      data () {
        return {
          form: {
            newPassword: '',
            comfirmPass: '',
            vertificationCode: ''
          },
          verifyCode: this.$api.core.getVerifyCode(),
          loading: false,
          rules: [],
          ruleIndex: 0,
          securityIndex: 0
        };
      },
      props: {
        loginName: String,
        phoneNo: String,
        srecurityCode: String
      },
      components: {
        sysUtil
      },
      methods: {
        sure () {
          // 当前没有表单验证，如果需要验证请释放下面注释
          this.$refs['form'].validate((valid) => {
            if (valid) {
              let vm = this;
              let obj = {...this.form};
              obj.newPassword = sysUtil.encryptor(obj.newPassword);
              vm.$api.bsp.password.findUserPayPassword(obj).then(res => {
                if (res.type === MsgType.SUCCESS) {
                  this.$refs['form'].resetFields();
                  this.$emit('next', 2);
                  // this.$api.core.logout();
                }
              });
            }
          });
        },
        checkPasswordSecurity (rule, value, callback) {
          if (this.ruleIndex < this.securityIndex) {
            callback(new Error('密码强度不够'));
          } else {
            callback();
          }
        },
        afterChecked (index) {
          this.ruleIndex = index;
        },
        validatePass (rule, value, callback) {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        },
        refreshVerifyCode () {
          this.verifyCode = this.$api.core.getVerifyCode();
        },
        back () {
          this.$emit('previous', 0);
        }
      },
      created () {
        this.$api.bsp.security.getSecurityRule().then(ret => {
          let dict = ret.children;
          let colors = ['#FF4949', '#F7BA2A', '#20A0FF', '#41b883'];
          this.$api.bsp.security.getLoginSecurityRule().then(ruleret => {
            this.rules = dict.map((item, index) => {
              if (item.dicCode === ruleret.ruleStrength) {
                this.securityIndex = index;
              }
              return {reg: item.extension1, color: colors[index], rank: item.dicName};
            });
          });
        });
      }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
img {
  height: 36px;
  border-radius: 4px;
}
</style>
