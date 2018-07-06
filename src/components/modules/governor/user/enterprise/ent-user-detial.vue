<template>
  <pl-content-box>

      <pl-content-box-block>
        <pl-content-box-card-group>
        <pl-content-box-card>
        <el-form label-width="120px" ref="form" class="static-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="登录名">
                <pl-content-item-text>{{data.user.loginName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称">
                <pl-content-item-text>{{data.user.userName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件类型" >
                <pl-content-item-text>{{data.user.certType | dictionary('id_type')}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="证件号码">
                <pl-content-item-text>{{data.user.certNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话号码" >
                <pl-content-item-text>{{data.user.phoneNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="邮箱">
                <pl-content-item-text>{{data.user.email}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="所属企业">
                <pl-content-item-text :is-multi-line="true">{{data.entName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" >
                <pl-content-item-text >{{data.userExtra.userState | constant('PubConstants.UserState')}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item  label="所属角色">
                <pl-content-item-text :is-multi-line="true">
                  <span v-for="item in data.roles">
                    {{item.roleName}}&nbsp;
                  </span>
                </pl-content-item-text>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="描述">
                <pl-content-item-text :is-multi-line="true">{{data.user.note}}</pl-content-item-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </pl-content-box-card>
      <pl-content-box-card v-if="data.user.oprName">
        <el-form label-width="120px" ref="form" class="static-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人">
                <pl-content-item-text>{{data.user.oprName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请时间">
                <pl-content-item-text>{{data.user.oprTime}}</pl-content-item-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </pl-content-box-card>

      </pl-content-box-card-group>
      </pl-content-box-block>
      <pl-content-box-title v-if="showCertFile">
        证件资料
      </pl-content-box-title>
      <pl-content-box-block v-if="showCertFile">
        <pl-upload-file
          :relateId="data.user.userId"  :isEdit="false"
          show-type="vertical"
          :file-type="userCertFile" 
          save-path="user" 
          :size="5"
          accept-type="bmp,jpg,png,jpeg"
          :api="fileApi" >
        </pl-upload-file>
      </pl-content-box-block>

      <pl-content-box-title v-if="data.userExtra.authFileRlatId">
        企业授权书
      </pl-content-box-title>
      <pl-content-box-block v-if="data.userExtra.authFileRlatId" :fixed-width="false">
        <pl-upload-file
          :relateId="data.userExtra.authFileRlatId" :isEdit="false"
          show-type="vertical"
          :file-type="userAuthCertFile" 
          save-path="user" 
          :size="5"
          accept-type="bmp,jpg,png,jpeg"
          :api="fileApi" >
        </pl-upload-file>
      </pl-content-box-block>
  </pl-content-box>


</template>
<script>
  import {HttpPrefix} from '../../api/config';
  import constantUtil from 'core/utils/constant-util.js';
  export default {
    props: {
      data: {
        type: Object,
        default () {
          return {
            user: {},
            userExtra: {},
            roles: {},
            entName: ''
          };
        }
      }
    },
    computed: {
      showCertFile () {
        if (!this.$store.state.contextData.user.ent.cusType || this.$store.state.contextData.user.ent.cusType === this.cusTypes['FINNER']) {
          return false;
        }
        return true;
      }
    },
    data () {
      return {
        fileApi: HttpPrefix.API,
        userCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['USER_CERTIFICATE'],
        userAuthCertFile: constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
        cusTypes: constantUtil.getConstantByKey('CustomerConstants.CusType')
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


