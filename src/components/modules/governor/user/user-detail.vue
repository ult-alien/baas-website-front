<template>
  <el-dialog title="详细信息" :visible.sync="detailDialogVisible">
  <pl-content-box-card class="no-border">
    <el-form label-width="100px" class="static-form"><!-- static-form 让el-form-item没外边距 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="登录名">
            <pl-content-item-text>{{form.loginName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名称">
            <pl-content-item-text>{{form.userName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" >
            <pl-content-item-text>{{form.certType | dictionary('id_type')}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="证件号码">
            <pl-content-item-text>{{form.certNo}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" >
            <pl-content-item-text>{{form.phoneNo}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="邮箱">
            <pl-content-item-text>{{form.email}}</pl-content-item-text>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item  label="所属机构">
            <pl-content-item-text :is-multi-line="true">{{form.organName}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" >
            <pl-content-item-text >{{form.userState | constant('PubConstants.State')}}</pl-content-item-text>
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item  label="所属角色">
            <pl-content-item-text :is-multi-line="true">{{form.userRoleNames}}</pl-content-item-text>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <pl-content-item-text :is-multi-line="true">{{form.note}}</pl-content-item-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </pl-content-box-card >
    <div slot="footer" class="dialog-footer text-center">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="detailDialogVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
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
        test: this.$store.state.contextData.constantsValueMap.State,
        detailDialogVisible: false
      };
    },
    methods: {
      show (index, row) {
        let vm = this;
        vm.form = row;
        vm.detailDialogVisible = true;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>


