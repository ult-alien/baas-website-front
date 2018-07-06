<template>
  <el-dialog title="模板信息" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px"  :model="form" ref="form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板名" prop="tmplName" :rules="[
                    { required: true, message: '模板名', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                  ]">
              <el-input v-model="form.tmplName" placeholder="输入模板名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="拥有角色" prop="roles" class="line-height-36" :rules="[
               { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
            ]">
              <el-select v-model="form.roles" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注"  prop="note" :rules="[
               { max: 50, message: '字符长度不能超过50', trigger: 'change' }
              ]">
              <el-input type="textarea" v-model="form.note" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          tmplName: '',
          note: '',
          roles: []
        },
        options: [],
        loading: false,
        dialogVisible: false,
        template: null
      };
    },
    methods: {
      show (id = '') {
        this.retsetFrom();
        this.$api.bsp.authTmpl.findTemplate(id).then((ret) => {
          setTimeout(() => {
            if (!ret) {
              return;
            }

            this.template = ret;

            let roles = ret.roles;
            if (roles && roles.length) {
              this.options = ret.roles;
            }

            if (id) {
              this.form.tmplName = ret.tmplName;
              this.form.note = ret.note;
              this.form.roles = roles.filter((item) => {
                return item.checked;
              }).map((item) => {
                return item.roleId;
              });
            }
          }, 250);
        });
        this.dialogVisible = true;
      },
      retsetFrom () {
        this.options = [];
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
          this.form.roles = [];
        }
      },
      close () {
        this.dialogVisible = false;
      },
      sure () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            let obj = {...this.form};
            delete obj.roles;
            obj.roleIds = this.form.roles.join(',');
            obj.tmplId = this.template.tmplId;

            if (!this.template.tmplId) { // 添加资源
              this.$api.bsp.authTmpl.addTemplate(obj).then(ret => {
                this.loading = false;
                this.$emit('after-update');
                this.close();
              });
            } else { // 更新资源
              this.$api.bsp.authTmpl.updateTemplate(obj).then(ret => {
                this.loading = false;
                this.$emit('after-update');
                this.close();
              });
            }
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


