<template>
  <pl-content-box>
    <pl-page-nav>
      <div slot="nav-tip"></div>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="应用" label-width="60px">
              <el-select v-model="params.appId">
                <el-option v-for="item in allowApp"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item >
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色代码">
              <el-input v-model="params.roleCode" placeholder="请输入角色代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名称">
              <el-input v-model="params.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button type="default" icon=" anticon icon-search" @click="reload">查询</el-button>
            <el-button type="primary" icon=" anticon icon-plus" @click="addRes()">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable">
        <el-table-column  prop="roleCode" label="角色代码" width="180"></el-table-column>
        <el-table-column  prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column  prop="roleType" label="类型" width="100">
          <template scope="scope">
          {{scope.row.roleType | constant('GovernorConstants.RoleType')}}
          </template>
        </el-table-column>
        <el-table-column  prop="roleState" label="状态" width="100">
          <template scope="scope">
          {{scope.row.roleState | constant('PubConstants.State')}}
        </template>
        </el-table-column>
        <el-table-column  prop="appName" label="应用名称" width="230"></el-table-column>
        <el-table-column  prop="note" label="描述" :width="descWidth"></el-table-column>
        <el-table-column  label="操作" width="230" align="center" header-align="center" fixed="right">
          <template scope="scope">
            <el-button-group>
              <el-button size="mini" v-if="scope.row.roleState === 'U'" icon=" anticon icon-checkcircleo" @click="updataStatus('E','启用',scope.row)" v-tooltip="'启用'"></el-button>
              <el-button size="mini" v-if="scope.row.roleState === 'E'" icon=" anticon icon-minuscircleo" @click="updataStatus('U','禁用',scope.row)" v-tooltip="'禁用'"></el-button>
              <el-button size="mini" icon=" el-icon-edit" @click="editRes(scope.$index,1,scope.row)" v-tooltip="'修改'"></el-button>
              <el-button size="mini" icon=" anticon icon-solution" @click="handleAuth(scope.row)"  v-tooltip="'授权'"></el-button>
              <el-button size="mini" icon=" anticon icon-shrink" @click="auth(scope.row)" v-tooltip="'赋予角色'" v-if="isDefaultRole"></el-button>
              <el-button size="mini" icon=" anticon icon-retweet" @click="roleAuth(scope.row)" v-tooltip="'角色授权限制'" v-if="isDefaultRole"></el-button>
              <el-button size="mini" icon=" anticon icon-delete" @click="handleDelete(scope.$index,scope.row)" v-tooltip="'删除'" :disabled="scope.row.auzType == '1'"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <role-edit ref="roleEdit" @after-update="handleAfterUpdate"></role-edit>
    <role-auth ref="roleAuth"></role-auth>
    <role-role ref="roleRole"></role-role>
    <role-role-auth ref="roleRoleAuth"></role-role-auth>
  </pl-content-box>
</template>

<script>
  import RoleEdit from './role-edit.vue';
  import RoleRole from './role-role.vue';
  import RoleAuth from './role-auth.vue';
  import RoleRoleAuth from './role-role-auth.vue';
  import { MsgType } from 'core/constants';
  import AppOption from '../uiComponents/application.vue';
  import constantUtil from '../../../../core/utils/constant-util.js';
  export default {
    data () {
      return {
        params: {
          roleCode: '', // 角色代码
          roleName: '', // 名称
          roleState: '', // 是否使用 1 正常， 0 禁用
          appId: ''
        },
        roleId: '',
        form: {},
        stateLoading: false,
        // getType: this.$store.state.contextData.constantsValueMap.TerminalCode, // 得到一个object
        getPageData: this.$api.bsp.role.getPageData, // 调用role模块的getPageData接口
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        isDefaultRole: false,
        allowApp: [],
        defaultRole: '',
        descWidth: '230'
      };
    },
    components: {
      RoleEdit,
      RoleAuth,
      RoleRole,
      RoleRoleAuth,
      AppOption
    },
    created () {
      if (document.body.clientWidth >= 1620) {
        this.descWidth = '265';
      }
      let curUser = this.$store.state.contextData.user;
      if (curUser) {
        let roles = curUser.roles;
        let defaultRoleObj = constantUtil.getConstantByKey('GovernorConstants.DefaultRole');
        this.defaultRole = defaultRoleObj['ADMIN_CODE'];
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].roleCode === this.defaultRole) {
            this.isDefaultRole = true;
          }
        }
      };
      // if (this.isDefaultRole) { // 默认管理员
      //   this.$api.bsp.app.getApplication().then((ret) => {
      //     this.allowApp = ret;
      //   });
      // } else {
      //   this.$api.bsp.role.getApp4Admin().then(ret => {
      //     this.allowApp = ret;
      //   });
      // }
      if (this.isDefaultRole) { // 默认管理员
        this.$api.bsp.app.getApplication().then(ret => {
          this.allowApp = ret.filter(item => {
            return item.appState === 'E';
          });
        });
      } else {
        this.$api.bsp.role.getApp4Admin().then(ret => {
          this.allowApp = ret.filter(item => {
            return item.appState === 'E';
          });
        });
      }
    },
    methods: {
      reload () {
        this.$refs.pageTable.reload(this.params);
      },
      handleAuth (role) {
        this.$refs['roleAuth'].show(role);
      },
      roleAuth (role) {
        this.$refs['roleRoleAuth'].show(role);
      },
      auth (role) {
        this.$refs['roleRole'].show(role);
      },
      editRes (index, type, rows) { // 修改
        this.$refs['roleEdit'].editData(this.allowApp, index, 0, rows);
      },
      addRes (TerminalCode) { // 增加
        this.$refs['roleEdit'].editData(this.allowApp, '', 1);
        // this.reload();  // 弹出之后无需刷新列表,故注释掉
      },
      handleDelete (index, row) { // 删除
        let vm = this;
        this.$confirm('删除之后数据无法还原，确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          vm.form = row;
          console.log(vm.form);
          this.$api.bsp.role.delData(vm.form).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.reload();
            }
          });
        }).catch(() => {});
      },
      updataStatus (state, text, rows) { // 禁用
        this.$confirm(`确定要${text}角色吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          this.stateLoading = true;
          let vm = this;
          vm.form.roleId = rows.roleId;
          vm.form.creatorId = rows.creatorId;
          vm.form.createTime = rows.createTime;
          vm.form.editorId = rows.editorId;
          vm.form.editTime = rows.editTime;
          vm.form.roleCode = rows.roleCode;
          vm.form.roleName = rows.roleName;
          vm.form.roleState = rows.roleState;
          vm.form.note = rows.note;
          if (state === 'U') {
            vm.form.roleState = 'E';
          }
          if (state === 'E') {
            vm.form.roleState = 'U';
          }
          this.$api.bsp.role.updateState(rows.roleId, state).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.stateLoading = false;
            }
            this.reload();
          });
        }).catch(() => {});
      },
      handleAfterUpdate () { // 刷新列表
        this.reload();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


