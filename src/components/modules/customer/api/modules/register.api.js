import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  register: (obj) => { // 注册
    let url = HttpPrefix.API + '/register/register/customer-register';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  checkCustomerExist: (obj) => { // 检查客户是否存在
    let url = HttpPrefix.API + '/register/register/check-customer-exist';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  },
  sendSMS: (obj) => { // 发送短信验证码
    let url = HttpPrefix.API + '/register/register/send-sms';
    console.debug(url);
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
