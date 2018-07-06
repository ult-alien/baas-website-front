<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <el-form label-width="120px" :model="form" ref="form">
      <pl-content-box-block>
        <pl-content-box-card>
            <el-row>
              <el-col :span="24">
                <el-form-item label="" label-width="0px">
                  <pl-content-item-text class="text-center">
                    <el-radio v-model="isNewUser" :label="true">添加新的操作员</el-radio>
                    <el-radio v-model="isNewUser" :label="false">操作员已经是平台用户</el-radio>
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
              <div v-if="isNewUser">
              <el-col :span="12">
                <el-form-item label="登录名" prop="loginName" :rules="[
                    { required: true, message: '请输入登录名' },
                    { max: 30, message: '字符长度不能超过30'},
                    { validator: ajaxCheck, trigger: 'change' }
                  ]">
                  <el-input v-model="form.loginName" placeholder="输入登录名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户名称" prop="userName" :rules="[
                    { required: true, message: '请输入用户名称'},
                   { max: 30, message: '字符长度不能超过30'}
                  ]">
                  <el-input v-model="form.userName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phoneNo" :rules="phoneRules">
                  <el-input v-model="form.phoneNo" placeholder="输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop="email" :rules="[
                    { max: 50, message: '字符长度不能超过50'},
                    {type: 'email', message: '请输入正确的邮箱地址',  trigger: 'blur'}
                ]">
                  <el-input v-model="form.email" placeholder="输入电子邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="certType" :rules="{
                  trigger: 'change', required: true, message: '证件类型不能为空'
                }">
                  <pl-dictionary-select type="id_type" @change="form.certNo = ''" invalidDics="id_type_5,id_type_6,id_type_7" v-model="form.certType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码" prop="certNo" :rules="[
                  { trigger: 'change', required: true, message: '证件号码不能为空'},
                  { validator: certNoValidator, trigger: 'change', certType: form.certType }
                ]">
                  <el-input v-model="form.certNo" :tips="form.certType === 'id_type_1' ? '身份证一般由15或18位数字组成，末位可以是X' : ''" placeholder="请输入证件号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色" prop="roles" :rules="[
                 { required: true, message: '请选择角色', type: 'array'}
                ]">
                  <pl-content-item-text :is-multi-line="true">
                    <el-checkbox-group v-model="form.roles">
                      <el-checkbox :label="item.roleCode" :value="item.roleCode" v-for="item in roles">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="描述" prop="note" :rules="[
                  { max: 50, message: '字符长度不能超过50'}
                ]">
                  <el-input type="textarea" v-model="form.note"></el-input>
                </el-form-item>
              </el-col>
              </div>
              <div v-else>
                <el-col :span="12">
                  <el-form-item label="手机号" prop="phoneNo" :rules="phoneRules2">
                    <el-input v-model="form.phoneNo" placeholder="输入手机号码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="form.userName" placeholder="输入用户名称" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="角色" prop="roles" :rules="[
                   { required: true, message: '请选择角色', type: 'array'}
                  ]">
                    <pl-content-item-text :is-multi-line="true">
                      <el-checkbox-group v-model="form.roles">
                        <el-checkbox :label="item.roleCode" :value="item.roleCode" v-for="item in roles">{{item.roleName}}</el-checkbox>
                      </el-checkbox-group>
                    </pl-content-item-text>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
        </pl-content-box-card>
      </pl-content-box-block>
      <pl-content-box-title v-if="showCertFile">
        上传证件
        &emsp;
        <small>
          <i class="el-icon-warning text-primary"></i>上传用户证件照片，身份证则必须提供正反面，<span class="text-warning">加盖公章</span>请务必与用户信息中填写的证件信息一致
        </small>
      </pl-content-box-title>
      <pl-content-box-block  v-if="showCertFile">
        <pl-upload-file ref="certFile" :isEdit="isNewUser || certFileEdit"
                        :relateId="form.userId"
                        show-type="vertical"
                        :file-type="userCertFile" 
                        save-path="user" 
                        :size="5"
                        accept-type="bmp,jpg,png,jpeg"
                        :api="fileApi" 
                        @after-load="certFileAfterLoad"
                        v-model="form.certFileIds" :multiple="true">
        </pl-upload-file>
        <small>
          <i class="text-primary el-icon-info"></i>&nbsp;<span class="text-muted">
            支持文件类型&nbsp;pdf、doc、docx、jpg、png、jpeg、bpm&nbsp;,最大不能超过&nbsp;5M
          </span>
        </small>
      </pl-content-box-block>

      <pl-content-box-title v-show="showAuthFile">
        企业授权书
        &emsp;
        <small>
          <i class="el-icon-warning text-primary"></i>&ensp;请下载<span class="link" @click="genCusAuthFile">企业授权书模板</span>，<span class="text-warning">加盖公章</span>，拍照上传
        </small>
      </pl-content-box-title>
      <pl-content-box-block v-show="showAuthFile" :fixed-width="false">
        <pl-upload-file
          show-type="vertical"
          :file-type="userAuthCertFile" 
          save-path="user" 
          :size="5"
          accept-type="bmp,jpg,png,jpeg"
          :api="fileApi" 
          v-model="form.authFileIds" :multiple="true">
        </pl-upload-file>
        <small>
          <i class="text-primary el-icon-info"></i>&nbsp;<span class="text-muted">
            支持文件类型&nbsp;pdf、doc、docx、jpg、png、jpeg、bpm&nbsp;,最大不能超过&nbsp;5M
          </span>
        </small>
      </pl-content-box-block>
    </el-form>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="default" icon=" anticon icon-arrowleft" @click="goBack">返回</el-button>
        <el-button type="primary" icon=" anticon icon-save" :loading="loading" @click="save">保存</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
  </pl-content-box>


</template>
<script>
  import {MsgType} from '../../../../../core/constants';
  import {HttpPrefix} from '../../api/config';
  import {HttpPrefix as CusHttpPrefix} from '../../../customer/api/config';
  import validators from 'core/utils/validators.js';
  import dictionaryUtil from '../.././../../../core/utils/dictionary-util';
  import sysUtil from 'core/utils/sys-util.js';
  import httpUtil from 'core/utils/http-util.js';
  import constantUtil from 'core/utils/constant-util';
  let checkPhone = (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('请输入正确的手机号码!'));
    } else {
      callback();
    }
  };
  export default {
    mixins: [validators],
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
        addDialogVisible: false,
        form: {
          userId: '',
          loginName: '',
          userName: '',
          certType: '',
          certNo: '',
          phoneNo: '',
          email: '',
          userState: 'E',
          note: '',
          organId: '',
          roles: [],
          certFileIds: '',
          authFileIds: ''
        },
        isNewUser: true,
        props: {
          value: 'organId',
          children: 'children',
          label: 'organName'
        },
        roles: [],
        curOrgan: [],
        fileApi: HttpPrefix.API,
        loading: false,
        phoneRules: [{required: true, message: '请输入电话号码'},
          {validator: checkPhone, trigger: 'blur'},
          {validator: this.checkPhoneNoUnique, trigger: 'blur'}],
        phoneRules2: [{required: true, message: '请输入电话号码'},
          {validator: checkPhone, trigger: 'blur'},
          {validator: this.checkPhoneNoForExit, trigger: 'blur'}],
        user: this.$store.state.contextData.user,
//        adminCode: dictionaryUtil.getDic('cus_type.cus_type_c.' + this.user.ent.cusType).extension2,
        userCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        userAuthCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        certFileEdit: true,
        cusTypes: constantUtil.getConstantByKey('CustomerConstants.CusType')
      };
    },
    watch: {
      isNewUser () {
        this.resetFrom();
        this.form.roles = [];
        if (this.$refs['certFile']) {
          this.$refs['certFile'].clearUploadList();
        }
      }
    },
    computed: {
      adminCode () {
        if (this.user) {
          let dic = dictionaryUtil.getDic('cus_type.cus_type_c.' + this.user.ent.cusType);
          if (dic) {
            return dic.extension2;
          }
        }
        return '';
      },
      showAuthFile () {
        if (this.$store.state.contextData.user.ent.cusType === this.cusTypes['FINNER']) {
          return false;
        }
        return this.form.roles.indexOf(this.adminCode) >= 0;
      },
      showCertFile () {
        if (!this.$store.state.contextData.user.ent.cusType || this.$store.state.contextData.user.ent.cusType === this.cusTypes['FINNER']) {
          return false;
        }
        return true;
      }
    },
    created () {
      this.init();
    },
    methods: {
      certFileAfterLoad (files) {
        if (files && files.length > 0) {
          this.certFileEdit = false;
        } else {
          this.certFileEdit = true;
        }
      },
      init () {
        this.$api.bsp.role.selectRole4AuthUser(this.user.ent.organId, this.user.userId).then((ret) => {
          this.roles = ret;
        });
      },
      show () {
        var vm = this;
        this.form.roles = [];
        this.resetFrom();
        vm.addDialogVisible = true;
      },
      vilifyValue () {
        if (this.curOrgan.length > 0) {
          this.form.organId = this.curOrgan[this.curOrgan.length - 1];
        } else {
          this.form.organId = '';
        }
      },
      resetFrom () {
        if (this.$refs['form']) { // 重置表单
          this.$refs['form'].resetFields();
        }
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {...this.form};
            if (!this.showCertFile) {
              obj.certFileIds = '';
            } else if (!obj.certFileIds) {
              this.$alert('请上传证件！', '提示', {
                confirmButtonText: '确定',
                type: MsgType.WARING
              });
              return;
            }
            if (!this.showAuthFile) {
              obj.authFileIds = '';
            } else if (this.showAuthFile && !obj.authFileIds) {
              this.$alert('请上传企业授权书！', '提示', {
                confirmButtonText: '确定',
                type: MsgType.WARING
              });
              return;
            }

            obj.roleCodes = obj.roles.join(',');
            delete obj.roles;
            this.loading = true;
            this.$api.bsp.user.addUserForEnt(obj).then(ret => {
              this.loading = false;
              if (ret.type === MsgType.SUCCESS) {
                this.goBack();
              }
            });
          } else {
            return false;
          }
        });
      },
      goBack () {
        this.$router.push({name: 'bsp.biz.enterprise-user'});
      },
      ajaxCheck (rule, value, callback) {
        let vm = this;
        if (!value) {
          callback();
        } else {
          vm.$api.bsp.user.checkCode(this.form.userId, this.form.loginName).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('登录名已存在'));
            } else {
              callback();
            }
          });
        }
      },
      checkPhoneNoUnique (rule, value, callback) {
        let vm = this;
        if (!value) {
          callback();
        } else {
          vm.$api.bsp.user.checkPhoneNoUnique(this.form.loginName, this.form.phoneNo).then(ret => {
            if (ret.type === MsgType.SUCCESS && !ret.msg) {
              callback(new Error('手机号码已存在'));
            } else {
              callback();
            }
          });
        }
      },
      checkPhoneNoForExit (rule, value, callback) {
        let vm = this;
        if (!value) {
          callback();
        } else {
          vm.$api.bsp.user.checkPhoneNoForExit(this.form.phoneNo, this.user.ent.organId).then(ret => {
            if (ret.type === MsgType.SUCCESS && ret.bean) {
              callback();
              this.form.userId = ret.bean.userId;
              this.form.userName = ret.bean.userName;
              this.form.certNo = ret.bean.certNo;
              this.form.phoneNo = ret.bean.phoneNo;
            } else {
              callback(new Error(ret.msg));
              this.form.userId = '';
              this.form.userName = '';
              // this.form.certNo = '';
              // this.form.phoneNo = '';
            }
          });
        }
      },
      genCusAuthFile () {
        if (!this.form.userName || !this.form.certNo || !this.form.phoneNo) {
          this.$alert('请先填写完整用户名称、手机号、证件号码，再下载模板！', '提示', {
            confirmButtonText: '确定',
            type: MsgType.WARING
          });
          return;
        }
        let obj = {
          customerC: {
            cusId: this.$store.state.contextData.user.ent.organId
          },
          administrator: {
            userName: this.form.userName,
            certNo: this.form.certNo,
            phoneNo: this.form.phoneNo
          }
        };
        this.$api.cust.accreditation.genCusAuthFile(JSON.stringify(obj)).then(ret => {
          if (ret) {
            sysUtil.download(httpUtil.genPath(CusHttpPrefix.API + '/file/download?id=' + ret.cusAuthFileId));
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


