<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-block>
      <pl-content-box-card>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="110px">
          <el-row v-if="showPrevPass">
            <el-col :span="15" :offset="4">
              <el-form-item label="原始支付密码" prop="prevPass" >
                <el-input type="password" v-model="ruleForm.prevPass" placeholder="请输入原始支付密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="text" @click="forgetPassword">忘记密码?</el-button>
            </el-col>
          </el-row>
           <el-row>
               <el-col :span="15" :offset="4">
                 <el-form-item label="新支付密码" prop="pass" :rules="[
                                  {required: true, message: '请输入新密码', trigger: 'change'},
                                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'},
                                  {validator:checkPasswordSecurity,trigger: 'change'}
                                  ]">
                    <el-input type="password" v-model="ruleForm.pass" placeholder="请输入新密码"></el-input>
                    <pl-pass-strength :pass-value="ruleForm.pass" :rules="rules" @after-checked="afterChecked"></pl-pass-strength>
                 </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" :offset="4">
              <el-form-item label="确认支付密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass"  auto-complete="off" placeholder="请再次输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="4">
              <el-form-item label="验证码" prop="vertificationCode">
                <el-input v-model="ruleForm.vertificationCode" auto-complete="off" placeholder="请输入验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-right">
              <div class="code-img"><img title="点击刷新验证码"  width="80" :src="verifyCode"  @click="refreshVerifyCode"/></div>
            </el-col>
          </el-row>
        </el-form>
      </pl-content-box-card>
    </pl-content-box-block>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button  type="primary" icon=" anticon icon-save" @click="success">保存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>

<script>
  import {MsgType} from 'core/constants';
  import sysUtil from '../../../../core/utils/sys-util';
  export default {
    data () {
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.ruleForm.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        ruleForm: {
          prevPass: '',
          pass: '',
          checkPass: '',
          vertificationCode: ''
        },
        ruleIndex: 0,
        rules: [],
        // rules: {
        //   prevPass: [
        //     { required: true, message: '请输入原始密码', trigger: 'blur' },
        //     { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        //   ],
        //   pass: [
        //     { required: true, message: '请输入新密码', trigger: 'blur' },
        //     { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        //   ],
        //   checkPass: [
        //     { validator: validatePass, trigger: 'blur' },
        //     { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        //   ],
        //   vertificationCode: [
        //     { required: true, message: '请输入验证码', trigger: 'blur' }
        //   ]
        // },
        verifyCode: this.$api.core.getVerifyCode(),
        // 参数表示是否有原始密码
        showPrevPass: false
      };
    },
    created () {
      this.$api.bsp.password.checkPayPwdExist().then(ret => {
        // 测试
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
        // 测试
        if (ret === 1) {
          this.showPrevPass = true;
        } else {
          this.showPrevPass = false;
        }
      });
    },
    components: {
      sysUtil
    },
    methods: {
      afterChecked (index) {
        this.ruleIndex = index;
      },
      checkPasswordSecurity (rule, value, callback) {
        if (this.ruleIndex < this.securityIndex) {
          callback(new Error('密码强度不够'));
        } else {
          callback();
        }
      },
      validatePass (rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      success () {
        let vm = this;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let obj = {...this.ruleForm};
            obj.oldPassword = sysUtil.encryptor(obj.prevPass);
            obj.newPassword = sysUtil.encryptor(obj.pass);
            // 没有密码就保存
            if (this.showPrevPass === false) {
              vm.$api.bsp.password.saveUserPayPassword(obj).then(res => {
                if (res.type === MsgType.SUCCESS) {
                  this.$refs['ruleForm'].resetFields();
                  // this.$api.core.logout();
                }
              });
            } else {
              vm.$api.bsp.password.modifyUserPayPassword(obj).then(res => {
                if (res.type === MsgType.SUCCESS) {
                  this.$refs['ruleForm'].resetFields();
                  // this.$router.push({name: 'login'});
                  // this.$api.core.logout();
                }
              });
            }
          }
        });
      },
      forgetPassword () {
        this.$router.push({name: 'bsp.biz.modify-payment-steps'});
      },
      refreshVerifyCode () {
        this.verifyCode = this.$api.core.getVerifyCode();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
img {
  height: 36px;
  border-radius: 4px;
}
</style>
