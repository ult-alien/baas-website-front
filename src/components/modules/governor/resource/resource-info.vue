<template>
  <div v-loading="loading">
    <template v-if="resoureId">
      <pl-content-box-toolbar class="text-center">
        <slot name="toolbar"></slot>
      </pl-content-box-toolbar>
      <pl-content-box-block style="height:500px;overflow: auto;">
        <pl-content-box-card>
          <el-form label-width="100px"  :model="form" ref="form"  class="static-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="资源名" prop="resName">
                  <pl-content-item-text>{{form.resName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="资源代码"  prop="resCode" >
                  <pl-content-item-text>{{form.resCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="资源值" prop="resValue">
                  <pl-content-item-text>{{form.resValue}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序码" prop="resSort">
                  <pl-content-item-text>{{form.resSort}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属终端" prop="trmlCode">
                  <pl-content-item-text>{{form.trmlCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父资源值" prop="parentId">
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
                  <pl-content-item-text>{{form.resState | constant('PubConstants.State')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="资源类型" prop="resType" class="line-height-36" >
                  <pl-content-item-text>{{form.resType | dictionary('res_type')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注"  prop="note">
                  <pl-content-item-text>{{form.note}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card>
      </pl-content-box-block>
    </template>
    <pl-empty-tip v-else text="请选择资源，如果没资源请新增资源！"></pl-empty-tip>
  </div>
</template>

<script>
  import {State} from '../../../../core/constants';
  export default {
    props: {
      resId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        resoureId: '',
        form: {
          resName: '',
          resValue: '',
          resSort: '',
          resCode: '',
          trmlCode: '',
          parentId: '',
          extension1: '',
          extension2: '',
          resState: State.ENABLE,
          resType: [],
          note: '',
          resLevel: 0,
          resPath: '',
          parentName: ''
        },
        loading: false
      };
    },
    methods: {
      reset () {
        this.loading = true;
        this.$api.bsp.resource.find(this.resId).then(ret => {
          this.form = ret;
          this.loading = false;
          this.resoureId = this.resId;
        });
      }
    },
    watch: {
      resId () {
        if (this.resId) {
          this.reset();
        } else {
          this.resoureId = this.resId;
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


