<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left" style="width: 350px;">
        <el-input placeholder="请输入机构名称" v-model="queryValue" style="width: 150px;"></el-input>
        <el-button  icon="el-icon-search" @click="handleFilter"></el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-empty-tip v-show="!treeShow" text="暂时没有机构,请新增机构！"></pl-empty-tip>
      <pl-layout v-show="treeShow">
        <div slot="left" style="height:561px;width: 250px;overflow: auto;" v-loading="treeLoading">
          <el-tree ref='tree'
                   :render-content="renderContent"
                   :filter-node-method="filterTree"
                   node-key="organId" :data="data"
                   :props="defaultProps"
                   :highlight-current="true"
                   :default-expanded-keys="expandedKeys"
                   @node-click="handleNodeClick" class="no-border"></el-tree>
        </div>
        <div slot="right">
          <organ-info :organ-id="organId" ref="organInfo">
            <template slot="toolbar">
              <el-button type="primary" icon=" anticon icon-plus" :disabled="organState === 'U' || !subType" @click="addSubOrgan()">新增子机构</el-button>
              <el-button icon=" el-icon-edit" :disabled="sourceCode === 'EXTERNAL'" @click="editOrgan">编辑</el-button>
              <el-button :loading="stateLoading" :disabled="sourceCode !== 'CUSTOM'" v-if="organState === 'U'" icon=" anticon icon-checkcircleo" @click="updateState('E','启用')">启用</el-button>
              <el-button :loading="stateLoading" :disabled="sourceCode !== 'CUSTOM'" v-if="organState === 'E'" icon=" anticon icon-minuscircleo" @click="updateState('U','禁用')">禁用</el-button>
              <el-button :loading="delLoading" :disabled="sourceCode !== 'CUSTOM'" icon=" anticon icon-delete" @click="updateState('D','删除')">删除</el-button>
            </template>
          </organ-info>
        </div>
      </pl-layout>
    </pl-content-box-block>
    <organ-edit ref="organEdit" @after-update="handleAfterUpdate"></organ-edit>
  </pl-content-box>
</template>

<script>
  import organInfo from './organ-info.vue';
  import organEdit from './organ-edit.vue';
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
          {data.organState === 'U' ?
            <span  class='text-muted'>{icon}{ node.label}(禁用)</span>
             :
            <span><span class='text-primary'>{icon}</span>{ node.label }</span>
          }
         </span>;
    return nodeContent;
  };

  export default {
    props: {
      type: {
        default: '1', // 1:代表所有机构， 0：代表企业机构
        type: String
      }
    },
    data () {
      return {
        queryValue: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'organName'
        },
        organId: '',
        organState: '',
        parentId: '',
        curOrganNode: {},
        parentNode: {},
        expandedKeys: [],
        delLoading: false,
        stateLoading: false,
        treeLoading: false,
        organType: '',
        subType: '',
        sourceCode: '',
        allowOp: true ,
        allowAddChild: false
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
        return data.organName.indexOf(this.queryValue.trim()) !== -1 || data.parentName.indexOf(this.queryValue.trim()) !== -1;
      },
      handleNodeClick (data) {
        this.organId = data.organId;
        this.organState = data.organState;
        this.parentId = data.parentId;
        this.curOrganNode = data;
        this.sourceCode = data.sourceCode;
        this.subType = data.subType;
        this.parentNode = this.findNode(data.parentId, this.data);
      },
      findNode (id, data) {
        if (!data || data.length === 0) {
          return null;
        }
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].organId === id ) {
            return data[i];
          } else {
            let node = this.findNode(id, data[i].children)
            if (node) {
              return node;
            }
          }
        }
      },
      editOrgan () {
        let node = this.curOrganNode;
        if (this.parentNode) {
          node = this.parentNode;
        }
        this.$refs['organEdit'].show(this.organId, 1, node);
      },
      addOrgan () {
        this.$refs['organEdit'].show('', 0, null);
      },
      addSubOrgan () {
        this.$refs['organEdit'].show('', 0, this.curOrganNode);
      },
      getData () {
        let obj = {
          organName: this.queryValue,
          dataType: this.type
        };
        this.treeLoading = true;
        this.$api.bsp.organ.getOrganTreeData(obj).then(ret => {
          this.data = ret;
          if (ret && ret.length === 1) {
            this.expandedKeys = [ret[0].organId];
          }
          this.treeLoading = false;
        });
      },
      reset () {
        this.getData();
        this.organId = '';
        this.curOrganNode = '';
      },
      handleAfterUpdate (type) {
        this.getData();
        if (type === 1) { // 编辑的时候
          this.$refs['organInfo'].reset();
        }
      },
      updateState (state, text) {
        this.$confirm(`确定要${text}子机构吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          if (state === 'D') { // 是删除操作的时候
            this.delLoading = true;
            this.$api.bsp.organ.updateState(this.organId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.reset();
              }
              this.delLoading = false;
            });
          } else {
            this.stateLoading = true;
            this.$api.bsp.organ.updateState(this.organId, this.parentId, state).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.handleAfterUpdate(1);
              }
              this.stateLoading = false;
            });
          }
          this.organState = state;
        });
      }
    },
    created () {
      this.getData();
    },
    components: {
      organInfo,
      organEdit
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
