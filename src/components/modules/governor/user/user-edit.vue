e<template>
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" style="width:100%">
        <pl-content-box-card class="no-border">
          <el-form label-width="110px"  :model="form" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录名" prop="loginName" :rules="[
                    { required: true, message: '请输入登录名', trigger: 'change' },
                    { max: 30, message: '字符长度不能超过30', trigger: 'change' },
                    { validator: ajaxCheck, trigger: 'change' }
                  ]">
                  <el-input v-model="form.loginName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="用户名称" prop="userName" :rules="[
                    { required: true, message: '请输入用户名称', trigger: 'change' },
                    { max: 30, message: '字符长度不能超过30', trigger: 'change' }
                  ]">
                  <el-input v-model="form.userName" placeholder="输入用户名称"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">-->
                <!--<el-form-item label="证件类型" prop="certType" :rules="[-->
                      <!--{required: true, message: '请输入证件类型', trigger: 'change'}-->
                  <!--]">-->
                  <!--<pl-dictionary-select type="id_type" v-model="form.certType" :showEmpty="false"></pl-dictionary-select>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="12">-->
                <!--<el-form-item label="证件号码" prop="certNo" :rules="[-->
                  <!--{required: true, message: '请填写证件号码', trigger: 'change' },{validator: checkcertNo, trigger: 'change'}]">-->
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
                    {required: true, message: '请输入电子邮箱', trigger: 'change'},
                    { max: 50, message: '字符长度不能超过50', trigger: 'change' },
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ]">
                  <el-input v-model="form.email" placeholder="输入电子邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门" prop="organId" :rules="[
                    {required: true, message: '请选择所属部门', trigger: 'change'}
                ]">
                  <el-cascader v-model="curOrgan" :disabled="true"
                                 :options="organs"
                                 :show-all-levels="false"
                                 :props="props"
                                 :change-on-select="true"
                                 :clearable="true"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                 <el-form-item label="状态" >
                    <pl-content-item-text >{{form.userState | constant('PubConstants.State')}}</pl-content-item-text>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="描述" prop="note" :rules="[
                  { max: 50, message: '字符长度不能超过50', trigger: 'change' }
                ]">
                  <el-input type="textarea" v-model="form.note"></el-input>
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
  import {MsgType} from '../../../../core/constants';
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
        editDialogVisible: false,
        form: {
          userId: '',
          loginName: '',
          userName: '',
          certType: '',
          certNo: '',
          phoneNo: '',
          email: '',
          userState: '',
          groupId: '',
          creatorId: '',
          organId: ''
        },
        curOrgan: [],
        props: {
          value: 'organId',
          children: 'children',
          label: 'organName'
        },
        loading: false,
        phoneRules: [{required: true, message: '请输入电话号码', trigger: 'change'},
                      {validator: checkPhone, trigger: 'blur,change'},
                    { validator: this.checkPhoneNoUnique, trigger: 'change' }]
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
      show (index, obj) {
        let vm = this;
        vm.form.userId = obj.userId;
        vm.form.loginName = obj.loginName;
        vm.form.userName = obj.userName;
        vm.form.certType = obj.certType;
        vm.form.certNo = obj.certNo;
        vm.form.phoneNo = obj.phoneNo;
        vm.form.email = obj.email;
        vm.form.userState = obj.userState;
        vm.form.note = obj.note;
        this.$api.bsp.organ.selectByOrganId(obj.organId).then((ret) => {
          if (ret !== '') {
            vm.form.organId = obj.organId;
            let organ = ret;
            if (vm.organs) {
              let rootOrgan = vm.organs[0]; // 获取到根机构
              let rootOrganId = rootOrgan.organId; // 获取到根机构ID
              let realSturPath = organ.struPath.substring(organ.struPath.indexOf(rootOrganId), organ.struPath.length);// 从根机构ID开始截取path
              vm.curOrgan = realSturPath.split(';'); // 拆分成数组绑定回显
            }
          }
        });
        vm.editDialogVisible = true;
      },
      save () {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            vm.loading = true;
            if (this.curOrgan.length > 0) {
              this.form.organId = this.curOrgan[this.curOrgan.length - 1];
            }
            vm.$api.bsp.user.updateUser(this.form).then(ret => {
              vm.loading = false;
              this.$emit('update-table');
              this.editDialogVisible = false;
              this.$refs['form'].resetFields();
            });
          } else {
            return false;
          }
        });
      },
      goBack () {
        this.editDialogVisible = false;
        this.$refs['form'].resetFields();
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
          console.log(this.form.userId);
          vm.$api.bsp.user.checkPhoneNoUnique(this.form.userId, this.form.phoneNo).then(ret => {
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


