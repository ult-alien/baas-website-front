<template>
  <el-dialog :title="title" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="120px"  :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型编码" prop="organType" :rules="[
                    { required: true, message: '请输入机构类型', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                    { validator: ajaxCheck, trigger: 'change' }
                  ]">
              <el-input v-model="form.organType" placeholder="请输入机构类型" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型名称"  prop="typeName" :rules="[
                    { required: true, message: '输入类型名称', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                  ]">
              <el-input v-model="form.typeName" placeholder="输入类型名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构类型" prop="parentType">
              <el-select v-model="form.parentType" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in typeList"
                  :label="item.typeName"
                  :value="item.organType">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="typeState" :rules="[
                  { required: true, message: '请选择状态', trigger: 'change' }
                ]">
              <pl-constant-select type="PubConstants.TypeState" v-model="form.typeState" :showEmpty="false"></pl-constant-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="close()">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from 'core/constants';
  export default {
    data () {
      return {
        form: {
          organType: '',
          typeName: '',
          parentType: '',
          typeState: '1'
        },
        title: '',
        disabled: false,
        type: '',
        typeList: [],
        loading: false,
        dialogVisible: false
      };
    },
    methods: {
      show (organType, type) {
        let vm = this;
        this.$api.bsp.organ.selectAllType(organType).then((ret) => {
          this.typeList = ret;
        });
        this.type = type;
        if (type === 1) {
          this.$api.bsp.organ.selectByOrganType(organType).then((ret) => {
            this.form = ret;
          });
          this.disabled = true;
          this.title = '修改机构类型';
        } else {
          this.form.organType = '';
          this.form.typeName = '';
          this.form.parentType = '';
          this.form.typeState = '1';
          this.disabled = false;
          this.title = '新增机构类型';
        }
        vm.dialogVisible = true;
      },
      ajaxCheck (rule, value, callback) {
        if (!value) {
          callback();
        } else {
          this.$api.bsp.organ.checkOrganType(this.form.organType, this.form.parentType).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('机构类型已经存在'));
            } else {
              callback();
            }
          });
        }
      },
      close () {
        this.$refs['form'].resetFields();
        this.dialogVisible = false;
      },
      sure () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            if (vm.type === 0) { // 添加机构类型
              vm.$api.bsp.organ.saveOrganType(this.form).then(ret => {
                vm.loading = false;
                vm.$emit('after-update');
                vm.close();
              });
            } else { // 更新机构类型
              vm.$api.bsp.organ.updateOrganType(this.form).then(ret => {
                vm.loading = false;
                vm.$emit('after-update');
                vm.close();
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


