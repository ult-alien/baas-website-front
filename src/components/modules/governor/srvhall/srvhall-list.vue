<template>
  <pl-content-box>
    <pl-page-nav></pl-page-nav>
    <pl-content-box-toolbar>
      <el-form label-width="120px" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="所属类别" label-width="80px">
              <el-cascader
                :options="Category"
                v-model="params.itemCategory">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="关键字" label-width="80px">
              <el-input  v-model="params.searchStr" placeholder="标题/内容关键字模糊查询"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否热点问题">
              <el-radio-group v-model="params.hot">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
    <pl-content-box-block>
      <pl-page-table :data-fun="getData" :params="queryParams" ref="pageTable" style="width:100%">
        <el-table-column  prop="itemTitle" label="项目标题" width="180"  :show-overflow-tooltip="true"></el-table-column>
		    <el-table-column  prop="itemContent" label="内容" :show-overflow-tooltip="true"></el-table-column>
		    <el-table-column  prop="hot" label="是否热点问题" width="120">
          <template scope="scope">
            <span >{{ scope.row.hot == '1' ? '是' : '否'}}</span>
          </template>
        </el-table-column>
		    <el-table-column  prop="fullCatName" label="所属类别" width="180">
        </el-table-column>
        <el-table-column   label="操作" width="120"  align="center" header-align="center">
          <template scope="scope">
            <el-button-group>
                <el-button size="mini" icon=" el-icon-edit"  v-tooltip:hover.top="'修改'"
                            @click="handleEdit(scope.row)"></el-button><!-- 修改 -->
                <el-button size="mini" icon="el-icon-delete"  v-tooltip:hover.top="'删除'"
                            @click="handleDelete(scope.row)"></el-button><!-- 详情 -->
            </el-button-group>
          </template>
        </el-table-column>
      </pl-page-table>
    </pl-content-box-block>
    <srvhallItem-edit ref="srvhallItemEdit" @refresh="query"></srvhallItem-edit>
  </pl-content-box>
</template>
<script>
  import srvhallItemEdit from './srvhallItem-edit.vue';
  export default {
    data () {
      return {
        getData: this.$api.bsp.srvhall.getSrvHallItemByPage,
        params: {
          itemCategory: [],
          hot: '',
          searchStr: ''
        },
        Category: []
      };
    },
    computed: {
      queryParams () {
        return {
          hot: this.params.hot,
          searchStr: this.params.searchStr,
          itemCategory: this.params.itemCategory.length > 0 ? this.params.itemCategory[this.params.itemCategory.length - 1] : ''
        };
      }
    },
    methods: {
      query () {
        this.$refs.pageTable.reload();
      },
      handleAdd () {
        this.$refs.srvhallItemEdit.show();
      },
      handleEdit (row) {
        this.$refs.srvhallItemEdit.show(row);
      },
      handleDelete (row) {
        this.$confirm('确认删除所选数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.bsp.srvhall.delSrvhallItem({'itemId': row.itemId}).then(ret => {
            if (ret.type === 'success') {
              this.$refs.pageTable.reload();
            }
          });
        });
      }
    },
    components: {
      srvhallItemEdit
    },
    created () {
      // 查询分类
      this.$api.bsp.srvhall.getSrvhallCat().then(ret => {
        ret.forEach((item, index) => {
          let category = {
            value: item.catId,
            label: item.catName
          };
          if (item.subCat && item.subCat.length > 0) {
            category.children = [];
            item.subCat.forEach((subItem, index) => {
              category.children.push({
                value: subItem.catId,
                label: subItem.catName
              });
            });
          }
          this.Category.push(category);
        });
      });
      this.Category.unshift({
        value: '',
        label: '全部'
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/index";
  @import "../../../../assets/scss/variables";
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
</style>



