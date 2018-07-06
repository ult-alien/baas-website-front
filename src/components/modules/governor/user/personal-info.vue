<template>
  <pl-content-box v-loading.body="loading">
    <pl-page-nav >
      <div slot="nav-toolbar" v-if="isTrue">
        <el-button type="primary" size="mini" icon=" el-icon-edit" @click="handleEdit">修改</el-button>
      </div>
    </pl-page-nav>
    <pl-content-box-block>
      <pl-content-box-card>
         <el-form label-width="150px" class="static-form"><!-- static-form 让el-form-item没外边距 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="登录名">
            <el-input v-model="form.loginName" placeholder="请输入登录名" v-if="isHave"></el-input>
            <pl-content-item-text v-else>{{form.loginName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
            <pl-content-item-text>{{form.userName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" >
            <pl-content-item-text>{{form.certType | dictionary('id_type')}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="证件号码" style="width: 400px;">
            <pl-content-item-text>{{showCertNo}}&nbsp;<span class="cert-tag" v-if="form.certNo"><i class="el-icon-circle-check" style="font-size: 14px;"></i>&nbsp;已认证</span></pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码">
            <pl-content-item-text>{{form.phoneNo}}&nbsp;&nbsp;&nbsp;<el-button size="mini" @click="toEditPhone">修改</el-button></pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="邮箱" style="width: 400px;">
            <pl-content-item-text>{{form.email}}&nbsp;&nbsp;<el-button size="mini"  v-popover:emailPopover>修改</el-button></pl-content-item-text>
          </el-form-item>
          <el-popover
            placement="bottom-start"
            ref="emailPopover"
            trigger="click"
            v-model="visible"
            width="160">
            <el-form label-width="0px"  :model="emailForm" ref="emailForm">
              <el-form-item prop="email" :rules="[{ required: true, message: '参数值不能为空', trigger: 'change' },{ max: 20, message: '字符长度不能超过20', trigger: 'change' }]">
                <el-input v-model="emailForm.email" placeholder="输入邮箱"></el-input>
              </el-form-item>
              <div class="popover-content-toolbar">
                <el-button type="default" size="mini" @click="closePop">取消</el-button>
                <el-button type="primary" size="mini" @click="saveEmail">确定</el-button>
              </div>
            </el-form>
          </el-popover>
        </el-col>
         <el-col :span="12">
          <el-form-item  label="所属机构">
            <pl-content-item-text>{{form.organName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" >
            <pl-content-item-text >{{form.userState | constant('PubConstants.State')}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item  label="所属角色">
            <pl-content-item-text>{{form.userRoleNames}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <pl-content-item-text>{{form.note}}</pl-content-item-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      </pl-content-box-card>
    </pl-content-box-block>
    <pl-affix :offset-bottom="0" v-if="isHave">
         <pl-content-box-toolbar class="text-center" :border="false">
      <el-button  @click="cancel">取消</el-button>
      <el-button type="primary" icon=" anticon icon-save" @click="save">保存</el-button>
    </pl-content-box-toolbar>
    </pl-affix>
    <user-phone-edit ref="userPhoneEdit" @reload="reload"></user-phone-edit>
</pl-content-box>
</template>



<script>
    import { MsgType } from 'core/constants';
    import userPhoneEdit from './user-phone-edit.vue';
    export default{
      components: {userPhoneEdit},
      data () {
        return {
          userId: '',
          form: {
            loginName: '',
            userName: '',
            certType: '',
            certNo: '',
            phoneNo: '',
            email: '',
            organName: '',
            userRoleNames: '',
            userState: 'E',
            note: ''
          },
          isHave: false,
          isTrue: false,
          loading: false,
          visible: false,
          emailForm: {
            email: ''
          }
        };
      },
      created () {
        this.reload();
      },
      computed: {
        showCertNo () {
          if (this.form.certNo) {
            return this.form.certNo.replace(/(\d{2})(\d{15})(\d{1})/, '$1******************$3');
          }
        }
      },
      methods: {
        reload () {
          this.loading = true;
          this.userId = this.$store.state.contextData.user.userId;
          this.$api.bsp.user.selectUserById(this.userId).then((ret) => {
            this.form = ret;
            this.form.organName = this.$store.state.contextData.user.ent.organName;
            this.emailForm.email = ret.email;
            this.form.userRoleNames = this.$store.state.contextData.user.roles.map(item => {
              return item.roleName;
            }).join(',');
            if (!this.form.loginName) {
              this.isTrue = true;
            };
            setTimeout(() => {
              this.loading = false;
            }, 300);
          });
        },
        handleEdit () {
          this.isHave = true;
          this.isTrue = false;
        },
        cancel () {
          this.isHave = false;
          this.isTrue = true;
        },
        save () {
          if (this.form.loginName) {
            let params = {
              loginName: this.form.loginName
            };
            this.$api.bsp.user.updateLoginName(params).then((ret) => {
              if (ret.type === MsgType.SUCCESS) {
                this.reload();
                this.isHave = false;
              }
            });
          } else {
            this.$alert('登录名不能为空！', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        },
        closePop () {
          this.visible = false;
        },
        saveEmail () {
          this.$api.bsp.user.uploadUserInfo({userId: this.userId, email: this.emailForm.email}).then((ret) => {
            this.closePop();
            if (ret.type === MsgType.SUCCESS) {
              this.reload();
              this.isHave = false;
            }
          });
        },
        toEditPhone () {
          this.$refs.userPhoneEdit.show(this.userId, this.form.certNo);
        }
      }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.header{
	padding-left:20px;
	padding-top:20px;
}
.container{
	padding-top:20px;
}
  .cert-tag{
    height: 28px;
    line-height: 26px;
    background-color: rgba(103, 194, 58, 0.1);
    color: #67c23a;
    display:inline-block;
    padding: 0 10px;
    font-size: 12px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-sizing:border-box;
    border: 1px solid rgba(103, 194, 58, 0.2);
    white-space: nowrap;
  }
</style>


