<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>

        <pl-content-box-block>
          <el-table :data="tableData"  border>
            <el-table-column header-align="center" align="center" prop="securityType" label="密码类型" >
            	<template scope="scope">
            		<span >{{ scope.row.securityType | constant('GovernorConstants.SecurityType')}}</span>
            	</template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="ruleStrength" label="密码强度">
            	<template scope="scope">
            		<span >{{ scope.row.ruleStrength | dictionary('rule_strength')}}</span>
            	</template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="isSecurityExpire" label="密码到期强制修改" >
            	<template scope="scope">
            		<span >{{ scope.row.isSecurityExpire | constant('GovernorConstants.IsSecurityExpire')}}</span>
            	</template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="period" label="密码使用周期（天）"></el-table-column>
            <el-table-column label="操作" width="260" header-align="center" align="center">
              <template scope="scope">
                <el-button-group>
                   <!--  <el-button size="mini" icon=" anticon icon-ellipsis" v-tooltip:hover.top="'详情'"
                               @click="handleDetail(scope.$index,scope.row)"></el-button> --><!-- 查看 -->
                    <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'"
                               @click="handleEdit(scope.$index,scope.row)"></el-button><!-- 修改 -->
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </pl-content-box-block>

    <security-rule-edit :organs="organs" ref="securityRuleEditDialog" @update-table="handleUpdateTable"></security-rule-edit>
  </pl-content-box>
</template>

<script>
  /* import { MsgType } from 'core/constants'; */
  import securityRuleEdit from './security-rule-edit.vue';

  export default {
    data () {
      return {
        /* user: {
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
        }, */
        tableData: [],
        loading: false,
        refreshLoading: false,
        organs: [],
        dialogFormVisible: false,
        form: {},
        stateLoading: false
      };
    },
    components: {
      'security-rule-edit': securityRuleEdit
    },
    created () {
      this.$api.bsp.organ.selectByOrganName().then((ret) => {
        this.organs = ret;
      });
      this.reload();
    },
    methods: {
      select () {
        this.$refs.pageTable.reload(this.filterUser);
      },
      reload () {
        this.loading = true;
        this.$api.bsp.security.selectSecurityRules().then((ret) => {
          this.tableData = ret;
          this.loading = false;
        });
      },
      /* updateState (index, obj, state, text) {
        this.$confirm(`确定要${text}该用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: MsgType.WARING
        }).then(() => {
          this.stateLoading = true;
          let vm = this;
          vm.form.userId = obj.userId;
          if (state === 'U') {
            vm.form.userState = 'E';
          }
          if (state === 'E') {
            vm.form.userState = 'U';
          }
          vm.$api.bsp.user.updateState(vm.form.userState, vm.form.userId).then(ret => {
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
        this.$refs.userDetailDialog.show(index, row);
      }, */
      handleEdit (index, row) {
        this.$refs.securityRuleEditDialog.show(index, row);
      },
      handleUpdateTable () {
        this.reload();
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


