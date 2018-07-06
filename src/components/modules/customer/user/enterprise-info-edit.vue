<template>
  <el-form label-width="150px" :model="cusRecord" ref="form">
    <el-row>
      <el-col :span="12">
        <el-form-item label="企业名称" prop="[cusName]" :rules="{
          trigger: 'change', required: true, message: '企业名称不能为空'
        }">
          <el-input v-model="cusRecord.cusName" @change="changeCusName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="法人/股东姓名" prop="[lrName]" :rules="[
            { required: true, message: '法人/股东姓名不能为空', trigger: 'change' },
            { min: 1, max: 15, message: '长度为1 到 15个字符', trigger: 'change' }
          ]">
          <el-input v-model="cusRecord.lrName" @change="changeLrName" tips="支持中文、英文的组合，1-15个字符" placeholder="请输入公司法人或股东的真实姓名"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="企业编码">
          <pl-content-item-text>{{cusRecord.cusCode}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="法人/股东证件类型" prop="[lrIdType]" :rules="{
            trigger: 'change', required: true, message: '法人/股东证件类型不能为空'
          }">
          <pl-dictionary-select @change="changeIdType" type="id_type" invalidDics="id_type_5,id_type_6,id_type_7" v-model="cusRecord.lrIdType" :showEmpty="false" ></pl-dictionary-select>
        </el-form-item>
      </el-col>

       <el-col :span="12">
        <el-form-item label="企业类型">
          <pl-content-item-text>{{cusRecord.cusType | constant('CustomerConstants.CusType')}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="法人/股东证件号码" prop="[lrLisNo]" :rules="[
            { trigger: 'change', required: true, message: '法人/股东证件号码不能为空'},
            { validator: certNoValidator, trigger: 'change', certType: cusRecord.lrIdType }
          ]">
          <el-input v-model="cusRecord.lrLisNo" @change="changeLrListNo" :tips="cusRecord.lrIdType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入法人/股东证件号码"></el-input>
        </el-form-item>
      </el-col>

       <el-col :span="12">
        <el-form-item label="证件类型" prop="[idType]" :rules="{
            trigger: 'change', required: true, message: '证件类型不能为空'
          }">
          <pl-dictionary-select type="ent_id_type" @change="changeIdCardType" v-model="cusRecord.idType" :showEmpty="false" ></pl-dictionary-select>
        </el-form-item>
      </el-col>

       <el-col :span="12">
        <el-form-item label="统一社会信用代码" prop="[socCrCode]" v-if="cusRecord.idType === 'ent_id_type_1'" :rules="[
            { required: true, message: '统一社会信用代码不能为空', trigger: 'change' },
            { min: 18, max: 18, message: '长度为18个字符', trigger: 'change' },
            { validator: socCrCodeValidator, trigger: 'change' }
          ]">
          <el-input v-model="cusRecord.socCrCode" @change="changeSocCrCode" tips="一般由18位数字、大写字母组成" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="营业执照" prop="[lisNo]" v-if="cusRecord.idType === 'ent_id_type_2'" :rules="{
            trigger: 'change', required: true, message: '营业执照号码不能为空'
          }">
          <el-input v-model="cusRecord.lisNo" @change="changeLisNo" tips="一般由15或13位数字组成" placeholder="请输入营业执照号码"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="12">
        <el-form-item label="组织机构代码" prop="[orgCode]" v-if="cusRecord.idType === 'ent_id_type_2'" :rules="{
            trigger: 'change', required: true, message: '组织机构代码不能为空'
          }">
          <el-input v-model="cusRecord.orgCode" tips="一般由8位数字（或大写字母）本体代码和1位数字（或大写字母）校验码组成" placeholder="请输入组织机构代码"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="12">
        <el-form-item label="证件名称" prop="[idName]" v-if="cusRecord.idType === 'ent_id_type_3'" :rules="{
            trigger: 'change', required: true, message: '证照名称不能为空'
          }">
          <el-input v-model="cusRecord.idName" @change="changeIdName" placeholder="请输入证照名称"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="证件号码" prop="[idNo]" v-if="cusRecord.idType === 'ent_id_type_3'" :rules="{
            trigger: 'change', required: true, message: '证照号码不能为空'
          }">
          <el-input v-model="cusRecord.idNo" @change="changeIdNo" placeholder="请输入证照号码"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="企业地址" prop="[addressArr]" :rules="{
            trigger: 'change', required: true, message: '企业地址不能为空', type: 'array'
          }">
          <pl-city-select v-model="cusRecord.addressArr" :level="2"></pl-city-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item prop="[address]" label="详细地址" :rules="{
            trigger: 'change', required: true, message: '详细地址不能为空'
          }">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="详细地址"
            v-model="cusRecord.address" tips="请填写详细的地址信息，实名认证通过后将按该地址邮寄证书">
          </el-input>
        </el-form-item>
      </el-col>
      <!--
      <el-col :span="24">
        <el-form-item label="区块链地址">
          <pl-content-item-text style="color: #00c2c2;" class="link" @click.native="toStellar">
            {{cusRecord.chainAddr}}
          </pl-content-item-text>
        </el-form-item>
      </el-col>
      -->
    </el-row>
  </el-form>
</template>
<script>
  import validators from 'core/utils/validators.js';
  import constantUtil from 'core/utils/constant-util';
  export default {
    mixins: [validators],
    props: ['cusRecord'],
    data () {
      return {
        cusTemp: {...this.cusRecord},
        CusType: constantUtil.getConstantByKey('CustomerConstants.CusType')
      };
    },
    computed: {
      showCertInfo () { // 保理商和核心企业不需要显示企业证照资料
        return this.cusRecord.cusType !== this.CusType['FOCAL_CO'] && this.cusRecord.cusType !== this.CusType['FINNER'];
      }
    },
    methods: {
      changeIdType () {
        this.cusRecord.lrLisNo = '';
      },
      changeIdCardType () {
        this.cusRecord.socCrCode = '';
        this.cusRecord.idName = '';
        this.cusRecord.idNo = '';
        this.cusRecord.lisNo = '';
        if (this.cusRecord.idType !== this.cusTemp.idType && this.showCertInfo) {
          this.$alert('证件类型已经产生了变更，请确认是否需要重新上传相应证件', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeLrName () {
        if (this.cusRecord.lrName !== this.cusTemp.lrName && this.showCertInfo) {
          this.$alert('法人/股东姓名已经产生了变更，请确认是否需要重新上传法人代表证照', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeLrListNo () {
        if (this.cusRecord.lrLisNo !== this.cusTemp.lrLisNo && this.showCertInfo) {
          this.$alert('法人/股东证件号码已经产生了变更，请确认是否需要重新上传法人代表证照', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        } else if (this.cusRecord.lrLisNo === this.cusTemp.lrLisNo && this.cusRecord.lrIdType !== this.cusTemp.lrIdType && this.showCertInfo) {
          this.$alert('法人/股东证件类型已经产生了变更，请确认是否需要重新上传法人代表证照', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeSocCrCode () {
        if (this.cusRecord.socCrCode && this.cusRecord.socCrCode !== this.cusTemp.socCrCode && this.cusRecord.idType === this.cusTemp.idType && this.showCertInfo) {
          this.$alert('统一社会信用代码已经产生了变更，请确认是否需要重新上传统一社会信用代码', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeLisNo () {
        if (this.cusRecord.lisNo && this.cusRecord.lisNo !== this.cusTemp.lisNo && this.cusRecord.idType === this.cusTemp.idType && this.showCertInfo) {
          this.$alert('营业执照已经产生了变更，请确认是否需要重新上传营业执照', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeIdName () {
        if (this.cusRecord.idName && this.cusRecord.idName !== this.cusTemp.idName && this.cusRecord.idType === this.cusTemp.idType && this.showCertInfo) {
          this.$alert('证件名称已经产生了变更，请确认是否需要重新上传证件名称', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeIdNo () {
        if (this.cusRecord.idNo && this.cusRecord.idNo !== this.cusTemp.idNo && this.cusRecord.idType === this.cusTemp.idType && this.showCertInfo) {
          this.$alert('证件号码已经产生了变更，请确认是否需要重新上传证件号码', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      changeCusName () {
        if (this.cusRecord.cusName && this.cusRecord.cusName !== this.cusTemp.cusName && this.showCertInfo) {
          this.$alert('企业名称已经产生了变更，请确认是否需要重新上传企业证件', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          });
        }
      },
      checkForm () {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
      },
      toStellar () {
        window.open('http://120.78.184.87:7020');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>



