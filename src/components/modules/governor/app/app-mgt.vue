<template>
  <pl-content-box>
    <pl-page-nav>
      <div slot="nav-tip"></div>
    </pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
           <el-col :span="8">
            <el-form-item label="应用编码">
              <el-input v-model="params.appCode" placeholder="请输入应用代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应用名称">
              <el-input v-model="params.appName" placeholder="请输入应用名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
             <el-button  icon=" anticon icon-search" @click="reload">查询</el-button>
            <el-button type="primary" icon=" anticon icon-plus" @click="addRes()"  v-if="isDefaultRole">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable">
        <el-table-column  prop="appCode" label="应用编码" width="180"></el-table-column>
        <el-table-column  prop="appName" label="应用名称" width="180"></el-table-column>
        <el-table-column  prop="appAlias" label="应用别名" width="145"></el-table-column>
        <el-table-column  prop="appSort" label="排序码" width="100"></el-table-column>
        <el-table-column  prop="appUrl" label="应用链接" width="180"></el-table-column>
         <el-table-column  prop="appState" label="状态" width="100">
          <template scope="scope">
          {{scope.row.appState | constant('PubConstants.State')}}
        </template>
        </el-table-column>
        <el-table-column  prop="note" label="描述" width="250"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="150" fixed="right">
          <template scope="scope">
            <el-button-group>
               <el-button size="mini" v-if="scope.row.appState === 'U'" icon=" anticon icon-checkcircleo" @click="updataStatus('E','启用',scope.row)" v-tooltip="'启用'"></el-button>
              <el-button size="mini" v-if="scope.row.appState === 'E'" icon=" anticon icon-minuscircleo" @click="updataStatus('U','禁用',scope.row)" v-tooltip="'禁用'"></el-button>
              <el-button size="mini" icon=" el-icon-edit" @click="editRes(scope.$index,1,scope.row)" v-tooltip="'修改'"></el-button>
               <!--<el-button size="mini" icon=" anticon icon-solution" @click="handleAuth(scope.row)" v-tooltip="'授权'"></el-button> -->
              <el-button v-show="isAllowEdit" size="mini" icon=" anticon icon-delete" @click="handleDelete(scope.$index,scope.row)" v-tooltip="'删除'" v-if="isDefaultRole"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <app-edit ref="appEdit" @after-update="handleAfterUpdate"></app-edit>
    <app-auth ref="appAuth"></app-auth>
  </pl-content-box>
</template>

<script>
  import AppEdit from './app-edit.vue';
  import AppAuth from './app-auth.vue';
  import { MsgType } from 'core/constants';
  import constantUtil from '../../../../core/utils/constant-util';
  export default {
    data () {
      return {
        filterapp: {
          appCode: '',
          appName: ''
        },
        params: {
          appCode: '', // 应用代码
          appName: '' // 名称
          // appState: '' // 是否使用 1 正常， 0 禁用
        },
        appId: '',
        form: {},
        stateLoading: false,
        getType: this.$store.state.contextData.constantsValueMap.TerminalCode, // 得到一个object
        getPageData: this.$api.bsp.app.getPageData, // 调用app模块的getPageData接口
        dialogTableVisible: true,
        dialogFormVisible: true,
        formLabelWidth: '120px',
        isDefaultRole: false,
        isAllowEdit: false
      };
    },
    components: {
      AppEdit,
      AppAuth
    },
    created () {
      if (this.$store.state.contextData.systemMode === 'development') {
        this.isAllowEdit = true;
      }
      let curUser = this.$store.state.contextData.user;
      if (curUser) {
        let roles = curUser.roles;
        let defaultRoleObj = constantUtil.getConstantByKey('Constants.DefaultRole');
        this.defaultRole = defaultRoleObj['ADMIN_CODE'];
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].roleCode === this.defaultRole) {
            this.isDefaultRole = true;
          }
        }
      }
    },
    methods: {
      // select () {
      //   this.$refs.pageTable.reload(this.filterapp);
      // },
      reload () {
        this.$refs.pageTable.reload(this.params);
      },
      handleAuth (app) {
        this.$refs['appAuth'].show(app);
      },
      editRes (index, type, rows) { // 修改
        this.$refs['appEdit'].editData(this.isDefaultRole, 0, rows, this.isAllowEdit);
        this.$store.dispatch('refreshContextData');
      },
      addRes (TerminalCode) { // 增加
        this.$refs['appEdit'].editData(this.isDefaultRole, 1);
        this.$store.dispatch('refreshContextData');
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
          this.$api.bsp.app.delData(vm.form).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.$store.dispatch('refreshContextData');
              this.reload();
            }
          });
        }).catch(() => {});
      },
      updataStatus (state, text, rows) { // 禁用
        this.$confirm(`确定要${text}应用吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          this.stateLoading = true;
          let vm = this;
          vm.form.appId = rows.appId;
          // vm.form.appCode = rows.appCode;
          // vm.form.appName = rows.appName;
          vm.form.appState = rows.appState;
          // vm.form.note = rows.note;
          if (state === 'U') {
            vm.form.appState = 'E';
          }
          if (state === 'E') {
            vm.form.appState = 'U';
          }
          this.$api.bsp.app.updateState(rows.appId, state).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.$store.dispatch('refreshContextData');
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


