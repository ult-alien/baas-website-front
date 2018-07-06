import { HttpPrefix } from '../config';
import {http} from 'vue';

export default {
  save: (obj) => { // 修改登陆密码
    let url = HttpPrefix.API + '/user/pub-user/modify-user-password';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  reset: (obj) => { // 重置密码
    let url = HttpPrefix.API + '/user/pub-user/reset-user-password';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkSecurityIssue: (loginName, questionId, answer, verificationCode) => {
    let url = HttpPrefix.API + '/auth/check-security-issue';
    return http.post(url, {loginName, questionId, answer, verificationCode}).then(resp => {
      return resp.body;
    });
  },
  smsCheck (params) {
    let url = HttpPrefix.API + '/auth/sms-check'; // 校验手机验证码
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  getSmsCode (params) {
    let url = HttpPrefix.API + '/auth/get-sms-code'; // 获取手机验证码
    return http.post(url, params).then(resp => {
      return resp.body;
    });
  },
  getPhoneSmsCode (params) {
    let url = HttpPrefix.API + '/auth/get-phone-sms-code'; // 获取手机验证码
    return http.post(url, params).then(resp => {
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
  checkPeservationInfo (name, info, code) {
    let url = HttpPrefix.API + '/auth/check-reservation-info';
    return http.post(url, {loginName: name, infoDesc: info, svertificationCode: code}).then(resp => {
      return resp.body;
    });
  },
  modifyPassword: (obj) => { // 修改密码
    let url = HttpPrefix.API + '/auth/modify-password';
    // let url = HttpPrefix.API + '/security/pub-security-issue/select-security-issue';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkPayPwdExist: () => {
    let url = HttpPrefix.API + '/auth/check-paypassword-exist';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  modifyUserPayPassword: (obj) => {
    let url = HttpPrefix.API + '/auth/modify-user-paypassword';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  saveUserPayPassword: (obj) => {
    let url = HttpPrefix.API + '/auth/save-user-paypassword';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getUserPhone: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/get-user-phone';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  findUserPayPassword: (obj) => {
    let url = HttpPrefix.API + '/auth/find-user-paypassword';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
