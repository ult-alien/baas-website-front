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
                  <el-input v-model="accreditationForm.customerC.cusName" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入企业名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件类型" prop="[customerC][idType]"  :rules="{
                    trigger: 'blur', required: true, message: '证件类型不能为空'
                  }" >
                  <pl-dictionary-select type="ent_id_type" :disabled="latestCusOpt.basicInfoAprvRs === '0'" style="width: 100%;" invalidDics="id_type_1,id_type_2,id_type_3,id_type_4" v-model="accreditationForm.customerC.idType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="[customerC][socCrCode]"  v-if="accreditationForm.customerC.idType === 'id_type_5'" :rules="[
                    { required: true, message: '统一社会信用代码不能为空', trigger: 'blur' },
                    { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' },
                    { validator: socCrCodeValidator, trigger: 'blur' }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.socCrCode" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="营业执照号码" prop="[customerC][lisNo]"  v-if="accreditationForm.customerC.idType === 'id_type_6'" :rules="{
                    trigger: 'blur', required: true, message: '营业执照号码不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.lisNo" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入营业执照号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="组织机构代码" prop="[customerC][orgCode]"  v-if="accreditationForm.customerC.idType === 'id_type_6'" :rules="{
                    trigger: 'blur', required: true, message: '组织机构代码不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.orgCode" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入组织机构代码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证照名称" prop="[customerC][idName]"  v-if="accreditationForm.customerC.idType === 'id_type_7'" :rules="{
                    trigger: 'blur', required: true, message: '证照名称不能为空'
                  }" >
                  <el-input v-model="accreditationForm.customerC.idName" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入证照名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证照号码" prop="[customerC][idNo]"  v-if="accreditationForm.customerC.idType === 'id_type_7'" :rules="[
                    { trigger: 'blur', required: true, message: '证照号码不能为空'},
                    { validator: certNoValidator, trigger: 'blur', certType: accreditationForm.customerC.certType }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.idNo" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入证照号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东姓名"  prop="[customerC][lrName]" :rules="{
                  trigger: 'blur', required: true, message: '法人/股东姓名不能为空'
                }" >
                  <el-input v-model="accreditationForm.customerC.lrName" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入法人/股东姓名"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东证件类型"  prop="[customerC][lrIdType]" :rules="{
                    trigger: 'blur', required: true, message: '法人/股东证件类型不能为空'
                  }" >
                  <pl-dictionary-select type="id_type" style="width: 100%;" :disabled="latestCusOpt.basicInfoAprvRs === '0'" invalidDics="id_type_5,id_type_6,id_type_7" v-model="accreditationForm.customerC.lrIdType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="法人/股东证件号码"  prop="[customerC][lrLisNo]" :rules="[
                    { trigger: 'blur', required: true, message: '法人/股东证件号码不能为空'},
                    { validator: certNoValidator, trigger: 'blur', certType: accreditationForm.customerC.lrIdType }
                  ]" >
                  <el-input v-model="accreditationForm.customerC.lrLisNo" :disabled="latestCusOpt.basicInfoAprvRs === '0'" placeholder="请输入法人/股东证件号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业地址"  prop="[customerC][addressArr]" :rules="{
                    trigger: 'blur', required: true, message: '企业地址不能为空', type: 'array'
                  }">
                  <pl-city-select v-model="accreditationForm.customerC.addressArr" :disabled="latestCusOpt.basicInfoAprvRs === '0'" :level="2" style="width: 80%;"></pl-city-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="[customerC][address]"  label="详细地址" :rules="{
                    trigger: 'blur', required: true, message: '详细地址不能为空'
                  }">
                  <el-input
                    placeholder="详细地址" :disabled="latestCusOpt.basicInfoAprvRs === '0'"
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
                <el-form-item label="银行账号"  prop="[cusAcct][acctNo]" :rules="{
                    trigger: 'blur', required: true, message: '银行账号不能为空'
                  }" >
                  <el-input v-model="accreditationForm.cusAcct.acctNo" :disabled="latestCusOpt.bankAprvRs === '0'" tips="请输入银行账号" placeholder="请输入企业真实的银行账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账户名称"  prop="[cusAcct][acctName]" :rules="{
                    trigger: 'blur', required: true, message: '账户名称不能为空'
                  }" >
                  <el-input v-model="accreditationForm.cusAcct.acctName" :disabled="latestCusOpt.bankAprvRs === '0'" tips="请输入账户名称" placeholder="请输入账户名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户行" :prop="'[cusAcct][bankCode]'" :rules="[{ required: true, message: '请选择开户行', trigger: 'change' }]">
                  <pl-dictionary-select :show-empty="false" type="bank_brand" :disabled="latestCusOpt.bankAprvRs === '0'" clearable v-model="accreditationForm.cusAcct.bankCode"></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开户网点" :prop="'[cusAcct][addressArr]'" :rules="{
                    trigger: 'change', required: true, message: '请选择开户网点省市', type: 'array'
                  }">
                  <pl-city-select v-model="accreditationForm.cusAcct.addressArr" :disabled="latestCusOpt.bankAprvRs === '0'" :level="2" style="width: 80%;"></pl-city-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="[cusAcct][bankDot]" label="具体网点" :rules="{
                    trigger: 'change', required: true, message: '具体网点不能为空'
                  }">
                  <el-input
                    placeholder="具体网点"
                    :disabled="latestCusOpt.bankAprvRs === '0'"
                    v-model="accreditationForm.cusAcct.bankDot">
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
            <template slot-scope="scope">
              <span >{{ scope.row.userId === accreditationForm.customerC.contactorId ? '管理员' : '操作员'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="phoneNo" label="手机号" width="140">
          </el-table-column>

          <el-table-column  label="证件类型" prop="certType" width="130">
            <template slot-scope="scope">
              <span >{{ scope.row.certType | dictionary('id_type')}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="证件号码" prop="certNo" width="260">
          </el-table-column>

          <el-table-column  prop="email" label="邮箱" width="160"></el-table-column>

          <el-table-column   label="操作" fixed="right" align="center" header-align="center">
            <template slot-scope="scope">
              <el-button-group>
                  <el-button size="mini" icon=" el-icon-edit" :disabled="latestCusOpt.userAprvRs === '0'" v-tooltip:hover.top="'修改'"
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
            <template slot-scope="scope">
              <pl-upload-file
                show-type="vertical"
                v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']"
                v-model="accreditationForm.companyCertificate"
                class="fileupload"
                :api="scope.row.api"
                save-path="accreditation" 
                :file-type="scope.row.fileType"
                :relateId="scope.row.relateId"
                :isEdit="scope.row.isEdit"></pl-upload-file>

              <pl-upload-file
                show-type="vertical"
                v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']"
                v-model="accreditationForm.legalCertificate"
                class="fileupload"
                :api="scope.row.api"
                save-path="accreditation" 
                :file-type="scope.row.fileType"
                :relateId="scope.row.relateId"
                :isEdit="scope.row.isEdit"></pl-upload-file>
              <pl-upload-file
                show-type="vertical"
                v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']"
                v-model="accreditationForm.bankCertificate"
                class="fileupload"
                :api="scope.row.api"
                save-path="accreditation" 
                :file-type="scope.row.fileType"
                :relateId="scope.row.relateId"
                :isEdit="scope.row.isEdit"></pl-upload-file>

              <div  v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']">
                <span v-if="accreditationForm.operators && accreditationForm.operators.length > 0">
                  管理员{{accreditationForm.administrator.userName}}的证照
                </span>
                <pl-upload-file
                  show-type="vertical"
                  v-model="accreditationForm.administrator.certFileIds"
                  class="fileupload"
                  :api="scope.row.api"
                  save-path="accreditation"
                  :file-type="scope.row.fileType"
                  :relateId="accreditationForm.administrator.userId"
                  :isEdit="latestCusOpt.userCerAprvRs !== '0' && !accreditationForm.administrator.userCount"></pl-upload-file>
                <div v-for=" item in accreditationForm.operators" v-if="accreditationForm.operators && accreditationForm.operators.length > 0">
                  <span>操作员{{item.userName}}的证照</span>
                  <pl-upload-file
                    show-type="vertical"
                    v-model="item.certFileIds"
                    class="fileupload"
                    :api="scope.row.api"
                    save-path="accreditation"
                    :file-type="scope.row.fileType"
                    :relateId="item.userId"
                    :isEdit="latestCusOpt.userCerAprvRs !== '0' && !item.userCount"></pl-upload-file>
                </div>
              </div>
              <pl-upload-file
                show-type="vertical"
                v-if="scope.row.fileType === FileCls['CUS_AUTH']"
                v-model="accreditationForm.administrator.authFileIds"
                class="fileupload"
                :api="scope.row.api"
                save-path="accreditation" 
                :file-type="scope.row.fileType"
                :relateId="scope.row.relateId"
                :isEdit="scope.row.isEdit"></pl-upload-file>
            </template>
          </el-table-column>

          <el-table-column width="400" class-name="bg-color-light table-opt-border-left">
            <template slot-scope="scope">
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

              <div v-if="scope.row.fileType === FileCls['CUS_AUTH']">
                <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.cusAuthRs !== '0'}">
                  <pl-content-item-text>
                      <span v-if="latestCusOpt.cusAuthRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                  </pl-content-item-text>
                </el-form-item>
                <el-form-item v-if="latestCusOpt.cusAuthRs !== '0'" >
                  <span slot="label">原&emsp;&emsp;因：</span>
                  <pl-content-item-text v-tooltip="latestCusOpt.cusAuthRemark">
                      {{latestCusOpt.cusAuthRemark}}
                  </pl-content-item-text>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </pl-content-box-block>

      <div v-if="showContract">
        <pl-content-box-title @click.native="toggle('5')">
          邮寄资料（如果修改了信息，请重新生成邮寄资料并下载盖章邮寄）
          <span slot="toolbar">
            <i class="el-icon-arrow-right" :class="{'down': arrowDown5}"></i>
          </span>
        </pl-content-box-title>
        <pl-content-box-block v-show="arrowDown5" :fixed-width="false">
          <pl-content-box-card-group style="margin-top: -1px;">
            <pl-content-box-card>
              <p>
                请按提示准备以下材料，邮寄至 {{postInfo.address}}，{{postInfo.name}}收，联系电话：{{postInfo.phone}}
              </p>
              <ul class="post-list">
                <li v-if="accreditationFiles[contractOpen]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务用户开户声明书，1份，加盖公章和法人签章&ensp;<span class="link" v-loading="CONTRACT_OPEN_loading" @click="download(accreditationFiles[contractOpen], 'contractOpen')">模板下载</span></li>
                <li v-if="accreditationFiles[contractAuth]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务账户授权确认书，1份，加盖公章和法人签章&ensp;<span class="link" v-loading="CONTRACT_AUTH_loading" @click="download(accreditationFiles[contractAuth], 'contractAuth')">模板下载</span></li>
              </ul>
            </pl-content-box-card>

            <pl-content-box-card class="bg-color-light card-padding">
              <el-form-item label="终审结果：" :class="{'no-bottom-margin': latestCusOpt.postRs !== '0'}">
                <pl-content-item-text>
                    <span v-if="latestCusOpt.postRs === '0'"><el-badge value="确认无误" class="item success"></el-badge></span>
                    <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                </pl-content-item-text>
              </el-form-item>
              <el-form-item v-if="latestCusOpt.postRs !== '0'">
                <span slot="label">原&emsp;&emsp;因：</span>
                <span v-tooltip="latestCusOpt.postRemark" class='card-padding-result'>
                    {{latestCusOpt.postRemark}}
                </span>
              </el-form-item>
            </pl-content-box-card>
          </pl-content-box-card-group>
        </pl-content-box-block>
      </div>

    </el-form>
   <!-- <pl-content-box-block>-->
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="primary" v-if="showContract" @click="regen" :loading="regenLoading">生成邮寄资料</el-button>
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
import {HttpPrefix} from '../../api/config';
import {HttpPrefix as governorHttpPrefix} from '../../../governor/api/config';
import sysUtil from 'core/utils/sys-util';
import httpUtil from 'core/utils/http-util';
import {MsgType} from 'core/constants';

export default {
  props: ['contactorId', 'cusId'],
  mixins: [validators],
  data () {
    return {
      accreditationForm: {
        customerC: {}, // 客户信息
        cusAcct: {}, // 银行账号信息
        operators: [], // 操作员信息
        administrator: {} // 管理员
      }, // 提交认证数据
      latestCusOpt: {}, // 最新一条审批结果
      users: [],
      files: [],
      FileCls: constantUtil.getConstantByKey('BizConstants.FileCls'),
      BizCode: constantUtil.getConstantByKey('CustomerConstants.CusBizCode'),
      loading: false,
      regenLoading: false,
      activeNames: [],
      maxWidth: '900',
      'fileApi': HttpPrefix.API,
      'postInfo': {
        'address': 'xxxxxxxx',
        'name': 'xxx',
        'phone': '###-########'
      },
      'CONTRACT_AUTH_loading': true,
      'CONTRACT_OPEN_loading': true,
      'accreditationFiles': {},
      'cusAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
      'contractOpen': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_OPEN'],
      'contractAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_AUTH'],
      'POST_ADDRESS': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_ADDRESS'],
      'POST_NAME': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_NAME'],
      'POST_PHONE': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_PHONE'],
      'showContract': true
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
            return (item.dicCode === this.accreditationForm.cusAcct.bankCode);
          });
          this.accreditationForm.cusAcct.bankName = dicItem[0].dicName;
          // 设置开户网点省市
          this.accreditationForm.cusAcct.bankProvince = this.accreditationForm.cusAcct.addressArr[0];
          this.accreditationForm.cusAcct.bankCity = this.accreditationForm.cusAcct.addressArr[1];

          let tip = [];
          let postTip = [];
          if (!this.accreditationForm.companyCertificate || this.accreditationForm.companyCertificate === '') {
            tip.push('<strong>统一社会信用代码证</strong>');
          }
          if (!this.accreditationForm.legalCertificate || this.accreditationForm.legalCertificate === '') {
            tip.push('<strong>法人代表证照</strong>');
          }
          if (!this.accreditationForm.bankCertificate || this.accreditationForm.bankCertificate === '') {
            tip.push('<strong>银行账户证明</strong>');
          }
//          if (!this.accreditationForm.userCertificate || this.accreditationForm.userCertificate === '') {
//            tip.push('<strong>管理员及操作员证照</strong>');
//          }
//          if (!this.accreditationForm.cusAuth || this.accreditationForm.cusAuth === '') {
//            tip.push('<strong>企业授权书</strong>');
//          }

          if (!this.accreditationForm.administrator.authFileIds || this.accreditationForm.administrator.authFileIds === '') {
            tip.push('<strong>企业授权书</strong>');
          }

          if (!this.accreditationForm.administrator.certFileIds || this.accreditationForm.administrator.certFileIds === '') {
            tip.push('<strong>管理员' + this.accreditationForm.administrator.userName + '的证照</strong>');
          }

          if (this.accreditationForm.operators && this.accreditationForm.operators.length > 0) {
            this.accreditationForm.operators.forEach(item => {
              if (!item.certFileIds) {
                tip.push('<strong>操作员' + item.userName + '的证照</strong>');
              }
            });
          }

          if (this.accreditationFiles[this.contractOpen] && (!this.accreditationForm.contractOpen || this.accreditationForm.contractOpen === '')) {
            postTip.push('<strong>赢链平台契约互联服务用户开户声明书</strong>');
          }
          if (this.accreditationFiles[this.contractAuth] && (!this.accreditationForm.contractAuth || this.accreditationForm.contractAuth === '')) {
            postTip.push('<strong>共赢链平台契约互联服务账户授权确认书</strong>');
          }

          if (tip.length > 0) {
            this.$alert('请上传&nbsp;' + tip.join('，'), '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING,
              dangerouslyUseHTMLString: true
            });
            this.loading = false;
            return;
          }
          if (tip.length === 0 && postTip.length > 0) {
            this.$alert('请下载&nbsp;' + postTip.join('，') + '，加盖公章和法人签章并邮寄到指定处', '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING,
              dangerouslyUseHTMLString: true
            });
            this.loading = false;
            return;
          }

          // 保存数据
          this.$api.cust.accreditation.saveAccreditationData(JSON.stringify(this.accreditationForm)).then(ret => {
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
    regen () {
      // 获取邮寄文件
      this.CONTRACT_OPEN_loading = true;
      this.CONTRACT_AUTH_loading = true;
      this.regenLoading = true;
      this.$api.cust.accreditation.genAccreditationFiles(JSON.stringify(this.accreditationForm)).then(ret2 => {
        this.regenLoading = false;
        if (ret2) {
          this.accreditationFiles = ret2;
          if (ret2[this.contractOpen]) {
            this.CONTRACT_OPEN_loading = false;
          }
          if (ret2[this.contractAuth]) {
            this.CONTRACT_AUTH_loading = false;
          }
        }
      });
    },
    queryData (contactorId, cusId) {
      this.$api.cust.accreditation.getAccreditationData({'contactorId': contactorId, 'cusId': cusId}).then(accreditationForm => {
        this.showContract = accreditationForm.showContract;

        if (this.showContract) {
          // 获取邮寄信息
          this.$api.cust.accreditation.getPostInfo(JSON.stringify(accreditationForm)).then(postInfo => {
            if (postInfo) {
              this.postInfo.address = postInfo[this.POST_ADDRESS];
              this.postInfo.name = postInfo[this.POST_NAME];
              this.postInfo.phone = postInfo[this.POST_PHONE];
            }
          });
        }
        this.accreditationForm = accreditationForm;

        this.accreditationForm.customerC.addressArr = [this.accreditationForm.customerC.province];
        if (this.accreditationForm.customerC.city) {
          this.accreditationForm.customerC.addressArr.push(this.accreditationForm.customerC.city);
        }
        // 省市地址赋值
        this.accreditationForm.cusAcct.addressArr = [this.accreditationForm.cusAcct.bankProvince];
        if (this.accreditationForm.cusAcct.bankCity) {
          this.accreditationForm.cusAcct.addressArr.push(this.accreditationForm.cusAcct.bankCity);
        }
        // 合并管理员和操作员,方便遍历
        this.accreditationForm.operators.forEach((item, index) => {
          this.users.push(item);
        });
        this.users.unshift(this.accreditationForm.administrator);

        // 组装附件数组
        this.files = [
          {name: '营业执照', fileType: this.FileCls['COMPANY_CERTIFICATE'], relateId: cusId, api: this.fileApi, isEdit: this.latestCusOpt.licenceAprvRs !== '0'},
          {name: '法人代表证照', fileType: this.FileCls['LEGAL_CERTIFICATE'], relateId: cusId, api: this.fileApi, isEdit: this.latestCusOpt.lrAprvRs !== '0'},
          {name: '银行账户证明', fileType: this.FileCls['BANK_CERTIFICATE'], relateId: cusId, api: this.fileApi, isEdit: this.latestCusOpt.bankCerAprvRs !== '0'},
          {name: '管理员及操作员证照', fileType: this.FileCls['USER_CERTIFICATE'], api: governorHttpPrefix.API},
          {name: '企业授权委托书', fileType: this.FileCls['CUS_AUTH'], relateId: this.accreditationForm.administrator.authFileRlatId, api: governorHttpPrefix.API, isEdit: this.latestCusOpt.cusAuthRs !== '0'}
        ];

//        // 组装附件数组
//        let FileCls = constantUtil.getConstant('BizConstants.FileCls');
//        for (let i in FileCls) {
//          if (i !== this.FileCls['PURCHASE_AND_SALE_CONTRACT'] && i !== this.FileCls['RPUR_TRANSFER_VOUCHER'] && i !== this.FileCls['PURCHASE_AND_SALE_INVOICE'] && i !== this.FileCls['CONTRACT_OPEN'] && i !== this.FileCls['CONTRACT_AUTH']) { // 除去购销合同、回购转账凭证
//            this.files.push({'name': FileCls[i], 'fileType': i});
//          }
//        }
        // 查询最新的审批意见
        this.$api.cust.accreditation.getLatestOpt({'cusId': cusId}).then(cusOpt => {
          this.latestCusOpt = cusOpt;
          if (this.showContract) {
            // 获取邮寄文件
            this.$api.cust.accreditation.genAccreditationFiles(JSON.stringify(accreditationForm)).then(accreditationFiles => {
              if (accreditationFiles) {
                this.accreditationFiles = accreditationFiles;
                if (accreditationFiles[this.contractOpen]) {
                  this.CONTRACT_OPEN_loading = false;
                }
                if (accreditationFiles[this.contractAuth]) {
                  this.CONTRACT_AUTH_loading = false;
                }
                // 如果邮寄资料审批无误,无需重新生成
                if (cusOpt.postRs === '0') {
                  this.accreditationForm['contractOpen'] = this.accreditationFiles[this.contractOpen];
                  this.accreditationForm['contractAuth'] = this.accreditationFiles[this.contractAuth];
                }
              }
            });
          }
          if (cusOpt.postRs === '1') {
            this.activeNames.push('5');
          }
          if (cusOpt.basicInfoAprvRs === '1') {
            this.activeNames.push('1');
          }
          if (cusOpt.bankAprvRs === '1') {
            this.activeNames.push('2');
          }
          if (cusOpt.userAprvRs === '1') {
            this.activeNames.push('3');
          }
          if (cusOpt.licenceAprvRs === '1' || cusOpt.lrAprvRs === '1' || cusOpt.bankCerAprvRs === '1' || cusOpt.userCerAprvRs === '1' || cusOpt.cusAuthRs === '1') {
            this.activeNames.push('4');
          }
        });
      });
    },
    handleEdit (user, index) {
      this.$refs.userEdit.show(user, index, user.userId === this.accreditationForm.customerC.contactorId);
    },
    download (fileId, prop) {
      if (!fileId) {
        return;
      }
      sysUtil.download(httpUtil.genPath(this.fileApi + '/file/download?id=' + fileId));
      this.accreditationForm[prop] = fileId;
    }
  },
  created () {
    // 取容器的宽度作为table的最大宽度
    let params = this.$route.params;
    if (params.contactorId && params.cusId) {
      this.maxWidth = window.document.querySelector('.layout-contianer.accreditation-main').clientWidth - 90;
      this.queryData(params.contactorId, params.cusId);
    } else if (this.contactorId && this.cusId) {
      this.maxWidth = window.document.querySelector('.layout-contianer.accreditation-main').clientWidth - 90;
      this.queryData(this.contactorId, this.cusId);
    } else {
      this.$router.back();
      // this.callback();
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
    },
    arrowDown5 () {
      let rs = this.activeNames.some((item, index) => {
        return item === '5';
      });
      return rs;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~assets/scss/variables";
  @import "~assets/scss/mixin";
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
.post-list{
    li{
      line-height: 2.4em;
    }
  }

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
.card-padding-result{
  display:inline-block;
  line-height:36px;
}
.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}
730000081420
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



