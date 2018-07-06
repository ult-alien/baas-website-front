<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <div v-if="loading" v-loading="loading" element-loading-text="加载中..."  style="padding: 30px"></div>
    <div v-else>
      <ent-user-detial  :data="userData"></ent-user-detial>
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">

          <div class="apr-block" v-if="showOpt">
            <el-form label-width="80px" ref="form" :model="form" style="width: 350px;margin: 0px auto;" class="static-form">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="终审结果" prop="result" :rules="[
                   { required: true, message: '请选择审批结果'}]">
                    <pl-content-item-text class="text-left" :is-multi-line="true">
                      <el-radio v-model="form.result" label="1">确认无误</el-radio>
                      &emsp;&emsp;
                      <el-radio v-model="form.result" label="0">材料有误</el-radio>
                    </pl-content-item-text>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.result === '0'">
                  <el-form-item :rules="[
                  { required: true, message: '请填写驳回原因'},
                  { max: 100, message: '字符长度不能超过100'}]" prop="remark">
                    <span slot="label">原&emsp;&emsp;因</span>
                    <el-input type="textarea" :autosize="true" v-model="form.remark" :rows="1"  placeholder="请填写驳回原因">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-button type="default"  @click="goBack">返回</el-button>
          <el-button type="info"  @click="reject" :disabled="passLoading || form.result === '1'" :loading="rejectLoading" v-if="showOpt">驳回</el-button>
          <el-button type="primary"  @click="pass" :disabled="rejectLoading || form.result === '0'" :loading="passLoading" v-if="showOpt">通过</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    </div>
  </pl-content-box>

</template>
<script>
  import entUserDetial from './../../../../governor/user/enterprise/ent-user-detial.vue';
  import constantUtil from 'core/utils/constant-util.js';
  import {MsgType} from '../../../../../../core/constants';
  let userState = constantUtil.getConstantByKey('PubConstants.UserState');
  export default {
    components: {
      entUserDetial
    },
    data () {
      return {
        userData: null,
        loading: false,
        form: {
          result: '',
          remark: '',
          userId: '',
          entId: ''
        },
        lastOpt: {},
        passLoading: false,
        rejectLoading: false
      };
    },
    computed: {
      showOpt () {
        let userStates = [
          userState['DZS']
        ];
        if (this.userData && this.userData.userExtra && userStates.indexOf(this.userData.userExtra.userState) >= 0) {
          return true;
        }
        return false;
      }
    },
    methods: {
      goBack () {
        this.refershMsgTip('user-final-apr');
        this.$router.push({name: 'bsp.biz.cus-modify-final', params: {tab: 'user'}});
      },
      pass () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.passLoading = true;
            this.$api.bsp.user.lastTrialPass(this.form).then(ret => {
              this.passLoading = false;
              if (ret.type === MsgType.SUCCESS) {
                this.goBack();
              }
            });
          }
        });
      },
      reject () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.result !== '0') {
              this.$alert('审批结果为“资料有误”才能驳回！', '提示', {
                confirmButtonText: '确定',
                type: MsgType.WARING
              });
              return;
            }
            this.rejectLoading = true;
            this.$api.bsp.user.lastTrialReject(this.form).then(ret => {
              this.rejectLoading = false;
              if (ret.type === MsgType.SUCCESS) {
                this.goBack();
              }
            });
          }
        });
      }
    },
    created () {
      let params = this.$route.params;
      if (!params || !params.userId || !params.entId) {
        this.goBack();
        return;
      }
      this.form.userId = params.userId;
      this.form.entId = params.entId;
      this.loading = true;
      this.$api.bsp.user.getEntUserInfo(params.userId, params.entId).then(ret => {
        this.userData = ret;
        this.userData.user.oprTime = params.oprTime;
        this.userData.user.oprName = params.oprName;
        this.loading = false;
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../../../assets/scss/variables";
  .apr-block{
    margin-bottom: 12px;
    padding: 5px 0px;
    border-bottom: 1px solid $border-color;
  }
</style>


