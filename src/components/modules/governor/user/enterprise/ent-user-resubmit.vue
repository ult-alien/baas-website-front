<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <div v-if="loading" v-loading="loading" element-loading-text="加载中..."  style="padding: 30px"></div>
    <div v-else>
    <el-alert
      :title="'资料有误，' + this.lastOpt.remark"
      type="error"
      center
      show-icon :closable="false">
    </el-alert>
    <el-form label-width="120px" :model="form" ref="form">
      <pl-content-box-block>
        <pl-content-box-card>
            <el-row>
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
                  <el-form-item label="手机号" prop="phoneNo">
                    <el-input v-model="form.phoneNo" placeholder="输入手机号码" :disabled="true"></el-input>
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
      <pl-content-box-title>
        上传证件
      </pl-content-box-title>
      <pl-content-box-block>
        <pl-upload-file
                        :relateId="userData.user.userId"
                        :isEdit="isNewUser"
                        show-type="vertical"
                        :file-type="userCertFile" 
                        save-path="user" 
                        :size="5"
                        accept-type="bmp,jpg,png,jpeg"
                        :api="fileApi" 
                        v-model="form.certFileIds" :multiple="true">
        </pl-upload-file>
      </pl-content-box-block>

      <pl-content-box-title v-show="showAuthFile">
        企业授权书
      </pl-content-box-title>
      <pl-content-box-block v-show="showAuthFile" :fixed-width="false">
        <pl-upload-file
          show-type="vertical"
          :relateId="userData.userExtra.authFileRlatId"
          :file-type="userAuthCertFile" 
          save-path="user" 
          :size="5"
          accept-type="bmp,jpg,png,jpeg"
          :api="fileApi" 
          v-model="form.authFileIds" :multiple="true">
        </pl-upload-file>
      </pl-content-box-block>
    </el-form>
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="default"  @click="goBack">返回</el-button>
        <el-button type="primary"  :loading="saveLoading" @click="save">重新提交</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
    </div>
  </pl-content-box>


</template>
<script>
  import {MsgType} from '../../../../../core/constants';
  import {HttpPrefix} from '../../api/config';
  import validators from 'core/utils/validators.js';
  import dictionaryUtil from '../.././../../../core/utils/dictionary-util';
  import constantUtil from 'core/utils/constant-util.js';
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
          note: '',
          roles: [],
          certFileIds: '',
          authFileIds: ''
        },
        props: {
          value: 'organId',
          children: 'children',
          label: 'organName'
        },
        roles: [],
        curOrgan: [],
        fileApi: HttpPrefix.API,
        saveLoading: false,
        loading: false,
        phoneRules: [{required: true, message: '请输入电话号码'},
          {validator: checkPhone, trigger: 'blur'},
          {validator: this.checkPhoneNoUnique, trigger: 'blur'}],
        user: this.$store.state.contextData.user,
        userCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        userAuthCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        userData: {},
        lastOpt: {}
      };
    },
    computed: {
      adminCode () {
        if (this.user) {
          return dictionaryUtil.getDic('cus_type.cus_type_c.' + this.user.ent.cusType).extension2;
        }
        return '';
      },
      showAuthFile () {
        return this.form.roles.indexOf(this.adminCode) >= 0;
      },
      isNewUser () {
        if (this.userData && this.userData.user && !this.userData.user.password) {
          return true;
        }
        return false;
      }
    },
    created () {
      this.init();
    },
    methods: {
      init () {
        let params = this.$route.params;
        if (!params || !params.userId || !params.entId) {
          this.goBack();
          return;
        }
        this.loading = true;
        this.$api.bsp.user.getEntUserInfo(params.userId, params.entId).then(ret => {
          this.userData = ret;

          this.form.userId = this.userData.user.userId;
          this.form.loginName = this.userData.user.loginName;
          this.form.userName = this.userData.user.userName;
          this.form.certType = this.userData.user.certType;
          this.form.certNo = this.userData.user.certNo;
          this.form.phoneNo = this.userData.user.phoneNo;
          this.form.email = this.userData.user.email;
          this.form.note = this.userData.user.note;
          this.form.roles = this.userData.roles.map(item => {
            return item.roleCode;
          });
          this.loading = false;
        });

        this.$api.bsp.role.selectRole4AuthUser(this.user.ent.organId, this.user.userId).then((ret) => {
          this.roles = ret;
        });

        this.$api.bsp.user.getLastOpt(params.userId, params.entId).then(ret => {
          this.lastOpt = ret;
        });
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
            if (!obj.certFileIds) {
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
            this.saveLoading = true;
            this.$api.bsp.user.addUserForEnt(obj).then(ret => {
              this.saveLoading = false;
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
            } else {
              callback(new Error(ret.msg));
              this.form.userId = '';
              this.form.userName = '';
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


