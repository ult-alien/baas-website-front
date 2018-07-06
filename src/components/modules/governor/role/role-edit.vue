<template>
  <el-dialog icon="el-icon-edit" title="编辑角色" :visible.sync="dialogFormVisible">
    <pl-content-box-card class="no-border">
      <el-form id="formone" label-width="100px"  :model="form" ref="form" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称:" prop="roleName" :rules="[
                { required: true, message: '请输入角色名称', trigger: 'change' },
                { max: 50, message: '字符长度不能超过50', trigger: 'change' }
              ]">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色代码:" prop="roleCode" :rules="[
                { required: true, message: '请输入角色代码', trigger: 'change' },
                { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                { validator: ajaxCheck, trigger: 'change' }
              ]">
              <el-input v-model="form.roleCode" placeholder="请输入角色代码" :disabled="!isAdd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" class="line-height-36" prop="roleState" :rules="[
                { required: true, message: '请选择状态', trigger: 'change' }]">
              <pl-constant-radio type="PubConstants.State" v-model="form.roleState" ></pl-constant-radio>
            </el-form-item>
          </el-col>
  <!--         <el-col :span="12" v-show="isAdd">
            <el-form-item label="类型:" class="line-height-36" prop="roleState" :rules="[
                { required: true, message: '请选择类型', trigger: 'change' }]">
              <pl-constant-radio type="GovernorConstants.RoleType" v-model="form.roleType" ></pl-constant-radio>
            </el-form-item>
          </el-col> -->
          <el-col :span="12" v-show="isAdd">
            <el-form-item label="应用选择">
              <el-select placeholder="请选择应用" v-model="form.appId">
                <el-option v-for="item in items" :label="item.appName" :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色描述:" prop="note" :rules="[
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
  import constants from '../../../../core/constants';
  export default{
    data () {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          roleId: '',
          creatorId: '',
          createTime: '',
          editorId: '',
          editTime: '',
          roleName: '', // '名称',
          roleState: constants.State.ENABLE, // '是否使用：1-正常 ；0-禁用 ',
          note: '', // '描述',
          roleCode: '',
          TerminalCode: '',
          appId: '',
          roleType: '1' // 默认业务类角色
        },
        items: [],
        isAdd: true
      };
    },
    methods: {
      // 弹出框方法
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => { // 验证
          if (valid) {
            vm.loading = true;
            console.log(this.form);
            vm.$api.bsp.role.saveData(this.form).then(ret => {
              setTimeout(() => {
                vm.loading = false;
                this.$emit('after-update'); // 子组件的触发事件
              }, 500);
              vm.dialogFormVisible = false;
              this.$refs['form'].resetFields();
              this.$emit('after-update');
            });
          } else {
            return false;
          }
        });
      },
      editData (allowApp, index, type, rows) { // index代表行数
        let vm = this; // this指代最高级的app
        this.retsetFrom(); // 重置表单
        vm.dialogFormVisible = true;
        this.items = allowApp;
        if (type === 1) { // 1代表新增
          this.form.appId = this.items[0].appId; // 默认选中第一个
          this.isAdd = true;
        } else { // 代表修改
          setTimeout(() => {
            vm.form.roleId = rows.roleId;
            vm.form.creatorId = rows.creatorId;
            vm.form.createTime = rows.createTime;
            vm.form.editorId = rows.editorId;
            vm.form.editTime = rows.editTime;
            vm.form.roleCode = rows.roleCode; // 将数据传入表单
            vm.form.roleName = rows.roleName;
            vm.form.roleState = rows.roleState;
            vm.form.appId = rows.appId;
            vm.form.note = rows.note;
            vm.form.TerminalCode = rows.TerminalCode;
            vm.form.roleType = rows.roleType;
            this.isAdd = false; // 角色类型不能修改
          }, 100);
        }
      },
      retsetFrom () {
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
        }
      },
      ajaxCheck (rule, value, callback) { // 验证角色代码的唯一性
        if (!value) {
          callback();
        } else {
          this.$api.bsp.role.checkCode(this.form.roleId, this.form.roleCode).then(ret => {
            if (ret.type === constants.MsgType.SUCCESS && !ret.msg) {
              callback(new Error('角色编码已经存在'));
            } else {
              callback();
            }
          });
        }
      }
    }
  };
</script>
