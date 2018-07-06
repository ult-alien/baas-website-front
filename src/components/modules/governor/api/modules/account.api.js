import { HttpPrefix } from '../config';
import { http } from 'vue';

export default {
  getAccounts: (obj) => {
    let url = HttpPrefix.API + '/customer/base/account/get-accounts';
    return http.post(url, obj).then(resp => {
      return resp.body;
    });
  }
};
