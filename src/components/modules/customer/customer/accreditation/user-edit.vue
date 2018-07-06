e<template>
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" style="width:100%">
        <pl-content-box-card class="no-border">
          <el-form label-width="110px"  :model="form" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录名" prop="loginName" :rules="[
                    { max: 30, message: '字符长度不能超过30', trigger: 'blur' },
                    { validator: ajaxCheck, trigger: 'blur' }
                  ]">
                  <el-input v-model="form.loginName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item :label="(this.isAdmin ? '管理员' : '操作员') + '姓名'" prop="userName" :rules="[
                    { required: true, message: '请输入操作员姓名', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度为1 到15 个字符', trigger: 'blur' }
                  ]">
                  <el-input v-model="form.userName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件类型" prop="certType" :rules="{
                    required: true, message: '证件类型不能为空', trigger: 'blur'
                  }">
                  <pl-dictionary-select type="id_type" invalidDics="id_type_5,id_type_6,id_type_7" v-model="form.certType" :showEmpty="false" ></pl-dictionary-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件号码" prop="certNo" :rules="[
                    { required: true, message: '证件号码不能为空', trigger: 'blur'},
                    { validator: certNoValidator, trigger: 'blur', certType: form.certType }
                  ]">
                  <el-input v-model="form.certNo" placeholder="请输入操作员证件号码"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="(this.isAdmin ? '管理员' : '操作员') + '手机'" prop="phoneNo" :rules="{ validator: telephoneValidator, trigger: 'blur', userId: form.userId }">
                  <el-input v-model="form.phoneNo" placeholder="输入操作员手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email" :rules="[
                    { max: 50, message: '字符长度不能超过50', trigger: 'blur' },
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ]">
                  <el-input v-model="form.email" placeholder="输入邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </pl-content-box-card >
           <div slot="footer" class="dialog-footer text-center">
            <el-button  @click="goBack">关闭</el-button>
            <el-button type="primary" :loading="loading" @click="save">确定</el-button>     <!-- icon=" anticon icon-save" -->
          </div>
        </el-dialog>

</template>
<script>
  import {MsgType} from 'core/constants';
  import validators from 'core/utils/validators.js';
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
        editDialogVisible: false,
        isAdmin: false,
        form: {
          userName: '',
          certType: '',
          phoneNo: '',
          email: '',
          certNo: '',
          loginName: '',
          userId: ''
        },
        index: '',
        loading: false,
        phoneRules: [{required: true, message: '请输入电话号码', trigger: 'change'},
                      {validator: checkPhone, trigger: 'blur,change'},
                    { validator: this.validateTelephone, trigger: 'change' }]
      };
    },
    methods: {
      checkcertNo (rule, value, callback) {
        switch (this.form.certType) {
          case 'id_type_1':
            if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_2':
            if (!(/^[a-zA-Z0-9]{5,17}$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_3':
            if (!(/^[HMChmc]{1}([0-9]{8,10})$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          case 'id_type_4':
            if (!(/^[0-9]{8,10}$/.test(value))) {
              callback(new Error('请输入正确的证件号码'));
            } else {
              callback();
            }
            break;
          default:
            callback(new Error('请输入正确的证件号码'));
        }
      },
      show (obj, index, isAdmin) {
        this.index = index;
        this.form = {
          userName: '',
          certType: '',
          phoneNo: '',
          email: '',
          certNo: '',
          loginName: '',
          userId: ''
        };
        this.isAdmin = isAdmin;
        this.form = {...this.form, ...obj};
        this.editDialogVisible = true;
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.editDialogVisible = false;
            this.$emit('save', this.form, this.index);
          } else {
            return false;
          }
        });
      },
      goBack () {
        this.editDialogVisible = false;
        this.$refs['form'].resetFields();
      },
      validateTelephone (rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          if (!(/^1[34578]\d{9}$/.test(value))) {
            callback(new Error('请输入合理手机号码'));
          } else {
            this.$api.bsp.accreditation.checkUserExist({'phoneNo': value}).then(ret => {
              if (ret) {
                callback(new Error('手机号码已注册'));
              } else {
                callback();
              }
            });
          }
          callback();
        }
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


