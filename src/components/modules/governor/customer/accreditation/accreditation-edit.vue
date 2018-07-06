<template>
  <pl-content-box>
    <el-form label-width="160px" ref="accreditationForm" class="accreditationForm" :model="accreditationForm">
      <pl-content-box-title @click.native="toggle('1')">
        企业基本信息
        <span slot="toolbar">
          <i class="el-icon-arrow-right" :class="{'down': arrowDown1}" ></i>
        </span>
      </pl-content-box-title>
      <pl-content-box-block v-show="arrowDown1" :fixed-width="false">
        <pl-content-box-card-group>
          <pl-content-box-card class="card">
            <el-row class="card-content">
              <el-col :span="12">
                <el-form-item label="企业名称" prop="[customerC][cusName]"  :rules="{
                  trigger: 'blur', required: true, message: '企业名称不能为空'
                }" >
                  <el-input v-model="accreditationForm.customerC.cusName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件类型" prop="[customerC][idType]"  :rules="{
                    trigger: 'blur', required: true, message: '证件类型不能为空'
                  }" >
                  <pl-dictionary-select type="id_type" style="width: 100%;" invalidDics="id_type_1,id_type_2,id_type_3,id_type_4" v-model="accreditationForm.customerC.idType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="[customerC][socCrCode]"  v-if="accreditationForm.customerC.idType === 'id_type_5'" :rules="[
                    { required: true, message: '统一社会信用代码不能为空', trigger: 'blur' },
                    { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' },
                    { validator: socCrCodeValidator, trigger: 'blur' }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.socCrCode" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="营业执照号码" prop="[customerC][lisNo]"  v-if="accreditationForm.customerC.idType === 'id_type_6'" :rules="{
                    trigger: 'blur', required: true, message: '营业执照号码不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.lisNo" placeholder="请输入营业执照号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="组织机构代码" prop="[customerC][orgCode]"  v-if="accreditationForm.customerC.idType === 'id_type_6'" :rules="{
                    trigger: 'blur', required: true, message: '组织机构代码不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.orgCode" placeholder="请输入组织机构代码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证照名称" prop="[customerC][idName]"  v-if="accreditationForm.customerC.idType === 'id_type_7'" :rules="{
                    trigger: 'blur', required: true, message: '证照名称不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.idName" placeholder="请输入证照名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证照号码" prop="[customerC][idNo]"  v-if="accreditationForm.customerC.idType === 'id_type_7'" :rules="[
                    { trigger: 'blur', required: true, message: '证照号码不能为空'},
                    { validator: certNoValidator, trigger: 'blur', certType: accreditationForm.customerC.certType }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.idNo" placeholder="请输入证照号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东姓名"  prop="[customerC][lrName]" :rules="{
                  trigger: 'blur', required: true, message: '法人/股东姓名不能为空'
                }" >
                  <el-input v-model="accreditationForm.customerC.lrName" placeholder="请输入法人/股东姓名"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东证件类型"  prop="[customerC][lrIdType]" :rules="{
                    trigger: 'blur', required: true, message: '法人/股东证件类型不能为空'
                  }" >
                  <pl-dictionary-select type="id_type" style="width: 100%;" invalidDics="id_type_5,id_type_6,id_type_7" v-model="accreditationForm.customerC.lrIdType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东证件号码"  prop="[customerC][lrLisNo]" :rules="[
                    { trigger: 'blur', required: true, message: '法人/股东证件号码不能为空'},
                    { validator: certNoValidator, trigger: 'blur', certType: accreditationForm.customerC.lrIdType }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.lrLisNo" placeholder="请输入法人/股东证件号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业地址"  prop="[customerC][addressArr]" :rules="{
                    trigger: 'blur', required: true, message: '企业地址不能为空', type: 'array'
                  }">
                  <pl-city-select v-model="accreditationForm.customerC.addressArr" :level="2" style="width: 80%;"></pl-city-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="[customerC][address]"  label="详细地址" :rules="{
                    trigger: 'blur', required: true, message: '详细地址不能为空'
                  }">
                  <el-input
                    placeholder="详细地址"
                    v-model="accreditationForm.customerC.address">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </pl-content-box-card>

          <pl-content-box-card class="bg-color-light card-padding">
            <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.basicInfoAprvRs !== '0'}">
              <pl-content-item-text>
                  <span v-if="latestCusOpt.basicInfoAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
              </pl-content-item-text>
            </el-form-item>
            <el-form-item v-if="latestCusOpt.basicInfoAprvRs !== '0'">
              <span slot="label">原&emsp;&emsp;因：</span>
              <span v-tooltip="latestCusOpt.basicInfoAprvRemark">
                  {{latestCusOpt.basicInfoAprvRemark}}
              </span>
            </el-form-item>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>

      <pl-content-box-title @click.native="toggle('2')">
        银行企业账户
        <span slot="toolbar">
          <i class="el-icon-arrow-right" :class="{'down': arrowDown2}"></i>
        </span>
      </pl-content-box-title>

      <pl-content-box-block v-show="arrowDown2" :fixed-width="false">
        <pl-content-box-card-group>
          <pl-content-box-card class="card">
            <el-row class="card-content">
              <el-col :span="12">
                <el-form-item label="银行账号"  prop="[pubCusAcct][acctNo]" :rules="{
                    trigger: 'blur', required: true, message: '银行账号不能为空'
                  }" >
                  <el-input v-model="accreditationForm.pubCusAcct.acctNo" tips="请输入银行账号" placeholder="请输入企业真实的银行账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账户名称"  prop="[pubCusAcct][acctName]" :rules="{
                    trigger: 'blur', required: true, message: '账户名称不能为空'
                  }" >
                  <el-input v-model="accreditationForm.pubCusAcct.acctName" tips="请输入账户名称" placeholder="请输入账户名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户行" :prop="'[pubCusAcct][bankCode]'" :rules="[{ required: true, message: '请选择开户行', trigger: 'change' }]">
                  <pl-dictionary-select :show-empty="false" type="bank_brand" clearable v-model="accreditationForm.pubCusAcct.bankCode"></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户网点" :prop="'[pubCusAcct][addressArr]'" :rules="{
                    trigger: 'change', required: true, message: '请选择开户网点省市', type: 'array'
                  }">
                  <pl-city-select v-model="accreditationForm.pubCusAcct.addressArr" :level="2" style="width: 80%;"></pl-city-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="[pubCusAcct][bankDot]" label="具体网点" :rules="{
                    trigger: 'change', required: true, message: '具体网点不能为空'
                  }">
                  <el-input
                    placeholder="具体网点"
                    v-model="accreditationForm.pubCusAcct.bankDot">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </pl-content-box-card>
          <pl-content-box-card class="bg-color-light card-padding">
            <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.bankAprvRs !== '0'}">
              <pl-content-item-text>
                  <span v-if="latestCusOpt.bankAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
              </pl-content-item-text>
            </el-form-item>
            <el-form-item v-if="latestCusOpt.bankAprvRs !== '0'">
              <span slot="label">原&emsp;&emsp;因：</span>
              <span v-tooltip="latestCusOpt.bankAprvRemark">
                  {{latestCusOpt.bankAprvRemark}}
              </span>
            </el-form-item>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>

      <pl-content-box-title @click.native="toggle('3')">
        企业用户信息
        <span slot="toolbar">
          <i class="el-icon-arrow-right" :class="{'down': arrowDown3}"></i>
        </span>
      </pl-content-box-title>

      <pl-content-box-block v-show="arrowDown3" :fixed-width="false">
        <el-table
          :data="users"
          border
          :style="{'max-width': maxWidth + 'px', 'width': maxWidth + 'px'}"
          stripe>
          <el-table-column  label="用户类型" width="100">
            <template scope="scope">
              <span >{{ scope.row.userId === accreditationForm.customerC.contactorId ? '管理员' : '操作员'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="phoneNo" label="手机号" width="140">
          </el-table-column>

          <el-table-column  label="证件类型" prop="certType" width="130">
            <template scope="scope">
              <span >{{ scope.row.certType | dictionary('id_type')}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="证件号码" prop="certNo" width="260">
          </el-table-column>

          <el-table-column  prop="email" label="邮箱" width="160"></el-table-column>

          <el-table-column   label="操作" fixed="right" align="center" header-align="center">
            <template scope="scope">
              <el-button-group>
                  <el-button size="mini" icon=" el-icon-edit" v-tooltip:hover.top="'修改'"
                              @click="handleEdit(scope.row, scope.$index)">修改</el-button><!-- 修改 -->
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <pl-content-box-card-group style="margin-top: -1px;">
          <pl-content-box-card class="bg-color-light card-padding">
            <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.userAprvRs !== '0'}">
              <pl-content-item-text>
                  <span v-if="latestCusOpt.userAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
              </pl-content-item-text>
            </el-form-item>
            <el-form-item v-if="latestCusOpt.userAprvRs !== '0'">
              <span slot="label">原&emsp;&emsp;因：</span>
              <span v-tooltip="latestCusOpt.userAprvRemark">
                  {{latestCusOpt.userAprvRemark}}
              </span>
            </el-form-item>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>

      <pl-content-box-title @click.native="toggle('4')">
        企业证照资料
        <span slot="toolbar">
          <i class="el-icon-arrow-right" :class="{'down': arrowDown4}"></i>
        </span>
      </pl-content-box-title>

      <pl-content-box-block v-show="arrowDown4"  :fixed-width="false">
        <el-table
          :data="files"
          border
          stripe
          :style="{'max-width': maxWidth + 'px', 'width': maxWidth + 'px'}"
          :show-header="false">
          <el-table-column prop="name" width="160" align="center">
          </el-table-column>

          <el-table-column>
            <template scope="scope">
              <pl-upload-file show-type="vertical" v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']" v-model="accreditationForm.companyCertificate" class="fileupload" save-path="accreditation" :file-type="scope.row.fileType" :relateId="accreditationForm.customerC.cusId"></pl-upload-file>
              <pl-upload-file show-type="vertical" v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']" v-model="accreditationForm.legalCertificate" class="fileupload" save-path="accreditation" :file-type="scope.row.fileType" :relateId="accreditationForm.customerC.cusId"></pl-upload-file>
              <pl-upload-file show-type="vertical" v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']" v-model="accreditationForm.userCertificate" class="fileupload" save-path="accreditation" :file-type="scope.row.fileType" :relateId="accreditationForm.customerC.cusId"></pl-upload-file>
              <pl-upload-file show-type="vertical" v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']" v-model="accreditationForm.bankCertificate" class="fileupload" save-path="accreditation" :file-type="scope.row.fileType" :relateId="accreditationForm.customerC.cusId"></pl-upload-file>
            </template>
          </el-table-column>

          <el-table-column width="400" class-name="bg-color-light table-opt-border-left">
            <template scope="scope">
              <div v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']">
                <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.licenceAprvRs !== '0'}">
                  <pl-content-item-text>
                      <span v-if="latestCusOpt.licenceAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                  </pl-content-item-text>
                </el-form-item>
                <el-form-item v-if="latestCusOpt.licenceAprvRs !== '0'">
                  <span slot="label">原&emsp;&emsp;因：</span>
                  <pl-content-item-text v-tooltip="latestCusOpt.licenceAprvRemark">
                      {{latestCusOpt.licenceAprvRemark}}
                  </pl-content-item-text>
                </el-form-item>
              </div>

              <div v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']">
                <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.lrAprvRs !== '0'}">
                  <pl-content-item-text>
                      <span v-if="latestCusOpt.lrAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                  </pl-content-item-text>
                </el-form-item>
                <el-form-item v-if="latestCusOpt.lrAprvRs !== '0'" >
                  <span slot="label">原&emsp;&emsp;因：</span>
                  <pl-content-item-text v-tooltip="latestCusOpt.lrAprvRemark">
                      {{latestCusOpt.lrAprvRemark}}
                  </pl-content-item-text>
                </el-form-item>
              </div>

              <div v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']">
                <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.userCerAprvRs !== '0'}">
                  <pl-content-item-text>
                      <span v-if="latestCusOpt.userCerAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                  </pl-content-item-text>
                </el-form-item>
                <el-form-item v-if="latestCusOpt.userCerAprvRs !== '0'">
                  <span slot="label">原&emsp;&emsp;因：</span>
                  <pl-content-item-text v-tooltip="latestCusOpt.userCerAprvRemark">
                      {{latestCusOpt.userCerAprvRemark}}
                  </pl-content-item-text>
                </el-form-item>
              </div>

              <div v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']">
                <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.bankCerAprvRs !== '0'}">
                  <pl-content-item-text>
                      <span v-if="latestCusOpt.bankCerAprvRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                  </pl-content-item-text>
                </el-form-item>
                <el-form-item v-if="latestCusOpt.bankCerAprvRs !== '0'" >
                  <span slot="label">原&emsp;&emsp;因：</span>
                  <pl-content-item-text v-tooltip="latestCusOpt.bankCerAprvRemark">
                      {{latestCusOpt.bankCerAprvRemark}}
                  </pl-content-item-text>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </pl-content-box-block>
    </el-form>
   <!-- <pl-content-box-block>-->
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" @click="resubmit" :loading="loading">重新提交</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
   <!-- </pl-content-box-block>-->
    <user-edit ref="userEdit" @save="saveUser"></user-edit>
  </pl-content-box>
</template>
<script>
import constantUtil from 'core/utils/constant-util';
import userEdit from './user-edit';
import validators from 'core/utils/validators.js';
import dicUtils from 'core/utils/dictionary-util.js';

export default {
  props: ['contactorId', 'cusId'],
  mixins: [validators],
  data () {
    return {
      accreditationForm: {
        customerC: {}, // 客户信息
        pubCusAcct: {}, // 银行账号信息
        operators: [], // 操作员信息
        administrator: {} // 管理员
      }, // 提交认证数据
      latestCusOpt: {}, // 最新一条审批结果
      users: [],
      files: [],
      FileCls: constantUtil.getConstantByKey('PubConstants.FileCls'),
      BizCode: constantUtil.getConstantByKey('CustomerConstants.CusBizCode'),
      loading: false,
      activeNames: [],
      maxWidth: '900'
    };
  },
  methods: {
    resubmit () {
      this.$refs.accreditationForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 重新拆分管理员和操作员
          this.accreditationForm.administrator = this.users.filter((item, index) => {
            if (item.userId === this.accreditationForm.customerC.contactorId) {
              return item;
            } else {
              this.accreditationForm.operators.push(item);
            }
          })[0];
          // 省市地址赋值
          this.accreditationForm.customerC.province = this.accreditationForm.customerC.addressArr[0];
          this.accreditationForm.customerC.city = this.accreditationForm.customerC.addressArr[1];
          // 设置银行名称
          let dicItem = dicUtils.getDic('bank_brand').children.filter(item => {
            return (item.dicCode === this.accreditationForm.pubCusAcct.bankCode);
          });
          this.accreditationForm.pubCusAcct.bankName = dicItem[0].dicName;
          // 设置开户网点省市
          this.accreditationForm.pubCusAcct.bankProvince = this.accreditationForm.pubCusAcct.addressArr[0];
          this.accreditationForm.pubCusAcct.bankCity = this.accreditationForm.pubCusAcct.addressArr[1];
          // 保存数据
          this.$api.bsp.accreditation.saveAccreditationData(JSON.stringify(this.accreditationForm)).then(ret => {
            setTimeout(() => {
              this.loading = false;
              if (ret.type === 'success') {
                this.$router.push({name: 'bsp.accreditation.step'});
              }
            }, 800);
          });
        } else {
          return false;
        }
      });
    },
    saveUser (user, index) {
      this.users.splice(index, 1, user);
      this.$refs.pageTable.reload();
    },
    toggle (blockIndex) {
      let contains = false;
      this.activeNames.forEach((item, index) => {
        if (item === blockIndex) {
          this.activeNames.splice(index, 1);
          contains = true;
        }
      });
      if (!contains) {
        this.activeNames.push(blockIndex);
      }
    },
    queryData (contactorId, cusId) {
      this.$api.bsp.accreditation.getAccreditationData({'contactorId': contactorId, 'cusId': cusId}).then(ret => {
        this.accreditationForm = ret;
        this.accreditationForm.customerC.addressArr = [this.accreditationForm.customerC.province];
        if (this.accreditationForm.customerC.city) {
          this.accreditationForm.customerC.addressArr.push(this.accreditationForm.customerC.city);
        }
        // 省市地址赋值
        this.accreditationForm.pubCusAcct.addressArr = [this.accreditationForm.pubCusAcct.bankProvince];
        if (this.accreditationForm.pubCusAcct.bankCity) {
          this.accreditationForm.pubCusAcct.addressArr.push(this.accreditationForm.pubCusAcct.bankCity);
        }
        // 合并管理员和操作员,方便遍历
        this.accreditationForm.operators.forEach((item, index) => {
          this.users.push(item);
        });
        this.users.unshift(this.accreditationForm.administrator);
        // 组装附件数组
        let FileCls = constantUtil.getConstant('PubConstants.FileCls');
        for (let i in FileCls) {
          this.files.push({'name': FileCls[i], 'fileType': i});
        }
      });
      // 查询最新的审批意见
      this.$api.bsp.accreditation.getLatestOpt({'cusId': cusId}).then(ret => {
        this.latestCusOpt = ret;
        if (ret.basicInfoAprvRs === '1') {
          this.activeNames.push('1');
        }
        if (ret.bankAprvRs === '1') {
          this.activeNames.push('2');
        }
        if (ret.userAprvRs === '1') {
          this.activeNames.push('3');
        }
        if (ret.licenceAprvRs === '1' || ret.lrAprvRs === '1' || ret.bankCerAprvRs === '1' || ret.userCerAprvRs === '1') {
          this.activeNames.push('4');
        }
      });
    },
    handleEdit (user, index) {
      this.$refs.userEdit.show(user, index);
    }
  },
  created () {
    // 取容器的宽度作为table的最大宽度
    this.maxWidth = window.document.querySelector('.layout-contianer.accreditation-main').clientWidth - 90;
    let params = this.$route.params;
    if (params.contactorId && params.cusId) {
      this.queryData(params.contactorId, params.cusId);
    } else if (this.contactorId && this.cusId) {
      this.queryData(this.contactorId, this.cusId);
    } else {
      this.callback();
    }
  },
  components: {
    userEdit
  },
  computed: {
    arrowDown1 () {
      let rs = this.activeNames.some((item, index) => {
        return item === '1';
      });
      return rs;
    },
    arrowDown2 () {
      let rs = this.activeNames.some((item, index) => {
        return item === '2';
      });
      return rs;
    },
    arrowDown3 () {
      let rs = this.activeNames.some((item, index) => {
        return item === '3';
      });
      return rs;
    },
    arrowDown4 () {
      let rs = this.activeNames.some((item, index) => {
        return item === '4';
      });
      return rs;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../../assets/scss/variables";
  @import "../../../../../assets/scss/mixin";
  .success.el-badge{
    .el-badge__content{
      background-color: #67c23a;
    }
  }
  .accreditationForm.el-form{
    .el-collapse{
      .el-collapse-item__header{
        padding: 0 $context-header-x-padding;
        line-height: 44px;
        height: 44px;
        font-size: 17px;
        .el-collapse-item__arrow{
          line-height: 44px;
          height: 44px;
        }
      }
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";

.el-icon-arrow-right{
  transition: all 0.5s;
  &.down{
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}

.text-left {
  text-align: left;
}

.no-bottom-margin{
  margin-bottom: 0;
}

.text-right {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 20px;
}

.card{
  width: 100%;
}

.card-content {
  max-width: 880px;
  margin: 0px auto;
  padding-right: 40px;
}

.card-padding{
  padding: 5px;
}
.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}

.opt{
  display: flex;
  .left {
    width: 350px;
  }
  .right {
    flex: 1;
    padding: 0px 20px 20px 10px;
    position: relative;
    .el-form-item {
      &.is-error {
        .el-input{
          &:before{
            border-right-color: $danger-color;
          }
        }
      }
      &.is-success{
        .el-input{
          &:before{
            border-right-color: $success-color;
          }
        }
      }
      .el-input:focus{
        &:before{
          border-right-color: $primary-color;
        }
      }
      .el-input:hover{
        &:before{
          border-right-color: #b4bccc;
        }
      }
      .el-input{
        width: 100%;
        &:before{
          content: '';
          position: absolute;
          border-width: 8px 8px 8px 0px;
          border-color: transparent #ddd transparent transparent;
          border-style: solid;
          top:10px;
          left: -8px;
        }
        &:after{
          content: '';
          position: absolute;
          border-width: 8px 8px 8px 0px;
          border-color: transparent #fff transparent transparent;
          border-style: solid;
          top:10px;
          left: -7px;
        }
      }
    }
  }
}
</style>



