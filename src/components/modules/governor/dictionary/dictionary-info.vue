<template>
  <div v-loading="loading">
    <template v-if="dictionaryId">
      <pl-content-box-toolbar class="text-center">
        <slot name="toolbar"></slot>
      </pl-content-box-toolbar>
      <pl-content-box-block style="height:500px;overflow: auto;">
        <pl-content-box-card>
          <el-form label-width="100px"  :model="form" ref="form"  class="static-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="字典名" prop="dicName">
                  <pl-content-item-text>{{form.dicName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="字典代码"  prop="dicCode" >
                  <pl-content-item-text>{{form.dicCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父字典值" prop="parentId">
                  <pl-content-item-text>{{form.parentName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扩展字段1" prop="extension1">
                  <pl-content-item-text>{{form.extension1}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扩展字段2" prop="extension2">
                  <pl-content-item-text>{{form.extension2}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态">
                  <pl-content-item-text>{{form.dicState | constant('PubConstants.State')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序码" prop="dicSort">
                  <pl-content-item-text>{{form.dicSort}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注"  prop="description">
                  <pl-content-item-text>{{form.description}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card>
      </pl-content-box-block>
    </template>
    <pl-empty-tip v-else text="请选择字典，如果没字典请新增字典！"></pl-empty-tip>
  </div>
</template>

<script>
  export default {
    props: {
      dicId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dictionaryId: '',
        form: {
          dicName: '',
          dicSort: '',
          dicCode: '',
          parentId: '',
          extension1: '',
          extension2: '',
          dicState: 'E',
          resType: [],
          description: '',
          dicLevel: 0,
          dicPath: '',
          parentName: ''
        },
        loading: false
      };
    },
    methods: {
      reset () {
        this.loading = true;
        this.$api.bsp.dictionary.find(this.dicId).then(ret => {
          this.form = ret;
          this.loading = false;
          this.dictionaryId = this.dicId;
        });
      }
    },
    watch: {
      dicId () {
        if (this.dicId) {
          this.loading = true;
          this.$api.bsp.dictionary.find(this.dicId).then(ret => {
            this.form = ret;
            this.loading = false;
            this.dictionaryId = this.dicId;
          });
        } else {
          this.dictionaryId = this.dicId;
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


