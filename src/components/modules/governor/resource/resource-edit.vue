<template>
  <el-dialog title="资源信息" :visible.sync="dialogVisible">
    <pl-content-box-card class="no-border">
      <el-form label-width="100px" :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="资源名" prop="resName" :rules="[
                      { required: true, message: '资源名', trigger: 'change' },
                      { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                    ]">
              <el-input v-model="form.resName" placeholder="输入资源名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资源代码" prop="resCode" :rules="[
                      { required: true, message: '输入资源代码', trigger: 'change' },
                      { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                      { validator: ajaxCheck, trigger: 'change' }
                    ]">
              <el-input v-model="form.resCode" placeholder="输入资源代码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源值" prop="resValue" :rules="[
                      { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                    ]">
              <el-input v-model="form.resValue" clearable placeholder="请输入资源值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序码" prop="resSort" :rules="[
                    { required: true, type: 'number' ,message: '输入排序码', trigger: 'change' }
                  ]">
              <!--<el-input-number v-model="form.resSort" controls-position="right" :min="1" :max="10"></el-input-number>-->
              <pl-input-number :min="0"  :numeric-precision="0" v-model="form.resSort" placeholder="输入排序码"></pl-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属终端" prop="trmlCode" :rules="[
                      { required: true ,message: '输入所属终端', trigger: 'change' }
                    ]">
              <el-input v-model="form.trmlCode" :disabled="true" placeholder="输入所属终端"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父资源值" prop="parentId">
              <el-input v-model="form.parentName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扩展字段1" prop="extension1" :rules="[
                 { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                ]">
              <el-input v-model="form.extension1" placeholder="扩展字段1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扩展字段2" prop="extension2" :rules="[
                 { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                ]">
              <el-input v-model="form.extension2" placeholder="扩展字段2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打开方式" :rules="[
                 { type: 'array', required: true, message: '请至少选择一个状态', trigger: 'change' }
              ]">
              <pl-dictionary-select type="open_mode" v-model="form.openMode" :show-empty="false"></pl-dictionary-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用选择">
            <el-select placeholder="请选择应用" v-model="form.appId" :disabled="flag">
              <el-option v-for="item in items" :label="item.appName" :value="item.appId">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!type">
            <el-form-item label="状态" class="line-height-36" :rules="[
                 { type: 'array', required: true, message: '请至少选择一个状态', trigger: 'change' }
              ]">
              <div class="constant-radio">
                <pl-constant-radio type="PubConstants.State"  v-model="form.resState"></pl-constant-radio>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="状态" class="line-height-36">
              {{form.resState | constant('PubConstants.State')}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资源类型" prop="resType" class="line-height-36" :rules="[
                 { type: 'array', required: true, message: '请至少选择一个资源类型', trigger: 'change' }
              ]">
              <pl-dictionary-checkbox v-model="form.resType" type='res_type'></pl-dictionary-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="note" :rules="[
                 { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                ]">
              <el-input type="textarea" v-model="form.note"></el-input>
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
import { MsgType, State } from '../../../../core/constants';
export default {
  data () {
    return {
      form: {
        resId: '',
        resName: '',
        resValue: '',
        resSort: '',
        resCode: '',
        trmlCode: '',
        parentId: '',
        extension1: '',
        extension2: '',
        resState: State.ENABLE,
        resType: [],
        note: '',
        resLevel: 0,
        resPath: '',
        parentName: '',
        appId: '',
        openMode: ''
      },
      loading: false,
      dialogVisible: false,
      type: 0,
      parentNode: null,
      selected: this.value,
      items: [],
      flag: true
    };
  },
  methods: {
    /**
     *
     * @param resId 资源id
     * @param type  操作类型：0：编辑，1：修改
     * @param parentNode 父节点
     * @param trmlCode 终端编码
     * @param appId 平台
     */
    show (resId, type, parentNode, trmlCode, appId) {
      let vm = this;
      vm.type = type;
      vm.parentNode = parentNode;
      this.retsetFrom(); // 重置表单
      this.$api.bsp.app.getApplication().then((ret) => {
        this.items = ret;
        if (type === 0 && appId) {
          vm.form.appId = appId;
        } else {
          vm.form.appId = this.items[0].appId;
        }
      });
      if (type === 1) { // 如果是编辑查询数据
        this.$api.bsp.resource.find(resId).then((ret) => {
          delete ret.children;
          // vm.form.appId = ret.appId; // 可以不用设置
          setTimeout(() => {
            vm.form = ret;
            if (!vm.form.openMode) {
              vm.form.openMode = 'target_parent';
            }
            if (ret.resType) {
              vm.form.resType = ret.resType.split(',');
            }
          }, 250);
          this.flag = true;
          vm.dialogVisible = true;
        });
      } else {
        vm.form.resId = '';
        vm.form.openMode = 'target_parent';
        this.flag = false;
        if (parentNode) {
          vm.form.parentId = parentNode.resId;
          vm.form.resPath = parentNode.resPath;
          vm.form.resLevel = parentNode.resLevel + 1;
          vm.form.parentName = parentNode.resName;
          vm.form.trmlCode = parentNode.trmlCode;
        } else {
          vm.form.trmlCode = trmlCode;
          vm.form.parentId = '';
          vm.form.resPath = '';
          vm.form.resLevel = 0;
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
        callback();
      } else {
        this.$api.bsp.resource.checkCode(this.form.resId, this.form.resCode).then(ret => {
          if (ret.type === MsgType.SUCCESS && !ret.msg) {
            callback(new Error('资源编码已经存在'));
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
          let obj = { ...this.form };
          obj.resType = obj.resType.join(',');
          if (vm.type === 0) { // 添加资源
            vm.$api.bsp.resource.save(obj).then(ret => {
              vm.loading = false;
              this.$emit('after-update', vm.type);
              vm.close();
            });
          } else { // 更新资源
            vm.$api.bsp.resource.update(obj).then(ret => {
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


