<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <el-form label-width="120px" :model="form" ref="form">
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称" prop="cusName" :rules="[
                            { required: true, message: '请填写客户的真实企业名称', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
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
                  <pl-dictionary-select :show-empty="false" type="cus_type.cus_type_c" clearable v-model="form.cusType"></pl-dictionary-select>
                  <!--<pl-constant-select :show-empty="false" type="PubConstants.MemType" clearable v-model="form.cusType"></pl-constant-select>-->
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="上级机构" prop="prntName">
                  <el-input v-model="form.prntName" placeholder="请填写客户的上级机构,没有可不填"></el-input>
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
                <el-form-item label="上级机构编码" prop="prntCode" :rules="[
                            {required: false, message: '请填写上级机构编码', trigger: 'change'}
                          ]">
                  <el-input v-model="form.prntCode" placeholder="请填写客户的上级机构编码,没有可不填"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">
                <el-form-item label="客户状态">
                  <pl-content-item-text>正常</pl-content-item-text>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item label="组织机构代码" prop="orgCode" :rules="[
                            { required: false, message: '请填写客户的组织机构代码', trigger: 'blur' },
                            { max: 20, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.orgCode" placeholder="请填写客户的组织机构代码"></el-input>
                </el-form-item>
              </el-col>

              <!--  <el-col :span="12">
                  <el-form-item label="联系人" prop="contactorName" :rules="[
                              { required: true, message: '请填写客户的联系人姓名', trigger: 'change' },
                              { max: 30, message: '字符长度不能超过30', trigger: 'change' }
                            ]">
                    <el-input v-model="form.contactorName" placeholder="请填写客户的联系人姓名"></el-input>
                  </el-form-item>
                </el-col>-->

              <el-col :span="12">
                <el-form-item label="社会信用代码" prop="socCrCode" :rules="[
                            { required: true, message: '请填写客户的统一社会信用代码', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.socCrCode" placeholder="请填写客户的统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="12">
                 <el-form-item label="联系人证件类型" prop="certType" :rules="[{ required: true, message: '请选择联系人证件类型', trigger: 'change' }]">
                   <pl-dictionary-select type="id_type" v-model="form.certType" :showEmpty="false"></pl-dictionary-select>
                 </el-form-item>
               </el-col>-->

              <el-col :span="12">
                <el-form-item label="营业执照" prop="lisNo" :rules="[
                            { required: false, message: '请输入营业执照', trigger: 'change' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.lisNo" placeholder="请填写客户的营业执照"></el-input>
                </el-form-item>
              </el-col>

              <!--<el-col :span="12">
                <el-form-item label="联系人证件号码" prop="certNo" :rules="[
                  {required: true, message: '请填写证件号码', trigger: 'change' },{validator: checkcertNo, trigger: 'change'}]">
                  <el-input v-model="form.certNo" placeholder="联系人证件号码"></el-input>
                </el-form-item>
              </el-col>-->

            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>联系方式</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮政编码" prop="postCode" :rules="[
                            { min: 6, max: 6, required: true, message: '请输入6位邮政编码', trigger: 'change' }
                          ]">
                  <el-input v-model="form.postCode" placeholder="请填写邮政编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="17">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="固定电话" prop="areaCode" :rules="[{required: true, message: '请输入区号', trigger: 'change'},
                            {validator: checkareaCode, trigger: 'change'}]">
                      <el-input v-model="form.areaCode" placeholder="区号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="—" prop="telephone" label-width="40px" :rules="[{required: true, message: '请输入电话号码', trigger: 'change'},
                            {validator: checktelephone, trigger: 'change'}]">
                      <el-input v-model="form.telephone" placeholder="电话号码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="—" prop="phoneExt"  label-width="40px" :rules="[
                  {required: false, message: '请填写分机号', trigger: 'change' },
                  {pattern: /^\d{1,4}$/, message: '请填写正确的分机号', trigger: 'change'}
                  ]">
                      <el-input v-model="form.phoneExt" placeholder="分机号（选填）"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域" prop="area" :rules="[{ required: true, message: '请选择客户所在区域', trigger: 'blur' }]">
                  <pl-constant-select :show-empty="false" type="CustomerConstants.CusArea" clearable v-model="form.area"></pl-constant-select>
                </el-form-item>
              </el-col>


              <!-- <el-col :span="12">
                 <el-form-item label="联系人手机号" prop="contactorPhone" :rules="[
                             {required: true, message: '请输入电话号码', trigger: 'change'},
                             {validator: checkPhone, trigger: 'blur'}
                           ]">
                   <el-input v-model="form.contactorPhone" placeholder="请填写客户的联系人手机号"></el-input>
                 </el-form-item>
               </el-col>-->

              <el-col :span="12">
                <el-form-item label="企业地址" prop="addressArr"  :rules="[
                            { required: true, message: '请填写企业地址', trigger: 'blur', type: 'array'}
                          ]">
                  <pl-city-select v-model="form.addressArr" :level="2"></pl-city-select>
                </el-form-item>
              </el-col>

              <!--<el-col :span="24">-->
              <!--<el-form-item label="固定电话" prop="contactNo"   :rules="[{required: true, message: '请输入固定电话', trigger: 'change'},-->
              <!--{required: true, validator: checkTel, trigger: 'change'}]">-->
              <!--<el-input v-model="form.contactNo" placeholder="请填写客户的联系电话"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="24">
                <el-form-item label="详细地址" prop="address" :rules="[
                            { required: true, message: '请填写详细地址', trigger: 'blur' },
                            { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                          ]">
                  <el-input v-model="form.address" placeholder="请填写详细地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>联系人信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <div class="card-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="contactorName" :rules="[
                            { required: true, message: '请填写客户的联系人姓名', trigger: 'change' },
                            { max: 30, message: '字符长度不能超过30', trigger: 'change' }
                          ]">
                  <el-input v-model="form.contactorName" placeholder="请填写客户的联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人手机号" prop="contactorPhone" :rules="[
                            {required: true, message: '请输入电话号码', trigger: 'change'},
                            {validator: checkPhone, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.contactorPhone" placeholder="请填写客户的联系人手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人证件类型" prop="certType" :rules="[{ required: true, message: '请选择联系人证件类型', trigger: 'change' }]">
                  <pl-dictionary-select type="id_type" v-model="form.certType" :showEmpty="false"></pl-dictionary-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人证件号码" prop="certNo" :rules="[
                  {required: true, message: '请填写证件号码', trigger: 'change' },{validator: checkcertNo, trigger: 'change'}]">
                  <el-input v-model="form.certNo" placeholder="联系人证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <!--<pl-content-box-title>账户信息</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card class="account-card">
          <div class="account-item" v-for="(item, index) in form.accountInfo" >
            <el-row>
              <el-col :span="1">
                <pl-content-item-text class="text-center">
                  <span style="font-size: 20px;font-style: italic;">{{index + 1}}</span>
                </pl-content-item-text>
              </el-col>

              <el-col :span="10">
                <el-form-item label="业务用途" :key="'acctPurpose_'+ index" :prop="'accountInfo.' + index + '.purpose'" :rules="[
                                  { required: true, message: '请选择业务用途', trigger: 'change', type: 'array'}
                                ]">
                  <pl-dictionary-checkbox v-model="item.purpose" type='acct_purpose' style="margin-top: 8px;"></pl-dictionary-checkbox>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="账号" :key="'acctNo_'+ index" :prop="'accountInfo.' + index + '.acctNo'" :rules="[
                                  { required: true, message: '请输入账号', trigger: 'change' },
                                  { max: 30, message: '字符长度不能超过30', trigger: 'change' }
                                ]">
                  <pl-content-item-text v-if="item.existAcct === '1'">{{item.acctNo}}</pl-content-item-text>
                  <el-input v-else v-model="item.acctNo" placeholder="请输入账号"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" :offset="1">
              <el-form-item label="签约银行" :key="'fiNo_'+ index" :prop="'accountInfo.' + index + '.fiNo'" :rules="[
              { required: true, message: '请选择签约银行', trigger: 'change' }
              ]">
              <pl-content-item-text v-if="item.existAcct === '1'">{{item.fiNm}}</pl-content-item-text>
              <pl-dictionary-select v-else :show-empty="false" type="bank_brand" clearable v-model="item.fiNo"></pl-dictionary-select>
              &lt;!&ndash;<el-select  v-model="item.fiNo" clearable placeholder="请选择签约银行">
                <el-option v-for="bank in bankInfo" :key="bank.bankCode" :label="bank.bankBrand"  :value="bank.bankCode"></el-option>
              </el-select>&ndash;&gt;
              </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="账户名称" :key="'acctNm_'+ index" :prop="'accountInfo.' + index + '.acctNm'" :rules="[
                                  { required: true, message: '请输入账户名称', trigger: 'change' }
                                ]">
                  <pl-content-item-text v-if="item.existAcct === '1'">{{item.acctNm}}</pl-content-item-text>
                  <el-input  v-else v-model="item.acctNm" placeholder="请输入账户名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" :key="'existAcct_'+ index" :prop="'accountInfo.' + index + '.existAcct'">
                  <el-input v-model="item.existAcct" type="hidden"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" :key="'oldAcctNo_'+ index" :prop="'accountInfo.' + index + '.oldAcctNo'">
                  <el-input v-model="item.oldAcctNo" type="hidden"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="danger" style="margin-left: 10px;" native-type="button" v-if="index !== 0" @click="delItem(index)" class="el-icon-delete"></el-button>
            </el-row>
          </div>
          <div class="account-item add-item" @click="addItem">
            <i class="anticon icon-pluscircleo"></i>&nbsp;添加账户
          </div>
        </pl-content-box-card>
      </pl-content-box-block>-->
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
  let no = '';
  // let checkPhone = (rule, value, callback) => {
  //   if (!(/^1[34578]\d{9}$/.test(value))) {
  //     callback(new Error('请输入正确的手机号码!'));
  //   }
  //   callback();
  // };
  export default {
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
          area: '',
          certType: '',
          contactNo: '',
          areaCode: '',
          telephone: '',
          phoneExt: '',
          contactorName: '',
          contactorPhone: '',
          certNo: '',
          province: '',
          city: '',
          address: '',
          addressArr: [],
          acctInfo: '',
          deleteAcctNo: '',
          accountInfo: [{
            existAcct: '',
            oldAcctNo: '',
            acctNo: '',
            acctNm: '',
            purpose: [],
            fiNo: ''
          }]
        },
        loading: false,
        bankInfo: [{
          bankBrand: '',
          bankCode: ''
        }],
        phoneRules: []
      };
    },
    created () {
      no = '';
      let params = this.$route.params;
      if (params.id) {
        this.$api.bsp.customer.getCustomer(params.id).then(ret => {
          this.form = ret;
          let arr = this.form.contactNo.split('-');
          this.form.areaCode = arr[0];
          this.form.telephone = arr[1];
          this.form.phoneExt = arr[2];
          this.form.addressArr = [];
          this.form.addressArr.push(ret.province);
          if (this.form.city !== '') {
            this.form.addressArr.push(ret.city);
          }
//          let accountInfo = this.form.accountInfo;
//          if (accountInfo.length > 0) {
//            accountInfo.forEach(item => {
//              item.purpose = item.acctPurpose.split(',');
//            });
//          }
        });
      } else {
        this.goBack();
      }
    },
    methods: {
      checkcertNo (rule, value, callback) {
        switch (this.form.certType) {
          case 'id_type_1':
            if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_2':
            if (!(/^[a-zA-Z0-9]{5,17}$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_3':
            if (!(/^[HMChmc]{1}([0-9]{8,10})$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_4':
            if (!(/^[0-9]{8,10}$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          default:
            callback(new Error('请输入正确的证件号码'));
        }
      },
      checkareaCode (rule, value, callback) {
        if (!(/^\d{1,4}$/.test(value))) {
          callback(new Error('请输入正确的区号'));
        } else {
          callback();
        }
      },
      checkphoneExt (rule, value, callback) {
        if (!(/^\d{1,4}$/.test(value))) {
          callback(new Error('请输入正确的分机号'));
        } else {
          callback();
        }
      },
      checktelephone (rule, value, callback) {
        if (!(/^\d{1,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback();
        }
      },
      save () {
        let vm = this;
        vm.loading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.form.deleteAcctNo = no;
            vm.form.acctInfo = JSON.stringify(vm.form.accountInfo);
            if (this.form.phoneExt) {
              this.form.contactNo = `${this.form.areaCode}-${this.form.telephone}-${this.form.phoneExt}`;
            } else {
              this.form.contactNo = `${this.form.areaCode}-${this.form.telephone}`;
            }
            let obj = {...this.form};
            obj.province = this.form.addressArr[0];
            if (obj.addressArr.length === 2) {
              obj.city = this.form.addressArr[1];
            }
            delete obj.addressArr;
            delete obj.accountInfo;
            delete obj.areaCode;
            delete obj.telephone;
            delete obj.phoneExt;
            this.loading = true;
            this.$api.bsp.customer.updateCustomer(obj).then(ret => {
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
      addItem () {
        let item = {
          acctNo: '',
          acctNm: '',
          existAcct: '',
          oldAcctNo: '',
          purpose: [],
          fiNo: ''
        };
        this.form.accountInfo.push(item);
      },
      delItem (index) {
        if (this.form.accountInfo[index].existAcct) {
          let obj = {};
          obj = this.form.accountInfo;
          no = obj[index].acctNo + ',' + no;
          // console.log(no);
        }
        this.form.accountInfo.splice(index, 1);
      },
      goBack () {
        this.$router.push({ name: 'bsp.biz.customer' });
      },
      checkTel (rule, value, callback) {
        if (value) {
          if (!(/^(0\d{2,3})-(\d{7,8})(-(\d{3,4}))?$/.test(value))) {
            callback(new Error('请输入正确的电话号码,如020-8888888'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      checkCusCode (rule, value, callback) {
        if (value) {
          if (!(/^\d{6}$/.test(value))) {
            callback(new Error('请输入6位数字!'));
          } else {
            this.$api.bsp.customer.checkCusCode(this.form.cusId, this.form.cusCode).then(ret => {
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
      checkOrganCode (rule, value, callback) {
        if (value) {
          this.$api.bsp.customer.checkOrganCode(this.form.prntCode).then(ret => {
            if (MsgType.ERROR === ret.type) {
              callback(new Error(ret.msg));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      },
      checkNum (rule, value, callback) {
        if (value) {
          if (!(/^\d*$/.test(value))) {
            callback(new Error('请输入数字!'));
          } else {
            callback();
          }
        }
        callback();
      },
      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码!'));
        } else {
          this.$api.bsp.customer.checkPhoneNo(this.form.contactorPhone, this.form.cusId).then(ret => {
            if (ret) {
              callback(new Error('该手机号码已存在，请修改手机号码。'));
            } else {
              callback();
            }
          });
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../assets/scss/variables";
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
