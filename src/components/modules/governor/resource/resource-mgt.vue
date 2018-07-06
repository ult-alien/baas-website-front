<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" >
        <app-option ref="appOption" v-model="appId" @change="reset" ></app-option>
        <pl-constant-select type="PubConstants.TerminalCode" @change="reset" v-model="trmlCode" style="width: 120px;"></pl-constant-select>
        <el-input placeholder="请输入资源名称" v-model="queryVluae" style="width: 150px;"></el-input>
        <el-button  icon="el-icon-search" @click="handleFilter"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" icon=" anticon icon-plus" @click="addRes()">新增</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-empty-tip v-show="!treeShow" text="暂时没有资源,请新增资源！"></pl-empty-tip>
      <pl-layout v-show="treeShow">
        <div slot="left" style="height:561px;width: 250px;overflow: auto;" v-loading="treeLoading">
          <el-tree ref='tree' :render-content="renderContent" :filter-node-method="filterTree" node-key="resId" :data="data" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" class="no-border"></el-tree>
        </div>
        <div slot="right">
          <res-info :res-id="resId" ref="resInfo">
            <template slot="toolbar">
              <el-button type="primary" icon=" anticon icon-plus" :disabled="resState === 'U'" @click="addSubRes()">新增子菜单</el-button>
              <el-button icon=" el-icon-edit"  @click="editRes">编辑</el-button>
              <el-button :loading="stateLoading" v-if="resState === 'U'" icon=" anticon icon-checkcircleo" @click="updateState('E','启用')">启用</el-button>
              <el-button :loading="stateLoading" v-if="resState === 'E'" icon=" anticon icon-minuscircleo" @click="updateState('U','禁用')">禁用</el-button>
              <el-button :loading="delLoading" icon=" anticon icon-delete" @click="updateState('D','删除')">删除</el-button>
              <el-button icon=" el-icon-edit" @click="genSql">生成sql</el-button>
            </template>
          </res-info>
        </div>
      </pl-layout>
    </pl-content-box-block>
    <res-edit ref="resEdit" @after-update="handleAfterUpdate"></res-edit>
  </pl-content-box>
</template>

<script>
  import ResInfo from './resource-info.vue';
  import ResEdit from './resource-edit.vue';
  import AppOption from '../uiComponents/application.vue';
  import {MsgType, State} from 'core/constants';
  /* eslint-disable*/
  const renderContent = (h, {node, data}) => {
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
        <span class='el-tree-node__labe'>
          {data.resState === 'U' ?
            <span  class='text-muted'>{icon}{ node.label}(禁用)</span>
             :
            <span><span class='text-primary'>{icon}</span>{ node.label}{note}</span>
          }
         </span>;
    return nodeContent;
  };
  export default {
    data () {
      return {
        queryVluae: '',
        trmlCode: 'pc',
        appId: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'resName'
        },
        resId: '',
        curResNode: {},
        delLoading: false,
        stateLoading: false,
        treeLoading: false,
        resState: ''
      };
    },
    computed: {
      treeShow () {
        return this.data && this.data.length > 0;
      }
    },
    methods: {
      renderContent,
      handleFilter () {
        this.$refs['tree'].filter();
      },
      filterTree (value, data, node) {
        return data.resName.indexOf(this.queryVluae) !== -1;
      },
      handleNodeClick (data) {
        this.resId = data.resId;
        this.resState = data.resState;
        this.curResNode = data;
      },
      editRes () {
        this.$refs['resEdit'].show(this.resId, 1);
      },
      addRes () {
        this.$refs['resEdit'].show('', 0, null, this.trmlCode, this.appId);
      },
      addSubRes () {
        this.$refs['resEdit'].show('', 0, this.curResNode, this.trmlCode, this.appId);
      },
      getData () {
        let obj = {
          trmlCode: this.trmlCode,
          resName: this.queryVluae,
          appId: this.appId
        };
        this.treeLoading = true;
        this.$api.bsp.resource.getResourceTreeData(obj).then(ret => {
          this.data = ret;
          this.treeLoading = false;
        });
      },
      reset () {
        this.getData();
        this.resId = '';
        this.curResNode = '';
      },
      resetApp () {
        // let obj = {
        //   appId: this.appId
        // };
        // this.treeLoading = true;
        // this.$api.bsp.resource.getResourceTreeData(obj).then(ret => {
        //   this.data = ret;
        //   this.treeLoading = false;
        // });
        // this.appId = '';
      },
      handleAfterUpdate (type) {
        this.getData();
        if (type === 1) { // 编辑的时候
          this.$refs['resInfo'].reset();
        }
      },
      updateState (state, text) {
        let confirmText = `${text}资源，子资源也会${text}，确定要${text}吗?`;
        if (this.curResNode.children.length === 0) {
          if (state === 'E') { // 启用
            confirmText = '启用子资源，父资源也会启用，确定要启用吗?';
            if (this.curResNode.resLevel === 0) {
              confirmText = '确定要启用该资源吗?';
            }
          } else if (state === 'U') {
            confirmText = '确认要禁用该资源么？'
          } else if (state === 'D') { // 删除子资源
            confirmText = `确定要${text}子资源吗?`;
          }
        }
        this.$confirm(confirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          if (state === State.DELETE) { // 是删除操作的时候
            this.delLoading = true;
            this.$api.bsp.resource.updateState(this.resId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.reset();
              }
              this.delLoading = false;
            });
          } else {
            this.stateLoading = true;
            this.$api.bsp.resource.updateState(this.resId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.handleAfterUpdate(1);
              }
              this.stateLoading = false;
            });
          }
          this.resState = state;
        });
      },
      genSql () {
        this.$api.bsp.resource.genSql({id: this.resId});
      }
    },
    created () {
      let application = this.$store.state.contextData.applications[0];
      this.appId = application&&application.appId;
      this.getData();
    },
    components: {
      ResInfo,
      ResEdit,
      AppOption
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>


