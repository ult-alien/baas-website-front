<template>
  <div>
    <pl-page-nav>
      <div slot="nav-tip">
        <i class="text-primary anticon icon-infocirlceo"></i>&nbsp;<small class="text-muted">点击参数值可以编辑参数</small>
      </div>
    </pl-page-nav>
    <parameter  ref="parameter" v-if="parmRlatId" :biz-code="bizCode" :parm-rlat-id="parmRlatId" ></parameter>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" :loading="refreshLoading" @click="refreshContextData">刷新缓存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </div>
</template>

<script>
  import constantUtil from 'core/utils/constant-util';
  import parameter from './parameter.vue';
  export default {
    data () {
      return {
        bizCode: constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['CP'],
        parmRlatId: '',
        refreshLoading: false
      };
    },
    computed: {
      readonly () {
        let hasPermission = this.hasPermission('mem-parameter');
        if (hasPermission) {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      refreshContextData () {
        this.refreshLoading = true;
        this.$store.dispatch('refreshContextData').then(() => {
          this.refreshLoading = false;
        });
      }
    },
    created () {
      this.parmRlatId = this.$store.state.contextData.user.ent.organId;
    },
    components: {
      parameter
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


