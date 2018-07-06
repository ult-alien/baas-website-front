import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  saveAccreditationData: (obj) => { // 企业认证-提交保存
    let url = HttpPrefix.API + '/accreditation/accreditation/save-accreditation-data';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getInviterList: (obj) => { // 认证终审-查询邀请人列表
    let url = HttpPrefix.API + '/accreditation/accreditation/get-inviter-list';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkInviteCode: (obj) => { // 企业认证-校验邀请码
    let url = HttpPrefix.API + '/accreditation/accreditation/check-invite-code';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getCustomerInfo: (obj) => { // 企业认证-查询企业信息
    let url = HttpPrefix.API + '/accreditation/accreditation/get-customer-info';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getAuthenticatingCus: (obj) => { // 认证初审-查询待认证客户
    let url = HttpPrefix.API + '/accreditation/accreditation/get-authenticating-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  firstTrialPass: (obj) => { // 认证初审-初审通过
    let url = HttpPrefix.API + '/accreditation/accreditation/first-trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  firstTrialReject: (obj) => { // 认证初审-认证驳回
    let url = HttpPrefix.API + '/accreditation/accreditation/first-trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  lastTrialReject: (obj) => { // 认证终审-终审驳回
    let url = HttpPrefix.API + '/accreditation/accreditation/last-trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  lastTrialPass: (obj) => { // 认证终审-终审通过
    let url = HttpPrefix.API + '/accreditation/accreditation/last-trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getAccreditationData: (obj) => { // 企业认证-提交保存
    let url = HttpPrefix.API + '/accreditation/accreditation/get-accreditation-data';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getLatestOpt: (obj) => { // 认证初审-查询最新的审批数据
    let url = HttpPrefix.API + '/accreditation/accreditation/get-latest-opt';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getPreviousOpts: (obj) => { // 企业认证-查询审批历史
    let url = HttpPrefix.API + '/accreditation/accreditation/get-previous-opts';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getLastTrialCus: (obj) => { // 认证终审-查询待认证客户
    let url = HttpPrefix.API + '/accreditation/accreditation/get-last-trial-cus';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkUserExist: (obj) => {
    let url = HttpPrefix.API + '/accreditation/accreditation/check-user-exist';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findUserByPhone: (obj) => {
    let url = HttpPrefix.API + '/accreditation/accreditation/find-user-by-phone';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateCusType: (obj) => { // 认证终审-修改客户类型
    let url = HttpPrefix.API + '/accreditation/accreditation/update-cus-type';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  genAccreditationFiles: (obj) => { // 企业认证-获取邮寄资料
    let url = HttpPrefix.API + '/accreditation/accreditation/gen-accreditation-files';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  genCusAuthFile: (obj) => { // 企业认证-下载企业授权书模板
    let url = HttpPrefix.API + '/accreditation/accreditation/gen-cus-auth-file';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getPostInfo: (obj) => { // 企业认证-获取邮寄资料
    let url = HttpPrefix.API + '/accreditation/accreditation/get-post-info';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
