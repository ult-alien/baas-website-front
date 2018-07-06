<template>
  <pl-content-box>
  <pl-content-box-block>
      <pl-content-box-card class="max-width">
        <div class="siderbar_left pull-left">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-row>
                  <el-col :span="20">
                        <el-form-item label="用户名" prop="name">
                                 <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="密保问题">
                      <el-select  placeholder="请选择想验证的密保问题" v-model="form.question">
                        <el-option
                        v-for="item in securityIssue"
                          :label="item.description"
                          :value="item.issueId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                     <el-col :span="20">
                         <el-form-item  label="密保答案" prop="answer">
                              <el-input type="text" v-model="form.answer" placeholder="请输入密保答案"></el-input>
                         </el-form-item>
                      </el-col>
                </el-row>
                 <el-row>
                       <el-col :span="10">
                             <el-form-item label="验证码" prop="vertificationCode">
                                   <el-input v-model="form.vertificationCode" placeholder="请输入验证码"></el-input>
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
                          <el-button  type="primary" :loading = 'nextLoading' @click="next()">下一步</el-button>
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
  // import {MsgType} from '../../../../core/constants';
  export default {
    data () {
      return {
        form: {
          name: '',
          question: '',
          answer: '',
          verificationCode: ''
        },
        securityIssue: [],
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在3-16个字符之间', trigger: 'blur' }
          ],
          question: [
            { required: true, message: '请选择密保问题', trigger: 'change' }
          ],
          answer: [
            { required: true, message: '请输入密保答案', trigger: 'blur' },
            { min: 3, max: 20, message: '长度必须在3-20个字符之间', trigger: 'blur' }
          ],
          vertificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        verifyCode: this.$api.core.getVerifyCode(),
        active: 0,
        nextLoading: false
      };
    },
    created () {
      this.$api.bsp.password.getAllSecurityIssue().then((ret) => { // 得到所有的密保问题
        this.securityIssue = ret;
        console.log(ret);
      });
    },
    methods: {
      refreshVerifyCode () {
        this.verifyCode = this.$api.core.getVerifyCode();
      },
      next () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.nextLoading = true;
            vm.$api.bsp.password.checkSecurityIssue(this.form.name, this.form.question, this.form.answer, this.form.vertificationCode).then(ret => {
              vm.nextLoading = false;
              if (ret.type === 'success') {
                let srecurityCode = ret.bean.srecurityCode;
                this.$emit('next', 2, {loginName: this.form.name, srecurityCode: srecurityCode});
              }
            });
          }
        });
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
      padding: 30px 15px;
      height: 450px;
    }
  .siderbar_left{
     width:65%;
     padding-top: 45px;
     padding: 50px 0 50px 75px;
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
