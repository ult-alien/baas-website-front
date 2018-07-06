<template>
    <el-form label-width="130px" class="static-form" ref="accreditationForm">
      <pl-content-box-title>
        企业基本信息
        <a href="javascript: void(0);" @click="viewHistory('basicInfo')" class="a-link" slot="tip">审批历史</a>
      </pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <el-form class="static-form" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称">
                <pl-content-item-text>{{accreditationData.customerC.cusName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业类型">
                <pl-content-item-text>{{accreditationData.customerC.cusType | constant('CustomerConstants.CusType')}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邀请码">
                <pl-content-item-text>{{accreditationData.inviteCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人/股东姓名">
                <pl-content-item-text>{{accreditationData.customerC.lrName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'id_type_5'">
              <el-form-item label="统一社会信用代码">
                <pl-content-item-text>{{accreditationData.customerC.socCrCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'id_type_6'">
              <el-form-item label="营业执照号码">
                <pl-content-item-text>{{accreditationData.customerC.lisNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'id_type_6'">
              <el-form-item label="组织机构代码">
                <pl-content-item-text>{{accreditationData.customerC.orgCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'id_type_7'">
              <el-form-item label="证照名称">
                <pl-content-item-text>{{accreditationData.customerC.idName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'id_type_7'">
              <el-form-item label="证照号码">
                <pl-content-item-text>{{accreditationData.customerC.idNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人/股东证件类型">
                <pl-content-item-text>{{accreditationData.customerC.lrIdType | dictionary('id_type')}}</pl-content-item-text>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="法人/股东证件号码">
                <pl-content-item-text>{{accreditationData.customerC.lrLisNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="企业地址">
                <pl-content-item-text>{{accreditationData.customerC.province}}{{accreditationData.customerC.city}}{{accreditationData.customerC.address}}</pl-content-item-text>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
          <!--TODO: 审批历史 -->
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>
        银行企业账户
        <a href="javascript: void(0);" @click="viewHistory('bank')" class="a-link" slot="tip">审批历史</a>
      </pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card>
          <el-form class="static-form" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="银行账号">
                <pl-content-item-text>{{accreditationData.cusAcct.acctNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户银行">
                <pl-content-item-text>{{accreditationData.cusAcct.bankCode | dictionary('bank_brand')}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="银行网点">
                <pl-content-item-text>{{accreditationData.cusAcct.bankProvince}}{{accreditationData.cusAcct.bankCity}}{{accreditationData.cusAcct.bankDot}}</pl-content-item-text>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
          <!--TODO: 审批历史 -->
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>
        企业用户信息
        <a href="javascript: void(0);" @click="viewHistory('user')" class="a-link" slot="tip">审批历史</a>
      </pl-content-box-title>
      <pl-content-box-block>
        <el-table
          :data="users"
          :border="false"
          stripe
          style="width: 100%">
          <el-table-column prop="date" label="客户类型"  width="100">
            <template scope="scope">
              <span >{{ scope.row.userId === accreditationData.customerC.contactorId ? '管理员' : '操作员'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="phoneNo" label="手机号" width="140">
          </el-table-column>

          <el-table-column  label="证件类型" prop="certType" width="140">
            <template scope="scope">
              <span >{{ scope.row.certType | dictionary('id_type')}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="证件号码" prop="certNo">
          </el-table-column>

          <el-table-column  prop="email" label="邮箱" width="150"></el-table-column>
        </el-table>

        <!--TODO: 审批历史 -->
      </pl-content-box-block>

      <pl-content-box-title>企业证照资料</pl-content-box-title>
      <pl-content-box-block>
        <el-table
          :data="files"
          :border="false"
          stripe
          :show-header="false"
          style="width: 100%">
          <el-table-column prop="name"  width="160" align="center">
          </el-table-column>

          <el-table-column >
            <template scope="scope">
              <pl-upload-file show-type="vertical" class="fileupload" :file-type="scope.row.fileType" :relateId="accreditationData.customerC.cusId" :isEdit="false"></pl-upload-file>
            </template>
          </el-table-column>

          <el-table-column width="170" align="center">
            查看审批历史
            <template scope="scope">
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']" @click="viewHistory('licence')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']" @click="viewHistory('lr')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']" @click="viewHistory('userCert')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']" @click="viewHistory('bankCert')" class="a-link" slot="tip">审批历史</a>
            </template>
          </el-table-column>
        </el-table>
      </pl-content-box-block>
    <!-- <pl-content-box-block>-->
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="default" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    <!-- </pl-content-box-block>-->
      <!--审批历史-->
      <pl-right-popup :title="historyData.title" container="body" placement="right" width="20%" top="60" ref="rightPopup">
        <template slot="content">
          <pl-simple-time-line>
            <pl-time-line-item v-for='item in historyData.data'>
              <div slot="title">{{item.bizCode | constant('CustomerConstants.CusBizCode')}}-{{item.operationTime}}</div>
              <div>操作人：{{item.operatorName}}&nbsp;&nbsp; <br/>
                <span v-if="item.bizCode !== BizCode['UNAUTHENTICATE']">
                      <br>
                      审核结果：<span :class="{'text-warning': item.operatorRs === '1', 'text-success': item.operatorRs === '0'}">
                        {{item.operatorRs === '0' ? '确认无误' : (item.operatorRs === '1' ? '信息有误' : '')}}</span>
                </span>
                <span v-if="item.operatorRs == '1'">
                      <br>
                      错误描述：<span :class="{'text-warning': item.operatorRs === '1', 'text-success': item.operatorRs === '0'}">
                        {{item.operatorRemark}}</span>
                </span>
              </div>
            </pl-time-line-item>
          </pl-simple-time-line>
        </template>
        <div slot="toolbar">
          <el-button type="primary" @click="closeRight">关闭</el-button>
        </div>
      </pl-right-popup>
    </el-form>
</template>
<script>
import constantUtil from 'core/utils/constant-util';
export default {
  props: ['contactorId', 'cusId'],
  data () {
    return {
      accreditationData: {
        customerC: {}, // 客户信息
        cusAcct: {}, // 银行账号信息
        operators: [] // 用户信息
      }, // 提交认证数据
      users: [],
      files: [],
      FileCls: constantUtil.getConstantByKey('PubConstants.FileCls'),
      BizCode: constantUtil.getConstantByKey('CustomerConstants.CusBizCode'),
      CusState: constantUtil.getConstantByKey('CustomerConstants.CusState'),
      historyData: { // 审批历史
        title: '',
        data: []
      },
      previousOpts: [] // 审批历史原始数据
    };
  },
  methods: {
    callback () {
      this.$router.push({name: this.$store.state.previousRouter.name});
    },
    queryData (contactorId, cusId) {
      this.$api.cust.accreditation.getAccreditationData({'contactorId': contactorId, 'cusId': cusId}).then(ret => {
        this.accreditationData = ret;
        // 合并管理员和操作员,方便遍历
        this.accreditationData.operators.forEach((item, index) => {
          this.users.push(item);
        });
        this.users.unshift(this.accreditationData.administrator);
        // 组装附件数组
        let FileCls = constantUtil.getConstant('PubConstants.FileCls');
        for (let i in FileCls) {
          this.files.push({'name': FileCls[i], 'fileType': i});
        }
      });
      this.$api.cust.accreditation.getPreviousOpts({'cusId': cusId}).then(ret => {
        this.previousOpts = ret;
      });
    },
    viewHistory (type) {
      // 查询审批历史
      let aprvRs;
      let aprvRemark;
      if (type === 'basicInfo') { // 基本信息审批历史
        aprvRs = 'basicInfoAprvRs';
        aprvRemark = 'basicInfoAprvRemark';
        this.historyData.title = '基本信息审批历史';
      } else if (type === 'bank') { // 银行账号审批历史
        aprvRs = 'bankAprvRs';
        aprvRemark = 'bankAprvRemark';
        this.historyData.title = '银行账号审批历史';
      } else if (type === 'user') { // 用户信息审批历史
        aprvRs = 'userAprvRs';
        aprvRemark = 'userAprvRemark';
        this.historyData.title = '用户信息审批历史';
      } else if (type === 'licence') { // 营业执照审批历史
        aprvRs = 'licenceAprvRs';
        aprvRemark = 'licenceAprvRemark';
        this.historyData.title = '营业执照审批历史';
      } else if (type === 'lr') { // 法人证照审批历史
        aprvRs = 'lrAprvRs';
        aprvRemark = 'lrAprvRemark';
        this.historyData.title = '法人证照审批历史';
      } else if (type === 'bankCert') { // 银行账户证明审批历史
        aprvRs = 'bankCerAprvRs';
        aprvRemark = 'bankCerAprvRemark';
        this.historyData.title = '银行账户证明审批历史';
      } else if (type === 'userCert') { // 用户证照审批历史
        aprvRs = 'userCerAprvRs';
        aprvRemark = 'userCerAprvRemark';
        this.historyData.title = '用户证照审批历史';
      }
      this.historyData.data = [];
      this.previousOpts.forEach((item, index) => {
        this.historyData.data.push({operationTime: item.oprTime, bizCode: item.bizCode, operatorName: item.oprName, operatorRs: item[aprvRs], operatorRemark: item[aprvRemark]});
      });
      this.$refs.rightPopup.show();
    },
    closeRight () {
      this.$refs.rightPopup.close();
    }
  },
  created () {
    let params = this.$route.params;
    if (params.contactorId && params.cusId) {
      this.queryData(params.contactorId, params.cusId);
    } else if (this.contactorId && this.cusId) {
      this.queryData(this.contactorId, this.cusId);
    } else {
      this.callback();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";
@import './style.scss';

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 20px;
}

.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}
</style>



