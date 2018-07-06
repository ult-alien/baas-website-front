<template>
        <el-dialog title="密码级别设置" :visible.sync="editDialogVisible" size="tiny">
        <pl-content-box-card class="no-border">
          <el-form label-width="200px" :model="form" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="密码类型"  >
                    <pl-content-item-text >{{form.securityType | constant('GovernorConstants.SecurityType')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
               <el-col :span="24">
                <el-form-item label="密码强度"  prop="ruleStrength" :rules="[
                    { required: true, message: '请选择密码强度'}
                  ]">
                   <pl-dictionary-select type="rule_strength" v-model="form.ruleStrength" :showEmpty=false ></pl-dictionary-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="密码到期强制修改"  prop="isSecurityExpire" :rules="[
                      {required: true, message: '请选择是否启用'},
                      { validator: checkSecurityExpire }

                  ]">
                  <pl-constant-select type="GovernorConstants.IsSecurityExpire" v-model="form.isSecurityExpire" :showEmpty=false> </pl-constant-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="密码使用周期(天)"  prop="period" :rules="[
                      {required: true, message: '请输入周期天数'},
                      { type: 'number', message: '必须为数字值'},
                      { validator: checkPeriod }
                  ]">
                  <pl-input-number v-model="form.period" :numeric-precision="0" placeholder="输入周期天数" :disabled="periodInputDisabled" :max="9999" :min="1" :controls="false"></pl-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card >
           <div slot="footer" class="dialog-footer text-center">
            <el-button  @click="goBack">关闭</el-button>
            <el-button type="primary" :loading="loading" @click="save">确定</el-button>     <!-- icon=" anticon icon-save" -->
          </div>
        </el-dialog>

</template>
<script>
  export default {
    props: {
      organs: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        editDialogVisible: false,
        periodInputDisabled: true,
        form: {
          securityRuleId: '',
          securityType: '',
          ruleStrength: '',
          isSecurityExpire: '',
          period: ''
        },
        loading: false
      };
    },
    created () {
    },
    methods: {
      show (index, obj) {
        let vm = this;
        vm.form.securityType = obj.securityType;
        vm.form.securityRuleId = obj.securityRuleId;
        vm.form.ruleStrength = obj.ruleStrength;
        vm.form.isSecurityExpire = obj.isSecurityExpire;
        vm.form.period = obj.period;

        console.log(obj.securityRuleId);
        vm.editDialogVisible = true;
        if (this.form.isSecurityExpire === '1') {
          if (this.form.period < 1) {
            this.form.period = 1;
          }
          this.periodInputDisabled = false;
        } else {
          this.periodInputDisabled = true;
        }
      },
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.loading = true;
            vm.$api.bsp.security.updateSecurityRules(this.form).then(ret => {
              vm.loading = false;
              this.$emit('update-table');
              this.editDialogVisible = false;
              this.$refs['form'].resetFields();
            });
          } else {
            return false;
          }
        });
      },
      goBack () {
        this.editDialogVisible = false;
        this.$refs['form'].resetFields();
      },
      checkPeriod (rule, value, callback) {
        if (this.form.isSecurityExpire === '1' && this.form.period < 1) {
          callback(new Error('周期天数必须大于等于1'));
        } else {
          callback();
        }
      },
      checkSecurityExpire (rule, value, callback) {
        if (this.form.isSecurityExpire === '1') {
          if (this.form.period < 1) {
            this.form.period = 1;
          }
          this.periodInputDisabled = false;
        } else {
          this.periodInputDisabled = true;
        }
        callback();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


