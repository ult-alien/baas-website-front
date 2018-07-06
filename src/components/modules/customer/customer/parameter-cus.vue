<template>
  <el-dialog title="会员业务控制" :visible.sync="dialogVisible">
    <parameter  ref="parameter"  :readonly='readonly' v-if="parmRlatId" :biz-code="bizCode" :parm-rlat-id="parmRlatId" ></parameter>
    <div class="text-center"  v-if='!readonly'><i class="text-primary anticon icon-infocirlceo"></i>&nbsp;
      <small class="text-danger">
      <span class="text-muted">温馨提示：</span>
      点击参数值可以编辑参数
      </small>
    </div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import constantUtil from '../../../../core/utils/constant-util';
  import parameter from '../parameter/parameter.vue';
  export default {
    // props: {
    //   bizCode: {
    //     type: String,
    //     default: constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['member']
    //   }
    // },
    data () {
      return {
        bizCode: constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['member'],
        parmRlatId: '',
        dialogVisible: false
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
      show (id, memType) {
        let t = '';
        t = memType;
        // console.log('t' + t);
        this.parmRlatId = id;
        if (t === '1') {
          this.bizCode = constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['member'] + ',' + constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['seller'];
        } else if (t === '0') {
          this.bizCode = constantUtil.getConstantByKey('ParameterConstants.ParameterTemplateBizType')['member'];
        }
        // console.log('bizCode:' + this.bizCode);
        if (this.$refs['parameter']) {
          this.$nextTick(() => {
            this.$refs['parameter'].reload();
          });
        }
        this.dialogVisible = true;
      }
    },
    components: {
      parameter
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


