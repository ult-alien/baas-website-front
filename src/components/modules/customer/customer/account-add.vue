e<template>
  <el-dialog title="银行账户维护" :visible.sync="editDialogVisible" style="width:100%">
    <pl-content-box-card class="no-border">
      <el-form label-width="110px"  :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号" prop="acctNo" :rules="[
                { required: true, message: '请输入账号', trigger: 'change' },
                { trigger: 'change', validator: bankNoValidator}
              ]">
              <el-input v-model="form.acctNo" placeholder="输入账号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="账户名" prop="acctName" :rules="[
                { required: true, message: '请输入账户名', trigger: 'change' }
              ]">
              <el-input v-model="form.acctName" placeholder="输入账户名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开户行" prop="bankCode" :rules="[
                { required: true, message: '请选择开户行', trigger: 'change' }
              ]">
              <pl-dictionary-select :show-empty="false" type="bank_brand" clearable v-model="form.bankCode"></pl-dictionary-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开户地区" prop="addressArr" :rules="{
              trigger: 'change', required: true, message: '请选择开户地区', type: 'array'
            }">
              <pl-city-select v-model="form.addressArr" :level="2"></pl-city-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="bankDot" label="开户支行" :rules="{
                trigger: 'change', required: true, message: '开户支行不能为空'
              }">
              <el-input
                placeholder="开户支行"
                v-model="form.bankDot" tips="请填写真实银行网点地址">
              </el-input>
            </el-form-item>
          </el-col>

           <el-col :span="24">
            <el-form-item prop="bankCertificateFile" label="账户证明" :rules="{
                trigger: 'change', required: true, message: '请上传账户证明'
              }">
              <pl-upload-file class="fileupload"
                              show-type="vertical"
                              :file-type="bankCertificateFile" 
                              save-path="bankAcct" 
                              ref="fileupload"
                              :size="5"
                              accept-type="bmp,jpg,png,jpeg"
                              :api="fileApi" 
                              v-model="form.bankCertificateFile" :multiple="true">

              </pl-upload-file>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </pl-content-box-card >
    <div slot="footer" class="dialog-footer text-center">
      <el-button  @click="goBack">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">提交审核</el-button>     <!-- icon=" anticon icon-save" -->
    </div>
  </el-dialog>

</template>
<script>
  import {MsgType} from 'core/constants';
  import validators from 'core/utils/validators.js';
  import dictionaryUtil from 'core/utils/dictionary-util.js';
  import constantUtil from 'core/utils/constant-util.js';
  import {HttpPrefix} from '../api/config.js';
  export default {
    mixins: [validators],
    data () {
      return {
        editDialogVisible: false,
        form: {
          acctName: '',
          acctNo: '',
          bankName: '',
          bankCode: '',
          addressArr: [],
          bankDot: '',
          bankCertificateFile: '',
          bankProvince: '',
          bankCity: ''
        },
        loading: false,
        bankCertificateFile: constantUtil.getConstantByKey('BizConstants.FileCls')['BANK_CERTIFICATE'],
        fileApi: HttpPrefix.API
      };
    },
    methods: {
      show () {
        this.form = {
          acctName: '',
          acctNo: '',
          bankName: '',
          bankCode: '',
          addressArr: [],
          bankDot: '',
          bankCertificateFile: '',
          bankProvince: '',
          bankCity: ''
        };
        if (this.$refs['fileupload']) {
          this.$refs['fileupload'].clearUploadList();
        }
        this.editDialogVisible = true;
      },
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.loading = true;
            // 获取银行名称
            let bank = dictionaryUtil.getDic(`bank_brand.${this.form.bankCode}`);
            this.form.bankName = bank.dicName;
            // 取出省市
            this.form.bankProvince = this.form.addressArr[0];
            if (this.form.addressArr[1]) {
              this.form.bankCity = this.form.addressArr[1];
            }
            this.$api.cust.account.addAcct(this.form).then(ret => {
              vm.loading = false;
              if (ret.type === MsgType.SUCCESS) {
                this.$emit('queryData');
                vm.editDialogVisible = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      goBack () {
        this.editDialogVisible = false;
        this.$refs['form'].resetFields();
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>


