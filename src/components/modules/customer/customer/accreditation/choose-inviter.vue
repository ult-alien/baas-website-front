<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="60%">
    <pl-content-box-toolbar>
      <el-form label-width="80px" >
        <el-row>
          <el-col :span="8" label-width="80px">
            <el-form-item label="企业名称">
              <el-input  v-model="params.cusName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" @click="query">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </pl-content-box-toolbar>
      <pl-page-table :data-fun="getCusData" :params="params" ref="pageTable" style="width:100%">

        <el-table-column  prop="cusName" label="企业名称" :show-overflow-tooltip="true"  ></el-table-column>


        <el-table-column  label="企业联系人" prop="contactorName" width="200">
        </el-table-column>

        <el-table-column  label="联系人电话" prop="contactorPhone" width="160">
        </el-table-column>

        <el-table-column   label="操作" width="80" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button-group>
                <el-button size="mini" icon=" el-icon-edit"
                            @click="choose(scope.row)">选择</el-button><!-- 修改 -->
            </el-button-group>
          </template>
        </el-table-column>

      </pl-page-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAndRollback">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import constantUtil from 'core/utils/constant-util.js';
  export default {
    data () {
      return {
        getCusData: this.$api.cust.accreditation.getInviterList,
        params: {
          cusName: '',
          cusType: ''
        },
        CusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
        dialogVisible: false
      };
    },
    created () {
    },
    methods: {
      show (cusType) {
        this.params.cusName = '';
        this.dialogVisible = true;
        this.params.cusType = cusType;
        this.query();
      },
      choose (row) {
        this.$confirm('确定修改企业类型?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // 修改关联关系
          /* this.$api.cust.accreditation.updateCusType({'srcId': row.cusId, 'tgtId': this.tgtId, 'cusType': this.cusType, 'currentState': this.currentState}).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.dialogVisible = false;
            }
          }); */
          this.dialogVisible = false;
          this.$emit('confirmCusType', row.cusId);
        });
      },
      closeAndRollback () {
        this.dialogVisible = false;
        this.$emit('rollbackCusType');
      },
      query () {
        if (this.$refs.pageTable) {
          this.$refs.pageTable.reload();
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/index";
  @import "../../../../../assets/scss/variables";
  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
  .dialog-footer{
    text-align: center;
  }
</style>



