<template>
  <el-dialog icon="el-icon-edit" title="编辑应用" :visible.sync="dialogFormVisible">
    <pl-content-box-card class="no-border">
      <el-form id="formone" label-width="100px"  :model="form" ref="form" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称:" prop="appName" :rules="[
                { required: true, message: '请输入应用名称', trigger: 'change' },
                { max: 20, message: '字符长度不能超过10', trigger: 'change' }
              ]">
              <el-input v-model="form.appName" placeholder="请输入应用名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用编码:" prop="appCode" :rules="[
                { required: true, message: '请输入应用编码', trigger: 'change' },
                { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                { validator: ajaxCheck, trigger: 'change' }
              ]">
              <el-input v-model="form.appCode" placeholder="请输入应用编码" :disabled="flag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用别名:" prop="appAlias" :rules="[
                { required: true, message: '请输入应用别名', trigger: 'change' },
                { max: 50, message: '字符长度不能超过50', trigger: 'change' }
              ]">
              <el-input v-model="form.appAlias" placeholder="请输入应用别名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用链接:" prop="appUrl" :rules="[{required: true,message: '请输入应用链接', trigger: 'change'},{ max: 100, message: '字符长度不能超过30', trigger: 'change' }]">
              <el-input v-model="form.appUrl" placeholder="请输入应用链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打开方式:" prop="openMode" :rules="[{required: true, message: '请至少选择一个状态', trigger: 'change' }]">
              <pl-dictionary-select type="open_mode" v-model="form.openMode" :show-empty="false"></pl-dictionary-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用类型:" prop="appType" :rules="[
                {max: 1, message: '字符长度不能超过1',trigger: 'change'}
              ]">
              <el-input v-model="form.appType" placeholder="请输入应用类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序码:" prop="appSort" :rules="[
                  { required: true, type: 'number' ,message: '输入排序码', trigger: 'change' }
                ]">
              <pl-input-number :min="0" :numeric-precision="0" v-model="form.appSort"></pl-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isDefaultRole">
            <el-form-item label="应用状态:" class="line-height-36" prop="appState" :rules="[
                { required: true, message: '请选择应用状态', trigger: 'change' }]">
              <pl-constant-radio type="PubConstants.State" v-model="form.appState" ></pl-constant-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="应用描述:" prop="note" :rules="[
                { max: 50, message: '字符长度不能超过50', trigger: 'change' }
              ]">
              <el-input type="textarea"  v-model="form.note"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </pl-content-box-card>

      <div slot="footer" class="dialog-footer text-center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
      </div>
  </el-dialog>
</template>
<script>
  import {MsgType} from '../../../../core/constants';
  export default{
    data () {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        isAllowEdit: true,
        flag: true,
        isDefaultRole: false,
        form: {
          appId: '', // 'id',
          appCode: '', // '应用编码',
          appAlias: '', // 应用别名
          appName: '', // '应用名称',
          appType: '', // '应用类型',
          appSort: '', // '排序码',
          appState: '', // '应用状态',
          appUrl: '', // '是否可用：1-正常 ；0-禁用 ',
          openMode: '',
          note: '' // '描述',
        }
      };
    },
    methods: {
      // 弹出框方法
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => { // 验证
          if (valid) {
            vm.loading = true;
            vm.$api.bsp.app.saveData(this.form).then(ret => {
              setTimeout(() => {
                // this.$store.dispatch('refreshContextData');
                vm.loading = false;
                this.$emit('after-update'); // 子组件的触发事件
              }, 500);
              vm.dialogFormVisible = false;
              this.$store.dispatch('refreshContextData');
              this.$refs['form'].resetFields();
              this.$emit('after-update');
            });
          } else {
            return false;
          }
        });
      },
      editData (isDefaultRole, type, rows, isAllowEdit) { // index代表行数
        let vm = this; // this指代最高级的app
        if (isAllowEdit) { // true 是开发模式
          this.isAllowEdit = false; // 开发模式可以编辑
        }
        this.isDefaultRole = isDefaultRole;
        this.retsetFrom(); // 重置表单
        if (type === 1) { // 1代表新增
          // vm.form.TerminalCode = rows;
          this.flag = false;
          vm.form.appId = '';
          vm.form.appCode = '';
          vm.form.appName = '';
          vm.form.appType = ''; // 将数据传入表单
          vm.form.appSort = '';
          vm.form.appState = '';
          vm.form.openMode = '';
          vm.form.appUrl = '';
          vm.form.note = '';
          vm.form.appAlias = '';
          vm.dialogFormVisible = true;
        } else { // 代表修改
          this.flag = true;
          vm.form.appId = rows.appId;
          vm.form.appCode = rows.appCode;
          vm.form.appName = rows.appName;
          vm.form.appType = rows.appType; // 将数据传入表单
          vm.form.appSort = rows.appSort;
          vm.form.appState = rows.appState;
          vm.form.appUrl = rows.appUrl;
          vm.form.openMode = rows.openMode || 'target_blank'; // 打开方式
          vm.form.note = rows.note;
          vm.form.appAlias = rows.appAlias;
          vm.form.TerminalCode = rows.TerminalCode;
          vm.dialogFormVisible = true;
        }
      },
      retsetFrom () {
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
        }
      },
      ajaxCheck (rule, value, callback) { // 验证唯一性
        if (!this.flag) {
          this.$api.bsp.app.checkCode(value).then(ret => {
            if (ret.type === MsgType.SUCCESS && ret.msg) {
              callback(new Error('应用编码已经存在'));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      }
    }
  };
</script>
