<template>
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" style="width:100%">
         <pl-content-box-card class="no-border">
          <el-form label-width="100px"  :model="form" ref="form">
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
                <el-form-item label="用户名称" prop="userName" :rules="[
                    { required: true, message: '请输入用户名称'},
                   { max: 30, message: '字符长度不能超过30'}
                  ]">
                  <el-input v-model="form.userName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">-->
                <!--<el-form-item label="证件类型" prop="certType" :rules="[-->
                      <!--{required: true, message: '请输入证件类型'}-->
                  <!--]">-->
                  <!--<el-select placeholder="请选择证件类型" v-model="form.certType">-->
                    <!--<el-option v-for="item in items" :label="item.dicName" :value="item.dicCode">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="12">-->
                <!--<el-form-item label="证件号码" prop="certNo" :rules="[-->
                  <!--{required: true, message: '请填写证件号码', trigger: 'change' },-->
                  <!--{pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '证件号码格式有误！', trigger: 'change'}-->
                  <!--]">-->
                  <!--<el-input v-model="form.certNo" placeholder="输入证件号码"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phoneNo" :rules="phoneRules">
                  <el-input v-model="form.phoneNo" placeholder="输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop="email" :rules="[
                    {required: true, message: '请输入电子邮箱'},
                    { max: 50, message: '字符长度不能超过50'},
                    {type: 'email', message: '请输入正确的邮箱地址',  trigger: 'blur'}
                ]">
                  <el-input v-model="form.email" placeholder="输入电子邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门"  prop="organId" :rules="[
                    {required: true, message: '请选择所属部门'}
                ]">
                  <el-cascader v-model="curOrgan"
                                 :options="organs"
                                 :show-all-levels="false"
                                 :props="props"
                                 :change-on-select="true"
                                 :clearable="true"
                                 @change="vilifyValue"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="状态" prop="userState">
                    <pl-constant-radio type="PubConstants.State" v-model="form.userState" ></pl-constant-radio>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="描述" prop="note" :rules="[
                  { max: 50, message: '字符长度不能超过50'}
                ]">
                  <el-input type="textarea" v-model="form.note"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </pl-content-box-card>
          <div slot="footer" class="dialog-footer text-center">
            <el-button  @click="goBack">关闭</el-button>
            <el-button type="primary" :loading="loading" @click="save">确定</el-button>     <!-- icon=" anticon icon-save"  -->
          </div>
        </el-dialog>

</template>
<script>
  import {MsgType} from '../../../../core/constants';
  import dictionaryUtil from '../../../../core/utils/dictionary-util';
  let checkPhone = (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('请输入正确的手机号码!'));
    } else {
      callback();
    }
  };
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
        isDefaultOrgan: false,
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
          organId: ''
        },
        // organs: [],
        items: [],
        props: {
          value: 'organId',
          children: 'children',
          label: 'organName'
        },
        curOrgan: [],
        loading: false,
        phoneRules: [{required: true, message: '请输入电话号码'},
          {validator: checkPhone, trigger: 'blur'},
          {validator: this.checkPhoneNoUnique}]
      };
    },
    created () {
      this.items = this.dicState();
    },
    methods: {
      show () {
        var vm = this;
        this.resetFrom();
        this.curOrgan = [];
//        this.$api.bsp.organ.getOrganTreeData({organState: 'E'}).then((ret) => {
//          // ret = ret.filter(x => x.organState === 'E');
//          this.organs = ret;
//        });
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
        let vm = this;
        if (this.curOrgan.length > 0) {
          this.form.organId = this.curOrgan[this.curOrgan.length - 1];
          /* 递归验证是否选择虚拟节点start */
          this.isDefaultOrgan = false;
          this.checkOran(this.organs, this.form.organId);
          /* end */
          if (this.isDefaultOrgan) {
            this.$alert('所选部门无法办理业务，请重新选择！', '提示', {
              confirmButtonText: '确定',
              type: MsgType.WARING
            });
            return;
          }
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.loading = true;
            vm.$api.bsp.user.addUser(this.form).then(ret => {
              vm.loading = false;
              this.$emit('update-table');
              this.addDialogVisible = false;
              this.resetFrom();
            });
          } else {
            return false;
          }
        });
      },
      checkOran (organs, organId) {
        for (let i = 0; i < organs.length; i++) {
          let item = organs[i];
          if (item.organId === organId && item.sourceCode === 'DEFAULT') {
            this.isDefaultOrgan = true;
          } else if (item.children && item.children.length > 0) {
            this.checkOran(item.children, organId);
          }
        }
      },
      goBack () {
        this.addDialogVisible = false;
        this.resetFrom();
      },
      dicState () {
        let dic = dictionaryUtil.getDic('id_type');
        if (dic && dic.children) {
          let invalidDics = ',' + this.invalidDics + ',';
          return dic.children.filter(item => {
            if (invalidDics.indexOf(',' + item.dicCode + ',') !== -1) {
              return false;
            }
            return item.dicState === 'E';
          });
        }
        return [];
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
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>


