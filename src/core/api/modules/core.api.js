import { http } from 'vue';
import { HttpPrefix } from '../../constants';
import httpUtil from '../../utils/http-util';
import sysUtil from '../../utils/sys-util';

export default {
  login (data) { // 登录
    let url = HttpPrefix.API + '/user/login';
    return http.post(url, data).then(resp => {
      return resp.body;
    });
  },
  logout () { // 注销
    let url = HttpPrefix.API + '/user/logout';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  getContextData (option) { // 获取上下文信息
    let url = HttpPrefix.API + '/user/get-contextData';
    return http.post(url, {}, option).then(resp => {
      return resp.body;
    });
  },
  refreshContextData () { //  刷新缓存
    let url = HttpPrefix.API + '/context/refresh-context-data';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  getVerifyCode () { // 获取验证码
    let apiUrl = HttpPrefix.API + '/auth/getVerifycode?rdm=' + Math.random();
    console.debug('getVerifyCode return=' + httpUtil.genPath(apiUrl));
    return httpUtil.genPath(apiUrl);
  },
  getCaptcha (random) {
    let url = HttpPrefix.API + '/auth/getVerifycode?rdm=' + random;
    console.debug('getCaptcha url=' + url);
    return http.get(url);
    // return http.get(url).then(resp => {
    //   console.debug('getCaptcha resp.body=' + resp.body);
    //   return resp.body;
    // });
  },
  getSMS () { // 获取短信验证码
    let url = HttpPrefix.API + '/auth/verifyCode';
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  getBuyerRegAddress () { // 获取终端商注册地址
    let url = HttpPrefix.API + '/auth/buyer-reg-address';
    // 必须传入一个对象Object
    return http.post(url).then(resp => {
      return resp.body;
    });
  },
  checkVertifyCode (kaptchaReceived) { // 核实验证码
    let url = HttpPrefix.API + '/auth/verifyCode';
    // 必须传入一个对象Object
    return http.post(url, {kaptchaReceived}).then(resp => {
      return resp.body;
    });
  },
  getMsgTip (key = '') { // 获取消息提示
    let url = HttpPrefix.API + '/msg-tip/get-msg-tip';
    return http.post(url, {key}).then(resp => {
      return resp.body;
    });
  },
  downloadTemplate: (type) => {
    let url = HttpPrefix.API + '/file/pub-file/download-template';
    url = httpUtil.genPath(url);
    sysUtil.download(url, {type});
  },
  changeEnt (entId) { // 切换企业
    let url = HttpPrefix.API + '/auth/change-ent';
    return http.post(url, {entId}).then(resp => {
      return resp.body;
    });
  }
};
