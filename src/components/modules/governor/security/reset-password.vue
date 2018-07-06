<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-block>
      <div class="title">
            <span > 填写您的信息 <i class=" anticon icon-right"></i></span>
            <span>设置新密码</span>
      </div>
      <div class="siderbar_left">
             <el-form :model="form" ref="form" label-width="100px">
                     <el-row>
                         <el-col :span="19">
                           <el-form-item label="新密码" prop="newPassword" :rules="[
                                { required: true, message: '请输入新密码', trigger: 'blur' },
                                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                                ]">
                              <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
                           </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="19">
                            <el-form-item label="确认密码" prop="confirmPass" :rules="[
                                { required: true, validator: validatePass, trigger: 'blur' },
                                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                                ]">
                              <el-input type="password" v-model="form.confirmPass"  auto-complete="off" placeholder="请再次输入密码"></el-input>
                            </el-form-item>
                        </el-col>
                     </el-row>

                   <el-row>
                      <el-col :span="19">
                          <el-form-item class="text-center">
                                <el-button  type="success" @click="sure">完成</el-button>
                                <el-button @click="back">返回</el-button>
                          </el-form-item>
                        </el-col>
                    </el-row>
               </el-form>
            </div>
            <div class="siderbar_right">
                <p>如遇到问题请联系:</p>
                <p>电话:<span>4006-23006</span></p>
                <p>已有登录平台账户，<a href="#">直接登录</a></p>
            </div>
    </pl-content-box-block>
  </pl-content-box>
</template>

<script>
  import {MsgType} from '../../../../core/constants';
  export default {
    data () {
      return {
        form: {
          newPassword: '',
          confirmPass: '',
          verificationCode: ''
        }
      };
    },
    methods: {
      sure () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {...this.form};
            vm.$api.password.reset(obj).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.retsetFrom();
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
      back () {}
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.title{
   height:50px;
   line-height:26px;
   color: #8D8D8D;
   font-size: 16px;
   padding:0 0 10px 20px;
}
.siderbar_left{
   width:60%;
   float:left;
   padding-top:15px;
   border-right: 1px solid #ccc;
   img{
      width:80px;
      height: 37px;
      border-radius: 4px;
   }
}
.siderbar_right{
   width:35%;
   float: left;
   font-size: 14px;
   padding:25px 0 50px 130px;
   span{
      color:#F7BA2A;
      font-weight:700;
      padding-left:5px;
   }
   a{
      text-decoration:underline;
      color:#FF4949;

   }
}
</style>
