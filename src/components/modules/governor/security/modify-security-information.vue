<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-block>
      <pl-content-box-card>
          <el-form :model="form" ref="form" label-width="100px">
            <el-row>
              <el-col :span="15"  :offset="4">
                <el-form-item label="密保问题" prop="issueId" :rules="[
                    { required: true, message: '请选择密保问题', trigger: 'change' }
                    ]">
                    <el-select  placeholder="请选择想验证的密保问题" v-model="form.issueId" @change="handleChange">
                          <el-option
                          v-for="item in securityIssue"
                          :label="item.description"
                          :value="item.issueId"
                          ></el-option>
                     </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="15"  :offset="4">
                 <el-form-item label="密保答案" prop="issueResult" :rules="[
                  { required: true, message: '请输入密保答案', trigger: 'change' },
                  { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                  ]">
                  <el-input type="text" v-model="form.issueResult" placeholder="请输入新的密保答案"></el-input>
                 </el-form-item>
              </el-col>
              </el-row>
            </el-form>
            </div>
      </pl-content-box-card>
      <pl-affix :offset-bottom="0">
           <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="primary" icon=" anticon icon-save" @click="save">保存</el-button>
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
          userId: '', // 用户id
          issueId: '', // 密保问题id
          issueResult: '' // 问题答案
        },
        securityIssue: []
      };
    },
    created () {
      this.$api.bsp.security.getAllSecurityIssue().then((ret) => { // 得到所有密保答案
        this.securityIssue = ret;
      });
    },
    methods: {
      handleChange () {
        this.$api.bsp.security.findSecurityIssueResult({issueId: this.form.issueId}).then(ret => {
          if (ret) {
            this.form.issueResult = ret.issueResult;
          } else {
            this.form.issueResult = '';
          }
        });
      },
      save () { // 保存
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$api.bsp.security.saveSecurityIssueResultData(this.form);
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
