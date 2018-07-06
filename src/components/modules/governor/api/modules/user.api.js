import { HttpPrefix } from '../config';
import { http } from 'vue';
import sysUtil from 'core/utils/sys-util';
import httpUtil from 'core/utils/http-util';

export default {
  selectUsersByPage: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/select-users-by-page';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  selectOrganUsersByPage: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/organ-user-mgt';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getData: (obj) => {
    let url = HttpPrefix.API + '/example/user/getData';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 重复
  addUser: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/add-user';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 重复
  updateUser: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/update-user';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 重复
  deleteUser: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/delete-user';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 重复
  resetUserPassword: (id) => {
    let url = HttpPrefix.API + '/user/pub-user/reset-user-password';
    return http.post(url, {userId: id}).then(resp => {
      return resp.body;
    });
  },
  // 重复
  updateState: (state, id, entId) => {
    let url = HttpPrefix.API + '/user/pub-user/update-state';
    return http.post(url, {userState: state, userId: id, entId}).then(resp => {
      return resp.body;
    });
  },
  // 重复
  checkCode: (id, name) => {
    let url = HttpPrefix.API + '/user/pub-user/check-code';
    return http.post(url, {userId: id, loginName: name}).then(resp => {
      return resp.body;
    });
  },
   // 重复
  checkPhoneNoUnique: (userId, phoneNo) => {
    let url = HttpPrefix.API + '/user/pub-user/check-phone-no-unique';
    return http.post(url, {userId, phoneNo}).then(resp => {
      console.log(userId);
      return resp.body;
    });
  },
  selectUsersExport: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/select-users-export';
    url = httpUtil.genPath(url);
    sysUtil.download(url, obj);
  },
  selectUserById: (id) => {
    let url = HttpPrefix.API + '/user/pub-user/select-user-by-id';
    return http.post(url, {userId: id}).then(resp => {
      return resp.body;
    });
  },
  selectEntUsersByPage: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/select-ent-users-by-page';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 转移到 customer
  // selectMemberInfo: () => { // selectEnterpriseInfo
  //   let url = HttpPrefix.API + '/user/pub-user/select-enterprise-info';
  //   return http.post(url).then(resp => {
  //     return resp.body;
  //   });
  // },
  selectEntUsersExport: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/select-ent-users-export';
    url = httpUtil.genPath(url);
    sysUtil.download(url, obj);
  },
  updateLoginName: (obj) => { // 修改登录名
    let url = HttpPrefix.API + '/user/pub-user/update-login-name';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  // 校验手机号码的是否存在
  checkPhoneNoForExit: (phoneNo, entId) => {
    let url = HttpPrefix.API + '/user/pub-user/check-phone-no-for-exit';
    return http.post(url, {phoneNo, entId}).then(resp => {
      return resp.body;
    });
  },
  addUserForEnt: (obj) => {
    let url = HttpPrefix.API + '/user/pub-user/add-user-for-ent';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getEntUserInfo: (userId, entId) => {
    let url = HttpPrefix.API + '/user/pub-user/get-ent-user-info';
    return http.post(url, {userId, entId}).then(resp => {
      return resp.body;
    });
  },
  selectUserForFirstTrial (obj) {
    let url = HttpPrefix.API + '/user/pub-user/select-user-for-first-trial';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  selectUserForLastTrial (obj) {
    let url = HttpPrefix.API + '/user/pub-user/select-user-for-last-trial';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  firstTrialPass (obj) {
    let url = HttpPrefix.API + '/user/pub-user/first-trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  firstTrialReject (obj) {
    let url = HttpPrefix.API + '/user/pub-user/first-trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  lastTrialPass (obj) {
    let url = HttpPrefix.API + '/user/pub-user/last-trial-pass';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  lastTrialReject (obj) {
    let url = HttpPrefix.API + '/user/pub-user/last-trial-reject';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  getLastOpt (userId, entId) {
    let url = HttpPrefix.API + '/user/pub-user/get-last-opt';
    return http.post(url, {userId, entId}).then(resp => {
      return resp.body;
    });
  },
  updateUserForEnt (Obj) {
    let url = HttpPrefix.API + '/user/pub-user/update-user-for-ent';
    return http.post(url, Obj).then(resp => {
      return resp.body;
    });
  },
  uploadUserInfo: (obj) => { // 修改邮箱
    let url = HttpPrefix.API + '/user/pub-user/upload-user-info';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  sendSMS: (obj) => { // 发送短信验证码
    let url = HttpPrefix.API + '/user/pub-user/send-sms';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
