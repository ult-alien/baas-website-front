<template>
  <el-dialog :title="title" :visible.sync="importDialogVisible">
  <pl-content-box-card class="no-border">
  <pl-content-box-block>
    <el-form label-width="0" :model="form" ref="form">
        <el-form-item prop="fileId" :rules="[{ required: true, message: '请上传模板'}]">
        <pl-upload-file :api="fileApi"　ref="upload" file-type="2" accept-type="xlsx,xls" v-model="form.fileId" :isOnlyOne="true"></pl-upload-file>
      </el-form-item>
    </el-form>
  </pl-content-box-block>
  <pl-affix :offset-bottom="0">
     <pl-content-box-toolbar class="text-center" :border="false">
      <div class="text-center">
        <i class="text-primary el-icon-info"></i>&nbsp;<small class="text-muted">温馨提示：如果您还没有导入模板，请点击</small>
        <small @click="download" class="text-primary pointer">[导入模板]</small>
        <br><br>
      </div>
    </pl-content-box-toolbar>
  </pl-affix>
  </pl-content-box-card>
  <div slot="footer" class="dialog-footer text-center">
	  <el-button  @click="importDialogVisible = false">关闭</el-button>
	  <el-button type="primary" :loading="loading" @click="readData">导入</el-button>
	</div>
  </el-dialog>
</template>

<script>
  import {MsgType} from '../../../../../core/constants';
  import sysUtil from '../.././../../../core/utils/sys-util';
  import {HttpPrefix} from '../../api/config';
  export default {
    props: {
      type: {
        type: String,
        default: '0' // 0：导入客户，1：导入供应商,
      },
      downloadType: {
        type: String,
        default: '0' // 0：导入客户，1：导入供应商,2:核心企业导入成员企业
      },
      inviteeCusType: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        form: {
          fileId: ''
        },
        loading: false,
        importDialogVisible: false,
        fileApi: HttpPrefix.API
      };
    },
    computed: {
      title () {
        if (this.type === '0') {
          return '导入客户';
        } else {
          return '导入供应商';
        }
      }
    },
    methods: {
      show () {
        this.importDialogVisible = true;
        this.resetFrom();
      },
      download () {
        let templateCode = 'InviteCustomerImport';
        if (this.downloadType === '1') {
          templateCode = 'InviteSupplierImport';
        } else if (this.downloadType === '2') {
          templateCode = 'InviteMemberImport';
        }
        this.$api.cust.invite.downloadTemplate(templateCode);
      },
      resetFrom () {
        this.form.fileId = '';
        if (this.$refs['upload']) {
          this.$refs['upload'].clearUploadList();
        }
      },
      readData () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$api.cust.invite.impt(this.form.fileId, this.inviteeCusType).then(ret => {
              this.loading = false;
              if (ret.type === MsgType.ERROR && !ret.show) {
                this.$alert(sysUtil.changeMsgForlog(ret.msg, HttpPrefix.API), '导入数据失败', {
                  type: MsgType.ERROR,
                  dangerouslyUseHTMLString: true,
                  center: true
                });
              } else {
                this.importDialogVisible = false;
                this.resetFrom();
                this.$emit('refresh');
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content-box-card{padding-right:0px;}
.el-form{padding-right:0px;}
</style>


