<template>
  <pl-content-box>
    <pl-page-nav>
      <div slot="nav-tip">
        <i class="text-primary anticon icon-infocirlceo"></i>&nbsp;<small class="text-muted">点击参数值可以编辑参数</small>
      </div>
    </pl-page-nav>
    <parameter :readonly='readonly' :biz-code="bizCode" :parm-rlat-id="parmRlatId" ></parameter>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" :loading="refreshLoading" @click="refreshContextData">刷新缓存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>

<script>
  import PopoverEdit from './popover-edit.vue';
  import GenTemplate from './gen-template.vue';
  import parameter from './parameter.vue';
  import {MsgType} from '../../../../core/constants';
  export default {
    props: {
      bizCode: {
        type: String,
        default: '0'
      },
      parmRlatId: {
        type: String,
        default: '0'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tableData: [],
        loading: false,
        refreshLoading: false
      };
    },
    created () {
      this.reload();
    },
    methods: {
      reload () {
        this.loading = true;
        this.$api.bsp.parameter.select(this.bizCode, this.parmRlatId).then((ret) => {
          this.tableData = ret.filter((item) => {
            return item.displayable === '1';
          });
          this.loading = false;
        });
      },
      edit (parameter) {
        this.$refs['parameterEdit'].show(parameter);
      },
      handleSave (key, value) {
        let obj = {
          parmCode: key,
          parmValue: value
        };

        let editItem = null;
        this.tableData.forEach(item => {
          if (item.parmCode === obj.parmCode) {
            editItem = item;
            return;
          }
        });
        let param = {...editItem};
        param.parmValue = value;

        this.$api.bsp.parameter.update(param).then(ret => {
          if (ret.type === MsgType.SUCCESS) {
            this.$store.dispatch('refreshContextData');
            editItem.parmValue = value;
          }
        });
      },
      refreshContextData () {
        this.refreshLoading = true;
        this.$store.dispatch('refreshContextData').then(() => {
          this.refreshLoading = false;
        });
      }
    },
    components: {
      PopoverEdit,
      GenTemplate,
      parameter
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .param-wrapper {
     color: #428bca;
    .param-value{
      border-bottom: dashed 1px #428bca;
      padding:0px;
      cursor: pointer;
    }
  }
</style>


