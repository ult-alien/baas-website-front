<template>
    <el-form label-width="130px" class="static-form" ref="accreditationForm">
      <pl-content-box-title>
        企业基本信息<span v-if="this.latestCusOpt.basicInfo === '1'" class="text-danger">(审核不通过，详情请查看审批历史) </span>
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
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'ent_id_type_1'">
              <el-form-item label="统一社会信用代码">
                <pl-content-item-text>{{accreditationData.customerC.socCrCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'ent_id_type_2'">
              <el-form-item label="营业执照号码">
                <pl-content-item-text>{{accreditationData.customerC.lisNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'ent_id_type_2'">
              <el-form-item label="组织机构代码">
                <pl-content-item-text>{{accreditationData.customerC.orgCode}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'ent_id_type_3'">
              <el-form-item label="证件名称">
                <pl-content-item-text>{{accreditationData.customerC.idName}}</pl-content-item-text>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="accreditationData.customerC.idType === 'ent_id_type_3'">
              <el-form-item label="证件号码">
                <pl-content-item-text>{{accreditationData.customerC.idNo}}</pl-content-item-text>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="法人/股东姓名">
                <pl-content-item-text>{{accreditationData.customerC.lrName}}</pl-content-item-text>
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
        银行企业账户<span v-if="this.latestCusOpt.bankAprvRs === '1'" class="text-danger">(审核不通过，详情请查看审批历史) </span>
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
        企业用户信息<span v-if="this.latestCusOpt.userAprvRs === '1'" class="text-danger">(审核不通过，详情请查看审批历史) </span>
        <a href="javascript: void(0);" @click="viewHistory('user')" class="a-link" slot="tip">审批历史</a>
      </pl-content-box-title>
      <pl-content-box-block>
        <el-table
          :data="users"
          :border="false"
          stripe
          style="width: 100%">
          <el-table-column prop="date" label="客户类型"  width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.userId === accreditationData.customerC.contactorId ? '管理员' : '操作员'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="phoneNo" label="手机号" width="140">
          </el-table-column>

          <el-table-column  label="证件类型" prop="certType" width="140">
            <template slot-scope="scope">
              <span >{{ scope.row.certType | dictionary('id_type')}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="证件号码" prop="certNo">
          </el-table-column>

          <el-table-column  prop="email" label="邮箱" width="150"></el-table-column>
        </el-table>

        <!--TODO: 审批历史 -->
      </pl-content-box-block>

      <pl-content-box-title>
        企业证照资料<span v-if="this.latestCusOpt.licenceAprvRs === '1'" class="text-danger">(营业执照审核不通过，详情请查看审批历史) </span>
        <span v-if="this.latestCusOpt.bankCerAprvRs === '1'" class="text-danger">(银行账户证明审核不通过，详情请查看审批历史) </span>
        <span v-if="this.latestCusOpt.userCerAprvRs === '1'" class="text-danger">(用户证照审核不通过，详情请查看审批历史) </span>
        <span v-if="this.latestCusOpt.lrAprvRs === '1'" class="text-danger">(法人证照审核不通过，详情请查看审批历史) </span>
        <span v-if="this.latestCusOpt.cusAuthRs === '1'" class="text-danger">(企业授权书审核不通过，详情请查看审批历史) </span>
      </pl-content-box-title>
      <pl-content-box-block>
        <el-table
          :data="files"
          :border="false"
          stripe
          :show-header="false"
          style="width: 100%">
          <el-table-column prop="name"  width="160" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE'] && accreditationData.customerC.idType === 'ent_id_type_1'">统一社会信用代码</span>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column >
            <template slot-scope="scope">
              <pl-upload-file show-type="vertical" v-if="!scope.row.subArr"
                              :api="scope.row.api" class="fileupload" 
                              :file-type="scope.row.fileType" 
                              :relateId="scope.row.relateId" :isEdit="false"></pl-upload-file>
              <div v-else>
                <div v-for="item in scope.row.subArr">
                  <span v-if="scope.row.subArr.length > 1">{{item.name}}</span>
                  <pl-upload-file show-type="vertical"
                                  :api="item.api" class="fileupload" 
                                  :file-type="item.fileType" 
                                  :relateId="item.relateId" :isEdit="false"></pl-upload-file>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column width="170" align="center">
            查看审批历史
            <template slot-scope="scope">
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']" @click="viewHistory('licence')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']" @click="viewHistory('lr')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']" @click="viewHistory('userCert')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']" @click="viewHistory('bankCert')" class="a-link" slot="tip">审批历史</a>
              <a href="javascript: void(0);" v-if="scope.row.fileType === FileCls['CUS_AUTH']" @click="viewHistory('cusAuth')" class="a-link" slot="tip">审批历史</a>
            </template>
          </el-table-column>
        </el-table>
      </pl-content-box-block>

      <div v-if="showContract">
        <pl-content-box-title>
          {{userType === 'customer' ? '邮寄资料' : '请检查是否已收取企业邮寄的以下资料：'}}
          <span v-if="this.latestCusOpt.postRs === '1'" class="text-danger">(审核不通过，详情请查看审批历史) </span>
          <a href="javascript: void(0);" @click="viewHistory('postRs')" class="a-link" slot="tip">审批历史</a>
        </pl-content-box-title>
        <pl-content-box-block >
          <p v-if="userType === 'customer'">
            请按提示准备以下材料，邮寄至 {{postInfo.address}}，{{postInfo.name}}收，联系电话：{{postInfo.phone}}
          </p>
          <ul class="post-list">
            <li v-if="accreditationFiles[contractOpen]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务用户开户声明书，1份，加盖公章和法人签章&ensp;<span class="a-link" v-loading="CONTRACT_OPEN_loading" @click="download(accreditationFiles[contractOpen], 'contractOpen')">模板下载</span></li>
            <li v-if="accreditationFiles[contractAuth]"><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务账户授权确认书，1份，加盖公章和法人签章&ensp;<span class="a-link" v-loading="CONTRACT_AUTH_loading" @click="download(accreditationFiles[contractAuth], 'contractAuth')">模板下载</span></li>
          </ul>
        </pl-content-box-block>
      </div>

    <!-- <pl-content-box-block>-->
      <pl-affix :offset-bottom="0">
        <pl-content-box-toolbar class="text-center" :border="false">
          <el-button type="default" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        </pl-content-box-toolbar>
      </pl-affix>
    <!-- </pl-content-box-block>-->


      <!--审批历史-->
      <pl-side-popup :title="historyData.title" :tool-bar="false" container="body" placement="right" width="20%" top="60px" ref="rightPopup">
        <pl-simple-time-line>
          <pl-time-line-item :key="historyData" v-for='item in historyData.data'>
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
      </pl-side-popup>
    </el-form>
</template>
<script>
import constantUtil from 'core/utils/constant-util';
import {HttpPrefix} from '../../api/config';
import {HttpPrefix as governorHttpPrefix} from '../../../governor/api/config';
import sysUtil from 'core/utils/sys-util';
import httpUtil from 'core/utils/http-util';
export default {
  props: ['contactorId', 'cusId', 'userType'],
  data () {
    return {
      accreditationData: {
        customerC: {}, // 客户信息
        cusAcct: {}, // 银行账号信息
        operators: [] // 用户信息
      }, // 提交认证数据
      users: [],
      files: [],
      FileCls: constantUtil.getConstantByKey('BizConstants.FileCls'),
      BizCode: constantUtil.getConstantByKey('CustomerConstants.CusBizCode'),
      CusState: constantUtil.getConstantByKey('CustomerConstants.CusState'),
      'cusAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CUS_AUTH'],
      'contractOpen': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_OPEN'],
      'contractAuth': constantUtil.getConstantByKey('BizConstants.FileCls')['CONTRACT_AUTH'],
      'POST_ADDRESS': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_ADDRESS'],
      'POST_NAME': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_NAME'],
      'POST_PHONE': constantUtil.getConstantByKey('ParameterConstants.ParameterCode')['POST_PHONE'],
      historyData: { // 审批历史
        title: '',
        data: []
      },
      'fileApi': HttpPrefix.API,
      previousOpts: [], // 审批历史原始数据
      'postInfo': {
        'address': 'xxxxxxxx',
        'name': 'xxx',
        'phone': '###-########'
      },
      'CONTRACT_AUTH_loading': true,
      'CONTRACT_OPEN_loading': true,
      'accreditationFiles': {},
      latestCusOpt: {},
      showContract: false // 是否显示邮寄资料
    };
  },
  methods: {
    callback () {
      this.$router.push({name: this.$store.state.previousRouter.name});
    },
    queryData (contactorId, cusId) {
      this.$api.cust.accreditation.getAccreditationData({'contactorId': contactorId, 'cusId': cusId}).then(ret => {
        this.showContract = ret.showContract;
        if (this.showContract) {
          // 获取邮寄信息
          this.$api.cust.accreditation.getPostInfo(JSON.stringify(ret)).then(postInfo => {
            if (postInfo) {
              this.postInfo.address = postInfo[this.POST_ADDRESS];
              this.postInfo.name = postInfo[this.POST_NAME];
              this.postInfo.phone = postInfo[this.POST_PHONE];
            }
          });
          // 获取邮寄文件
          this.$api.cust.accreditation.genAccreditationFiles(JSON.stringify(ret)).then(files => {
            if (files) {
              this.accreditationFiles = files;
              if (files[this.contractOpen]) {
                this.CONTRACT_OPEN_loading = false;
              }
              if (files[this.contractAuth]) {
                this.CONTRACT_AUTH_loading = false;
              }
            }
          });
        }
        this.accreditationData = ret;
        // 合并管理员和操作员,方便遍历
        this.accreditationData.operators.forEach((item, index) => {
          this.users.push(item);
        });
        this.users.unshift(this.accreditationData.administrator);

//        let FileCls = constantUtil.getConstant('BizConstants.FileCls');

        let subArr = [];
        if (this.accreditationData && this.accreditationData.administrator) {
          subArr.push({
            name: '管理员' + this.accreditationData.administrator.userName + '的证照',
            fileType: this.FileCls['USER_CERTIFICATE'],
            relateId: this.accreditationData.administrator.userId,
            api: governorHttpPrefix.API
          });
        }
        if (this.accreditationData && this.accreditationData.operators && this.accreditationData.operators.length > 0) {
          this.accreditationData.operators.forEach(item => {
            subArr.push({
              name: '操作' + item.userName + '的证照',
              fileType: this.FileCls['USER_CERTIFICATE'],
              relateId: item.userId,
              api: governorHttpPrefix.API
            });
          });
        }

        // 组装附件数组
        this.files = [
          {name: '营业执照', fileType: this.FileCls['COMPANY_CERTIFICATE'], relateId: cusId, api: this.fileApi},
          {name: '法人代表证照', fileType: this.FileCls['LEGAL_CERTIFICATE'], relateId: cusId, api: this.fileApi},
          {name: '银行账户证明', fileType: this.FileCls['BANK_CERTIFICATE'], relateId: cusId, api: this.fileApi},
          {name: '管理员及操作员证照', fileType: this.FileCls['USER_CERTIFICATE'], subArr: subArr},
          {name: '企业授权委托书', fileType: this.FileCls['CUS_AUTH'], relateId: this.accreditationData.administrator.authFileRlatId, api: governorHttpPrefix.API}
        ];

//        for (let i in FileCls) {
//          if (i !== this.FileCls['PURCHASE_AND_SALE_CONTRACT'] && i !== this.FileCls['RPUR_TRANSFER_VOUCHER'] && i !== this.FileCls['PURCHASE_AND_SALE_INVOICE'] && i !== this.FileCls['CONTRACT_OPEN'] && i !== this.FileCls['CONTRACT_AUTH']) { // 除去购销合同、回购转账凭证
//            this.files.push({'name': FileCls[i], 'fileType': i});
//          }
//        }
      });
      this.$api.cust.accreditation.getPreviousOpts({'cusId': cusId}).then(ret => {
        this.previousOpts = ret;
      });
      // 查询最新的审批意见
      this.$api.cust.accreditation.getLatestOpt({'cusId': cusId}).then(optRet => {
        this.latestCusOpt = optRet;
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
      } else if (type === 'postRs') { // 用户证照审批历史
        aprvRs = 'postRs';
        aprvRemark = 'postRemark';
        this.historyData.title = '邮寄资料审批历史';
      } else if (type === 'cusAuth') { // 用户证照审批历史
        aprvRs = 'cusAuthRs';
        aprvRemark = 'cusAuthRemark';
        this.historyData.title = '企业授权书审批历史';
      }
      this.historyData.data = [];
      this.previousOpts.forEach((item, index) => {
        this.historyData.data.push({operationTime: item.oprTime, bizCode: item.bizCode, operatorName: item.oprName, operatorRs: item[aprvRs], operatorRemark: item[aprvRemark]});
      });
      this.$refs.rightPopup.show();
    },
    closeRight () {
      this.$refs.rightPopup.close();
    },
    download (fileId, prop) {
      if (!fileId) {
        return;
      }
      sysUtil.download(httpUtil.genPath(this.fileApi + '/file/download?id=' + fileId));
    }
  },
  created () {
    let params = this.$route.params;
    if (params.contactorId && params.cusId) {
      this.queryData(params.contactorId, params.cusId);
    } else if (this.contactorId && this.cusId) {
      this.queryData(this.contactorId, this.cusId);
    } else {
      this.$router.back();
      // this.callback();
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

.post-list{
    li{
      line-height: 2.4em;
    }
  }
</style>



