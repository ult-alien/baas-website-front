<template>
    <pl-content-box-block v-loading="loading">
      <pl-empty-tip v-show="!loading && tableData.length === 0 " text="暂时没相关记录！"></pl-empty-tip>
      <div v-show="tableData.length > 0">
        <el-table :data="tableData" :show-header="false">
          <el-table-column
            align="right"
            prop="parmName"
            label="参数描述"
            width="200">
          </el-table-column>
          <el-table-column
            label="参数值">
            <template slot-scope="scope">
              <span class="param-wrapper" v-if='!readonly' >
                <popover-edit
                  :popover-key="scope.row.parmCode"
                  :value="scope.row.parmValue"
                  :type="scope.row.parmType"
                  :title="scope.row.parmName"
                  :template="scope.row.editTemplate"
                  :displayTemplate="scope.row.displayTemplate"
                  @save="handleSave"
                >
                  <span class="param-value">
                    <gen-template :scope="scope.row" alias="parameter" :template="scope.row.displayTemplate"></gen-template>
                  </span>
                </popover-edit>
              </span>
               <span class="param-value" v-else>
                    <gen-template :scope="scope.row" alias="parameter" :readonly='true' :template="scope.row.displayTemplate"></gen-template>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </pl-content-box-block>
</template>

<script>
  import PopoverEdit from './popover-edit.vue';
  import GenTemplate from './gen-template.vue';
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
    mounted () {
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
      GenTemplate
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
