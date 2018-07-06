<template>
  <el-dialog title="赋予角色" :visible.sync="dialogVisible" size="tiny"  class="role-atuh-dialog-wrapper">
    <!--<div class="tree-wrapper">
        <el-checkbox v-for="role in data" :label="role.roleId"  v-model="role.checked">{{role.roleName}}</el-checkbox>
    </div>-->
    <div class="context-wrapper">
      <pl-empty-tip v-show="!(data && data.length >0)" text="没有可选的角色！"></pl-empty-tip>

        <el-tooltip class="item" effect="dark" :content="item.roleName" placement="top"  v-for="item in data">
          <div class="role-item " @click="checkedRole(item)" :class="{'checked':item.checked}">
            <div class="text">{{item.roleName}}</div>
            <div class="icon text-primary" v-show="item.checked"><i class="anticon icon-checkcircle"></i></div>
          </div>
        </el-tooltip>

    </div>
    <!--<div class="text-center">
      <i class="text-primary anticon icon-infocirlceo"></i>&nbsp;
      <small class="text-muted">点击“复选框”选中或者取消选中当前节点，双击节点选中当前节点和子节点</small>
    </div>-->
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {MsgType} from 'core/constants';
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
        checkedCities: []
      };
    },
    methods: {
      close () {
        this.dialogVisible = false;
      },
      checkedRole (item) {
        item.checked = !item.checked;
      },
      show (role) {
        this.roleId = role.roleId;
        this.dialogVisible = true;
        this.$api.bsp.role.getResourceRole(role).then((ret) => {
          this.data = ret;
          console.info(this.data);
        });
      },
      sure () {
        var roleIds = this.data.filter(item => {
          return item.checked;
        }).map(item => {
          return item.roleId;
        }).join(',');
        this.$api.bsp.role.authResourceToRole(this.roleId, roleIds).then(ret => {
          if (ret.type === MsgType.SUCCESS) {
            this.close();
          }
          this.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixin";
  .context-wrapper{
    overflow: auto;
    padding: 10px;
  }
  .role-atuh-dialog-wrapper {
    .el-dialog{
      width: 500px !important;
    }
  }

  .role-item {
    padding: 10px 30px 10px 10px;
    border: 1px solid $border-color;
    margin-bottom: 10px;
    margin-right: 8px;
    float: left;
    cursor: pointer;
    position: relative;
    .text{
      width: 90px;
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


