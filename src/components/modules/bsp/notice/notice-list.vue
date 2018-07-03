<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="filterNotice.title" placeholder="请输入标题关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="text-right">
            <el-button type="default" icon=" anticon icon-search" @click="select">查询</el-button>
            <el-button type="primary" icon=" anticon icon-plus" @click="addNotice">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <el-row>
      <el-col :span="24">
        <pl-content-box-block>
          <pl-page-table :data-fun="getUsersData" ref="pageTable" :params="filterNotice">
            <el-table-column prop="title" label="标题" header-align="center"
                             sortable="title"></el-table-column>
            <!--<el-table-column prop="content" label="内容" width="250" header-align="center">
              <template scope="scope">
                <span v-html="scope.row.content"></span>
              </template>
            </el-table-column>-->
            <el-table-column  prop="front" label="是否置顶" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.front=='1'? '是': '否'}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="noticeState" label="公布状态" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noticeState == '1'?'发布':'停用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" icon=" anticon icon-ellipsis" v-tooltip:hover.top="'详情'" @click="viewDetail(scope.row)"></el-button><!-- 查看 -->
                  <!--  :disabled="scope.row.noticeState==='1'" -->
                  <el-button size="mini"icon=" el-icon-edit" v-tooltip:hover.top="'编辑'" @click="editNotice(scope.row)"></el-button>
                  <el-button size="mini" icon=" anticon icon-delete" v-tooltip:hover.top="'删除'" @click="delNotice(scope.row)"></el-button>
                  <el-button size="mini" icon=" anticon icon-pausecircleo" v-tooltip:hover.top="'发布'" v-if="scope.row.noticeState!=='1'" @click="updateNoticeState(scope.row)"></el-button>
                  <el-button size="mini" icon=" anticon icon-playcircleo" v-tooltip:hover.top="'停用'" v-if="scope.row.noticeState==='1'" @click="updateNoticeState(scope.row)"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </pl-page-table>
        </pl-content-box-block>
      </el-col>
    </el-row>
    <!--<notice-add ref="noticeAdd" @update-table="handleUpdateTable"></notice-add>-->
  </pl-content-box>
</template>
<script>
  import {MsgType} from 'core/constants';
  import AppOption from '../uiComponents/application.vue';
  export default {
    components: {
      AppOption
    },
    data () {
      return {
        filterNotice: {
          title: ''
        },
        getUsersData: this.$api.bsp.notice.getNotices
      };
    },
    created () {
      //let application = this.$store.state.contextData.applications[0];
      // this.filterNotice.appId = application && application.appId;
    },
    methods: {
      select () {
        this.$refs.pageTable.reload(this.filterNotice);
      },
      addNotice () {
        this.$router.push({name: 'bsp.biz.notice-add-edit', params: {isEdit: '0'}});
        // this.$refs.noticeAdd.show();
      },
      handleUpdateTable () {
        this.$refs.pageTable.reload();
      },
      delNotice (row) {
        let vm = this;
        this.$confirm('删除之后数据无法还原，确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: MsgType.WARING
        }).then(() => {
          vm.form = row;
          this.$api.bsp.notice.delNotice(vm.form).then(ret => {
            this.$notify({
              title: '提示',
              type: ret.type,
              message: ret.msg
            });
            if (ret.type === MsgType.SUCCESS) {
              vm.$refs.pageTable.reload();
            }
          });
        }).catch(() => {
        });
      },
      editNotice (row) {
        row.isEdit = '1';
        this.$router.push({name: 'bsp.biz.notice-add-edit', params: row});
      },
      viewDetail (row) {
        this.$router.push({name: 'bsp.biz.notice-detail', params: row});
        // this.$refs.noticeDetail.show(row);
      },
      updateNoticeState (row) {
        this.$api.bsp.notice.updateNoticeState(row.noticeId, row.noticeState).then(ret => {
          this.$notify({
            title: '提示',
            type: ret.type,
            message: ret.msg
          });
          if (ret.type === MsgType.SUCCESS) {
            this.$refs.pageTable.reload();
          }
          // this.$logTip(ret.msg, '提示', {
          //   type: ret.type
          // });
        });
      }
      // publish (row) {
      //   this.filterNotice.noticeState = '0';
      //   this.$refs.pageTable.reload(this.filterNotice);
      // },
      // block (row) {
      //   this.filterNotice.noticeState = '1';
      //   this.$refs.pageTable.reload(this.filterNotice);
      // }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>
