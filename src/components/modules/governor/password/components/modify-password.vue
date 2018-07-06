<template>
    <pl-content-box>
        <pl-content-box-block>
            <pl-content-box-card class="max-width">
                <div class="siderbar_left">
                  <el-form :model="form" ref="form" label-width="100px">
                      <el-row>
                          <el-col :span="19">
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
                          <el-col :span="19">
                              <el-form-item label="确认密码" prop="comfirmPass" :rules="[
                                  {required: true, validator: validatePass, trigger: 'change'},
                                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'}
                                  ]">
                                  <el-input type="password" v-model="form.comfirmPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="15" :offset="2">
                              <el-form-item class="text-center">
                                  <!--<el-button type="default" @click="back">上一步</el-button>-->
                                  <el-button type="primary" @click="sure" :loading ='loading'>完成</el-button>
                              </el-form-item>
                          </el-col>
                      </el-row>
                 </el-form>
              </div>
              <siderbar-left></siderbar-left>
            </pl-content-box-card>
        </pl-content-box-block>
    </pl-content-box>
</template>

<script>
    import siderbarLeft from './siderbar-right.vue';
    import {MsgType} from 'core/constants';
    import sysUtil from '../../../../../core/utils/sys-util';
    export default {
      data () {
        return {
          form: {
            newPassword: '',
            comfirmPass: ''
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
      methods: {
        sure () {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.loading = true;
              let param = {};
              param.newPassword = sysUtil.encryptor(this.form.newPassword);
              param.loginName = this.loginName;
              param.phoneNo = this.phoneNo;
              param.srecurityCode = this.srecurityCode;
              this.$api.bsp.password.modifyPassword(param).then(ret => {
                this.loading = false;
                if (ret.type === MsgType.SUCCESS) {
                  this.$emit('next', 3);
                }
              });
            }
          });
        },
        retsetFrom () {
          if (this.$refs['form']) { // 重置表单
            this.$refs['form'].resetFields();
          }
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
          this.$emit('previous', 1);
        }
      },
      components: {
        siderbarLeft
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
@import "../../../../../assets/scss/index";
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
