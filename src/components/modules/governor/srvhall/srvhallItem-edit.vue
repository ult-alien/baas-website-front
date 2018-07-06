<template>
  <el-dialog title="添加服务大厅项目" :visible.sync="showDialog">
    <pl-content-box-card class="no-border">
      <el-form label-width="120px" :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属类别" prop="itemCategory" :rules="[
                {required: true, message: '请选择所属类别', trigger: 'change', type: 'array'}
            ]">
              <!--<pl-constant-select type="GovernorConstants.SrvHallCategory" v-model="form.itemCategory" :showEmpty="true" ></pl-constant-select>-->
              <el-cascader
                :options="Category"
                v-model="form.itemCategory">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题" prop="itemTitle" :rules="[
              { required: true, message: '请填写标题'}
                ]">
              <el-input v-model="form.itemTitle" placeholder="请填写标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否热点" prop="hot">
              <el-checkbox v-model="form.hot" :disabled="!checkboxValid" true-label="1" false-label="0">热点问题</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标" prop="itemIcon">
              <el-input v-model="form.itemIcon" placeholder="图标的CSS class"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容资源值" prop="itemRes">
              <el-input v-model="form.itemRes" placeholder="内容资源值是路由的名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序码" prop="itemSort">
            <pl-input-number :min="0"  :numeric-precision="0" v-model="form.itemSort" placeholder="输入排序码"></pl-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="itemContent">
              <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4 }" resize="none" :rows="3" v-model="form.itemContent" placeholder="请填写内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="default" @click="showDialog = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { MsgType } from 'core/constants';
  export default {
    data () {
      return {
        form: {
          itemCategory: [],
          hot: '',
          itemTitle: '',
          itemContent: '',
          itemRes: '',
          itemSort: '',
          itemIcon: '',
          itemId: ''
        },
        loading: false,
        showDialog: false,
        checkboxValid: true,
        Category: []
      };
    },
    methods: {
      show (row) {
        this.Category = [];
        if (this.$refs['form']) {
          this.$refs['form'].resetFields();
        }
        this.form.itemCategory = row && row.itemCategory ? [row.catId, row.itemCategory] : [];
        this.form.hot = row && row.hot ? row.hot : '0';
        this.form.itemTitle = row && row.itemTitle ? row.itemTitle : '';
        this.form.itemContent = row && row.itemContent ? row.itemContent : '';
        this.form.itemRes = row && row.itemRes ? row.itemRes : '';
        this.form.itemSort = row && row.itemSort ? row.itemSort : '';
        this.form.itemIcon = row && row.itemIcon ? row.itemIcon : '';
        this.form.itemId = row && row.itemId ? row.itemId : '';
        // 查询热点问题是否已有6条
        this.$api.bsp.srvhall.getHotNum().then(ret => {
          if (ret >= 6 && this.form.hot === '0') {
            this.checkboxValid = false;
          } else {
            this.checkboxValid = true;
          }
          this.showDialog = true;
        });
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
      },
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {...vm.form};
            vm.loading = true;
            obj.itemCategory = obj.itemCategory[obj.itemCategory.length - 1];
            vm.$api.bsp.srvhall.saveSrvhallItem(obj).then(ret => {
              vm.loading = false;
              if (MsgType.SUCCESS === ret.type) {
                vm.showDialog = false;
                vm.$emit('refresh');
              }
            });
          } else {
            vm.loading = false;
            vm.$alert('保存失败，请查看输入错误提示信息!', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return false;
          }
        });
      },
      goBack () {
        this.$router.push({name: 'bsp.biz.srvhall-list'});
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
  .el-col {
    margin-bottom: 10px;
  }
</style>
