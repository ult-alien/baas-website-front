<template>
  <div v-loading="loading">
    <template v-if="orgId">
      <pl-content-box-toolbar class="text-center">
        <slot name="toolbar"></slot>
      </pl-content-box-toolbar>
      <pl-content-box-block style="height:500px;overflow: auto;">
        <pl-content-box-card>
          <el-form label-width="100px" :model="form" ref="form" class="static-form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="机构名称" prop="organName">
                  <pl-content-item-text>{{form.organName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构代码" prop="organCode">
                  <pl-content-item-text>{{form.organCode}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构简称" prop="shortName">
                  <pl-content-item-text>{{form.shortName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="机构类型" prop="typeName">
                  <pl-content-item-text>{{form.typeName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构状态" prop="organState">
                  <pl-content-item-text>{{form.organState | constant('PubConstants.State')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上级机构名" prop="parentName">
                  <pl-content-item-text>{{form.parentName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card>
      </pl-content-box-block>
    </template>
    <pl-empty-tip v-else text="请选择机构，如果没机构请新增机构！"></pl-empty-tip>
  </div>
</template>

<script>
  export default {
    props: {
      organId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        orgId: '',
        form: {
          organName: '',
          organCode: '',
          shortName: '',
          organType: '',
          organState: '',
          parentName: '',
          typeName: ''
        },
        loading: false
      };
    },
    methods: {
      reset () {
        this.loading = true;
        this.$api.bsp.organ.find(this.organId).then(ret => {
          this.form = ret;
          this.loading = false;
          this.orgId = this.organId;
        });
      }
    },
    watch: {
      organId () {
        if (this.organId) {
          this.reset();
        } else {
          this.orgId = this.organId;
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
