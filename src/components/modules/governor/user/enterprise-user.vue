<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <el-input style="width: 200px;" v-model="filterUser.searchVuale" placeholder="请输入用户名/登录名">
        </el-input>
        <el-button  icon="el-icon-search" type="default"  @click="select"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" icon=" anticon icon-plus" @click="handleAdd">新增</el-button>
        <el-button icon=" anticon icon-download " @click="handleExport">导出</el-button>
      </div>
    </pl-content-box-toolbar>
    <!--<pl-content-box-toolbar>-->

      <!--<el-form label-width="0px" >-->
         <!--<el-row>-->
          <!--&lt;!&ndash;<el-col :span="8">-->
                <!--<el-form-item label="所属部门">-->
                  <!--<el-cascader v-model="organIds"-->
                                 <!--:options="organs"-->
                                 <!--:show-all-levels="false"-->
                                 <!--:props="props"-->
                                 <!--:change-on-select="true"-->
                                 <!--:clearable="true"-->

                  <!--&gt;-->
                  <!--</el-cascader>-->
                <!--</el-form-item>-->
              <!--</el-col>&ndash;&gt;-->
          <!--<el-col :span="8">-->
            <!--<el-form-item>-->
              <!--<el-input v-model="filterUser.searchVuale" placeholder="请输入用户名/登录名">-->
                <!--<el-button  slot="append" icon="el-icon-search" @click="select"></el-button>-->
              <!--</el-input>-->
            <!--</el-form-item>-->

          <!--</el-col>-->
           <!--<el-col :span="8">-->
            <!--&nbsp;-->
           <!--</el-col>-->
          <!--<el-col :span="8" class="text-right">-->
            <!--&lt;!&ndash;<el-button type="primary" icon=" anticon icon-search" @click="select">查询</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" icon=" anticon icon-plus" @click="handleAdd">新增</el-button>-->
            <!--<el-button icon=" anticon icon-download " @click="handleExport">导出</el-button>-->
          <!--</el-col>-->
         <!--</el-row>-->
      <!--</el-form>-->
    <!--</pl-content-box-toolbar>-->
      <el-row>
        <el-col :span="24">
        <pl-content-box-block>
          <pl-page-table :data-fun="getUsersData" ref="pageTable" style="width:100%" default-sort-prop="create_time" default-sort-order="descending">
            <el-table-column  prop="userName" label="用户名" width="150"></el-table-column>
            <el-table-column  prop="loginName" label="登录名" width="150" sortable="login_name"></el-table-column>
            <el-table-column  prop="userState" label="状态" width="100">
              <template scope="scope">
                <span >{{ scope.row.userState | constant('PubConstants.UserState')}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="userRoleNames" label="所属角色" ></el-table-column>
            <el-table-column   label="操作" width="240" fixed="right" align="center" header-align="center">
              <template scope="scope">
                <el-button-group>
                    <el-button size="mini" icon=" anticon icon-ellipsis" v-tooltip:hover.top="'详情'"
                               @click="handleDetail(scope.$index,scope.row)"></el-button><!-- 查看 -->
                   <el-button size="mini" :loading="stateLoading" v-if="scope.row.userState === 'U'" v-tooltip:hover.top="'启用'"
                    icon=" anticon icon-checkcircleo" @click="updateState(scope.$index,scope.row,'U','启用')">
                    </el-button>
                    <el-button size="mini" :loading="stateLoading" :disabled="scope.row.userState !== 'E'" v-if="scope.row.userState !== 'U'" v-tooltip:hover.top="'禁用'"
                    icon=" anticon icon-minuscircleo" @click="updateState(scope.$index,scope.row,'E','禁用')">
                    </el-button>
                    <el-button size="mini" icon=" anticon icon-solution"  :disabled="scope.row.userState !== 'E'" v-tooltip:hover.top="'授权'"
                               @click="handleAuth(scope.$index,scope.row)" ></el-button> <!-- 授权 -->
                    <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'" :disabled="scope.row.userState !== 'E'"
                               @click="handleEdit(scope.$index,scope.row)"></el-button><!-- 修改 -->
                    <el-button size="mini" icon=" anticon icon-delete" v-tooltip:hover.top="'删除'" :disabled="scope.row.userState !== 'E'"
                               @click="handleDelete(scope.$index,scope.row)"></el-button><!-- 删除 -->
                    <el-button size="mini" icon=" anticon icon-retweet" v-tooltip:hover.top="'重置密码'" :disabled="scope.row.userState !== 'E'"
                               @click="handleReset(scope.$index, scope.row)"></el-button>  <!-- 重置密码 -->
                </el-button-group>
              </template>
            </el-table-column>
          </pl-page-table>
        </pl-content-box-block>
        </el-col>
      </el-row>

    <user-detail ref="userDetailDialog"></user-detail>
    <user-edit :organs="organs" ref="userEditDialog" @update-table="handleUpdateTable"></user-edit>
    <user-add :organs="organs" ref="userAddDialog"   @update-table="handleUpdateTable"></user-add>
    <user-auth ref="userAuthDialog" @update-table="handleUpdateTable"></user-auth>
  </pl-content-box>
</template>

<script>
  import { MsgType } from 'core/constants';
  import userDetail from './user-detail.vue';
  import userEdit from './user-edit.vue';
  import userAdd from './user-add.vue';
  import userAuth from './user-auth.vue';
  export default {
    data () {
      return {
        filterUser: {
          organId: '',
          loginName: '',
          searchVuale: ''
        },
        props: {
          value: 'organId',
          children: 'children',
          label: 'organName'
        },
        organIds: [],
        user: {
          userId: '',
          loginName: '',
          userName: '',
          certType: '',
          certNo: '',
          phoneNo: '',
          email: '',
          userState: 'E',
          note: '',
          organId: ''
        },
        getUsersData: this.$api.bsp.user.selectEntUsersByPage,
        organs: [],
        dialogFormVisible: false,
        form: {},
        stateLoading: false
      };
    },
    components: {
      'user-detail': userDetail,
      'user-edit': userEdit,
      'user-add': userAdd,
      'user-auth': userAuth
    },
    created () {
      this.$api.bsp.organ.getOrganTreeData({organState: 'E'}).then((ret) => {
        this.organs = ret;
      });
      // let vm = this;
      // this.$api.bsp.organ.selectByOrganName().then((ret) => {
    },
    methods: {
      select () {
        this.filterUser.organId = '';
        if (this.organIds.length > 0) {
          this.filterUser.organId = this.organIds[this.organIds.length - 1];
        }
        this.$refs.pageTable.reload(this.filterUser);
      },
      reload () {
        this.$refs.pageTable.reload();
      },
      updateState (index, obj, state, text) {
        this.$confirm(`确定要${text}该用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: MsgType.WARING
        }).then(() => {
          this.stateLoading = true;
          let vm = this;
          vm.form.userId = obj.userId;
          vm.form.entId = obj.entId;
          if (state === 'U') {
            vm.form.userState = 'E';
          }
          if (state === 'E') {
            vm.form.userState = 'U';
          }
          vm.$api.bsp.user.updateState(vm.form.userState, vm.form.userId, vm.form.entId).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.reload();
            }
          });
          this.stateLoading = false;
        }).catch(() => {});
      },
      handleAuth (index, row) {
        this.$refs['userAuthDialog'].show(row);
      },
      handleDelete (index, row) {
        let vm = this;
        this.$confirm('删除之后数据无法还原，确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: MsgType.WARING
        }).then(() => {
          vm.form = row;
          this.$api.bsp.user.deleteUser(vm.form).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.reload();
            }
          });
        }).catch(() => {});
      },
      handleReset (index, row) {
        this.$confirm('您确定要重置该用户密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: MsgType.WARING
        }).then(() => {
          this.$confirm('用户名称：' + row.loginName + '初始登录密码将发送至用户手机号：' + row.phoneNo + '请确认手机号是否正确？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '关闭',
            type: MsgType.WARING
          }).then(() => {
            this.form = row;
            this.$api.bsp.user.resetUserPassword(this.form.userId).then(ret => {});
            this.$notify({
              type: MsgType.SUCCESS,
              message: '重置登录密码成功'
            });
          }).catch(() => {});
        }).catch(() => {});
      },
      handleDetail (index, row) {
        let routeName = 'bsp.biz.ent-user-detial-view';
        if (row.userState === '2') {
          routeName = 'bsp.biz.ent-user-resubmit';
        }

        this.$router.push({name: routeName, params: {userId: row.userId, entId: row.entId}});
        // this.$refs.userDetailDialog.show(index, row);
      },
      handleEdit (index, row) {
        this.$router.push({name: 'bsp.biz.ent-user-edit', params: {userId: row.userId, entId: row.entId}});
//        this.$refs.userEditDialog.show(index, row);
      },
      handleAdd () {
        this.$router.push({name: 'bsp.biz.ent-user-add'});
//        this.$refs.userAddDialog.show();
      },
      handleUpdateTable () {
        this.reload();
      },
      handleExport () {
        this.$api.bsp.user.selectEntUsersExport(this.filterUser);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.header{
	padding-left:20px;
	padding-top:20px;

}
.container{
	padding-top:20px;
}
</style>


