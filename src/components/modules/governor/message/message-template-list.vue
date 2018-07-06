<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属应用">
              <app-option ref="appOption" v-model="params.appId"></app-option>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型">
              <el-input v-model="params.msgTplType" placeholder="请输入业务类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary" icon=" anticon icon-search" @click="reload">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getPageData" ref="pageTable">
        <el-table-column  prop="msgTplType" label="业务类型" width="220"></el-table-column>
        <el-table-column  prop="content" label="模板内容" :width="contentWidth"></el-table-column>
        <el-table-column  prop="appId" label="所属应用" width="220">
          <template scope="scope">
            {{scope.row.appId | applicationsName}}
          </template>
        </el-table-column>
        <el-table-column  prop="sms" label="是否发短信" width="115">
          <template scope="scope">
            {{scope.row.sms === '1'? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column  prop="systemMsg" label="是否发站内信" width="130">
          <template scope="scope">
            {{scope.row.systemMsg === '1'? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="70" fixed="right">
          <template scope="scope">
            <el-button size="mini" icon=" el-icon-edit" @click="edit(scope.row.msgTplId)" v-tooltip="'编辑'"></el-button>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <message-template-edit ref="messageTemplateEdit" @after-update="hanldAfterUpdate"></message-template-edit>
  </pl-content-box>
</template>

<script>
  import messageTemplateEdit from './message-template-edit.vue';
  import AppOption from '../uiComponents/application.vue';
  export default {
    data () {
      return {
        contentWidth: '460',
        params: {
          msgTplType: '',
          appId: ''
        },
        getPageData: this.$api.bsp.message.selectTemplates
      };
    },
    methods: {
      reload () {
        this.$refs.pageTable.reload(this.params);
      },
      edit (id) {
        this.$refs['messageTemplateEdit'].show(id);
      },
      hanldAfterUpdate () {
        this.reload();
      }
    },
    created () {
      if (document.body.clientWidth >= 1620) {
        this.contentWidth = '530';
      }
    },
    components: {
      messageTemplateEdit,
      AppOption
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


