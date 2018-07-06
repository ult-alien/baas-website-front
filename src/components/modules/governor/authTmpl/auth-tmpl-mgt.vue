<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <div class="pull-left">
        <el-input placeholder="请输入模板名称" v-model="tmplName" style="width: 150px;"></el-input>
        <el-button  icon="el-icon-search" @click="handleFilter"></el-button>
      </div>
      <div class="pull-right">
        <el-button type="primary" icon=" anticon icon-plus" @click="addTmpl()">新增</el-button>
      </div>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getTmplData" ref="pageTable" style="width:100%">
        <el-table-column header-align="center" align="center" prop="tmplName" label="模板名称" width="150" sortable="tmpl_name">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="note" label="描述" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" label="拥有角色" >
          <template scope="scope">
            <span class="tag-wrapper">
              <el-tag
                v-for="role in scope.row.roles"
                type="primary">
                {{role.roleName}}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"  label="操作" width="100" fixed="right">
          <template scope="scope">
            <el-button-group>
              <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'"
                         @click="handleEdit(scope.$index,scope.row)"></el-button><!-- 修改 -->
              <el-button size="mini" icon=" anticon icon-delete" v-tooltip:hover.top="'删除'"
                         @click="handleDelete(scope.$index,scope.row)"></el-button><!-- 删除 -->
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <auth-tmpl-edit ref="authTmplEdit" @after-update="handleAfterUpdate"></auth-tmpl-edit>
  </pl-content-box>
</template>

<script>
  import authTmplEdit from './auth-tmpl-edit.vue';
  import {MsgType} from 'core/constants';
  export default {
    data () {
      return {
        tmplName: '',
        getTmplData: this.$api.bsp.authTmpl.selectTmplByPage
      };
    },
    methods: {
      handleFilter () {
        this.$refs['pageTable'].reload({tmplName: this.tmplName});
      },
      addTmpl () {
        this.$refs['authTmplEdit'].show();
      },
      handleEdit (index, row) {
        this.$refs['authTmplEdit'].show(row.tmplId);
      },
      handleDelete (index, row) {
        this.$confirm('删除模板，跟模板关联的授权信息也会删掉，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: MsgType.WARING
        }).then(() => {
          this.$api.bsp.authTmpl.deleteAuthTmpl(row.tmplId).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.$refs['pageTable'].reload();
            }
          });
        }).catch(() => {});
      },
      handleAfterUpdate () {
        this.handleFilter();
      }
    },
    created () {
    },
    components: {
      authTmplEdit
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>


