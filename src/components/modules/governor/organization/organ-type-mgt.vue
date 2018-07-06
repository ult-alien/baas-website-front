<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="100px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构类型名称">
              <el-input v-model="filter.typeName" placeholder="请输入关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <pl-constant-select type="PubConstants.TypeState" v-model="filter.typeState"></pl-constant-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary" icon=" anticon icon-search" @click="select">查询</el-button>
            <el-button type="info" icon=" anticon icon-plus" @click="handleAdd()">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <el-row>
      <el-col :span="24">
        <pl-content-box-block>
          <pl-page-table :data-fun="getOrganType" ref="pageTable" style="width:100%">
            <el-table-column header-align="center" align="center" prop="organType" label="机构类型编码" width="200"></el-table-column>
            <el-table-column header-align="center" align="center" prop="typeName" label="机构类型名称" width="200"></el-table-column>
            <el-table-column header-align="center" align="center" prop="parentType" label="上级机构类型编码" width="200"></el-table-column>
            <el-table-column header-align="center" align="center" prop="typeState" label="状态" width="100">
              <template scope="scope">
                <span >{{ scope.row.typeState | constant('PubConstants.TypeState')}}</span>
              </template>
            </el-table-column>
            <el-table-column   label="操作" width="165" fixed="right" header-align="center" align="center">
              <template scope="scope">
                <el-button-group>
                  <el-button size="mini" :loading="stateLoading" v-if="scope.row.typeState === '0'" v-tooltip:hover.top="'启用'"
                             icon=" anticon icon-checkcircleo" @click="updateState(scope.$index,scope.row,'1','启用')">
                  </el-button>
                  <el-button size="mini" :loading="stateLoading" v-if="scope.row.typeState === '1'" v-tooltip:hover.top="'禁用'"
                             icon=" anticon icon-minuscircleo" @click="updateState(scope.$index,scope.row,'0','禁用')">
                  </el-button>
                  <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'"
                             @click="handleEdit(scope.row.organType,1)"></el-button><!-- 修改 -->
                </el-button-group>
              </template>
            </el-table-column>
          </pl-page-table>
        </pl-content-box-block>
      </el-col>
    </el-row>
    <organ-type-add ref="dialogFormVisible" @after-update="reload"></organ-type-add>
  </pl-content-box>
</template>

<script>
  import { MsgType } from 'core/constants';
  import organTypeAdd from './organ-type-add.vue';
  export default {
    data () {
      return {
        filter: {
          typeName: '',
          typeState: ''
        },
        organState: '',
        getOrganType: this.$api.bsp.organ.selectOrganTypeList,
        dialogFormVisible: false,
        stateLoading: false
      };
    },
    components: {
      organTypeAdd
    },
    methods: {
      select () {
        this.$refs.pageTable.reload(this.filter);
      },
      reload () {
        this.$refs.pageTable.reload();
      },
      updateState (index, obj, state, text) {
        // this.$confirm(`确定要${text}该机构类型?`, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '关闭',
        //   type: MsgType.WARING
        // }).then(() => {
        this.stateLoading = true;
        let vm = this;
        if (state === '0') {
          this.organState = '0';
          vm.$api.bsp.organ.checkOrganTypeState(obj.organType, this.organState).then(ret => {
            if (ret) {
              this.$confirm('若禁用该机构，其对应的机构也将废弃，是否确定禁用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: MsgType.WARING
              }).then(() => {
                vm.$api.bsp.organ.updateOrganTypeState(obj.organType, this.organState).then(ret => {
                  if (ret.type === MsgType.SUCCESS) {
                    this.stateLoading = false;
                    this.reload();
                    return;
                  }
                });
              }).catch(() => {});
            } else {
              vm.$api.bsp.organ.updateOrganTypeState(obj.organType, this.organState).then(ret => {
                if (ret.type === MsgType.SUCCESS) {
                  this.reload();
                }
              });
            }
          });
          this.stateLoading = false;
        }
        if (state === '1') {
          this.organState = '1';
          vm.$api.bsp.organ.checkOrganTypeState(obj.organType, this.organState).then(ret => {
            if (ret) {
              this.$confirm('若启用该机构，其对应的机构也将启用，是否确定启用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: MsgType.WARING
              }).then(() => {
                vm.$api.bsp.organ.updateOrganTypeState(obj.organType, this.organState).then(ret => {
                  if (ret.type === MsgType.SUCCESS) {
                    this.stateLoading = false;
                    this.reload();
                    return;
                  }
                });
              }).catch(() => {});
            } else {
              vm.$api.bsp.organ.updateOrganTypeState(obj.organType, this.organState).then(ret => {
                if (ret.type === MsgType.SUCCESS) {
                  this.reload();
                }
              });
            }
          });
          this.stateLoading = false;
        }
        // }).catch(() => {});
      },
      handleAdd () {
        this.$refs.dialogFormVisible.show(null, 0);
      },
      handleEdit (organType, type) {
        this.$refs.dialogFormVisible.show(organType, type);
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


