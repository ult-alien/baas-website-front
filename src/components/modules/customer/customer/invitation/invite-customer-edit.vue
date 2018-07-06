<template>
  <el-dialog :title="title" :visible.sync="editDialogVisible" width="500px">
    <pl-content-box-card class="no-border">
    <el-form label-width="120px" :model="form" ref="form">
            <el-row>
              <el-col :span="24" v-if="showInviter">
                <el-form-item label="邀请企业" prop="inviterId" :rules="[
                    {required: required, message: '请选择邀请企业', trigger: 'change'}]">
                  <el-select v-model="form.inviterId" placeholder="请选择">
                    <el-option
                      v-for="item in organs"
                      :key="item.cusId"
                      :label="item.cusName"
                      :value="item.cusId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="企业名称" prop="inviteeName" :rules="[
                            {required: true, message: '请输入企业名称'},
                            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'change' }
                          ]">
                  <el-input v-model="form.inviteeName" placeholder="请填写企业名称" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="联系人" prop="contactorName" :rules="[
                            { required: true, message: '请填写企业的联系人姓名', trigger: 'change' },
                            { max: 30, message: '字符长度不能超过30' }
                          ]">
                  <el-input v-model="form.contactorName" placeholder="请填写企业的联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="联系人手机号" prop="contactorPhone" :rules="[
                            {required: true, message: '请输入电话号码', trigger: 'change'},
                            {validator: telephoneValidator, trigger: 'blur'}
                          ]">
                  <el-input v-model="form.contactorPhone" placeholder="请填写企业的联系人手机号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
    </el-form>
    </pl-content-box-card>
    <div slot="footer" class="dialog-footer text-center">
      <el-button type="default" @click="editDialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { MsgType } from 'core/constants';
  export default {
    data () {
      return {
        organs: [],
        form: {
          inviterId: '',
          inviteeName: '',
          contactorName: '',
          contactorPhone: '',
          inviteeCusType: ''
        },
        showInviter: true,
        loading: false,
        editDialogVisible: false,
        title: '编辑企业',
        required: false
      };
    },
    created () {
//      this.$api.cust.invite.getFinAndFocalCusList().then(ret => {
//        this.organs = ret;
//      });
      if (this.showInviter) {
        this.$api.cust.customer.findCusByType('FOCAL_CO').then(ret => {
          let ent = this.$store.state.contextData.user.ent;
          this.organs = ret;
          let cus = {
            cusId: ent.organId,
            cusName: ent.organName
          };
          this.organs.push(cus);
        });
      }
    },
    methods: {
      // 验证电话号码
      telephoneValidator (rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          if (!(/^1[34578]\d{9}$/.test(value))) {
            callback(new Error('请输入合理手机号码'));
          } else {
            callback();
          }
        }
      },
      show (obj, showInviter = true) {
        this.showInviter = showInviter;
        this.editDialogVisible = true;
        this.form = {...obj};
        if (obj.inviteeName) {
          this.title = '编辑企业';
        } else {
          this.title = '新增企业';
        }
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            let obj = {...this.form};
            if (!this.form.inviterId) {
              obj.inviterId = this.$store.state.contextData.user.ent.organId;
            }
            this.$api.cust.invite.editInvitation(obj).then(ret => {
              this.loading = false;
              if (MsgType.SUCCESS === ret.type) {
                this.editDialogVisible = false;
                this.$emit('refresh');
              }
            });
          } else {
            this.loading = false;
            this.$alert('保存失败，请查看输入错误提示信息!', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return false;
          }
        });
      },
      goBack () {
        this.$router.push({ name: 'bsp.biz.inviti-customer' });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
