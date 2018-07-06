<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true"  :nav-title="navTitle">
    </pl-page-nav>
    <el-form label-width="140px" :model="form" ref="form">
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="机构中文名称" prop="[customerC][cusName]" :rules="[
                            { required: true, message: '请填写真实企业名称', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'blur' }
                          ]">
                  <el-input v-model="form.customerC.cusName" placeholder="请填写真实企业名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="[customerC][socCrCode]" :rules="[
                            {required: true, message: '请填写统一社会信用代码', trigger: 'blur'},
                            {validator: socCrCodeValidator, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.customerC.socCrCode" placeholder="请填写统一社会信用代码" ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="isFINNER">
                <el-form-item label="所属核心企业" prop="focalComId">
                  <pl-remote-select v-model="form.focalComId"
                                    :params="{cusType: cusType['FOCAL_CO']}"
                                    :data-fun="getEntFun"
                                    lable-key="cusName"
                                    placeholder="选择所属核心企业"
                                    value-key="cusId"></pl-remote-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                <el-form-item label="机构英文名称" prop="[customerC][cusEnglishName]">
                  <el-input v-model="form.customerC.cusEnglishName" placeholder="请填写机构英文名称" ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="登记机关" prop="[customerC][registerDept]"  :rules="[
                            {required: true, message: '请填写登记机关', trigger: 'blur'}
                          ]">
                  <el-input v-model="form.customerC.registerDept" placeholder="请填写登记机关" ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="机构简称" prop="[customerC][cusAlias]"  :rules="[
                            {required: true, message: '请填写机构简称', trigger: 'blur'}
                          ]">
                  <el-input v-model="form.customerC.cusAlias" placeholder="请填写机构简称" ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="机构代码" prop="[customerC][cusCode]" :rules="[
                            {required: true, message: '请填写机构代码', trigger: 'blur'},
                            {validator: checkCusCode, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.customerC.cusCode" placeholder="请填写机构代码" ></el-input>
                </el-form-item>
              </el-col>

             <!-- <el-col :span="12">
                <el-form-item label="联系人" prop="[customerC][contactorName]" :rules="[
                            { required: true, message: '请填写客户的联系人姓名', trigger: 'blur' },
                            { max: 30, message: '字符长度不能超过30', trigger: 'blur' }
                          ]">
                  <el-input v-model="form.customerC.contactorName" placeholder="请填写客户的联系人姓名"></el-input>
                </el-form-item>
              </el-col>-->

              <el-col :span="12">
                <el-form-item label="法定代表人" prop="[customerC][lrName]" :rules="[
                            { required: true, message: '请填写法定代表人姓名', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'blur' }
                          ]">
                  <el-input v-model="form.customerC.lrName" placeholder="请填写法定代表人姓名"></el-input>
                </el-form-item>
              </el-col>

             <!-- <el-col :span="12">
                <el-form-item label="联系电话" prop="[customerC][contactorPhone]" :rules="[
                            { required: true, message: '请填写联系电话', trigger: 'blur' }
                          ]">
                  <el-input v-model="form.customerC.contactorPhone" placeholder="请填写联系电话"></el-input>
                </el-form-item>
              </el-col>-->

              <el-col :span="12">
                <el-form-item label="合作起始日期" prop="[customerC][cooperationStartDate]" :rules="[
                            { required: true, message: '请选择合作起始日期', trigger: 'blur' }
                          ]">
                  <pl-date-picker v-model="form.customerC.cooperationStartDate" placeholder="选择日期"></pl-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业地址" prop="[customerC][addressArr]" :rules="{
                    trigger: 'change', required: true, message: '请选择企业地址', type: 'array'
                  }">
                  <pl-city-select v-model="form.customerC.addressArr" :level="2"></pl-city-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="" label-width="5px" prop="[customerC][address]" :rules="[
                            { required: true, message: '请填写详细地址', trigger: 'blur' }
                          ]">
                  <el-input type="text-area" v-model="form.customerC.address" placeholder="请填写详细地址"></el-input>
                </el-form-item>
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
                <el-form-item label="管理员姓名" prop="[administrator][userName]" :rules="{
                  trigger: 'blur', required: true, message: '管理员姓名不能为空'
                }">
                  <el-input v-model="form.administrator.userName" placeholder="管理员的真实名称，可以是公司法人或相关业务人员"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="管理员手机号" :prop="'[administrator][phoneNo]'" :rules="[{
                    required: true, message: '手机号码不能为空', trigger: 'blur'
                  },{ validator: telephoneValidator, trigger: 'blur', userId: form.administrator.userId }]">
                  <el-input v-model="form.administrator.phoneNo" placeholder="管理员常用手机号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件类型" prop="[administrator][certType]" :rules="{
                    trigger: 'blur', required: true, message: '证件类型不能为空'
                  }">
                  <pl-dictionary-select type="id_type" invalidDics="id_type_5,id_type_6,id_type_7" v-model="form.administrator.certType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件号码" prop="[administrator][certNo]" :rules="[
                    { trigger: 'blur', required: true, message: '证件号码不能为空'},
                    { validator: certNoValidator, trigger: 'blur', certType: form.administrator.certType }
                  ]">
                  <el-input v-model="form.administrator.certNo" placeholder="请输入管理员证件号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="邮箱" prop="[administrator][email]" :rules="{
                    trigger: 'blur', validator: emailValidator
                  }">
                  <el-input v-model="form.administrator.email" placeholder="请输入管理员邮箱"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title v-if="isFINNER">账户信息</pl-content-box-title>
      <pl-content-box-block v-if="isFINNER">
        <pl-content-box-card-group>
        <pl-content-box-card v-for="(item, index) in form.acctUses" :key="formAcctUses" class="transfer-item">
          <div class="card-content">
            <el-row>

              <el-col :span="12">
                <el-form-item label="账户用途" :prop="'[acctUses]['+ index +'][useCode]'" :rules="[
                            { required: true, message: '请选择账户用途', trigger: 'change' },
                            { trigger: 'change', validator: acctUseValidator, accts: form.acctUses, currentIndex: index }
                          ]">
                  <pl-constant-select type="AccountConstants.AcctUse" :show-empty="false" v-model="item.useCode"></pl-constant-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="账号" :prop="'[acctUses]['+ index +'][acctNo]'" :rules="[
                            {required: true, message: '请填写银行账号', trigger: 'blur'},
                            {validator: bankNoValidator, trigger: 'blur'}
                          ]">
                  <!--<el-input v-model="item.acctNo" placeholder="请填写银行账号"></el-input>-->
                  <pl-autocomplete
                    popper-class="my-autocomplete"
                    v-model="item.acctNo"
                    :fetch-suggestions="querySearch"
                    placeholder="请填写银行账号"
                    style="width: 100%"
                    :itemIndex="index"
                    @select="handleSelect">
                    <template slot-scope="props">
                      <div class="name">{{ props.item.acctNo }}</div>
                    </template>
                  </pl-autocomplete>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户行" :prop="'[acctUses]['+ index +'][bankCode]'" :rules="[{ required: true, message: '请选择开户行', trigger: 'change' }]">
                  <pl-dictionary-select :show-empty="false" type="bank_brand" clearable v-model="item.bankCode"></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="账户名" :prop="'[acctUses]['+ index +'][acctName]'" :rules="[
                  {required: true, message: '请填写账户名', trigger: 'blur' }]">
                  <el-input v-model="item.acctName" placeholder="请填写账户名"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户网点" :prop="'[acctUses]['+ index +'][addressArr]'" :rules="{
                    trigger: 'change', required: true, message: '请选择省市', type: 'array'
                  }">
                  <pl-city-select v-model="item.addressArr" :level="2"></pl-city-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="10px" :prop="'[acctUses]['+ index +'][bankDot]'" :rules="{
                    trigger: 'blur', required: true, message: '请填写具体网点'
                  }">
                  <el-input v-model="item.bankDot" placeholder="请填写具体网点"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="index-num" >{{index + 1}}</div>
          <div class="del-btn" v-tooltip="'删除'" v-if="form.acctUses.length > 1" @click="delAcct(index)"><i class="el-icon-close"></i></div>
        </pl-content-box-card>
        </pl-content-box-card-group>
        <div class="add" @click="addAcct">
          <i class="el-icon-circle-plus"></i>&nbsp;添加账户
        </div>
      </pl-content-box-block>

    </el-form>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button icon=" anticon icon-arrowleft" @click="goBack">返回</el-button>
        <el-button type="primary" icon=" anticon icon-save" :loading="loading" @click="save" :disabled="loading">保存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>
</template>
<script>
  import { MsgType } from 'core/constants';
  import validators from 'core/utils/validators.js';
  import dictionaryUtil from 'core/utils/dictionary-util';
  import constantUtil from '../../../../core/utils/constant-util';
  export default {
    mixins: [validators],
    data () {
      return {
        form: {
          customerC: {},
          acctUses: [{
            useCode: '', // 账户用途
            acctNo: '', // 账号
            bankCode: '', // 开户行
            acctName: '', // 账户名
            addressArr: [], // 开户网点
            address: ''
          }],
          administrator: {},
          focalComId: ''
        },
        loading: false,
        getEntFun: this.$api.cust.customer.selectCustomerList,
        params: {},
        cusType: constantUtil.getConstantByKey('CustomerConstants.CusType')
      };
    },
    computed: {
      navTitle () {
        let action = this.params.cusId ? '编辑' : '新增';
        if (this.params.cusType === this.cusType['FINNER']) {
          return action + '保理公司';
        } else {
          return action + '核心企业';
        }
      },
      isFINNER () {
        return this.params.cusType === this.cusType['FINNER'];
      }
    },
    methods: {
      checkCusCode (rule, value, callback) {
        if (value) {
          if (!(/^\d{6}$/.test(value))) {
            callback(new Error('请输入6位数字!'));
          } else {
            this.$api.cust.customer.checkCusCode(this.form.customerC.cusId, this.form.customerC.cusCode).then(ret => {
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
      acctUseValidator (rule, value, callback) {
        if (value) {
          let rs = rule.accts.some((element, index, array) => {
            return (element.useCode === value && rule.currentIndex !== index);
          });
          if (rs) {
            callback(new Error('已存在该用途的账户!'));
          } else {
            callback();
          }
        } else {
          callback(new Error('请选择账户用途!'));
        }
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 设置客户省市
            this.form.customerC.province = this.form.customerC.addressArr[0];
            if (this.form.customerC.addressArr.length === 2) {
              this.form.customerC.city = this.form.customerC.addressArr[1];
            }
            // 设置账户省市
            if (this.isFINNER) {
              for (let i in this.form.acctUses) {
                this.form.acctUses[i].bankProvince = this.form.acctUses[i].addressArr[0];
                if (this.form.acctUses[i].addressArr.length === 2) {
                  this.form.acctUses[i].bankCity = this.form.acctUses[i].addressArr[1];
                }
                // 设置银行名称
                let dicItem = dictionaryUtil.getDic('bank_brand').children.filter(item => {
                  return (item.dicCode === this.form.acctUses[i].bankCode);
                });
                this.form.acctUses[i].bankName = dicItem[0].dicName;
              }
            }
            this.loading = true;
            this.$api.cust.operation.saveCooperationAgencyData(JSON.stringify(this.form)).then(ret => {
              if (MsgType.SUCCESS === ret.type) {
                this.goBack();
              } else {
                this.loading = false;
              }
            });
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
      addAcct () {
        let item = {
          useCode: '', // 账户用途
          acctNo: '', // 账号
          bankCode: '', // 开户行
          acctName: '', // 账户名
          addressArr: [], // 开户网点
          address: '',
          focalComId: ''
        };
        this.form.acctUses.push(item);
      },
      delAcct (index) {
        let acctUse = this.form.acctUses[index];
        if (acctUse.acctId) {
          this.$confirm('确认删除账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.cust.operation.deleteAcct(acctUse).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.form.acctUses.splice(index, 1);
              }
            });
          });
        } else {
          this.form.acctUses.splice(index, 1);
        }
      },
      goBack () {
        this.$router.push({ name: 'bsp.biz.cooperation-agency-mgt' });
      },
      querySearch (queryString, cb) {
        let restaurants = this.form.acctUses;
        let rs = [];
        restaurants.forEach((item, index) => {
          let flag = rs.some((rsItem, index) => {
            return rsItem.acctNo === item.acctNo;
          });

          if (!flag && item.acctNo.indexOf(queryString) > -1 && item.acctNo !== queryString) {
            rs.push(item);
          }
        });
        /* let rs = restaurants.filter((item, index) => {
          return (item.acctNo.indexOf(queryString) !== -1);
        }); */
        // 调用 callback 返回建议列表的数据
        cb(rs);
      },
      handleSelect (item, index) {
        let selectItem = {...item};
        selectItem.useCode = '';
        selectItem.acctId = '';
        this.form.acctUses[index] = selectItem;
      }
    },
    created () {
      this.params = this.$route.params;
      if (!this.params.cusType) {
        this.goBack();
      }
      this.form = {
        customerC: {},
        acctUses: [],
        administrator: {}
      };
      this.form.customerC.cusType = this.params.cusType;
      if (this.isFINNER) {
        this.addAcct();
      }
      if (this.$route.params.cusId) {
        this.$api.cust.operation.getCooperationAgencyVo({cusId: this.$route.params.cusId}).then(ret => {
          this.form = ret;
          this.form.customerC.addressArr = [];
          this.form.customerC.addressArr[0] = this.form.customerC.province;
          if (this.form.customerC.city) {
            this.form.customerC.addressArr[1] = this.form.customerC.city;
          }
          if (this.form.acctUses.length > 0) {
            for (let i in this.form.acctUses) {
              this.form.acctUses[i].addressArr = [];
              this.form.acctUses[i].addressArr[0] = this.form.acctUses[i].bankProvince;
              if (this.form.acctUses[i].bankCity) {
                this.form.acctUses[i].addressArr[1] = this.form.acctUses[i].bankCity;
              }
            }
          }
        });
      }
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

  .add{
    padding: 15px;
    border: 1px dashed $primary-color;
    margin-top: 10px;
    cursor: pointer;
    text-align: center;
    color: $primary-color;
    &:hover{
      background: $primary-color-light;
    }
  }

  .transfer-item {
     position: relative;
     padding: 15px 20px;
    .index-num{
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 30px;
      color: $primary-color;
    }
    .del-btn {
      border: 1px solid $danger-color;
      color: $danger-color;
      width: 31px;
      height: 31px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      font-size: 19px;
      padding: 0px 5px;
      right: -16px;
      top: calc(50% - 16px);
      background: $danger-color-light;;
      cursor: pointer;
      &:hover{
        color:#fff;
        background: $danger-color;
      }
    }
    .top-tip{
      background: $primary-color-light;
    }
  }
</style>
