<template>
  <el-form ref="userForm" :model="accreditationForm" label-position="right" label-width="140px">
    <!--<pl-content-box-title>设置管理员信息</pl-content-box-title>-->
    <div class="bolck-title">
      <span>管理员信息</span>
    </div>
   <!-- <div class="accreditation-content">-->
    <pl-content-box-block :fixed-width="false">
      <pl-content-box-card class="accreditation-content-box">
        <div class="accreditation-content">
            <el-form-item label="管理员手机号">
              <pl-content-item-text>{{accreditationForm.administrator.phoneNo}}</pl-content-item-text>
            </el-form-item>

            <el-form-item label="登录名" prop="[administrator][loginName]" :rules="[
                {trigger: 'change', required: true, message: '登录名不能为空'},
                { validator: loginNameValidator, trigger: 'change', userId: accreditationForm.administrator.userId }
              ]">
              <el-input v-model="accreditationForm.administrator.loginName" tips="登录名用于登录系统，也可使用手机号登录" placeholder="请输入登录名"></el-input>
            </el-form-item>

            <el-form-item label="管理员姓名" prop="[administrator][userName]" :rules="[
                {trigger: 'change', required: true, message: '管理员姓名不能为空'}
              ]">
              <el-input v-model="accreditationForm.administrator.userName" tips="支持中文、英文的组合，1-15个字符" placeholder="管理员的真实名称，可以是公司法人或相关业务人员"></el-input>
            </el-form-item>

            <el-form-item label="证件类型" prop="[administrator][certType]" :rules="{
                trigger: 'change', required: true, message: '证件类型不能为空'
              }">
              <pl-dictionary-select type="id_type" @change="changeAminIdType()" invalidDics="id_type_5,id_type_6,id_type_7" v-model="accreditationForm.administrator.certType" :showEmpty="false" ></pl-dictionary-select>
            </el-form-item>

            <el-form-item label="证件号码" prop="[administrator][certNo]" :rules="[
                { trigger: 'change', required: true, message: '证件号码不能为空'},
                { validator: certNoValidator, trigger: 'change', certType: accreditationForm.administrator.certType }
              ]">
              <el-input v-model="accreditationForm.administrator.certNo" :tips="accreditationForm.administrator.certType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入管理员证件号码"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="[administrator][email]" :rules="[{
                trigger: 'change', required: true, message: '邮箱不能为空'
              },{type: 'email', message: '请输入正确的邮箱地址',  trigger: 'change'}]">
              <el-input v-model="accreditationForm.administrator.email" placeholder="请输入管理员邮箱"></el-input>
            </el-form-item>

          <!--  <el-form-item>
              <el-checkbox v-model="accreditationForm.administrator.isOperator">我也要成为操作员</el-checkbox>
            </el-form-item>-->
        </div>
      </pl-content-box-card>
    </pl-content-box-block>
   <!-- </div>-->

   <!-- <pl-content-box-title>
      添加企业操作员
    </pl-content-box-title>-->
    <div class="bolck-title">
      <span>企业操作员</span>
    </div>
   <!-- <p class="info text-center" style="padding: 10px;margin-top: 10px;">
      <i class="el-icon-warning"></i>&ensp;企业操作员享有办理信单业务的权利，平台将按您申请的操作员数量为您邮寄安全证书，最多可免费申请两个安全证书。
    </p>-->
    <pl-content-box-block :fixed-width="false">
      <pl-content-box-card-group>
      <pl-content-box-card class="accreditation-content-box" :key="accreditationFormOperators" v-for="(operator, index) in accreditationForm.operators">
        <div class="accreditation-content">
          <el-form-item>
            <span slot="label" class="index">{{index + 1}}.</span>
            <pl-content-item-text>
              <el-radio v-model="operator.operateType" label="newOperator" @change="changeOperateType(operator.operateType, index)">添加新的操作员</el-radio>
              <el-radio v-model="operator.operateType" label="platformUser" @change="changeOperateType(operator.operateType, index)">操作员已经是平台用户</el-radio>
            </pl-content-item-text>
            <!--<el-select v-model="operator.operateType" @change="changeOperateType(operator.operateType, index)" placeholder="请选择操作员类型">-->
              <!--<el-option label="添加新的操作员" value="newOperator"></el-option>-->
              <!--<el-option label="操作员已经是平台用户" value="platformUser"></el-option>-->
            <!--</el-select>-->
          </el-form-item>

          <el-form-item label="操作员登录名" :prop="'[operators]['+index+'][loginName]'" v-if="operator.operateType === 'newOperator'" :rules="[
                { validator: loginNameValidator, trigger: 'change', userId: operator.userId }
              ]">
            <el-input v-model="operator.loginName" tips="登录名用于登录系统，也可使用手机号登录" placeholder="请输入操作员登录名"></el-input>
          </el-form-item>

          <el-form-item label="操作员姓名" v-if="operator.operateType === 'newOperator'" :ref="'userName' + index" :prop="'[operators]['+index+'][userName]'" :rules="[
            { required: true, message: '操作员姓名不能为空', trigger: 'change' },
            { min: 1, max: 15, message: '长度为1 到15 个字符', trigger: 'change' }
          ]">
            <el-input v-model="operator.userName" tips="支持中文、英文的组合，1-15个字符" placeholder="操作员的真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="操作员姓名"  v-if="operator.operateType === 'platformUser'" :ref="'userName' + index" :prop="'[operators]['+index+'][userName]'">
            <el-input v-model="operator.userName" :disabled="true" tips="支持中文、英文的组合，1-15个字符" placeholder="操作员的真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="操作员手机号" v-if="operator.operateType === 'newOperator'" :ref="'phoneNo' + index" :prop="'[operators]['+index+'][phoneNo]'"
                        :rules="[{required: true, message: '手机号码不能为空', trigger: 'change'},
                                 { validator: telephoneValidator, trigger: 'blur', excludeCurUser: true}]">
            <el-input v-model="operator.phoneNo" placeholder="操作员常用手机号码"></el-input>
          </el-form-item>

          <el-form-item label="操作员手机号"
                        v-if="operator.operateType === 'platformUser'"
                        :ref="'phoneNo' + index" :prop="'[operators]['+index+'][phoneNo]'"
                        :rules="[{required: true, message: '手机号码不能为空', trigger: 'change'},
                                  { validator: telephoneValidator, trigger: 'change',
                                  existForTrue: true, callback: phoneCallback, param: {index: index}}]">
            <el-input v-model="operator.phoneNo" placeholder="操作员常用手机号码"></el-input>
          </el-form-item>

          <el-form-item label="证件类型" :ref="'certType' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][certType]'" :rules="{
            required: true, message: '证件类型不能为空', trigger: 'change'
          }">
            <pl-dictionary-select type="id_type" @change="changeOperIdType(index)" invalidDics="id_type_5,id_type_6,id_type_7" v-model="operator.certType" :showEmpty="false" ></pl-dictionary-select>
          </el-form-item>

          <el-form-item label="证件号码" :ref="'certNo' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][certNo]'" :rules="[
            { required: true, message: '证件号码不能为空', trigger: 'change' },
            { validator: certNoValidator, trigger: 'change', certType: operator.certType }
          ]">
            <el-input v-model="operator.certNo" :tips="operator.certType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入操作员证件号码"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" :ref="'email' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][email]'"
                        :rules="{type: 'email', message: '请输入正确的邮箱地址',  trigger: 'change'}">
            <el-input v-model="operator.email" placeholder="请输入操作员邮箱"></el-input>
          </el-form-item>
          <div class="del-btn" v-tooltip="'删除'"   @click="delOperator(index)"><i class="el-icon-close"></i></div>
        </div>
      </pl-content-box-card>
      </pl-content-box-card-group>
    <!--<div class="accreditation-content-box" v-for="(operator, index) in accreditationForm.operators">
      <div class="accreditation-content">
        <el-form-item>
          <span slot="label" class="index">{{index + 1}}.</span>
          <el-select v-model="operator.operateType" @change="changeOperateType(operator.operateType, index)" placeholder="请选择操作员类型">
            <el-option label="添加新的操作员" value="newOperator"></el-option>
            &lt;!&ndash;<el-option label="操作员已经是平台用户" value="platformUser"></el-option>&ndash;&gt;
          </el-select>
        </el-form-item>

        <el-form-item label="操作员登录名" v-if="operator.operateType === 'newOperator'">
          <el-input v-model="operator.loginName" tips="登录名用于登录系统，也可使用手机号登录" placeholder="请输入操作员登录名"></el-input>
        </el-form-item>

        <el-form-item label="操作员姓名" :ref="'userName' + index" :prop="'[operators]['+index+'][userName]'" :rules="[
            { required: true, message: '操作员姓名不能为空', trigger: 'change' },
            { min: 1, max: 15, message: '长度为1 到15 个字符', trigger: 'change' }
          ]">
          <el-input v-model="operator.userName" tips="支持中文、英文的组合，1-15个字符" placeholder="操作员的真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="操作员手机号" :ref="'phoneNo' + index" :prop="'[operators]['+index+'][phoneNo]'" :rules="[{
            required: true, message: '手机号码不能为空', trigger: 'change'
          },{ validator: telephoneValidator, trigger: 'change', excludeCurUser: true }]">
          <el-input v-model="operator.phoneNo" placeholder="操作员常用手机号码"></el-input>
        </el-form-item>

        <el-form-item label="证件类型" :ref="'certType' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][certType]'" :rules="{
            required: true, message: '证件类型不能为空', trigger: 'change'
          }">
          <pl-dictionary-select type="id_type" @change="changeOperIdType(index)" invalidDics="id_type_5,id_type_6,id_type_7" v-model="operator.certType" :showEmpty="false" ></pl-dictionary-select>
        </el-form-item>

        <el-form-item label="证件号码" :ref="'certNo' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][certNo]'" :rules="[
            { required: true, message: '证件号码不能为空', trigger: 'change' },
            { validator: certNoValidator, trigger: 'change', certType: operator.certType }
          ]">
          <el-input v-model="operator.certNo" :tips="operator.certType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入操作员证件号码"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :ref="'email' + index" v-if="operator.operateType === 'newOperator'" :prop="'[operators]['+index+'][email]'" :rules="{
            trigger: 'change', validator: emailValidator
          }">
          <el-input v-model="operator.email" placeholder="请输入操作员邮箱"></el-input>
        </el-form-item>
        <div class="del-btn" v-tooltip="'删除'" v-if="accreditationForm.operators.length > 1" @click="delOperator(index)"><i class="el-icon-close"></i></div>
      </div>
    </div>-->
    <div class="add accreditation-content-box" @click="addOperator">
      <i class="el-icon-circle-plus"></i>&nbsp;添加操作员
    </div>
    </pl-content-box-block>
  </el-form>
</template>

<script>
  import validators from 'core/utils/validators.js';
  export default {
    mixins: [validators],
    data () {
      return {
      };
    },
    props: {
      accreditationForm: {
        type: Object
      }
    },
    methods: {
      phoneCallback (obj, param) {
        if (obj) {
          this.accreditationForm.operators[param.index].userName = obj.userName;
          this.accreditationForm.operators[param.index].userId = obj.userId;
        } else {
          this.accreditationForm.operators[param.index].userName = '';
          this.accreditationForm.operators[param.index].userId = '';
        }
      },
      changeAminIdType () {
        this.accreditationForm.administrator.certNo = '';
      },
      changeOperIdType (index) {
        this.accreditationForm.operators[index].certNo = '';
      },
      addOperator () {
        let obj = {
          userId: '',
          userName: '',
          phoneNo: '',
          certType: '',
          certNo: '',
          email: '',
          loginName: '',
          operateType: 'newOperator',
          certFileIds: '',
          authFileIds: ''
        };
        this.accreditationForm.operators.push(obj);
      },
      delOperator (index) {
        this.accreditationForm.operators.splice(index, 1);
      },
      validate () {
        return this.$refs.userForm.validate();
      },
      changeOperateType (value, index) {
        // 修改操作类型时重置值并重新校验部分字段
//        this.$nextTick(() => {
//          if (value === 'newOperator') {
//            this.$refs['userName' + index][0].resetField();
//            this.$refs['phoneNo' + index][0].resetField();
//            this.$refs['certType' + index][0].resetField();
//            this.$refs['certNo' + index][0].resetField();
//            this.$refs['email' + index][0].resetField();
//          } else if (value === 'platformUser') {
//            this.$refs['userName' + index][0].resetField();
//            this.$refs['phoneNo' + index][0].resetField();
//          }
//
//          setTimeout(() => {
//            this.accreditationForm.operators[index].userName = '';
//            this.accreditationForm.operators[index].phoneNo = '';
//            this.accreditationForm.operators[index].certType = '';
//            this.accreditationForm.operators[index].certNo = '';
//            this.accreditationForm.operators[index].email = '';
//            this.accreditationForm.operators[index].userId = '';
//          }, 100);
//        });
//        setTimeout(() => {
//          if (value === 'newOperator') {
//            this.$refs['userName' + index][0].resetField();
//            this.$refs['phoneNo' + index][0].resetField();
//            this.$refs['certType' + index][0].resetField();
//            this.$refs['certNo' + index][0].resetField();
//            this.$refs['email' + index][0].resetField();
//          } else if (value === 'platformUser') {
//            this.$refs['userName' + index][0].resetField();
//            this.$refs['phoneNo' + index][0].resetField();
//          }
//        }, 200);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~assets/scss/_variables.scss';
  @import './style.scss';
  .index{
    color: $primary-color;
    font-style: italic;
    font-size: 1.6em;
    text-align: center;
  }
  .padding-right-70{
    padding-right: 70px;
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
</style>


