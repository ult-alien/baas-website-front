<template>
  <el-form label-position="right" label-width="140px" ref="accreditationForm" :model="accreditationForm">
    <!--<pl-content-box-title>企业基本信息</pl-content-box-title>-->
    <div class="bolck-title">
      <span>企业基本信息</span>
    </div>
    <pl-content-box-block :fixed-width="false">
      <pl-content-box-card class="accreditation-content-box">
      <div class="accreditation-content">

        <el-form-item label="企业名称">
          <pl-content-item-text>{{accreditationForm.customerC.cusName}}</pl-content-item-text>
        </el-form-item>

        <el-form-item label="邀请码" prop="inviteCode" :rules="[{required: needInviteCode, trigger: 'change', message: '请输入邀请码'},
                                                              {trigger: 'change',validator: validateInviteCode }]">
          <el-input v-model="accreditationForm.inviteCode" placeholder="请输入合作伙伴向您发送的邀请码"></el-input>
        </el-form-item>

        <el-form-item label="证件类型" prop="[customerC][idType]" :rules="{
            trigger: 'change', required: true, message: '证件类型不能为空'
          }">
          <pl-dictionary-select type="ent_id_type" v-model="accreditationForm.customerC.idType" :showEmpty="false" ></pl-dictionary-select>
        </el-form-item>

        <el-form-item label="统一社会信用代码" prop="[customerC][socCrCode]" v-if="accreditationForm.customerC.idType === 'ent_id_type_1'" :rules="[
            { required: true, message: '统一社会信用代码不能为空', trigger: 'change' },
            { min: 18, max: 18, message: '长度为18个字符', trigger: 'change' },
            { validator: socCrCodeValidator, trigger: 'change' }
          ]">
          <el-input v-model="accreditationForm.customerC.socCrCode" tips="一般由18位数字、大写字母组成" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>

        <el-form-item label="营业执照号码" prop="[customerC][lisNo]" v-if="accreditationForm.customerC.idType === 'ent_id_type_2'" :rules="{
            trigger: 'change', required: true, message: '营业执照号码不能为空'
          }">
          <el-input v-model="accreditationForm.customerC.lisNo" tips="一般由15或13位数字组成" placeholder="请输入营业执照号码"></el-input>
        </el-form-item>

        <el-form-item label="组织机构代码" prop="[customerC][orgCode]" v-if="accreditationForm.customerC.idType === 'ent_id_type_2'" :rules="{
            trigger: 'change', required: true, message: '组织机构代码不能为空'
          }">
          <el-input v-model="accreditationForm.customerC.orgCode" tips="一般由8位数字（或大写字母）本体代码和1位数字（或大写字母）校验码组成" placeholder="请输入组织机构代码"></el-input>
        </el-form-item>

        <el-form-item label="证照名称" prop="[customerC][idName]" v-if="accreditationForm.customerC.idType === 'ent_id_type_3'" :rules="{
            trigger: 'change', required: true, message: '证照名称不能为空'
          }">
          <el-input v-model="accreditationForm.customerC.idName" placeholder="请输入证照名称"></el-input>
        </el-form-item>

        <el-form-item label="证照号码" prop="[customerC][idNo]" v-if="accreditationForm.customerC.idType === 'ent_id_type_3'" :rules="{
            trigger: 'change', required: true, message: '证照号码不能为空'
          }">
          <el-input v-model="accreditationForm.customerC.idNo" placeholder="请输入证照号码"></el-input>
        </el-form-item>

        <el-form-item label="法人/股东姓名" prop="[customerC][lrName]" :rules="[
            { required: true, message: '法人/股东姓名不能为空', trigger: 'change' },
            { min: 1, max: 15, message: '长度为1 到 15个字符', trigger: 'change' }
          ]">
          <el-input v-model="accreditationForm.customerC.lrName" tips="支持中文、英文的组合，1-15个字符" placeholder="请输入公司法人或股东的真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="法人/股东证件类型" prop="[customerC][lrIdType]" :rules="{
            trigger: 'change', required: true, message: '法人/股东证件类型不能为空'
          }">
          <pl-dictionary-select @change="changeIdType" type="id_type" invalidDics="id_type_5,id_type_6,id_type_7" v-model="accreditationForm.customerC.lrIdType" :showEmpty="false" ></pl-dictionary-select>
        </el-form-item>

        <el-form-item label="法人/股东证件号码" prop="[customerC][lrLisNo]" :rules="[
            { trigger: 'change', required: true, message: '法人/股东证件号码不能为空'},
            { validator: certNoValidator, trigger: 'change', certType: accreditationForm.customerC.lrIdType }
          ]">
          <el-input v-model="accreditationForm.customerC.lrLisNo" :tips="accreditationForm.customerC.lrIdType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入法人/股东证件号码"></el-input>
        </el-form-item>

        <el-form-item label="企业地址" prop="[customerC][addressArr]" :rules="{
            trigger: 'change', required: true, message: '企业地址不能为空', type: 'array'
          }">
          <pl-city-select v-model="accreditationForm.customerC.addressArr" :level="2"></pl-city-select>
        </el-form-item>

        <el-form-item prop="[customerC][address]" label="详细地址" :rules="{
            trigger: 'change', required: true, message: '详细地址不能为空'
          }">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="详细地址"
            v-model="accreditationForm.customerC.address" tips="请填写详细的地址信息，实名认证通过后将按该地址邮寄证书">
          </el-input>
        </el-form-item>
      </div>
      </pl-content-box-card>
    </pl-content-box-block>
    <div class="bolck-title">
      <span>企业银行账户</span>
    </div>
    <!--<pl-content-box-title>企业银行账户</pl-content-box-title>-->
    <pl-content-box-block :fixed-width="false">
      <pl-content-box-card class="accreditation-content-box">
        <div class="accreditation-content">

          <el-form-item label="银行账号" prop="[cusAcct][acctNo]" :rules="{
              trigger: 'change', required: true, validator: bankNoValidator
            }">
            <el-input v-model="accreditationForm.cusAcct.acctNo" tips="请输入银行账号" placeholder="请输入企业真实的银行账号"></el-input>
          </el-form-item>

          <el-form-item label="账户名称" prop="[cusAcct][acctName]" :rules="{
              trigger: 'change', required: true, message: '账户名称不能为空'
            }">
            <el-input v-model="accreditationForm.cusAcct.acctName" readonly placeholder="请输入账户名称"></el-input>
          </el-form-item>

          <el-form-item label="开户行" :prop="'[cusAcct][bankCode]'" :rules="[{ required: true, message: '请选择开户行', trigger: 'change' }]">
            <pl-dictionary-select :show-empty="false" type="bank_brand" clearable v-model="accreditationForm.cusAcct.bankCode"></pl-dictionary-select>
          </el-form-item>

          <el-form-item label="开户网点" :prop="'[cusAcct][addressArr]'" :rules="{
              trigger: 'change', required: true, message: '请选择开户网点省市', type: 'array'
            }">
            <pl-city-select v-model="accreditationForm.cusAcct.addressArr" :level="2"></pl-city-select>
          </el-form-item>

          <el-form-item prop="[cusAcct][bankDot]" label="具体网点" :rules="{
              trigger: 'change', required: true, message: '具体网点不能为空'
            }">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="具体网点"
              v-model="accreditationForm.cusAcct.bankDot" tips="请填写真实银行网点地址">
            </el-input>
          </el-form-item>

        </div>
      </pl-content-box-card>
    </pl-content-box-block>
  </el-form>
</template>
<script>
  import validators from 'core/utils/validators.js';
  export default {
    mixins: [validators],
    methods: {
      changeIdType () {
        this.accreditationForm.customerC.lrLisNo = '';
      },
      validate () {
        return this.$refs.accreditationForm.validate();
      },
      validateInviteCode (rule, value, callback) {
        if (!value || value === '') {
          callback();
        } else {
          // 校验验证码
          this.$api.bsp.accreditation.checkInviteCode({'inviteCode': value}).then(ret => {
            if (!ret) {
              callback(new Error('邀请码不正确'));
            } else {
              callback();
            }
          });
        }
      }
    },
    props: {
      accreditationForm: {
        type: Object
      },
      needInviteCode: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../../assets/scss/_variables.scss';
  @import './style.scss';
</style>


