<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" style="width: 350px;">
        <el-input placeholder="请输入字典名称" v-model="queryVluae" style="width: 150px;"></el-input>
        <el-button  icon="el-icon-search" @click="handleFilter"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" icon=" anticon icon-plus" @click="addRes()">新增</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-empty-tip v-show="!treeShow" text="暂时没有字典,请新增字典！"></pl-empty-tip>
      <pl-layout v-show="treeShow">
        <div slot="left" style="height:561px;width: 250px;overflow: auto;" v-loading="treeLoading">
          <el-tree ref='tree' :render-content="renderContent" :filter-node-method="filterTree" node-key="resId" :data="data" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" class="no-border"></el-tree>
        </div>
        <div slot="right">
          <dic-info :dic-id="dicId" ref="dicInfo">
            <template slot="toolbar">
              <el-button type="primary" icon=" anticon icon-plus" :disabled="dicState === 'U'" @click="addSubRes()">新增子字典</el-button>
              <el-button  icon=" el-icon-edit" @click="editRes">编辑</el-button>
              <el-button :loading="stateLoading" v-if="dicState === 'U'" icon=" anticon icon-checkcircleo" @click="updateState('E','启用')">启用</el-button>
              <el-button :loading="stateLoading" v-if="dicState === 'E'" icon=" anticon icon-minuscircleo" @click="updateState('U','禁用')">禁用</el-button>
              <el-button :loading="delLoading" icon=" anticon icon-delete" @click="updateState('D','删除')">删除</el-button>
            </template>
          </dic-info>
        </div>
      </pl-layout>
    </pl-content-box-block>
    <dic-edit ref="dicEdit" @after-update="getData"></dic-edit>
  </pl-content-box>
</template>

<script>
  import DicInfo from './dictionary-info.vue';
  import DicEdit from './dictionary-edit.vue';
  import {MsgType} from 'core/constants';
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
    let nodeContent =
        <span class='el-tree-node__labe'>
          {data.dicState === 'U' ?
            <span  class='text-muted'>{icon}{ node.label}(禁用)</span>
             :
            <span><span class='text-primary'>{icon}</span>{ node.label }</span>
          }
         </span>;
    return nodeContent;
  };

  export default {
    data () {
      return {
        queryVluae: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'dicName'
        },
        dicId: '',
        parentId: '',
        curResNode: {},
        delLoading: false,
        treeLoading: false,
        stateLoading: false,
        dicState:''
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
        console.info(data);
        return data.dicName.indexOf(this.queryVluae) !== -1 || data.parentName.indexOf(this.queryVluae) !== -1;
      },
      handleNodeClick (data) {
        this.dicId = data.dicId;
        this.dicState = data.dicState;
        this.parentId = data.parentId;
        this.curResNode = data;
      },
      editRes () {
        this.$refs['dicEdit'].show(this.dicId, 1);
      },
      addRes () {
        this.$refs['dicEdit'].show('', 0, null, this.trmlCode);
      },
      addSubRes () {
        this.$refs['dicEdit'].show('', 0, this.curResNode);
      },
      getData () {
        let obj = {
          dicName: this.queryVluae
        };
        this.treeLoading = true;
        this.$api.bsp.dictionary.getResourceTreeData(obj).then(ret => {
          this.data = ret;
          this.treeLoading = false;
        });
      },
      reset () {
        this.getData();
        this.dicId = '';
        this.curResNode = '';
      },
      handleAfterUpdate (type) {
        this.getData();
        if (type === 1) { // 编辑的时候
          this.$refs['dicInfo'].reset();
        }
      },
      updateState (state, text) {
        if (this.parentId) {
        this.$confirm(`确定要${text}子字典吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }
        ).then(() => {
          if (state === 'D') { // 是删除操作的时候
            this.delLoading = true;
            this.$api.bsp.dictionary.updateState(this.dicId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.$store.dispatch('refreshContextData');
                this.reset();
              }
              this.delLoading = false;
            });
          } else {
            this.stateLoading = true;
            this.$api.bsp.dictionary.updateState(this.dicId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.$store.dispatch('refreshContextData');
                this.handleAfterUpdate(1);
              }
              this.stateLoading = false;
            });
          }
          this.dicState = state;
        });
      } else {
        this.$confirm(`${text}字典，子字典也会${text}，确定要${text}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }
        ).then(() => {
          if (state === 'D') { // 是删除操作的时候
            this.delLoading = true;
            this.$api.bsp.dictionary.updateState(this.dicId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.$store.dispatch('refreshContextData');
                this.reset();
              }
              this.delLoading = false;
            });
          } else {
            this.stateLoading = true;
            this.$api.bsp.dictionary.updateState(this.dicId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.$store.dispatch('refreshContextData');
                this.handleAfterUpdate(1);
              }
              this.stateLoading = false;
            });
          }
          this.dicState = state;
        });
      }

      }
    },
    created () {
      this.getData();
    },
    components: {
      DicInfo,
      DicEdit
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>


