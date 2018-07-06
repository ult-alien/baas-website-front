<template>
  <pl-content-box>
    <pl-content-box-block>
    <pl-content-box-card class="max-width">
      <div class="siderbar_left">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
           <el-col :span="20">
               <el-form-item label="用户名" prop="loginName">
                  <el-input v-model="ruleForm.loginName" placeholder="请输入用户名"></el-input>
               </el-form-item>
          </el-col>
          </el-row>
          <el-row>
             <el-col :span="20">
                  <el-form-item label="预留信息" prop="infoDesc">
                       <el-input type="text" v-model="ruleForm.infoDesc" placeholder="请输入预留验证信息"></el-input>
                 </el-form-item>
            </el-col>
           </el-row>
           <el-row>
                 <el-col :span="11">
                       <el-form-item label="验证码" prop="vertificationCode">
                             <el-input v-model="ruleForm.vertificationCode" placeholder="请输入验证码"></el-input>
                       </el-form-item>
                </el-col>
                <el-col :span="5" class="text-right">
                       <div class="code-img"><img title="点击刷新验证码"  width="90" :src="verifyCode"  @click="refreshVerifyCode"/></div>
               </el-col>
             </el-row>
             <el-row class="bottom_button">
                <el-col :span="15" :offset="2">
                    <el-form-item>
                          <el-button  type="default" @click="back()">上一步</el-button>
                          <el-button  type="primary" :loading = 'nextLoading' @click="find()">下一步</el-button>
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
  export default {
    data () {
      return {
        ruleForm: {
          loginName: '',
          infoDesc: '',
          vertificationCode: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          infoDesc: [
            { required: true, message: '请输入预留验证信息', trigger: 'blur' }
          ],
          vertificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        verifyCode: this.$api.core.getVerifyCode(),
        nextLoading: false
      };
    },
    methods: {
      refreshVerifyCode () {
        this.verifyCode = this.$api.core.getVerifyCode();
      },
      find () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.nextLoading = true;
            this.$api.bsp.password.checkPeservationInfo(this.ruleForm.loginName, this.ruleForm.infoDesc, this.ruleForm.vertificationCode).then(ret => {
              this.nextLoading = false;
              if (ret.type === 'success') {
                let srecurityCode = ret.bean.srecurityCode;
                this.$emit('next', 2, {loginName: this.ruleForm.loginName, srecurityCode: srecurityCode});
              }
            });
          }
        });
      },
      login () {
        this.$router.push({name: 'login'});
      },
      back () {
        this.$emit('next', 0);
        // this.$router.push({name: 'forgetPass.components'});
      }
    },
    components: {
      siderbarLeft
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
  .max-width {
      min-width: 700px;
      max-width: 970px;
      margin: 20px auto 0 auto;
      padding: 50px 20px;
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
