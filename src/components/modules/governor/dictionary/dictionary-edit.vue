<template>
  <el-dialog title="字典信息" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px"  :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="字典名" prop="dicName" :rules="[
                    { required: true, message: '字典名', trigger: 'change', max: 30  }
                  ]">
              <el-input v-model="form.dicName" placeholder="输入字典名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典代码"  prop="dicCode" :rules="[
                    { required: true, message: '输入字典代码', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                    { validator: ajaxCheck, trigger: 'change' }
                  ]">
              <el-input v-model="form.dicCode"   placeholder="输入字典代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父字典值" prop="parentId">
              <el-input v-model="form.parentName"  :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扩展字段1" prop="extension1" :rules="[
                    { max: 150, message: '字符长度不能超过150', trigger: 'change' }
                  ]">
              <el-input v-model="form.extension1" placeholder="字符长度不能超过50" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扩展字段2" prop="extension2"  :rules="[
                    { max: 150, message: '字符长度不能超过150', trigger: 'change' }
                  ]">
              <el-input v-model="form.extension2" placeholder="字符长度不能超过50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序码" prop="dicSort" :rules="[
                  { required: true, type: 'number' ,message: '输入排序码', trigger: 'change' }
                ]">
              <pl-input-number :min="0" :numeric-precision="0" v-model="form.dicSort" placeholder="输入排序码"></pl-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!type">
            <el-form-item label="状态" class="line-height-36" :rules="[
               { type: 'array', required: true, message: '请至少选择一个状态', trigger: 'change' }
            ]">
              <el-radio-group v-model="form.dicState">
                <el-radio label="E">正常</el-radio>
                <el-radio label="U">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else>
            <el-form-item label="状态" class="line-height-36">
              {{form.dicState | constant('PubConstants.State')}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注"  prop="description" :rules="[
                  { max: 100, message: '字符长度不能超过100', trigger: 'change' }
                ]">
              <el-input type="textarea" v-model="form.description"></el-input>
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
  import {MsgType} from 'core/constants';
  export default {
    data () {
      return {
        form: {
          dicName: '',
          dicCode: '',
          dicSort: '',
          parentId: '',
          extension1: '',
          extension2: '',
          dicState: 'E',
          dicLevel: 0,
          description: '',
          parentName: ''
        },
        loading: false,
        dialogVisible: false,
        type: 0,
        parentNode: null
      };
    },
    methods: {
      /**
       *
       * @param resId 资源id
       * @param type  操作类型：0：编辑，1：修改
       * @param parentNode 父节点
       * @param trmlCode 终端编码
       */
      show (dicId, type, parentNode, trmlCode) {
        let vm = this;
        vm.type = type;
        vm.parentNode = parentNode;
        this.retsetFrom(); // 重置表单
        if (type === 1) { // 如果是编辑查询数据
          this.$api.bsp.dictionary.find(dicId).then((ret) => {
            delete ret.children;
            setTimeout(() => {
              vm.form = ret;
              if (ret.resType) {
                vm.form.resType = ret.resType.split(',');
              }
            }, 250);
            vm.dialogVisible = true;
          });
        } else {
          vm.form.dicId = '';
          if (parentNode) {
            vm.form.parentId = parentNode.dicId;
            vm.form.dicPath = parentNode.dicPath;
            vm.form.dicLevel = parentNode.dicLevel + 1;
            vm.form.parentName = parentNode.dicName;
          } else {
            vm.form.parentId = '';
            vm.form.dicPath = '';
            vm.form.dicLevel = 0;
            vm.form.parentName = '';
          }
          vm.dialogVisible = true;
        }
      },
      retsetFrom () {
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
        }
      },
      ajaxCheck (rule, value, callback) {
        console.info(value);
        if (!value) {
          console.info(value);
          callback();
        } else {
          this.$api.bsp.dictionary.checkCode(this.form.dicId, this.form.dicCode).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('字典编码已经存在'));
            } else {
              callback();
            }
          });
        }
      },
      close () {
        this.dialogVisible = false;
      },
      sure () {
        let vm = this;

        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            let obj = {...this.form};
            if (vm.type === 0) { // 添加字典
              vm.$api.bsp.dictionary.save(obj).then(ret => {
                this.$store.dispatch('refreshContextData');
                vm.loading = false;
                this.$emit('after-update');
                vm.close();
              });
            } else { // 更新字典
              vm.$api.bsp.dictionary.update(obj).then(ret => {
                this.$store.dispatch('refreshContextData');
                vm.loading = false;
                this.$emit('after-update');
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


