import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getLogPageData: (params) => {
    let url = HttpPrefix.API + '/audit/log/pub-log/log-list'; //
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  getRemoteRecordPageData: (params) => {
    let url = HttpPrefix.API + '/audit/remote/pub-remote/remote-record-list'; //
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  saveSecurityIssueResultData: (obj) => { // 保存密保答案
    let url = HttpPrefix.API + '/security/user/pub-security-issue-result/edit-security-issue-result';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findSecurityIssueResult: (obj) => { // 获取密保答案
    let url = HttpPrefix.API + '/security/user/pub-security-issue-result/find-security-issue-result';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  updateReservationInfo (obj) {
    let url = HttpPrefix.API + '/security/user/pub-reservation-info/update-reservation-info';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  selectReservationInfo () {
    let url = HttpPrefix.API + '/security/user/pub-reservation-info/select-reservation-info';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  getAllSecurityIssue: (obj) => { // 得到所有密保问题
    let url = HttpPrefix.API + '/auth/select';
    // let url = HttpPrefix.API + '/security/pub-security-issue/select-security-issue';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 以下--密码强度规则
  selectSecurityRules: () => {
    let url = HttpPrefix.API + '/security/user/pub-security/select-pub-security-rules';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  updateSecurityRules: (obj) => {
    let url = HttpPrefix.API + '/security/user/pub-security/update-pub-security-rule';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  selectAuthUserPhone: () => {
    let url = HttpPrefix.API + '/security/security/select-auth-user-phone';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  updateLoginSecurity: (obj) => {
    let url = HttpPrefix.API + '/security/security/update-login-security';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkPaySecurity: () => {
    let url = HttpPrefix.API + '/security/security/check-pay-security';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  getSecurityRule: () => {
    let url = HttpPrefix.API + '/auth/rule';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  resetLoginSecurity: (obj) => {
    let url = HttpPrefix.API + '/auth/reset-login-security';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getLoginSecurityRule: () => { // 获取设置登录密码的规则
    let url = HttpPrefix.API + '/auth/loginRule';
    return http.post(url).then(resp => {
      return resp.body;
    });
  }
};
