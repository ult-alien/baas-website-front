<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-block>
      <pl-content-box-card>
             <el-form :model="ruleForm"  ref="ruleForm" label-width="130px">
                   <el-row>
                         <el-col :span="15"  :offset="4">
                           <el-form-item label="预留验证信息" prop="infoDesc" :rules="[
                          { required: true, message: '请输入预留验证信息', trigger: 'change' },
                          { max: 50, message: '字符长度不能超过50', trigger: 'change' }]">
                              <el-input type="text" v-model="ruleForm.infoDesc" placeholder="请输入预留信息"></el-input>
                           </el-form-item>
                        </el-col>
                    </el-row>
               </el-form>
        </pl-content-box-card>
    </pl-content-box-block>
    <pl-affix :offset-bottom="0">
       <pl-content-box-toolbar class="text-center" :border="false">
            <el-button type="primary" icon=" anticon icon-save" @click="save" :loading="loading">保存</el-button>
        </pl-content-box-toolbar>
     </pl-affix>
  </pl-content-box>
</template>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          infoId: '',
          infoDesc: ''
        },
        loading: false
      };
    },
    created () {
      this.select();
    },
    methods: {
      save () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$api.bsp.security.updateReservationInfo(this.ruleForm).then(ret => {
//              this.$refs['ruleForm'].resetFields();
              setTimeout(() => {
                this.loading = false;
              }, 1000);
              this.select();
            });
          }
        });
      },
      select () {
        this.$api.bsp.security.selectReservationInfo().then(ret => {
          if (ret !== '') {
            console.log(ret);
            this.ruleForm = ret;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
