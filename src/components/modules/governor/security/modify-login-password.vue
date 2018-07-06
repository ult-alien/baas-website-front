<template>
    <pl-content-box>
        <pl-page-nav></pl-page-nav>
        <pl-content-box-block>
          <pl-content-box-card >
                  <el-form :model="form" ref="form" label-width="100px">
                      <el-row>
                          <el-col :span="15" :offset="4">
                              <el-form-item label="原始密码" prop="oldPassword" :rules="[
                                  {required: true, message: '请输入原始密码', trigger: 'blur'},
                                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                                  ]">
                                  <el-input type="password" v-model="form.oldPassword" placeholder="请输入原始密码"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="15" :offset="4">
                              <el-form-item label="新密码" prop="newPassword" :rules="[
                                  {required: true, message: '请输入新密码', trigger: 'blur'},
                                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                                  ]">
                                  <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="15" :offset="4">
                              <el-form-item label="确认密码" prop="comfirmPass" :rules="[
                                  {required: true, validator: validatePass, trigger: 'blur'},
                                  {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                                  ]">
                                  <el-input type="password" v-model="form.comfirmPass" auto-complete="off"
                                            placeholder="请再次输入密码"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                             <el-col :span="8"  :offset="4">
                                   <el-form-item label="验证码" prop="vertificationCode" :rules="[
                                      { required: true, message: '请输入验证码', trigger: 'blur' }
                                      ]">
                                         <el-input v-model="form.vertificationCode" placeholder="请输入验证码"></el-input>
                                   </el-form-item>
                            </el-col>
                            <el-col :span="4" class="text-right">
                                   <div class="code-img"><img title="点击刷新验证码"  width="90" :src="verifyCode"  @click="refreshVerifyCode"/></div>
                           </el-col>
                     </el-row>
                  </el-form>
              </div>
          </pl-content-box-card>
        </pl-content-box-block>
         <pl-affix :offset-bottom="0">
         <pl-content-box-toolbar class="text-center" :border="false">
              <el-button type="primary" @click="sure">完成</el-button>
          </pl-content-box-toolbar>
       </pl-affix> 
    </pl-content-box>
    </div>
</template>

<script>
    import {MsgType} from 'core/constants';
    import sysUtil from '../../../../core/utils/sys-util';
    export default {
      data () {
        return {
          form: {
            oldPassword: '',
            newPassword: '',
            comfirmPass: '',
            vertificationCode: ''
          },
          verifyCode: this.$api.core.getVerifyCode()
        };
      },
      methods: {
        sure () {
          let vm = this;
          this.$refs['form'].validate((valid) => {
            if (valid) {
              let obj = {...this.form};
              obj.oldPassword = sysUtil.encryptor(obj.oldPassword);
              obj.newPassword = sysUtil.encryptor(obj.newPassword);
              vm.$api.bsp.password.save(obj).then(res => {
                if (res.type === MsgType.SUCCESS) {
                  this.retsetFrom();
                  // this.$router.push({name: 'login'});
                  // this.$api.core.logout();
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
