<template>
  <el-dialog title="用户授权" :visible.sync="dialogVisible">
    <pl-layout>
      <div slot="left" style="height:441px;width: 250px;overflow: auto;">
        <pl-content-box-title :min="true">角色</pl-content-box-title>
        <div class="context-wrapper" v-loading="roleLoading">
          <pl-empty-tip v-show="!roleLoading && !(roles && roles.length >0)" text="没有可选的角色！"></pl-empty-tip>
          <div class="role-item " @click="checkedRole(item)" :class="{'checked':item.checked}" v-for="item in roles">
            <div class="text">{{item.roleName}}</div>
            <div class="icon text-primary" v-show="item.checked"><i class="anticon icon-checkcircle"></i></div>
          </div>
        </div>
      </div>
      <div slot="right">
        <pl-content-box-title :min="true">资源</pl-content-box-title>
        <div class="context-wrapper" v-loading="treeLoading">
          <pl-empty-tip v-show="!treeLoading && !hasCheckedRoles" text="请先选择角色！"></pl-empty-tip>
          <pl-empty-tip v-show="!treeLoading && hasCheckedRoles && !( treeData && treeData.length)" text="没有可选的资源！"></pl-empty-tip>
          <el-tree ref='tree' v-show="hasCheckedRoles && treeData && treeData.length"
                   :expand-on-click-node="false"
                   :default-checked-keys="checkedKeys"
                   :show-checkbox="true"
                   :render-content="renderContent"
                   node-key="resId"
                   :data="treeData"
                   :props="defaultProps"
                   :highlight-current="true"
                   :check-strictly="true"
                   @check-change="handleCheck"
                   class="no-border">
          </el-tree>
        </div>
      </div>
    </pl-layout>
    <div class="text-center">
      <i class="text-primary anticon icon-infocirlceo"></i>&nbsp;
      <small class="text-muted">点击“复选框”选中或者取消选中当前节点，双击节点选中当前节点和子节点</small>
    </div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from '../../../../core/constants';
  /* eslint-disable*/
  const renderContent = (h, {node, data, _self}) => {
    let _this = _self;
    let icon =
    <span>
    {node.isLeaf ?
    <i class="anticon icon-folder"></i>
    :
    node.expanded ? <i class="anticon icon-folderopen"></i> : <i class="anticon icon-folder"></i>
  }
    &nbsp;
    </span>;
    let note =  data.note ? <small class='text-info'>({data.note})</small> : '';
    let nodeContent =
    <span class='el-tree-node__labe' onDblclick={ (event) => _this.setAll(event, node, data) }>
    {data.resCode === null ?
    <span  class='text-info'>{icon}{ node.label}(终端)</span>
    :
    <span><span class='text-primary'>{icon}</span>{ node.label}{note}</span>
  }
    </span>;

    return nodeContent;
  };
  const getCheckedIds = (nodes) => {
    let checkedNodesIds = [];
    nodes.forEach(item => {
      if (item.checked) {
        checkedNodesIds.push(item.resId);
      }
      if (item.children && item.children.length > 0) {
        checkedNodesIds = [...checkedNodesIds,...getCheckedIds(item.children)];
      }
    });
    return checkedNodesIds;
  };

  const getUnCheckedIds = (nodes, checkedIds) => {
    let unCheckedNodesIds = [];
    nodes.forEach(item => {
      if (checkedIds.indexOf(item.resId) === -1 && item.resCode) {
        unCheckedNodesIds.push(item.resId);
      }
      if (item.children && item.children.length > 0) {
        unCheckedNodesIds = [...unCheckedNodesIds,...getUnCheckedIds(item.children,checkedIds)];
      }
    });
    return unCheckedNodesIds;
  };

  export default {
    data () {
      return {
        loading: false,
        dialogVisible: false,
        roles: [],
        defaultProps: {
          children: 'children',
          label: 'resName'
        },
        treeData: [],
        checkedKeys: [],
        roleLoading: false,
        treeLoading: false,
        user: null,
        checkedRoleIds: '',
        checkedroleAppIds: '',
        adminRoleCount: {}
      };
    },
    computed: {
      hasCheckedRoles () {
        return this.roles.some((item) => {
          return item.checked;
        });
      }
    },
    methods: {
      renderContent,
      setAll (event, node, data) {
        node.expanded = true
        this.$refs['tree'].setChecked(data.resId, true, true);
      },
      handleCheck (node, isChecked, hasCheckedNode) {
        if (isChecked && node.parentId) {
          this.$refs['tree'].setChecked(node.parentId, true);
        } else if (!isChecked) {
          if (node.children && node.children.length > 0) {
            node.children.forEach((item) => {
              this.$refs['tree'].setChecked(item.resId, false, true);
            })
          }
        }
      },
      checkedRole (item) {
        if (!item.checked && item.roleType === '0') { // 管理类角色被选中
          if (this.adminRoleCount[item.appId] === true) {
            this.$alert('一个用户在一个应用只允许选中一个管理类角色');
            return ;
          } else {
            this.adminRoleCount[item.appId] = true;
          }
        } else {
          if (item.roleType === '0') { // 取消选中为管理类
            this.adminRoleCount[item.appId] = false;
          }
        }
        item.checked = !item.checked;
        this.getTreeData ();
      },
      show (user) {
        this.roles = [];
        this.treeData = [];
        this.initData(user);
        this.dialogVisible = true;
      },
      initData (user) {
        this.roleLoading = true;
        this.user = user;
        this.adminRoleCount = {}; // 清空组件数据,防止进入数据重复
        this.$api.bsp.role.selectRole4AuthUser(user.entId, user.userId).then((ret) => {
          this.roles = ret;
          this.roleLoading = false;
          this.getTreeData ();
        });
      },
      getTreeData () {
        if (this.roles && this.roles.length > 0) {
          let checkedRoleIds = [];
          let checkedroleAppIds = [];
          for (var i = 0; i < this.roles.length; i++) {
            let item = this.roles[i];
            if (item.checked) {
              checkedRoleIds.push(item.roleId) ;
              checkedroleAppIds.push(item.appId);
              if (item.roleType ==='0') { // 进入初始所选中的管理类角色
                this.adminRoleCount[item.appId] = true;
              }
            }
          }
          this.checkedRoleIds = checkedRoleIds.join(',');
          this.checkedroleAppIds = checkedroleAppIds.join(',');

          if (this.checkedRoleIds) {
            this.treeLoading = true;
            this.$api.bsp.resource.getResourceTreeData4User(this.checkedRoleIds, this.user.userId, this.checkedroleAppIds).then((ret) => {
              this.checkedKeys = getCheckedIds(ret);
              this.treeData = ret;
              this.treeLoading = false;
            });
          }

        }
      },
      close () {
        this.dialogVisible = false;
      },
      sure () {
        let checkedIds = this.$refs['tree'].getCheckedKeys();
        let resIds = getUnCheckedIds(this.treeData, checkedIds).join(',');
        this.loading = true;
        this.$api.bsp.resource.authResourceToUser(this.user.userId, this.user.entId, this.checkedRoleIds, resIds).then((ret => {
          this.loading = false;
          if (ret.type === MsgType.SUCCESS) {
            this.$emit('update-table');
            this.close();
          }

        }));
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixin";
  .context-wrapper{
    height: 400px;
    overflow: auto;
    padding: 10px;
  }

  .role-item {
    padding: 10px 30px 10px 10px;
    border: 1px solid $border-color;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    .text{
      width: 188px;
      @include text-ellipsis;
    }
    .icon{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 30px;
      text-align: center;
      padding: 10px 0px;
    }
    &:hover,
    &.checked{
      background: $dark-white;
      border-color: $primary-color;
    }
  }
</style>


