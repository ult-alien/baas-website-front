<template>
  <el-dialog title="角色授权" :visible.sync="dialogVisible" size="tiny"  class="role-atuh-dialog-wrapper">
    <div class="tree-wrapper">
      <el-tree ref='tree'
               :expand-on-click-node="false"
               :default-checked-keys="checkedKeys"
               :show-checkbox="true"
               :render-content="renderContent"
               node-key="resId"
               :data="data"
               :props="defaultProps"
               :highlight-current="true"
               :check-strictly="true"
               @check-change="handleCheck"
               class="no-border">
      </el-tree>
    </div>
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
  import {MsgType} from 'core/constants';
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
  export default {
    data () {
      return {
        loading: false,
        dialogVisible: false,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'resName'
        },
        roleId: '',
        checkedKeys: []
      };
    },
    methods: {
      renderContent,
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
      setAll (event, node, data) {
        node.expanded = true
        this.$refs['tree'].setChecked(data.resId, true, true);
      },
      close () {
        this.dialogVisible = false;
      },
      show ({roleId}) {
        this.roleId = roleId;
        this.dialogVisible = true;
        this.checkedKeys = [];
        this.$api.bsp.resource.getResourceTreeData4Role(roleId).then((ret) => {
          this.checkedKeys = getCheckedIds(ret);
          this.data = ret;
        });

      },
      sure () {
        let nodes = this.$refs['tree'].getCheckedNodes();
        let resIds = [];
        nodes.forEach(node => {
          if (node.resCode) {
            resIds.push(node.resId);
          }
        });
        this.loading = true;
        this.$api.bsp.resource.authResourceToRole(this.roleId, resIds.join(",")).then(ret => {
          if (ret.type === MsgType.SUCCESS) {
            this.close();
          }
          this.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/scss/variables";
  .tree-wrapper{
    border: 1px solid $border-color;
    overflow: auto;
    height: 350px;
  }
  .role-atuh-dialog-wrapper {
    .el-dialog{
      width: 500px !important;
    }
  }
</style>


