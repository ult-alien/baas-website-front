<template>
  <el-dialog title="机构信息" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px"  :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="organName" :rules="[
                    { required: true, message: '请输入机构名称', trigger: 'change' },
                    { max: 100, message: '字符长度不能超过100', trigger: 'change' }
                  ]">
              <el-input v-model="form.organName" placeholder="输入机构名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构代码"  prop="organCode" :rules="[
                    { required: true, message: '请输入机构代码', trigger: 'change' },
                    { max: 30, message: '字符长度不能超过30', trigger: 'change' },
                    { validator: ajaxCheck, trigger: 'change' }
                  ]">
              <el-input v-model="form.organCode" placeholder="输入机构代码" :disabled="isAllowEditKey"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="机构简称" prop="shortName" :rules="[
                    { required: true, message: '请输入机构简称', trigger: 'change' },
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                  ]">
              <el-input v-model="form.shortName" clearable placeholder="请输入机构简称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构名" prop="parentId">
              <el-input v-model="form.parentName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!type">
            <el-form-item label="机构状态" class="line-height-36" :rules="[
               { required: true, message: '请至少选择一个状态', trigger: 'change' }
            ]">
              <pl-constant-radio v-model="form.organState" type="PubConstants.State"></pl-constant-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="状态" class="line-height-36">
              {{form.organState | constant('PubConstants.State')}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型" prop="organType" class="line-height-36" :rules="[
               { required: true, message: '请选择一个机构类型', trigger: 'change' }
            ]">
              <el-select v-model="form.organType" placeholder="请选择" :disabled="isAllowEditKey">
                <el-option
                  v-for="item in typeList"
                  :label="item.typeName"
                  :value="item.organType">
                </el-option>
              </el-select>
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
  import {MsgType} from '../../../../core/constants';
  export default {
    data () {
      return {
        form: {
          organName: '',
          organCode: '',
          shortName: '',
          struLevel: '',
          organState: 'E',
          organType: '',
          organLevel: 0,
          organPath: '',
          parentId: '',
          parentName: ''
        },
        options: [],
        typeList: [],
        loading: false,
        dialogVisible: false,
        type: 0,
        parentNode: null,
        isAllowEditKey: false
      };
    },
    methods: {
      /**
       * @param organId 组织id
       * @param type  操作类型：0：编辑，1：修改
       * @param parentNode 父节点
       */
      show (organId, type, parentNode) {
        let vm = this;
        vm.type = type;
        vm.parentNode = parentNode;
        this.retsetFrom(); // 重置表单
        if (type === 1) { // 如果是编辑查询数据
          this.$api.bsp.organ.selectAllType(parentNode.subType).then((ret) => {
            this.typeList = ret;
          });
          this.isAllowEditKey = true; // ret.struLevel < 2
          this.$api.bsp.organ.find(organId).then((ret) => {
            delete ret.children;
            setTimeout(() => {
              vm.form = ret;
              if (ret.organType) {
                vm.form.organType = ret.organType;
              }
            }, 250);
            vm.dialogVisible = true;
          });
        } else {
          this.$api.bsp.organ.selectAllType(parentNode.subType).then((ret) => { // 固定只查询实体机构类型节点
            this.typeList = ret;
          });
          this.isAllowEditKey = false;
          vm.form.organId = '';
          vm.form.organType = 'DEPART';
          if (parentNode) {
            vm.form.parentId = parentNode.organId;
            vm.form.struLevel = parentNode.struLevel + 1;
            vm.form.parentName = parentNode.organName;
          } else {
            vm.form.parentId = '';
            vm.form.struLevel = 0;
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
        if (!value) {
          callback();
        } else {
          this.$api.bsp.organ.checkCode(this.form.organId, this.form.organCode).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('机构代码已经存在'));
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
            if (vm.type === 0) { // 添加机构
              vm.$api.bsp.organ.save(obj).then(ret => {
                vm.loading = false;
                this.$emit('after-update', vm.type);
                vm.close();
              });
            } else { // 更新机构
              vm.$api.bsp.organ.update(obj).then(ret => {
                vm.loading = false;
                this.$emit('after-update', vm.type);
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
