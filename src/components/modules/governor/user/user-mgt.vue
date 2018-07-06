<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <el-input style="width: 250px;" v-model="filterUser.searchVuale" placeholder="请输入用户名/登录名/企业名称">
        </el-input>
        <el-button  icon="el-icon-search"  type="default"  @click="select"></el-button>
      </div>
      <div class="pull-right">
        <!--<el-button type="primary" icon=" anticon icon-plus" @click="handleAdd">新增</el-button>-->
        <el-button icon=" anticon icon-download " @click="handleExport">导出</el-button>
      </div>
    </pl-content-box-toolbar>
    <!--<pl-content-box-toolbar>
      <el-form label-width="0px" >
         <el-row>
          &lt;!&ndash;<el-col :span="8">&ndash;&gt;
                &lt;!&ndash;<el-form-item label="所属部门">&ndash;&gt;
                  &lt;!&ndash;<el-cascader v-model="organIds"&ndash;&gt;
                                 &lt;!&ndash;:options="organs"&ndash;&gt;
                                 &lt;!&ndash;:show-all-levels="false"&ndash;&gt;
                                 &lt;!&ndash;:props="props"&ndash;&gt;
                                 &lt;!&ndash;:change-on-select="true"&ndash;&gt;
                                 &lt;!&ndash;:clearable="true"&ndash;&gt;
                  &lt;!&ndash;&gt;&ndash;&gt;
                  &lt;!&ndash;</el-cascader>&ndash;&gt;
                &lt;!&ndash;</el-form-item>&ndash;&gt;
              &lt;!&ndash;</el-col>&ndash;&gt;
          &lt;!&ndash;<el-col :span="8">&ndash;&gt;
            &lt;!&ndash;<el-form-item label="登录名">&ndash;&gt;
              &lt;!&ndash;<el-input v-model="filterUser.loginName" placeholder="请输入关键字"></el-input>&ndash;&gt;
            &lt;!&ndash;</el-form-item>&ndash;&gt;
          &lt;!&ndash;</el-col>&ndash;&gt;
          &lt;!&ndash;<el-col :span="8">&ndash;&gt;
            &lt;!&ndash;<el-form-item label="用户名称">&ndash;&gt;
              &lt;!&ndash;<el-input v-model="filterUser.userName" placeholder="请输入关键字"></el-input>&ndash;&gt;
            &lt;!&ndash;</el-form-item>&ndash;&gt;
          &lt;!&ndash;</el-col>&ndash;&gt;
          &lt;!&ndash;<el-col :span="8">&ndash;&gt;
            &lt;!&ndash;<el-form-item label="联系电话">&ndash;&gt;
              &lt;!&ndash;<el-input v-model="filterUser.phoneNo" placeholder="请输入关键字"></el-input>&ndash;&gt;
            &lt;!&ndash;</el-form-item>&ndash;&gt;
          &lt;!&ndash;</el-col>&ndash;&gt;
           <el-col :span="8">
             <el-form-item>
               <el-input v-model="filterUser.searchVuale" placeholder="请输入用户名/登录名/企业名称">
                 <el-button  slot="append" icon="el-icon-search" @click="select"></el-button>
               </el-input>
             </el-form-item>
           </el-col>
          <el-col :span="16" class="text-right">
            &lt;!&ndash;<el-button type="primary" icon=" anticon icon-search" @click="select">查询</el-button>&ndash;&gt;
            &lt;!&ndash;<el-button type="info" icon=" anticon icon-plus" @click="handleAdd">新增</el-button>&ndash;&gt;
            <el-button icon=" anticon icon-download " @click="handleExport">导出</el-button>
          </el-col>
         </el-row>
      </el-form>
    </pl-content-box-toolbar>-->
      <el-row>
        <el-col :span="24">
        <pl-content-box-block>
          <pl-page-table :data-fun="getUsersData" ref="pageTable" style="width:100%" default-sort-prop="create_Time" default-sort-order="descending">
            <el-table-column  prop="userName" label="用户名" width="150"></el-table-column>
            <el-table-column  prop="loginName" label="登录名" width="150" sortable="login_name"></el-table-column>
            <el-table-column  prop="userState" label="状态" width="100">
              <template scope="scope">
                <span >{{ scope.row.userState | constant('PubConstants.UserState')}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column header-align="center" align="center" prop="phoneNo" label="联系电话" width="150"></el-table-column>-->
            <!--<el-table-column header-align="center" align="center" prop="certType" label="证件类型" width="150">-->
              <!--<template scope="scope">-->
                <!--<span >{{ scope.row.certType | dictionary('id_type')}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column header-align="center" align="center" prop="certNo" label="证件号码" width="150"></el-table-column>-->
            <el-table-column  prop="entName" label="所属企业" width="200"></el-table-column>
            <el-table-column  prop="userRoleNames" label="所属角色" width="200"></el-table-column>
            <!--<el-table-column header-align="center" align="center" prop="email" label="电子邮箱" width="150"></el-table-column>-->
            <!--<el-table-column header-align="center" align="center" prop="note" label="描述" width="150"></el-table-column>-->
            <el-table-column   label="操作" width="260" fixed="right" header-align="center" align="center">
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
          userName: '',
          phoneNo: '',
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
        getUsersData: this.$api.bsp.user.selectUsersByPage,
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
      this.$api.bsp.organ.getOrganTreeData({organState: 'E', dataType: '1'}).then((ret) => {
        if (ret && ret.length === 1) {
          this.organs = ret[0].children;
        } else {
          this.organs = ret;
        }
      });
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
          this.$confirm('用户名称：' + row.loginName + '，初始登录密码将发送至用户手机号：' + row.phoneNo + '，请确认手机号是否正确？', '提示', {
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
        this.$router.push({name: routeName, params: {userId: row.userId, entId: row.entId, back: 'bsp.biz.user-mgt'}});
//        this.$refs.userDetailDialog.show(index, row);
      },
      handleEdit (index, row) {
        this.$router.push({name: 'bsp.biz.ent-user-edit', params: {userId: row.userId, entId: row.entId, back: 'bsp.biz.user-mgt'}});
        // this.$refs.userEditDialog.show(index, row);
      },
      handleAdd () {
        this.$refs.userAddDialog.show();
      },
      handleUpdateTable () {
        this.reload();
      },
      handleExport () {
        this.$api.bsp.user.selectUsersExport(this.filterUser);
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


