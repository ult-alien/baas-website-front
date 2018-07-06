<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true" :nav-title="navTitle">
    </pl-page-nav>
    <el-form label-width="120px" :model="form" ref="form">
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称" prop="cusName" :rules="[
                            { required: true, message: '请填写客户的真实企业名称', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                            {validator: checkCusName, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.cusName" placeholder="请填写客户的真实企业名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="客户号" prop="cusCode" :rules="[
                            {required: true, message: '请输入正确的客户号', trigger: 'change'},
                            {validator: checkCusCode, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.cusCode" placeholder="请填写6位客户号,仅数字,不可重复" ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="客户类型" prop="cusType" :rules="[{ required: true, message: '请选择客户类型' }]">
                  <pl-dictionary-select :disabled="true" :show-empty="false" type="cus_type.cus_type_c" clearable v-model="form.cusType"></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/自然人" prop="lrName" :rules="[
                            { required: true, message: '请填写客户的企业法人名称', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.lrName" placeholder="请填写客户的企业法人名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="socCrCode" :rules="[
                            { required: true, message: '请填写客户的统一社会信用代码', trigger: 'change' },
                            {validator: socCrCodeValidator, trigger: 'change'},
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <span slot="label" style="font-size: 12px;">统一社会信用代码</span>
                  <el-input v-model="form.socCrCode" placeholder="请填写客户的统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="营业执照" prop="lisNo" :rules="[
                            { required: false, message: '请输入营业执照', trigger: 'change' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.lisNo" placeholder="请填写客户的营业执照"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="24" v-if="form.cusType === cusType['SUPPLIER'] && isAdd">
                <el-form-item label="邀请企业" prop="memberIds" :rules="[{ required: true, message: '请选择邀请企业', trigger: 'blur', type: 'array'}]">
                  <pl-remote-select v-model="form.memberIds"
                                    :data-fun="getMemberFun"
                                    :is-multiple="true"
                                    lable-key="cusName"
                                    placeholder="邀请企业"
                                    value-key="cusId"></pl-remote-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-else-if="form.cusType === cusType['SUPPLIER'] && !isAdd  && memberNames">
                <el-form-item label="所属成员企业">
                  <pl-content-item-text>{{memberNames}}</pl-content-item-text>
                </el-form-item>
              </el-col>-->
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="企业地址" prop="addressArr"  :rules="[
                            { required: true, message: '请选择城市', trigger: 'blur', type: 'array'}
                          ]">
                    <pl-city-select v-model="form.addressArr" :level="2"></pl-city-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" label-width="5px" prop="address" :rules="[
                            { required: true, message: '请填写详细地址', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                    <el-input v-model="form.address" placeholder="请填写详细地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="form.cusType === cusType['FOCAL_CO']">
                  <el-form-item label="金融机构" prop="finId" :rules="[{ required: true, message: '请选择金融机构', trigger: 'blur'}]">
                  <!--  <pl-remote-select v-model="form.finId"
                                      :data-fun="getFinFun"
                                      :params="{cusType: 'FINNER'}"
                                      lable-key="cusName"
                                      placeholder="金融机构"
                                      value-key="cusId"></pl-remote-select>-->
                    <el-select v-model="form.finId" placeholder="请选择" style="width: 180px;" >
                      <el-option
                        v-for="item in organs"
                        :key="item.cusId"
                        placeholder="金融机构"
                        :label="item.cusName"
                        :value="item.cusId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>

            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>
      <pl-content-box-title>管理员信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="contactorName" :rules="[
                            { required: true, message: '请填写客户的联系人姓名', trigger: 'change' },
                            { max: 30, message: '字符长度不能超过30', trigger: 'change' }
                          ]">
                  <el-input v-model="form.contactorName" placeholder="请填写客户的联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="contactorPhone" :rules="[
                            {required: true, message: '请输入电话号码', trigger: 'change'},
                            {validator: telephoneValidator, trigger: 'blur', userId: form.contactorId}
                          ]">
                  <el-input v-model="form.contactorPhone" placeholder="手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="certType" :rules="[{ required: true, message: '证件类型', trigger: 'change' }]">
                  <pl-dictionary-select type="id_type" v-model="form.certType" :showEmpty="false"></pl-dictionary-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码" prop="certNo" :rules="[
                  {required: true, message: '请填写证件号码', trigger: 'change' },
                  {validator: certNoValidator, trigger: 'change',certType: form.certType}]">
                  <el-input v-model="form.certNo" placeholder="证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>账户信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card-group>
          <pl-content-box-card >
            <div class="card-content">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="账号" prop="cusAcct.acctNo" :rules="[
                            {required: true, message: '请填写银行账号', trigger: 'change'},
                            {validator: bankNoValidator, trigger: 'change', cusId: form.cusId}
                          ]">
                    <el-input v-model="form.cusAcct.acctNo" placeholder="请填写银行账号"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="开户行" prop="cusAcct.bankCode"
                                :rules="[{ required: true, message: '请选择开户行', trigger: 'change' }]">
                    <pl-dictionary-select :show-empty="false" type="bank_brand"
                                          clearable v-model="form.cusAcct.bankCode"></pl-dictionary-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开户网点" prop="cusAcct.addressArr" :rules="{
                    trigger: 'change', required: true, message: '请选择省市', type: 'array'
                  }">
                    <pl-city-select v-model="form.cusAcct.addressArr" :level="2"></pl-city-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="10px" prop="cusAcct.bankDot" :rules="{
                    trigger: 'blur', required: true, message: '请填写具体网点'}">
                    <el-input v-model="form.cusAcct.bankDot" placeholder="请填写具体网点"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="账户名" prop="cusAcct.acctName" :rules="[
                  {required: true, message: '请填写账户名', trigger: 'blur' }]">
                    <el-input v-model="form.cusAcct.acctName" placeholder="请填写账户名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>
    </el-form>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button icon=" anticon icon-arrowleft" @click="goBack">返回</el-button>
        <el-button type="primary" icon=" anticon icon-save" :loading="loading" @click="save" :disabled="loading">保存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>

    <el-dialog
      title="交易成功"
      :visible.sync="hashDialogVisible"
      top="25vh"
      width="440px">
      <div>
        <p><i class="el-icon-success" style="color: #67C23A;"></i>&nbsp;区块链已接收交易数据，交易哈希：</p>
        {{(txHash.slice(0, 16) + '...' + txHash.slice(txHash.length - 16))}}&nbsp;<i class="el-icon-document" title="复制" style="cursor: pointer;vertical-align: middle;" @click="copyHash(txHash)"></i>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack">确 定</el-button>
      </span>
    </el-dialog>
  </pl-content-box>
</template>
<script>
  import { MsgType } from 'core/constants';
  import dictionaryUtil from 'core/utils/dictionary-util';
  import validators from 'core/utils/validators.js';
  import constantUtil from 'core/utils/constant-util';
  export default {
    mixins: [validators],
    data () {
      return {
        form: {
          cusId: '',
          cusName: '',
          cusCode: '',
          cusType: '',
          prntName: '',
          prntCode: '',
          lrName: '',
          orgCode: '',
          socCrCode: '',
          postCode: '',
          lisNo: '',
          finId: '',
          area: '',
          certType: '',
          contactorId: '',
          contactorName: '',
          contactorPhone: '',
          certNo: '',
          province: '',
          city: '',
          address: '',
          addressArr: [],
          acctInfo: '',
          cusAcct: {
            bankCode: '',
            acctName: '',
            bankDot: '',
            bankName: '',
            bankCity: '',
            bankProvince: '',
            addressArr: []
          },
          memberIds: [] // 修改日期：20180420
        },
        memberNames: '', // 新增日期：20180420
        loading: false,
        getFinFun: this.$api.cust.customer.findCus,
        phoneRules: [],
        params: {},
        isAdd: true,
        cusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
        organs: [],
        txHash: '',
        hashDialogVisible: false
      };
    },
    computed: {
      navTitle () {
        if (this.params.cusId) {
          return '编辑';
        } else {
          return '新增';
        }
      }
    },
    methods: {
      save () {
        let vm = this;
        vm.loading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.form));
            obj.province = this.form.addressArr[0];
            obj.cusAcct.bankName = dictionaryUtil.getDic(`bank_brand.${obj.cusAcct.bankCode}`).dicName;

            if (obj.addressArr.length === 2) {
              obj.city = this.form.addressArr[1];
            }
            obj.cusAcct.bankProvince = obj.cusAcct.addressArr[0];
            if (obj.cusAcct.addressArr.length === 2) {
              obj.cusAcct.bankCity = obj.cusAcct.addressArr[1];
            }

            delete obj.addressArr;
            delete obj.cusAcct.addressArr;
            obj.acctInfo = JSON.stringify(obj.cusAcct);
            delete obj.cusAcct;
            if (obj.memberIds && obj.memberIds.length > 0) { // 多个用逗号分隔
              obj.memberIds = obj.memberIds.join(',');
            }
            /* if (obj.memberIds && obj.memberIds.length > 0) { // 多个用逗号分隔
              obj.memberIds = obj.memberIds.join(',');
              this.saveCus(obj);
            } else if (this.isAdd && this.cusType['SUPPLIER'] === obj.cusType) {
              this.$confirm('您新增的供应商尚未关联成员企业，确认继续吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: MsgType.WARING
              }).then(() => {
                this.saveCus(obj);
              }).catch(() => {
                this.loading = false;
              });
            } else {
              this.saveCus(obj);
            } */
            obj.idType = 'ent_id_type_1';
            this.saveCus(obj);
          } else {
            this.loading = false;
            this.$alert('保存失败，请滑动滚动条查看输入错误提示信息!', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return false;
          }
        });
      },
      saveCus (obj) {
        this.loading = true;
        this.showStellarLoading('正在生成区块链账户，请稍后...');
        this.$api.cust.customer.saveCus(obj).then(ret => {
          this.loading = false;
          this.hideStellarLoading();
          if (MsgType.SUCCESS === ret.type) {
            if (ret.bean) {
              this.txHash = ret.bean.toString();
              this.hashDialogVisible = true;
            } else {
              this.goBack();
            }
          }
        });
      },
      goBack () {
        this.hashDialogVisible = false;
        if (this.cusType['FOCAL_CO'] === this.form.cusType) {
          this.$router.push({name: 'bsp.biz.focalco', params: {cusType: this.form.cusType}});
          return;
        } else if (this.cusType['FINNER'] === this.form.cusType) {
          this.$router.push({name: 'bsp.biz.finner', params: {cusType: this.form.cusType}});
          return;
        }
        this.$router.push({name: 'bsp.biz.my-customer', params: {cusType: this.form.cusType}});
      },
      checkCusCode (rule, value, callback) {
        if (value) {
          if (!(/^\d{6}$/.test(value))) {
            callback(new Error('请输入6位数字!'));
          } else {
            this.$api.cust.customer.checkCusCode(this.form.cusId, this.form.cusCode).then(ret => {
              if (MsgType.WARING === ret.type) {
                callback(new Error(ret.msg));
              } else {
                callback();
              }
            });
          }
        } else {
          callback();
        }
      },
      checkCusName (rule, value, callback) {
        if (value) {
          this.$api.cust.customer.checkCusName(this.form.cusId, this.form.cusName).then(ret => {
            if (MsgType.WARING === ret.type) {
              callback(new Error(ret.msg));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      },
      getFin () {
        this.$api.cust.customer.findCusByType('FINNER').then(ret => {
          this.organs = ret;
        });
      }
    },
    created () {
      let params = this.$route.params;
      this.params = params;
      if (!params.cusType) {
        this.$router.back();
      }
      if (params.cusId) {
        this.isAdd = false;
        this.$api.cust.customer.getCustomer(params.cusId).then(ret => {
          this.form = ret;
          this.form.addressArr = [];
          this.form.addressArr.push(ret.province);
          if (this.form.city !== '') {
            this.form.addressArr.push(ret.city);
          }
          this.form.cusAcct.addressArr = [];
          this.form.cusAcct.addressArr.push(this.form.cusAcct.bankProvince);
          if (this.form.cusAcct.bankCity) {
            this.form.cusAcct.addressArr.push(this.form.cusAcct.bankCity);
          }
          this.memberNames = ret.memberNames;
        });
      } else {
        this.isAdd = true;
        this.form.cusType = params.cusType;
      }
      this.getFin();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/variables";
  .account-card {
    padding: 0px;
    .account-item {
      padding: 22px 0px 0px;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border-bottom: 0px;
      }
      &.add-item {
        padding: 15px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: $dark-white;
        }
      }
    }
  }

  .card-content {
    max-width: 800px;
    margin: 0px auto;
    padding-right: 40px;
  }
  .el-col {
    margin-bottom: 10px;
  }
</style>
