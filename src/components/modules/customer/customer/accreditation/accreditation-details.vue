<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <el-form label-width="130px" class="static-form" ref="accreditationForm" :model="cusOpt" :rules="rules">
      <pl-content-box-block>
        <pl-content-box-card-group>
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
                <pl-content-item-text><pl-constant-select type="CustomerConstants.CusType" :show-empty="false" invalidKeys="FINNER,FOCAL_CO" v-model="cusOpt.cusType" @change="changeCusType"></pl-constant-select></pl-content-item-text>
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
          </pl-content-box-card>
          <pl-content-box-card class="bg-color-light card-padding" v-if="showLasteOpt">
            <el-form-item label="终审结果">
              <pl-content-item-text>
                <span>
                  <span v-if="latestCusOpt.basicInfoAprvRs === '0'">确认无误</span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                </span>
                <span v-if="latestCusOpt.basicInfoAprvRs !== '0'">，原因：{{latestCusOpt.basicInfoAprvRemark}}</span>
              </pl-content-item-text>
            </el-form-item>
          </pl-content-box-card>
          <pl-content-box-card class="bg-color-light card-padding">
              <div class="opt">
                <div class="left aprvRs">
                  <el-form-item label="审核结果" prop="basicInfoAprvRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.basicInfoAprvRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-form-item label="" label-width="0" prop="basicInfoAprvRemark" v-if="cusOpt.basicInfoAprvRs === '1'">
                   <el-input  v-model="cusOpt.basicInfoAprvRemark" placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>
          </pl-content-box-card>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>

      <pl-content-box-title>银行企业账户</pl-content-box-title>
      <pl-content-box-block>
        <pl-content-box-card-group>
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
        </pl-content-box-card>
          <pl-content-box-card class="bg-color-light card-padding" v-if="showLasteOpt">
            <el-form-item label="终审结果">
              <pl-content-item-text>
                <span>
                  <span v-if="latestCusOpt.bankAprvRs === '0'">确认无误</span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                </span>
                <span v-if="latestCusOpt.bankAprvRs !== '0'">，原因：{{latestCusOpt.bankAprvRemark}}</span>
              </pl-content-item-text>
            </el-form-item>
          </pl-content-box-card>
          <pl-content-box-card class="bg-color-light card-padding">
            <div class="opt">
              <div class="left aprvRs">
                <el-form-item label="审核结果" prop="bankAprvRs">
                  <pl-content-item-text>
                    <el-radio-group v-model="cusOpt.bankAprvRs">
                      <el-radio label="0">确认无误</el-radio>
                      <el-radio label="1">信息有误</el-radio>
                    </el-radio-group>
                  </pl-content-item-text>
                </el-form-item>
              </div>
              <div class="right">
                <el-form-item label="" label-width="0" prop="bankAprvRemark" v-if="cusOpt.bankAprvRs === '1'">
                  <el-input  v-model="cusOpt.bankAprvRemark" placeholder="请指出具体的错误原因"></el-input>
                </el-form-item>
              </div>
            </div>
          </pl-content-box-card>
        </pl-content-box-card-group>
      </pl-content-box-block>

      <pl-content-box-title>企业用户信息</pl-content-box-title>
      <pl-content-box-block>
        <el-table
          :data="users"
          :border="false"
          :stripe="false"
          style="width: 100%">
          <el-table-column prop="date" label="客户类型"  width="100">
            <template slot-scope="scope">
              <span >{{ scope.row.userId === accreditationData.customerC.contactorId ? '管理员' : '操作员'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="phoneNo" label="手机号" width="120">
          </el-table-column>

          <el-table-column  label="证件类型" prop="certType" width="130">
            <template slot-scope="scope">
              <span >{{ scope.row.certType | dictionary('id_type')}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="证件号码" prop="certNo">
          </el-table-column>

          <el-table-column  prop="email" label="邮箱" width="150"></el-table-column>
        </el-table>
        <pl-content-box-card class="bg-color-light" v-if="showLasteOpt" style="border-top: none;">
          <el-form-item label="终审结果">
            <pl-content-item-text>
                <span>
                  <span v-if="latestCusOpt.userAprvRs === '0'">确认无误</span>
                  <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                </span>
              <span v-if="latestCusOpt.userAprvRs !== '0'">，原因：{{latestCusOpt.userAprvRemark}}</span>
            </pl-content-item-text>
          </el-form-item>
        </pl-content-box-card>
        <pl-content-box-card class="bg-color-light card-padding" style="border-top: none;">
          <div class="opt">
            <div class="left aprvRs">
              <el-form-item label="审核结果" prop="userAprvRs">
                <pl-content-item-text>
                  <el-radio-group v-model="cusOpt.userAprvRs">
                    <el-radio label="0">确认无误</el-radio>
                    <el-radio label="1">信息有误</el-radio>
                  </el-radio-group>
                </pl-content-item-text>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="" label-width="0" prop="userAprvRemark" v-if="cusOpt.userAprvRs === '1'">
                <el-input  v-model="cusOpt.userAprvRemark" placeholder="请指出具体的错误原因"></el-input>
              </el-form-item>
            </div>
          </div>
        </pl-content-box-card>
      </pl-content-box-block>

      <pl-content-box-title>企业证照资料</pl-content-box-title>
      <pl-content-box-block class="certInfo">
        <el-table
          :data="files"
          :border="false"
          :stripe="false"
          :show-header="false"
          style="width: 100%">
          <el-table-column prop="name"  width="160" align="center">
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

          <el-table-column width="370" class-name="bg-color-light table-opt-border-left">
            <template slot-scope="scope">
              <div v-if="scope.row.fileType === FileCls['COMPANY_CERTIFICATE']">
                <div  v-if="showLasteOpt">
                  <el-form-item label="终审结果" label-width="100px">
                    <pl-content-item-text>
                      <span>
                        <span v-if="latestCusOpt.licenceAprvRs === '0'">确认无误</span>
                        <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                      </span>
                      <span v-if="latestCusOpt.licenceAprvRs !== '0'">,原因：{{latestCusOpt.licenceAprvRemark}}</span>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="aprvRs">
                  <el-form-item label="审核结果" label-width="100px" prop="licenceAprvRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.licenceAprvRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div v-if="cusOpt.licenceAprvRs === '1'" class="table-opt">
                  <el-form-item prop="licenceAprvRemark" label-width="0">
                    <el-input
                      v-model="cusOpt.licenceAprvRemark"
                      placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div v-if="scope.row.fileType === FileCls['LEGAL_CERTIFICATE']">
                <div  v-if="showLasteOpt">
                  <el-form-item label="终审结果" label-width="100px">
                    <pl-content-item-text>
                      <span>
                        <span v-if="latestCusOpt.lrAprvRs === '0'">确认无误</span>
                        <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                      </span>
                      <span v-if="latestCusOpt.lrAprvRs !== '0'">,原因：{{latestCusOpt.lrAprvRemark}}</span>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="aprvRs">
                  <el-form-item label="审核结果" label-width="100px" prop="lrAprvRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.lrAprvRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div v-if="cusOpt.lrAprvRs === '1'" class="table-opt">
                  <el-form-item prop="lrAprvRemark" label-width="0">
                    <el-input
                      v-model="cusOpt.lrAprvRemark"
                      placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div v-if="scope.row.fileType === FileCls['USER_CERTIFICATE']">
                <div  v-if="showLasteOpt">
                  <el-form-item label="终审结果" label-width="100px">
                    <pl-content-item-text>
                      <span>
                        <span v-if="latestCusOpt.userCerAprvRs === '0'">确认无误</span>
                        <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                      </span>
                      <span v-if="latestCusOpt.userCerAprvRs !== '0'">,原因：{{latestCusOpt.userCerAprvRemark}}</span>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="aprvRs">
                  <el-form-item label="审核结果" label-width="100px" prop="userCerAprvRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.userCerAprvRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div v-if="cusOpt.userCerAprvRs === '1'" class="table-opt">
                  <el-form-item prop="userCerAprvRemark" label-width="0">
                    <el-input
                      v-model="cusOpt.userCerAprvRemark"
                      placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>

              <div v-if="scope.row.fileType === FileCls['BANK_CERTIFICATE']">
                <div  v-if="showLasteOpt">
                  <el-form-item label="终审结果" label-width="100px">
                    <pl-content-item-text>
                      <span>
                        <span v-if="latestCusOpt.bankCerAprvRs === '0'">确认无误</span>
                        <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                      </span>
                      <span v-if="latestCusOpt.bankCerAprvRs !== '0'">,原因：{{latestCusOpt.bankCerAprvRemark}}</span>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="aprvRs">
                  <el-form-item label="审核结果" label-width="100px" prop="bankCerAprvRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.bankCerAprvRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div v-if="cusOpt.bankCerAprvRs === '1'" class="table-opt">
                  <el-form-item prop="bankCerAprvRemark" label-width="0">
                    <el-input
                      v-model="cusOpt.bankCerAprvRemark"
                      placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>

              <div v-if="scope.row.fileType === FileCls['CUS_AUTH']">
                <div  v-if="showLasteOpt">
                  <el-form-item label="终审结果" label-width="100px">
                    <pl-content-item-text>
                      <span>
                        <span v-if="latestCusOpt.cusAuthRs === '0'">确认无误</span>
                        <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                      </span>
                      <span v-if="latestCusOpt.cusAuthRs !== '0'">,原因：{{latestCusOpt.cusAuthRemark}}</span>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="aprvRs">
                  <el-form-item label="审核结果" label-width="100px" prop="cusAuthRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.cusAuthRs">
                        <el-radio label="0">确认无误</el-radio>
                        <el-radio label="1">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div v-if="cusOpt.cusAuthRs === '1'" class="table-opt">
                  <el-form-item prop="cusAuthRemark" label-width="0">
                    <el-input
                      v-model="cusOpt.cusAuthRemark"
                      placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </pl-content-box-block>

      <div v-if="showContract">
        <pl-content-box-title>请核查是否已收取企业邮寄的以下资料：</pl-content-box-title>
        <pl-content-box-block>
          <pl-content-box-card-group>
            <pl-content-box-card>
              <ul class="post-list upload-block">
                <li><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务用户开户声明书，1份，加盖公章和法人签章</li>
                <li><i class="el-icon-warning text-primary"></i>&ensp;共赢链平台契约互联服务账户授权确认书，1份，加盖公章和法人签章</li>
              </ul>
            </pl-content-box-card>
            <pl-content-box-card class="bg-color-light" v-if="showLasteOpt">
              <el-form-item label="终审结果">
                <pl-content-item-text>
                    <span>
                      <span v-if="latestCusOpt.postRs === '0'">确认无误</span>
                      <span v-else><el-badge value="信息有误" class="item"></el-badge></span>
                    </span>
                  <span v-if="latestCusOpt.postRs !== '0'">，原因：{{latestCusOpt.postRemark}}</span>
                </pl-content-item-text>
              </el-form-item>
            </pl-content-box-card>
            <pl-content-box-card class="bg-color-light card-padding">
              <div class="opt">
                <div class="left aprvRs">
                  <el-form-item label="审核结果" prop="postRs">
                    <pl-content-item-text>
                      <el-radio-group v-model="cusOpt.postRs">
                        <el-radio label="0" :disabled="showPostInfo ? false : true">确认无误</el-radio>
                        <el-radio label="1" :disabled="showPostInfo ? false : true">信息有误</el-radio>
                      </el-radio-group>
                    </pl-content-item-text>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-form-item label="" label-width="0" prop="postRemark" v-if="cusOpt.postRs === '1'">
                    <el-input :disabled="showPostInfo ? false : true" v-model="cusOpt.postRemark" placeholder="请指出具体的错误原因"></el-input>
                  </el-form-item>
                </div>
              </div>
            </pl-content-box-card>
          </pl-content-box-card-group>
        </pl-content-box-block>
      </div>

    </el-form>
   <!-- <pl-content-box-block>-->
    <pl-affix :offset-bottom="0">
      <pl-content-box-toolbar class="text-center" :border="false">
        <el-button type="default" icon=" anticon icon-arrowleft" @click="callback">返回</el-button>
        <el-button type="info" :loading="firstTrialRejectLoading" @click="firstTrialReject"
                   v-if="latestCusOpt.bizCode === BizCode['UNAUTHENTICATE']
                                      || (latestCusOpt.bizCode === BizCode['LAST_TRIAL']
                                      && latestCusOpt.cusState === CusState['LAST_TRIAL_BACK'])">通知客户</el-button>

        <el-button type="primary" :loading="firstTrialPassLoading" @click="firstTrialPass"
                   v-if="(latestCusOpt.bizCode === BizCode['UNAUTHENTICATE'] && CusState['WAIT_LAST_TRIAL'] !== curState)
                   || (latestCusOpt.bizCode === BizCode['LAST_TRIAL']
                   && latestCusOpt.cusState === CusState['LAST_TRIAL_BACK'])">审核通过</el-button>


        <el-button type="info" :loading="lastTrialRejectLoading" @click="lastTrialReject"
                   v-if="latestCusOpt.bizCode === BizCode['FIRST_TRIAL']">通知初审员重审</el-button>

        <el-button type="primary" :loading="lastTrialPassLoading" @click="lastTrialPass"
                   v-if="latestCusOpt.bizCode === BizCode['FIRST_TRIAL'] || CusState['WAIT_LAST_TRIAL'] === curState">终审通过</el-button>
      </pl-content-box-toolbar>
    </pl-affix>
   <!-- </pl-content-box-block>-->
    <choose-inviter ref="chooseInviter" @confirmCusType="confirmCusType" @rollbackCusType="rollbackCusType"></choose-inviter>

    <el-dialog
      title="交易成功"
      :visible.sync="hashDialogVisible"
      top="25vh"
      width="440px">
      <div>
        <p><i class="el-icon-success" style="color: #67C23A;"></i>&nbsp;区块链已接收交易数据，交易哈希：</p>
        {{(txHash.slice(0, 16) + '...' + txHash.slice(txHash.length - 16))}}&nbsp;<i class="el-icon-document" title="复制" style="cursor: pointer;vertical-align: middle;" @click="copyHash(txHash)"></i>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="callback">确 定</el-button>
      </span>
    </el-dialog>
  </pl-content-box>
</template>
<script>
import {MsgType} from 'core/constants';
import {HttpPrefix} from '../../api/config';
import {HttpPrefix as governorHttpPrefix} from '../../../governor/api/config';
import constantUtil from 'core/utils/constant-util';
import chooseInviter from './choose-inviter.vue';
export default {
  props: ['contactorId', 'cusId'],
  data () {
    return {
      txHash: '',
      hashDialogVisible: false,
      firstTrialRejectLoading: false,
      firstTrialPassLoading: false,
      lastTrialRejectLoading: false,
      lastTrialPassLoading: false,
      showContract: false, // 修复企业互联开关打开没有显示证书bug,20180522
      accreditationData: {
        customerC: {}, // 客户信息
        cusAcct: {}, // 银行账号信息
        operators: [] // 用户信息
      }, // 提交认证数据
      cusOpt: {
        cusType: ''
      }, // 审批意见
      cusType: '', // 客户类型
      latestCusOpt: {}, // 最新一条审批结果
      users: [],
      files: [],
      FileCls: constantUtil.getConstantByKey('BizConstants.FileCls'),
      BizCode: constantUtil.getConstantByKey('CustomerConstants.CusBizCode'),
      CusState: constantUtil.getConstantByKey('CustomerConstants.CusState'),
      CusType: constantUtil.getConstantByKey('CustomerConstants.CusType'),
      curState: '',
      fileApi: HttpPrefix.API,
      creditLine: null,
      rules: {
        bankAprvRemark: [
          { required: true, message: '企业银行账号审批备注不能为空', trigger: 'blur' }
        ],
        bankAprvRs: [
          { required: true, message: '企业银行账号审批结果不能为空', trigger: 'change' }
        ],
        basicInfoAprvRemark: [
          { required: true, message: '企业基本信息审批备注不能为空', trigger: 'blur' }
        ],
        basicInfoAprvRs: [
          { required: true, message: '企业基本信息审批结果不能为空', trigger: 'change' }
        ],
        userAprvRemark: [
          { required: true, message: '企业用户信息审批备注不能为空', trigger: 'blur' }
        ],
        userAprvRs: [
          { required: true, message: '企业用户信息审批结果不能为空', trigger: 'change' }
        ],
        licenceAprvRemark: [
          { required: true, message: '营业执照审批备注不能为空', trigger: 'blur' }
        ],
        licenceAprvRs: [
          { required: true, message: '营业执照审批结果不能为空', trigger: 'change' }
        ],
        lrAprvRemark: [
          { required: true, message: '法人代表证照审批备注不能为空', trigger: 'blur' }
        ],
        lrAprvRs: [
          { required: true, message: '法人代表证照审批结果不能为空', trigger: 'change' }
        ],
        bankCerAprvRemark: [
          { required: true, message: '银行账户证明审批备注不能为空', trigger: 'blur' }
        ],
        bankCerAprvRs: [
          { required: true, message: '银行账户证明审批结果不能为空', trigger: 'change' }
        ],
        cusAuthRs: [
          { required: true, message: '企业授权书审批结果不能为空', trigger: 'change' }
        ],
        cusAuthRemark: [
          { required: true, message: '企业授权书审批备注不能为空', trigger: 'blur' }
        ],
        userCerAprvRemark: [
          { required: true, message: '企业用户证照审批备注不能为空', trigger: 'blur' }
        ],
        userCerAprvRs: [
          { required: true, message: '企业用户证照审批结果不能为空', trigger: 'change' }
        ],
        postRs: [
          { required: true, message: '邮寄资料审批结果不能为空', trigger: 'change' }
        ],
        postRemark: [
          { required: true, message: '邮寄资料审批备注不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    showLasteOpt () {
      return this.latestCusOpt.bizCode !== this.BizCode['UNAUTHENTICATE'] && this.latestCusOpt.bizCode === this.BizCode['LAST_TRIAL'];
    },
    isShowCreditLine () {
      return this.CusType['MEMBER'] === this.cusOpt.cusType;
    },
    showPostInfo () {
      return this.latestCusOpt.bizCode === this.BizCode['FIRST_TRIAL'] || this.CusState['WAIT_LAST_TRIAL'] === this.curState;
    },
    checkAppr () {
      let flag = this.cusOpt.userCerAprvRs === '0' && this.cusOpt.bankCerAprvRs === '0' &&
            this.cusOpt.lrAprvRs === '0' && this.cusOpt.licenceAprvRs === '0' &&
            this.cusOpt.userAprvRs === '0' && this.cusOpt.bankAprvRs === '0' &&
            this.cusOpt.basicInfoAprvRs === '0' && this.cusOpt.cusAuthRs === '0';
      if (this.showContract) {
        return flag && this.cusOpt.postRs;
      }
      return flag;
    }
  },
  methods: {
    changeCusType (val, oldVal) {
      if (val && val !== '' && oldVal !== '' && val !== this.cusType) {
        this.$refs.chooseInviter.show(val, this.accreditationData.customerC.cusId, this.accreditationData.customerC.cusState);
      }
    },
    confirmCusType (entId) {
      this.cusType = this.cusOpt.cusType;
      // 保存邀请企业id
      this.cusOpt.entId = entId;
    },
    rollbackCusType () {
      this.cusOpt.cusType = this.cusType;
    },
    callback () {
      this.hashDialogVisible = false;
      this.$router.push({name: this.$store.state.previousRouter.name});
    },
    firstTrialPass () {
      this.$refs.accreditationForm.validate((valid, res) => {
        if (valid) {
          if (!this.checkAppr) {
            // 有一项有误不能点击审核通过
            this.$message({
              message: '全部无误才能通过审核',
              type: 'warning'
            });
            return;
          }
          this.$confirm('您确认' + this.accreditationData.customerC.cusName + '的认证信息及证照材料均正确无误？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.firstTrialPassLoading = true;
            this.cusOpt.curState = this.accreditationData.customerC.cusState;
            this.$api.cust.accreditation.firstTrialPass({...this.cusOpt, crediLine: this.creditLine}).then(ret => {
              if (ret.type === MsgType.SUCCESS) {
                this.callback();
                this.refershMsgTip('first-trial');
              }
              this.firstTrialPassLoading = false;
            });
          });
        } else {
          this.showMsgTip(res);
          return false;
        }
      });
    },
    firstTrialReject () {
      this.$refs.accreditationForm.validate((valid, res) => {
        if (valid) {
          if (this.checkAppr) {
            // 全部结果都是无误不能点击驳回
            this.$message({
              message: '至少需要有一项信息有误才能驳回',
              type: 'warning'
            });
            return;
          }
          this.firstTrialRejectLoading = true;
          this.cusOpt.curState = this.accreditationData.customerC.cusState;
          this.$api.cust.accreditation.firstTrialReject(this.cusOpt).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.callback();
              this.refershMsgTip('first-trial');
            }
            this.firstTrialRejectLoading = false;
          });
        } else {
          this.showMsgTip(res);
          return false;
        }
      });
    },
    lastTrialReject () {
      this.$refs.accreditationForm.validate((valid, res) => {
        if (valid) {
          if (this.checkAppr) {
            // 全部结果都是无误不能点击驳回
            this.$message({
              message: '至少需要有一项信息有误才能驳回',
              type: 'warning'
            });
            return;
          }
          this.lastTrialRejectLoading = true;
          this.$api.cust.accreditation.lastTrialReject(this.cusOpt).then(ret => {
            if (ret.type === MsgType.SUCCESS) {
              this.callback();
              this.refershMsgTip('last-trial');
            }
            this.lastTrialRejectLoading = false;
          });
        } else {
          this.showMsgTip(res);
          return false;
        }
      });
    },
    lastTrialPass () {
      this.$refs.accreditationForm.validate((valid, res) => {
        if (valid) {
          if (!this.checkAppr) {
            // 有一项有误不能点击审核通过
            this.$message({
              message: '全部无误才能通过审核',
              type: 'warning'
            });
            return;
          }
          this.$confirm('您确认' + this.accreditationData.customerC.cusName + '的认证信息及证照材料均正确无误？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.lastTrialPassLoading = true;
            this.cusOpt.curState = this.accreditationData.customerC.cusState;
            this.showStellarLoading('正在生成区块链账户，请稍后...');
            this.$api.cust.accreditation.lastTrialPass(this.cusOpt).then(ret => {
              this.lastTrialPassLoading = false;
              this.hideStellarLoading();
              if (ret.type === MsgType.SUCCESS) {
                if (ret.bean) {
                  this.txHash = ret.bean.toString();
                  this.hashDialogVisible = true;
                } else {
                  this.callback();
                }
                this.refershMsgTip('last-trial');
              }
            });
          });
        } else {
          this.showMsgTip(res);
          return false;
        }
      });
    },
    showMsgTip (res) {
      let tip = [];
      for (let i in res) {
        tip.push(res[i][0].message + '</br>');
      }
      this.$alert(tip.join(''), '提示', {
        confirmButtonText: '确定',
        type: MsgType.WARING,
        dangerouslyUseHTMLString: true
      });
    },
    queryData (contactorId, cusId) {
      this.$api.cust.accreditation.getAccreditationData({'contactorId': contactorId, 'cusId': cusId}).then(ret => {
        this.accreditationData = ret;
        this.creditLine = ret.creditLine;
        // 合并管理员和操作员,方便遍历
        this.accreditationData.operators.forEach((item, index) => {
          this.users.push(item);
        });
        this.users.unshift(this.accreditationData.administrator);
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
//        // 组装附件数组
//        let FileCls = constantUtil.getConstant('BizConstants.FileCls');
//        for (let i in FileCls) {
//          if (i !== this.FileCls['PURCHASE_AND_SALE_CONTRACT'] && i !== this.FileCls['RPUR_TRANSFER_VOUCHER'] && i !== this.FileCls['PURCHASE_AND_SALE_INVOICE'] && i !== this.FileCls['CONTRACT_OPEN'] && i !== this.FileCls['CONTRACT_AUTH']) { // 除去购销合同、回购转账凭证
//            this.files.push({'name': FileCls[i], 'fileType': i});
//          }
//        }
        // 20180522
        this.showContract = ret.showContract;
        // 查询最新的审批意见
        this.$api.cust.accreditation.getLatestOpt({'cusId': cusId}).then(optRet => {
          this.latestCusOpt = optRet;
          this.cusOpt.cusId = this.latestCusOpt.cusId;
          this.cusOpt.seqNo = parseInt(this.latestCusOpt.seqNo) + 1; // 当前序号是最新一条数据序号加1
          this.cusOpt.cusType = this.accreditationData.customerC.cusType; // 获取当前企业类型
          this.cusType = this.accreditationData.customerC.cusType; // 获取当前企业类型(改变之前)
          this.curState = this.accreditationData.customerC.cusState; // 获取当前企业状态
          if (this.latestCusOpt.cusState === this.CusState['WAIT_FIRST_TRIAL']) { // 初审时邮寄资料默认通过,
            this.cusOpt.postRs = '0';
          }
          if (this.latestCusOpt.cusState === this.CusState['LAST_TRIAL_BACK']) { // 终审驳回取终审的审核结果
            this.cusOpt.postRs = this.latestCusOpt.postRs;
            this.cusOpt.postRemark = this.latestCusOpt.postRemark;
          }
        });
      });
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
  },
  components: {
    chooseInviter
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 20px;
}
.card-padding{
  padding: 5px;
}
.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}

.opt{
  display: flex;
  .left {
    width: 390px;
  }
  .right {
    flex: 1;
    padding: 0px 20px 20px 10px;
    position: relative;
    .el-form-item {
      &.is-error {
        .el-input{
          &:before{
            border-right-color: $danger-color;
          }
        }
      }
      &.is-success{
        .el-input{
          &:before{
            border-right-color: $success-color;
          }
        }
      }
      .el-input:focus{
        &:before{
          border-right-color: $primary-color;
        }
      }
      .el-input:hover{
        &:before{
          border-right-color: #b4bccc;
        }
      }
      .el-input{
        width: 100%;
        &:before{
          content: '';
          position: absolute;
          border-width: 8px 8px 8px 0px;
          border-color: transparent #ddd transparent transparent;
          border-style: solid;
          top:10px;
          left: -8px;
        }
        &:after{
          content: '';
          position: absolute;
          border-width: 8px 8px 8px 0px;
          border-color: transparent #fff transparent transparent;
          border-style: solid;
          top:10px;
          left: -7px;
        }
      }
    }
  }
}

.table-opt {
  text-align: right;
  padding-left: 30px;
  padding-bottom: 20px;
  /*.el-input {
    width: 317px !important;
  }*/
  .el-form-item {
    &.is-error {
      .el-input{
        &:before{
          border-bottom-color: $danger-color;
        }
      }
    }
    &.is-success{
      .el-input{
        &:before{
          border-bottom-color: $success-color;
        }
      }
    }
    .el-input:focus{
      &:before{
        border-bottom-color: $primary-color;
      }
    }
    .el-input:hover{
      &:before{
        border-bottom-color: #b4bccc;
      }
    }
    .el-input{
      width: 100%;
      &:before{
        content: '';
        position: absolute;
        border-width: 0px 8px 8px 8px ;
        border-color: transparent transparent #ddd transparent;
        border-style: solid;
        top:-8px;
        left: 10px;
      }
      &:after{
        content: '';
        position: absolute;
        border-width: 0px 8px 8px 8px;
        border-color: transparent transparent  #fff transparent;
        border-style: solid;
        top:-7px;
        left: 10px;
      }
    }
  }
}

  .table-opt-border-left{
    border-left: 1px solid $border-color;
  }
.post-list{
    li{
      line-height: 2.4em;
    }
  }
  .position_sit{
    padding:30px 0 5px;
  }
</style>
<style lang="scss" rel="stylesheet/scss">

  .aprvRs{
    .el-radio__inner{
      width: 18px;
      height: 18px;
    }
    .el-form-item__label,.el-radio__label{
      font-size: 1.2em;
      font-weight: 500;
      color: #000;
    }
  }
  .certInfo{
    .el-table .cell {
      overflow: inherit;
    }
  }
</style>


