<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <div v-if="loading" v-loading="loading" element-loading-text="加载中..."  style="padding: 30px"></div>
    <div v-else>
      <el-form label-width="120px" :model="form" ref="form">
        <pl-content-box-block>
          <pl-content-box-card>
            <el-row>
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

                  <el-form-item label="用户名称" prop="userName">
                    <pl-content-item-text>
                      {{userData.user.userName}}
                    </pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号" prop="phoneNo">
                    <pl-content-item-text>
                      {{userData.user.phoneNo}}
                    </pl-content-item-text>
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
                  <el-form-item label="证件类型" prop="certType" >
                    <pl-content-item-text>{{userData.user.certType | dictionary('id_type')}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件号码" prop="certNo">
                    <pl-content-item-text>{{userData.user.certNo}}</pl-content-item-text>
                  </el-form-item>
                </el-col>
              <el-col :span="12">
                <el-form-item  label="所属企业">
                  <pl-content-item-text :is-multi-line="true">{{userData.entName}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" >
                  <pl-content-item-text >{{userData.userExtra.userState | constant('PubConstants.UserState')}}</pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="所属角色">
                  <pl-content-item-text :is-multi-line="true">
                  <span v-for="item in userData.roles">
                    {{item.roleName}}&nbsp;
                  </span>
                  </pl-content-item-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="描述">
                  <pl-content-item-text :is-multi-line="true">{{userData.user.note}}</pl-content-item-text>
                </el-form-item>
              </el-col>
            </el-row>
          </pl-content-box-card>
        </pl-content-box-block>
        <pl-content-box-title v-if="showCertFile">
          上传证件
          &emsp;
          <!--<small>
            <i class="el-icon-warning text-primary"></i>上传用户证件照片，身份证则必须提供正反面，<span class="text-warning">加盖公章</span>请务必与用户信息中填写的证件信息一致
          </small>-->
        </pl-content-box-title>
        <pl-content-box-block v-if="showCertFile">
          <pl-upload-file
            :relateId="userData.user.userId"
            :isEdit="false"
            show-type="vertical"
            :file-type="userCertFile" 
            save-path="user" 
            :size="5"
            accept-type="bmp,jpg,png,jpeg"
            :api="fileApi"  :multiple="true">
          </pl-upload-file>
          <small>
            <i class="text-primary el-icon-info"></i>&nbsp;<span class="text-muted">
            支持文件类型&nbsp;pdf、doc、docx、jpg、png、jpeg、bpm&nbsp;,最大不能超过&nbsp;5M
          </span>
          </small>
        </pl-content-box-block>

        <pl-content-box-title v-show="userData.userExtra.authFileRlatId">
          企业授权书
          &emsp;
          <!--<small>-->
            <!--<i class="el-icon-warning text-primary"></i>&ensp;请下载<span class="link" @click="genCusAuthFile">企业授权书模板</span>，<span class="text-warning">加盖公章</span>，拍照上传-->
          <!--</small>-->
        </pl-content-box-title>
        <pl-content-box-block v-show="userData.userExtra.authFileRlatId" :fixed-width="false">
          <pl-upload-file
            show-type="vertical"
            :isEdit="false"
            :relateId="userData.userExtra.authFileRlatId"
            :file-type="userAuthCertFile" 
            save-path="user" 
            :size="5"
            accept-type="bmp,jpg,png,jpeg"
            :api="fileApi"  :multiple="true">
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
          <el-button type="default"  @click="goBack">返回</el-button>
          <el-button type="primary"  :loading="saveLoading" @click="save">提交</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </div>
  </pl-content-box>


</template>
<script>
  import {MsgType} from '../../../../../core/constants';
  import {HttpPrefix} from '../../api/config';
//  import dictionaryUtil from '../.././../../../core/utils/dictionary-util';
  import constantUtil from 'core/utils/constant-util.js';
  export default {
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
        form: {
          userId: '',
          loginName: '',
          email: '',
          entId: ''
        },
        fileApi: HttpPrefix.API,
        saveLoading: false,
        loading: false,
        user: this.$store.state.contextData.user,
        userCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        userAuthCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        userData: {},
        cusTypes: constantUtil.getConstantByKey('CustomerConstants.CusType')
      };
    },
    created () {
      this.init();
    },
    computed: {
      showCertFile () {
        if (!this.$store.state.contextData.user.ent.cusType || this.$store.state.contextData.user.ent.cusType === this.cusTypes['FINNER']) {
          return false;
        }
        return true;
      }
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
          this.form.email = this.userData.user.email;
          this.form.entId = this.userData.userExtra.entId;
          this.loading = false;
        });
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.saveLoading = true;
            this.$api.bsp.user.updateUserForEnt(this.form).then(ret => {
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
        let back = 'bsp.biz.enterprise-user';
        if (this.$route.params && this.$route.params.back) {
          back = this.$route.params.back;
        }
        this.$router.push({name: back});
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
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
