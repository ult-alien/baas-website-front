<template>
  <pl-content-box>
    <pl-page-nav>
      <!--<div slot="nav-tip" v-if="showAdd">-->
        <!--<el-button type="primary" @click="add">新增</el-button>-->
      <!--</div>-->
    </pl-page-nav>
    <pl-content-box-block v-loading="loading">
      <div v-if="showFlag" class="card-wrap" style="overflow: hidden;">
        <div v-for="(item, index) in data">
          <div @click="showRemark(item)" :title="item.acctState === AcctState['INVALID'] && item.aprvRs === AprvRs['REJECT'] ? '点击查看驳回原因' : ''" class="bankAcct-item" :class="[isDefault(item.acctUses) ? 'selected' : '', item.acctState === AcctState['REVIEW'] || item.acctState === AcctState['REVIEW_FINAL'] ? 'review' : (item.acctState === AcctState['INVALID'] ? 'invalid' : 'normal')]">
            <div class="bankAcct-name">
              <div class="backAcct-title">
                <img :src="item.imgUrl" onerror="javascript:this.src = 'static/img/error.png';"/>{{item.bankName}}
                <span class="state warning" style="float: right;" v-if="item.acctState === AcctState['REVIEW']">待初审</span>
                <span class="state warning" style="float: right;" v-if="item.acctState === AcctState['REVIEW_FINAL']">待终审</span>
                <span class="state info" style="float: right;" v-if="item.acctState === AcctState['INVALID'] && item.aprvRs === AprvRs['REJECT']">审批驳回</span>
                <span class="state info" style="float: right;" v-if="item.acctState === AcctState['INVALID'] && item.aprvRs !== AprvRs['REJECT']">已作废</span>
              </div>
              <div class="bankAcct-content">
                <div class="backAcct-no"> {{item.showAcctNo}}</div>
                <div class="factory-name">账户名称：{{item.acctName}}</div>
              </div>
              <div class="text-center tool-bar">
                 <el-button type="primary" round size="mini" v-if="!isDefault(item.acctUses) && showAdd && item.acctState === AcctState['NORMAL']"
                            @click="handleDefault(item)">设为默认</el-button>
                 <el-button type="default" round size="mini" v-if="!isDefault(item.acctUses) && showAdd && item.acctState === AcctState['NORMAL']"
                            @click.native="setInvalid(item, $event)">不再使用</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="bankAcct-item-add" @click="add" v-if="showAdd" v-tooltip="'点击新增账号'">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <pl-empty-tip v-if="!showFlag" :text="'暂时没相关账号信息！'" ></pl-empty-tip>
    </pl-content-box-block>
    <account-add ref="accountAdd" @queryData="getPageData"></account-add>
  </pl-content-box>
</template>
<script>
  import {MsgType} from 'core/constants';
  import constantUtil from 'core/utils/constant-util';
  import accountAdd from './account-add.vue';
  export default {
    data () {
      return {
        data: {},
        showFlag: true,
        AcctType: constantUtil.getConstantByKey('AccountConstants.AcctType'),
        AcctState: constantUtil.getConstantByKey('AccountConstants.AcctState'),
        CusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
        RoleCode: constantUtil.getConstantByKey('BizConstants.RoleCode'),
        DefaultUse: constantUtil.getConstantByKey('AccountConstants.AcctUse')['SETTLE'],
        AprvRs: constantUtil.getConstantByKey('BizConstants.AprvRs'),
        loading: true
      };
    },
    methods: {
      // 获取数据
      getPageData () {
        this.$api.cust.account.getAccounts().then((ret) => {
          this.data = this.getAcctNo(ret);
          if (this.data.length === 0) {
            this.showFlag = false;
          } else {
            this.showFlag = true;
          }
          window.setTimeout(() => {
            this.loading = false;
          }, 200);
        });
      },
      // 将账号设置为*****
      getAcctNo (data, virtualBanks) {
        for (let i = 0, leng = data.length; i < leng; i++) {
          let length = data[i].acctNo.length;
          data[i]['showAcctNo'] = data[i]['acctNo'].slice(0, 4) + '******' + data[i]['acctNo'].slice(length - 4);
          data[i]['imgUrl'] = 'static/img/' + data[i]['bankCode'] + '.png';
        }
        return data;
      },
      addCreditCard () {
        if (this.showFlag) {
          this.$router.push({name: 'afin.work.farmar-credit-card-add'});
        } else {
          this.$alert('尚未开立虚拟账号，不允许绑卡！', '提示', {
            type: 'warning'
          });
        }
      },
      add () {
        this.$refs.accountAdd.show();
      },
      showRemark (item) {
        if (item.acctState === this.AcctState['INVALID'] && item.aprvRs === this.AprvRs['REJECT']) {
          this.$alert(item.aprvRemark, '驳回原因', {
            confirmButtonText: '确定'
          });
        }
      },
      handleDefault (item) {
        this.$api.cust.account.setDefault(item.acctId).then((ret) => {
          if (ret.type === MsgType.SUCCESS) {
            this.getPageData();
          }
        });
      },
      setInvalid (item, $event) {
        $event.stopPropagation();
        this.$api.cust.account.setInvalid(item.acctId).then((ret) => {
          if (ret.type === MsgType.SUCCESS) {
            this.getPageData();
          }
        });
      },
      hasRole (roleCode) {
        return this.$store.state.contextData.user.roles.some((item, index) => {
          return item.roleCode === roleCode;
        });
      },
      isDefault (acctUses) {
        if (!acctUses) {
          return false;
        }
        return acctUses.some((item, index) => {
          return item.useCode === this.DefaultUse;
        });
      }
    },
    created () {
      this.getPageData();
    },
    components: {
      accountAdd
    },
    computed: {
      showAdd () {
        if (this.$store.state.contextData.user.ent.cusType === this.CusType['FINNER'] && this.hasRole(this.RoleCode['FIN_INST_ADMIN'])) { // 保理管理员
          return true;
        } else if (this.$store.state.contextData.user.ent.cusType === this.CusType['FOCAL_CO'] && this.hasRole(this.RoleCode['FOCAL_CO_INST_USER'])) { // 核心企业管理员
          return true;
        } else if (this.$store.state.contextData.user.ent.cusType === this.CusType['MEMBER'] && this.hasRole(this.RoleCode['MEM_ADMIN'])) { // 成员企业管理员
          return true;
        } else if (this.$store.state.contextData.user.ent.cusType === this.CusType['SUPPLIER'] && this.hasRole(this.RoleCode['SUP_ADMIN'])) { // 供应商管理员
          return true;
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../assets/scss/_index.scss";
  .deposit-bank {
    padding-bottom: 5px;
      &::before {
        content: '';
        display: inline-block;
        width: 150px;
        height: 1px;
        background: #999;
        margin-right:10px;
        line-height: 20px;
        position: relative;
        top:-3px;
      }
      &::after {
        content: '';
        display: inline-block;
        width: 410px;
        height: 1px;
        background: #999;
        margin-left:10px;
        line-height: 20px;
        position: relative;
        top:-3px;
      }
  }
  .bankAcct-item-add{
    width: 283px;
    height: 162px;
    border: 1px $primary-color dashed;
    float: left;
    margin: 0 15px 20px 10px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    line-height: 160px;
    text-align: center;
    font-size: 50px;
    color: $primary-color;
    cursor: pointer;
    &:hover{
      background: $primary-color-light;
    }
  }
  .bankAcct-item {
    width: 283px;
    height: 162px;
    cursor: pointer;
    border: 1px solid $border-color;
    .tool-bar{
      position: absolute;
      left: 0px;
      bottom: 0px;
      display: none;
      width: 100%;
    }
    &:hover {
      .tool-bar{
        display: block;
      }
    }
    &.normal{
      border-top: 3px solid red;
    }
    &.review{
      border-top: 3px solid orange;
    }
    &.invalid{
      border-top: 3px solid grey;
    }
    float: left;
    margin: 0 15px 20px 10px;
    // margin-right: 15px;
    // margin-left: 10px;
    // margin-bottom: 20px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    &:hover {
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
    }
    &.selected{
       &::before {
        content: '';
        width: 0px;
        height: 0px;
        // border: 36px solid;
        // border-color: $primary-color $primary-color transparent transparent;
        right: 0px;
        top: 0px;
        position: absolute;
        z-index: 99;
      }
      &::after {
        content: "默认";
        width: 150px;
        height: 20px;
        position: absolute;
        right: -50px;
        top: 21px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        transform-origin: center;
        transform: rotate(45deg);
        letter-spacing: 0.6em;
        z-index: 100;
        background: $danger-color;
      }
    }
  }
  .bankAcct-name {
    >div {
      font-size: 14px;
      padding: 5px 10px;
      position: relative;
    }
    .backAcct-title{
      border-bottom: 1px solid #ddd;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 280px;
      padding-left: 25px;
      // padding-top: 10px;
      > img {
        vertical-align: middle;
        max-height: 30px;
        margin-right: 10px;
      }
    }
    .backAcct-no {
      font-size: 20px;
      line-height: 20px;
      padding: 30px 0px 5px;
      text-align: center;
      text-shadow: 1px 1px 1px #CFBFBF;
      font-weight: bold;
      user-select: none;
    }
    .factory-name {
      font-size: 12px;
      line-height: 25px;
      // margin-top: -15px;
      text-align: center;
      color: #545454;
    }
  }
  .bankAcct-content {
    width: 283px;
    height: 76px;
   /* background: url("./img/card_bg.jpg") no-repeat;*/
    background-position: 0px -334px;
  }
  .text-right {
    margin-top: 5px;
    margin-right: 25px;
  }
  .state{
    border-radius: 20px;
    color: #fff;
    font-size: 12px;
    padding: 3px 8px;
    &.warning{
      background: #E6A23C;
    }
    &.info{
      background: #909399;
    }
  }
</style>
